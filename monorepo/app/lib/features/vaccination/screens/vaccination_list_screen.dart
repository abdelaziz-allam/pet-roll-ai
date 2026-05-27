import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../../core/router/route_names.dart';
import '../models/vaccination_model.dart';
import '../providers/vaccination_provider.dart';

class VaccinationListScreen extends ConsumerWidget {
  final String petId;

  const VaccinationListScreen({super.key, required this.petId});

  void _openDetail(BuildContext context, String vaccinationId) {
    context.pushNamed(
      RouteNames.vaccinationDetail,
      pathParameters: {'petId': petId, 'vaccinationId': vaccinationId},
    );
  }

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final vaccinationsAsync = ref.watch(vaccinationsProvider(petId));

    return Scaffold(
      appBar: AppBar(
        title: Text('Vaccinations', style: AppTypography.heading2),
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(bottom: 80),
        child: FloatingActionButton(
          backgroundColor: AppColors.brandPrimary,
          onPressed: () => context.pushNamed(
            RouteNames.addVaccination,
            pathParameters: {'petId': petId},
          ),
          child: const Icon(Icons.add, color: Colors.white),
        ),
      ),
      body: vaccinationsAsync.when(
        loading: () => const LoadingIndicator(),
        error: (error, _) => ErrorView(
          message: error.toString(),
          onRetry: () => ref.invalidate(vaccinationsProvider(petId)),
        ),
        data: (vaccinations) {
          if (vaccinations.isEmpty) {
            return EmptyState(
              title: 'No vaccinations logged',
              subtitle: 'Keep track of your pet\'s vaccination history',
              icon: Icons.vaccines_outlined,
            );
          }

          final overdue = vaccinations.where((v) => v.isOverdue).toList();
          final upcoming = vaccinations.where((v) => v.isUpcoming).toList();
          final past = vaccinations
              .where((v) => !v.isOverdue && !v.isUpcoming)
              .toList()
            ..sort((a, b) => b.dateAdministered.compareTo(a.dateAdministered));

          return RefreshIndicator(
            color: AppColors.brandPrimary,
            onRefresh: () async {
              ref.invalidate(vaccinationsProvider(petId));
            },
            child: ListView(
              padding: const EdgeInsets.fromLTRB(16, 16, 16, 100),
              children: [
                if (overdue.isNotEmpty) ...[
                  _buildSectionHeader('Overdue', AppColors.error),
                  ...overdue.map((v) => _buildVaccinationCard(context, v, isOverdue: true)),
                  const SizedBox(height: 16),
                ],
                if (upcoming.isNotEmpty) ...[
                  _buildSectionHeader('Upcoming', AppColors.warning),
                  ...upcoming.map((v) => _buildVaccinationCard(context, v, isUpcoming: true)),
                  const SizedBox(height: 16),
                ],
                if (past.isNotEmpty) ...[
                  _buildSectionHeader('Past Vaccinations', AppColors.textSecondary),
                  ...past.map((v) => _buildVaccinationCard(context, v)),
                ],
              ],
            ),
          );
        },
      ),
    );
  }

  Widget _buildSectionHeader(String title, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Container(
            width: 4,
            height: 20,
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(width: 8),
          Text(
            title,
            style: AppTypography.heading3.copyWith(color: color),
          ),
        ],
      ),
    );
  }

  Widget _buildVaccinationCard(
    BuildContext context,
    Vaccination vaccination, {
    bool isOverdue = false,
    bool isUpcoming = false,
  }) {
    final statusColor = isOverdue
        ? AppColors.error
        : isUpcoming
            ? AppColors.warning
            : AppColors.accentGreen;

    final statusText = isOverdue
        ? 'Overdue'
        : isUpcoming
            ? 'Due Soon'
            : 'Completed';

    return GestureDetector(
      onTap: () => _openDetail(context, vaccination.id),
      child: Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isOverdue
            ? AppColors.error.withOpacity(0.05)
            : isUpcoming
                ? AppColors.warning.withOpacity(0.05)
                : AppColors.bgSecondary,
        borderRadius: BorderRadius.circular(12),
        border: isOverdue || isUpcoming
            ? Border.all(color: statusColor.withOpacity(0.3))
            : null,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.vaccines, size: 20, color: statusColor),
              const SizedBox(width: 8),
              Expanded(
                child: Text(vaccination.name, style: AppTypography.label),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(
                  color: statusColor.withOpacity(0.15),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(
                  statusText,
                  style: AppTypography.caption.copyWith(
                    color: statusColor,
                    fontWeight: FontWeight.w600,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 8),
          Row(
            children: [
              Icon(Icons.calendar_today, size: 14, color: AppColors.textSecondary),
              const SizedBox(width: 6),
              Text(
                'Administered: ${DateFormat('dd MMM yyyy').format(vaccination.dateAdministered)}',
                style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
              ),
            ],
          ),
          if (vaccination.nextDueDate != null) ...[
            const SizedBox(height: 4),
            Row(
              children: [
                Icon(Icons.event, size: 14, color: statusColor),
                const SizedBox(width: 6),
                Text(
                  'Next due: ${DateFormat('dd MMM yyyy').format(vaccination.nextDueDate!)}',
                  style: AppTypography.bodySmall.copyWith(color: statusColor),
                ),
              ],
            ),
          ],
          if (vaccination.veterinarian != null) ...[
            const SizedBox(height: 4),
            Row(
              children: [
                Icon(Icons.person, size: 14, color: AppColors.textSecondary),
                const SizedBox(width: 6),
                Text(
                  vaccination.veterinarian!,
                  style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
                ),
              ],
            ),
          ],
        ],
      ),
      ),
    );
  }
}

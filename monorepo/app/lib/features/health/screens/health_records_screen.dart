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
import '../models/health_record_model.dart';
import '../providers/health_provider.dart';

class HealthRecordsScreen extends ConsumerStatefulWidget {
  final String petId;

  const HealthRecordsScreen({super.key, required this.petId});

  @override
  ConsumerState<HealthRecordsScreen> createState() => _HealthRecordsScreenState();
}

class _HealthRecordsScreenState extends ConsumerState<HealthRecordsScreen> {
  HealthRecordType? _selectedFilter;

  Color _colorForType(HealthRecordType type) {
    switch (type) {
      case HealthRecordType.vetVisit:
        return AppColors.info;
      case HealthRecordType.surgery:
        return AppColors.error;
      case HealthRecordType.medication:
        return AppColors.accentGreen;
      case HealthRecordType.diagnosis:
        return AppColors.warning;
      case HealthRecordType.allergy:
        return AppColors.brandPrimary;
      case HealthRecordType.note:
        return AppColors.textSecondary;
    }
  }

  IconData _iconForType(HealthRecordType type) {
    switch (type) {
      case HealthRecordType.vetVisit:
        return Icons.local_hospital;
      case HealthRecordType.surgery:
        return Icons.healing;
      case HealthRecordType.medication:
        return Icons.medication;
      case HealthRecordType.diagnosis:
        return Icons.biotech;
      case HealthRecordType.allergy:
        return Icons.warning_amber;
      case HealthRecordType.note:
        return Icons.note;
    }
  }

  Map<String, List<HealthRecord>> _groupByMonth(List<HealthRecord> records) {
    final grouped = <String, List<HealthRecord>>{};
    for (final record in records) {
      final key = DateFormat('MMMM yyyy').format(record.date);
      grouped.putIfAbsent(key, () => []).add(record);
    }
    return grouped;
  }

  @override
  Widget build(BuildContext context) {
    final recordsAsync = ref.watch(healthRecordsProvider(widget.petId));

    return Scaffold(
      appBar: AppBar(
        title: Text('Health Records', style: AppTypography.heading2),
      ),
      floatingActionButton: Padding(
        padding: const EdgeInsets.only(bottom: 80),
        child: FloatingActionButton(
          backgroundColor: AppColors.brandPrimary,
          onPressed: () => context.pushNamed(
            RouteNames.addHealthRecord,
            pathParameters: {'petId': widget.petId},
          ),
          child: const Icon(Icons.add, color: Colors.white),
        ),
      ),
      body: Column(
        children: [
          _buildFilterChips(),
          Expanded(
            child: recordsAsync.when(
              loading: () => const LoadingIndicator(),
              error: (error, _) => ErrorView(
                message: error.toString(),
                onRetry: () => ref.invalidate(healthRecordsProvider(widget.petId)),
              ),
              data: (records) {
                final filtered = _selectedFilter != null
                    ? records.where((r) => r.type == _selectedFilter).toList()
                    : records;

                if (filtered.isEmpty) {
                  return EmptyState(
                    title: 'No health records',
                    subtitle: 'Tap + to add your pet\'s first health record',
                    icon: Icons.medical_services_outlined,
                  );
                }

                return RefreshIndicator(
                  color: AppColors.brandPrimary,
                  onRefresh: () async {
                    ref.invalidate(healthRecordsProvider(widget.petId));
                  },
                  child: _buildTimeline(filtered),
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFilterChips() {
    return SingleChildScrollView(
      scrollDirection: Axis.horizontal,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: [
          _buildChip(
            label: 'All',
            isSelected: _selectedFilter == null,
            color: AppColors.brandPrimary,
            onTap: () => setState(() => _selectedFilter = null),
          ),
          const SizedBox(width: 8),
          ...HealthRecordType.values.map((type) {
            return Padding(
              padding: const EdgeInsets.only(right: 8),
              child: _buildChip(
                label: type.displayName,
                isSelected: _selectedFilter == type,
                color: _colorForType(type),
                onTap: () => setState(() {
                  _selectedFilter = _selectedFilter == type ? null : type;
                }),
              ),
            );
          }),
        ],
      ),
    );
  }

  Widget _buildChip({
    required String label,
    required bool isSelected,
    required Color color,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
        decoration: BoxDecoration(
          color: isSelected ? color : Colors.white,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? color : AppColors.textSecondary.withOpacity(0.4),
            width: isSelected ? 1.5 : 1,
          ),
          boxShadow: isSelected
              ? [BoxShadow(color: color.withOpacity(0.3), blurRadius: 6, offset: const Offset(0, 2))]
              : null,
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            if (isSelected) ...[
              Icon(Icons.check, size: 14, color: Colors.white),
              const SizedBox(width: 4),
            ],
            Text(
              label,
              style: AppTypography.bodySmall.copyWith(
                color: isSelected ? Colors.white : AppColors.textPrimary,
                fontWeight: FontWeight.w600,
                fontSize: 13,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTimeline(List<HealthRecord> records) {
    final sorted = List<HealthRecord>.from(records)
      ..sort((a, b) => b.date.compareTo(a.date));
    final grouped = _groupByMonth(sorted);

    return ListView.builder(
      padding: const EdgeInsets.fromLTRB(16, 8, 16, 100),
      itemCount: grouped.length,
      itemBuilder: (context, index) {
        final month = grouped.keys.elementAt(index);
        final monthRecords = grouped[month]!;

        return Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.symmetric(vertical: 12),
              child: Text(
                month,
                style: AppTypography.heading3.copyWith(color: AppColors.textPrimary),
              ),
            ),
            ...monthRecords.map((record) => _buildRecordCard(record)),
          ],
        );
      },
    );
  }

  Widget _buildRecordCard(HealthRecord record) {
    final color = _colorForType(record.type);
    final icon = _iconForType(record.type);

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Column(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: color.withOpacity(0.15),
                  shape: BoxShape.circle,
                ),
                child: Icon(icon, color: color, size: 20),
              ),
              Container(
                width: 2,
                height: 40,
                color: AppColors.borderLight,
              ),
            ],
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppColors.bgSecondary,
                borderRadius: BorderRadius.circular(12),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                        decoration: BoxDecoration(
                          color: color.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          record.type.displayName,
                          style: AppTypography.caption.copyWith(color: color),
                        ),
                      ),
                      const Spacer(),
                      Text(
                        DateFormat('dd MMM').format(record.date),
                        style: AppTypography.caption.copyWith(color: AppColors.textSecondary),
                      ),
                    ],
                  ),
                  const SizedBox(height: 8),
                  Text(record.title, style: AppTypography.label),
                  if (record.description != null && record.description!.isNotEmpty) ...[
                    const SizedBox(height: 4),
                    Text(
                      record.description!,
                      style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
                      maxLines: 2,
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                  if (record.veterinarian != null) ...[
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        Icon(Icons.person, size: 14, color: AppColors.textSecondary),
                        const SizedBox(width: 4),
                        Text(
                          record.veterinarian!,
                          style: AppTypography.caption.copyWith(color: AppColors.textSecondary),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

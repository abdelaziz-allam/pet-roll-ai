import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../models/pregnancy_model.dart';
import '../providers/pregnancy_provider.dart';
import '../services/pregnancy_service.dart';
import 'start_pregnancy_screen.dart';

class PregnancyTrackerScreen extends ConsumerStatefulWidget {
  final String petId;

  const PregnancyTrackerScreen({super.key, required this.petId});

  @override
  ConsumerState<PregnancyTrackerScreen> createState() => _PregnancyTrackerScreenState();
}

class _PregnancyTrackerScreenState extends ConsumerState<PregnancyTrackerScreen> {
  void _navigateToStart() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => StartPregnancyScreen(petId: widget.petId),
      ),
    );
  }

  Future<void> _showAddWeightDialog(Pregnancy pregnancy) async {
    final weightController = TextEditingController();
    final result = await showDialog<Map<String, dynamic>>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Add Weight'),
        content: TextField(
          controller: weightController,
          keyboardType: const TextInputType.numberWithOptions(decimal: true),
          decoration: const InputDecoration(
            labelText: 'Weight (kg)',
            hintText: 'Enter weight',
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () {
              final weight = double.tryParse(weightController.text);
              if (weight != null) {
                Navigator.pop(ctx, {
                  'date': DateTime.now().toIso8601String(),
                  'weight': weight,
                  'unit': 'kg',
                });
              }
            },
            child: const Text('Save'),
          ),
        ],
      ),
    );

    if (result != null) {
      await ref.read(pregnancyServiceProvider).addWeight(
            widget.petId,
            pregnancy.id,
            result,
          );
      ref.invalidate(activePregnancyProvider(widget.petId));
    }
  }

  Future<void> _completeMilestone(Pregnancy pregnancy, Milestone milestone) async {
    await ref.read(pregnancyServiceProvider).completeMilestone(
          widget.petId,
          pregnancy.id,
          milestone.id,
        );
    ref.invalidate(activePregnancyProvider(widget.petId));
    ref.invalidate(pregnancyMilestonesProvider((widget.petId, pregnancy.id)));
  }

  @override
  Widget build(BuildContext context) {
    final pregnancyAsync = ref.watch(activePregnancyProvider(widget.petId));

    return Scaffold(
      appBar: AppBar(title: const Text('Pregnancy Tracker')),
      body: pregnancyAsync.when(
        loading: () => const LoadingIndicator(),
        error: (error, _) => ErrorView(
          message: error.toString(),
          onRetry: () => ref.invalidate(activePregnancyProvider(widget.petId)),
        ),
        data: (pregnancy) {
          if (pregnancy == null) {
            return EmptyState(
              title: 'No Active Pregnancy',
              subtitle: 'Start tracking your pet\'s pregnancy journey.',
              icon: Icons.pregnant_woman,
              actionLabel: 'Start Tracking',
              onAction: _navigateToStart,
            );
          }
          return _buildActivePregnancy(pregnancy);
        },
      ),
    );
  }

  Widget _buildActivePregnancy(Pregnancy pregnancy) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildProgressCard(pregnancy),
          const SizedBox(height: 20),
          _buildCurrentMilestone(pregnancy),
          const SizedBox(height: 20),
          _buildWeightChart(pregnancy),
          const SizedBox(height: 20),
          _buildMilestoneChecklist(pregnancy),
        ],
      ),
    );
  }

  Widget _buildProgressCard(Pregnancy pregnancy) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text(
              'Week ${pregnancy.currentWeek} of ${pregnancy.totalWeeks}',
              style: AppTypography.heading2,
            ),
            const SizedBox(height: 16),
            LinearProgressIndicator(
              value: pregnancy.progress,
              minHeight: 8,
              borderRadius: BorderRadius.circular(4),
              backgroundColor: AppColors.bgTertiary,
              valueColor: const AlwaysStoppedAnimation(AppColors.brandPrimary),
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  'Bred: ${_formatDate(pregnancy.breedingDate)}',
                  style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
                ),
                Text(
                  'Due: ${_formatDate(pregnancy.expectedDueDate)}',
                  style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildCurrentMilestone(Pregnancy pregnancy) {
    final upcoming = pregnancy.milestones
        .where((m) => !m.isCompleted && m.week >= pregnancy.currentWeek)
        .toList();

    if (upcoming.isEmpty) return const SizedBox.shrink();

    final current = upcoming.first;
    return Card(
      color: AppColors.categoryBreeding,
      child: ListTile(
        leading: const Icon(Icons.flag, color: AppColors.brandPrimary),
        title: Text(current.title, style: AppTypography.label),
        subtitle: Text(current.description, style: AppTypography.bodySmall),
        trailing: Text('Week ${current.week}', style: AppTypography.bodySmall),
      ),
    );
  }

  Widget _buildWeightChart(Pregnancy pregnancy) {
    if (pregnancy.weightLog.isEmpty) {
      return Card(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            children: [
              Text('Weight Log', style: AppTypography.heading3),
              const SizedBox(height: 12),
              Text(
                'No weight entries yet.',
                style: AppTypography.body.copyWith(color: AppColors.textSecondary),
              ),
              const SizedBox(height: 12),
              ElevatedButton.icon(
                onPressed: () => _showAddWeightDialog(pregnancy),
                icon: const Icon(Icons.add),
                label: const Text('Add Weight'),
              ),
            ],
          ),
        ),
      );
    }

    final spots = pregnancy.weightLog.asMap().entries.map((entry) {
      return FlSpot(entry.key.toDouble(), entry.value.weight);
    }).toList();

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Weight Log', style: AppTypography.heading3),
                IconButton(
                  icon: const Icon(Icons.add_circle_outline),
                  onPressed: () => _showAddWeightDialog(pregnancy),
                ),
              ],
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 200,
              child: LineChart(
                LineChartData(
                  gridData: const FlGridData(show: true),
                  titlesData: const FlTitlesData(
                    rightTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                    topTitles: AxisTitles(sideTitles: SideTitles(showTitles: false)),
                  ),
                  borderData: FlBorderData(show: false),
                  lineBarsData: [
                    LineChartBarData(
                      spots: spots,
                      isCurved: true,
                      color: AppColors.brandPrimary,
                      barWidth: 3,
                      dotData: const FlDotData(show: true),
                      belowBarData: BarAreaData(
                        show: true,
                        color: AppColors.brandPrimary.withOpacity(0.1),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildMilestoneChecklist(Pregnancy pregnancy) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Milestones', style: AppTypography.heading3),
        const SizedBox(height: 12),
        ...pregnancy.milestones.map((milestone) => CheckboxListTile(
              value: milestone.isCompleted,
              onChanged: milestone.isCompleted
                  ? null
                  : (_) => _completeMilestone(pregnancy, milestone),
              title: Text(
                milestone.title,
                style: AppTypography.label.copyWith(
                  decoration: milestone.isCompleted
                      ? TextDecoration.lineThrough
                      : null,
                ),
              ),
              subtitle: Text(
                'Week ${milestone.week}',
                style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
              ),
              controlAffinity: ListTileControlAffinity.leading,
            )),
      ],
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }
}

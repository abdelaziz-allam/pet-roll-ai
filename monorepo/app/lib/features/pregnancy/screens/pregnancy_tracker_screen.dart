import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../../l10n/generated/app_localizations.dart';
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
    final l10n = AppLocalizations.of(context)!;
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
            child: Text(l10n.cancel),
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
            child: Text(l10n.save),
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

  Future<void> _deletePregnancy(Pregnancy pregnancy) async {
    final l10n = AppLocalizations.of(context)!;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete Pregnancy'),
        content: const Text('Are you sure you want to delete this pregnancy record? This cannot be undone.'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: Text(l10n.cancel),
          ),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Delete', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
    if (confirmed == true) {
      try {
        await ref.read(pregnancyServiceProvider).deletePregnancy(widget.petId, pregnancy.id);
        ref.invalidate(activePregnancyProvider(widget.petId));
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: $e')),
          );
        }
      }
    }
  }

  Future<void> _editPregnancy(Pregnancy pregnancy) async {
    final l10n = AppLocalizations.of(context)!;
    DateTime matingDate = pregnancy.breedingDate;
    DateTime expectedDueDate = pregnancy.expectedDueDate;
    String status = pregnancy.status;
    final notesCtrl = TextEditingController(text: pregnancy.notes ?? '');
    final litterSizeCtrl = TextEditingController(text: pregnancy.litterSize?.toString() ?? '');

    await showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setSheetState) => Padding(
          padding: EdgeInsets.fromLTRB(20, 16, 20, MediaQuery.of(ctx).viewInsets.bottom + 20),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 40, height: 4,
                    decoration: BoxDecoration(color: Colors.grey.shade300, borderRadius: BorderRadius.circular(2)),
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    GestureDetector(
                      onTap: () => Navigator.pop(ctx),
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(color: Colors.grey.shade100, shape: BoxShape.circle),
                        child: const Icon(Icons.arrow_back, size: 20),
                      ),
                    ),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Text('Edit Pregnancy', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                    ),
                    GestureDetector(
                      onTap: () => Navigator.pop(ctx),
                      child: const Icon(Icons.close, color: Colors.grey),
                    ),
                  ],
                ),
                const SizedBox(height: 20),

                const Text('Status', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [
                    _statusChip('active', status, AppColors.brandPrimary, () => setSheetState(() => status = 'active')),
                    _statusChip('completed', status, Colors.green, () => setSheetState(() => status = 'completed')),
                    _statusChip('miscarriage', status, Colors.orange, () => setSheetState(() => status = 'miscarriage')),
                    _statusChip('false_alarm', status, Colors.grey, () => setSheetState(() => status = 'false_alarm')),
                  ],
                ),
                const SizedBox(height: 16),

                const Text('Mating Date', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                InkWell(
                  onTap: () async {
                    final picked = await showDatePicker(
                      context: ctx,
                      initialDate: matingDate,
                      firstDate: DateTime.now().subtract(const Duration(days: 400)),
                      lastDate: DateTime.now(),
                    );
                    if (picked != null) setSheetState(() => matingDate = picked);
                  },
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    decoration: BoxDecoration(
                      border: Border.all(color: AppColors.borderDefault),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text('${matingDate.day}/${matingDate.month}/${matingDate.year}'),
                  ),
                ),
                const SizedBox(height: 16),

                const Text('Expected Due Date', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                InkWell(
                  onTap: () async {
                    final picked = await showDatePicker(
                      context: ctx,
                      initialDate: expectedDueDate,
                      firstDate: DateTime.now().subtract(const Duration(days: 30)),
                      lastDate: DateTime.now().add(const Duration(days: 400)),
                    );
                    if (picked != null) setSheetState(() => expectedDueDate = picked);
                  },
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                    decoration: BoxDecoration(
                      border: Border.all(color: AppColors.borderDefault),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text('${expectedDueDate.day}/${expectedDueDate.month}/${expectedDueDate.year}'),
                  ),
                ),
                const SizedBox(height: 16),

                TextField(
                  controller: litterSizeCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(
                    labelText: 'Litter Size',
                    prefixIcon: Icon(Icons.pets),
                    border: OutlineInputBorder(),
                    isDense: true,
                  ),
                ),
                const SizedBox(height: 12),
                TextField(
                  controller: notesCtrl,
                  maxLines: 3,
                  decoration: InputDecoration(
                    labelText: l10n.notes,
                    prefixIcon: const Icon(Icons.notes),
                    border: const OutlineInputBorder(),
                    isDense: true,
                  ),
                ),

                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () async {
                      try {
                        final body = <String, dynamic>{
                          'matingDate': matingDate.toIso8601String(),
                          'startDate': matingDate.toIso8601String(),
                          'expectedDueDate': expectedDueDate.toIso8601String(),
                          'status': status,
                          'notes': notesCtrl.text,
                        };
                        if (litterSizeCtrl.text.isNotEmpty) {
                          body['litterSize'] = int.tryParse(litterSizeCtrl.text);
                        }
                        await ref.read(pregnancyServiceProvider).update(
                              widget.petId, pregnancy.id, body);
                        if (ctx.mounted) Navigator.pop(ctx);
                        ref.invalidate(activePregnancyProvider(widget.petId));
                      } catch (e) {
                        if (ctx.mounted) {
                          ScaffoldMessenger.of(ctx).showSnackBar(
                            SnackBar(content: Text('Error: $e')),
                          );
                        }
                      }
                    },
                    child: const Text('Save Changes'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _statusChip(String value, String current, Color color, VoidCallback onTap) {
    final isSelected = value == current;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? color.withOpacity(0.15) : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: isSelected ? color : Colors.grey.shade300),
        ),
        child: Text(
          value.replaceAll('_', ' ').split(' ').map((w) => w[0].toUpperCase() + w.substring(1)).join(' '),
          style: TextStyle(color: isSelected ? color : AppColors.textSecondary, fontWeight: FontWeight.w600, fontSize: 13),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final pregnancyAsync = ref.watch(activePregnancyProvider(widget.petId));

    return Scaffold(
      appBar: AppBar(title: Text(l10n.pregnancyTracker)),
      body: pregnancyAsync.when(
        loading: () => const LoadingIndicator(),
        error: (error, _) => ErrorView(
          message: error.toString(),
          onRetry: () => ref.invalidate(activePregnancyProvider(widget.petId)),
        ),
        data: (pregnancy) {
          if (pregnancy == null) {
            return EmptyState(
              title: l10n.noPregnancyRecords,
              subtitle: l10n.tapPlusToTrackPregnancy,
              icon: Icons.pregnant_woman,
              actionLabel: l10n.startTracking,
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
          const SizedBox(height: 12),
          _buildActionButtons(pregnancy),
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

  Widget _buildActionButtons(Pregnancy pregnancy) {
    return Row(
      children: [
        Expanded(
          child: OutlinedButton.icon(
            onPressed: () => _editPregnancy(pregnancy),
            icon: const Icon(Icons.edit, size: 18),
            label: const Text('Edit'),
            style: OutlinedButton.styleFrom(
              foregroundColor: AppColors.brandPrimary,
              side: BorderSide(color: AppColors.brandPrimary.withOpacity(0.5)),
            ),
          ),
        ),
        const SizedBox(width: 12),
        Expanded(
          child: OutlinedButton.icon(
            onPressed: () => _deletePregnancy(pregnancy),
            icon: const Icon(Icons.delete_outline, size: 18),
            label: const Text('Delete'),
            style: OutlinedButton.styleFrom(
              foregroundColor: Colors.red,
              side: BorderSide(color: Colors.red.withOpacity(0.5)),
            ),
          ),
        ),
      ],
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

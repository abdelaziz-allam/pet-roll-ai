import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../models/schedule_model.dart';
import '../providers/schedule_provider.dart';
import '../services/schedule_service.dart';
import 'add_schedule_screen.dart';

class SchedulesScreen extends ConsumerStatefulWidget {
  final String petId;

  const SchedulesScreen({super.key, required this.petId});

  @override
  ConsumerState<SchedulesScreen> createState() => _SchedulesScreenState();
}

class _SchedulesScreenState extends ConsumerState<SchedulesScreen> {
  bool _showCompleted = false;

  IconData _iconForType(ScheduleType type) {
    switch (type) {
      case ScheduleType.feeding:
        return Icons.restaurant;
      case ScheduleType.medication:
        return Icons.medication;
      case ScheduleType.grooming:
        return Icons.content_cut;
      case ScheduleType.exercise:
        return Icons.directions_run;
      case ScheduleType.other:
        return Icons.event;
    }
  }

  String _frequencyLabel(ScheduleFrequency frequency, AppLocalizations l10n) {
    switch (frequency) {
      case ScheduleFrequency.daily:
        return l10n.daily;
      case ScheduleFrequency.twiceDaily:
        return l10n.twiceDaily;
      case ScheduleFrequency.weekly:
        return l10n.weekly;
      case ScheduleFrequency.custom:
        return l10n.custom;
    }
  }

  Future<void> _logCompletion(Schedule schedule) async {
    await ref.read(scheduleServiceProvider).logCompletion(widget.petId, schedule.id);
    ref.invalidate(schedulesProvider(widget.petId));
  }

  void _navigateToAdd() {
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => AddScheduleScreen(petId: widget.petId),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final schedulesAsync = ref.watch(schedulesProvider(widget.petId));

    return Scaffold(
      appBar: AppBar(title: Text(l10n.schedules)),
      floatingActionButton: FloatingActionButton(
        onPressed: _navigateToAdd,
        backgroundColor: AppColors.brandPrimary,
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: schedulesAsync.when(
        loading: () => const LoadingIndicator(),
        error: (error, _) => ErrorView(
          message: error.toString(),
          onRetry: () => ref.invalidate(schedulesProvider(widget.petId)),
        ),
        data: (schedules) => _buildContent(schedules),
      ),
    );
  }

  Widget _buildContent(List<Schedule> schedules) {
    final l10n = AppLocalizations.of(context)!;
    final todayTasks = schedules.where((s) => s.active).toList();
    final completedToday = todayTasks.where((s) => s.isCompletedToday).toList();
    final pendingToday = todayTasks.where((s) => !s.isCompletedToday).toList();

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Text(l10n.todaysTasks, style: AppTypography.heading2),
        const SizedBox(height: 12),
        if (pendingToday.isEmpty && completedToday.isEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 24),
            child: Text(
              l10n.noSchedulesYet,
              style: AppTypography.body.copyWith(color: AppColors.textSecondary),
              textAlign: TextAlign.center,
            ),
          ),
        ...pendingToday.map((schedule) => _buildTaskTile(schedule, completed: false)),
        if (completedToday.isNotEmpty) ...[
          const SizedBox(height: 16),
          InkWell(
            onTap: () => setState(() => _showCompleted = !_showCompleted),
            child: Row(
              children: [
                Icon(
                  _showCompleted ? Icons.expand_less : Icons.expand_more,
                  color: AppColors.textSecondary,
                ),
                const SizedBox(width: 8),
                Text(
                  'Completed (${completedToday.length})',
                  style: AppTypography.label.copyWith(color: AppColors.textSecondary),
                ),
              ],
            ),
          ),
          if (_showCompleted)
            ...completedToday.map((schedule) => _buildTaskTile(schedule, completed: true)),
        ],
        const SizedBox(height: 24),
        const Divider(),
        const SizedBox(height: 16),
        Text(l10n.allActiveSchedules, style: AppTypography.heading2),
        const SizedBox(height: 12),
        ...todayTasks.map(_buildScheduleCard),
      ],
    );
  }

  Widget _buildTaskTile(Schedule schedule, {required bool completed}) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: CheckboxListTile(
        value: completed,
        onChanged: completed ? null : (_) => _logCompletion(schedule),
        title: Text(
          schedule.title,
          style: AppTypography.label.copyWith(
            decoration: completed ? TextDecoration.lineThrough : null,
            color: completed ? AppColors.textSecondary : AppColors.textPrimary,
          ),
        ),
        subtitle: Text(
          schedule.times.join(', '),
          style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
        ),
        secondary: Icon(
          _iconForType(schedule.type),
          color: completed ? AppColors.textHint : AppColors.brandPrimary,
        ),
        controlAffinity: ListTileControlAffinity.leading,
      ),
    );
  }

  Widget _buildScheduleCard(Schedule schedule) {
    final l10n = AppLocalizations.of(context)!;
    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: AppColors.categorySchedule,
          child: Icon(_iconForType(schedule.type), color: AppColors.textPrimary, size: 20),
        ),
        title: Text(schedule.title, style: AppTypography.label),
        subtitle: Text(
          '${_frequencyLabel(schedule.frequency, l10n)} - ${schedule.times.join(", ")}',
          style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
        ),
        trailing: Icon(
          schedule.isCompletedToday ? Icons.check_circle : Icons.radio_button_unchecked,
          color: schedule.isCompletedToday ? AppColors.success : AppColors.textHint,
        ),
      ),
    );
  }
}

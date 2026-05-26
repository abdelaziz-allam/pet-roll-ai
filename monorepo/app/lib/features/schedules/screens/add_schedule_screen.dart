import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_text_field.dart';
import '../models/schedule_model.dart';
import '../providers/schedule_provider.dart';
import '../services/schedule_service.dart';

class AddScheduleScreen extends ConsumerStatefulWidget {
  final String petId;

  const AddScheduleScreen({super.key, required this.petId});

  @override
  ConsumerState<AddScheduleScreen> createState() => _AddScheduleScreenState();
}

class _AddScheduleScreenState extends ConsumerState<AddScheduleScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _notesController = TextEditingController();
  ScheduleType _selectedType = ScheduleType.feeding;
  ScheduleFrequency _selectedFrequency = ScheduleFrequency.daily;
  final List<TimeOfDay> _selectedTimes = [const TimeOfDay(hour: 8, minute: 0)];
  bool _isLoading = false;

  Future<void> _pickTime(int index) async {
    final time = await showTimePicker(
      context: context,
      initialTime: _selectedTimes[index],
    );
    if (time != null) {
      setState(() => _selectedTimes[index] = time);
    }
  }

  void _addTimeSlot() {
    setState(() {
      _selectedTimes.add(const TimeOfDay(hour: 12, minute: 0));
    });
  }

  void _removeTimeSlot(int index) {
    if (_selectedTimes.length > 1) {
      setState(() => _selectedTimes.removeAt(index));
    }
  }

  String _formatTime(TimeOfDay time) {
    final hour = time.hour.toString().padLeft(2, '0');
    final minute = time.minute.toString().padLeft(2, '0');
    return '$hour:$minute';
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final frequencyStr = _selectedFrequency == ScheduleFrequency.twiceDaily
          ? 'twice_daily'
          : _selectedFrequency.name;

      await ref.read(scheduleServiceProvider).createSchedule(widget.petId, {
        'title': _titleController.text.trim(),
        'type': _selectedType.name,
        'frequency': frequencyStr,
        'times': _selectedTimes.map(_formatTime).toList(),
        'notes': _notesController.text.isNotEmpty ? _notesController.text.trim() : null,
      });

      ref.invalidate(schedulesProvider(widget.petId));

      if (mounted) Navigator.of(context).pop();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString())),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  void dispose() {
    _titleController.dispose();
    _notesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Add Schedule')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppTextField(
                label: 'Title',
                hint: 'e.g., Morning Feed',
                controller: _titleController,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return 'Please enter a title';
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              Text('Type', style: AppTypography.label),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: ScheduleType.values.map((type) {
                  final isSelected = type == _selectedType;
                  return ChoiceChip(
                    label: Text(type.name[0].toUpperCase() + type.name.substring(1)),
                    selected: isSelected,
                    onSelected: (_) => setState(() => _selectedType = type),
                    selectedColor: AppColors.brandPrimary.withOpacity(0.2),
                    labelStyle: TextStyle(
                      color: isSelected ? AppColors.brandPrimary : AppColors.textPrimary,
                    ),
                  );
                }).toList(),
              ),
              const SizedBox(height: 20),
              Text('Frequency', style: AppTypography.label),
              const SizedBox(height: 8),
              DropdownButtonFormField<ScheduleFrequency>(
                value: _selectedFrequency,
                items: ScheduleFrequency.values
                    .map((freq) => DropdownMenuItem(
                          value: freq,
                          child: Text(_frequencyLabel(freq)),
                        ))
                    .toList(),
                onChanged: (value) {
                  if (value != null) {
                    setState(() => _selectedFrequency = value);
                  }
                },
                decoration: const InputDecoration(border: OutlineInputBorder()),
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Times', style: AppTypography.label),
                  TextButton.icon(
                    onPressed: _addTimeSlot,
                    icon: const Icon(Icons.add, size: 18),
                    label: const Text('Add Time'),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              ...List.generate(_selectedTimes.length, (index) {
                return Padding(
                  padding: const EdgeInsets.only(bottom: 8),
                  child: Row(
                    children: [
                      Expanded(
                        child: InkWell(
                          onTap: () => _pickTime(index),
                          child: Container(
                            padding: const EdgeInsets.symmetric(
                              horizontal: 16,
                              vertical: 14,
                            ),
                            decoration: BoxDecoration(
                              border: Border.all(color: AppColors.borderDefault),
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              _selectedTimes[index].format(context),
                              style: AppTypography.body,
                            ),
                          ),
                        ),
                      ),
                      if (_selectedTimes.length > 1)
                        IconButton(
                          icon: const Icon(Icons.remove_circle_outline, color: AppColors.error),
                          onPressed: () => _removeTimeSlot(index),
                        ),
                    ],
                  ),
                );
              }),
              const SizedBox(height: 20),
              AppTextField(
                label: 'Notes',
                hint: 'Optional notes',
                controller: _notesController,
                maxLines: 3,
              ),
              const SizedBox(height: 32),
              AppButton(
                label: 'Save Schedule',
                onPressed: _submit,
                isLoading: _isLoading,
              ),
            ],
          ),
        ),
      ),
    );
  }

  String _frequencyLabel(ScheduleFrequency frequency) {
    switch (frequency) {
      case ScheduleFrequency.daily:
        return 'Daily';
      case ScheduleFrequency.twiceDaily:
        return 'Twice Daily';
      case ScheduleFrequency.weekly:
        return 'Weekly';
      case ScheduleFrequency.custom:
        return 'Custom';
    }
  }
}

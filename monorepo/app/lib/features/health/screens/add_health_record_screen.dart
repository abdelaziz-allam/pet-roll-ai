import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_text_field.dart';
import '../models/health_record_model.dart';
import '../providers/health_provider.dart';
import '../services/health_service.dart';

class AddHealthRecordScreen extends ConsumerStatefulWidget {
  final String petId;

  const AddHealthRecordScreen({super.key, required this.petId});

  @override
  ConsumerState<AddHealthRecordScreen> createState() => _AddHealthRecordScreenState();
}

class _AddHealthRecordScreenState extends ConsumerState<AddHealthRecordScreen> {
  final _formKey = GlobalKey<FormState>();
  final _titleController = TextEditingController();
  final _descriptionController = TextEditingController();
  final _vetController = TextEditingController();
  final _clinicController = TextEditingController();

  HealthRecordType _selectedType = HealthRecordType.vetVisit;
  DateTime _selectedDate = DateTime.now();
  bool _isLoading = false;
  final List<File> _attachments = [];
  final _picker = ImagePicker();

  @override
  void dispose() {
    _titleController.dispose();
    _descriptionController.dispose();
    _vetController.dispose();
    _clinicController.dispose();
    super.dispose();
  }

  Future<void> _pickDate() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: _selectedDate,
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
      builder: (context, child) {
        return Theme(
          data: Theme.of(context).copyWith(
            colorScheme: Theme.of(context).colorScheme.copyWith(
              primary: AppColors.brandPrimary,
            ),
          ),
          child: child!,
        );
      },
    );
    if (picked != null) {
      setState(() => _selectedDate = picked);
    }
  }

  Future<void> _pickAttachment() async {
    final source = await showModalBottomSheet<ImageSource>(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (ctx) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              ListTile(
                leading: const Icon(Icons.camera_alt_rounded),
                title: const Text('Camera'),
                onTap: () => Navigator.pop(ctx, ImageSource.camera),
              ),
              ListTile(
                leading: const Icon(Icons.photo_library_rounded),
                title: const Text('Gallery'),
                onTap: () => Navigator.pop(ctx, ImageSource.gallery),
              ),
            ],
          ),
        ),
      ),
    );

    if (source == null) return;

    if (_attachments.length >= 5) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Maximum 5 attachments per record')),
        );
      }
      return;
    }

    final picked = await _picker.pickImage(source: source, imageQuality: 80);
    if (picked != null) {
      setState(() => _attachments.add(File(picked.path)));
    }
  }

  Future<void> _handleSave() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final service = ref.read(healthServiceProvider);
      final record = await service.addRecord(widget.petId, {
        'type': _selectedType.value,
        'title': _titleController.text.trim(),
        'description': _descriptionController.text.trim(),
        'date': _selectedDate.toIso8601String(),
        'veterinarian': _vetController.text.trim().isNotEmpty
            ? _vetController.text.trim()
            : null,
        'clinic': _clinicController.text.trim().isNotEmpty
            ? _clinicController.text.trim()
            : null,
      });

      for (final file in _attachments) {
        await service.uploadAttachment(widget.petId, record.id, file);
      }

      ref.invalidate(healthRecordsProvider(widget.petId));

      if (mounted) context.pop();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString()),
            backgroundColor: AppColors.error,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add Health Record', style: AppTypography.heading2),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(24, 24, 24, 120),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Record Type', style: AppTypography.label),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: HealthRecordType.values.map((type) {
                  final isSelected = _selectedType == type;
                  return ChoiceChip(
                    label: Text(type.displayName),
                    selected: isSelected,
                    selectedColor: AppColors.brandPrimary.withOpacity(0.2),
                    labelStyle: AppTypography.bodySmall.copyWith(
                      color: isSelected ? AppColors.brandPrimary : AppColors.textPrimary,
                      fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                    ),
                    onSelected: (_) => setState(() => _selectedType = type),
                  );
                }).toList(),
              ),
              const SizedBox(height: 24),
              AppTextField(
                label: 'Title',
                hint: 'Enter record title',
                controller: _titleController,
                textInputAction: TextInputAction.next,
                validator: (value) {
                  if (value == null || value.isEmpty) return 'Title is required';
                  return null;
                },
              ),
              const SizedBox(height: 16),
              AppTextField(
                label: 'Description',
                hint: 'Add details about this record',
                controller: _descriptionController,
                maxLines: 3,
                textInputAction: TextInputAction.next,
              ),
              const SizedBox(height: 16),
              Text('Date', style: AppTypography.label),
              const SizedBox(height: 6),
              InkWell(
                onTap: _pickDate,
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  decoration: BoxDecoration(
                    border: Border.all(color: AppColors.borderDefault),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      Icon(Icons.calendar_today, size: 18, color: AppColors.textSecondary),
                      const SizedBox(width: 12),
                      Text(
                        DateFormat('dd MMMM yyyy').format(_selectedDate),
                        style: AppTypography.body,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              AppTextField(
                label: 'Veterinarian',
                hint: 'Vet name (optional)',
                controller: _vetController,
                textInputAction: TextInputAction.next,
                prefixIcon: const Icon(Icons.person_outline),
              ),
              const SizedBox(height: 16),
              AppTextField(
                label: 'Clinic',
                hint: 'Clinic name (optional)',
                controller: _clinicController,
                textInputAction: TextInputAction.done,
                prefixIcon: const Icon(Icons.local_hospital_outlined),
              ),
              const SizedBox(height: 24),
              Text('Attachments', style: AppTypography.label),
              const SizedBox(height: 8),
              Text(
                'Add X-rays, lab results, or other documents',
                style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
              ),
              const SizedBox(height: 12),
              if (_attachments.isNotEmpty) ...[
                SizedBox(
                  height: 100,
                  child: ListView.separated(
                    scrollDirection: Axis.horizontal,
                    itemCount: _attachments.length,
                    separatorBuilder: (_, __) => const SizedBox(width: 10),
                    itemBuilder: (context, index) {
                      return Stack(
                        children: [
                          ClipRRect(
                            borderRadius: BorderRadius.circular(12),
                            child: Image.file(
                              _attachments[index],
                              width: 100,
                              height: 100,
                              fit: BoxFit.cover,
                            ),
                          ),
                          Positioned(
                            top: 4,
                            right: 4,
                            child: GestureDetector(
                              onTap: () => setState(() => _attachments.removeAt(index)),
                              child: Container(
                                padding: const EdgeInsets.all(4),
                                decoration: const BoxDecoration(
                                  color: Colors.black54,
                                  shape: BoxShape.circle,
                                ),
                                child: const Icon(Icons.close, size: 14, color: Colors.white),
                              ),
                            ),
                          ),
                        ],
                      );
                    },
                  ),
                ),
                const SizedBox(height: 12),
              ],
              OutlinedButton.icon(
                onPressed: _pickAttachment,
                icon: const Icon(Icons.attach_file_rounded),
                label: const Text('Add Photo / Document'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppColors.brandPrimary,
                  side: BorderSide(color: AppColors.brandPrimary.withOpacity(0.5)),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                ),
              ),
              const SizedBox(height: 32),
              AppButton(
                label: 'Save Record',
                onPressed: _handleSave,
                isLoading: _isLoading,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

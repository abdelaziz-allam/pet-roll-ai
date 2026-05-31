import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../providers/vaccination_provider.dart';
import '../services/vaccination_service.dart';

class AddVaccinationScreen extends ConsumerStatefulWidget {
  final String petId;

  const AddVaccinationScreen({super.key, required this.petId});

  @override
  ConsumerState<AddVaccinationScreen> createState() => _AddVaccinationScreenState();
}

class _AddVaccinationScreenState extends ConsumerState<AddVaccinationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _batchNumberController = TextEditingController();
  final _vetController = TextEditingController();
  final _notesController = TextEditingController();

  DateTime _dateAdministered = DateTime.now();
  DateTime? _nextDueDate;
  bool _isLoading = false;

  @override
  void dispose() {
    _nameController.dispose();
    _batchNumberController.dispose();
    _vetController.dispose();
    _notesController.dispose();
    super.dispose();
  }

  Future<void> _pickDate({required bool isNextDue}) async {
    final initialDate = isNextDue
        ? (_nextDueDate ?? DateTime.now().add(const Duration(days: 30)))
        : _dateAdministered;

    final picked = await showDatePicker(
      context: context,
      initialDate: initialDate,
      firstDate: isNextDue ? DateTime.now() : DateTime(2000),
      lastDate: isNextDue ? DateTime(2030) : DateTime.now(),
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
      setState(() {
        if (isNextDue) {
          _nextDueDate = picked;
        } else {
          _dateAdministered = picked;
        }
      });
    }
  }

  Future<void> _handleSave() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final service = ref.read(vaccinationServiceProvider);
      await service.logVaccination(widget.petId, {
        'name': _nameController.text.trim(),
        'dateAdministered': _dateAdministered.toIso8601String(),
        'nextDueDate': _nextDueDate?.toIso8601String(),
        'batchNumber': _batchNumberController.text.trim().isNotEmpty
            ? _batchNumberController.text.trim()
            : null,
        'veterinarian': _vetController.text.trim().isNotEmpty
            ? _vetController.text.trim()
            : null,
        'notes': _notesController.text.trim().isNotEmpty
            ? _notesController.text.trim()
            : null,
      });

      ref.invalidate(vaccinationsProvider(widget.petId));
      ref.invalidate(upcomingVaccinationsProvider(widget.petId));

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
    final l10n = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.addVaccination, style: AppTypography.heading2),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              AppTextField(
                label: l10n.vaccineName,
                hint: 'e.g. Rabies, DHPP, Bordetella',
                controller: _nameController,
                textInputAction: TextInputAction.next,
                prefixIcon: const Icon(Icons.vaccines_outlined),
                validator: (value) {
                  if (value == null || value.isEmpty) return l10n.vaccineNameAndDateRequired;
                  return null;
                },
              ),
              const SizedBox(height: 16),
              Text(l10n.firstDoseDate, style: AppTypography.label),
              const SizedBox(height: 6),
              InkWell(
                onTap: () => _pickDate(isNextDue: false),
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
                        DateFormat('dd MMMM yyyy').format(_dateAdministered),
                        style: AppTypography.body,
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Text(l10n.nextVisitDate, style: AppTypography.label),
              const SizedBox(height: 6),
              InkWell(
                onTap: () => _pickDate(isNextDue: true),
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
                      Icon(Icons.event, size: 18, color: AppColors.textSecondary),
                      const SizedBox(width: 12),
                      Text(
                        _nextDueDate != null
                            ? DateFormat('dd MMMM yyyy').format(_nextDueDate!)
                            : 'Select next due date',
                        style: AppTypography.body.copyWith(
                          color: _nextDueDate != null
                              ? AppColors.textPrimary
                              : AppColors.textHint,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              AppTextField(
                label: l10n.batchNumber,
                hint: 'Vaccine batch number (optional)',
                controller: _batchNumberController,
                textInputAction: TextInputAction.next,
              ),
              const SizedBox(height: 16),
              AppTextField(
                label: l10n.veterinarian,
                hint: 'Vet name (optional)',
                controller: _vetController,
                textInputAction: TextInputAction.next,
                prefixIcon: const Icon(Icons.person_outline),
              ),
              const SizedBox(height: 16),
              AppTextField(
                label: l10n.notes,
                hint: 'Any additional notes (optional)',
                controller: _notesController,
                maxLines: 3,
                textInputAction: TextInputAction.done,
              ),
              const SizedBox(height: 32),
              AppButton(
                label: l10n.saveVaccination,
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

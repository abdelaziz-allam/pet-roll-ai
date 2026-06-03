import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../l10n/generated/app_localizations.dart';

class AddVaccinationScreen extends StatefulWidget {
  final String petId;

  const AddVaccinationScreen({super.key, required this.petId});

  @override
  State<AddVaccinationScreen> createState() => _AddVaccinationScreenState();
}

class _AddVaccinationScreenState extends State<AddVaccinationScreen> {
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
              primary: AppTheme.primary,
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
      final body = <String, dynamic>{
        'name': _nameController.text.trim(),
        'dateAdministered': _dateAdministered.toIso8601String(),
      };
      if (_nextDueDate != null) body['nextDueDate'] = _nextDueDate!.toIso8601String();
      if (_batchNumberController.text.trim().isNotEmpty) {
        body['batchNumber'] = _batchNumberController.text.trim();
      }
      if (_vetController.text.trim().isNotEmpty) {
        body['veterinarian'] = _vetController.text.trim();
      }
      if (_notesController.text.trim().isNotEmpty) {
        body['notes'] = _notesController.text.trim();
      }

      await ApiService().post('/pets/${widget.petId}/vaccinations', body);

      if (mounted) Navigator.pop(context, true);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
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
        title: Text(l10n.addVaccination, style: const TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: l10n.vaccineName,
                  hintText: 'e.g. Rabies, DHPP, Bordetella',
                  prefixIcon: const Icon(Icons.vaccines_outlined),
                ),
                textInputAction: TextInputAction.next,
                validator: (value) {
                  if (value == null || value.isEmpty) return l10n.vaccineNameAndDateRequired;
                  return null;
                },
              ),
              const SizedBox(height: 16),
              Text(l10n.firstDoseDate, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
              const SizedBox(height: 6),
              InkWell(
                onTap: () => _pickDate(isNextDue: false),
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  decoration: BoxDecoration(
                    border: Border.all(color: AppTheme.divider),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.calendar_today, size: 18, color: AppTheme.textSecondary),
                      const SizedBox(width: 12),
                      Text(
                        DateFormat('dd MMMM yyyy').format(_dateAdministered),
                        style: const TextStyle(fontSize: 15),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              Text(l10n.nextVisitDate, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
              const SizedBox(height: 6),
              InkWell(
                onTap: () => _pickDate(isNextDue: true),
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  decoration: BoxDecoration(
                    border: Border.all(color: AppTheme.divider),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.event, size: 18, color: AppTheme.textSecondary),
                      const SizedBox(width: 12),
                      Text(
                        _nextDueDate != null
                            ? DateFormat('dd MMMM yyyy').format(_nextDueDate!)
                            : 'Select next due date (optional)',
                        style: TextStyle(
                          fontSize: 15,
                          color: _nextDueDate != null ? AppTheme.textPrimary : AppTheme.textSecondary,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _batchNumberController,
                decoration: InputDecoration(
                  labelText: l10n.batchNumber,
                  hintText: 'Vaccine batch number (optional)',
                ),
                textInputAction: TextInputAction.next,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _vetController,
                decoration: InputDecoration(
                  labelText: l10n.veterinarian,
                  hintText: 'Vet name (optional)',
                  prefixIcon: const Icon(Icons.person_outline),
                ),
                textInputAction: TextInputAction.next,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _notesController,
                decoration: InputDecoration(
                  labelText: l10n.notes,
                  hintText: 'Any additional notes (optional)',
                ),
                maxLines: 3,
                textInputAction: TextInputAction.done,
              ),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _handleSave,
                  child: _isLoading
                      ? const SizedBox(
                          width: 20,
                          height: 20,
                          child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white),
                        )
                      : Text(l10n.saveVaccination),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

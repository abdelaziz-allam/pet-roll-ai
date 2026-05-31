import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../providers/pregnancy_provider.dart';
import '../services/pregnancy_service.dart';

class StartPregnancyScreen extends ConsumerStatefulWidget {
  final String petId;

  const StartPregnancyScreen({super.key, required this.petId});

  @override
  ConsumerState<StartPregnancyScreen> createState() => _StartPregnancyScreenState();
}

class _StartPregnancyScreenState extends ConsumerState<StartPregnancyScreen> {
  final _formKey = GlobalKey<FormState>();
  final _notesController = TextEditingController();
  DateTime? _breedingDate;
  DateTime? _expectedDueDate;
  bool _isLoading = false;

  static const _gestationPeriods = {
    'dog': 63,
    'cat': 65,
    'rabbit': 31,
    'hamster': 16,
    'guinea_pig': 68,
  };

  String _selectedSpecies = 'dog';

  void _selectBreedingDate() async {
    final date = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now().subtract(const Duration(days: 120)),
      lastDate: DateTime.now(),
    );
    if (date != null) {
      setState(() {
        _breedingDate = date;
        _calculateDueDate();
      });
    }
  }

  void _calculateDueDate() {
    if (_breedingDate == null) return;
    final days = _gestationPeriods[_selectedSpecies] ?? 63;
    setState(() {
      _expectedDueDate = _breedingDate!.add(Duration(days: days));
    });
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    if (_breedingDate == null) return;

    setState(() => _isLoading = true);

    try {
      await ref.read(pregnancyServiceProvider).startTracking(widget.petId, {
        'breedingDate': _breedingDate!.toIso8601String(),
        'expectedDueDate': _expectedDueDate!.toIso8601String(),
        'species': _selectedSpecies,
        'notes': _notesController.text.isNotEmpty ? _notesController.text : null,
      });

      ref.invalidate(activePregnancyProvider(widget.petId));

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
    _notesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(l10n.startTracking)),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Species', style: AppTypography.label),
              const SizedBox(height: 8),
              DropdownButtonFormField<String>(
                value: _selectedSpecies,
                items: _gestationPeriods.keys
                    .map((species) => DropdownMenuItem(
                          value: species,
                          child: Text(species[0].toUpperCase() + species.substring(1)),
                        ))
                    .toList(),
                onChanged: (value) {
                  if (value != null) {
                    setState(() {
                      _selectedSpecies = value;
                      _calculateDueDate();
                    });
                  }
                },
                decoration: const InputDecoration(
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 20),
              Text(l10n.matingDate, style: AppTypography.label),
              const SizedBox(height: 8),
              InkWell(
                onTap: _selectBreedingDate,
                child: Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                  decoration: BoxDecoration(
                    border: Border.all(color: AppColors.borderDefault),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _breedingDate != null
                        ? '${_breedingDate!.day}/${_breedingDate!.month}/${_breedingDate!.year}'
                        : l10n.matingDate,
                    style: AppTypography.body.copyWith(
                      color: _breedingDate != null
                          ? AppColors.textPrimary
                          : AppColors.textHint,
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Text(l10n.expectedDeliveryDate, style: AppTypography.label),
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
                decoration: BoxDecoration(
                  color: AppColors.bgTertiary,
                  border: Border.all(color: AppColors.borderLight),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  _expectedDueDate != null
                      ? '${_expectedDueDate!.day}/${_expectedDueDate!.month}/${_expectedDueDate!.year}'
                      : l10n.autoCalculatedFromMatingDate,
                  style: AppTypography.body.copyWith(
                    color: _expectedDueDate != null
                        ? AppColors.textPrimary
                        : AppColors.textHint,
                  ),
                ),
              ),
              if (_expectedDueDate != null) ...[
                const SizedBox(height: 4),
                Text(
                  'Gestation: ${_gestationPeriods[_selectedSpecies]} days',
                  style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
                ),
              ],
              const SizedBox(height: 20),
              AppTextField(
                label: l10n.notes,
                hint: 'Optional notes about the pregnancy',
                controller: _notesController,
                maxLines: 3,
              ),
              const SizedBox(height: 32),
              AppButton(
                label: l10n.startTracking,
                onPressed: _breedingDate != null ? _submit : null,
                isLoading: _isLoading,
              ),
            ],
          ),
        ),
      ),
    );
  }
}

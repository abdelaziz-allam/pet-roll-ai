import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../../core/widgets/error_view.dart';
import '../models/pet_model.dart';
import '../providers/pet_provider.dart';
import '../services/pet_service.dart';

class EditPetScreen extends ConsumerStatefulWidget {
  final String petId;

  const EditPetScreen({super.key, required this.petId});

  @override
  ConsumerState<EditPetScreen> createState() => _EditPetScreenState();
}

class _EditPetScreenState extends ConsumerState<EditPetScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _breedController = TextEditingController();
  final _weightController = TextEditingController();

  String _selectedSpecies = 'dog';
  String _selectedGender = 'male';
  bool _isNeutered = false;
  bool _isAvailableForMating = false;
  bool _isSaving = false;
  bool _initialized = false;

  static const _speciesOptions = ['dog', 'cat', 'bird', 'rabbit', 'horse', 'other'];
  static const _genderOptions = ['male', 'female'];

  @override
  void dispose() {
    _nameController.dispose();
    _breedController.dispose();
    _weightController.dispose();
    super.dispose();
  }

  void _initFromPet(PetModel pet) {
    if (_initialized) return;
    _initialized = true;
    _nameController.text = pet.name;
    _breedController.text = pet.breed;
    _weightController.text = pet.weight?.toString() ?? '';
    _selectedSpecies = pet.species;
    _selectedGender = pet.gender;
    _isNeutered = pet.isNeutered;
    _isAvailableForMating = pet.isAvailableForMating;
  }

  @override
  Widget build(BuildContext context) {
    final petAsync = ref.watch(petDetailProvider(widget.petId));

    return Scaffold(
      backgroundColor: AppColors.bgSecondary,
      appBar: AppBar(
        title: const Text('Edit Pet'),
        backgroundColor: AppColors.bgPrimary,
      ),
      body: petAsync.when(
        loading: () => const LoadingIndicator(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(petDetailProvider(widget.petId)),
        ),
        data: (pet) {
          _initFromPet(pet);
          return _buildForm();
        },
      ),
    );
  }

  Widget _buildForm() {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            AppTextField(
              controller: _nameController,
              label: 'Pet Name',
              hint: 'Enter pet name',
              validator: (v) =>
                  (v == null || v.trim().isEmpty) ? 'Name is required' : null,
            ),
            const SizedBox(height: 20),
            Text('Species', style: AppTypography.label.copyWith(color: AppColors.textPrimary)),
            const SizedBox(height: 8),
            Wrap(
              spacing: 8,
              children: _speciesOptions.map((s) {
                final selected = _selectedSpecies == s;
                return ChoiceChip(
                  label: Text(s[0].toUpperCase() + s.substring(1)),
                  selected: selected,
                  selectedColor: AppColors.brandPrimary.withOpacity(0.15),
                  labelStyle: AppTypography.bodySmall.copyWith(
                    color: selected ? AppColors.brandPrimary : AppColors.textPrimary,
                    fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
                  ),
                  onSelected: (_) => setState(() => _selectedSpecies = s),
                );
              }).toList(),
            ),
            const SizedBox(height: 20),
            AppTextField(
              controller: _breedController,
              label: 'Breed',
              hint: 'Enter breed',
            ),
            const SizedBox(height: 20),
            Text('Gender', style: AppTypography.label.copyWith(color: AppColors.textPrimary)),
            const SizedBox(height: 8),
            Row(
              children: _genderOptions.map((g) {
                final selected = _selectedGender == g;
                return Padding(
                  padding: const EdgeInsets.only(right: 8),
                  child: ChoiceChip(
                    label: Text(g[0].toUpperCase() + g.substring(1)),
                    selected: selected,
                    selectedColor: AppColors.brandPrimary.withOpacity(0.15),
                    labelStyle: AppTypography.bodySmall.copyWith(
                      color: selected ? AppColors.brandPrimary : AppColors.textPrimary,
                      fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
                    ),
                    onSelected: (_) => setState(() => _selectedGender = g),
                  ),
                );
              }).toList(),
            ),
            const SizedBox(height: 20),
            AppTextField(
              controller: _weightController,
              label: 'Weight (kg)',
              hint: 'Enter weight',
              keyboardType: const TextInputType.numberWithOptions(decimal: true),
            ),
            const SizedBox(height: 20),
            SwitchListTile(
              contentPadding: EdgeInsets.zero,
              title: Text('Neutered', style: AppTypography.body.copyWith(color: AppColors.textPrimary)),
              value: _isNeutered,
              activeColor: AppColors.brandPrimary,
              onChanged: (v) => setState(() => _isNeutered = v),
            ),
            SwitchListTile(
              contentPadding: EdgeInsets.zero,
              title: Text('Available for Mating', style: AppTypography.body.copyWith(color: AppColors.textPrimary)),
              value: _isAvailableForMating,
              activeColor: AppColors.brandPrimary,
              onChanged: (v) => setState(() => _isAvailableForMating = v),
            ),
            const SizedBox(height: 32),
            AppButton(
              label: 'Save Changes',
              isLoading: _isSaving,
              onPressed: _save,
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isSaving = true);

    try {
      final data = <String, dynamic>{
        'name': _nameController.text.trim(),
        'species': _selectedSpecies,
        'breed': _breedController.text.trim(),
        'gender': _selectedGender,
        'isNeutered': _isNeutered,
        'isAvailableForMating': _isAvailableForMating,
      };

      final weightText = _weightController.text.trim();
      if (weightText.isNotEmpty) {
        data['weight'] = double.tryParse(weightText);
        data['weightUnit'] = 'kg';
      }

      await ref.read(petServiceProvider).updatePet(widget.petId, data);
      ref.invalidate(petDetailProvider(widget.petId));
      ref.invalidate(userPetsProvider);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Pet updated successfully!')),
        );
        context.pop();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to update: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }
}

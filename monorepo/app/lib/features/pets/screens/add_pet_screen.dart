import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../providers/pet_provider.dart';
import '../services/pet_service.dart';

class AddPetScreen extends ConsumerStatefulWidget {
  const AddPetScreen({super.key});

  @override
  ConsumerState<AddPetScreen> createState() => _AddPetScreenState();
}

class _AddPetScreenState extends ConsumerState<AddPetScreen> {
  final _pageController = PageController();
  int _currentStep = 0;
  bool _isSubmitting = false;

  final _nameController = TextEditingController();
  String _selectedSpecies = '';
  String _selectedBreed = '';
  String? _selectedBreedId;
  final _breedSearchController = TextEditingController();

  DateTime? _dateOfBirth;
  String _selectedGender = '';
  final _weightController = TextEditingController();
  String _weightUnit = 'kg';
  final _colorController = TextEditingController();

  final List<XFile> _photos = [];

  @override
  void dispose() {
    _pageController.dispose();
    _nameController.dispose();
    _breedSearchController.dispose();
    _weightController.dispose();
    _colorController.dispose();
    super.dispose();
  }

  void _nextStep() {
    if (_currentStep < 2) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
      setState(() => _currentStep++);
    } else {
      _submitPet();
    }
  }

  void _previousStep() {
    if (_currentStep > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
      setState(() => _currentStep--);
    } else {
      context.pop();
    }
  }

  bool get _canProceed {
    switch (_currentStep) {
      case 0:
        return _nameController.text.isNotEmpty && _selectedSpecies.isNotEmpty;
      case 1:
        return _selectedGender.isNotEmpty;
      case 2:
        return true;
      default:
        return false;
    }
  }

  Future<void> _submitPet() async {
    if (_isSubmitting) return;
    setState(() => _isSubmitting = true);

    try {
      final data = <String, dynamic>{
        'name': _nameController.text.trim(),
        'species': _selectedSpecies,
        'breed': _selectedBreed,
        'gender': _selectedGender,
      };

      if (_selectedBreedId != null) data['breedId'] = _selectedBreedId;
      if (_dateOfBirth != null) data['dateOfBirth'] = _dateOfBirth!.toIso8601String();
      if (_weightController.text.isNotEmpty) {
        data['weight'] = double.tryParse(_weightController.text);
        data['weightUnit'] = _weightUnit;
      }

      final petService = ref.read(petServiceProvider);
      final pet = await petService.createPet(data);

      for (final photo in _photos) {
        await petService.uploadPhoto(pet.id, photo.path);
      }

      ref.invalidate(userPetsProvider);
      if (mounted) context.pop();
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to add pet: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isSubmitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.bgPrimary,
      appBar: AppBar(
        title: Text(
          'Add Pet',
          style: AppTypography.heading2.copyWith(color: AppColors.textPrimary),
        ),
        backgroundColor: AppColors.bgPrimary,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: AppColors.textPrimary),
          onPressed: _previousStep,
        ),
      ),
      body: Column(
        children: [
          _StepIndicator(currentStep: _currentStep),
          Expanded(
            child: PageView(
              controller: _pageController,
              physics: const NeverScrollableScrollPhysics(),
              children: [
                _StepBasicInfo(
                  nameController: _nameController,
                  selectedSpecies: _selectedSpecies,
                  onSpeciesSelected: (species) => setState(() => _selectedSpecies = species),
                  breedSearchController: _breedSearchController,
                  selectedBreed: _selectedBreed,
                  onBreedSelected: (breed, breedId) => setState(() {
                    _selectedBreed = breed;
                    _selectedBreedId = breedId;
                  }),
                  onNameChanged: () => setState(() {}),
                ),
                _StepDetails(
                  dateOfBirth: _dateOfBirth,
                  onDateSelected: (date) => setState(() => _dateOfBirth = date),
                  selectedGender: _selectedGender,
                  onGenderSelected: (gender) => setState(() => _selectedGender = gender),
                  weightController: _weightController,
                  weightUnit: _weightUnit,
                  onWeightUnitChanged: (unit) => setState(() => _weightUnit = unit),
                  colorController: _colorController,
                ),
                _StepPhotos(
                  photos: _photos,
                  onPhotosChanged: () => setState(() {}),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(16),
            child: AppButton(
              label: _currentStep == 2 ? 'Add Pet' : 'Next',
              onPressed: _canProceed ? _nextStep : null,
              isLoading: _isSubmitting,
            ),
          ),
        ],
      ),
    );
  }
}

class _StepIndicator extends StatelessWidget {
  final int currentStep;

  const _StepIndicator({required this.currentStep});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      child: Row(
        children: List.generate(3, (index) {
          final isActive = index <= currentStep;
          return Expanded(
            child: Container(
              margin: EdgeInsets.only(right: index < 2 ? 8 : 0),
              height: 4,
              decoration: BoxDecoration(
                color: isActive ? AppColors.brandPrimary : AppColors.borderLight,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          );
        }),
      ),
    );
  }
}

class _StepBasicInfo extends ConsumerWidget {
  final TextEditingController nameController;
  final String selectedSpecies;
  final ValueChanged<String> onSpeciesSelected;
  final TextEditingController breedSearchController;
  final String selectedBreed;
  final void Function(String breed, String? breedId) onBreedSelected;
  final VoidCallback onNameChanged;

  const _StepBasicInfo({
    required this.nameController,
    required this.selectedSpecies,
    required this.onSpeciesSelected,
    required this.breedSearchController,
    required this.selectedBreed,
    required this.onBreedSelected,
    required this.onNameChanged,
  });

  static const _speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Horse', 'Other'];

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final breedsAsync = selectedSpecies.isNotEmpty
        ? ref.watch(breedsProvider(selectedSpecies.toLowerCase()))
        : null;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Basic Info', style: AppTypography.heading2.copyWith(color: AppColors.textPrimary)),
          const SizedBox(height: 4),
          Text(
            'Tell us about your pet',
            style: AppTypography.body.copyWith(color: AppColors.textSecondary),
          ),
          const SizedBox(height: 24),
          AppTextField(
            controller: nameController,
            label: 'Pet Name',
            hint: 'Enter your pet\'s name',
            onChanged: (_) => onNameChanged(),
          ),
          const SizedBox(height: 20),
          Text('Species', style: AppTypography.label.copyWith(color: AppColors.textPrimary)),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 8,
            children: _speciesOptions.map((species) {
              final isSelected = selectedSpecies == species;
              return GestureDetector(
                onTap: () => onSpeciesSelected(species),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                  decoration: BoxDecoration(
                    color: isSelected ? AppColors.brandPrimary : AppColors.bgSecondary,
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(
                      color: isSelected ? AppColors.brandPrimary : AppColors.borderDefault,
                    ),
                  ),
                  child: Text(
                    species,
                    style: AppTypography.label.copyWith(
                      color: isSelected ? Colors.white : AppColors.textPrimary,
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 20),
          if (selectedSpecies.isNotEmpty) ...[
            Text('Breed', style: AppTypography.label.copyWith(color: AppColors.textPrimary)),
            const SizedBox(height: 8),
            AppTextField(
              controller: breedSearchController,
              hint: 'Search breed...',
              prefixIcon: const Icon(Icons.search, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 8),
            if (breedsAsync != null)
              breedsAsync.when(
                loading: () => const Padding(
                  padding: EdgeInsets.all(8),
                  child: LoadingIndicator(size: 20),
                ),
                error: (_, __) => const SizedBox.shrink(),
                data: (breeds) {
                  final query = breedSearchController.text.toLowerCase();
                  final filtered = breeds.where((b) {
                    final name = (b['name'] as String? ?? '').toLowerCase();
                    return query.isEmpty || name.contains(query);
                  }).toList();

                  if (filtered.isEmpty) return const SizedBox.shrink();

                  return Container(
                    constraints: const BoxConstraints(maxHeight: 150),
                    decoration: BoxDecoration(
                      color: AppColors.bgPrimary,
                      border: Border.all(color: AppColors.borderLight),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: ListView.builder(
                      shrinkWrap: true,
                      itemCount: filtered.length,
                      itemBuilder: (context, index) {
                        final breed = filtered[index];
                        final name = breed['name'] as String? ?? '';
                        final id = breed['id'] as String?;
                        final isSelected = selectedBreed == name;
                        return ListTile(
                          dense: true,
                          title: Text(
                            name,
                            style: AppTypography.body.copyWith(
                              color: isSelected ? AppColors.brandPrimary : AppColors.textPrimary,
                            ),
                          ),
                          trailing: isSelected
                              ? const Icon(Icons.check, size: 18, color: AppColors.brandPrimary)
                              : null,
                          onTap: () => onBreedSelected(name, id),
                        );
                      },
                    ),
                  );
                },
              ),
          ],
        ],
      ),
    );
  }
}

class _StepDetails extends StatelessWidget {
  final DateTime? dateOfBirth;
  final ValueChanged<DateTime> onDateSelected;
  final String selectedGender;
  final ValueChanged<String> onGenderSelected;
  final TextEditingController weightController;
  final String weightUnit;
  final ValueChanged<String> onWeightUnitChanged;
  final TextEditingController colorController;

  const _StepDetails({
    required this.dateOfBirth,
    required this.onDateSelected,
    required this.selectedGender,
    required this.onGenderSelected,
    required this.weightController,
    required this.weightUnit,
    required this.onWeightUnitChanged,
    required this.colorController,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Details', style: AppTypography.heading2.copyWith(color: AppColors.textPrimary)),
          const SizedBox(height: 4),
          Text(
            'A few more details',
            style: AppTypography.body.copyWith(color: AppColors.textSecondary),
          ),
          const SizedBox(height: 24),
          Text('Date of Birth', style: AppTypography.label.copyWith(color: AppColors.textPrimary)),
          const SizedBox(height: 8),
          GestureDetector(
            onTap: () async {
              final date = await showDatePicker(
                context: context,
                initialDate: dateOfBirth ?? DateTime.now(),
                firstDate: DateTime(2000),
                lastDate: DateTime.now(),
              );
              if (date != null) onDateSelected(date);
            },
            child: Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
              decoration: BoxDecoration(
                border: Border.all(color: AppColors.borderDefault),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Text(
                dateOfBirth != null
                    ? '${dateOfBirth!.day}/${dateOfBirth!.month}/${dateOfBirth!.year}'
                    : 'Select date',
                style: AppTypography.body.copyWith(
                  color: dateOfBirth != null ? AppColors.textPrimary : AppColors.textHint,
                ),
              ),
            ),
          ),
          const SizedBox(height: 20),
          Text('Gender', style: AppTypography.label.copyWith(color: AppColors.textPrimary)),
          const SizedBox(height: 8),
          Row(
            children: ['Male', 'Female'].map((gender) {
              final isSelected = selectedGender == gender;
              return Expanded(
                child: Padding(
                  padding: EdgeInsets.only(right: gender == 'Male' ? 8 : 0),
                  child: GestureDetector(
                    onTap: () => onGenderSelected(gender),
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 14),
                      decoration: BoxDecoration(
                        color: isSelected ? AppColors.brandPrimary : AppColors.bgSecondary,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: isSelected ? AppColors.brandPrimary : AppColors.borderDefault,
                        ),
                      ),
                      child: Center(
                        child: Text(
                          gender,
                          style: AppTypography.label.copyWith(
                            color: isSelected ? Colors.white : AppColors.textPrimary,
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              );
            }).toList(),
          ),
          const SizedBox(height: 20),
          Text('Weight', style: AppTypography.label.copyWith(color: AppColors.textPrimary)),
          const SizedBox(height: 8),
          Row(
            children: [
              Expanded(
                flex: 2,
                child: AppTextField(
                  controller: weightController,
                  hint: 'Weight',
                  keyboardType: TextInputType.number,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12),
                  decoration: BoxDecoration(
                    border: Border.all(color: AppColors.borderDefault),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      value: weightUnit,
                      isExpanded: true,
                      items: ['kg', 'lbs'].map((unit) {
                        return DropdownMenuItem(value: unit, child: Text(unit));
                      }).toList(),
                      onChanged: (value) {
                        if (value != null) onWeightUnitChanged(value);
                      },
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 20),
          AppTextField(
            controller: colorController,
            label: 'Color',
            hint: 'e.g. Golden, Black, White',
          ),
        ],
      ),
    );
  }
}

class _StepPhotos extends StatelessWidget {
  final List<XFile> photos;
  final VoidCallback onPhotosChanged;

  const _StepPhotos({
    required this.photos,
    required this.onPhotosChanged,
  });

  static const int maxPhotos = 50;

  Future<void> _pickPhoto() async {
    if (photos.length >= maxPhotos) return;
    final picker = ImagePicker();
    final image = await picker.pickImage(source: ImageSource.gallery, maxWidth: 1200);
    if (image != null) {
      photos.add(image);
      onPhotosChanged();
    }
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Photos', style: AppTypography.heading2.copyWith(color: AppColors.textPrimary)),
          const SizedBox(height: 4),
          Text(
            'Add up to $maxPhotos photos of your pet (${photos.length}/$maxPhotos)',
            style: AppTypography.body.copyWith(color: AppColors.textSecondary),
          ),
          const SizedBox(height: 24),
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: 8,
              mainAxisSpacing: 8,
            ),
            itemCount: photos.length + 1,
            itemBuilder: (context, index) {
              if (index == photos.length) {
                return GestureDetector(
                  onTap: _pickPhoto,
                  child: Container(
                    decoration: BoxDecoration(
                      color: AppColors.bgSecondary,
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppColors.borderDefault, style: BorderStyle.solid),
                    ),
                    child: const Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.add_a_photo_outlined, size: 28, color: AppColors.textSecondary),
                        SizedBox(height: 4),
                        Text('Add', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
                      ],
                    ),
                  ),
                );
              }

              return Stack(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Image.file(
                      File(photos[index].path),
                      width: double.infinity,
                      height: double.infinity,
                      fit: BoxFit.cover,
                    ),
                  ),
                  Positioned(
                    top: 4,
                    right: 4,
                    child: GestureDetector(
                      onTap: () {
                        photos.removeAt(index);
                        onPhotosChanged();
                      },
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
        ],
      ),
    );
  }
}

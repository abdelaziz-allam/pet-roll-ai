import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:image_picker/image_picker.dart';

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
  final _speciesSearchController = TextEditingController();

  String _selectedSpecies = 'dog';
  String _selectedGender = 'male';
  bool _isNeutered = false;
  bool _isAvailableForMating = false;
  bool _isSaving = false;
  bool _initialized = false;
  bool _isUploadingPhoto = false;

  List<PetPhoto> _photos = [];
  int _primaryPhotoIndex = 0;

  static const _allSpecies = [
    'dog', 'cat', 'bird', 'rabbit', 'horse', 'hamster', 'guinea pig',
    'fish', 'turtle', 'snake', 'lizard', 'parrot', 'ferret', 'chinchilla',
    'hedgehog', 'frog', 'hermit crab', 'gerbil', 'mouse', 'rat',
    'sugar glider', 'axolotl', 'chameleon', 'gecko', 'iguana',
    'cockatiel', 'canary', 'dove', 'pigeon', 'duck', 'chicken',
    'goat', 'sheep', 'pig', 'cow', 'donkey', 'alpaca', 'llama',
    'other',
  ];

  static const _genderOptions = ['male', 'female'];

  @override
  void dispose() {
    _nameController.dispose();
    _breedController.dispose();
    _weightController.dispose();
    _speciesSearchController.dispose();
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
    _photos = List.from(pet.photos);
    _primaryPhotoIndex = 0;
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
    return Column(
      children: [
        Expanded(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Form(
              key: _formKey,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _buildPhotoSection(),
                  const SizedBox(height: 24),
                  AppTextField(
                    controller: _nameController,
                    label: 'Pet Name',
                    hint: 'Enter pet name',
                    validator: (v) =>
                        (v == null || v.trim().isEmpty) ? 'Name is required' : null,
                  ),
                  const SizedBox(height: 20),
                  _buildSpeciesSelector(),
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
                  const SizedBox(height: 20),
                ],
              ),
            ),
          ),
        ),
        Container(
          padding: const EdgeInsets.fromLTRB(20, 12, 20, 20),
          decoration: BoxDecoration(
            color: AppColors.bgPrimary,
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.05),
                blurRadius: 10,
                offset: const Offset(0, -2),
              ),
            ],
          ),
          child: SafeArea(
            top: false,
            child: AppButton(
              label: 'Save Changes',
              isLoading: _isSaving,
              onPressed: _save,
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildPhotoSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text('Photos', style: AppTypography.label.copyWith(color: AppColors.textPrimary)),
            const SizedBox(width: 8),
            Text(
              '(${_photos.length}/50)',
              style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
            ),
            const Spacer(),
            if (_photos.length < 50)
              TextButton.icon(
                onPressed: _isUploadingPhoto ? null : _pickAndUploadPhoto,
                icon: _isUploadingPhoto
                    ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2))
                    : const Icon(Icons.add_a_photo_rounded, size: 18),
                label: Text(_isUploadingPhoto ? 'Uploading...' : 'Add Photo'),
                style: TextButton.styleFrom(foregroundColor: AppColors.brandPrimary),
              ),
          ],
        ),
        const SizedBox(height: 12),
        if (_photos.isEmpty)
          Container(
            height: 120,
            width: double.infinity,
            decoration: BoxDecoration(
              color: AppColors.bgPrimary,
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: AppColors.borderLight),
            ),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.photo_library_rounded, size: 36, color: AppColors.textHint),
                const SizedBox(height: 8),
                Text(
                  'No photos yet. Add one!',
                  style: AppTypography.bodySmall.copyWith(color: AppColors.textHint),
                ),
              ],
            ),
          )
        else
          SizedBox(
            height: 130,
            child: ListView.separated(
              scrollDirection: Axis.horizontal,
              itemCount: _photos.length,
              separatorBuilder: (_, __) => const SizedBox(width: 10),
              itemBuilder: (context, index) {
                final photo = _photos[index];
                final isProfile = index == _primaryPhotoIndex;
                return GestureDetector(
                  onTap: () => setState(() => _primaryPhotoIndex = index),
                  child: Stack(
                    children: [
                      Container(
                        width: 110,
                        height: 130,
                        decoration: BoxDecoration(
                          borderRadius: BorderRadius.circular(14),
                          border: Border.all(
                            color: isProfile ? AppColors.brandPrimary : AppColors.borderLight,
                            width: isProfile ? 3 : 1,
                          ),
                        ),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(12),
                          child: Image.network(
                            photo.url,
                            fit: BoxFit.cover,
                            errorBuilder: (_, __, ___) => Container(
                              color: AppColors.bgSecondary,
                              child: const Icon(Icons.broken_image_rounded, color: AppColors.textHint),
                            ),
                          ),
                        ),
                      ),
                      if (isProfile)
                        Positioned(
                          bottom: 4,
                          left: 4,
                          right: 4,
                          child: Container(
                            padding: const EdgeInsets.symmetric(vertical: 3),
                            decoration: BoxDecoration(
                              color: AppColors.brandPrimary,
                              borderRadius: BorderRadius.circular(8),
                            ),
                            child: Text(
                              'Profile',
                              textAlign: TextAlign.center,
                              style: AppTypography.caption.copyWith(
                                color: Colors.white,
                                fontWeight: FontWeight.w600,
                                fontSize: 10,
                              ),
                            ),
                          ),
                        ),
                      Positioned(
                        top: 4,
                        right: 4,
                        child: GestureDetector(
                          onTap: () => _removePhoto(index),
                          child: Container(
                            padding: const EdgeInsets.all(4),
                            decoration: const BoxDecoration(
                              color: Colors.red,
                              shape: BoxShape.circle,
                            ),
                            child: const Icon(Icons.close, color: Colors.white, size: 14),
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        if (_photos.isNotEmpty)
          Padding(
            padding: const EdgeInsets.only(top: 8),
            child: Text(
              'Tap a photo to set it as profile image',
              style: AppTypography.caption.copyWith(color: AppColors.textHint),
            ),
          ),
      ],
    );
  }

  Widget _buildSpeciesSelector() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Species', style: AppTypography.label.copyWith(color: AppColors.textPrimary)),
        const SizedBox(height: 8),
        GestureDetector(
          onTap: _showSpeciesBottomSheet,
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
            decoration: BoxDecoration(
              color: AppColors.bgPrimary,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.borderLight),
            ),
            child: Row(
              children: [
                Text(
                  _selectedSpecies[0].toUpperCase() + _selectedSpecies.substring(1),
                  style: AppTypography.body.copyWith(color: AppColors.textPrimary),
                ),
                const Spacer(),
                const Icon(Icons.arrow_drop_down_rounded, color: AppColors.textSecondary),
              ],
            ),
          ),
        ),
      ],
    );
  }

  void _showSpeciesBottomSheet() {
    _speciesSearchController.clear();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (context, setSheetState) {
            final query = _speciesSearchController.text.toLowerCase();
            final filteredSpecies = query.isEmpty
                ? _allSpecies
                : _allSpecies.where((s) => s.toLowerCase().contains(query)).toList();

            return Container(
              height: MediaQuery.of(context).size.height * 0.7,
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
              ),
              child: Column(
                children: [
                  const SizedBox(height: 12),
                  Container(
                    width: 40,
                    height: 4,
                    decoration: BoxDecoration(
                      color: AppColors.borderLight,
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Text(
                      'Select Species',
                      style: AppTypography.heading3.copyWith(color: AppColors.textPrimary),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: TextField(
                      controller: _speciesSearchController,
                      decoration: InputDecoration(
                        hintText: 'Search species...',
                        prefixIcon: const Icon(Icons.search_rounded),
                        border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide(color: AppColors.borderLight),
                        ),
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(12),
                          borderSide: BorderSide(color: AppColors.borderLight),
                        ),
                        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                      ),
                      onChanged: (_) => setSheetState(() {}),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Expanded(
                    child: ListView.builder(
                      padding: const EdgeInsets.symmetric(horizontal: 8),
                      itemCount: filteredSpecies.length,
                      itemBuilder: (context, index) {
                        final species = filteredSpecies[index];
                        final isSelected = species == _selectedSpecies;
                        return ListTile(
                          title: Text(
                            species[0].toUpperCase() + species.substring(1),
                            style: AppTypography.body.copyWith(
                              color: isSelected ? AppColors.brandPrimary : AppColors.textPrimary,
                              fontWeight: isSelected ? FontWeight.w600 : FontWeight.w400,
                            ),
                          ),
                          trailing: isSelected
                              ? const Icon(Icons.check_circle_rounded, color: AppColors.brandPrimary)
                              : null,
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                          selectedTileColor: AppColors.brandPrimary.withOpacity(0.08),
                          selected: isSelected,
                          onTap: () {
                            setState(() => _selectedSpecies = species);
                            Navigator.pop(context);
                          },
                        );
                      },
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  Future<void> _pickAndUploadPhoto() async {
    if (_photos.length >= 50) return;

    final picker = ImagePicker();
    final image = await picker.pickImage(source: ImageSource.gallery, maxWidth: 1200);
    if (image == null) return;

    setState(() => _isUploadingPhoto = true);

    try {
      final petService = ref.read(petServiceProvider);
      final updatedPet = await petService.uploadPhoto(widget.petId, image.path);
      setState(() {
        _photos = List.from(updatedPet.photos);
        if (_primaryPhotoIndex >= _photos.length) {
          _primaryPhotoIndex = 0;
        }
      });
      ref.invalidate(petDetailProvider(widget.petId));
      ref.invalidate(userPetsProvider);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to upload photo: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isUploadingPhoto = false);
    }
  }

  Future<void> _removePhoto(int index) async {
    final photo = _photos[index];

    final confirm = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Remove Photo'),
        content: const Text('Are you sure you want to remove this photo?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Remove', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );

    if (confirm != true) return;

    try {
      final petService = ref.read(petServiceProvider);
      await petService.removePhoto(widget.petId, photo.path);
      setState(() {
        _photos.removeAt(index);
        if (_primaryPhotoIndex >= _photos.length) {
          _primaryPhotoIndex = _photos.isEmpty ? 0 : _photos.length - 1;
        }
      });
      ref.invalidate(petDetailProvider(widget.petId));
      ref.invalidate(userPetsProvider);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to remove photo: $e')),
        );
      }
    }
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

      // Reorder photos so primary is first
      if (_photos.isNotEmpty && _primaryPhotoIndex > 0) {
        final reordered = <PetPhoto>[_photos[_primaryPhotoIndex]];
        for (var i = 0; i < _photos.length; i++) {
          if (i != _primaryPhotoIndex) reordered.add(_photos[i]);
        }
        data['photos'] = reordered.map((p) => p.toJson()).toList();
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

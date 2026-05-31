import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../../pets/models/pet_model.dart';
import '../../pets/providers/pet_provider.dart';
import '../providers/mating_provider.dart';

class CreateListingScreen extends ConsumerStatefulWidget {
  const CreateListingScreen({super.key});

  @override
  ConsumerState<CreateListingScreen> createState() =>
      _CreateListingScreenState();
}

class _CreateListingScreenState extends ConsumerState<CreateListingScreen> {
  final _formKey = GlobalKey<FormState>();
  final _descriptionController = TextEditingController();
  final _cityController = TextEditingController();
  final _countryController = TextEditingController();
  final _preferencesController = TextEditingController();

  String? _selectedPetId;
  bool _isLoading = false;

  @override
  void dispose() {
    _descriptionController.dispose();
    _cityController.dispose();
    _countryController.dispose();
    _preferencesController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final petsAsync = ref.watch(userPetsProvider);

    return Scaffold(
      appBar: AppBar(title: Text(l10n.createListing)),
      body: petsAsync.when(
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (error, _) => Center(child: Text('${l10n.error}: $error')),
        data: (pets) => _buildForm(pets),
      ),
    );
  }

  Widget _buildForm(List<PetModel> pets) {
    final l10n = AppLocalizations.of(context)!;
    final availablePets =
        pets.where((p) => p.isAvailableForMating).toList();

    return Form(
      key: _formKey,
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(l10n.selectPet,
                style: AppTypography.label
                    .copyWith(color: AppColors.textPrimary)),
            const SizedBox(height: 6),
            DropdownButtonFormField<String>(
              value: _selectedPetId,
              decoration: InputDecoration(
                hintText: l10n.selectPet,
              ),
              items: availablePets
                  .map((pet) => DropdownMenuItem(
                        value: pet.id,
                        child: Text('${pet.name} (${pet.breed})'),
                      ))
                  .toList(),
              onChanged: (value) {
                setState(() => _selectedPetId = value);
              },
              validator: (value) =>
                  value == null ? l10n.selectPet : null,
            ),
            if (availablePets.isEmpty) ...[
              const SizedBox(height: 8),
              Text(
                l10n.noListingsFound,
                style: AppTypography.bodySmall
                    .copyWith(color: AppColors.warning),
              ),
            ],
            const SizedBox(height: 20),
            AppTextField(
              label: l10n.description,
              hint: l10n.enterDescription,
              controller: _descriptionController,
              maxLines: 4,
              validator: (value) => value == null || value.isEmpty
                  ? l10n.enterDescription
                  : null,
            ),
            const SizedBox(height: 20),
            Text(l10n.location,
                style: AppTypography.heading3
                    .copyWith(color: AppColors.textPrimary)),
            const SizedBox(height: 12),
            AppTextField(
              label: l10n.city,
              hint: l10n.city,
              controller: _cityController,
              validator: (value) =>
                  value == null || value.isEmpty ? l10n.city : null,
            ),
            const SizedBox(height: 12),
            AppTextField(
              label: l10n.country,
              hint: l10n.country,
              controller: _countryController,
              validator: (value) => value == null || value.isEmpty
                  ? l10n.country
                  : null,
            ),
            const SizedBox(height: 20),
            AppTextField(
              label: l10n.preferences,
              hint: l10n.preferences,
              controller: _preferencesController,
              maxLines: 3,
            ),
            const SizedBox(height: 32),
            AppButton(
              label: l10n.createListing,
              isLoading: _isLoading,
              onPressed: _submit,
            ),
          ],
        ),
      ),
    );
  }

  Future<void> _submit() async {
    final l10n = AppLocalizations.of(context)!;
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isLoading = true);

    try {
      final matingService = ref.read(matingServiceProvider);
      await matingService.createListing({
        'petId': _selectedPetId,
        'description': _descriptionController.text,
        'location': {
          'city': _cityController.text,
          'country': _countryController.text,
        },
        'preferences': _preferencesController.text.isEmpty
            ? null
            : {'notes': _preferencesController.text},
      });

      ref.invalidate(matingListingsProvider(null));

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(l10n.listingCreated)),
        );
        context.pop();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('${l10n.error}: $e')),
        );
      }
    } finally {
      if (mounted) {
        setState(() => _isLoading = false);
      }
    }
  }
}

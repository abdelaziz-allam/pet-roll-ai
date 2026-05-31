import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/app_text_field.dart';
import '../../../core/widgets/avatar_widget.dart';
import '../../../core/utils/timezone_country_map.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../../auth/providers/auth_provider.dart';
import '../../auth/services/auth_service.dart';

class EditProfileScreen extends ConsumerStatefulWidget {
  const EditProfileScreen({super.key});

  @override
  ConsumerState<EditProfileScreen> createState() => _EditProfileScreenState();
}

class _EditProfileScreenState extends ConsumerState<EditProfileScreen> {
  final _formKey = GlobalKey<FormState>();
  final _displayNameController = TextEditingController();
  final _cityController = TextEditingController();
  String? _selectedTimezone;
  String? _selectedCountry;
  File? _pickedImage;
  String? _currentAvatarUrl;
  bool _isSaving = false;

  @override
  void initState() {
    super.initState();
    _loadProfile();
  }

  void _loadProfile() {
    final profileAsync = ref.read(userProfileProvider);
    profileAsync.whenData((profile) {
      if (profile != null) {
        _displayNameController.text = profile['displayName'] ?? '';
        _selectedTimezone = profile['timezone'] as String?;
        _selectedCountry = profile['country'] as String?;
        _cityController.text = profile['city'] as String? ?? '';
        _currentAvatarUrl = profile['avatarUrl'] as String?;
      }
    });
  }

  @override
  void dispose() {
    _displayNameController.dispose();
    _cityController.dispose();
    super.dispose();
  }

  void _onTimezoneChanged(String? timezone) {
    setState(() {
      _selectedTimezone = timezone;
      if (timezone != null) {
        final country = countryForTimezone(timezone);
        if (country != null) {
          _selectedCountry = country;
        }
      }
    });
  }

  void _onCountryChanged(String? country) {
    setState(() {
      _selectedCountry = country;
      if (country != null) {
        final tz = timezoneForCountry(country);
        if (tz != null) {
          _selectedTimezone = tz;
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(
        title: Text(
          l10n.editProfile,
          style: AppTypography.heading2.copyWith(color: AppColors.textPrimary),
        ),
        backgroundColor: AppColors.bgPrimary,
        elevation: 0,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              const SizedBox(height: 16),
              _buildAvatarPicker(),
              const SizedBox(height: 32),
              AppTextField(
                controller: _displayNameController,
                label: l10n.displayName,
                hint: l10n.enterDisplayName,
                validator: (value) {
                  if (value == null || value.trim().isEmpty) {
                    return l10n.displayNameRequired;
                  }
                  return null;
                },
              ),
              const SizedBox(height: 20),
              _buildCountrySelector(),
              const SizedBox(height: 20),
              _buildTimezoneSelector(),
              const SizedBox(height: 20),
              AppTextField(
                controller: _cityController,
                label: l10n.cityOptional,
                hint: l10n.enterYourCity,
              ),
              const SizedBox(height: 40),
              AppButton(
                label: l10n.save,
                isLoading: _isSaving,
                onPressed: _save,
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildAvatarPicker() {
    return GestureDetector(
      onTap: _pickImage,
      child: Stack(
        alignment: Alignment.bottomRight,
        children: [
          if (_pickedImage != null)
            CircleAvatar(
              radius: 50,
              backgroundImage: FileImage(_pickedImage!),
            )
          else
            AvatarWidget(
              imageUrl: _currentAvatarUrl,
              name: _displayNameController.text,
              size: 100,
            ),
          Container(
            padding: const EdgeInsets.all(8),
            decoration: const BoxDecoration(
              color: AppColors.brandPrimary,
              shape: BoxShape.circle,
            ),
            child: const Icon(
              Icons.camera_alt_rounded,
              color: AppColors.textInverse,
              size: 18,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCountrySelector() {
    final l10n = AppLocalizations.of(context)!;
    final countries = allCountries;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          l10n.country,
          style: AppTypography.label.copyWith(color: AppColors.textPrimary),
        ),
        const SizedBox(height: 8),
        DropdownButtonFormField<String>(
          value: countries.contains(_selectedCountry) ? _selectedCountry : null,
          isExpanded: true,
          decoration: InputDecoration(
            hintText: l10n.selectYourCountry,
            hintStyle: AppTypography.body.copyWith(color: AppColors.textHint),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: AppColors.borderDefault),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: AppColors.borderDefault),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: AppColors.brandPrimary, width: 2),
            ),
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          ),
          items: countries.map((c) {
            return DropdownMenuItem(value: c, child: Text(c));
          }).toList(),
          onChanged: _onCountryChanged,
        ),
      ],
    );
  }

  Widget _buildTimezoneSelector() {
    final l10n = AppLocalizations.of(context)!;
    final timezones = allTimezones;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          l10n.timezone,
          style: AppTypography.label.copyWith(color: AppColors.textPrimary),
        ),
        const SizedBox(height: 8),
        DropdownButtonFormField<String>(
          value: timezones.contains(_selectedTimezone) ? _selectedTimezone : null,
          isExpanded: true,
          decoration: InputDecoration(
            hintText: l10n.selectTimezone,
            hintStyle: AppTypography.body.copyWith(color: AppColors.textHint),
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: AppColors.borderDefault),
            ),
            enabledBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: AppColors.borderDefault),
            ),
            focusedBorder: OutlineInputBorder(
              borderRadius: BorderRadius.circular(12),
              borderSide: const BorderSide(color: AppColors.brandPrimary, width: 2),
            ),
            contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
          ),
          items: timezones.map((tz) {
            return DropdownMenuItem(value: tz, child: Text(tz));
          }).toList(),
          onChanged: _onTimezoneChanged,
        ),
      ],
    );
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    final image = await picker.pickImage(
      source: ImageSource.gallery,
      maxWidth: 512,
      maxHeight: 512,
      imageQuality: 80,
    );

    if (image != null) {
      setState(() => _pickedImage = File(image.path));
    }
  }

  Future<void> _save() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _isSaving = true);

    try {
      final data = <String, dynamic>{
        'displayName': _displayNameController.text.trim(),
      };

      if (_selectedTimezone != null) {
        data['timezone'] = _selectedTimezone;
      }
      if (_selectedCountry != null) {
        data['country'] = _selectedCountry;
      }
      if (_cityController.text.trim().isNotEmpty) {
        data['city'] = _cityController.text.trim();
      }

      await ref.read(authServiceProvider).updateProfile(data);
      ref.invalidate(userProfileProvider);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(AppLocalizations.of(context)!.profileUpdatedSuccessfully)),
        );
        Navigator.of(context).pop();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(AppLocalizations.of(context)!.failedToUpdateProfile)),
        );
      }
    } finally {
      if (mounted) setState(() => _isSaving = false);
    }
  }
}

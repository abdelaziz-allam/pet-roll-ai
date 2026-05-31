import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/avatar_widget.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../models/mating_model.dart';
import '../providers/mating_provider.dart';

class MatingDetailScreen extends ConsumerWidget {
  final String listingId;

  const MatingDetailScreen({super.key, required this.listingId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final listingAsync = ref.watch(listingDetailProvider(listingId));

    return Scaffold(
      appBar: AppBar(title: Text(l10n.listingDetails)),
      body: listingAsync.when(
        loading: () => const LoadingIndicator(),
        error: (error, _) => ErrorView(
          message: error.toString(),
          onRetry: () => ref.invalidate(listingDetailProvider(listingId)),
        ),
        data: (listing) => _buildContent(context, ref, listing),
      ),
    );
  }

  Widget _buildContent(
      BuildContext context, WidgetRef ref, MatingListing listing) {
    final l10n = AppLocalizations.of(context)!;
    return SingleChildScrollView(
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          _buildPetPhoto(listing),
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildOwnerInfo(context, listing),
                const SizedBox(height: 20),
                _buildPetDetails(context, listing),
                const SizedBox(height: 20),
                _buildDescription(context, listing),
                const SizedBox(height: 20),
                if (listing.location != null && listing.location!.city.isNotEmpty) _buildLocation(context, listing),
                if (listing.preferences != null &&
                    listing.preferences!.isNotEmpty) ...[
                  const SizedBox(height: 20),
                  _buildPreferences(context, listing),
                ],
                const SizedBox(height: 32),
                AppButton(
                  label: l10n.sendMatchRequest,
                  onPressed: () => _showMatchRequestDialog(context, ref),
                ),
                const SizedBox(height: 16),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildPetPhoto(MatingListing listing) {
    if (listing.pet.photoURL != null) {
      return AspectRatio(
        aspectRatio: 4 / 3,
        child: Image.network(
          listing.pet.photoURL!,
          width: double.infinity,
          fit: BoxFit.cover,
        ),
      );
    }
    return AspectRatio(
      aspectRatio: 4 / 3,
      child: Container(
        color: AppColors.bgTertiary,
        child: Center(
          child: AvatarWidget(name: listing.pet.name, size: 96),
        ),
      ),
    );
  }

  Widget _buildOwnerInfo(BuildContext context, MatingListing listing) {
    final l10n = AppLocalizations.of(context)!;
    return Row(
      children: [
        AvatarWidget(name: listing.ownerName, size: 44),
        const SizedBox(width: 12),
        Expanded(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  Text(
                    listing.ownerName,
                    style: AppTypography.label
                        .copyWith(color: AppColors.textPrimary),
                  ),
                  if (listing.isVerifiedBreeder) ...[
                    const SizedBox(width: 6),
                    const Icon(Icons.verified,
                        size: 18, color: AppColors.brandSecondary),
                  ],
                ],
              ),
              if (listing.isVerifiedBreeder)
                Text(
                  l10n.verifiedBreeder,
                  style: AppTypography.bodySmall
                      .copyWith(color: AppColors.brandSecondary),
                ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPetDetails(BuildContext context, MatingListing listing) {
    final l10n = AppLocalizations.of(context)!;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(l10n.petDetails,
            style:
                AppTypography.heading3.copyWith(color: AppColors.textPrimary)),
        const SizedBox(height: 8),
        _detailRow(l10n.petDetails, listing.pet.name),
        _detailRow(l10n.species, listing.pet.species),
        _detailRow(l10n.breed, listing.pet.breed ?? 'Unknown'),
      ],
    );
  }

  Widget _detailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          SizedBox(
            width: 100,
            child: Text(label,
                style: AppTypography.body
                    .copyWith(color: AppColors.textSecondary)),
          ),
          Expanded(
            child: Text(value,
                style: AppTypography.body
                    .copyWith(color: AppColors.textPrimary)),
          ),
        ],
      ),
    );
  }

  Widget _buildDescription(BuildContext context, MatingListing listing) {
    final l10n = AppLocalizations.of(context)!;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(l10n.description,
            style:
                AppTypography.heading3.copyWith(color: AppColors.textPrimary)),
        const SizedBox(height: 8),
        Text(
          listing.description ?? l10n.noResultsFound,
          style: AppTypography.body.copyWith(color: AppColors.textPrimary),
        ),
      ],
    );
  }

  Widget _buildLocation(BuildContext context, MatingListing listing) {
    final l10n = AppLocalizations.of(context)!;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(l10n.location,
            style:
                AppTypography.heading3.copyWith(color: AppColors.textPrimary)),
        const SizedBox(height: 8),
        Row(
          children: [
            const Icon(Icons.location_on,
                size: 18, color: AppColors.textSecondary),
            const SizedBox(width: 4),
            Text(
              '${listing.location!.city}, ${listing.location!.country}',
              style:
                  AppTypography.body.copyWith(color: AppColors.textPrimary),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildPreferences(BuildContext context, MatingListing listing) {
    final l10n = AppLocalizations.of(context)!;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(l10n.preferences,
            style:
                AppTypography.heading3.copyWith(color: AppColors.textPrimary)),
        const SizedBox(height: 8),
        ...listing.preferences!.entries.map((entry) => Padding(
              padding: const EdgeInsets.symmetric(vertical: 2),
              child: Row(
                children: [
                  const Icon(Icons.check_circle_outline,
                      size: 16, color: AppColors.accentGreen),
                  const SizedBox(width: 8),
                  Text(
                    '${entry.key}: ${entry.value}',
                    style: AppTypography.body
                        .copyWith(color: AppColors.textPrimary),
                  ),
                ],
              ),
            )),
      ],
    );
  }

  void _showMatchRequestDialog(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final messageController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: Text(l10n.sendMatchRequest),
        content: TextField(
          controller: messageController,
          maxLines: 3,
          decoration: InputDecoration(
            hintText: l10n.message,
            border: const OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: Text(l10n.cancel),
          ),
          ElevatedButton(
            onPressed: () async {
              final matingService = ref.read(matingServiceProvider);
              await matingService.sendMatchRequest({
                'listingId': listingId,
                'message': messageController.text.isEmpty
                    ? null
                    : messageController.text,
              });
              if (context.mounted) {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(content: Text(l10n.requestSent)),
                );
              }
            },
            child: Text(l10n.sent),
          ),
        ],
      ),
    );
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/avatar_widget.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../models/mating_model.dart';
import '../providers/mating_provider.dart';

class MatingDetailScreen extends ConsumerWidget {
  final String listingId;

  const MatingDetailScreen({super.key, required this.listingId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final listingAsync = ref.watch(listingDetailProvider(listingId));

    return Scaffold(
      appBar: AppBar(title: const Text('Listing Details')),
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
                _buildOwnerInfo(listing),
                const SizedBox(height: 20),
                _buildPetDetails(listing),
                const SizedBox(height: 20),
                _buildDescription(listing),
                const SizedBox(height: 20),
                if (listing.location != null && listing.location!.city.isNotEmpty) _buildLocation(listing),
                if (listing.preferences != null &&
                    listing.preferences!.isNotEmpty) ...[
                  const SizedBox(height: 20),
                  _buildPreferences(listing),
                ],
                const SizedBox(height: 32),
                AppButton(
                  label: 'Send Match Request',
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

  Widget _buildOwnerInfo(MatingListing listing) {
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
                  'Verified Breeder',
                  style: AppTypography.bodySmall
                      .copyWith(color: AppColors.brandSecondary),
                ),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPetDetails(MatingListing listing) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Pet Details',
            style:
                AppTypography.heading3.copyWith(color: AppColors.textPrimary)),
        const SizedBox(height: 8),
        _detailRow('Name', listing.pet.name),
        _detailRow('Species', listing.pet.species),
        _detailRow('Breed', listing.pet.breed ?? 'Unknown'),
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

  Widget _buildDescription(MatingListing listing) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Description',
            style:
                AppTypography.heading3.copyWith(color: AppColors.textPrimary)),
        const SizedBox(height: 8),
        Text(
          listing.description ?? 'No description provided',
          style: AppTypography.body.copyWith(color: AppColors.textPrimary),
        ),
      ],
    );
  }

  Widget _buildLocation(MatingListing listing) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Location',
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

  Widget _buildPreferences(MatingListing listing) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text('Preferences',
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
    final messageController = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text('Send Match Request'),
        content: TextField(
          controller: messageController,
          maxLines: 3,
          decoration: const InputDecoration(
            hintText: 'Add a message (optional)',
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Cancel'),
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
                  const SnackBar(content: Text('Match request sent!')),
                );
              }
            },
            child: const Text('Send'),
          ),
        ],
      ),
    );
  }
}

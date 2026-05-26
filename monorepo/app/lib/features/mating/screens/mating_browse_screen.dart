import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_names.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/avatar_widget.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../models/mating_model.dart';
import '../providers/mating_provider.dart';

class MatingBrowseScreen extends ConsumerStatefulWidget {
  const MatingBrowseScreen({super.key});

  @override
  ConsumerState<MatingBrowseScreen> createState() => _MatingBrowseScreenState();
}

class _MatingBrowseScreenState extends ConsumerState<MatingBrowseScreen> {
  String? _selectedSpecies;
  String? _selectedBreed;
  String? _selectedCity;
  String? _selectedCountry;

  Map<String, dynamic>? get _filters {
    final filters = <String, dynamic>{};
    if (_selectedSpecies != null) filters['species'] = _selectedSpecies;
    if (_selectedBreed != null) filters['breed'] = _selectedBreed;
    if (_selectedCity != null) filters['city'] = _selectedCity;
    if (_selectedCountry != null) filters['country'] = _selectedCountry;
    return filters.isEmpty ? null : filters;
  }

  @override
  Widget build(BuildContext context) {
    final listingsAsync = ref.watch(matingListingsProvider(_filters));

    return Scaffold(
      appBar: AppBar(
        title: const Text('Mating'),
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 8),
            child: ActionChip(
              avatar: const Icon(Icons.mail_rounded, size: 18, color: AppColors.brandPrimary),
              label: Text(
                'My Requests',
                style: AppTypography.caption.copyWith(
                  color: AppColors.brandPrimary,
                  fontWeight: FontWeight.w600,
                ),
              ),
              backgroundColor: AppColors.brandPrimary.withOpacity(0.08),
              side: BorderSide.none,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
              onPressed: () => context.pushNamed(RouteNames.matchRequests),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          _buildFilterBar(),
          Expanded(
            child: RefreshIndicator(
              onRefresh: () async {
                ref.invalidate(matingListingsProvider(_filters));
              },
              child: listingsAsync.when(
                loading: () => const LoadingIndicator(),
                error: (error, _) => ErrorView(
                  message: error.toString(),
                  onRetry: () =>
                      ref.invalidate(matingListingsProvider(_filters)),
                ),
                data: (listings) {
                  if (listings.isEmpty) {
                    return const EmptyState(
                      title: 'No Listings Found',
                      subtitle:
                          'Be the first to create a mating listing for your pet.',
                      icon: Icons.pets,
                    );
                  }
                  return GridView.builder(
                    padding: const EdgeInsets.all(16),
                    gridDelegate:
                        const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 2,
                      childAspectRatio: 0.75,
                      crossAxisSpacing: 12,
                      mainAxisSpacing: 12,
                    ),
                    itemCount: listings.length,
                    itemBuilder: (context, index) =>
                        _buildListingCard(listings[index]),
                  );
                },
              ),
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => context.pushNamed(RouteNames.createListing),
        backgroundColor: AppColors.brandPrimary,
        child: const Icon(Icons.add, color: AppColors.textInverse),
      ),
    );
  }

  Widget _buildFilterBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      color: AppColors.bgSecondary,
      child: Row(
        children: [
          Expanded(
            child: DropdownButtonFormField<String>(
              value: _selectedSpecies,
              decoration: const InputDecoration(
                hintText: 'Species',
                isDense: true,
                contentPadding:
                    EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              ),
              items: const [
                DropdownMenuItem(value: null, child: Text('All')),
                DropdownMenuItem(value: 'dog', child: Text('Dog')),
                DropdownMenuItem(value: 'cat', child: Text('Cat')),
                DropdownMenuItem(value: 'bird', child: Text('Bird')),
                DropdownMenuItem(value: 'rabbit', child: Text('Rabbit')),
              ],
              onChanged: (value) {
                setState(() {
                  _selectedSpecies = value;
                  _selectedBreed = null;
                });
              },
            ),
          ),
          const SizedBox(width: 8),
          Expanded(
            child: TextFormField(
              decoration: const InputDecoration(
                hintText: 'Breed',
                isDense: true,
                contentPadding:
                    EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              ),
              onChanged: (value) {
                setState(() {
                  _selectedBreed = value.isEmpty ? null : value;
                });
              },
            ),
          ),
          const SizedBox(width: 8),
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: _showLocationFilter,
          ),
        ],
      ),
    );
  }

  void _showLocationFilter() {
    final cityController = TextEditingController(text: _selectedCity);
    final countryController = TextEditingController(text: _selectedCountry);

    showModalBottomSheet(
      context: context,
      builder: (context) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('Location Filter',
                style: AppTypography.heading3
                    .copyWith(color: AppColors.textPrimary)),
            const SizedBox(height: 16),
            TextFormField(
              controller: cityController,
              decoration: const InputDecoration(
                labelText: 'City',
                isDense: true,
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: countryController,
              decoration: const InputDecoration(
                labelText: 'Country',
                isDense: true,
              ),
            ),
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _selectedCity = cityController.text.isEmpty
                      ? null
                      : cityController.text;
                  _selectedCountry = countryController.text.isEmpty
                      ? null
                      : countryController.text;
                });
                Navigator.pop(context);
              },
              child: const Text('Apply'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildListingCard(MatingListing listing) {
    return GestureDetector(
      onTap: () => context.pushNamed(
        RouteNames.matingDetail,
        pathParameters: {'listingId': listing.id},
      ),
      child: Card(
        clipBehavior: Clip.antiAlias,
        elevation: 2,
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              flex: 3,
              child: listing.pet.photoURL != null
                  ? Image.network(
                      listing.pet.photoURL!,
                      width: double.infinity,
                      fit: BoxFit.cover,
                    )
                  : Container(
                      color: AppColors.bgTertiary,
                      child: Center(
                        child: AvatarWidget(
                          name: listing.pet.name,
                          size: 56,
                        ),
                      ),
                    ),
            ),
            Expanded(
              flex: 2,
              child: Padding(
                padding: const EdgeInsets.all(8),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      children: [
                        Expanded(
                          child: Text(
                            listing.pet.name,
                            style: AppTypography.label
                                .copyWith(color: AppColors.textPrimary),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                        if (listing.isVerifiedBreeder)
                          const Icon(Icons.verified,
                              size: 16, color: AppColors.brandSecondary),
                      ],
                    ),
                    const SizedBox(height: 2),
                    Text(
                      listing.pet.breed ?? 'Unknown breed',
                      style: AppTypography.bodySmall
                          .copyWith(color: AppColors.textSecondary),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 2),
                    if (listing.location != null)
                    Row(
                      children: [
                        const Icon(Icons.location_on,
                            size: 12, color: AppColors.textSecondary),
                        const SizedBox(width: 2),
                        Expanded(
                          child: Text(
                            '${listing.location!.city}, ${listing.location!.country}',
                            style: AppTypography.caption
                                .copyWith(color: AppColors.textSecondary),
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

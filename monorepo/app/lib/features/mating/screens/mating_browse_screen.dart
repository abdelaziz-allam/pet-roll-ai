import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import 'pet_mating_profile_screen.dart';

class MatingBrowseScreen extends StatefulWidget {
  const MatingBrowseScreen({super.key});

  @override
  State<MatingBrowseScreen> createState() => _MatingBrowseScreenState();
}

class _MatingBrowseScreenState extends State<MatingBrowseScreen> {
  List<dynamic> _listings = [];
  bool _loading = true;
  String? _speciesFilter;
  String? _genderFilter;
  bool _healthCertifiedOnly = false;
  bool _useSmartMatch = true;
  Map<String, dynamic>? _appliedFilters;

  @override
  void initState() {
    super.initState();
    _loadListings();
  }

  Future<void> _loadListings() async {
    setState(() => _loading = true);
    try {
      dynamic data;
      if (_useSmartMatch) {
        try {
          data = await ApiService().get('/mating/listings/smart');
          if (data is Map) {
            _appliedFilters = data['filters_applied'] as Map<String, dynamic>?;
            final listData = data['data'];
            List listings = listData is List ? listData : [];
            if (_genderFilter != null) {
              listings = listings.where((l) => l['gender'] == _genderFilter).toList();
            }
            if (_healthCertifiedOnly) {
              listings = listings.where((l) => l['healthCertified'] == true).toList();
            }
            setState(() { _listings = listings; _loading = false; });
            return;
          }
        } catch (_) {
          // Smart match failed (no pets registered or endpoint error) — fallback to regular browse
          _appliedFilters = null;
        }
      }

      String query = '/mating/listings?';
      if (_speciesFilter != null) query += 'species=$_speciesFilter&';
      data = await ApiService().get(query);
      final responseData = data is Map ? data['data'] : data;
      List listings = responseData is List ? responseData : [];
      if (_genderFilter != null) {
        listings = listings.where((l) => l['gender'] == _genderFilter).toList();
      }
      if (_healthCertifiedOnly) {
        listings = listings.where((l) => l['healthCertified'] == true).toList();
      }
      setState(() { _listings = listings; _loading = false; });
    } catch (e) {
      setState(() { _listings = []; _loading = false; _appliedFilters = null; });
    }
  }

  Future<void> _sendMatingRequest(dynamic listing) async {
    final listingId = listing['id'] ?? '';
    if (listingId.isEmpty) return;

    try {
      final petsData = await ApiService().get('/pets?limit=50');
      final pets = (petsData is Map ? petsData['data'] : petsData) as List? ?? [];
      if (pets.isEmpty) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('You need to register a pet first'), backgroundColor: AppTheme.warning),
          );
        }
        return;
      }

      if (!mounted) return;

      String? selectedPetId;
      final messageCtrl = TextEditingController();

      final confirmed = await showModalBottomSheet<bool>(
        context: context,
        isScrollControlled: true,
        shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
        builder: (ctx) => StatefulBuilder(
          builder: (ctx, setSheetState) => Padding(
            padding: EdgeInsets.fromLTRB(20, 20, 20, MediaQuery.of(ctx).viewInsets.bottom + 20),
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Send Mating Request', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                const SizedBox(height: 8),
                Text(
                  'Request to mate with ${listing['breed'] ?? listing['species'] ?? 'this pet'}',
                  style: const TextStyle(color: AppTheme.textSecondary, fontSize: 14),
                ),
                const SizedBox(height: 16),
                const Text('Select your pet:', style: TextStyle(fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                ...pets.map((pet) {
                  final isSelected = selectedPetId == pet['id'];
                  return GestureDetector(
                    onTap: () => setSheetState(() => selectedPetId = pet['id']),
                    child: Container(
                      margin: const EdgeInsets.only(bottom: 8),
                      padding: const EdgeInsets.all(12),
                      decoration: BoxDecoration(
                        color: isSelected ? AppTheme.primary.withOpacity(0.08) : Colors.grey.withOpacity(0.05),
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(
                          color: isSelected ? AppTheme.primary : Colors.grey.withOpacity(0.2),
                          width: isSelected ? 2 : 1,
                        ),
                      ),
                      child: Row(
                        children: [
                          Icon(Icons.pets, color: isSelected ? AppTheme.primary : AppTheme.textSecondary, size: 20),
                          const SizedBox(width: 10),
                          Expanded(
                            child: Text(
                              '${pet['name']} (${pet['breed'] ?? pet['species']})',
                              style: TextStyle(fontWeight: isSelected ? FontWeight.w600 : FontWeight.normal),
                            ),
                          ),
                          if (isSelected) const Icon(Icons.check_circle, color: AppTheme.primary, size: 20),
                        ],
                      ),
                    ),
                  );
                }),
                const SizedBox(height: 12),
                TextField(
                  controller: messageCtrl,
                  maxLines: 2,
                  decoration: const InputDecoration(
                    labelText: 'Message (optional)',
                    hintText: 'Introduce your pet...',
                    prefixIcon: Icon(Icons.message),
                  ),
                ),
                const SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: selectedPetId == null
                        ? null
                        : () => Navigator.pop(ctx, true),
                    child: const Text('Send Request'),
                  ),
                ),
              ],
            ),
          ),
        ),
      );

      if (confirmed != true || selectedPetId == null) return;

      await ApiService().post('/mating/requests', {
        'listingId': listingId,
        'petId': selectedPetId,
        if (messageCtrl.text.isNotEmpty) 'message': messageCtrl.text,
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Mating request sent!'), backgroundColor: AppTheme.success),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
        );
      }
    }
  }

  void _showFilterSheet() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setSheetState) => Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                children: [
                  const Text('Filters', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                  const Spacer(),
                  TextButton(
                    onPressed: () {
                      setSheetState(() {
                        _speciesFilter = null;
                        _genderFilter = null;
                        _healthCertifiedOnly = false;
                        _useSmartMatch = true;
                      });
                    },
                    child: const Text('Reset'),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              Container(
                padding: const EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: _useSmartMatch ? AppTheme.primary.withOpacity(0.05) : Colors.grey.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: _useSmartMatch ? AppTheme.primary.withOpacity(0.3) : Colors.grey.withOpacity(0.2)),
                ),
                child: SwitchListTile(
                  title: const Text('Smart Match', style: TextStyle(fontWeight: FontWeight.w600)),
                  subtitle: const Text(
                    'Show pets in your city, same category & best breed match',
                    style: TextStyle(fontSize: 12, color: AppTheme.textSecondary),
                  ),
                  value: _useSmartMatch,
                  onChanged: (v) => setSheetState(() => _useSmartMatch = v),
                  activeColor: AppTheme.primary,
                  contentPadding: EdgeInsets.zero,
                ),
              ),
              if (!_useSmartMatch) ...[
                const SizedBox(height: 16),
                const Text('Species', style: TextStyle(fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                Wrap(
                  spacing: 8,
                  runSpacing: 8,
                  children: [null, 'dog', 'cat', 'horse', 'bird', 'rabbit'].map((s) {
                    final selected = _speciesFilter == s;
                    return FilterChip(
                      label: Text(s ?? 'All'),
                      selected: selected,
                      selectedColor: AppTheme.primary.withOpacity(0.2),
                      checkmarkColor: AppTheme.primary,
                      onSelected: (_) => setSheetState(() => _speciesFilter = s),
                    );
                  }).toList(),
                ),
              ],
              const SizedBox(height: 16),
              const Text('Gender', style: TextStyle(fontWeight: FontWeight.w600)),
              const SizedBox(height: 8),
              Wrap(
                spacing: 8,
                children: [null, 'male', 'female'].map((g) {
                  final selected = _genderFilter == g;
                  return FilterChip(
                    label: Text(g ?? 'Any'),
                    selected: selected,
                    selectedColor: AppTheme.primary.withOpacity(0.2),
                    checkmarkColor: AppTheme.primary,
                    onSelected: (_) => setSheetState(() => _genderFilter = g),
                  );
                }).toList(),
              ),
              const SizedBox(height: 12),
              SwitchListTile(
                title: const Text('Health Certified Only'),
                value: _healthCertifiedOnly,
                onChanged: (v) => setSheetState(() => _healthCertifiedOnly = v),
                activeColor: AppTheme.primary,
                contentPadding: EdgeInsets.zero,
              ),
              const SizedBox(height: 16),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: () {
                    Navigator.pop(ctx);
                    setState(() {});
                    _loadListings();
                  },
                  child: const Text('Apply Filters'),
                ),
              ),
              const SizedBox(height: 8),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 8),
          child: Row(
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: AppTheme.cardShadow,
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.search, color: AppTheme.textSecondary, size: 20),
                      const SizedBox(width: 8),
                      Expanded(
                        child: Text(
                          _buildFilterLabel(),
                          style: const TextStyle(color: AppTheme.textSecondary, fontSize: 14),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 10),
              GestureDetector(
                onTap: _showFilterSheet,
                child: Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: _hasFilters ? AppTheme.primary : Colors.white,
                    borderRadius: BorderRadius.circular(12),
                    boxShadow: AppTheme.cardShadow,
                  ),
                  child: Icon(Icons.tune, color: _hasFilters ? Colors.white : AppTheme.textSecondary, size: 22),
                ),
              ),
            ],
          ),
        ),
        if (_useSmartMatch && _appliedFilters != null)
          Container(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: AppTheme.primary.withOpacity(0.05),
              borderRadius: BorderRadius.circular(10),
              border: Border.all(color: AppTheme.primary.withOpacity(0.2)),
            ),
            child: Row(
              children: [
                const Icon(Icons.auto_awesome, color: AppTheme.primary, size: 16),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Showing ${_appliedFilters!['species'] ?? ''} in ${_appliedFilters!['city'] ?? 'your area'} matching ${_appliedFilters!['breed'] ?? 'your breed'}',
                    style: const TextStyle(fontSize: 12, color: AppTheme.primary),
                  ),
                ),
              ],
            ),
          ),
        Expanded(
          child: _loading
              ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
              : _listings.isEmpty
                  ? _buildEmptyState()
                  : RefreshIndicator(
                      onRefresh: _loadListings,
                      child: ListView.builder(
                        padding: const EdgeInsets.fromLTRB(16, 4, 16, 16),
                        itemCount: _listings.length,
                        itemBuilder: (ctx, i) => _buildListingCard(_listings[i]),
                      ),
                    ),
        ),
      ],
    );
  }

  bool get _hasFilters => _speciesFilter != null || _genderFilter != null || _healthCertifiedOnly || _useSmartMatch;

  String _buildFilterLabel() {
    if (_useSmartMatch) return 'Smart Match: nearby & same breed';
    if (!_hasFilters) return 'Browse all listings...';
    final parts = <String>[];
    if (_speciesFilter != null) parts.add(_speciesFilter!);
    if (_genderFilter != null) parts.add(_genderFilter!);
    if (_healthCertifiedOnly) parts.add('certified');
    return parts.join(' · ');
  }

  Widget _buildEmptyState() {
    final isSmartActive = _useSmartMatch && _appliedFilters != null;
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: AppTheme.primary.withOpacity(0.08),
                shape: BoxShape.circle,
              ),
              child: Icon(
                _useSmartMatch ? Icons.location_searching : Icons.favorite_border,
                size: 48,
                color: AppTheme.primary.withOpacity(0.6),
              ),
            ),
            const SizedBox(height: 20),
            Text(
              _useSmartMatch ? 'No nearby matches yet' : 'No listings found',
              style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
            ),
            const SizedBox(height: 8),
            Text(
              _useSmartMatch
                  ? 'No pets from the same category and breed were found in your city. Try browsing all listings or check back later.'
                  : 'Try adjusting your filters or check back later.',
              textAlign: TextAlign.center,
              style: const TextStyle(color: AppTheme.textSecondary, fontSize: 14),
            ),
            if (_useSmartMatch) ...[
              const SizedBox(height: 20),
              OutlinedButton.icon(
                onPressed: () {
                  setState(() { _useSmartMatch = false; });
                  _loadListings();
                },
                icon: const Icon(Icons.explore, size: 18),
                label: const Text('Browse All Listings'),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppTheme.primary,
                  side: const BorderSide(color: AppTheme.primary),
                  padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildListingCard(dynamic listing) {
    final species = listing['species'] ?? 'dog';
    final photos = listing['photos'] as List?;
    final photoUrl = (photos != null && photos.isNotEmpty)
        ? (photos.first is Map ? photos.first['url'] : photos.first)
        : null;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ClipRRect(
            borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
            child: SizedBox(
              height: 160,
              width: double.infinity,
              child: photoUrl != null
                  ? CachedNetworkImage(imageUrl: photoUrl, fit: BoxFit.cover)
                  : Container(
                      color: AppTheme.primary.withOpacity(0.1),
                      child: Center(child: Text(_speciesEmoji(species), style: const TextStyle(fontSize: 48))),
                    ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(14),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Expanded(
                      child: Text(
                        listing['petName'] ?? listing['breed'] ?? species,
                        style: const TextStyle(fontSize: 17, fontWeight: FontWeight.w700),
                      ),
                    ),
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                      decoration: BoxDecoration(
                        color: (listing['price'] == 0 || listing['price'] == null) ? AppTheme.success.withOpacity(0.1) : Colors.blue.withOpacity(0.1),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        (listing['price'] == 0 || listing['price'] == null) ? 'Free' : '\$${listing['price']}',
                        style: TextStyle(
                          color: (listing['price'] == 0 || listing['price'] == null) ? AppTheme.success : Colors.blue,
                          fontWeight: FontWeight.w700,
                          fontSize: 13,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 6),
                Text(
                  '${listing['breed'] ?? ''} · ${listing['gender'] ?? ''} · ${listing['age'] ?? '?'} yrs',
                  style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13),
                ),
                const SizedBox(height: 10),
                Wrap(
                  spacing: 6,
                  runSpacing: 6,
                  children: [
                    if (listing['healthCertified'] == true)
                      _chip(Icons.verified, 'Health ✓', AppTheme.success),
                    if (listing['location'] != null)
                      _chip(Icons.location_on, '${listing['location']['city'] ?? ''}, ${listing['location']['country'] ?? ''}', Colors.blue),
                    _chip(Icons.visibility, '${listing['viewCount'] ?? 0} views', Colors.grey),
                  ],
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(
                      child: OutlinedButton(
                        onPressed: () {
                          final petId = listing['petId'] ?? '';
                          if (petId.isNotEmpty) {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (_) => PetMatingProfileScreen(
                                  petId: petId,
                                  listingId: listing['id'],
                                ),
                              ),
                            );
                          }
                        },
                        style: OutlinedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 12),
                          side: const BorderSide(color: AppTheme.primary),
                        ),
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.pets, size: 18, color: AppTheme.primary),
                            SizedBox(width: 6),
                            Text('View Profile', style: TextStyle(color: AppTheme.primary)),
                          ],
                        ),
                      ),
                    ),
                    const SizedBox(width: 10),
                    Expanded(
                      child: ElevatedButton(
                        onPressed: () => _sendMatingRequest(listing),
                        style: ElevatedButton.styleFrom(
                          padding: const EdgeInsets.symmetric(vertical: 12),
                        ),
                        child: const Row(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Icon(Icons.favorite, size: 18),
                            SizedBox(width: 6),
                            Text('Request'),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _chip(IconData icon, String label, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(color: color.withOpacity(0.08), borderRadius: BorderRadius.circular(6)),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: color),
          const SizedBox(width: 4),
          Text(label, style: TextStyle(fontSize: 11, color: color, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }

  String _speciesEmoji(String species) {
    const map = {'dog': '🐕', 'cat': '🐱', 'bird': '🦜', 'horse': '🐴', 'rabbit': '🐰', 'fish': '🐠'};
    return map[species] ?? '🐾';
  }
}

import 'package:flutter/material.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/services/api_service.dart';
import 'mating_browse_screen.dart';
import 'mating_matches_screen.dart';
import 'wedding_cards_screen.dart';

class MatingHubScreen extends StatefulWidget {
  const MatingHubScreen({super.key});

  @override
  State<MatingHubScreen> createState() => _MatingHubScreenState();
}

class _MatingHubScreenState extends State<MatingHubScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void _openCreateListing() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const _CreateMatingListingScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Mating', style: TextStyle(fontWeight: FontWeight.w700)),
        bottom: TabBar(
          controller: _tabController,
          labelColor: AppTheme.primary,
          unselectedLabelColor: AppTheme.textSecondary,
          indicatorColor: AppTheme.primary,
          indicatorWeight: 3,
          tabs: const [
            Tab(icon: Icon(Icons.search, size: 20), text: 'Browse'),
            Tab(icon: Icon(Icons.favorite, size: 20), text: 'Requests'),
            Tab(icon: Icon(Icons.card_giftcard, size: 20), text: 'Cards'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: const [
          MatingBrowseScreen(),
          MatingMatchesScreen(),
          WeddingCardsScreen(),
        ],
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: _openCreateListing,
        backgroundColor: AppTheme.primary,
        icon: const Icon(Icons.add, color: Colors.white),
        label: const Text('Create Listing', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600)),
      ),
    );
  }
}

class _CreateMatingListingScreen extends StatefulWidget {
  const _CreateMatingListingScreen();

  @override
  State<_CreateMatingListingScreen> createState() => _CreateMatingListingScreenState();
}

class _CreateMatingListingScreenState extends State<_CreateMatingListingScreen> {
  List<dynamic> _pets = [];
  bool _loadingPets = true;
  bool _submitting = false;
  String? _selectedPetId;
  final _descriptionCtrl = TextEditingController();
  final _cityCtrl = TextEditingController();
  final _countryCtrl = TextEditingController();
  final _preferencesCtrl = TextEditingController();

  @override
  void initState() {
    super.initState();
    _loadPets();
  }

  @override
  void dispose() {
    _descriptionCtrl.dispose();
    _cityCtrl.dispose();
    _countryCtrl.dispose();
    _preferencesCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadPets() async {
    try {
      final data = await ApiService().get('/pets?limit=50');
      final pets = data['data'] ?? [];
      setState(() { _pets = pets; _loadingPets = false; });
    } catch (e) {
      setState(() { _loadingPets = false; });
    }
  }

  Future<void> _submit() async {
    if (_selectedPetId == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select a pet'), backgroundColor: Colors.orange),
      );
      return;
    }

    setState(() => _submitting = true);
    try {
      final pet = _pets.firstWhere((p) => p['id'] == _selectedPetId);
      final body = <String, dynamic>{
        'petId': _selectedPetId,
        'species': pet['species'] ?? 'dog',
        'breed': pet['breed'] ?? 'Unknown',
        'gender': pet['gender'] ?? 'male',
        'age': (pet['age'] is num) ? pet['age'] : 1,
      };
      if (_descriptionCtrl.text.isNotEmpty) body['description'] = _descriptionCtrl.text;
      if (_cityCtrl.text.isNotEmpty || _countryCtrl.text.isNotEmpty) {
        body['location'] = <String, dynamic>{
          'city': _cityCtrl.text,
          'country': _countryCtrl.text,
        };
      }
      if (_preferencesCtrl.text.isNotEmpty) body['requirements'] = _preferencesCtrl.text;

      await ApiService().post('/mating/listings', body);

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Mating listing created!'), backgroundColor: Colors.green),
        );
        Navigator.pop(context, true);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Create Mating Listing', style: TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: _loadingPets
          ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
          : _pets.isEmpty
              ? const Center(child: Text('No pets found. Add a pet first.'))
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Select Pet', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                      const SizedBox(height: 8),
                      ..._pets.map((pet) {
                        final isSelected = _selectedPetId == pet['id'];
                        return GestureDetector(
                          onTap: () => setState(() => _selectedPetId = pet['id']),
                          child: Container(
                            margin: const EdgeInsets.only(bottom: 8),
                            padding: const EdgeInsets.all(14),
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
                                Icon(Icons.pets, color: isSelected ? AppTheme.primary : AppTheme.textSecondary),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        pet['name'] ?? 'Unknown',
                                        style: TextStyle(fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500, fontSize: 15),
                                      ),
                                      Text(
                                        '${pet['species'] ?? ''} · ${pet['breed'] ?? ''} · ${pet['gender'] ?? ''}',
                                        style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13),
                                      ),
                                    ],
                                  ),
                                ),
                                if (isSelected) const Icon(Icons.check_circle, color: AppTheme.primary),
                              ],
                            ),
                          ),
                        );
                      }),
                      const SizedBox(height: 20),
                      TextField(
                        controller: _descriptionCtrl,
                        maxLines: 3,
                        decoration: const InputDecoration(
                          labelText: 'Description (optional)',
                          hintText: 'Describe your pet for potential matches...',
                          border: OutlineInputBorder(),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: TextField(
                              controller: _cityCtrl,
                              decoration: const InputDecoration(
                                labelText: 'City',
                                border: OutlineInputBorder(),
                              ),
                            ),
                          ),
                          const SizedBox(width: 12),
                          Expanded(
                            child: TextField(
                              controller: _countryCtrl,
                              decoration: const InputDecoration(
                                labelText: 'Country',
                                border: OutlineInputBorder(),
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      TextField(
                        controller: _preferencesCtrl,
                        maxLines: 2,
                        decoration: const InputDecoration(
                          labelText: 'Preferences (optional)',
                          hintText: 'What are you looking for in a match?',
                          border: OutlineInputBorder(),
                        ),
                      ),
                      const SizedBox(height: 28),
                      SizedBox(
                        width: double.infinity,
                        height: 50,
                        child: ElevatedButton(
                          onPressed: _submitting ? null : _submit,
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.primary,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          ),
                          child: _submitting
                              ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                              : const Text('Create Listing', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, color: Colors.white)),
                        ),
                      ),
                    ],
                  ),
                ),
    );
  }
}

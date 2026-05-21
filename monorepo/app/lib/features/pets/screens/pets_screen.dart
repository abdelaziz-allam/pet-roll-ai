import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import 'pet_detail_screen.dart';
import 'add_pet_screen.dart';

class PetsScreen extends StatefulWidget {
  const PetsScreen({super.key});

  @override
  State<PetsScreen> createState() => _PetsScreenState();
}

class _PetsScreenState extends State<PetsScreen> {
  List<dynamic> _pets = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadPets();
  }

  Future<void> _loadPets() async {
    setState(() { _loading = true; _error = null; });
    try {
      final api = ApiService();
      final data = await api.get('/pets?limit=50');
      setState(() {
        _pets = data['data'] ?? [];
        _loading = false;
      });
    } catch (e) {
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
              child: Row(
                children: [
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('My Pets', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800, color: AppTheme.textPrimary)),
                        SizedBox(height: 4),
                        Text('Your furry family members', style: TextStyle(color: AppTheme.textSecondary, fontSize: 14)),
                      ],
                    ),
                  ),
                  _buildAddButton(),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Expanded(
              child: _loading
                  ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
                  : _error != null
                      ? _buildError()
                      : _pets.isEmpty
                          ? _buildEmpty()
                          : RefreshIndicator(
                              onRefresh: _loadPets,
                              color: AppTheme.primary,
                              child: GridView.builder(
                                padding: const EdgeInsets.fromLTRB(16, 0, 16, 100),
                                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                                  crossAxisCount: 2,
                                  childAspectRatio: 0.75,
                                  crossAxisSpacing: 12,
                                  mainAxisSpacing: 12,
                                ),
                                itemCount: _pets.length,
                                itemBuilder: (ctx, i) => _buildPetCard(_pets[i]),
                              ),
                            ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildAddButton() {
    return GestureDetector(
      onTap: () async {
        final result = await Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => const AddPetScreen()),
        );
        if (result == true) _loadPets();
      },
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(
          gradient: AppTheme.primaryGradient,
          borderRadius: BorderRadius.circular(14),
          boxShadow: [
            BoxShadow(color: AppTheme.primary.withOpacity(0.3), blurRadius: 12, offset: const Offset(0, 4)),
          ],
        ),
        child: const Icon(Icons.add, color: Colors.white, size: 24),
      ),
    );
  }

  Widget _buildError() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(color: AppTheme.error.withOpacity(0.1), shape: BoxShape.circle),
              child: const Icon(Icons.cloud_off, size: 48, color: AppTheme.error),
            ),
            const SizedBox(height: 20),
            const Text('Connection Error', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            Text(_error!, textAlign: TextAlign.center, style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13)),
            const SizedBox(height: 24),
            ElevatedButton.icon(onPressed: _loadPets, icon: const Icon(Icons.refresh), label: const Text('Retry')),
          ],
        ),
      ),
    );
  }

  Widget _buildEmpty() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Container(
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(color: AppTheme.primary.withOpacity(0.08), shape: BoxShape.circle),
            child: const Icon(Icons.pets, size: 56, color: AppTheme.primary),
          ),
          const SizedBox(height: 20),
          const Text('No pets yet', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600)),
          const SizedBox(height: 8),
          const Text('Tap + to add your first pet', style: TextStyle(color: AppTheme.textSecondary)),
        ],
      ),
    );
  }

  Widget _buildPetCard(Map<String, dynamic> pet) {
    final species = pet['species'] ?? 'other';
    final status = pet['status'] ?? 'active';
    final photos = pet['photos'] as List?;
    final hasPhoto = photos != null && photos.isNotEmpty;
    final photoUrl = hasPhoto ? (photos!.first is Map ? photos.first['url'] : photos.first) : null;

    return GestureDetector(
      onTap: () async {
        final result = await Navigator.push(
          context,
          MaterialPageRoute(builder: (_) => PetDetailScreen(pet: pet)),
        );
        if (result == true) _loadPets();
      },
      child: Container(
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(20),
          boxShadow: AppTheme.cardShadow,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Expanded(
              flex: 3,
              child: Container(
                width: double.infinity,
                decoration: BoxDecoration(
                  borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
                  gradient: LinearGradient(
                    colors: _speciesGradient(species),
                    begin: Alignment.topLeft,
                    end: Alignment.bottomRight,
                  ),
                ),
                child: Stack(
                  children: [
                    if (photoUrl != null)
                      ClipRRect(
                        borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
                        child: CachedNetworkImage(
                          imageUrl: photoUrl,
                          width: double.infinity,
                          height: double.infinity,
                          fit: BoxFit.cover,
                          errorWidget: (_, __, ___) => Center(
                            child: Text(_speciesEmoji(species), style: const TextStyle(fontSize: 40)),
                          ),
                        ),
                      )
                    else
                      Center(child: Text(_speciesEmoji(species), style: const TextStyle(fontSize: 44))),
                    Positioned(
                      top: 8,
                      right: 8,
                      child: Container(
                        padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                        decoration: BoxDecoration(
                          color: status == 'banned' ? AppTheme.error : AppTheme.success,
                          borderRadius: BorderRadius.circular(8),
                        ),
                        child: Text(
                          status,
                          style: const TextStyle(color: Colors.white, fontSize: 10, fontWeight: FontWeight.w600),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
            Expanded(
              flex: 2,
              child: Padding(
                padding: const EdgeInsets.all(12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      pet['name'] ?? 'Unknown',
                      style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w700),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 3),
                    Text(
                      '${pet['breed'] ?? species}',
                      style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                      maxLines: 1,
                      overflow: TextOverflow.ellipsis,
                    ),
                    const Spacer(),
                    Row(
                      children: [
                        Icon(
                          pet['gender'] == 'male' ? Icons.male : Icons.female,
                          size: 14,
                          color: pet['gender'] == 'male' ? Colors.blue : Colors.pink,
                        ),
                        const SizedBox(width: 4),
                        Text(
                          pet['gender'] ?? '',
                          style: TextStyle(
                            fontSize: 11,
                            color: pet['gender'] == 'male' ? Colors.blue : Colors.pink,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const Spacer(),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(
                            color: _speciesGradient(species).first.withOpacity(0.3),
                            borderRadius: BorderRadius.circular(6),
                          ),
                          child: Text(
                            species,
                            style: TextStyle(fontSize: 10, color: _speciesGradient(species).last, fontWeight: FontWeight.w600),
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

  String _speciesEmoji(String species) {
    const map = {'dog': '🐕', 'cat': '🐱', 'bird': '🦜', 'horse': '🐴', 'rabbit': '🐰', 'fish': '🐠', 'reptile': '🦎', 'hamster': '🐹'};
    return map[species] ?? '🐾';
  }

  List<Color> _speciesGradient(String species) {
    switch (species) {
      case 'dog': return [const Color(0xFFFFCDD2), const Color(0xFFE91E63)];
      case 'cat': return [const Color(0xFFE1BEE7), const Color(0xFF9C27B0)];
      case 'bird': return [const Color(0xFFC8E6C9), const Color(0xFF4CAF50)];
      case 'horse': return [const Color(0xFFD7CCC8), const Color(0xFF795548)];
      case 'rabbit': return [const Color(0xFFFFE0B2), const Color(0xFFFF9800)];
      case 'fish': return [const Color(0xFFBBDEFB), const Color(0xFF2196F3)];
      case 'reptile': return [const Color(0xFFC8E6C9), const Color(0xFF388E3C)];
      case 'hamster': return [const Color(0xFFFFF3E0), const Color(0xFFE65100)];
      default: return [const Color(0xFFEEEEEE), const Color(0xFF616161)];
    }
  }
}

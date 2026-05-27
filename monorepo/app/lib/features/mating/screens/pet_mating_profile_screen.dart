import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';

class PetMatingProfileScreen extends StatefulWidget {
  final String petId;
  final String? listingId;

  const PetMatingProfileScreen({
    super.key,
    required this.petId,
    this.listingId,
  });

  @override
  State<PetMatingProfileScreen> createState() => _PetMatingProfileScreenState();
}

class _PetMatingProfileScreenState extends State<PetMatingProfileScreen> {
  Map<String, dynamic>? _profile;
  bool _loading = true;
  String? _error;
  int _currentPhotoIndex = 0;

  @override
  void initState() {
    super.initState();
    _loadProfile();
  }

  Future<void> _loadProfile() async {
    setState(() { _loading = true; _error = null; });
    try {
      final data = await ApiService().get('/mating/pets/${widget.petId}/profile');
      setState(() { _profile = data; _loading = false; });
    } catch (e) {
      setState(() { _error = 'Failed to load pet profile'; _loading = false; });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppTheme.surface,
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
          : _error != null
              ? _buildErrorState()
              : _buildProfile(),
      bottomNavigationBar: (!_loading && _error == null && _profile != null && widget.listingId != null)
          ? SafeArea(
              child: Container(
                padding: const EdgeInsets.fromLTRB(20, 12, 20, 12),
                decoration: BoxDecoration(
                  color: Colors.white,
                  boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.05), blurRadius: 10, offset: const Offset(0, -2))],
                ),
                child: ElevatedButton(
                  onPressed: _sendMatingRequest,
                  style: ElevatedButton.styleFrom(
                    padding: const EdgeInsets.symmetric(vertical: 14),
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.favorite, size: 20),
                      SizedBox(width: 8),
                      Text('Send Mating Request', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
              ),
            )
          : null,
    );
  }

  Future<void> _sendMatingRequest() async {
    try {
      final petsData = await ApiService().get('/pets?limit=50');
      final pets = (petsData is Map ? petsData['data'] : petsData) as List? ?? [];
      if (pets.isEmpty) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('You need to register a pet first'), backgroundColor: Colors.orange),
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
                  'Request to mate with ${_profile!['name'] ?? 'this pet'}',
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
        'listingId': widget.listingId!,
        'petId': selectedPetId,
        if (messageCtrl.text.isNotEmpty) 'message': messageCtrl.text,
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Mating request sent!'), backgroundColor: AppTheme.success),
        );
        Navigator.pop(context, true);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
        );
      }
    }
  }

  Widget _buildErrorState() {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(Icons.error_outline, size: 48, color: Colors.grey[400]),
          const SizedBox(height: 16),
          Text(_error!, style: const TextStyle(fontSize: 16, color: AppTheme.textSecondary)),
          const SizedBox(height: 16),
          ElevatedButton(onPressed: _loadProfile, child: const Text('Retry')),
        ],
      ),
    );
  }

  Widget _buildProfile() {
    final photos = (_profile!['photos'] as List?) ?? [];
    final owner = _profile!['owner'] as Map<String, dynamic>?;
    final healthRecords = (_profile!['healthRecords'] as List?) ?? [];
    final vaccinations = (_profile!['vaccinations'] as List?) ?? [];

    return CustomScrollView(
      slivers: [
        SliverAppBar(
          expandedHeight: 320,
          pinned: true,
          backgroundColor: Colors.white,
          leading: IconButton(
            icon: const CircleAvatar(
              backgroundColor: Colors.white,
              child: Icon(Icons.arrow_back, color: AppTheme.textPrimary),
            ),
            onPressed: () => Navigator.pop(context),
          ),
          flexibleSpace: FlexibleSpaceBar(
            background: photos.isNotEmpty
                ? _buildPhotoGallery(photos)
                : Container(
                    color: AppTheme.primary.withOpacity(0.1),
                    child: Center(
                      child: Text(
                        _speciesEmoji(_profile!['species'] ?? ''),
                        style: const TextStyle(fontSize: 80),
                      ),
                    ),
                  ),
          ),
        ),
        SliverToBoxAdapter(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              _buildHeaderSection(owner),
              _buildDetailsSection(),
              if (healthRecords.isNotEmpty) _buildHealthSection(healthRecords),
              if (vaccinations.isNotEmpty) _buildVaccinationsSection(vaccinations),
              const SizedBox(height: 100),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPhotoGallery(List photos) {
    return Stack(
      children: [
        PageView.builder(
          itemCount: photos.length,
          onPageChanged: (i) => setState(() => _currentPhotoIndex = i),
          itemBuilder: (ctx, i) {
            final photo = photos[i];
            final url = photo is Map ? photo['url'] : photo.toString();
            return CachedNetworkImage(
              imageUrl: url,
              fit: BoxFit.cover,
              placeholder: (_, __) => Container(color: Colors.grey[200]),
              errorWidget: (_, __, ___) => Container(
                color: Colors.grey[200],
                child: const Icon(Icons.pets, size: 48),
              ),
            );
          },
        ),
        if (photos.length > 1)
          Positioned(
            bottom: 16,
            left: 0,
            right: 0,
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(
                photos.length,
                (i) => Container(
                  width: i == _currentPhotoIndex ? 24 : 8,
                  height: 8,
                  margin: const EdgeInsets.symmetric(horizontal: 3),
                  decoration: BoxDecoration(
                    color: i == _currentPhotoIndex ? AppTheme.primary : Colors.white.withOpacity(0.6),
                    borderRadius: BorderRadius.circular(4),
                  ),
                ),
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildHeaderSection(Map<String, dynamic>? owner) {
    return Container(
      padding: const EdgeInsets.all(20),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Text(
                  _profile!['name'] ?? 'Unknown',
                  style: const TextStyle(fontSize: 26, fontWeight: FontWeight.w800),
                ),
              ),
              if (_profile!['isAvailableForMating'] == true)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.success.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.favorite, color: AppTheme.success, size: 16),
                      SizedBox(width: 4),
                      Text('Available', style: TextStyle(color: AppTheme.success, fontWeight: FontWeight.w600, fontSize: 13)),
                    ],
                  ),
                ),
            ],
          ),
          const SizedBox(height: 8),
          Text(
            '${_profile!['breed'] ?? ''} · ${_profile!['species'] ?? ''} · ${_profile!['gender'] ?? ''}',
            style: const TextStyle(fontSize: 15, color: AppTheme.textSecondary),
          ),
          const SizedBox(height: 12),
          if (_profile!['location'] != null)
            Row(
              children: [
                const Icon(Icons.location_on, size: 16, color: AppTheme.primary),
                const SizedBox(width: 4),
                Text(
                  '${_profile!['location']['city'] ?? ''}, ${_profile!['location']['country'] ?? ''}',
                  style: const TextStyle(color: AppTheme.textSecondary, fontSize: 14),
                ),
              ],
            ),
          const SizedBox(height: 16),
          if (owner != null)
            Row(
              children: [
                CircleAvatar(
                  radius: 18,
                  backgroundColor: AppTheme.primary.withOpacity(0.1),
                  backgroundImage: owner['avatar'] != null ? NetworkImage(owner['avatar']) : null,
                  child: owner['avatar'] == null
                      ? Text(
                          (owner['displayName'] ?? 'U')[0].toUpperCase(),
                          style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.bold),
                        )
                      : null,
                ),
                const SizedBox(width: 10),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(owner['displayName'] ?? 'Pet Owner', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    const Text('Pet Owner', style: TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
                  ],
                ),
              ],
            ),
        ],
      ),
    );
  }

  Widget _buildDetailsSection() {
    final dob = _profile!['dateOfBirth'];
    String ageText = '';
    if (dob != null) {
      try {
        final birthDate = DateTime.parse(dob);
        final now = DateTime.now();
        final months = (now.year - birthDate.year) * 12 + now.month - birthDate.month;
        ageText = months < 12 ? '$months months' : '${months ~/ 12} years';
      } catch (_) {}
    }

    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Details', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          _detailRow(Icons.cake, 'Age', ageText.isNotEmpty ? ageText : 'Unknown'),
          _detailRow(Icons.monitor_weight, 'Weight', _profile!['weight'] != null ? '${_profile!['weight']} kg' : 'Not specified'),
          _detailRow(Icons.palette, 'Color', _profile!['color'] ?? 'Not specified'),
          _detailRow(Icons.content_cut, 'Neutered', _profile!['isNeutered'] == true ? 'Yes' : 'No'),
          if (_profile!['notes'] != null && (_profile!['notes'] as String).isNotEmpty) ...[
            const Divider(height: 24),
            const Text('Notes', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
            const SizedBox(height: 4),
            Text(_profile!['notes'], style: const TextStyle(color: AppTheme.textSecondary, fontSize: 14)),
          ],
        ],
      ),
    );
  }

  Widget _detailRow(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        children: [
          Icon(icon, size: 18, color: AppTheme.primary),
          const SizedBox(width: 10),
          Text('$label:', style: const TextStyle(color: AppTheme.textSecondary, fontSize: 14)),
          const SizedBox(width: 8),
          Expanded(child: Text(value, style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 14))),
        ],
      ),
    );
  }

  Widget _buildHealthSection(List healthRecords) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.health_and_safety, color: AppTheme.success, size: 20),
              SizedBox(width: 8),
              Text('Health Records', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
            ],
          ),
          const SizedBox(height: 12),
          ...healthRecords.take(5).map((record) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                Container(
                  width: 8, height: 8,
                  decoration: const BoxDecoration(color: AppTheme.success, shape: BoxShape.circle),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    record['type'] ?? record['description'] ?? 'Health check',
                    style: const TextStyle(fontSize: 14),
                  ),
                ),
                Text(
                  _formatDate(record['date']),
                  style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }

  Widget _buildVaccinationsSection(List vaccinations) {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Row(
            children: [
              Icon(Icons.vaccines, color: Colors.blue, size: 20),
              SizedBox(width: 8),
              Text('Vaccinations', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
            ],
          ),
          const SizedBox(height: 12),
          ...vaccinations.take(5).map((vacc) => Padding(
            padding: const EdgeInsets.only(bottom: 8),
            child: Row(
              children: [
                const Icon(Icons.check_circle, color: AppTheme.success, size: 16),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    vacc['name'] ?? vacc['vaccine'] ?? 'Vaccination',
                    style: const TextStyle(fontSize: 14),
                  ),
                ),
                Text(
                  _formatDate(vacc['date']),
                  style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                ),
              ],
            ),
          )),
        ],
      ),
    );
  }

  String _formatDate(dynamic date) {
    if (date == null) return '';
    try {
      final d = DateTime.parse(date.toString());
      return '${d.day}/${d.month}/${d.year}';
    } catch (_) {
      return date.toString();
    }
  }

  String _speciesEmoji(String species) {
    const map = {'dog': '\u{1F415}', 'cat': '\u{1F431}', 'bird': '\u{1F99C}', 'horse': '\u{1F434}', 'rabbit': '\u{1F430}'};
    return map[species] ?? '\u{1F43E}';
  }
}

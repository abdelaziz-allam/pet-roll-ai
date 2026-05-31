import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../../core/services/api_service.dart';
import '../../../core/services/notification_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../core/widgets/birthday_celebration.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../../health/screens/health_records_screen.dart';
import '../../vaccination/screens/vaccination_screen.dart';
import '../../pregnancy/screens/pregnancy_screen.dart';
import 'health_certification_screen.dart';

class PetDetailScreen extends StatefulWidget {
  final Map<String, dynamic> pet;
  const PetDetailScreen({super.key, required this.pet});

  @override
  State<PetDetailScreen> createState() => _PetDetailScreenState();
}

class _PetDetailScreenState extends State<PetDetailScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  late Map<String, dynamic> _pet;
  bool _editing = false;
  bool _showBirthdayBanner = false;

  final _nameCtrl = TextEditingController();
  final _breedCtrl = TextEditingController();
  final _weightCtrl = TextEditingController();
  final _colorCtrl = TextEditingController();
  final _notesCtrl = TextEditingController();
  String? _gender;
  String? _species;
  bool _isNeutered = false;
  bool _isAvailableForMating = false;

  bool get _isBirthdayToday {
    final dob = _pet['dateOfBirth'];
    if (dob == null) return false;
    final birthDate = DateTime.tryParse(dob);
    if (birthDate == null) return false;
    final now = DateTime.now();
    return birthDate.month == now.month && birthDate.day == now.day;
  }

  int get _petAge {
    final dob = _pet['dateOfBirth'];
    if (dob == null) return 0;
    final birthDate = DateTime.tryParse(dob);
    if (birthDate == null) return 0;
    final now = DateTime.now();
    return now.year - birthDate.year;
  }

  @override
  void initState() {
    super.initState();
    _pet = Map.from(widget.pet);
    _tabController = TabController(length: 3, vsync: this);
    _populateFields();
    _showBirthdayBanner = _isBirthdayToday;
  }

  void _populateFields() {
    _nameCtrl.text = _pet['name'] ?? '';
    _breedCtrl.text = _pet['breed'] ?? '';
    _weightCtrl.text = (_pet['weight'] ?? '').toString();
    _colorCtrl.text = _pet['color'] ?? '';
    _notesCtrl.text = _pet['notes'] ?? '';
    _gender = _pet['gender'];
    _species = _pet['species'];
    _isNeutered = _pet['isNeutered'] == true;
    _isAvailableForMating = _pet['isAvailableForMating'] == true;
  }

  Future<void> _savePet() async {
    final l10n = AppLocalizations.of(context)!;
    try {
      final body = <String, dynamic>{
        'name': _nameCtrl.text,
        'breed': _breedCtrl.text,
        'species': _species,
        'gender': _gender,
        'isNeutered': _isNeutered,
        'isAvailableForMating': _isAvailableForMating,
      };
      if (_weightCtrl.text.isNotEmpty) {
        body['weight'] = double.tryParse(_weightCtrl.text);
      }
      if (_colorCtrl.text.isNotEmpty) {
        body['color'] = _colorCtrl.text;
      }
      if (_notesCtrl.text.isNotEmpty) {
        body['notes'] = _notesCtrl.text;
      }
      final updated = await ApiService().put('/pets/${_pet['id']}', body);
      if (updated != null) {
        setState(() { _pet = Map<String, dynamic>.from(updated); });
      }
      setState(() { _editing = false; });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(l10n.petUpdated), backgroundColor: AppTheme.success),
      );
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('${l10n.error}: $e'), backgroundColor: AppTheme.error),
      );
    }
  }

  Future<void> _deletePet() async {
    final l10n = AppLocalizations.of(context)!;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(l10n.deletePet),
        content: Text('Are you sure you want to delete ${_pet['name']}? This cannot be undone.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(l10n.cancel)),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: Text(l10n.delete, style: const TextStyle(color: AppTheme.error)),
          ),
        ],
      ),
    );
    if (confirmed != true) return;
    try {
      await ApiService().delete('/pets/${_pet['id']}');
      if (mounted) Navigator.pop(context, true);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('${l10n.error}: $e'), backgroundColor: AppTheme.error),
        );
      }
    }
  }

  @override
  void dispose() {
    _tabController.dispose();
    _nameCtrl.dispose();
    _breedCtrl.dispose();
    _weightCtrl.dispose();
    _colorCtrl.dispose();
    _notesCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final photos = _pet['photos'] as List?;
    final photoUrl = (photos != null && photos.isNotEmpty)
        ? (photos.first is Map ? photos.first['url'] : photos.first)
        : null;

    return BirthdayCelebration(
      showCelebration: _isBirthdayToday,
      child: Scaffold(
      body: NestedScrollView(
        headerSliverBuilder: (context, innerBoxIsScrolled) => [
          SliverAppBar(
            expandedHeight: 280,
            pinned: true,
            backgroundColor: Colors.white,
            leading: IconButton(
              icon: Container(
                padding: const EdgeInsets.all(8),
                decoration: BoxDecoration(color: Colors.black26, shape: BoxShape.circle),
                child: const Icon(Icons.arrow_back, color: Colors.white, size: 20),
              ),
              onPressed: () => Navigator.pop(context),
            ),
            actions: [
              IconButton(
                icon: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(color: Colors.black26, shape: BoxShape.circle),
                  child: Icon(_editing ? Icons.close : Icons.edit, color: Colors.white, size: 20),
                ),
                onPressed: () => setState(() { _editing = !_editing; if (!_editing) _populateFields(); }),
              ),
              IconButton(
                icon: Container(
                  padding: const EdgeInsets.all(8),
                  decoration: BoxDecoration(color: Colors.black26, shape: BoxShape.circle),
                  child: const Icon(Icons.delete_outline, color: Colors.white, size: 20),
                ),
                onPressed: _deletePet,
              ),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: Stack(
                fit: StackFit.expand,
                children: [
                  if (photoUrl != null)
                    CachedNetworkImage(imageUrl: photoUrl, fit: BoxFit.cover)
                  else
                    Container(
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                          colors: [AppTheme.primary.withOpacity(0.8), AppTheme.accent],
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                        ),
                      ),
                      child: Center(child: Text(_speciesEmoji(_pet['species'] ?? ''), style: const TextStyle(fontSize: 80))),
                    ),
                  Container(
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [Colors.transparent, Colors.black.withOpacity(0.6)],
                      ),
                    ),
                  ),
                  Positioned(
                    bottom: 20,
                    left: 20,
                    right: 20,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          _pet['name'] ?? 'Unknown',
                          style: const TextStyle(color: Colors.white, fontSize: 28, fontWeight: FontWeight.w800),
                        ),
                        const SizedBox(height: 4),
                        Text(
                          '${_pet['breed'] ?? ''} · ${_pet['species'] ?? ''}',
                          style: TextStyle(color: Colors.white.withOpacity(0.9), fontSize: 15),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
        body: Column(
          children: [
            Container(
              color: Colors.white,
              child: TabBar(
                controller: _tabController,
                labelColor: AppTheme.primary,
                unselectedLabelColor: AppTheme.textSecondary,
                indicatorColor: AppTheme.primary,
                indicatorWeight: 3,
                tabs: [
                  Tab(text: l10n.basicInfo, icon: const Icon(Icons.info_outline, size: 20)),
                  Tab(text: l10n.health, icon: const Icon(Icons.medical_services_outlined, size: 20)),
                  Tab(text: l10n.more, icon: const Icon(Icons.more_horiz, size: 20)),
                ],
              ),
            ),
            Expanded(
              child: TabBarView(
                controller: _tabController,
                children: [
                  _buildProfileTab(),
                  HealthRecordsScreen(petId: _pet['id'], ownerId: _pet['ownerId'] ?? ''),
                  _buildMoreTab(),
                ],
              ),
            ),
          ],
        ),
      ),
      bottomNavigationBar: _editing
          ? SafeArea(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: ElevatedButton(
                  onPressed: _savePet,
                  child: Text(l10n.save),
                ),
              ),
            )
          : null,
    ),
    );
  }

  Widget _buildProfileTab() {
    final l10n = AppLocalizations.of(context)!;
    if (_editing) return _buildEditForm();
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        if (_showBirthdayBanner)
          PetBirthdayBanner(
            petName: _pet['name'] ?? '',
            age: _petAge,
            onDismiss: () => setState(() => _showBirthdayBanner = false),
          ),
        _buildInfoSection(l10n.basicInfo, [
          _infoTile(Icons.pets, l10n.species, _pet['species'] ?? '-'),
          _infoTile(Icons.category, l10n.breed, _pet['breed'] ?? '-'),
          _infoTile(_pet['gender'] == 'male' ? Icons.male : Icons.female, l10n.gender, _pet['gender'] ?? '-'),
          _infoTile(Icons.palette, l10n.color, _pet['color'] ?? '-'),
          _infoTile(Icons.monitor_weight, l10n.weight, _pet['weight'] != null ? '${_pet['weight']} kg' : '-'),
        ]),
        const SizedBox(height: 16),
        _buildInfoSection(l10n.status, [
          _infoTile(Icons.check_circle, l10n.status, _pet['status'] ?? 'active'),
          _infoTile(Icons.content_cut, l10n.neutered, _isNeutered ? 'Yes' : 'No'),
          _infoTile(Icons.favorite, l10n.availableForMating, _isAvailableForMating ? 'Yes' : 'No'),
        ]),
        const SizedBox(height: 16),
        _buildInfoSection(l10n.location, [
          _infoTile(Icons.flag, l10n.country, _pet['country'] ?? _pet['location']?['country'] ?? '-'),
          _infoTile(Icons.location_city, l10n.city, _pet['city'] ?? _pet['location']?['city'] ?? '-'),
        ]),
        if (_pet['notes'] != null && (_pet['notes'] as String).isNotEmpty) ...[
          const SizedBox(height: 16),
          _buildInfoSection(l10n.notes, [
            Padding(
              padding: const EdgeInsets.all(12),
              child: Text(_pet['notes'], style: const TextStyle(color: AppTheme.textSecondary)),
            ),
          ]),
        ],
      ],
    );
  }

  Widget _buildEditForm() {
    final l10n = AppLocalizations.of(context)!;
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        _buildField(l10n.petName, _nameCtrl),
        _buildField(l10n.breed, _breedCtrl),
        const SizedBox(height: 12),
        DropdownButtonFormField<String>(
          value: _species,
          decoration: InputDecoration(labelText: l10n.species),
          items: ['dog', 'cat', 'bird', 'horse', 'rabbit', 'fish', 'reptile', 'hamster']
              .map((s) => DropdownMenuItem(value: s, child: Text(s)))
              .toList(),
          onChanged: (v) => setState(() => _species = v),
        ),
        const SizedBox(height: 12),
        DropdownButtonFormField<String>(
          value: _gender,
          decoration: InputDecoration(labelText: l10n.gender),
          items: ['male', 'female'].map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
          onChanged: (v) => setState(() => _gender = v),
        ),
        const SizedBox(height: 12),
        _buildField(l10n.weightKg, _weightCtrl, keyboard: TextInputType.number),
        _buildField(l10n.color, _colorCtrl),
        const SizedBox(height: 12),
        SwitchListTile(
          title: Text(l10n.neutered),
          value: _isNeutered,
          onChanged: (v) => setState(() => _isNeutered = v),
          activeColor: AppTheme.primary,
        ),
        SwitchListTile(
          title: Text(l10n.availableForMating),
          value: _isAvailableForMating,
          onChanged: (v) => setState(() => _isAvailableForMating = v),
          activeColor: AppTheme.primary,
        ),
        const SizedBox(height: 12),
        _buildField(l10n.notes, _notesCtrl, maxLines: 3),
      ],
    );
  }

  Widget _buildMoreTab() {
    final l10n = AppLocalizations.of(context)!;
    final birthDateStr = _pet['dateOfBirth'];
    final birthDate = birthDateStr != null ? DateTime.tryParse(birthDateStr) : null;
    String birthdaySubtitle = 'Not set - Tap to add';
    if (birthDate != null) {
      final nextBirthday = _getNextBirthday(birthDate);
      final daysUntil = nextBirthday.difference(DateTime.now()).inDays;
      birthdaySubtitle = 'Born: ${birthDate.day}/${birthDate.month}/${birthDate.year} • $daysUntil days until next 🎂';
    }

    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        _buildActionCard(
          Icons.vaccines,
          l10n.vaccinations,
          l10n.trackVaccinesDosesSchedules,
          Colors.blue,
          () => Navigator.push(context, MaterialPageRoute(builder: (_) => VaccinationScreen(petId: _pet['id'], ownerId: _pet['ownerId'] ?? ''))),
        ),
        const SizedBox(height: 12),
        _buildActionCard(
          Icons.pregnant_woman,
          l10n.pregnancy,
          l10n.trackPregnanciesDueDates,
          Colors.purple,
          () => Navigator.push(context, MaterialPageRoute(builder: (_) => PregnancyScreen(petId: _pet['id'], ownerId: _pet['ownerId'] ?? ''))),
        ),
        const SizedBox(height: 12),
        _buildActionCard(
          Icons.verified_user,
          l10n.healthCertification,
          _pet['healthCertified'] == true ? 'Certified' : 'Request health certification',
          _pet['healthCertified'] == true ? Colors.green : Colors.teal,
          () async {
            final result = await Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => HealthCertificationScreen(petId: _pet['id'], petName: _pet['name'] ?? '')),
            );
            if (result == true) {
              final updated = await ApiService().get('/pets/${_pet['id']}');
              if (updated != null && mounted) setState(() => _pet = Map<String, dynamic>.from(updated));
            }
          },
        ),
        const SizedBox(height: 12),
        _buildActionCard(
          Icons.cake,
          l10n.dateOfBirth,
          birthdaySubtitle,
          Colors.orange,
          _showBirthdayPicker,
        ),
        const SizedBox(height: 12),
        _buildActionCard(
          Icons.photo_library,
          l10n.photoGallery,
          '${((_pet['photos'] as List?) ?? []).length} ${l10n.photos}',
          Colors.green,
          () {},
        ),
      ],
    );
  }

  DateTime _getNextBirthday(DateTime birthDate) {
    final now = DateTime.now();
    var next = DateTime(now.year, birthDate.month, birthDate.day);
    if (next.isBefore(now) || next.isAtSameMomentAs(now)) {
      next = DateTime(now.year + 1, birthDate.month, birthDate.day);
    }
    return next;
  }

  void _showBirthdayPicker() async {
    final existing = _pet['dateOfBirth'] != null ? DateTime.tryParse(_pet['dateOfBirth']) : null;
    final picked = await showDatePicker(
      context: context,
      initialDate: existing ?? DateTime.now().subtract(const Duration(days: 365)),
      firstDate: DateTime(2000),
      lastDate: DateTime.now(),
      helpText: 'Select ${_pet['name']}\'s birth date',
    );
    if (picked == null) return;

    try {
      await ApiService().put('/pets/${_pet['id']}', {
        'dateOfBirth': picked.toIso8601String(),
      });

      // Schedule birthday notification
      final notifId = (_pet['id'].hashCode + 99999).abs() % 100000;
      await NotificationService().scheduleBirthdayNotification(
        notificationId: notifId,
        petName: _pet['name'] ?? 'Your pet',
        birthDate: picked,
      );

      setState(() => _pet['dateOfBirth'] = picked.toIso8601String());

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('🎂 Birthday set! You\'ll get a gift card notification on ${picked.day}/${picked.month} each year.'),
            backgroundColor: AppTheme.success,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        final l10n = AppLocalizations.of(context)!;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('${l10n.error}: $e'), backgroundColor: AppTheme.error),
        );
      }
    }
  }

  Widget _buildActionCard(IconData icon, String title, String subtitle, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(16),
          boxShadow: AppTheme.cardShadow,
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(12)),
              child: Icon(icon, color: color, size: 24),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                  const SizedBox(height: 2),
                  Text(subtitle, style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13)),
                ],
              ),
            ),
            const Icon(Icons.chevron_right, color: AppTheme.textSecondary),
          ],
        ),
      ),
    );
  }

  Widget _buildInfoSection(String title, List<Widget> children) {
    return Container(
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 14, 16, 8),
            child: Text(title, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
          ),
          ...children,
          const SizedBox(height: 8),
        ],
      ),
    );
  }

  Widget _infoTile(IconData icon, String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Row(
        children: [
          Icon(icon, size: 20, color: AppTheme.textSecondary),
          const SizedBox(width: 12),
          Expanded(child: Text(label, style: const TextStyle(color: AppTheme.textSecondary, fontSize: 14))),
          Text(value, style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 14)),
        ],
      ),
    );
  }

  Widget _buildField(String label, TextEditingController ctrl, {TextInputType? keyboard, int maxLines = 1}) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 12),
      child: TextField(
        controller: ctrl,
        keyboardType: keyboard,
        maxLines: maxLines,
        decoration: InputDecoration(labelText: label),
      ),
    );
  }

  String _speciesEmoji(String species) {
    const map = {'dog': '🐕', 'cat': '🐱', 'bird': '🦜', 'horse': '🐴', 'rabbit': '🐰', 'fish': '🐠', 'reptile': '🦎', 'hamster': '🐹'};
    return map[species] ?? '🐾';
  }
}

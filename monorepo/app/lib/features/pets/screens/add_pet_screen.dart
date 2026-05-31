import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../l10n/generated/app_localizations.dart';

class AddPetScreen extends StatefulWidget {
  const AddPetScreen({super.key});

  @override
  State<AddPetScreen> createState() => _AddPetScreenState();
}

class _AddPetScreenState extends State<AddPetScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameCtrl = TextEditingController();
  final _breedCtrl = TextEditingController();
  final _weightCtrl = TextEditingController();
  final _colorCtrl = TextEditingController();
  final _notesCtrl = TextEditingController();
  String _species = 'dog';
  String _gender = 'male';
  bool _isNeutered = false;
  bool _isAvailableForMating = false;
  String? _country;
  String? _city;
  List<Map<String, dynamic>> _countries = [];
  List<String> _cities = [];
  bool _loadingCities = false;
  DateTime? _dateOfBirth;
  final List<File> _photos = [];
  bool _saving = false;

  final _picker = ImagePicker();

  @override
  void initState() {
    super.initState();
    _loadCountries();
  }

  Future<void> _loadCountries() async {
    try {
      final data = await ApiService().get('/pets/locations/countries');
      if (data is List) {
        setState(() {
          _countries = data.cast<Map<String, dynamic>>();
        });
      }
    } catch (_) {}
  }

  Future<void> _loadCities(String country) async {
    setState(() { _loadingCities = true; _cities = []; _city = null; });
    try {
      final data = await ApiService().get('/pets/locations/cities?country=$country');
      if (data is List) {
        setState(() {
          _cities = data.map((c) => c.toString()).toList();
          _loadingCities = false;
        });
      } else {
        setState(() => _loadingCities = false);
      }
    } catch (_) {
      setState(() => _loadingCities = false);
    }
  }

  Future<void> _pickImage(ImageSource source) async {
    final picked = await _picker.pickImage(source: source, maxWidth: 1024, imageQuality: 80);
    if (picked != null) {
      setState(() => _photos.add(File(picked.path)));
    }
  }

  void _showImageSourceSheet() {
    final l10n = AppLocalizations.of(context)!;
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(l10n.addPhoto, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  _imageSourceOption(Icons.camera_alt, l10n.camera, () {
                    Navigator.pop(ctx);
                    _pickImage(ImageSource.camera);
                  }),
                  _imageSourceOption(Icons.photo_library, l10n.gallery, () {
                    Navigator.pop(ctx);
                    _pickImage(ImageSource.gallery);
                  }),
                ],
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }

  Widget _imageSourceOption(IconData icon, String label, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.primary.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, color: AppTheme.primary, size: 32),
          ),
          const SizedBox(height: 8),
          Text(label, style: const TextStyle(fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _saving = true);
    try {
      final api = ApiService();
      final petData = <String, dynamic>{
        'name': _nameCtrl.text,
        'species': _species,
        'breed': _breedCtrl.text.isNotEmpty ? _breedCtrl.text : _species,
        'gender': _gender,
        'dateOfBirth': (_dateOfBirth ?? DateTime.now().subtract(const Duration(days: 365))).toIso8601String(),
        'isNeutered': _isNeutered,
        'isAvailableForMating': _isAvailableForMating,
        if (_country != null || _city != null)
          'location': {'country': _country ?? '', 'city': _city ?? ''},
      };
      if (_weightCtrl.text.isNotEmpty) {
        petData['weight'] = double.tryParse(_weightCtrl.text);
      }
      if (_colorCtrl.text.isNotEmpty) {
        petData['color'] = _colorCtrl.text;
      }
      if (_notesCtrl.text.isNotEmpty) {
        petData['notes'] = _notesCtrl.text;
      }

      final result = await api.post('/pets', petData);

      if (_photos.isNotEmpty && result != null && result['id'] != null) {
        for (final photo in _photos) {
          try {
            await api.uploadFile('/pets/${result['id']}/photos/upload', photo);
          } catch (_) {}
        }
      }

      if (mounted) {
        final l10n = AppLocalizations.of(context)!;
        Navigator.pop(context, true);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(l10n.petAddedSuccessfully), backgroundColor: AppTheme.success),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('${AppLocalizations.of(context)!.error}: $e'), backgroundColor: AppTheme.error),
        );
      }
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  @override
  void dispose() {
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
    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.addNewPet, style: const TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: Form(
        key: _formKey,
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            _buildPhotoSection(),
            const SizedBox(height: 24),
            _buildSectionTitle(l10n.basicInformation),
            const SizedBox(height: 12),
            TextFormField(
              controller: _nameCtrl,
              decoration: InputDecoration(labelText: '${l10n.petName} *', prefixIcon: const Icon(Icons.pets)),
              validator: (v) => (v == null || v.isEmpty) ? l10n.petNameRequired : null,
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: _species,
                    decoration: InputDecoration(labelText: l10n.species),
                    items: ['dog', 'cat', 'bird', 'horse', 'rabbit', 'fish', 'reptile', 'hamster']
                        .map((s) => DropdownMenuItem(value: s, child: Text(s)))
                        .toList(),
                    onChanged: (v) => setState(() => _species = v!),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: DropdownButtonFormField<String>(
                    value: _gender,
                    decoration: InputDecoration(labelText: l10n.gender),
                    items: ['male', 'female'].map((g) => DropdownMenuItem(value: g, child: Text(g))).toList(),
                    onChanged: (v) => setState(() => _gender = v!),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _breedCtrl,
              decoration: InputDecoration(labelText: l10n.breed, prefixIcon: const Icon(Icons.category)),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                Expanded(
                  child: TextFormField(
                    controller: _weightCtrl,
                    keyboardType: TextInputType.number,
                    decoration: InputDecoration(labelText: l10n.weightKg, prefixIcon: const Icon(Icons.monitor_weight)),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: TextFormField(
                    controller: _colorCtrl,
                    decoration: InputDecoration(labelText: l10n.color, prefixIcon: const Icon(Icons.palette)),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            GestureDetector(
              onTap: () async {
                final picked = await showDatePicker(
                  context: context,
                  initialDate: DateTime.now().subtract(const Duration(days: 365)),
                  firstDate: DateTime(2000),
                  lastDate: DateTime.now(),
                  helpText: l10n.selectDateOfBirth,
                );
                if (picked != null) setState(() => _dateOfBirth = picked);
              },
              child: Container(
                padding: const EdgeInsets.all(14),
                decoration: BoxDecoration(
                  border: Border.all(color: _dateOfBirth != null ? AppTheme.primary.withOpacity(0.5) : Colors.grey.shade200),
                  borderRadius: BorderRadius.circular(14),
                  color: _dateOfBirth != null ? AppTheme.primary.withOpacity(0.05) : Colors.white,
                ),
                child: Row(
                  children: [
                    Icon(Icons.cake, color: _dateOfBirth != null ? AppTheme.primary : Colors.grey),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(l10n.dateOfBirth, style: const TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
                          const SizedBox(height: 2),
                          Text(
                            _dateOfBirth != null
                                ? '${_dateOfBirth!.day}/${_dateOfBirth!.month}/${_dateOfBirth!.year}'
                                : 'Tap to select',
                            style: TextStyle(
                              color: _dateOfBirth != null ? AppTheme.textPrimary : AppTheme.textSecondary,
                              fontWeight: _dateOfBirth != null ? FontWeight.w600 : FontWeight.normal,
                            ),
                          ),
                        ],
                      ),
                    ),
                    if (_dateOfBirth != null) const Icon(Icons.check_circle, color: AppTheme.primary, size: 20),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 24),
            _buildSectionTitle(l10n.location),
            const SizedBox(height: 12),
            _buildLocationPicker(
              label: l10n.country,
              icon: Icons.flag,
              value: _country,
              onTap: () => _showSearchablePicker(
                title: l10n.selectCountry,
                items: _countries.map((c) => c['name'] as String).toList(),
                onSelected: (v) {
                  setState(() => _country = v);
                  _loadCities(v);
                },
              ),
            ),
            const SizedBox(height: 12),
            _buildLocationPicker(
              label: l10n.city,
              icon: Icons.location_city,
              value: _city,
              isLoading: _loadingCities,
              onTap: _country == null
                  ? () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text(l10n.pleaseSelectCountryFirst), backgroundColor: AppTheme.warning),
                      );
                    }
                  : () => _showSearchablePicker(
                      title: l10n.selectCity,
                      items: _cities,
                      onSelected: (v) => setState(() => _city = v),
                    ),
            ),
            const SizedBox(height: 24),
            _buildSectionTitle(l10n.details),
            const SizedBox(height: 12),
            Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(14),
                border: Border.all(color: Colors.grey.shade200),
              ),
              child: Column(
                children: [
                  SwitchListTile(
                    title: Text(l10n.neuteredSpayed),
                    value: _isNeutered,
                    onChanged: (v) => setState(() => _isNeutered = v),
                    activeColor: AppTheme.primary,
                  ),
                  Divider(height: 1, color: Colors.grey.shade100),
                  SwitchListTile(
                    title: Text(l10n.availableForMating),
                    value: _isAvailableForMating,
                    onChanged: (v) => setState(() => _isAvailableForMating = v),
                    activeColor: AppTheme.primary,
                  ),
                ],
              ),
            ),
            const SizedBox(height: 12),
            TextFormField(
              controller: _notesCtrl,
              maxLines: 3,
              decoration: InputDecoration(labelText: l10n.notes, prefixIcon: const Icon(Icons.notes), alignLabelWithHint: true),
            ),
            const SizedBox(height: 32),
            SizedBox(
              height: 52,
              child: ElevatedButton(
                onPressed: _saving ? null : _submit,
                child: _saving
                    ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                    : Text(l10n.addPet, style: const TextStyle(fontSize: 16)),
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildPhotoSection() {
    final l10n = AppLocalizations.of(context)!;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        _buildSectionTitle(l10n.photos),
        const SizedBox(height: 12),
        SizedBox(
          height: 110,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: [
              ..._photos.asMap().entries.map((e) => _buildPhotoThumbnail(e.key, e.value)),
              _buildAddPhotoButton(),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildPhotoThumbnail(int index, File file) {
    return Container(
      width: 100,
      height: 100,
      margin: const EdgeInsets.only(right: 10),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(14),
        image: DecorationImage(image: FileImage(file), fit: BoxFit.cover),
      ),
      child: Stack(
        children: [
          Positioned(
            top: 4,
            right: 4,
            child: GestureDetector(
              onTap: () => setState(() => _photos.removeAt(index)),
              child: Container(
                padding: const EdgeInsets.all(4),
                decoration: const BoxDecoration(color: Colors.black54, shape: BoxShape.circle),
                child: const Icon(Icons.close, color: Colors.white, size: 14),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAddPhotoButton() {
    final l10n = AppLocalizations.of(context)!;
    return GestureDetector(
      onTap: _showImageSourceSheet,
      child: Container(
        width: 100,
        height: 100,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: AppTheme.primary, style: BorderStyle.solid, width: 2),
          color: AppTheme.primary.withOpacity(0.05),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.add_a_photo, color: AppTheme.primary, size: 28),
            const SizedBox(height: 4),
            Text(l10n.addPhoto, style: const TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.w600)),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: AppTheme.textPrimary));
  }

  Widget _buildLocationPicker({
    required String label,
    required IconData icon,
    required String? value,
    required VoidCallback onTap,
    bool isLoading = false,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: value != null ? AppTheme.primary.withOpacity(0.04) : Colors.white,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: value != null ? AppTheme.primary.withOpacity(0.4) : Colors.grey.shade200,
          ),
        ),
        child: Row(
          children: [
            Icon(icon, color: value != null ? AppTheme.primary : Colors.grey, size: 22),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label, style: const TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
                  const SizedBox(height: 2),
                  Text(
                    value ?? 'Tap to select',
                    style: TextStyle(
                      fontSize: 15,
                      color: value != null ? AppTheme.textPrimary : AppTheme.textSecondary,
                      fontWeight: value != null ? FontWeight.w600 : FontWeight.normal,
                    ),
                  ),
                ],
              ),
            ),
            if (isLoading)
              const SizedBox(width: 18, height: 18, child: CircularProgressIndicator(strokeWidth: 2, color: AppTheme.primary))
            else if (value != null)
              const Icon(Icons.check_circle, color: AppTheme.primary, size: 20)
            else
              Icon(Icons.chevron_right, color: Colors.grey.shade400, size: 22),
          ],
        ),
      ),
    );
  }

  void _showSearchablePicker({
    required String title,
    required List<String> items,
    required ValueChanged<String> onSelected,
  }) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => _SearchablePickerSheet(
        title: title,
        items: items,
        onSelected: (v) {
          Navigator.pop(ctx);
          onSelected(v);
        },
      ),
    );
  }
}

class _SearchablePickerSheet extends StatefulWidget {
  final String title;
  final List<String> items;
  final ValueChanged<String> onSelected;

  const _SearchablePickerSheet({
    required this.title,
    required this.items,
    required this.onSelected,
  });

  @override
  State<_SearchablePickerSheet> createState() => _SearchablePickerSheetState();
}

class _SearchablePickerSheetState extends State<_SearchablePickerSheet> {
  final _searchCtrl = TextEditingController();
  List<String> _filtered = [];

  @override
  void initState() {
    super.initState();
    _filtered = widget.items;
  }

  void _onSearch(String query) {
    setState(() {
      if (query.isEmpty) {
        _filtered = widget.items;
      } else {
        final q = query.toLowerCase();
        _filtered = widget.items.where((item) => item.toLowerCase().contains(q)).toList();
      }
    });
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.7,
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        children: [
          const SizedBox(height: 12),
          Container(
            width: 40,
            height: 4,
            decoration: BoxDecoration(color: Colors.grey.shade300, borderRadius: BorderRadius.circular(2)),
          ),
          const SizedBox(height: 16),
          Text(widget.title, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
          const SizedBox(height: 16),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: TextField(
              controller: _searchCtrl,
              onChanged: _onSearch,
              autofocus: true,
              decoration: InputDecoration(
                hintText: 'Search...',
                prefixIcon: const Icon(Icons.search, color: AppTheme.primary),
                filled: true,
                fillColor: Colors.grey.shade50,
                contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                border: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide.none),
                enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: BorderSide(color: Colors.grey.shade200)),
                focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(14), borderSide: const BorderSide(color: AppTheme.primary)),
              ),
            ),
          ),
          const SizedBox(height: 12),
          Expanded(
            child: _filtered.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.search_off, size: 48, color: Colors.grey.shade300),
                        const SizedBox(height: 12),
                        Text('No results found', style: TextStyle(color: Colors.grey.shade500, fontSize: 15)),
                      ],
                    ),
                  )
                : ListView.separated(
                    padding: const EdgeInsets.symmetric(horizontal: 12),
                    itemCount: _filtered.length,
                    separatorBuilder: (_, __) => Divider(height: 1, color: Colors.grey.shade100),
                    itemBuilder: (ctx, i) {
                      final item = _filtered[i];
                      return ListTile(
                        title: Text(item, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500)),
                        trailing: const Icon(Icons.chevron_right, size: 18, color: AppTheme.primary),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                        onTap: () => widget.onSelected(item),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}

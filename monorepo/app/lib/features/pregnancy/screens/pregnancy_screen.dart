import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../../core/services/api_service.dart';
import '../../../core/services/notification_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../l10n/generated/app_localizations.dart';

class PregnancyScreen extends StatefulWidget {
  final String petId;
  final String ownerId;
  const PregnancyScreen({super.key, required this.petId, required this.ownerId});

  @override
  State<PregnancyScreen> createState() => _PregnancyScreenState();
}

class _PregnancyScreenState extends State<PregnancyScreen> {
  List<dynamic> _pregnancies = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      final data = await ApiService().get('/pets/${widget.petId}/pregnancies');
      final items = data['data'] ?? [];
      if (items.isEmpty) {
        try {
          final active = await ApiService().get('/pets/${widget.petId}/pregnancy');
          if (active != null && active['id'] != null) {
            setState(() { _pregnancies = [active]; _loading = false; });
            return;
          }
        } catch (_) {}
      }
      setState(() { _pregnancies = items; _loading = false; });
    } catch (e) {
      try {
        final active = await ApiService().get('/pets/${widget.petId}/pregnancy');
        if (active != null && active['id'] != null) {
          setState(() { _pregnancies = [active]; _loading = false; });
          return;
        }
      } catch (_) {}
      setState(() { _pregnancies = []; _loading = false; });
    }
  }

  final _picker = ImagePicker();

  void _showAddDialog() {
    final l10n = AppLocalizations.of(context)!;
    DateTime? matingDate;
    DateTime? expectedDeliveryDate;
    final notesCtrl = TextEditingController();
    final fatherNameCtrl = TextEditingController();
    final fatherBreedCtrl = TextEditingController();
    final fatherColorCtrl = TextEditingController();
    final fatherAgeCtrl = TextEditingController();
    final fatherNotesCtrl = TextEditingController();
    final fatherOwnerCtrl = TextEditingController();
    List<File> fatherPhotos = [];
    bool autoCalc = true;

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setSheetState) => Padding(
          padding: EdgeInsets.fromLTRB(20, 16, 20, MediaQuery.of(ctx).viewInsets.bottom + 20),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 40, height: 4,
                    decoration: BoxDecoration(color: Colors.grey.shade300, borderRadius: BorderRadius.circular(2)),
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    GestureDetector(
                      onTap: () => Navigator.pop(ctx),
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: Colors.grey.shade100,
                          shape: BoxShape.circle,
                        ),
                        child: const Icon(Icons.arrow_back, size: 20),
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(l10n.trackPregnancy, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                          const SizedBox(height: 2),
                          Text(l10n.notificationSchedule, style: const TextStyle(fontSize: 13, color: AppTheme.textSecondary)),
                        ],
                      ),
                    ),
                    GestureDetector(
                      onTap: () => Navigator.pop(ctx),
                      child: const Icon(Icons.close, color: Colors.grey),
                    ),
                  ],
                ),
                const SizedBox(height: 20),

                _buildDateSelector(
                  ctx: ctx,
                  label: '${l10n.matingDate} *',
                  icon: Icons.favorite,
                  color: Colors.purple,
                  date: matingDate,
                  hint: l10n.whenDidMatingOccur,
                  onTap: () async {
                    final picked = await showDatePicker(
                      context: ctx,
                      initialDate: DateTime.now().subtract(const Duration(days: 14)),
                      firstDate: DateTime.now().subtract(const Duration(days: 365)),
                      lastDate: DateTime.now(),
                    );
                    if (picked != null) {
                      setSheetState(() {
                        matingDate = picked;
                        if (autoCalc) {
                          expectedDeliveryDate = picked.add(const Duration(days: 283));
                        }
                      });
                    }
                  },
                ),
                const SizedBox(height: 12),

                _buildDateSelector(
                  ctx: ctx,
                  label: '${l10n.expectedDeliveryDate} *',
                  icon: Icons.child_friendly,
                  color: AppTheme.primary,
                  date: expectedDeliveryDate,
                  hint: autoCalc && matingDate == null ? l10n.autoCalculatedFromMatingDate : l10n.tapToSetManually,
                  onTap: () async {
                    final initial = expectedDeliveryDate ?? (matingDate != null
                        ? matingDate!.add(const Duration(days: 283))
                        : DateTime.now().add(const Duration(days: 283)));
                    final picked = await showDatePicker(
                      context: ctx,
                      initialDate: initial,
                      firstDate: DateTime.now(),
                      lastDate: DateTime.now().add(const Duration(days: 400)),
                    );
                    if (picked != null) {
                      setSheetState(() {
                        expectedDeliveryDate = picked;
                        autoCalc = false;
                      });
                    }
                  },
                ),

                if (matingDate != null && autoCalc)
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Text(
                      '* ${l10n.autoCalculated63Days}',
                      style: TextStyle(fontSize: 11, color: Colors.purple.withOpacity(0.7), fontStyle: FontStyle.italic),
                    ),
                  ),

                const SizedBox(height: 20),
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.blue.withOpacity(0.04),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: Colors.blue.withOpacity(0.2)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.male, color: Colors.blue, size: 20),
                          const SizedBox(width: 8),
                          Text(l10n.fatherDetails, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                        ],
                      ),
                      const SizedBox(height: 4),
                      Text(l10n.infoAboutSire, style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                      const SizedBox(height: 12),
                      TextField(
                        controller: fatherNameCtrl,
                        decoration: InputDecoration(labelText: '${l10n.fatherName} *', prefixIcon: const Icon(Icons.pets), isDense: true),
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(
                            child: TextField(
                              controller: fatherBreedCtrl,
                              decoration: const InputDecoration(labelText: 'Breed', prefixIcon: Icon(Icons.category), isDense: true),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: TextField(
                              controller: fatherColorCtrl,
                              decoration: const InputDecoration(labelText: 'Color', prefixIcon: Icon(Icons.palette), isDense: true),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(
                            child: TextField(
                              controller: fatherAgeCtrl,
                              decoration: const InputDecoration(labelText: 'Age', prefixIcon: Icon(Icons.cake), isDense: true),
                            ),
                          ),
                          const SizedBox(width: 10),
                          Expanded(
                            child: TextField(
                              controller: fatherOwnerCtrl,
                              decoration: InputDecoration(labelText: l10n.ownerName, prefixIcon: const Icon(Icons.person), isDense: true),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 10),
                      TextField(
                        controller: fatherNotesCtrl,
                        maxLines: 2,
                        decoration: InputDecoration(labelText: l10n.notesAboutFather, prefixIcon: const Icon(Icons.notes), isDense: true),
                      ),
                      const SizedBox(height: 12),
                      Text(l10n.photosUpTo10, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
                      const SizedBox(height: 8),
                      SizedBox(
                        height: 80,
                        child: ListView(
                          scrollDirection: Axis.horizontal,
                          children: [
                            ...fatherPhotos.asMap().entries.map((e) => Container(
                              width: 72,
                              height: 72,
                              margin: const EdgeInsets.only(right: 8),
                              decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(10),
                                image: DecorationImage(image: FileImage(e.value), fit: BoxFit.cover),
                              ),
                              child: Align(
                                alignment: Alignment.topRight,
                                child: GestureDetector(
                                  onTap: () => setSheetState(() => fatherPhotos.removeAt(e.key)),
                                  child: Container(
                                    padding: const EdgeInsets.all(3),
                                    decoration: const BoxDecoration(color: Colors.black54, shape: BoxShape.circle),
                                    child: const Icon(Icons.close, color: Colors.white, size: 12),
                                  ),
                                ),
                              ),
                            )),
                            if (fatherPhotos.length < 10)
                              GestureDetector(
                                onTap: () async {
                                  final picked = await _picker.pickImage(source: ImageSource.gallery, maxWidth: 1024, imageQuality: 80);
                                  if (picked != null) {
                                    setSheetState(() => fatherPhotos.add(File(picked.path)));
                                  }
                                },
                                child: Container(
                                  width: 72,
                                  height: 72,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.circular(10),
                                    border: Border.all(color: Colors.blue, width: 1.5),
                                    color: Colors.blue.withOpacity(0.05),
                                  ),
                                  child: const Column(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      Icon(Icons.add_a_photo, color: Colors.blue, size: 20),
                                      SizedBox(height: 2),
                                      Text('Add', style: TextStyle(color: Colors.blue, fontSize: 10, fontWeight: FontWeight.w600)),
                                    ],
                                  ),
                                ),
                              ),
                          ],
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 12),
                TextField(controller: notesCtrl, maxLines: 2, decoration: InputDecoration(labelText: l10n.generalNotes, prefixIcon: const Icon(Icons.notes))),

                if (expectedDeliveryDate != null) ...[
                  const SizedBox(height: 16),
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.success.withOpacity(0.08),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppTheme.success.withOpacity(0.2)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Icon(Icons.notifications_active, size: 16, color: AppTheme.success),
                            const SizedBox(width: 8),
                            Text(l10n.notificationSchedule, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 13)),
                          ],
                        ),
                        const SizedBox(height: 8),
                        Text('• ${l10n.remindersBeforeDeliveryDate}', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                        Text('• ${l10n.deliveryWeekDailyAlerts}', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                        Text('• ${l10n.deliveryDayNotification}', style: TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                      ],
                    ),
                  ),
                ],

                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () async {
                      if (matingDate == null || expectedDeliveryDate == null) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(l10n.setBothDates), backgroundColor: AppTheme.warning),
                        );
                        return;
                      }
                      try {
                        final body = <String, dynamic>{
                          'startDate': matingDate!.toIso8601String(),
                          'expectedDueDate': expectedDeliveryDate!.toIso8601String(),
                          'notes': notesCtrl.text,
                          'status': 'active',
                        };

                        if (fatherNameCtrl.text.isNotEmpty) {
                          body['fatherInfo'] = {
                            'name': fatherNameCtrl.text,
                            if (fatherBreedCtrl.text.isNotEmpty) 'breed': fatherBreedCtrl.text,
                            if (fatherColorCtrl.text.isNotEmpty) 'color': fatherColorCtrl.text,
                            if (fatherAgeCtrl.text.isNotEmpty) 'age': fatherAgeCtrl.text,
                            if (fatherNotesCtrl.text.isNotEmpty) 'notes': fatherNotesCtrl.text,
                            if (fatherOwnerCtrl.text.isNotEmpty) 'ownerName': fatherOwnerCtrl.text,
                            'photos': <String>[],
                          };
                        }

                        final result = await ApiService().post('/pets/${widget.petId}/pregnancies', body);

                        if (fatherPhotos.isNotEmpty && result != null && result['id'] != null) {
                          for (final photo in fatherPhotos) {
                            try {
                              await ApiService().uploadFile(
                                '/pets/${widget.petId}/pregnancy/${result['id']}/father-photos',
                                photo,
                              );
                            } catch (_) {}
                          }
                        }

                        final notifId = (widget.petId.hashCode + matingDate.hashCode).abs() % 100000;
                        await NotificationService().schedulePregnancyReminders(
                          baseId: notifId,
                          petName: 'Your pet',
                          dueDate: expectedDeliveryDate!,
                        );

                        Navigator.pop(ctx);
                        _load();
                      } catch (e) {
                        final errMsg = e.toString();
                        final userMsg = errMsg.contains('409')
                            ? 'This pet already has an active pregnancy. Complete or delete the existing one first.'
                            : 'Error: $e';
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(userMsg), backgroundColor: AppTheme.error),
                        );
                      }
                    },
                    child: Text(l10n.startTracking),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildDateSelector({
    required BuildContext ctx,
    required String label,
    required IconData icon,
    required Color color,
    DateTime? date,
    String? hint,
    required VoidCallback onTap,
  }) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(14),
        decoration: BoxDecoration(
          border: Border.all(color: date != null ? color.withOpacity(0.5) : Colors.grey.shade200),
          borderRadius: BorderRadius.circular(14),
          color: date != null ? color.withOpacity(0.05) : Colors.white,
        ),
        child: Row(
          children: [
            Icon(icon, color: color, size: 20),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(label, style: TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
                  const SizedBox(height: 2),
                  Text(
                    date != null ? '${date.day}/${date.month}/${date.year}' : (hint ?? 'Tap to select'),
                    style: TextStyle(
                      color: date != null ? AppTheme.textPrimary : AppTheme.textSecondary,
                      fontWeight: date != null ? FontWeight.w600 : FontWeight.normal,
                    ),
                  ),
                ],
              ),
            ),
            if (date != null) Icon(Icons.check_circle, color: color, size: 20),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(l10n.pregnancyTracker, style: const TextStyle(fontWeight: FontWeight.w700))),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddDialog,
        backgroundColor: AppTheme.primary,
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
          : _pregnancies.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.child_friendly, size: 48, color: Colors.grey[300]),
                      const SizedBox(height: 12),
                      Text(l10n.noPregnancyRecords, style: const TextStyle(color: AppTheme.textSecondary)),
                      const SizedBox(height: 4),
                      Text(l10n.tapPlusToTrackPregnancy, style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _load,
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _pregnancies.length,
                    itemBuilder: (ctx, i) => _buildPregnancyCard(_pregnancies[i]),
                  ),
                ),
    );
  }

  Future<void> _deletePregnancy(dynamic preg) async {
    final pregId = preg['id'];
    if (pregId == null) return;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete Pregnancy'),
        content: const Text('Are you sure you want to delete this pregnancy record? This cannot be undone.'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: const Text('Cancel')),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('Delete', style: TextStyle(color: Colors.red)),
          ),
        ],
      ),
    );
    if (confirmed == true) {
      try {
        await ApiService().delete('/pets/${widget.petId}/pregnancy/$pregId');
        _load();
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
          );
        }
      }
    }
  }

  void _editPregnancy(dynamic preg) {
    final l10n = AppLocalizations.of(context)!;
    final pregId = preg['id'];
    if (pregId == null) return;

    DateTime? matingDate = preg['startDate'] != null ? DateTime.tryParse(preg['startDate']) : null;
    DateTime? expectedDeliveryDate = preg['expectedDueDate'] != null ? DateTime.tryParse(preg['expectedDueDate']) : null;
    String status = preg['status'] ?? 'active';
    final notesCtrl = TextEditingController(text: preg['notes'] ?? '');
    final fatherInfo = preg['fatherInfo'] as Map<String, dynamic>?;
    final fatherNameCtrl = TextEditingController(text: fatherInfo?['name'] ?? '');
    final fatherBreedCtrl = TextEditingController(text: fatherInfo?['breed'] ?? '');
    final fatherColorCtrl = TextEditingController(text: fatherInfo?['color'] ?? '');
    final fatherAgeCtrl = TextEditingController(text: fatherInfo?['age'] ?? '');
    final fatherNotesCtrl = TextEditingController(text: fatherInfo?['notes'] ?? '');
    final fatherOwnerCtrl = TextEditingController(text: fatherInfo?['ownerName'] ?? '');
    final litterSizeCtrl = TextEditingController(text: preg['litterSize']?.toString() ?? '');

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setSheetState) => Padding(
          padding: EdgeInsets.fromLTRB(20, 16, 20, MediaQuery.of(ctx).viewInsets.bottom + 20),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 40, height: 4,
                    decoration: BoxDecoration(color: Colors.grey.shade300, borderRadius: BorderRadius.circular(2)),
                  ),
                ),
                const SizedBox(height: 12),
                Row(
                  children: [
                    GestureDetector(
                      onTap: () => Navigator.pop(ctx),
                      child: Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(color: Colors.grey.shade100, shape: BoxShape.circle),
                        child: const Icon(Icons.arrow_back, size: 20),
                      ),
                    ),
                    const SizedBox(width: 12),
                    const Expanded(
                      child: Text('Edit Pregnancy', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                    ),
                    GestureDetector(
                      onTap: () => Navigator.pop(ctx),
                      child: const Icon(Icons.close, color: Colors.grey),
                    ),
                  ],
                ),
                const SizedBox(height: 20),

                // Status selector
                const Text('Status', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                const SizedBox(height: 8),
                Row(
                  children: [
                    _statusChip('active', status, Colors.purple, () => setSheetState(() => status = 'active')),
                    const SizedBox(width: 8),
                    _statusChip('completed', status, AppTheme.success, () => setSheetState(() => status = 'completed')),
                  ],
                ),
                const SizedBox(height: 16),

                _buildDateSelector(
                  ctx: ctx,
                  label: '${l10n.matingDate} *',
                  icon: Icons.favorite,
                  color: Colors.purple,
                  date: matingDate,
                  hint: l10n.whenDidMatingOccur,
                  onTap: () async {
                    final picked = await showDatePicker(
                      context: ctx,
                      initialDate: matingDate ?? DateTime.now().subtract(const Duration(days: 14)),
                      firstDate: DateTime.now().subtract(const Duration(days: 365)),
                      lastDate: DateTime.now(),
                    );
                    if (picked != null) setSheetState(() => matingDate = picked);
                  },
                ),
                const SizedBox(height: 12),

                _buildDateSelector(
                  ctx: ctx,
                  label: '${l10n.expectedDeliveryDate} *',
                  icon: Icons.child_friendly,
                  color: AppTheme.primary,
                  date: expectedDeliveryDate,
                  hint: l10n.tapToSetManually,
                  onTap: () async {
                    final initial = expectedDeliveryDate ?? DateTime.now().add(const Duration(days: 283));
                    final picked = await showDatePicker(
                      context: ctx,
                      initialDate: initial,
                      firstDate: DateTime.now().subtract(const Duration(days: 30)),
                      lastDate: DateTime.now().add(const Duration(days: 400)),
                    );
                    if (picked != null) setSheetState(() => expectedDeliveryDate = picked);
                  },
                ),
                const SizedBox(height: 16),

                TextField(
                  controller: litterSizeCtrl,
                  keyboardType: TextInputType.number,
                  decoration: const InputDecoration(labelText: 'Litter Size', prefixIcon: Icon(Icons.pets), isDense: true),
                ),
                const SizedBox(height: 12),
                TextField(controller: notesCtrl, maxLines: 2, decoration: InputDecoration(labelText: l10n.generalNotes, prefixIcon: const Icon(Icons.notes))),

                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.blue.withOpacity(0.04),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: Colors.blue.withOpacity(0.2)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          const Icon(Icons.male, color: Colors.blue, size: 20),
                          const SizedBox(width: 8),
                          Text(l10n.fatherDetails, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 15)),
                        ],
                      ),
                      const SizedBox(height: 12),
                      TextField(controller: fatherNameCtrl, decoration: InputDecoration(labelText: l10n.fatherName, prefixIcon: const Icon(Icons.pets), isDense: true)),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(child: TextField(controller: fatherBreedCtrl, decoration: const InputDecoration(labelText: 'Breed', prefixIcon: Icon(Icons.category), isDense: true))),
                          const SizedBox(width: 10),
                          Expanded(child: TextField(controller: fatherColorCtrl, decoration: const InputDecoration(labelText: 'Color', prefixIcon: Icon(Icons.palette), isDense: true))),
                        ],
                      ),
                      const SizedBox(height: 10),
                      Row(
                        children: [
                          Expanded(child: TextField(controller: fatherAgeCtrl, decoration: const InputDecoration(labelText: 'Age', prefixIcon: Icon(Icons.cake), isDense: true))),
                          const SizedBox(width: 10),
                          Expanded(child: TextField(controller: fatherOwnerCtrl, decoration: InputDecoration(labelText: l10n.ownerName, prefixIcon: const Icon(Icons.person), isDense: true))),
                        ],
                      ),
                      const SizedBox(height: 10),
                      TextField(controller: fatherNotesCtrl, maxLines: 2, decoration: InputDecoration(labelText: l10n.notesAboutFather, prefixIcon: const Icon(Icons.notes), isDense: true)),
                    ],
                  ),
                ),

                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () async {
                      if (matingDate == null || expectedDeliveryDate == null) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(l10n.setBothDates), backgroundColor: AppTheme.warning),
                        );
                        return;
                      }
                      try {
                        final body = <String, dynamic>{
                          'startDate': matingDate!.toIso8601String(),
                          'matingDate': matingDate!.toIso8601String(),
                          'expectedDueDate': expectedDeliveryDate!.toIso8601String(),
                          'status': status,
                          'notes': notesCtrl.text,
                        };
                        if (litterSizeCtrl.text.isNotEmpty) {
                          body['litterSize'] = int.tryParse(litterSizeCtrl.text);
                        }
                        if (fatherNameCtrl.text.isNotEmpty) {
                          body['fatherInfo'] = {
                            'name': fatherNameCtrl.text,
                            if (fatherBreedCtrl.text.isNotEmpty) 'breed': fatherBreedCtrl.text,
                            if (fatherColorCtrl.text.isNotEmpty) 'color': fatherColorCtrl.text,
                            if (fatherAgeCtrl.text.isNotEmpty) 'age': fatherAgeCtrl.text,
                            if (fatherNotesCtrl.text.isNotEmpty) 'notes': fatherNotesCtrl.text,
                            if (fatherOwnerCtrl.text.isNotEmpty) 'ownerName': fatherOwnerCtrl.text,
                            'photos': (fatherInfo?['photos'] as List?) ?? [],
                          };
                        }
                        await ApiService().put('/pets/${widget.petId}/pregnancy/$pregId', body);
                        Navigator.pop(ctx);
                        _load();
                      } catch (e) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
                        );
                      }
                    },
                    child: const Text('Save Changes'),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Widget _statusChip(String value, String current, Color color, VoidCallback onTap) {
    final isSelected = value == current;
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? color.withOpacity(0.15) : Colors.grey.shade100,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: isSelected ? color : Colors.grey.shade300),
        ),
        child: Text(
          value[0].toUpperCase() + value.substring(1),
          style: TextStyle(color: isSelected ? color : AppTheme.textSecondary, fontWeight: FontWeight.w600, fontSize: 13),
        ),
      ),
    );
  }

  Widget _buildPregnancyCard(dynamic preg) {
    final l10n = AppLocalizations.of(context)!;
    final status = preg['status'] ?? 'active';
    final isActive = status == 'active';
    final startDate = preg['startDate'] != null ? DateTime.tryParse(preg['startDate']) : null;
    final dueDate = preg['expectedDueDate'] != null ? DateTime.tryParse(preg['expectedDueDate']) : null;
    final daysRemaining = dueDate != null ? dueDate.difference(DateTime.now()).inDays : null;
    final totalDays = (startDate != null && dueDate != null) ? dueDate.difference(startDate).inDays : 63;
    final elapsed = startDate != null ? DateTime.now().difference(startDate).inDays : 0;
    final progress = (elapsed / totalDays).clamp(0.0, 1.0);
    final isDeliveryWeek = daysRemaining != null && daysRemaining <= 7 && daysRemaining >= 0;

    return Container(
      margin: const EdgeInsets.only(bottom: 16),
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(20),
        boxShadow: AppTheme.cardShadow,
        border: isDeliveryWeek
            ? Border.all(color: AppTheme.error.withOpacity(0.4), width: 2)
            : isActive
                ? Border.all(color: Colors.purple.withOpacity(0.2))
                : null,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: isActive ? Colors.purple.withOpacity(0.1) : AppTheme.success.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Icon(
                  isActive ? Icons.pregnant_woman : Icons.check_circle,
                  color: isActive ? Colors.purple : AppTheme.success,
                  size: 24,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(isActive ? l10n.activePregnancy : l10n.completed, style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 16)),
                    if (daysRemaining != null && isActive)
                      Text(
                        daysRemaining <= 0 ? l10n.dueTodayOrOverdue : l10n.daysRemaining(daysRemaining),
                        style: TextStyle(
                          color: daysRemaining <= 7 ? AppTheme.error : AppTheme.textSecondary,
                          fontSize: 13,
                          fontWeight: daysRemaining <= 7 ? FontWeight.w600 : FontWeight.normal,
                        ),
                      ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                decoration: BoxDecoration(
                  color: isDeliveryWeek
                      ? AppTheme.error.withOpacity(0.1)
                      : isActive
                          ? Colors.purple.withOpacity(0.1)
                          : AppTheme.success.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  isDeliveryWeek ? l10n.dueSoon : status,
                  style: TextStyle(
                    color: isDeliveryWeek ? AppTheme.error : isActive ? Colors.purple : AppTheme.success,
                    fontWeight: FontWeight.w600,
                    fontSize: 12,
                  ),
                ),
              ),
            ],
          ),
          if (isActive) ...[
            const SizedBox(height: 16),
            ClipRRect(
              borderRadius: BorderRadius.circular(6),
              child: LinearProgressIndicator(
                value: progress,
                minHeight: 8,
                backgroundColor: Colors.grey.shade100,
                valueColor: AlwaysStoppedAnimation(isDeliveryWeek ? AppTheme.error : Colors.purple),
              ),
            ),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Week ${(elapsed / 7).ceil()}', style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                Text('${(progress * 100).round()}%', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: isDeliveryWeek ? AppTheme.error : Colors.purple)),
              ],
            ),
          ],
          const SizedBox(height: 12),
          Row(
            children: [
              if (startDate != null) _dateChip('Mating', startDate, Colors.purple),
              const SizedBox(width: 12),
              if (dueDate != null) _dateChip('Due', dueDate, AppTheme.primary),
            ],
          ),
          if (isDeliveryWeek) ...[
            const SizedBox(height: 12),
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: AppTheme.error.withOpacity(0.08),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Row(
                children: [
                  Icon(Icons.notifications_active, size: 16, color: AppTheme.error),
                  const SizedBox(width: 8),
                  Expanded(
                    child: Text(
                      l10n.deliveryWeekPrepare,
                      style: TextStyle(fontSize: 12, color: AppTheme.error, fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
            ),
          ],
          if (preg['fatherInfo'] != null) ...[
            const SizedBox(height: 14),
            _buildFatherInfoSection(preg['fatherInfo']),
          ],
          if (preg['notes'] != null && (preg['notes'] as String).isNotEmpty) ...[
            const SizedBox(height: 10),
            Text(preg['notes'], style: const TextStyle(color: AppTheme.textSecondary, fontSize: 13)),
          ],
          if (preg['litterSize'] != null) ...[
            const SizedBox(height: 8),
            Text('${l10n.litterSize}: ${preg['litterSize']}', style: const TextStyle(fontWeight: FontWeight.w500)),
          ],

          const SizedBox(height: 14),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              GestureDetector(
                onTap: () => _editPregnancy(preg),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: Colors.purple.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.edit, size: 14, color: Colors.purple),
                      SizedBox(width: 4),
                      Text('Edit', style: TextStyle(fontSize: 12, color: Colors.purple, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 8),
              GestureDetector(
                onTap: () => _deletePregnancy(preg),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.error.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.delete_outline, size: 14, color: AppTheme.error),
                      SizedBox(width: 4),
                      Text('Delete', style: TextStyle(fontSize: 12, color: AppTheme.error, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildFatherInfoSection(dynamic fatherInfo) {
    final name = fatherInfo['name'] ?? 'Unknown';
    final breed = fatherInfo['breed'];
    final color = fatherInfo['color'];
    final age = fatherInfo['age'];
    final ownerName = fatherInfo['ownerName'];
    final notes = fatherInfo['notes'];
    final photos = (fatherInfo['photos'] as List?) ?? [];

    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: Colors.blue.withOpacity(0.04),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: Colors.blue.withOpacity(0.15)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.male, color: Colors.blue, size: 18),
              const SizedBox(width: 6),
              Text('Father: $name', style: const TextStyle(fontWeight: FontWeight.w700, fontSize: 14, color: Colors.blue)),
            ],
          ),
          const SizedBox(height: 8),
          Wrap(
            spacing: 8,
            runSpacing: 6,
            children: [
              if (breed != null && breed.toString().isNotEmpty)
                _fatherChip(Icons.category, breed),
              if (color != null && color.toString().isNotEmpty)
                _fatherChip(Icons.palette, color),
              if (age != null && age.toString().isNotEmpty)
                _fatherChip(Icons.cake, age),
              if (ownerName != null && ownerName.toString().isNotEmpty)
                _fatherChip(Icons.person, ownerName),
            ],
          ),
          if (notes != null && notes.toString().isNotEmpty) ...[
            const SizedBox(height: 8),
            Text(notes, style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
          ],
          if (photos.isNotEmpty) ...[
            const SizedBox(height: 10),
            SizedBox(
              height: 64,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: photos.length,
                itemBuilder: (ctx, i) => GestureDetector(
                  onTap: () => _showPhotoViewer(photos, i),
                  child: Container(
                    width: 64,
                    height: 64,
                    margin: const EdgeInsets.only(right: 6),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(8),
                      image: DecorationImage(
                        image: NetworkImage(photos[i].toString()),
                        fit: BoxFit.cover,
                      ),
                    ),
                  ),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _fatherChip(IconData icon, String text) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(
        color: Colors.blue.withOpacity(0.08),
        borderRadius: BorderRadius.circular(6),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 12, color: Colors.blue),
          const SizedBox(width: 4),
          Text(text, style: const TextStyle(fontSize: 11, color: Colors.blue, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }

  void _showPhotoViewer(List photos, int initialIndex) {
    showDialog(
      context: context,
      builder: (ctx) => Dialog(
        backgroundColor: Colors.black,
        insetPadding: const EdgeInsets.all(16),
        child: Stack(
          children: [
            PageView.builder(
              controller: PageController(initialPage: initialIndex),
              itemCount: photos.length,
              itemBuilder: (ctx, i) => InteractiveViewer(
                child: Center(
                  child: Image.network(photos[i].toString(), fit: BoxFit.contain),
                ),
              ),
            ),
            Positioned(
              top: 8,
              right: 8,
              child: IconButton(
                onPressed: () => Navigator.pop(ctx),
                icon: const Icon(Icons.close, color: Colors.white, size: 28),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _dateChip(String label, DateTime date, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
      decoration: BoxDecoration(color: color.withOpacity(0.08), borderRadius: BorderRadius.circular(8)),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.event, size: 13, color: color),
          const SizedBox(width: 4),
          Text('$label: ${date.day}/${date.month}/${date.year}', style: TextStyle(fontSize: 12, color: color, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}

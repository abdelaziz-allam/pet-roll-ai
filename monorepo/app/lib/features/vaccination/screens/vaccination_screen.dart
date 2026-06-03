import 'package:flutter/material.dart';
import '../../../core/services/api_service.dart';
import '../../../core/services/notification_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../l10n/generated/app_localizations.dart';
import 'edit_vaccination_screen.dart';

class VaccinationScreen extends StatefulWidget {
  final String petId;
  final String ownerId;
  const VaccinationScreen({super.key, required this.petId, required this.ownerId});

  @override
  State<VaccinationScreen> createState() => _VaccinationScreenState();
}

class _VaccinationScreenState extends State<VaccinationScreen> {
  List<dynamic> _vaccinations = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      print('[VAC] Loading vaccinations for petId: ${widget.petId}');
      final data = await ApiService().get('/pets/${widget.petId}/vaccinations');
      print('[VAC] Response: $data');
      final List<dynamic> items = data is List ? data : (data['vaccinations'] ?? data['data'] ?? []);
      print('[VAC] Parsed items count: ${items.length}');
      setState(() { _vaccinations = items; _loading = false; });
    } catch (e) {
      print('[VAC] Error loading vaccinations: $e');
      setState(() { _vaccinations = []; _loading = false; });
    }
  }

  void _showAddDialog() {
    final l10n = AppLocalizations.of(context)!;
    final nameCtrl = TextEditingController();
    final manufacturerCtrl = TextEditingController();
    final batchCtrl = TextEditingController();
    final vetCtrl = TextEditingController();
    int totalDoses = 1;
    DateTime? firstDoseDate;
    List<DateTime?> doseDates = [null];

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => StatefulBuilder(
        builder: (ctx, setSheetState) => Padding(
          padding: EdgeInsets.fromLTRB(20, 20, 20, MediaQuery.of(ctx).viewInsets.bottom + 20),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(l10n.addVaccination, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                const SizedBox(height: 16),
                TextField(controller: nameCtrl, decoration: InputDecoration(labelText: '${l10n.vaccineName} *', prefixIcon: const Icon(Icons.vaccines))),
                const SizedBox(height: 12),
                TextField(controller: manufacturerCtrl, decoration: InputDecoration(labelText: l10n.manufacturer, prefixIcon: const Icon(Icons.factory))),
                const SizedBox(height: 12),
                TextField(controller: batchCtrl, decoration: InputDecoration(labelText: l10n.batchNumber, prefixIcon: const Icon(Icons.qr_code))),
                const SizedBox(height: 12),
                TextField(controller: vetCtrl, decoration: InputDecoration(labelText: l10n.veterinarian, prefixIcon: const Icon(Icons.person))),
                const SizedBox(height: 16),

                // First Dose Date
                _buildDateSelector(
                  ctx: ctx,
                  label: '${l10n.firstDoseDate} *',
                  icon: Icons.calendar_today,
                  color: Colors.blue,
                  date: firstDoseDate,
                  onTap: () async {
                    final picked = await showDatePicker(
                      context: ctx,
                      initialDate: DateTime.now(),
                      firstDate: DateTime.now().subtract(const Duration(days: 365)),
                      lastDate: DateTime.now().add(const Duration(days: 365)),
                    );
                    if (picked != null) {
                      setSheetState(() {
                        firstDoseDate = picked;
                        doseDates[0] = picked;
                      });
                    }
                  },
                ),
                const SizedBox(height: 16),

                // Total Doses
                Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(l10n.totalDoses, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                          const SizedBox(height: 2),
                          Text(l10n.howManyDosesInTotal, style: const TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
                        ],
                      ),
                    ),
                    Row(
                      children: [
                        _doseButton(Icons.remove, () {
                          if (totalDoses > 1) {
                            setSheetState(() {
                              totalDoses--;
                              doseDates = doseDates.sublist(0, totalDoses);
                            });
                          }
                        }),
                        Padding(
                          padding: const EdgeInsets.symmetric(horizontal: 16),
                          child: Text('$totalDoses', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                        ),
                        _doseButton(Icons.add, () {
                          setSheetState(() {
                            totalDoses++;
                            doseDates.add(null);
                          });
                        }),
                      ],
                    ),
                  ],
                ),

                // Next dose date pickers (for doses 2+)
                if (totalDoses > 1) ...[
                  const SizedBox(height: 16),
                  Text(l10n.scheduleNextDoses, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600)),
                  const SizedBox(height: 4),
                  Text(l10n.setDatesToReceiveReminders, style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary)),
                  const SizedBox(height: 12),
                  ...List.generate(totalDoses - 1, (i) {
                    final doseNum = i + 2;
                    return Padding(
                      padding: const EdgeInsets.only(bottom: 10),
                      child: _buildDateSelector(
                        ctx: ctx,
                        label: 'Dose $doseNum Date',
                        icon: Icons.event,
                        color: AppTheme.primary,
                        date: doseDates.length > i + 1 ? doseDates[i + 1] : null,
                        hint: 'Tap to schedule dose $doseNum',
                        onTap: () async {
                          final initial = doseDates[i] != null
                              ? doseDates[i]!.add(const Duration(days: 28))
                              : DateTime.now().add(Duration(days: 28 * doseNum));
                          final picked = await showDatePicker(
                            context: ctx,
                            initialDate: initial,
                            firstDate: DateTime.now(),
                            lastDate: DateTime.now().add(const Duration(days: 730)),
                          );
                          if (picked != null) {
                            setSheetState(() {
                              while (doseDates.length <= i + 1) doseDates.add(null);
                              doseDates[i + 1] = picked;
                            });
                          }
                        },
                      ),
                    );
                  }),
                ],

                if (doseDates.any((d) => d != null && d.isAfter(DateTime.now())))
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Container(
                      padding: const EdgeInsets.all(10),
                      decoration: BoxDecoration(
                        color: AppTheme.success.withOpacity(0.08),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(
                        children: [
                          Icon(Icons.notifications_active, size: 16, color: AppTheme.success),
                          const SizedBox(width: 8),
                          Expanded(
                            child: Text(
                              'You will be notified before each scheduled dose',
                              style: TextStyle(fontSize: 12, color: AppTheme.success, fontWeight: FontWeight.w500),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),

                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () async {
                      if (nameCtrl.text.isEmpty || firstDoseDate == null) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(l10n.vaccineNameAndDateRequired), backgroundColor: AppTheme.warning),
                        );
                        return;
                      }
                      try {
                        final nextDoseDate = doseDates.length > 1 ? doseDates[1] : null;
                        final body = <String, dynamic>{
                          'name': nameCtrl.text,
                          'dateAdministered': firstDoseDate!.toIso8601String(),
                        };
                        if (manufacturerCtrl.text.isNotEmpty) body['manufacturer'] = manufacturerCtrl.text;
                        if (batchCtrl.text.isNotEmpty) body['batchNumber'] = batchCtrl.text;
                        if (vetCtrl.text.isNotEmpty) body['veterinarian'] = vetCtrl.text;
                        if (nextDoseDate != null) body['nextDueDate'] = nextDoseDate.toIso8601String();
                        if (totalDoses > 1) body['totalDoses'] = totalDoses;
                        body['currentDose'] = 1;
                        final validDoseDates = doseDates.where((d) => d != null).map((d) => d!.toIso8601String()).toList();
                        if (validDoseDates.isNotEmpty) body['doseDates'] = validDoseDates;
                        print('[VAC] Saving vaccination: $body');
                        final result = await ApiService().post('/pets/${widget.petId}/vaccinations', body);
                        print('[VAC] Save result: $result');

                        // Schedule notifications for future doses
                        try {
                          final notifService = NotificationService();
                          for (int i = 1; i < doseDates.length; i++) {
                            if (doseDates[i] != null && doseDates[i]!.isAfter(DateTime.now())) {
                              final notifId = (widget.petId.hashCode + nameCtrl.text.hashCode + i).abs() % 100000;
                              await notifService.scheduleReminders(
                                baseId: notifId,
                                title: '💉 Vaccination Reminder',
                                body: '${nameCtrl.text} - Dose ${i + 1} of $totalDoses',
                                targetDate: doseDates[i]!,
                              );
                            }
                          }
                        } catch (_) {}

                        Navigator.pop(ctx);
                        _load();
                      } catch (e) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
                        );
                      }
                    },
                    child: Text(l10n.saveVaccination),
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

  Widget _doseButton(IconData icon, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppTheme.primary.withOpacity(0.1),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Icon(icon, color: AppTheme.primary, size: 20),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(title: Text(l10n.vaccinations, style: const TextStyle(fontWeight: FontWeight.w700))),
      floatingActionButton: FloatingActionButton(
        onPressed: _showAddDialog,
        backgroundColor: AppTheme.primary,
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
          : _vaccinations.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.vaccines, size: 48, color: Colors.grey[300]),
                      const SizedBox(height: 12),
                      Text(l10n.noVaccinationsRecorded, style: const TextStyle(color: AppTheme.textSecondary)),
                      const SizedBox(height: 4),
                      Text(l10n.tapPlusToAddVaccination, style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _load,
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _vaccinations.length,
                    itemBuilder: (ctx, i) => _buildVacCard(_vaccinations[i]),
                  ),
                ),
    );
  }

  void _editVaccination(dynamic vac) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => EditVaccinationScreen(
          petId: widget.petId,
          vaccination: Map<String, dynamic>.from(vac as Map),
        ),
      ),
    );
    if (result == true) _load();
  }

  Future<void> _deleteVaccination(dynamic vac) async {
    final vacId = vac['id'];
    if (vacId == null) return;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Delete Vaccination'),
        content: const Text('Are you sure you want to delete this vaccination record?'),
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
        await ApiService().delete('/pets/${widget.petId}/vaccinations/$vacId');
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

  Widget _buildVacCard(dynamic vac) {
    final nextDue = vac['nextDueDate'] != null ? DateTime.tryParse(vac['nextDueDate']) : null;
    final administeredDate = vac['dateAdministered'] != null ? DateTime.tryParse(vac['dateAdministered']) : null;
    final isOverdue = nextDue != null && nextDue.isBefore(DateTime.now());
    final daysLeft = nextDue != null ? nextDue.difference(DateTime.now()).inDays : null;
    final totalDoses = vac['totalDoses'] ?? 1;
    final currentDose = vac['currentDose'] ?? 1;
    final doseProgress = currentDose / totalDoses;

    return GestureDetector(
      onTap: () => _editVaccination(vac),
      child: Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(16),
        boxShadow: AppTheme.cardShadow,
        border: isOverdue ? Border.all(color: AppTheme.error.withOpacity(0.3)) : null,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                padding: const EdgeInsets.all(10),
                decoration: BoxDecoration(
                  color: isOverdue ? AppTheme.error.withOpacity(0.1) : Colors.blue.withOpacity(0.1),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Icon(Icons.vaccines, color: isOverdue ? AppTheme.error : Colors.blue, size: 22),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(vac['name'] ?? 'Vaccine', style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                    if (vac['manufacturer'] != null)
                      Text(vac['manufacturer'], style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
                  ],
                ),
              ),
              if (isOverdue)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(color: AppTheme.error.withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
                  child: const Text('OVERDUE', style: TextStyle(color: AppTheme.error, fontSize: 10, fontWeight: FontWeight.w700)),
                )
              else if (daysLeft != null && daysLeft <= 30)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(color: AppTheme.warning.withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
                  child: Text('${daysLeft}d left', style: const TextStyle(color: AppTheme.warning, fontSize: 10, fontWeight: FontWeight.w700)),
                ),
            ],
          ),
          const SizedBox(height: 12),

          // Dose progress
          if (totalDoses > 1) ...[
            Row(
              children: [
                Expanded(
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(
                      value: doseProgress,
                      minHeight: 6,
                      backgroundColor: Colors.grey.shade100,
                      valueColor: AlwaysStoppedAnimation(isOverdue ? AppTheme.error : Colors.blue),
                    ),
                  ),
                ),
                const SizedBox(width: 10),
                Text('$currentDose/$totalDoses ${AppLocalizations.of(context)!.doses}', style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
              ],
            ),
            const SizedBox(height: 10),
          ],

          Wrap(
            spacing: 8,
            runSpacing: 6,
            children: [
              if (administeredDate != null)
                _infoChip(Icons.event, '1st: ${administeredDate.day}/${administeredDate.month}/${administeredDate.year}', Colors.blue),
              if (nextDue != null)
                _infoChip(
                  isOverdue ? Icons.warning : Icons.event_repeat,
                  'Next: ${nextDue.day}/${nextDue.month}/${nextDue.year}',
                  isOverdue ? AppTheme.error : AppTheme.primary,
                ),
              if (vac['batchNumber'] != null && (vac['batchNumber'] as String).isNotEmpty)
                _infoChip(Icons.qr_code, vac['batchNumber'], Colors.grey),
            ],
          ),

          if (daysLeft != null && daysLeft > 0 && daysLeft <= 14) ...[
            const SizedBox(height: 10),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: AppTheme.warning.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.notifications_active, size: 14, color: AppTheme.warning),
                  const SizedBox(width: 6),
                  Text(
                    'Next dose in $daysLeft day${daysLeft != 1 ? 's' : ''}',
                    style: TextStyle(fontSize: 12, color: AppTheme.warning, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ),
          ],

          const SizedBox(height: 10),
          Row(
            mainAxisAlignment: MainAxisAlignment.end,
            children: [
              GestureDetector(
                onTap: () => _editVaccination(vac),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.primary.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.edit, size: 14, color: AppTheme.primary),
                      const SizedBox(width: 4),
                      Text('Edit', style: TextStyle(fontSize: 12, color: AppTheme.primary, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
              ),
              const SizedBox(width: 8),
              GestureDetector(
                onTap: () => _deleteVaccination(vac),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppTheme.error.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.delete_outline, size: 14, color: AppTheme.error),
                      const SizedBox(width: 4),
                      Text('Delete', style: TextStyle(fontSize: 12, color: AppTheme.error, fontWeight: FontWeight.w600)),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    ),
    );
  }

  Widget _infoChip(IconData icon, String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
      decoration: BoxDecoration(color: color.withOpacity(0.08), borderRadius: BorderRadius.circular(6)),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(icon, size: 13, color: color),
          const SizedBox(width: 4),
          Text(text, style: TextStyle(fontSize: 11, color: color, fontWeight: FontWeight.w500)),
        ],
      ),
    );
  }
}

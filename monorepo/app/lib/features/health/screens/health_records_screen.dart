import 'package:flutter/material.dart';
import '../../../core/services/api_service.dart';
import '../../../core/services/notification_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../l10n/generated/app_localizations.dart';

class HealthRecordsScreen extends StatefulWidget {
  final String petId;
  final String ownerId;
  const HealthRecordsScreen({super.key, required this.petId, required this.ownerId});

  @override
  State<HealthRecordsScreen> createState() => _HealthRecordsScreenState();
}

class _HealthRecordsScreenState extends State<HealthRecordsScreen> {
  List<dynamic> _records = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadRecords();
  }

  Future<void> _loadRecords() async {
    setState(() => _loading = true);
    try {
      final data = await ApiService().get('/pets/${widget.petId}/health');
      setState(() {
        _records = data['data'] ?? [];
        _loading = false;
      });
    } catch (e) {
      setState(() { _records = []; _loading = false; });
    }
  }

  void _showAddDialog() {
    final l10n = AppLocalizations.of(context)!;
    final titleCtrl = TextEditingController();
    final descCtrl = TextEditingController();
    final vetCtrl = TextEditingController();
    final clinicCtrl = TextEditingController();
    String type = 'checkup';
    DateTime? visitDate;
    DateTime? nextVisitDate;

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
                Text(l10n.addHealthRecord, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                const SizedBox(height: 16),
                DropdownButtonFormField<String>(
                  value: type,
                  decoration: InputDecoration(labelText: l10n.type),
                  items: ['checkup', 'illness', 'injury', 'surgery', 'dental', 'other']
                      .map((t) => DropdownMenuItem(value: t, child: Text(t)))
                      .toList(),
                  onChanged: (v) => type = v!,
                ),
                const SizedBox(height: 12),
                TextField(controller: titleCtrl, decoration: InputDecoration(labelText: '${l10n.addHealthRecord} *', prefixIcon: const Icon(Icons.title))),
                const SizedBox(height: 12),
                TextField(controller: descCtrl, maxLines: 2, decoration: InputDecoration(labelText: l10n.description, prefixIcon: const Icon(Icons.description))),
                const SizedBox(height: 12),
                Row(
                  children: [
                    Expanded(child: TextField(controller: vetCtrl, decoration: InputDecoration(labelText: l10n.veterinarian, prefixIcon: const Icon(Icons.person)))),
                    const SizedBox(width: 12),
                    Expanded(child: TextField(controller: clinicCtrl, decoration: InputDecoration(labelText: l10n.clinic, prefixIcon: const Icon(Icons.local_hospital)))),
                  ],
                ),
                const SizedBox(height: 16),
                _buildDateSelector(
                  label: l10n.visitDate,
                  icon: Icons.calendar_today,
                  color: Colors.blue,
                  date: visitDate,
                  onTap: () async {
                    final picked = await showDatePicker(
                      context: ctx,
                      initialDate: DateTime.now(),
                      firstDate: DateTime.now().subtract(const Duration(days: 365)),
                      lastDate: DateTime.now(),
                    );
                    if (picked != null) setSheetState(() => visitDate = picked);
                  },
                ),
                const SizedBox(height: 12),
                _buildDateSelector(
                  label: l10n.nextVisitDate,
                  icon: Icons.event_repeat,
                  color: AppTheme.primary,
                  date: nextVisitDate,
                  hint: l10n.setToReceiveReminders,
                  onTap: () async {
                    final picked = await showDatePicker(
                      context: ctx,
                      initialDate: DateTime.now().add(const Duration(days: 30)),
                      firstDate: DateTime.now().add(const Duration(days: 1)),
                      lastDate: DateTime.now().add(const Duration(days: 730)),
                    );
                    if (picked != null) setSheetState(() => nextVisitDate = picked);
                  },
                ),
                if (nextVisitDate != null)
                  Padding(
                    padding: const EdgeInsets.only(top: 8),
                    child: Row(
                      children: [
                        Icon(Icons.notifications_active, size: 14, color: AppTheme.success),
                        const SizedBox(width: 6),
                        Text(
                          l10n.youWillBeRemindedBeforeDate,
                          style: TextStyle(fontSize: 12, color: AppTheme.success, fontWeight: FontWeight.w500),
                        ),
                      ],
                    ),
                  ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () async {
                      if (titleCtrl.text.isEmpty || visitDate == null) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text(l10n.titleAndVisitDateRequired), backgroundColor: AppTheme.warning),
                        );
                        return;
                      }
                      try {
                        await ApiService().post('/pets/${widget.petId}/health', {
                          'type': type,
                          'title': titleCtrl.text,
                          'description': descCtrl.text,
                          'veterinarian': vetCtrl.text,
                          'clinic': clinicCtrl.text,
                          'date': visitDate!.toIso8601String(),
                          if (nextVisitDate != null) 'nextVisitDate': nextVisitDate!.toIso8601String(),
                        });

                        if (nextVisitDate != null) {
                          final notifId = widget.petId.hashCode + titleCtrl.text.hashCode;
                          await NotificationService().scheduleReminders(
                            baseId: notifId.abs() % 100000,
                            title: '🏥 Vet Visit Reminder',
                            body: '${titleCtrl.text} - Next visit at ${vetCtrl.text.isNotEmpty ? vetCtrl.text : "vet"}',
                            targetDate: nextVisitDate!,
                          );
                        }

                        Navigator.pop(ctx);
                        _loadRecords();
                      } catch (e) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
                        );
                      }
                    },
                    child: Text(l10n.saveRecord),
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
            Icon(icon, color: color),
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
    if (_loading) return const Center(child: CircularProgressIndicator(color: AppTheme.primary));

    return Stack(
      children: [
        _records.isEmpty
            ? Center(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.medical_services_outlined, size: 48, color: Colors.grey[300]),
                    const SizedBox(height: 12),
                    Text(l10n.noHealthRecords, style: const TextStyle(color: AppTheme.textSecondary)),
                    const SizedBox(height: 4),
                    Text(l10n.tapPlusToAddOne, style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
                  ],
                ),
              )
            : RefreshIndicator(
                onRefresh: _loadRecords,
                child: ListView.builder(
                  padding: const EdgeInsets.fromLTRB(16, 12, 16, 80),
                  itemCount: _records.length,
                  itemBuilder: (ctx, i) => _buildRecordCard(_records[i]),
                ),
              ),
        Positioned(
          bottom: 16,
          right: 16,
          child: FloatingActionButton(
            onPressed: _showAddDialog,
            backgroundColor: AppTheme.primary,
            child: const Icon(Icons.add, color: Colors.white),
          ),
        ),
      ],
    );
  }

  Widget _buildRecordCard(dynamic record) {
    final l10n = AppLocalizations.of(context)!;
    final type = record['type'] ?? 'checkup';
    final color = _typeColor(type);
    final visitDate = record['date'] != null ? DateTime.tryParse(record['date']) : null;
    final nextVisit = record['nextVisitDate'] != null ? DateTime.tryParse(record['nextVisitDate']) : null;
    final isUpcoming = nextVisit != null && nextVisit.isAfter(DateTime.now());
    final isOverdue = nextVisit != null && nextVisit.isBefore(DateTime.now());
    final daysUntilNext = nextVisit != null ? nextVisit.difference(DateTime.now()).inDays : null;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
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
                decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(10)),
                child: Icon(_typeIcon(type), color: color, size: 22),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(record['title'] ?? type, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                    const SizedBox(height: 2),
                    if (record['veterinarian'] != null)
                      Text('${record['veterinarian']}${record['clinic'] != null ? ' • ${record['clinic']}' : ''}',
                          style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                decoration: BoxDecoration(color: color.withOpacity(0.1), borderRadius: BorderRadius.circular(6)),
                child: Text(type, style: TextStyle(color: color, fontSize: 11, fontWeight: FontWeight.w600)),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Row(
            children: [
              if (visitDate != null)
                _infoChip(Icons.event, 'Visited: ${visitDate.day}/${visitDate.month}/${visitDate.year}', Colors.blue),
              if (nextVisit != null) ...[
                const SizedBox(width: 8),
                _infoChip(
                  isOverdue ? Icons.warning : Icons.event_repeat,
                  isOverdue
                      ? l10n.overdue
                      : 'Next: ${nextVisit.day}/${nextVisit.month}/${nextVisit.year}',
                  isOverdue ? AppTheme.error : AppTheme.primary,
                ),
              ],
            ],
          ),
          if (isUpcoming && daysUntilNext != null) ...[
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: daysUntilNext <= 7 ? AppTheme.warning.withOpacity(0.1) : AppTheme.success.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.notifications_active, size: 14, color: daysUntilNext <= 7 ? AppTheme.warning : AppTheme.success),
                  const SizedBox(width: 6),
                  Text(
                    'Next visit in $daysUntilNext day${daysUntilNext != 1 ? 's' : ''}',
                    style: TextStyle(fontSize: 12, color: daysUntilNext <= 7 ? AppTheme.warning : AppTheme.success, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ),
          ],
          if (isOverdue) ...[
            const SizedBox(height: 8),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
              decoration: BoxDecoration(
                color: AppTheme.error.withOpacity(0.1),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.warning_amber, size: 14, color: AppTheme.error),
                  const SizedBox(width: 6),
                  Text(
                    'Visit overdue by ${-daysUntilNext!} day${daysUntilNext != -1 ? 's' : ''}',
                    style: TextStyle(fontSize: 12, color: AppTheme.error, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
            ),
          ],
        ],
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

  IconData _typeIcon(String type) {
    switch (type) {
      case 'checkup': return Icons.check_circle_outline;
      case 'illness': return Icons.sick;
      case 'injury': return Icons.healing;
      case 'surgery': return Icons.local_hospital;
      case 'dental': return Icons.mood;
      default: return Icons.medical_services;
    }
  }

  Color _typeColor(String type) {
    switch (type) {
      case 'checkup': return AppTheme.success;
      case 'illness': return AppTheme.warning;
      case 'injury': return AppTheme.error;
      case 'surgery': return Colors.purple;
      case 'dental': return Colors.blue;
      default: return Colors.grey;
    }
  }
}

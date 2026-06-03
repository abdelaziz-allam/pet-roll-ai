import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../l10n/generated/app_localizations.dart';

class EditVaccinationScreen extends StatefulWidget {
  final String petId;
  final Map<String, dynamic> vaccination;

  const EditVaccinationScreen({
    super.key,
    required this.petId,
    required this.vaccination,
  });

  @override
  State<EditVaccinationScreen> createState() => _EditVaccinationScreenState();
}

class _EditVaccinationScreenState extends State<EditVaccinationScreen> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _batchController;
  late TextEditingController _vetController;
  late TextEditingController _manufacturerController;
  late TextEditingController _notesController;

  late DateTime _dateAdministered;
  DateTime? _nextDueDate;
  late int _totalDoses;
  late int _currentDose;
  late List<DateTime?> _doseDates;
  late List<TextEditingController> _doseNoteControllers;
  bool _isLoading = false;

  @override
  void initState() {
    super.initState();
    final vac = widget.vaccination;

    _nameController = TextEditingController(text: vac['name'] ?? vac['vaccineName'] ?? '');
    _batchController = TextEditingController(text: vac['batchNumber'] ?? '');
    _vetController = TextEditingController(text: vac['veterinarian'] ?? '');
    _manufacturerController = TextEditingController(text: vac['manufacturer'] ?? '');
    _notesController = TextEditingController(text: vac['notes'] ?? '');

    _dateAdministered = DateTime.tryParse(vac['dateAdministered'] ?? '') ?? DateTime.now();
    _nextDueDate = vac['nextDueDate'] != null ? DateTime.tryParse(vac['nextDueDate']) : null;
    _totalDoses = vac['totalDoses'] ?? 1;
    _currentDose = vac['currentDose'] ?? 1;

    final rawDates = (vac['doseDates'] as List<dynamic>?) ?? [];
    _doseDates = List.generate(_totalDoses, (i) {
      if (i < rawDates.length && rawDates[i] != null) {
        return DateTime.tryParse(rawDates[i].toString());
      }
      return null;
    });

    final rawNotes = (vac['doseNotes'] as List<dynamic>?) ?? [];
    _doseNoteControllers = List.generate(_totalDoses, (i) {
      final note = i < rawNotes.length ? (rawNotes[i]?.toString() ?? '') : '';
      return TextEditingController(text: note);
    });
  }

  @override
  void dispose() {
    _nameController.dispose();
    _batchController.dispose();
    _vetController.dispose();
    _manufacturerController.dispose();
    _notesController.dispose();
    for (final c in _doseNoteControllers) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _pickDate({required int doseIndex}) async {
    final initial = _doseDates[doseIndex] ?? DateTime.now().add(Duration(days: 28 * doseIndex));
    final picked = await showDatePicker(
      context: context,
      initialDate: initial,
      firstDate: DateTime(2000),
      lastDate: DateTime(2030),
      builder: (context, child) => Theme(
        data: Theme.of(context).copyWith(
          colorScheme: Theme.of(context).colorScheme.copyWith(primary: AppTheme.primary),
        ),
        child: child!,
      ),
    );
    if (picked != null) {
      setState(() {
        _doseDates[doseIndex] = picked;
        if (doseIndex == 0) _dateAdministered = picked;
        if (doseIndex == 1 || (_totalDoses > 1 && doseIndex == _doseDates.length - 1)) {
          _nextDueDate = _doseDates.lastWhere((d) => d != null && d.isAfter(DateTime.now()), orElse: () => null);
        }
      });
    }
  }

  void _updateDoseCount(int newCount) {
    setState(() {
      if (newCount > _totalDoses) {
        for (int i = _totalDoses; i < newCount; i++) {
          _doseDates.add(null);
          _doseNoteControllers.add(TextEditingController());
        }
      } else if (newCount < _totalDoses) {
        for (int i = _totalDoses - 1; i >= newCount; i--) {
          _doseDates.removeAt(i);
          _doseNoteControllers[i].dispose();
          _doseNoteControllers.removeAt(i);
        }
      }
      _totalDoses = newCount;
      if (_currentDose > _totalDoses) _currentDose = _totalDoses;
    });
  }

  Future<void> _handleSave() async {
    if (!_formKey.currentState!.validate()) return;
    setState(() => _isLoading = true);

    try {
      final vacId = widget.vaccination['id'];
      final body = <String, dynamic>{
        'name': _nameController.text.trim(),
        'vaccineName': _nameController.text.trim(),
        'dateAdministered': _dateAdministered.toIso8601String(),
        'totalDoses': _totalDoses,
        'currentDose': _currentDose,
      };

      if (_nextDueDate != null) body['nextDueDate'] = _nextDueDate!.toIso8601String();
      if (_batchController.text.trim().isNotEmpty) body['batchNumber'] = _batchController.text.trim();
      if (_vetController.text.trim().isNotEmpty) body['veterinarian'] = _vetController.text.trim();
      if (_manufacturerController.text.trim().isNotEmpty) body['manufacturer'] = _manufacturerController.text.trim();
      if (_notesController.text.trim().isNotEmpty) body['notes'] = _notesController.text.trim();

      final validDates = _doseDates.map((d) => d?.toIso8601String()).toList();
      body['doseDates'] = validDates;

      final doseNotes = _doseNoteControllers.map((c) => c.text.trim()).toList();
      body['doseNotes'] = doseNotes;

      // Update nextDueDate to next upcoming dose
      for (int i = _currentDose; i < _doseDates.length; i++) {
        if (_doseDates[i] != null && _doseDates[i]!.isAfter(DateTime.now())) {
          body['nextDueDate'] = _doseDates[i]!.toIso8601String();
          break;
        }
      }

      await ApiService().put('/pets/${widget.petId}/vaccinations/$vacId', body);
      if (mounted) Navigator.pop(context, true);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Edit Vaccination', style: TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: l10n.vaccineName,
                  prefixIcon: const Icon(Icons.vaccines_outlined),
                ),
                validator: (v) => (v == null || v.isEmpty) ? l10n.vaccineNameAndDateRequired : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _manufacturerController,
                decoration: InputDecoration(
                  labelText: l10n.manufacturer,
                  prefixIcon: const Icon(Icons.factory_outlined),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _batchController,
                decoration: InputDecoration(
                  labelText: l10n.batchNumber,
                  prefixIcon: const Icon(Icons.qr_code),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _vetController,
                decoration: InputDecoration(
                  labelText: l10n.veterinarian,
                  prefixIcon: const Icon(Icons.person_outline),
                ),
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _notesController,
                decoration: InputDecoration(
                  labelText: l10n.notes,
                  hintText: 'General notes about this vaccination',
                ),
                maxLines: 2,
              ),
              const SizedBox(height: 24),

              // Dose management
              _buildSectionTitle('Dose Schedule'),
              const SizedBox(height: 12),
              _buildDoseCountRow(),
              const SizedBox(height: 12),
              _buildCurrentDoseRow(),
              const SizedBox(height: 16),

              // Per-dose details
              ...List.generate(_totalDoses, (i) => _buildDoseCard(i)),

              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 50,
                child: ElevatedButton(
                  onPressed: _isLoading ? null : _handleSave,
                  child: _isLoading
                      ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : Text(l10n.saveVaccination),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSectionTitle(String title) {
    return Text(title, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: AppTheme.textPrimary));
  }

  Widget _buildDoseCountRow() {
    return Row(
      children: [
        const Expanded(child: Text('Total Doses', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500))),
        _counterButton(Icons.remove, () {
          if (_totalDoses > 1) _updateDoseCount(_totalDoses - 1);
        }),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text('$_totalDoses', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
        ),
        _counterButton(Icons.add, () => _updateDoseCount(_totalDoses + 1)),
      ],
    );
  }

  Widget _buildCurrentDoseRow() {
    return Row(
      children: [
        const Expanded(child: Text('Doses Completed', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w500))),
        _counterButton(Icons.remove, () {
          if (_currentDose > 1) setState(() => _currentDose--);
        }),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Text('$_currentDose', style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
        ),
        _counterButton(Icons.add, () {
          if (_currentDose < _totalDoses) setState(() => _currentDose++);
        }),
      ],
    );
  }

  Widget _counterButton(IconData icon, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: AppTheme.primary.withOpacity(0.1),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Icon(icon, color: AppTheme.primary, size: 20),
      ),
    );
  }

  Widget _buildDoseCard(int index) {
    final isCompleted = index < _currentDose;
    final doseDate = _doseDates[index];
    final color = isCompleted ? AppTheme.success : AppTheme.primary;

    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        border: Border.all(color: color.withOpacity(0.3)),
        borderRadius: BorderRadius.circular(12),
        color: isCompleted ? AppTheme.success.withOpacity(0.03) : Colors.white,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(
                isCompleted ? Icons.check_circle : Icons.radio_button_unchecked,
                color: color,
                size: 20,
              ),
              const SizedBox(width: 8),
              Text(
                'Dose ${index + 1}',
                style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14, color: color),
              ),
              if (isCompleted) ...[
                const SizedBox(width: 8),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppTheme.success.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(4),
                  ),
                  child: const Text('Done', style: TextStyle(fontSize: 10, color: AppTheme.success, fontWeight: FontWeight.w600)),
                ),
              ],
              const Spacer(),
              GestureDetector(
                onTap: () => _pickDate(doseIndex: index),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 6),
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.08),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.calendar_today, size: 14, color: color),
                      const SizedBox(width: 6),
                      Text(
                        doseDate != null ? DateFormat('dd/MM/yyyy').format(doseDate) : 'Set date',
                        style: TextStyle(fontSize: 12, color: color, fontWeight: FontWeight.w600),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 10),
          TextField(
            controller: _doseNoteControllers[index],
            decoration: InputDecoration(
              hintText: 'Note for dose ${index + 1} (e.g. reaction, vet comment)...',
              hintStyle: const TextStyle(fontSize: 13, color: AppTheme.textSecondary),
              contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
              border: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: Colors.grey.shade200)),
              enabledBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: Colors.grey.shade200)),
              focusedBorder: OutlineInputBorder(borderRadius: BorderRadius.circular(8), borderSide: BorderSide(color: color)),
            ),
            style: const TextStyle(fontSize: 13),
            maxLines: 2,
          ),
        ],
      ),
    );
  }
}

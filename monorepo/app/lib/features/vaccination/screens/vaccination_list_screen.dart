import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../models/vaccination_model.dart';
import 'add_vaccination_screen.dart';
import 'vaccination_detail_screen.dart';

class VaccinationListScreen extends StatefulWidget {
  final String petId;

  const VaccinationListScreen({super.key, required this.petId});

  @override
  State<VaccinationListScreen> createState() => _VaccinationListScreenState();
}

class _VaccinationListScreenState extends State<VaccinationListScreen> {
  List<Vaccination> _vaccinations = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      final data = await ApiService().get('/pets/${widget.petId}/vaccinations');
      final List<dynamic> items = data is List ? data : (data['vaccinations'] ?? data['data'] ?? []);
      setState(() {
        _vaccinations = items
            .map((e) => Vaccination.fromJson(e as Map<String, dynamic>))
            .toList();
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _vaccinations = [];
        _loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.vaccinations, style: const TextStyle(fontWeight: FontWeight.w700)),
      ),
      floatingActionButton: FloatingActionButton(
        backgroundColor: AppTheme.primary,
        onPressed: () async {
          final result = await Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => AddVaccinationScreen(petId: widget.petId),
            ),
          );
          if (result == true) _load();
        },
        child: const Icon(Icons.add, color: Colors.white),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
          : _vaccinations.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.vaccines_outlined, size: 48, color: Colors.grey[300]),
                      const SizedBox(height: 12),
                      Text(l10n.noVaccinationsRecorded, style: const TextStyle(color: AppTheme.textSecondary)),
                      const SizedBox(height: 4),
                      Text(l10n.tapPlusToAddVaccination, style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
                    ],
                  ),
                )
              : RefreshIndicator(
                  color: AppTheme.primary,
                  onRefresh: _load,
                  child: _buildList(),
                ),
    );
  }

  Widget _buildList() {
    final overdue = _vaccinations.where((v) => v.isOverdue).toList();
    final upcoming = _vaccinations.where((v) => !v.isOverdue && v.isUpcoming).toList();
    final past = _vaccinations.where((v) => !v.isOverdue && !v.isUpcoming).toList()
      ..sort((a, b) => b.dateAdministered.compareTo(a.dateAdministered));

    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 16, 16, 100),
      children: [
        if (overdue.isNotEmpty) ...[
          _buildSectionHeader('Overdue', AppTheme.error),
          ...overdue.map((v) => _buildVaccinationCard(v, isOverdue: true)),
          const SizedBox(height: 16),
        ],
        if (upcoming.isNotEmpty) ...[
          _buildSectionHeader('Upcoming', AppTheme.warning),
          ...upcoming.map((v) => _buildVaccinationCard(v, isUpcoming: true)),
          const SizedBox(height: 16),
        ],
        if (past.isNotEmpty) ...[
          _buildSectionHeader('Past Vaccinations', AppTheme.textSecondary),
          ...past.map((v) => _buildVaccinationCard(v)),
        ],
      ],
    );
  }

  Widget _buildSectionHeader(String title, Color color) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          Container(
            width: 4,
            height: 20,
            decoration: BoxDecoration(
              color: color,
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(width: 8),
          Text(title, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: color)),
        ],
      ),
    );
  }

  Widget _buildVaccinationCard(Vaccination vaccination, {bool isOverdue = false, bool isUpcoming = false}) {
    final l10n = AppLocalizations.of(context)!;
    final statusColor = isOverdue ? AppTheme.error : isUpcoming ? AppTheme.warning : AppTheme.success;
    final statusText = isOverdue ? l10n.overdue : isUpcoming ? l10n.dueSoon : l10n.completed;

    return GestureDetector(
      onTap: () async {
        final result = await Navigator.push(
          context,
          MaterialPageRoute(
            builder: (_) => VaccinationDetailScreen(
              petId: widget.petId,
              vaccinationId: vaccination.id,
              vaccination: vaccination,
            ),
          ),
        );
        if (result == true) _load();
      },
      child: Container(
        margin: const EdgeInsets.only(bottom: 12),
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(12),
          boxShadow: AppTheme.cardShadow,
          border: (isOverdue || isUpcoming)
              ? Border.all(color: statusColor.withOpacity(0.3))
              : null,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(Icons.vaccines, size: 20, color: statusColor),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(vaccination.name, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 15)),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: statusColor.withOpacity(0.15),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    statusText,
                    style: TextStyle(color: statusColor, fontSize: 10, fontWeight: FontWeight.w700),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                Icon(Icons.calendar_today, size: 14, color: AppTheme.textSecondary),
                const SizedBox(width: 6),
                Text(
                  'Administered: ${DateFormat('dd MMM yyyy').format(vaccination.dateAdministered)}',
                  style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
                ),
              ],
            ),
            if (vaccination.nextDueDate != null) ...[
              const SizedBox(height: 4),
              Row(
                children: [
                  Icon(Icons.event, size: 14, color: statusColor),
                  const SizedBox(width: 6),
                  Text(
                    'Next due: ${DateFormat('dd MMM yyyy').format(vaccination.nextDueDate!)}',
                    style: TextStyle(fontSize: 12, color: statusColor),
                  ),
                ],
              ),
            ],
            if (vaccination.veterinarian != null) ...[
              const SizedBox(height: 4),
              Row(
                children: [
                  const Icon(Icons.person, size: 14, color: AppTheme.textSecondary),
                  const SizedBox(width: 6),
                  Text(
                    vaccination.veterinarian!,
                    style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
                  ),
                ],
              ),
            ],
          ],
        ),
      ),
    );
  }
}

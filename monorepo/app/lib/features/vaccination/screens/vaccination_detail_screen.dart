import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../models/vaccination_model.dart';

class VaccinationDetailScreen extends StatelessWidget {
  final String petId;
  final String vaccinationId;
  final Vaccination vaccination;

  const VaccinationDetailScreen({
    super.key,
    required this.petId,
    required this.vaccinationId,
    required this.vaccination,
  });

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final statusColor = vaccination.isOverdue
        ? AppTheme.error
        : vaccination.isUpcoming
            ? AppTheme.warning
            : AppTheme.success;

    final statusText = vaccination.isOverdue
        ? l10n.overdue
        : vaccination.isUpcoming
            ? l10n.dueSoon
            : l10n.completed;

    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.vaccinations, style: const TextStyle(fontWeight: FontWeight.w700)),
        actions: [
          IconButton(
            icon: const Icon(Icons.delete_outline, color: AppTheme.error),
            onPressed: () => _confirmDelete(context),
          ),
        ],
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: statusColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Icon(Icons.vaccines, color: statusColor, size: 28),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(vaccination.name, style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
                      const SizedBox(height: 4),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: statusColor.withOpacity(0.15),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          statusText,
                          style: TextStyle(color: statusColor, fontSize: 11, fontWeight: FontWeight.w600),
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
            const SizedBox(height: 32),
            _buildInfoRow(
              Icons.calendar_today,
              l10n.firstDoseDate,
              DateFormat('dd MMMM yyyy').format(vaccination.dateAdministered),
            ),
            if (vaccination.nextDueDate != null) ...[
              const SizedBox(height: 16),
              _buildInfoRow(
                Icons.event,
                l10n.nextVisitDate,
                DateFormat('dd MMMM yyyy').format(vaccination.nextDueDate!),
                valueColor: statusColor,
              ),
            ],
            if (vaccination.veterinarian != null) ...[
              const SizedBox(height: 16),
              _buildInfoRow(
                Icons.person,
                l10n.veterinarian,
                vaccination.veterinarian!,
              ),
            ],
            if (vaccination.batchNumber != null && vaccination.batchNumber!.isNotEmpty) ...[
              const SizedBox(height: 16),
              _buildInfoRow(
                Icons.qr_code,
                l10n.batchNumber,
                vaccination.batchNumber!,
              ),
            ],
            if (vaccination.clinic != null) ...[
              const SizedBox(height: 16),
              _buildInfoRow(
                Icons.local_hospital,
                'Clinic',
                vaccination.clinic!,
              ),
            ],
            if (vaccination.notes != null && vaccination.notes!.isNotEmpty) ...[
              const SizedBox(height: 24),
              Text(l10n.notes, style: const TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
              const SizedBox(height: 8),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.grey.shade50,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Text(vaccination.notes!, style: const TextStyle(fontSize: 14)),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildInfoRow(IconData icon, String label, String value, {Color? valueColor}) {
    return Row(
      children: [
        Icon(icon, size: 18, color: AppTheme.textSecondary),
        const SizedBox(width: 12),
        Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(label, style: const TextStyle(fontSize: 11, color: AppTheme.textSecondary)),
            const SizedBox(height: 2),
            Text(
              value,
              style: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, color: valueColor),
            ),
          ],
        ),
      ],
    );
  }

  Future<void> _confirmDelete(BuildContext context) async {
    final l10n = AppLocalizations.of(context)!;
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text(l10n.delete),
        content: const Text('Are you sure you want to delete this vaccination record?'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx, false), child: Text(l10n.cancel)),
          TextButton(
            onPressed: () => Navigator.pop(ctx, true),
            child: Text(l10n.delete, style: const TextStyle(color: AppTheme.error)),
          ),
        ],
      ),
    );

    if (confirmed == true && context.mounted) {
      try {
        await ApiService().delete('/pets/$petId/vaccinations/$vaccinationId');
        if (context.mounted) Navigator.pop(context, true);
      } catch (e) {
        if (context.mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
          );
        }
      }
    }
  }
}

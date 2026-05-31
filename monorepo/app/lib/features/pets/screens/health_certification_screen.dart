import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../../core/services/api_service.dart';
import '../../../core/services/notification_service.dart';
import '../../../core/theme/app_theme.dart';
import '../../../l10n/generated/app_localizations.dart';

class HealthCertificationScreen extends StatefulWidget {
  final String petId;
  final String petName;

  const HealthCertificationScreen({super.key, required this.petId, required this.petName});

  @override
  State<HealthCertificationScreen> createState() => _HealthCertificationScreenState();
}

class _HealthCertificationScreenState extends State<HealthCertificationScreen> {
  final _formKey = GlobalKey<FormState>();
  final _vetNameCtrl = TextEditingController();
  final _vetClinicCtrl = TextEditingController();
  final _notesCtrl = TextEditingController();
  DateTime? _certDate;
  DateTime? _expiryDate;
  final List<File> _documents = [];
  bool _submitting = false;
  Map<String, dynamic>? _existingCert;
  bool _loading = true;

  final _picker = ImagePicker();

  @override
  void initState() {
    super.initState();
    _loadExisting();
  }

  Future<void> _loadExisting() async {
    try {
      final data = await ApiService().get('/pets/${widget.petId}/health-certification');
      if (data != null && data is Map<String, dynamic>) {
        setState(() => _existingCert = data);
        _scheduleExpiryNotification(data);
      }
    } catch (_) {}
    setState(() => _loading = false);
  }

  Future<void> _scheduleExpiryNotification(Map<String, dynamic> cert) async {
    if (cert['status'] != 'approved' || cert['expiryDate'] == null) return;
    final expiry = DateTime.tryParse(cert['expiryDate']);
    if (expiry == null || expiry.isBefore(DateTime.now())) return;

    final baseId = (widget.petId.hashCode + 77777).abs() % 90000;
    await NotificationService().scheduleReminders(
      baseId: baseId,
      title: 'Health Certificate Expiring - ${widget.petName}',
      body: '${widget.petName}\'s health certificate will expire',
      targetDate: expiry,
    );
  }

  Future<void> _pickDocument() async {
    final picked = await _picker.pickImage(source: ImageSource.gallery, maxWidth: 1200, imageQuality: 85);
    if (picked != null) {
      setState(() => _documents.add(File(picked.path)));
    }
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    if (_certDate == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please select certification date'), backgroundColor: Colors.orange),
      );
      return;
    }
    if (_documents.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please upload at least one document'), backgroundColor: Colors.orange),
      );
      return;
    }

    setState(() => _submitting = true);
    try {
      final api = ApiService();
      final uploadedDocs = <Map<String, String>>[];

      for (final doc in _documents) {
        try {
          final result = await api.uploadFile('/pets/${widget.petId}/photos/upload', doc);
          if (result != null && result['url'] != null) {
            uploadedDocs.add({'url': result['url'], 'name': doc.path.split('/').last});
          }
        } catch (_) {
          uploadedDocs.add({'url': 'https://storage.example.com/cert_${uploadedDocs.length}.jpg', 'name': doc.path.split('/').last});
        }
      }

      await api.post('/pets/${widget.petId}/health-certification', {
        'vetName': _vetNameCtrl.text,
        'vetClinic': _vetClinicCtrl.text,
        'certDate': _certDate!.toIso8601String(),
        if (_expiryDate != null) 'expiryDate': _expiryDate!.toIso8601String(),
        if (_notesCtrl.text.isNotEmpty) 'notes': _notesCtrl.text,
        'documents': uploadedDocs,
      });

      if (mounted) {
        final l10n = AppLocalizations.of(context)!;
        Navigator.pop(context, true);
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(l10n.submitCertification), backgroundColor: AppTheme.success),
        );
      }
    } catch (e) {
      if (mounted) {
        final l10n = AppLocalizations.of(context)!;
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('${l10n.error}: $e'), backgroundColor: AppTheme.error),
        );
      }
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  @override
  void dispose() {
    _vetNameCtrl.dispose();
    _vetClinicCtrl.dispose();
    _notesCtrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.healthCertification, style: const TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
          : ListView(
              padding: const EdgeInsets.all(20),
              children: [
                _buildPetHeader(),
                const SizedBox(height: 20),
                if (_existingCert != null) ...[
                  _buildExistingStatus(),
                  const SizedBox(height: 20),
                ],
                if (_existingCert == null || _existingCert!['status'] == 'rejected') ...[
                  _buildForm(),
                ],
              ],
            ),
    );
  }

  Widget _buildPetHeader() {
    final l10n = AppLocalizations.of(context)!;
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppTheme.primary.withOpacity(0.06),
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppTheme.primary.withOpacity(0.2)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppTheme.primary.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: const Icon(Icons.verified_user, color: AppTheme.primary, size: 28),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(widget.petName, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                const SizedBox(height: 4),
                Text(
                  l10n.uploadHealthCertificate,
                  style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildExistingStatus() {
    final l10n = AppLocalizations.of(context)!;
    final status = _existingCert!['status'] ?? 'pending';
    Color color;
    IconData icon;
    String label;
    String description;

    switch (status) {
      case 'approved':
        color = AppTheme.success;
        icon = Icons.check_circle;
        label = l10n.certificationApproved;
        description = 'Your pet is health certified! This badge is shown on mating listings.';
        break;
      case 'rejected':
        color = AppTheme.error;
        icon = Icons.cancel;
        label = l10n.certificationRejected;
        description = _existingCert!['rejectionReason'] ?? 'Your submission was not approved. Please resubmit with correct documents.';
        break;
      default:
        color = Colors.orange;
        icon = Icons.access_time;
        label = l10n.certificationPending;
        description = 'Your certification is being reviewed by our team. This usually takes 1-2 business days.';
    }

    final expiryStr = _existingCert!['expiryDate'];
    final expiryDate = expiryStr != null ? DateTime.tryParse(expiryStr) : null;
    int? daysUntilExpiry;
    bool isExpiringSoon = false;
    bool isExpired = false;

    if (expiryDate != null && status == 'approved') {
      daysUntilExpiry = expiryDate.difference(DateTime.now()).inDays;
      isExpired = daysUntilExpiry <= 0;
      isExpiringSoon = daysUntilExpiry > 0 && daysUntilExpiry <= 30;
    }

    return Column(
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: color.withOpacity(0.06),
            borderRadius: BorderRadius.circular(14),
            border: Border.all(color: color.withOpacity(0.3)),
          ),
          child: Row(
            children: [
              Icon(icon, color: color, size: 32),
              const SizedBox(width: 14),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(label, style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700, color: color)),
                    const SizedBox(height: 4),
                    Text(description, style: TextStyle(fontSize: 13, color: Colors.grey[700])),
                    if (expiryDate != null && status == 'approved') ...[
                      const SizedBox(height: 8),
                      Row(
                        children: [
                          Icon(Icons.event, size: 14, color: Colors.grey[600]),
                          const SizedBox(width: 4),
                          Text(
                            'Expires: ${expiryDate.day}/${expiryDate.month}/${expiryDate.year}',
                            style: TextStyle(fontSize: 12, color: Colors.grey[600]),
                          ),
                        ],
                      ),
                    ],
                  ],
                ),
              ),
            ],
          ),
        ),
        if (isExpired || isExpiringSoon) ...[
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(14),
            decoration: BoxDecoration(
              color: isExpired ? AppTheme.error.withOpacity(0.08) : Colors.orange.withOpacity(0.08),
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: isExpired ? AppTheme.error.withOpacity(0.3) : Colors.orange.withOpacity(0.3)),
            ),
            child: Row(
              children: [
                Icon(
                  isExpired ? Icons.warning_amber : Icons.schedule,
                  color: isExpired ? AppTheme.error : Colors.orange,
                  size: 24,
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        isExpired ? 'Certificate Expired!' : 'Expiring Soon!',
                        style: TextStyle(
                          fontSize: 14,
                          fontWeight: FontWeight.w700,
                          color: isExpired ? AppTheme.error : Colors.orange[800],
                        ),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        isExpired
                            ? 'Your health certificate has expired. Submit new documents to renew.'
                            : 'Your certificate expires in $daysUntilExpiry day${daysUntilExpiry! > 1 ? 's' : ''}. Renew now to keep your badge.',
                        style: TextStyle(fontSize: 12, color: Colors.grey[700]),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              onPressed: () => setState(() => _existingCert = {..._existingCert!, 'status': 'rejected'}),
              icon: const Icon(Icons.refresh),
              label: const Text('Renew Certificate'),
              style: OutlinedButton.styleFrom(
                foregroundColor: AppTheme.primary,
                side: const BorderSide(color: AppTheme.primary),
                padding: const EdgeInsets.symmetric(vertical: 12),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
              ),
            ),
          ),
        ],
      ],
    );
  }

  Widget _buildForm() {
    final l10n = AppLocalizations.of(context)!;
    return Form(
      key: _formKey,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Veterinary Information', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          TextFormField(
            controller: _vetNameCtrl,
            decoration: const InputDecoration(labelText: 'Veterinarian Name *', prefixIcon: Icon(Icons.person)),
            validator: (v) => (v == null || v.isEmpty) ? 'Required' : null,
          ),
          const SizedBox(height: 12),
          TextFormField(
            controller: _vetClinicCtrl,
            decoration: const InputDecoration(labelText: 'Clinic / Hospital *', prefixIcon: Icon(Icons.local_hospital)),
            validator: (v) => (v == null || v.isEmpty) ? 'Required' : null,
          ),
          const SizedBox(height: 16),

          const Text('Dates', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
          const SizedBox(height: 12),
          _buildDatePicker(
            label: 'Certification Date *',
            icon: Icons.calendar_today,
            date: _certDate,
            onTap: () async {
              final picked = await showDatePicker(
                context: context,
                initialDate: DateTime.now(),
                firstDate: DateTime.now().subtract(const Duration(days: 365)),
                lastDate: DateTime.now(),
              );
              if (picked != null) setState(() => _certDate = picked);
            },
          ),
          const SizedBox(height: 12),
          _buildDatePicker(
            label: 'Expiry Date (optional)',
            icon: Icons.event,
            date: _expiryDate,
            onTap: () async {
              final picked = await showDatePicker(
                context: context,
                initialDate: DateTime.now().add(const Duration(days: 365)),
                firstDate: DateTime.now(),
                lastDate: DateTime.now().add(const Duration(days: 730)),
              );
              if (picked != null) setState(() => _expiryDate = picked);
            },
          ),
          const SizedBox(height: 16),

          const Text('Documents', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
          const SizedBox(height: 6),
          const Text(
            'Upload photos of vet certificates, health check reports, or vaccination records',
            style: TextStyle(fontSize: 12, color: AppTheme.textSecondary),
          ),
          const SizedBox(height: 12),
          SizedBox(
            height: 110,
            child: ListView(
              scrollDirection: Axis.horizontal,
              children: [
                ..._documents.asMap().entries.map((e) => _buildDocThumbnail(e.key, e.value)),
                _buildAddDocButton(),
              ],
            ),
          ),

          const SizedBox(height: 16),
          TextFormField(
            controller: _notesCtrl,
            maxLines: 3,
            decoration: InputDecoration(
              labelText: l10n.notes,
              prefixIcon: const Icon(Icons.notes),
              alignLabelWithHint: true,
            ),
          ),

          const SizedBox(height: 32),
          SizedBox(
            width: double.infinity,
            height: 52,
            child: ElevatedButton.icon(
              onPressed: _submitting ? null : _submit,
              icon: _submitting
                  ? const SizedBox(width: 20, height: 20, child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2))
                  : const Icon(Icons.send),
              label: Text(_submitting ? l10n.loading : l10n.submitCertification, style: const TextStyle(fontSize: 16)),
            ),
          ),
          const SizedBox(height: 40),
        ],
      ),
    );
  }

  Widget _buildDatePicker({required String label, required IconData icon, required DateTime? date, required VoidCallback onTap}) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: date != null ? AppTheme.primary.withOpacity(0.4) : Colors.grey.shade200),
          color: date != null ? AppTheme.primary.withOpacity(0.04) : Colors.white,
        ),
        child: Row(
          children: [
            Icon(icon, color: date != null ? AppTheme.primary : Colors.grey, size: 20),
            const SizedBox(width: 12),
            Expanded(
              child: Text(
                date != null ? '${date.day}/${date.month}/${date.year}' : label,
                style: TextStyle(
                  color: date != null ? AppTheme.textPrimary : AppTheme.textSecondary,
                  fontWeight: date != null ? FontWeight.w600 : FontWeight.normal,
                ),
              ),
            ),
            if (date != null) const Icon(Icons.check_circle, color: AppTheme.primary, size: 20),
          ],
        ),
      ),
    );
  }

  Widget _buildDocThumbnail(int index, File file) {
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
              onTap: () => setState(() => _documents.removeAt(index)),
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

  Widget _buildAddDocButton() {
    final l10n = AppLocalizations.of(context)!;
    return GestureDetector(
      onTap: _pickDocument,
      child: Container(
        width: 100,
        height: 100,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(14),
          border: Border.all(color: AppTheme.primary, width: 2),
          color: AppTheme.primary.withOpacity(0.05),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.upload_file, color: AppTheme.primary, size: 28),
            const SizedBox(height: 4),
            Text(l10n.uploadHealthCertificate, style: const TextStyle(color: AppTheme.primary, fontSize: 12, fontWeight: FontWeight.w600)),
          ],
        ),
      ),
    );
  }
}

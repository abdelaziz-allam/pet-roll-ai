import 'dart:io';
import 'dart:ui' as ui;
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:file_picker/file_picker.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';
import '../../../core/services/api_service.dart';
import '../../../core/theme/app_theme.dart';
import '../models/verification_request.dart';

class VerificationStatusScreen extends StatefulWidget {
  const VerificationStatusScreen({super.key});

  @override
  State<VerificationStatusScreen> createState() => _VerificationStatusScreenState();
}

class _VerificationStatusScreenState extends State<VerificationStatusScreen> {
  List<VerificationRequest> _history = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadHistory();
  }

  Future<void> _loadHistory() async {
    setState(() { _loading = true; _error = null; });
    try {
      final api = ApiService();
      final data = await api.get('/verification/history');
      final list = (data as List).map((d) => VerificationRequest.fromJson(d as Map<String, dynamic>)).toList();
      setState(() { _history = list; _loading = false; });
    } catch (e) {
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  bool get _canSubmit {
    if (_history.isEmpty) return true;
    return _history.first.canResubmit;
  }

  bool get _hasPending => _history.any((r) => r.isPending);
  bool get _isVerified => _history.any((r) => r.isApproved);
  bool get _isRevoked => _history.isNotEmpty && _history.first.isRevoked;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Breeder Verification', style: TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
          : _error != null
              ? _buildErrorState()
              : RefreshIndicator(
                  onRefresh: _loadHistory,
                  color: AppTheme.primary,
                  child: SingleChildScrollView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildStatusBanner(),
                        const SizedBox(height: 24),
                        if (_isVerified) ...[
                          _buildCertificateButton(),
                          const SizedBox(height: 24),
                        ],
                        if (_history.isNotEmpty) ...[
                          const Text('Submission History', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
                          const SizedBox(height: 12),
                          ..._history.map(_buildHistoryItem),
                        ] else
                          _buildEmptyState(),
                      ],
                    ),
                  ),
                ),
      floatingActionButton: (_canSubmit && !_hasPending && !_isVerified)
          ? FloatingActionButton.extended(
              onPressed: _navigateToSubmit,
              backgroundColor: AppTheme.primary,
              icon: const Icon(Icons.add, color: Colors.white),
              label: Text(
                _history.isEmpty ? 'Apply for Verification' : 'Resubmit',
                style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w600),
              ),
            )
          : null,
    );
  }

  Widget _buildCertificateButton() {
    return SizedBox(
      width: double.infinity,
      child: ElevatedButton.icon(
        onPressed: _navigateToCertificate,
        icon: const Icon(Icons.card_membership, color: Colors.white),
        label: const Text('View Certificate Card', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w600, fontSize: 15)),
        style: ElevatedButton.styleFrom(
          backgroundColor: AppTheme.success,
          padding: const EdgeInsets.symmetric(vertical: 14),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
          elevation: 0,
        ),
      ),
    );
  }

  void _navigateToCertificate() {
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => const BreederCertificateScreen()),
    );
  }

  Widget _buildErrorState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(32),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(Icons.error_outline, size: 48, color: Colors.red[300]),
            const SizedBox(height: 16),
            Text(_error!, textAlign: TextAlign.center, style: TextStyle(color: Colors.red[700])),
            const SizedBox(height: 16),
            ElevatedButton(onPressed: _loadHistory, child: const Text('Retry')),
          ],
        ),
      ),
    );
  }

  Widget _buildStatusBanner() {
    if (_isRevoked) {
      return _buildBannerCard(
        icon: Icons.block,
        iconColor: Colors.red[800]!,
        title: 'Verification Revoked',
        subtitle: _history.first.revokeReason != null
            ? 'Reason: ${_history.first.revokeReason}\nYou may resubmit a new application.'
            : 'Your verified breeder status has been revoked. You may resubmit.',
        backgroundColor: Colors.red.withOpacity(0.08),
      );
    }
    if (_isVerified) {
      final approved = _history.firstWhere((r) => r.isApproved);
      final expiryInfo = approved.expiryDate != null
          ? '\nValid until: ${_formatDate(approved.expiryDate!)}'
          : '';
      return _buildBannerCard(
        icon: Icons.verified,
        iconColor: AppTheme.success,
        title: 'Verified Breeder',
        subtitle: 'Your breeder status has been verified.$expiryInfo',
        backgroundColor: AppTheme.success.withOpacity(0.08),
      );
    }
    if (_hasPending) {
      return _buildBannerCard(
        icon: Icons.hourglass_top,
        iconColor: Colors.orange,
        title: 'Verification Pending',
        subtitle: 'Your application is being reviewed by our team.',
        backgroundColor: Colors.orange.withOpacity(0.08),
      );
    }
    if (_history.isNotEmpty && _history.first.isRejected) {
      return _buildBannerCard(
        icon: Icons.info_outline,
        iconColor: AppTheme.error,
        title: 'Verification Rejected',
        subtitle: 'Please review the feedback and resubmit with additional documents.',
        backgroundColor: AppTheme.error.withOpacity(0.08),
      );
    }
    return _buildBannerCard(
      icon: Icons.shield_outlined,
      iconColor: AppTheme.primary,
      title: 'Become a Verified Breeder',
      subtitle: 'Submit your credentials to get verified breeder status.',
      backgroundColor: AppTheme.primary.withOpacity(0.08),
    );
  }

  Widget _buildBannerCard({
    required IconData icon,
    required Color iconColor,
    required String title,
    required String subtitle,
    required Color backgroundColor,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: iconColor.withOpacity(0.2)),
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: iconColor.withOpacity(0.1),
              shape: BoxShape.circle,
            ),
            child: Icon(icon, size: 32, color: iconColor),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: TextStyle(fontSize: 17, fontWeight: FontWeight.w700, color: iconColor)),
                const SizedBox(height: 4),
                Text(subtitle, style: TextStyle(color: Colors.grey[700], fontSize: 13)),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildEmptyState() {
    return Center(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 40),
        child: Column(
          children: [
            Icon(Icons.assignment_outlined, size: 64, color: Colors.grey[400]),
            const SizedBox(height: 16),
            Text('No verification submissions yet', style: TextStyle(fontSize: 16, color: Colors.grey[600])),
            const SizedBox(height: 8),
            Text('Apply to become a verified breeder', style: TextStyle(color: Colors.grey[500])),
          ],
        ),
      ),
    );
  }

  Widget _buildHistoryItem(VerificationRequest request) {
    final statusColor = switch (request.status) {
      'approved' => AppTheme.success,
      'rejected' => AppTheme.error,
      'revoked' => Colors.red[800]!,
      'pending' => Colors.orange,
      _ => Colors.grey,
    };
    final statusIcon = switch (request.status) {
      'approved' => Icons.check_circle,
      'rejected' => Icons.cancel,
      'revoked' => Icons.block,
      'pending' => Icons.hourglass_top,
      _ => Icons.help_outline,
    };

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      elevation: 0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(14),
        side: BorderSide(color: Colors.grey[200]!),
      ),
      child: ExpansionTile(
        leading: Icon(statusIcon, color: statusColor),
        title: Text('Submission #${request.submissionNumber}', style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(_formatDate(request.createdAt), style: TextStyle(color: Colors.grey[600], fontSize: 12)),
        trailing: Container(
          padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
          decoration: BoxDecoration(
            color: statusColor.withOpacity(0.1),
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            request.status.toUpperCase(),
            style: TextStyle(color: statusColor, fontSize: 11, fontWeight: FontWeight.w700),
          ),
        ),
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Divider(),
                _buildDetailRow('Kennel', request.kennelName),
                _buildDetailRow('Experience', request.breedExperience),
                _buildDetailRow('Documents', '${request.documents.length} file(s)'),
                if (request.expiryDate != null)
                  _buildDetailRow('Expires', _formatDate(request.expiryDate!)),
                if (request.processedAt != null)
                  _buildDetailRow('Processed', _formatDate(request.processedAt!)),
                if (request.rejectionReason != null) ...[
                  const SizedBox(height: 8),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.error.withOpacity(0.05),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: AppTheme.error.withOpacity(0.2)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text('Feedback:', style: TextStyle(fontWeight: FontWeight.w600, color: AppTheme.error)),
                        const SizedBox(height: 4),
                        Text(request.rejectionReason!, style: const TextStyle(fontSize: 13)),
                      ],
                    ),
                  ),
                ],
                if (request.revokeReason != null) ...[
                  const SizedBox(height: 8),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.red[800]!.withOpacity(0.05),
                      borderRadius: BorderRadius.circular(10),
                      border: Border.all(color: Colors.red[800]!.withOpacity(0.2)),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Revoke Reason:', style: TextStyle(fontWeight: FontWeight.w600, color: Colors.red[800])),
                        const SizedBox(height: 4),
                        Text(request.revokeReason!, style: const TextStyle(fontSize: 13)),
                      ],
                    ),
                  ),
                ],
                if (request.documents.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  const Text('Submitted Documents:', style: TextStyle(fontWeight: FontWeight.w600, fontSize: 14)),
                  const SizedBox(height: 8),
                  ...request.documents.map((doc) => _buildDocumentTile(doc)),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDocumentTile(VerificationDocument doc) {
    final isImage = doc.type.contains('image');
    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: Colors.grey[50],
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.grey[200]!),
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        leading: Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            color: isImage ? AppTheme.primary.withOpacity(0.08) : Colors.blue.withOpacity(0.08),
          ),
          child: isImage && doc.url.isNotEmpty
              ? ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: CachedNetworkImage(imageUrl: doc.url, fit: BoxFit.cover, width: 44, height: 44,
                    errorWidget: (_, __, ___) => Icon(Icons.image, color: AppTheme.primary),
                  ),
                )
              : Icon(
                  doc.type.contains('pdf') ? Icons.picture_as_pdf : Icons.description,
                  color: doc.type.contains('pdf') ? Colors.red : Colors.blue,
                ),
        ),
        title: Text(doc.name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500), maxLines: 1, overflow: TextOverflow.ellipsis),
        subtitle: Text(doc.type, style: TextStyle(fontSize: 11, color: Colors.grey[500])),
        trailing: isImage && doc.url.isNotEmpty
            ? IconButton(
                icon: const Icon(Icons.open_in_new, size: 20),
                onPressed: () => _showImagePreview(doc),
              )
            : null,
      ),
    );
  }

  void _showImagePreview(VerificationDocument doc) {
    showDialog(
      context: context,
      builder: (_) => Dialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ClipRRect(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(16)),
              child: CachedNetworkImage(imageUrl: doc.url, fit: BoxFit.contain),
            ),
            Padding(
              padding: const EdgeInsets.all(12),
              child: Text(doc.name, style: const TextStyle(fontWeight: FontWeight.w600)),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 100, child: Text(label, style: TextStyle(color: Colors.grey[600], fontSize: 13))),
          Expanded(child: Text(value, style: const TextStyle(fontSize: 13))),
        ],
      ),
    );
  }

  String _formatDate(String isoDate) {
    try {
      final date = DateTime.parse(isoDate);
      return '${date.day}/${date.month}/${date.year} ${date.hour.toString().padLeft(2, '0')}:${date.minute.toString().padLeft(2, '0')}';
    } catch (_) {
      return isoDate;
    }
  }

  void _navigateToSubmit() {
    VerificationRequest? lastRejected;
    if (_history.isNotEmpty && _history.first.canResubmit) {
      lastRejected = _history.first;
    }
    Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => VerificationSubmitScreen(previousSubmission: lastRejected)),
    ).then((_) => _loadHistory());
  }
}

class VerificationSubmitScreen extends StatefulWidget {
  final VerificationRequest? previousSubmission;

  const VerificationSubmitScreen({super.key, this.previousSubmission});

  @override
  State<VerificationSubmitScreen> createState() => _VerificationSubmitScreenState();
}

class _VerificationSubmitScreenState extends State<VerificationSubmitScreen> {
  final _formKey = GlobalKey<FormState>();
  final _kennelNameController = TextEditingController();
  final _experienceController = TextEditingController();
  final List<Map<String, dynamic>> _documents = [];
  bool _submitting = false;
  bool _uploading = false;

  @override
  void initState() {
    super.initState();
    _prefillFromPrevious();
  }

  void _prefillFromPrevious() {
    final prev = widget.previousSubmission;
    if (prev == null) return;

    _kennelNameController.text = prev.kennelName;
    _experienceController.text = prev.breedExperience;

    for (final doc in prev.documents) {
      _documents.add({
        'url': doc.url,
        'path': doc.path,
        'name': doc.name,
        'type': doc.type,
        'fromPrevious': true,
      });
    }
  }

  @override
  void dispose() {
    _kennelNameController.dispose();
    _experienceController.dispose();
    super.dispose();
  }

  Future<void> _pickDocument() async {
    if (_documents.length >= 10) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Maximum 10 documents allowed'), backgroundColor: AppTheme.error),
      );
      return;
    }

    final result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'],
      allowMultiple: true,
    );

    if (result == null || result.files.isEmpty) return;

    final filesToUpload = result.files.where((f) => f.path != null).take(10 - _documents.length).toList();

    setState(() => _uploading = true);

    for (final pickedFile in filesToUpload) {
      try {
        final file = File(pickedFile.path!);
        final api = ApiService();
        final response = await api.uploadFile('/verification/documents/upload', file);
        setState(() {
          _documents.add({
            'url': response['url'],
            'path': response['path'],
            'name': response['name'] ?? pickedFile.name,
            'type': response['type'] ?? 'application/octet-stream',
            'localPath': pickedFile.path,
          });
        });
      } catch (e) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            SnackBar(content: Text('Failed to upload ${pickedFile.name}: $e'), backgroundColor: AppTheme.error),
          );
        }
      }
    }

    setState(() => _uploading = false);
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    if (_documents.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please attach at least one document'), backgroundColor: AppTheme.error),
      );
      return;
    }

    setState(() => _submitting = true);
    try {
      final api = ApiService();
      final docs = _documents.map((d) {
        return {'url': d['url'], 'path': d['path'], 'name': d['name'], 'type': d['type']};
      }).toList();

      await api.post('/verification/submit', {
        'kennelName': _kennelNameController.text.trim(),
        'breedExperience': _experienceController.text.trim(),
        'documents': docs,
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Verification submitted successfully!'), backgroundColor: AppTheme.success),
        );
        Navigator.of(context).pop(true);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: AppTheme.error),
        );
      }
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isResubmit = widget.previousSubmission != null;

    return Scaffold(
      appBar: AppBar(
        title: Text(isResubmit ? 'Resubmit Verification' : 'Submit Verification', style: const TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (isResubmit && widget.previousSubmission!.rejectionReason != null) ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: AppTheme.error.withOpacity(0.05),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: AppTheme.error.withOpacity(0.2)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.feedback_outlined, color: AppTheme.error, size: 20),
                          const SizedBox(width: 8),
                          const Text('Previous Rejection Feedback', style: TextStyle(fontWeight: FontWeight.w700, color: AppTheme.error, fontSize: 14)),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(widget.previousSubmission!.rejectionReason!, style: const TextStyle(fontSize: 13)),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
              ],
              if (isResubmit && widget.previousSubmission!.revokeReason != null) ...[
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(14),
                  decoration: BoxDecoration(
                    color: Colors.red[800]!.withOpacity(0.05),
                    borderRadius: BorderRadius.circular(14),
                    border: Border.all(color: Colors.red[800]!.withOpacity(0.2)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Icon(Icons.block, color: Colors.red[800], size: 20),
                          const SizedBox(width: 8),
                          Text('Revocation Reason', style: TextStyle(fontWeight: FontWeight.w700, color: Colors.red[800], fontSize: 14)),
                        ],
                      ),
                      const SizedBox(height: 8),
                      Text(widget.previousSubmission!.revokeReason!, style: const TextStyle(fontSize: 13)),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
              ],
              Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: AppTheme.primary.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(14),
                  border: Border.all(color: AppTheme.primary.withOpacity(0.15)),
                ),
                child: Row(
                  children: [
                    Icon(Icons.info_outline, color: AppTheme.primary, size: 24),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        isResubmit
                            ? 'Your previous details are pre-filled. Update as needed and resubmit.'
                            : 'Provide your breeding credentials. You can upload up to 10 documents (licenses, certificates, kennel photos).',
                        style: TextStyle(color: Colors.grey[700], fontSize: 13),
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(height: 24),
              TextFormField(
                controller: _kennelNameController,
                decoration: InputDecoration(
                  labelText: 'Kennel / Cattery Name',
                  hintText: 'Enter your kennel or cattery name',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  prefixIcon: const Icon(Icons.home_work),
                  filled: true,
                  fillColor: Colors.grey[50],
                ),
                validator: (v) => v == null || v.trim().isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _experienceController,
                decoration: InputDecoration(
                  labelText: 'Breeding Experience',
                  hintText: 'Describe your breeding experience, years, specializations...',
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
                  prefixIcon: const Icon(Icons.workspace_premium),
                  filled: true,
                  fillColor: Colors.grey[50],
                ),
                maxLines: 3,
                validator: (v) => v == null || v.trim().isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Documents', style: TextStyle(fontSize: 16, fontWeight: FontWeight.w700)),
                      Text('${_documents.length}/10 uploaded', style: TextStyle(color: Colors.grey[500], fontSize: 12)),
                    ],
                  ),
                  ElevatedButton.icon(
                    onPressed: _uploading ? null : _pickDocument,
                    icon: _uploading
                        ? const SizedBox(width: 16, height: 16, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                        : const Icon(Icons.attach_file, size: 18),
                    label: Text(_uploading ? 'Uploading...' : 'Add Document'),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.primary,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                'Upload breeding license, certificates, kennel photos, or other proof.',
                style: TextStyle(color: Colors.grey[600], fontSize: 13),
              ),
              const SizedBox(height: 12),
              if (_documents.isEmpty)
                GestureDetector(
                  onTap: _uploading ? null : _pickDocument,
                  child: Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(32),
                    decoration: BoxDecoration(
                      border: Border.all(color: AppTheme.primary.withOpacity(0.3), style: BorderStyle.solid),
                      borderRadius: BorderRadius.circular(14),
                      color: AppTheme.primary.withOpacity(0.02),
                    ),
                    child: Column(
                      children: [
                        Icon(Icons.cloud_upload_outlined, size: 48, color: AppTheme.primary.withOpacity(0.5)),
                        const SizedBox(height: 12),
                        Text('Tap to upload documents', style: TextStyle(color: Colors.grey[600], fontWeight: FontWeight.w500)),
                        const SizedBox(height: 4),
                        Text('JPG, PNG, PDF up to 10MB each', style: TextStyle(color: Colors.grey[400], fontSize: 12)),
                      ],
                    ),
                  ),
                )
              else
                ..._documents.asMap().entries.map((entry) => _buildUploadedDocTile(entry.key, entry.value)),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 52,
                child: ElevatedButton(
                  onPressed: (_submitting || _uploading) ? null : _submit,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    elevation: 0,
                  ),
                  child: _submitting
                      ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                      : Text(isResubmit ? 'Resubmit for Review' : 'Submit for Review', style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                ),
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildUploadedDocTile(int index, Map<String, dynamic> doc) {
    final isImage = (doc['type'] ?? '').toString().contains('image');
    final name = doc['name'] ?? 'Document ${index + 1}';
    final fromPrevious = doc['fromPrevious'] == true;

    return Container(
      margin: const EdgeInsets.only(bottom: 8),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: fromPrevious ? AppTheme.primary.withOpacity(0.3) : Colors.grey[200]!),
        boxShadow: [BoxShadow(color: Colors.black.withOpacity(0.03), blurRadius: 4, offset: const Offset(0, 2))],
      ),
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
        leading: Container(
          width: 44,
          height: 44,
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(8),
            color: isImage ? AppTheme.primary.withOpacity(0.08) : Colors.blue.withOpacity(0.08),
          ),
          child: isImage && doc['url'] != null
              ? ClipRRect(
                  borderRadius: BorderRadius.circular(8),
                  child: CachedNetworkImage(
                    imageUrl: doc['url'],
                    fit: BoxFit.cover, width: 44, height: 44,
                    errorWidget: (_, __, ___) => Icon(Icons.image, color: AppTheme.primary),
                  ),
                )
              : Icon(
                  doc['type']?.toString().contains('pdf') == true ? Icons.picture_as_pdf : Icons.description,
                  color: doc['type']?.toString().contains('pdf') == true ? Colors.red : Colors.blue,
                ),
        ),
        title: Text(name, style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w500), maxLines: 1, overflow: TextOverflow.ellipsis),
        subtitle: Text(
          fromPrevious ? 'From previous submission' : '${index + 1} of ${_documents.length}',
          style: TextStyle(fontSize: 11, color: fromPrevious ? AppTheme.primary : Colors.grey[500]),
        ),
        trailing: IconButton(
          icon: const Icon(Icons.close, color: AppTheme.error, size: 20),
          onPressed: () => setState(() => _documents.removeAt(index)),
        ),
      ),
    );
  }
}

class BreederCertificateScreen extends StatefulWidget {
  const BreederCertificateScreen({super.key});

  @override
  State<BreederCertificateScreen> createState() => _BreederCertificateScreenState();
}

class _BreederCertificateScreenState extends State<BreederCertificateScreen> {
  final GlobalKey _cardKey = GlobalKey();
  BreederCertificate? _certificate;
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadCertificate();
  }

  Future<void> _loadCertificate() async {
    setState(() { _loading = true; _error = null; });
    try {
      final api = ApiService();
      final data = await api.get('/verification/certificate');
      if (data != null) {
        setState(() {
          _certificate = BreederCertificate.fromJson(data as Map<String, dynamic>);
          _loading = false;
        });
      } else {
        setState(() { _error = 'No certificate found'; _loading = false; });
      }
    } catch (e) {
      setState(() { _error = e.toString(); _loading = false; });
    }
  }

  Future<void> _shareCertificate() async {
    try {
      final boundary = _cardKey.currentContext?.findRenderObject() as RenderRepaintBoundary?;
      if (boundary == null) return;

      final image = await boundary.toImage(pixelRatio: 3.0);
      final byteData = await image.toByteData(format: ui.ImageByteFormat.png);
      if (byteData == null) return;

      final tempDir = await getTemporaryDirectory();
      final file = File('${tempDir.path}/breeder_certificate.png');
      await file.writeAsBytes(byteData.buffer.asUint8List());

      await Share.shareXFiles(
        [XFile(file.path)],
        text: 'I am a Verified Breeder on Petfolioo! Certificate #${_certificate!.certificateNumber}',
      );
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to share: $e'), backgroundColor: AppTheme.error),
        );
      }
    }
  }

  String _formatDate(String isoDate) {
    try {
      final date = DateTime.parse(isoDate);
      return '${date.day}/${date.month}/${date.year}';
    } catch (_) {
      return isoDate;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: AppBar(
        title: const Text('Breeder Certificate', style: TextStyle(fontWeight: FontWeight.w700)),
        actions: [
          if (_certificate != null)
            IconButton(
              icon: const Icon(Icons.share),
              onPressed: _shareCertificate,
              tooltip: 'Share Certificate',
            ),
        ],
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator(color: AppTheme.primary))
          : _error != null
              ? Center(
                  child: Padding(
                    padding: const EdgeInsets.all(32),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.card_membership, size: 64, color: Colors.grey[400]),
                        const SizedBox(height: 16),
                        Text('No Certificate Available', style: TextStyle(fontSize: 18, color: Colors.grey[600], fontWeight: FontWeight.w600)),
                        const SizedBox(height: 8),
                        Text('You need an approved verification to view your certificate.', textAlign: TextAlign.center, style: TextStyle(color: Colors.grey[500])),
                      ],
                    ),
                  ),
                )
              : SingleChildScrollView(
                  padding: const EdgeInsets.all(20),
                  child: Column(
                    children: [
                      RepaintBoundary(
                        key: _cardKey,
                        child: _buildCertificateCard(),
                      ),
                      const SizedBox(height: 24),
                      SizedBox(
                        width: double.infinity,
                        height: 52,
                        child: ElevatedButton.icon(
                          onPressed: _shareCertificate,
                          icon: const Icon(Icons.share, color: Colors.white),
                          label: const Text('Share Certificate', style: TextStyle(color: Colors.white, fontSize: 16, fontWeight: FontWeight.w600)),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: AppTheme.primary,
                            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                            elevation: 0,
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
    );
  }

  Widget _buildCertificateCard() {
    final cert = _certificate!;
    final isExpired = cert.isExpired;

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [Color(0xFF1B5E20), Color(0xFF2E7D32), Color(0xFF388E3C)],
        ),
        boxShadow: [
          BoxShadow(color: Colors.green.withOpacity(0.3), blurRadius: 20, offset: const Offset(0, 10)),
        ],
      ),
      child: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
              color: Colors.white.withOpacity(0.1),
            ),
            child: Column(
              children: [
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white.withOpacity(0.15),
                  ),
                  child: const Icon(Icons.verified, size: 48, color: Colors.white),
                ),
                const SizedBox(height: 12),
                const Text(
                  'VERIFIED BREEDER',
                  style: TextStyle(
                    color: Colors.white,
                    fontSize: 22,
                    fontWeight: FontWeight.w900,
                    letterSpacing: 2,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'CERTIFICATE OF VERIFICATION',
                  style: TextStyle(
                    color: Colors.white.withOpacity(0.8),
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                    letterSpacing: 1.5,
                  ),
                ),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(24),
            child: Column(
              children: [
                _buildCertField('Breeder Name', cert.userName),
                const SizedBox(height: 16),
                _buildCertField('Kennel Name', cert.kennelName),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(child: _buildCertField('Certificate #', cert.certificateNumber)),
                    const SizedBox(width: 16),
                    Expanded(child: _buildCertField('Submission', '#${cert.submissionNumber}')),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(
                      child: _buildCertField('Approved', cert.approvedAt != null ? _formatDate(cert.approvedAt!) : 'N/A'),
                    ),
                    const SizedBox(width: 16),
                    Expanded(
                      child: _buildCertField(
                        'Expires',
                        cert.expiryDate != null ? _formatDate(cert.expiryDate!) : 'No Expiry',
                        valueColor: isExpired ? Colors.red[300] : null,
                      ),
                    ),
                  ],
                ),
                if (isExpired) ...[
                  const SizedBox(height: 16),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(vertical: 8, horizontal: 12),
                    decoration: BoxDecoration(
                      color: Colors.red.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: const Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.warning_amber, color: Colors.white, size: 18),
                        SizedBox(width: 8),
                        Text('EXPIRED', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 14)),
                      ],
                    ),
                  ),
                ],
                const SizedBox(height: 20),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                  decoration: BoxDecoration(
                    border: Border(top: BorderSide(color: Colors.white.withOpacity(0.2))),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.pets, color: Colors.white.withOpacity(0.6), size: 16),
                      const SizedBox(width: 8),
                      Text(
                        'Petfolioo',
                        style: TextStyle(
                          color: Colors.white.withOpacity(0.7),
                          fontSize: 14,
                          fontWeight: FontWeight.w600,
                          letterSpacing: 1,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildCertField(String label, String value, {Color? valueColor}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label.toUpperCase(),
          style: TextStyle(
            color: Colors.white.withOpacity(0.6),
            fontSize: 10,
            fontWeight: FontWeight.w600,
            letterSpacing: 1,
          ),
        ),
        const SizedBox(height: 4),
        Text(
          value,
          style: TextStyle(
            color: valueColor ?? Colors.white,
            fontSize: 15,
            fontWeight: FontWeight.w700,
          ),
        ),
      ],
    );
  }
}

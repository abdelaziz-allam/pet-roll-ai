import 'package:flutter/material.dart';
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
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      // TODO: Replace with actual API call
      // final history = await verificationService.getHistory();
      // For now, use empty list - will be wired to API
      await Future.delayed(const Duration(milliseconds: 500));
      setState(() {
        _history = [];
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString();
        _loading = false;
      });
    }
  }

  bool get _canSubmit {
    if (_history.isEmpty) return true;
    return _history.first.canResubmit;
  }

  bool get _hasPending {
    return _history.any((r) => r.isPending);
  }

  bool get _isVerified {
    return _history.any((r) => r.isApproved);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Breeder Verification'),
      ),
      body: _loading
          ? const Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(_error!, style: TextStyle(color: Colors.red[700])),
                      const SizedBox(height: 16),
                      ElevatedButton(
                        onPressed: _loadHistory,
                        child: const Text('Retry'),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _loadHistory,
                  child: SingleChildScrollView(
                    physics: const AlwaysScrollableScrollPhysics(),
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        _buildStatusBanner(),
                        const SizedBox(height: 24),
                        if (_history.isNotEmpty) ...[
                          Text(
                            'Submission History',
                            style: Theme.of(context).textTheme.titleMedium?.copyWith(
                                  fontWeight: FontWeight.bold,
                                ),
                          ),
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
              onPressed: () => _navigateToSubmit(),
              icon: const Icon(Icons.add),
              label: Text(_history.isEmpty ? 'Apply for Verification' : 'Resubmit'),
            )
          : null,
    );
  }

  Widget _buildStatusBanner() {
    if (_isVerified) {
      return _buildBannerCard(
        icon: Icons.verified,
        iconColor: Colors.green,
        title: 'Verified Breeder',
        subtitle: 'Your breeder status has been verified.',
        backgroundColor: Colors.green.shade50,
      );
    }
    if (_hasPending) {
      return _buildBannerCard(
        icon: Icons.hourglass_top,
        iconColor: Colors.orange,
        title: 'Verification Pending',
        subtitle: 'Your application is being reviewed by our team.',
        backgroundColor: Colors.orange.shade50,
      );
    }
    if (_history.isNotEmpty && _history.first.isRejected) {
      return _buildBannerCard(
        icon: Icons.info_outline,
        iconColor: Colors.red,
        title: 'Verification Rejected',
        subtitle: 'Please review the feedback and resubmit.',
        backgroundColor: Colors.red.shade50,
      );
    }
    return _buildBannerCard(
      icon: Icons.shield_outlined,
      iconColor: Colors.blue,
      title: 'Become a Verified Breeder',
      subtitle: 'Submit your credentials to get verified breeder status.',
      backgroundColor: Colors.blue.shade50,
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
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        children: [
          Icon(icon, size: 48, color: iconColor),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: iconColor)),
                const SizedBox(height: 4),
                Text(subtitle, style: TextStyle(color: Colors.grey[700])),
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
            Text(
              'No verification submissions yet',
              style: TextStyle(fontSize: 16, color: Colors.grey[600]),
            ),
            const SizedBox(height: 8),
            Text(
              'Apply to become a verified breeder',
              style: TextStyle(color: Colors.grey[500]),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildHistoryItem(VerificationRequest request) {
    final statusColor = switch (request.status) {
      'approved' => Colors.green,
      'rejected' => Colors.red,
      'pending' => Colors.orange,
      _ => Colors.grey,
    };

    final statusIcon = switch (request.status) {
      'approved' => Icons.check_circle,
      'rejected' => Icons.cancel,
      'pending' => Icons.hourglass_top,
      _ => Icons.help_outline,
    };

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: ExpansionTile(
        leading: Icon(statusIcon, color: statusColor),
        title: Text('Submission #${request.submissionNumber}'),
        subtitle: Text(
          _formatDate(request.createdAt),
          style: TextStyle(color: Colors.grey[600], fontSize: 12),
        ),
        trailing: Chip(
          label: Text(
            request.status.toUpperCase(),
            style: TextStyle(color: statusColor, fontSize: 11, fontWeight: FontWeight.bold),
          ),
          backgroundColor: statusColor.withOpacity(0.1),
          side: BorderSide.none,
          padding: EdgeInsets.zero,
          visualDensity: VisualDensity.compact,
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
                if (request.processedAt != null)
                  _buildDetailRow('Processed', _formatDate(request.processedAt!)),
                if (request.rejectionReason != null) ...[
                  const SizedBox(height: 8),
                  Container(
                    width: double.infinity,
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: Colors.red.shade50,
                      borderRadius: BorderRadius.circular(8),
                      border: Border.all(color: Colors.red.shade200),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Text(
                          'Rejection Reason:',
                          style: TextStyle(fontWeight: FontWeight.bold, color: Colors.red),
                        ),
                        const SizedBox(height: 4),
                        Text(request.rejectionReason!),
                      ],
                    ),
                  ),
                ],
                if (request.documents.isNotEmpty) ...[
                  const SizedBox(height: 12),
                  const Text('Submitted Documents:', style: TextStyle(fontWeight: FontWeight.w600)),
                  const SizedBox(height: 8),
                  Wrap(
                    spacing: 8,
                    runSpacing: 8,
                    children: request.documents.map((doc) {
                      return Chip(
                        avatar: Icon(
                          doc.type.contains('image') ? Icons.image : Icons.description,
                          size: 18,
                        ),
                        label: Text(doc.name, style: const TextStyle(fontSize: 12)),
                        visualDensity: VisualDensity.compact,
                      );
                    }).toList(),
                  ),
                ],
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDetailRow(String label, String value) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(
            width: 100,
            child: Text(label, style: TextStyle(color: Colors.grey[600], fontSize: 13)),
          ),
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
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (_) => const VerificationSubmitScreen(),
      ),
    ).then((_) => _loadHistory());
  }
}

class VerificationSubmitScreen extends StatefulWidget {
  const VerificationSubmitScreen({super.key});

  @override
  State<VerificationSubmitScreen> createState() => _VerificationSubmitScreenState();
}

class _VerificationSubmitScreenState extends State<VerificationSubmitScreen> {
  final _formKey = GlobalKey<FormState>();
  final _kennelNameController = TextEditingController();
  final _experienceController = TextEditingController();
  final List<Map<String, String>> _documents = [];
  bool _submitting = false;

  @override
  void dispose() {
    _kennelNameController.dispose();
    _experienceController.dispose();
    super.dispose();
  }

  Future<void> _pickDocument() async {
    // TODO: Implement file picker (use file_picker or image_picker package)
    // For now, show a placeholder
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Document picker will be integrated with file_picker package')),
    );
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;
    if (_documents.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Please attach at least one document')),
      );
      return;
    }

    setState(() => _submitting = true);
    try {
      // TODO: Call API - verificationService.submit(kennelName, experience, documents)
      await Future.delayed(const Duration(seconds: 1));
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Verification request submitted successfully!'),
            backgroundColor: Colors.green,
          ),
        );
        Navigator.of(context).pop();
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Error: $e'), backgroundColor: Colors.red),
        );
      }
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Submit Verification'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Breeder Verification Application',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 8),
              Text(
                'Please provide your breeding credentials for review.',
                style: TextStyle(color: Colors.grey[600]),
              ),
              const SizedBox(height: 24),
              TextFormField(
                controller: _kennelNameController,
                decoration: const InputDecoration(
                  labelText: 'Kennel / Cattery Name',
                  hintText: 'Enter your kennel or cattery name',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.home_work),
                ),
                validator: (v) => v == null || v.trim().isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 16),
              TextFormField(
                controller: _experienceController,
                decoration: const InputDecoration(
                  labelText: 'Breeding Experience',
                  hintText: 'Describe your breeding experience',
                  border: OutlineInputBorder(),
                  prefixIcon: Icon(Icons.workspace_premium),
                ),
                maxLines: 3,
                validator: (v) => v == null || v.trim().isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 24),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Documents',
                    style: Theme.of(context).textTheme.titleMedium,
                  ),
                  TextButton.icon(
                    onPressed: _pickDocument,
                    icon: const Icon(Icons.attach_file),
                    label: const Text('Add Document'),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                'Upload your breeding license, certificates, kennel photos, or other proof.',
                style: TextStyle(color: Colors.grey[600], fontSize: 13),
              ),
              const SizedBox(height: 12),
              if (_documents.isEmpty)
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(32),
                  decoration: BoxDecoration(
                    border: Border.all(color: Colors.grey[300]!, style: BorderStyle.solid),
                    borderRadius: BorderRadius.circular(8),
                    color: Colors.grey[50],
                  ),
                  child: Column(
                    children: [
                      Icon(Icons.cloud_upload_outlined, size: 48, color: Colors.grey[400]),
                      const SizedBox(height: 8),
                      Text('No documents attached', style: TextStyle(color: Colors.grey[500])),
                      const SizedBox(height: 4),
                      Text('Tap "Add Document" to upload', style: TextStyle(color: Colors.grey[400], fontSize: 12)),
                    ],
                  ),
                )
              else
                ...(_documents.map((doc) => ListTile(
                      leading: const Icon(Icons.description),
                      title: Text(doc['name'] ?? 'Document'),
                      trailing: IconButton(
                        icon: const Icon(Icons.close, color: Colors.red),
                        onPressed: () => setState(() => _documents.remove(doc)),
                      ),
                    ))),
              const SizedBox(height: 32),
              SizedBox(
                width: double.infinity,
                height: 48,
                child: ElevatedButton(
                  onPressed: _submitting ? null : _submit,
                  child: _submitting
                      ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(strokeWidth: 2))
                      : const Text('Submit for Review'),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

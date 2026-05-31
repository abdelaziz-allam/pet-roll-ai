import 'package:flutter/material.dart';
import '../../core/services/api_service.dart';
import '../../core/theme/app_theme.dart';
import '../../l10n/generated/app_localizations.dart';

class FeedbackScreen extends StatefulWidget {
  const FeedbackScreen({super.key});

  @override
  State<FeedbackScreen> createState() => _FeedbackScreenState();
}

class _FeedbackScreenState extends State<FeedbackScreen> {
  int _selectedTab = 0;
  bool _loading = true;
  List<Map<String, dynamic>> _feedbackList = [];

  String _selectedType = 'general';
  final _messageController = TextEditingController();
  final _formKey = GlobalKey<FormState>();
  bool _submitting = false;

  @override
  void initState() {
    super.initState();
    _loadFeedback();
  }

  @override
  void dispose() {
    _messageController.dispose();
    super.dispose();
  }

  Future<void> _loadFeedback() async {
    setState(() => _loading = true);
    try {
      final api = ApiService();
      final response = await api.get('/feedback?page=1&limit=50');
      if (response is Map<String, dynamic>) {
        final list = response['data'] as List? ?? [];
        _feedbackList = list.map((e) => Map<String, dynamic>.from(e as Map)).toList();
      }
    } catch (_) {}
    if (mounted) setState(() => _loading = false);
  }

  Future<void> _submitFeedback() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() => _submitting = true);
    try {
      final api = ApiService();
      final result = await api.post('/feedback', {
        'type': _selectedType,
        'message': _messageController.text.trim(),
      });

      // Optimistic: add the new item to the top of the list
      if (result is Map<String, dynamic>) {
        _feedbackList.insert(0, Map<String, dynamic>.from(result));
      }

      _messageController.clear();
      setState(() {
        _selectedType = 'general';
        _selectedTab = 0;
        _submitting = false;
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(AppLocalizations.of(context)!.feedbackSent),
            backgroundColor: AppTheme.success,
            behavior: SnackBarBehavior.floating,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
          ),
        );
      }
    } catch (e) {
      setState(() => _submitting = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('$e'),
            backgroundColor: AppTheme.error,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    }
  }

  String _formatDate(dynamic timestamp) {
    DateTime date;
    if (timestamp is Map) {
      final seconds = timestamp['_seconds'] ?? 0;
      date = DateTime.fromMillisecondsSinceEpoch((seconds as int) * 1000);
    } else if (timestamp is String) {
      date = DateTime.tryParse(timestamp) ?? DateTime.now();
    } else {
      date = DateTime.now();
    }
    final now = DateTime.now();
    final diff = now.difference(date);
    if (diff.inMinutes < 1) return 'Just now';
    if (diff.inMinutes < 60) return '${diff.inMinutes}m ago';
    if (diff.inHours < 24) return '${diff.inHours}h ago';
    if (diff.inDays < 7) return '${diff.inDays}d ago';
    final months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return '${months[date.month - 1]} ${date.day}, ${date.year}';
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Scaffold(
      appBar: AppBar(
        title: Text(l10n.feedback, style: const TextStyle(fontWeight: FontWeight.w700)),
      ),
      body: Column(
        children: [
          _buildTabToggle(l10n),
          Expanded(
            child: _selectedTab == 0 ? _buildMyFeedback(l10n) : _buildNewFeedback(l10n),
          ),
        ],
      ),
    );
  }

  Widget _buildTabToggle(AppLocalizations l10n) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 16),
      child: Container(
        decoration: BoxDecoration(
          color: Colors.grey.shade100,
          borderRadius: BorderRadius.circular(14),
        ),
        padding: const EdgeInsets.all(4),
        child: Row(
          children: [
            Expanded(child: _buildTabButton(l10n.myFeedback, 0)),
            const SizedBox(width: 4),
            Expanded(child: _buildTabButton(l10n.newFeedback, 1)),
          ],
        ),
      ),
    );
  }

  Widget _buildTabButton(String label, int index) {
    final isSelected = _selectedTab == index;
    return GestureDetector(
      onTap: () => setState(() => _selectedTab = index),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(vertical: 12),
        decoration: BoxDecoration(
          color: isSelected ? Colors.white : Colors.transparent,
          borderRadius: BorderRadius.circular(10),
          boxShadow: isSelected ? AppTheme.cardShadow : null,
        ),
        child: Center(
          child: Text(
            label,
            style: TextStyle(
              fontSize: 14,
              fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
              color: isSelected ? AppTheme.primary : AppTheme.textSecondary,
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildMyFeedback(AppLocalizations l10n) {
    if (_loading) {
      return const Center(child: CircularProgressIndicator(color: AppTheme.primary));
    }

    if (_feedbackList.isEmpty) {
      return Center(
        child: Padding(
          padding: const EdgeInsets.all(40),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Icon(Icons.feedback_outlined, size: 64, color: Colors.grey.shade300),
              const SizedBox(height: 16),
              Text(
                l10n.noFeedbackYet,
                textAlign: TextAlign.center,
                style: const TextStyle(fontSize: 16, color: AppTheme.textSecondary, height: 1.5),
              ),
              const SizedBox(height: 20),
              OutlinedButton.icon(
                onPressed: () => setState(() => _selectedTab = 1),
                icon: const Icon(Icons.add, size: 18),
                label: Text(l10n.newFeedback),
                style: OutlinedButton.styleFrom(
                  foregroundColor: AppTheme.primary,
                  side: const BorderSide(color: AppTheme.primary),
                  shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                ),
              ),
            ],
          ),
        ),
      );
    }

    return RefreshIndicator(
      onRefresh: _loadFeedback,
      color: AppTheme.primary,
      child: ListView.builder(
        padding: const EdgeInsets.symmetric(horizontal: 20),
        itemCount: _feedbackList.length,
        itemBuilder: (context, index) => _buildFeedbackCard(_feedbackList[index], l10n),
      ),
    );
  }

  Widget _buildFeedbackCard(Map<String, dynamic> item, AppLocalizations l10n) {
    final type = item['type'] ?? 'general';
    final message = item['message'] ?? '';
    final status = item['status'] ?? 'open';
    final adminReply = item['adminReply'];
    final createdAt = item['createdAt'];

    return Container(
      margin: const EdgeInsets.only(bottom: 14),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(14),
        boxShadow: AppTheme.cardShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              _buildTypeBadge(type, l10n),
              const Spacer(),
              _buildStatusBadge(status, l10n),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            message,
            style: const TextStyle(fontSize: 14, color: AppTheme.textPrimary, height: 1.5),
          ),
          const SizedBox(height: 10),
          Text(
            _formatDate(createdAt),
            style: const TextStyle(fontSize: 12, color: AppTheme.textSecondary),
          ),
          if (status == 'replied' && adminReply != null) ...[
            const SizedBox(height: 12),
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: AppTheme.success.withOpacity(0.08),
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: AppTheme.success.withOpacity(0.2)),
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.reply, size: 14, color: AppTheme.success),
                      const SizedBox(width: 6),
                      Text(
                        l10n.adminReply,
                        style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: AppTheme.success),
                      ),
                    ],
                  ),
                  const SizedBox(height: 6),
                  Text(
                    adminReply,
                    style: const TextStyle(fontSize: 13, color: AppTheme.textPrimary, height: 1.4),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }

  Widget _buildTypeBadge(String type, AppLocalizations l10n) {
    Color color;
    String label;
    switch (type) {
      case 'bug':
        color = AppTheme.error;
        label = l10n.bugReport;
        break;
      case 'suggestion':
        color = const Color(0xFF3B82F6);
        label = l10n.suggestion;
        break;
      default:
        color = AppTheme.textSecondary;
        label = l10n.general;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: color)),
    );
  }

  Widget _buildStatusBadge(String status, AppLocalizations l10n) {
    Color color;
    String label;
    switch (status) {
      case 'open':
        color = AppTheme.warning;
        label = l10n.open;
        break;
      case 'replied':
        color = AppTheme.success;
        label = l10n.replied;
        break;
      default:
        color = AppTheme.textSecondary;
        label = l10n.closed;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Text(label, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color: color)),
    );
  }

  Widget _buildNewFeedback(AppLocalizations l10n) {
    return SingleChildScrollView(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      child: Form(
        key: _formKey,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              l10n.general == 'Allmänt' ? 'Feedbacktyp' : 'Feedback Type',
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textPrimary),
            ),
            const SizedBox(height: 10),
            _buildTypeSelector(l10n),
            const SizedBox(height: 24),
            Text(
              l10n.general == 'Allmänt' ? 'Ditt meddelande' : 'Your Message',
              style: const TextStyle(fontSize: 14, fontWeight: FontWeight.w600, color: AppTheme.textPrimary),
            ),
            const SizedBox(height: 10),
            TextFormField(
              controller: _messageController,
              maxLines: 5,
              maxLength: 500,
              decoration: InputDecoration(
                hintText: l10n.feedbackPlaceholder,
                hintStyle: const TextStyle(color: AppTheme.textSecondary),
                alignLabelWithHint: true,
              ),
              validator: (value) {
                if (value == null || value.trim().isEmpty) {
                  return l10n.feedbackPlaceholder;
                }
                return null;
              },
            ),
            const SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: _submitting ? null : _submitFeedback,
                child: _submitting
                    ? const SizedBox(
                        width: 22, height: 22,
                        child: CircularProgressIndicator(strokeWidth: 2.5, color: Colors.white),
                      )
                    : Text(l10n.submitFeedback),
              ),
            ),
            const SizedBox(height: 40),
          ],
        ),
      ),
    );
  }

  Widget _buildTypeSelector(AppLocalizations l10n) {
    return Wrap(
      spacing: 10,
      children: [
        _buildTypeChip('bug', l10n.bugReport, Icons.bug_report_outlined, AppTheme.error),
        _buildTypeChip('suggestion', l10n.suggestion, Icons.lightbulb_outline, const Color(0xFF3B82F6)),
        _buildTypeChip('general', l10n.general, Icons.chat_bubble_outline, AppTheme.textSecondary),
      ],
    );
  }

  Widget _buildTypeChip(String value, String label, IconData icon, Color color) {
    final isSelected = _selectedType == value;
    return GestureDetector(
      onTap: () => setState(() => _selectedType = value),
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: isSelected ? color.withOpacity(0.1) : Colors.white,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? color : Colors.grey.shade200,
            width: isSelected ? 1.5 : 1,
          ),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(icon, size: 18, color: isSelected ? color : AppTheme.textSecondary),
            const SizedBox(width: 6),
            Text(
              label,
              style: TextStyle(
                fontSize: 13,
                fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500,
                color: isSelected ? color : AppTheme.textSecondary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

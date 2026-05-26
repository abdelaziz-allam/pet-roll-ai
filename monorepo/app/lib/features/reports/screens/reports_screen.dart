import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:printing/printing.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../providers/report_provider.dart';

class ReportsScreen extends ConsumerStatefulWidget {
  final String petId;

  const ReportsScreen({super.key, required this.petId});

  @override
  ConsumerState<ReportsScreen> createState() => _ReportsScreenState();
}

class _ReportsScreenState extends ConsumerState<ReportsScreen> {
  bool _isGenerating = false;

  @override
  Widget build(BuildContext context) {
    final reportsAsync = ref.watch(petReportsProvider(widget.petId));

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Reports',
          style: AppTypography.heading2.copyWith(color: AppColors.textPrimary),
        ),
        backgroundColor: AppColors.bgPrimary,
        elevation: 0,
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: AppButton(
              label: 'Generate New Report',
              icon: Icons.add_chart_rounded,
              isLoading: _isGenerating,
              onPressed: _generateReport,
            ),
          ),
          Expanded(
            child: reportsAsync.when(
              data: (reports) {
                if (reports.isEmpty) {
                  return const EmptyState(
                    title: 'No reports yet',
                    subtitle: 'Generate a health report for your pet',
                    icon: Icons.description_outlined,
                  );
                }

                return ListView.separated(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: reports.length,
                  separatorBuilder: (_, __) => const SizedBox(height: 12),
                  itemBuilder: (context, index) {
                    final report = reports[index];
                    return _ReportCard(report: report);
                  },
                );
              },
              loading: () => const LoadingIndicator(),
              error: (error, _) => ErrorView(
                message: error.toString(),
                onRetry: () => ref.invalidate(petReportsProvider(widget.petId)),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Future<void> _generateReport() async {
    setState(() => _isGenerating = true);
    try {
      await ref.read(reportServiceProvider).generateReport(widget.petId);
      ref.invalidate(petReportsProvider(widget.petId));
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to generate report: $e')),
        );
      }
    } finally {
      if (mounted) setState(() => _isGenerating = false);
    }
  }
}

class _ReportCard extends ConsumerWidget {
  final Map<String, dynamic> report;

  const _ReportCard({required this.report});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final createdAt = report['createdAt'] as String?;
    final reportId = report['id'] as String;

    return Container(
      decoration: BoxDecoration(
        color: AppColors.bgPrimary,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: AppColors.borderLight),
      ),
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: AppColors.brandPrimary.withOpacity(0.1),
              borderRadius: BorderRadius.circular(10),
            ),
            child: const Icon(
              Icons.description_rounded,
              color: AppColors.brandPrimary,
              size: 22,
            ),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  report['title'] ?? 'Health Report',
                  style: AppTypography.label.copyWith(
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  createdAt ?? '-',
                  style: AppTypography.bodySmall.copyWith(
                    color: AppColors.textSecondary,
                  ),
                ),
              ],
            ),
          ),
          IconButton(
            icon: const Icon(
              Icons.visibility_rounded,
              color: AppColors.brandSecondary,
            ),
            onPressed: () => _previewPdf(context, ref, reportId),
            tooltip: 'Preview',
          ),
          IconButton(
            icon: const Icon(
              Icons.share_rounded,
              color: AppColors.textSecondary,
            ),
            onPressed: () => _shareReport(context, ref, reportId),
            tooltip: 'Share',
          ),
        ],
      ),
    );
  }

  Future<void> _previewPdf(
      BuildContext context, WidgetRef ref, String reportId) async {
    try {
      final service = ref.read(reportServiceProvider);
      final url = await service.getDownloadUrl(reportId);

      if (context.mounted) {
        Navigator.of(context).push(
          MaterialPageRoute(
            builder: (_) => Scaffold(
              appBar: AppBar(
                title: const Text('Report Preview'),
                backgroundColor: AppColors.bgPrimary,
                elevation: 0,
              ),
              body: PdfPreview(
                build: (_) => service.downloadPdfBytes(url),
                canChangePageFormat: false,
                canChangeOrientation: false,
              ),
            ),
          ),
        );
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load preview: $e')),
        );
      }
    }
  }

  Future<void> _shareReport(
      BuildContext context, WidgetRef ref, String reportId) async {
    try {
      final service = ref.read(reportServiceProvider);
      final url = await service.getDownloadUrl(reportId);
      final Uint8List bytes = await service.downloadPdfBytes(url);

      await Printing.sharePdf(
        bytes: bytes,
        filename: 'pet_health_report.pdf',
      );
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to share report: $e')),
        );
      }
    }
  }
}

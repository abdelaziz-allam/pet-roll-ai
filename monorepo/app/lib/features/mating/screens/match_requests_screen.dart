import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_names.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../models/mating_model.dart';
import '../providers/mating_provider.dart';

class MatchRequestsScreen extends ConsumerWidget {
  const MatchRequestsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    return DefaultTabController(
      length: 2,
      child: Scaffold(
        appBar: AppBar(
          title: Text(l10n.matchRequest),
          bottom: TabBar(
            tabs: [
              Tab(text: l10n.sent),
              Tab(text: l10n.received),
            ],
          ),
        ),
        body: const TabBarView(
          children: [
            _SentRequestsTab(),
            _ReceivedRequestsTab(),
          ],
        ),
      ),
    );
  }
}

class _SentRequestsTab extends ConsumerWidget {
  const _SentRequestsTab();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final requestsAsync = ref.watch(sentRequestsProvider);

    return requestsAsync.when(
      loading: () => const LoadingIndicator(),
      error: (error, _) => ErrorView(
        message: error.toString(),
        onRetry: () => ref.invalidate(sentRequestsProvider),
      ),
      data: (requests) {
        if (requests.isEmpty) {
          return EmptyState(
            title: l10n.noRequestsYet,
            subtitle: l10n.noRequestsYet,
            icon: Icons.send_outlined,
          );
        }
        return RefreshIndicator(
          onRefresh: () async => ref.invalidate(sentRequestsProvider),
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: requests.length,
            separatorBuilder: (_, __) => const SizedBox(height: 8),
            itemBuilder: (context, index) =>
                _SentRequestCard(request: requests[index]),
          ),
        );
      },
    );
  }
}

class _SentRequestCard extends ConsumerWidget {
  final MatchRequest request;

  const _SentRequestCard({required this.request});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    return Card(
      child: ListTile(
        contentPadding:
            const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        title: Text(
          l10n.matingRequest,
          style: AppTypography.label.copyWith(color: AppColors.textPrimary),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (request.message != null) ...[
              const SizedBox(height: 4),
              Text(
                request.message!,
                style:
                    AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
            const SizedBox(height: 4),
            Text(
              _formatDate(request.createdAt),
              style:
                  AppTypography.caption.copyWith(color: AppColors.textSecondary),
            ),
          ],
        ),
        trailing: _buildStatusBadge(context, request.status),
        onTap: request.status == MatchRequestStatus.accepted
            ? () => context.pushNamed(
                  RouteNames.chatRoom,
                  pathParameters: {'roomId': request.id},
                )
            : null,
      ),
    );
  }

  Widget _buildStatusBadge(BuildContext context, MatchRequestStatus status) {
    final l10n = AppLocalizations.of(context)!;
    Color bgColor;
    Color textColor;
    String label;

    switch (status) {
      case MatchRequestStatus.pending:
        bgColor = AppColors.warning.withOpacity(0.15);
        textColor = AppColors.warning;
        label = l10n.pending;
      case MatchRequestStatus.accepted:
        bgColor = AppColors.accentGreen.withOpacity(0.15);
        textColor = AppColors.accentGreenDark;
        label = l10n.accepted;
      case MatchRequestStatus.rejected:
        bgColor = AppColors.error.withOpacity(0.15);
        textColor = AppColors.error;
        label = l10n.rejected;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        label,
        style: AppTypography.caption.copyWith(
          color: textColor,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }
}

class _ReceivedRequestsTab extends ConsumerWidget {
  const _ReceivedRequestsTab();

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final requestsAsync = ref.watch(receivedRequestsProvider);

    return requestsAsync.when(
      loading: () => const LoadingIndicator(),
      error: (error, _) => ErrorView(
        message: error.toString(),
        onRetry: () => ref.invalidate(receivedRequestsProvider),
      ),
      data: (requests) {
        if (requests.isEmpty) {
          return EmptyState(
            title: l10n.noRequestsYet,
            subtitle: l10n.noRequestsYet,
            icon: Icons.inbox_outlined,
          );
        }
        return RefreshIndicator(
          onRefresh: () async => ref.invalidate(receivedRequestsProvider),
          child: ListView.separated(
            padding: const EdgeInsets.all(16),
            itemCount: requests.length,
            separatorBuilder: (_, __) => const SizedBox(height: 8),
            itemBuilder: (context, index) =>
                _ReceivedRequestCard(request: requests[index]),
          ),
        );
      },
    );
  }
}

class _ReceivedRequestCard extends ConsumerWidget {
  final MatchRequest request;

  const _ReceivedRequestCard({required this.request});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    l10n.matchRequest,
                    style: AppTypography.label
                        .copyWith(color: AppColors.textPrimary),
                  ),
                ),
                _buildStatusBadge(context, request.status),
              ],
            ),
            if (request.message != null) ...[
              const SizedBox(height: 8),
              Text(
                request.message!,
                style: AppTypography.body
                    .copyWith(color: AppColors.textSecondary),
              ),
            ],
            const SizedBox(height: 4),
            Text(
              _formatDate(request.createdAt),
              style: AppTypography.caption
                  .copyWith(color: AppColors.textSecondary),
            ),
            if (request.status == MatchRequestStatus.pending) ...[
              const SizedBox(height: 12),
              Row(
                children: [
                  Expanded(
                    child: OutlinedButton(
                      onPressed: () => _handleAction(context, ref, 'rejected'),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: AppColors.error,
                        side: const BorderSide(color: AppColors.error),
                      ),
                      child: Text(l10n.decline),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton(
                      onPressed: () => _handleAction(context, ref, 'accepted'),
                      style: ElevatedButton.styleFrom(
                        backgroundColor: AppColors.accentGreen,
                      ),
                      child: Text(l10n.accept),
                    ),
                  ),
                ],
              ),
            ],
            if (request.status == MatchRequestStatus.accepted) ...[
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  onPressed: () => context.pushNamed(
                    RouteNames.chatRoom,
                    pathParameters: {'roomId': request.id},
                  ),
                  icon: const Icon(Icons.chat_bubble_outline),
                  label: const Text('Open Chat'),
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }

  Widget _buildStatusBadge(BuildContext context, MatchRequestStatus status) {
    final l10n = AppLocalizations.of(context)!;
    Color bgColor;
    Color textColor;
    String label;

    switch (status) {
      case MatchRequestStatus.pending:
        bgColor = AppColors.warning.withOpacity(0.15);
        textColor = AppColors.warning;
        label = l10n.pending;
      case MatchRequestStatus.accepted:
        bgColor = AppColors.accentGreen.withOpacity(0.15);
        textColor = AppColors.accentGreenDark;
        label = l10n.accepted;
      case MatchRequestStatus.rejected:
        bgColor = AppColors.error.withOpacity(0.15);
        textColor = AppColors.error;
        label = l10n.rejected;
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Text(
        label,
        style: AppTypography.caption.copyWith(
          color: textColor,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  }

  Future<void> _handleAction(
      BuildContext context, WidgetRef ref, String status) async {
    final l10n = AppLocalizations.of(context)!;
    try {
      final matingService = ref.read(matingServiceProvider);
      await matingService.updateMatchRequest(request.id, {'status': status});
      ref.invalidate(receivedRequestsProvider);
      ref.invalidate(sentRequestsProvider);
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
              content: Text(
                  status == 'accepted' ? l10n.accepted : l10n.rejected)),
        );
      }
    } catch (e) {
      if (context.mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('${l10n.error}: $e')),
        );
      }
    }
  }

  String _formatDate(DateTime date) {
    return '${date.day}/${date.month}/${date.year}';
  }
}

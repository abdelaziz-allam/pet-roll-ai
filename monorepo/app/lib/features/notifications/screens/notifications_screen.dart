import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:timeago/timeago.dart' as timeago;

import '../../../core/router/route_names.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../models/notification_model.dart';
import '../providers/notification_provider.dart';

class NotificationsScreen extends ConsumerWidget {
  const NotificationsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final notificationsAsync = ref.watch(notificationsProvider(1));

    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Notifications',
          style: AppTypography.heading2.copyWith(color: AppColors.textPrimary),
        ),
        backgroundColor: AppColors.bgPrimary,
        elevation: 0,
        actions: [
          TextButton(
            onPressed: () async {
              await ref.read(notificationServiceProvider).markAllRead();
              ref.invalidate(notificationsProvider);
            },
            child: Text(
              'Mark all read',
              style: AppTypography.label.copyWith(color: AppColors.brandPrimary),
            ),
          ),
        ],
      ),
      body: RefreshIndicator(
        color: AppColors.brandPrimary,
        onRefresh: () async {
          ref.invalidate(notificationsProvider);
        },
        child: notificationsAsync.when(
          data: (notifications) {
            if (notifications.isEmpty) {
              return const EmptyState(
                title: 'No notifications yet',
                subtitle: 'You\'ll see updates about your pets here',
                icon: Icons.notifications_none_rounded,
              );
            }

            return ListView.separated(
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemCount: notifications.length,
              separatorBuilder: (_, __) => const Divider(height: 1),
              itemBuilder: (context, index) {
                final notification = notifications[index];
                return _NotificationTile(notification: notification);
              },
            );
          },
          loading: () => const LoadingIndicator(),
          error: (error, _) => ErrorView(
            message: error.toString(),
            onRetry: () => ref.invalidate(notificationsProvider),
          ),
        ),
      ),
    );
  }
}

class _NotificationTile extends ConsumerWidget {
  final AppNotification notification;

  const _NotificationTile({required this.notification});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      color: notification.read ? AppColors.bgPrimary : AppColors.bgSecondary,
      child: ListTile(
        contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        leading: CircleAvatar(
          backgroundColor: _iconColor.withOpacity(0.1),
          child: Icon(_icon, color: _iconColor, size: 20),
        ),
        title: Text(
          notification.title,
          style: AppTypography.label.copyWith(
            color: AppColors.textPrimary,
            fontWeight: notification.read ? FontWeight.w400 : FontWeight.w600,
          ),
        ),
        subtitle: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 4),
            Text(
              notification.body,
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.textSecondary,
              ),
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
            ),
            const SizedBox(height: 4),
            Text(
              timeago.format(notification.createdAt),
              style: AppTypography.caption.copyWith(
                color: AppColors.textHint,
              ),
            ),
          ],
        ),
        onTap: () {
          if (!notification.read) {
            ref.read(notificationServiceProvider).markRead(notification.id);
            ref.invalidate(notificationsProvider);
          }
          _navigateByType(context);
        },
      ),
    );
  }

  void _navigateByType(BuildContext context) {
    switch (notification.type) {
      case 'vaccination':
        context.goNamed(RouteNames.vaccinations);
      case 'health_record':
        context.goNamed(RouteNames.healthRecords);
      case 'pregnancy':
        context.goNamed(RouteNames.pregnancy);
      case 'schedule':
        context.goNamed(RouteNames.schedules);
      case 'mating':
        context.goNamed(RouteNames.mating);
      case 'chat':
        context.goNamed(RouteNames.chat);
      case 'report':
        context.goNamed(RouteNames.reports);
      default:
        break;
    }
  }

  IconData get _icon {
    switch (notification.type) {
      case 'vaccination':
        return Icons.vaccines_rounded;
      case 'health_record':
        return Icons.favorite_rounded;
      case 'pregnancy':
        return Icons.child_friendly_rounded;
      case 'schedule':
        return Icons.calendar_today_rounded;
      case 'mating':
        return Icons.pets_rounded;
      case 'chat':
        return Icons.chat_bubble_rounded;
      case 'report':
        return Icons.description_rounded;
      default:
        return Icons.notifications_rounded;
    }
  }

  Color get _iconColor {
    switch (notification.type) {
      case 'vaccination':
        return AppColors.accentGreen;
      case 'health_record':
        return AppColors.error;
      case 'pregnancy':
        return AppColors.brandPrimary;
      case 'schedule':
        return AppColors.warning;
      case 'mating':
        return AppColors.brandSecondary;
      case 'chat':
        return AppColors.info;
      case 'report':
        return AppColors.accentGreenDark;
      default:
        return AppColors.textSecondary;
    }
  }
}

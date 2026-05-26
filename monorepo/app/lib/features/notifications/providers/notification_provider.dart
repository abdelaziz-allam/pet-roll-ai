import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../models/notification_model.dart';
import '../services/notification_service.dart';

final notificationServiceProvider = Provider<NotificationService>((ref) {
  return NotificationService(ref.watch(apiClientProvider));
});

final notificationsProvider =
    FutureProvider.family<List<AppNotification>, int>((ref, page) async {
  final service = ref.watch(notificationServiceProvider);
  return service.getNotifications(page: page);
});

final unreadCountProvider = Provider<int>((ref) {
  final notificationsAsync = ref.watch(notificationsProvider(1));
  return notificationsAsync.when(
    data: (notifications) =>
        notifications.where((n) => !n.read).length,
    loading: () => 0,
    error: (_, __) => 0,
  );
});

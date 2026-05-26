import 'dart:convert';
import 'dart:io';

import 'package:firebase_messaging/firebase_messaging.dart';
import 'package:flutter/material.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/network/api_client.dart';
import '../../../core/router/route_names.dart';
import '../models/notification_model.dart';

class NotificationService {
  final ApiClient _api;
  final FlutterLocalNotificationsPlugin _localNotifications =
      FlutterLocalNotificationsPlugin();

  NotificationService(this._api);

  Future<List<AppNotification>> getNotifications({
    int page = 1,
    int limit = 20,
  }) async {
    final response = await _api.get(
      '/notifications',
      queryParameters: {'page': page, 'limit': limit},
    );
    final list = response.data['data'] as List;
    return list
        .map((json) => AppNotification.fromJson(json as Map<String, dynamic>))
        .toList();
  }

  Future<void> markRead(String id) async {
    await _api.put('/notifications/$id/read');
  }

  Future<void> markAllRead() async {
    await _api.put('/notifications/read-all');
  }

  Future<void> registerDevice(String token) async {
    await _api.post('/notifications/devices', data: {
      'token': token,
      'platform': Platform.isIOS ? 'ios' : 'android',
    });
  }

  Future<void> unregisterDevice(String token) async {
    await _api.delete('/notifications/devices/$token');
  }

  Future<void> initPush(BuildContext context) async {
    final messaging = FirebaseMessaging.instance;

    final settings = await messaging.requestPermission(
      alert: true,
      badge: true,
      sound: true,
    );

    if (settings.authorizationStatus == AuthorizationStatus.denied) {
      return;
    }

    final token = await messaging.getToken();
    if (token != null) {
      await registerDevice(token);
    }

    messaging.onTokenRefresh.listen((newToken) {
      registerDevice(newToken);
    });

    const androidChannel = AndroidNotificationChannel(
      'pet_roll_default',
      'Pet Folioo Notifications',
      description: 'Default notification channel for Pet Folioo',
      importance: Importance.high,
    );

    await _localNotifications
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(androidChannel);

    const androidSettings =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosSettings = DarwinInitializationSettings();
    const initSettings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );

    await _localNotifications.initialize(
      initSettings,
      onDidReceiveNotificationResponse: (details) {
        if (details.payload != null) {
          final data = jsonDecode(details.payload!) as Map<String, dynamic>;
          _handleNotificationTap(context, data);
        }
      },
    );

    FirebaseMessaging.onMessage.listen((message) {
      _showLocalNotification(message);
    });

    FirebaseMessaging.onMessageOpenedApp.listen((message) {
      _handleNotificationTap(context, message.data);
    });

    final initialMessage = await messaging.getInitialMessage();
    if (initialMessage != null) {
      _handleNotificationTap(context, initialMessage.data);
    }
  }

  void _showLocalNotification(RemoteMessage message) {
    final notification = message.notification;
    if (notification == null) return;

    _localNotifications.show(
      notification.hashCode,
      notification.title,
      notification.body,
      const NotificationDetails(
        android: AndroidNotificationDetails(
          'pet_roll_default',
          'Pet Folioo Notifications',
          importance: Importance.high,
          priority: Priority.high,
        ),
        iOS: DarwinNotificationDetails(),
      ),
      payload: jsonEncode(message.data),
    );
  }

  void _handleNotificationTap(
      BuildContext context, Map<String, dynamic> data) {
    final type = data['type'] as String?;

    switch (type) {
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
        context.goNamed(RouteNames.notifications);
    }
  }
}

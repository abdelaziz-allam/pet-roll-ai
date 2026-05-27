import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:timezone/timezone.dart' as tz;
import 'package:timezone/data/latest.dart' as tz_data;
import 'package:shared_preferences/shared_preferences.dart';

class NotificationService {
  static final NotificationService _instance = NotificationService._internal();
  factory NotificationService() => _instance;
  NotificationService._internal();

  final FlutterLocalNotificationsPlugin _plugin = FlutterLocalNotificationsPlugin();
  bool _initialized = false;

  Future<void> init() async {
    if (_initialized) return;
    tz_data.initializeTimeZones();

    const androidSettings = AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosSettings = DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );
    const settings = InitializationSettings(android: androidSettings, iOS: iosSettings);
    await _plugin.initialize(settings);
    _initialized = true;
  }

  Future<void> requestPermissions() async {
    await _plugin.resolvePlatformSpecificImplementation<AndroidFlutterLocalNotificationsPlugin>()
        ?.requestNotificationsPermission();
    await _plugin.resolvePlatformSpecificImplementation<IOSFlutterLocalNotificationsPlugin>()
        ?.requestPermissions(alert: true, badge: true, sound: true);
  }

  Future<int> getReminderCount() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getInt('notification_reminder_count') ?? 2;
  }

  Future<void> setReminderCount(int count) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setInt('notification_reminder_count', count);
  }

  Future<void> scheduleReminders({
    required int baseId,
    required String title,
    required String body,
    required DateTime targetDate,
    int? overrideCount,
  }) async {
    await init();
    final count = overrideCount ?? await getReminderCount();

    // Cancel any existing notifications for this base ID range
    for (int i = 0; i < 5; i++) {
      await _plugin.cancel(baseId + i);
    }

    final now = DateTime.now();
    final daysUntil = targetDate.difference(now).inDays;

    // Schedule reminders spread before the target date
    final intervals = _getReminderIntervals(daysUntil, count);
    for (int i = 0; i < intervals.length; i++) {
      final reminderDate = targetDate.subtract(Duration(days: intervals[i]));
      if (reminderDate.isAfter(now)) {
        await _scheduleNotification(
          id: baseId + i,
          title: title,
          body: intervals[i] == 0
              ? '$body - TODAY!'
              : '$body - in ${intervals[i]} day${intervals[i] > 1 ? 's' : ''}',
          scheduledDate: reminderDate,
        );
      }
    }

    // Always schedule one on the target date itself
    if (targetDate.isAfter(now)) {
      await _scheduleNotification(
        id: baseId + count,
        title: title,
        body: '$body - TODAY!',
        scheduledDate: targetDate,
      );
    }
  }

  Future<void> scheduleBirthdayNotification({
    required int notificationId,
    required String petName,
    required DateTime birthDate,
  }) async {
    await init();
    final now = DateTime.now();
    var nextBirthday = DateTime(now.year, birthDate.month, birthDate.day);
    if (nextBirthday.isBefore(now) || nextBirthday.isAtSameMomentAs(now)) {
      nextBirthday = DateTime(now.year + 1, birthDate.month, birthDate.day);
    }

    await _plugin.cancel(notificationId);
    await _scheduleNotification(
      id: notificationId,
      title: '🎂 Happy Birthday $petName!',
      body: 'Today is $petName\'s birthday! 🎁 Here\'s a special gift card for your furry friend!',
      scheduledDate: nextBirthday,
    );
  }

  Future<void> schedulePregnancyReminders({
    required int baseId,
    required String petName,
    required DateTime dueDate,
  }) async {
    await init();
    final count = await getReminderCount();

    for (int i = 0; i < 10; i++) {
      await _plugin.cancel(baseId + i);
    }

    final now = DateTime.now();

    // Delivery week notifications (7 days before, 3 days before, 1 day before, day of)
    final deliveryReminders = [7, 3, 1, 0];
    for (int i = 0; i < deliveryReminders.length; i++) {
      final date = dueDate.subtract(Duration(days: deliveryReminders[i]));
      if (date.isAfter(now)) {
        await _scheduleNotification(
          id: baseId + i,
          title: '🐾 Pregnancy Alert - $petName',
          body: deliveryReminders[i] == 0
              ? 'Expected delivery date is TODAY! Prepare for the arrival!'
              : 'Expected delivery in ${deliveryReminders[i]} day${deliveryReminders[i] > 1 ? 's' : ''}. Get everything ready!',
          scheduledDate: date,
        );
      }
    }

    // Additional early reminders based on user preference
    final daysUntil = dueDate.difference(now).inDays;
    if (daysUntil > 7) {
      final earlyIntervals = _getReminderIntervals(daysUntil - 7, count);
      for (int i = 0; i < earlyIntervals.length; i++) {
        final date = dueDate.subtract(Duration(days: earlyIntervals[i] + 7));
        if (date.isAfter(now)) {
          await _scheduleNotification(
            id: baseId + 4 + i,
            title: '🤰 Pregnancy Update - $petName',
            body: 'Due date is in ${earlyIntervals[i] + 7} days. Keep monitoring!',
            scheduledDate: date,
          );
        }
      }
    }
  }

  List<int> _getReminderIntervals(int daysUntil, int count) {
    if (daysUntil <= 0) return [];
    if (count <= 0) return [];

    if (daysUntil <= 3) return [1];

    final intervals = <int>[];
    final step = daysUntil ~/ (count + 1);
    for (int i = 1; i <= count; i++) {
      final days = step * i;
      if (days > 0 && days < daysUntil) {
        intervals.add(daysUntil - days);
      }
    }
    return intervals;
  }

  Future<void> _scheduleNotification({
    required int id,
    required String title,
    required String body,
    required DateTime scheduledDate,
  }) async {
    final tzDate = tz.TZDateTime.from(scheduledDate, tz.local);

    await _plugin.zonedSchedule(
      id,
      title,
      body,
      tzDate,
      const NotificationDetails(
        android: AndroidNotificationDetails(
          'pet_roll_reminders',
          'PET Roll Reminders',
          channelDescription: 'Reminders for pet health, vaccinations, and events',
          importance: Importance.high,
          priority: Priority.high,
        ),
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
        ),
      ),
      androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
      uiLocalNotificationDateInterpretation: UILocalNotificationDateInterpretation.absoluteTime,
    );
  }

  Future<void> cancelAll(int baseId, {int range = 10}) async {
    for (int i = 0; i < range; i++) {
      await _plugin.cancel(baseId + i);
    }
  }
}

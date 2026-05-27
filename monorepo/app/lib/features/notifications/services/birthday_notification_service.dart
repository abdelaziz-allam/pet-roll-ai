import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:timezone/data/latest_all.dart' as tz;
import 'package:timezone/timezone.dart' as tz;

final birthdayNotificationServiceProvider =
    Provider<BirthdayNotificationService>((ref) {
  return BirthdayNotificationService();
});

class BirthdayNotificationService {
  final FlutterLocalNotificationsPlugin _plugin =
      FlutterLocalNotificationsPlugin();
  bool _initialized = false;

  Future<void> init() async {
    if (_initialized) return;
    tz.initializeTimeZones();

    const androidSettings =
        AndroidInitializationSettings('@mipmap/ic_launcher');
    const iosSettings = DarwinInitializationSettings(
      requestAlertPermission: true,
      requestBadgePermission: true,
      requestSoundPermission: true,
    );
    const initSettings = InitializationSettings(
      android: androidSettings,
      iOS: iosSettings,
    );

    await _plugin.initialize(initSettings);

    await _plugin
        .resolvePlatformSpecificImplementation<
            AndroidFlutterLocalNotificationsPlugin>()
        ?.createNotificationChannel(const AndroidNotificationChannel(
          'pet_birthday',
          'Pet Birthdays',
          description: 'Birthday notifications for your pets',
          importance: Importance.high,
        ));

    _initialized = true;
  }

  int _notificationId(String petId) {
    return petId.hashCode.abs() % 100000;
  }

  Future<void> scheduleBirthdayNotification({
    required String petId,
    required String petName,
    required DateTime dateOfBirth,
  }) async {
    await init();
    await cancelBirthdayNotification(petId);

    final now = tz.TZDateTime.now(tz.local);
    var nextBirthday = tz.TZDateTime(
      tz.local,
      now.year,
      dateOfBirth.month,
      dateOfBirth.day,
      9,
    );

    if (nextBirthday.isBefore(now)) {
      nextBirthday = tz.TZDateTime(
        tz.local,
        now.year + 1,
        dateOfBirth.month,
        dateOfBirth.day,
        9,
      );
    }

    final age = nextBirthday.year - dateOfBirth.year;
    final id = _notificationId(petId);

    await _plugin.zonedSchedule(
      id,
      'Happy Birthday $petName!',
      '$petName turns $age today! Celebrate with your furry friend.',
      nextBirthday,
      const NotificationDetails(
        android: AndroidNotificationDetails(
          'pet_birthday',
          'Pet Birthdays',
          channelDescription: 'Birthday notifications for your pets',
          importance: Importance.high,
          priority: Priority.high,
          icon: '@mipmap/ic_launcher',
        ),
        iOS: DarwinNotificationDetails(
          presentAlert: true,
          presentBadge: true,
          presentSound: true,
        ),
      ),
      uiLocalNotificationDateInterpretation:
          UILocalNotificationDateInterpretation.absoluteTime,
      androidScheduleMode: AndroidScheduleMode.inexactAllowWhileIdle,
      matchDateTimeComponents: DateTimeComponents.dateAndTime,
    );
  }

  Future<void> cancelBirthdayNotification(String petId) async {
    await init();
    await _plugin.cancel(_notificationId(petId));
  }

  Future<void> scheduleAllBirthdays(
      List<Map<String, dynamic>> pets) async {
    await init();
    for (final pet in pets) {
      final dob = pet['dateOfBirth'] as DateTime?;
      if (dob != null) {
        await scheduleBirthdayNotification(
          petId: pet['id'] as String,
          petName: pet['name'] as String,
          dateOfBirth: dob,
        );
      }
    }
  }
}

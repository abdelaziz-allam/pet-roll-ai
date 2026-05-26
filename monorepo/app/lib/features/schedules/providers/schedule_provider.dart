import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/schedule_model.dart';
import '../services/schedule_service.dart';

final schedulesProvider =
    FutureProvider.family<List<Schedule>, String>((ref, petId) async {
  final service = ref.watch(scheduleServiceProvider);
  return service.getSchedules(petId);
});

final todaySchedulesProvider =
    Provider.family<AsyncValue<List<Schedule>>, String>((ref, petId) {
  final allSchedules = ref.watch(schedulesProvider(petId));
  return allSchedules.whenData(
    (schedules) => schedules.where((s) => s.active).toList(),
  );
});

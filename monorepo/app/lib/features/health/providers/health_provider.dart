import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/health_record_model.dart';
import '../services/health_service.dart';

final healthRecordsProvider =
    FutureProvider.family<List<HealthRecord>, String>((ref, petId) async {
  final service = ref.watch(healthServiceProvider);
  return service.getRecords(petId);
});

final healthRecordDetailProvider =
    FutureProvider.family<HealthRecord, (String, String)>((ref, params) async {
  final (petId, recordId) = params;
  final service = ref.watch(healthServiceProvider);
  return service.getRecord(petId, recordId);
});

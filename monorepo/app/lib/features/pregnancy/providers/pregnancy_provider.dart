import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/pregnancy_model.dart';
import '../services/pregnancy_service.dart';

final activePregnancyProvider =
    FutureProvider.family<Pregnancy?, String>((ref, petId) async {
  final service = ref.watch(pregnancyServiceProvider);
  return service.getActive(petId);
});

final pregnancyMilestonesProvider =
    FutureProvider.family<List<Milestone>, (String, String)>((ref, params) async {
  final (petId, pregnancyId) = params;
  final service = ref.watch(pregnancyServiceProvider);
  return service.getMilestones(petId, pregnancyId);
});

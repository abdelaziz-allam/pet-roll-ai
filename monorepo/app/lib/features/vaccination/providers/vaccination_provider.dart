import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/vaccination_model.dart';
import '../services/vaccination_service.dart';

final vaccinationsProvider =
    FutureProvider.family<List<Vaccination>, String>((ref, petId) async {
  final service = ref.watch(vaccinationServiceProvider);
  return service.getVaccinations(petId);
});

final vaccinationDetailProvider =
    FutureProvider.family<Vaccination, (String, String)>((ref, params) async {
  final (petId, vaccinationId) = params;
  final service = ref.watch(vaccinationServiceProvider);
  final vaccinations = await service.getVaccinations(petId);
  return vaccinations.firstWhere((v) => v.id == vaccinationId);
});

final upcomingVaccinationsProvider =
    FutureProvider.family<List<Vaccination>, String>((ref, petId) async {
  final service = ref.watch(vaccinationServiceProvider);
  return service.getUpcoming(petId);
});

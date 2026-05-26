import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/pet_summary_model.dart';
import '../services/pet_summary_service.dart';
import '../../pets/providers/pet_provider.dart';

final petSummaryProvider = FutureProvider<PetSummaryModel>((ref) async {
  final selectedPetId = ref.watch(selectedPetProvider);
  final petsAsync = ref.watch(userPetsProvider);
  final pets = petsAsync.valueOrNull ?? [];

  final petId = selectedPetId ?? (pets.isNotEmpty ? pets.first.id : null);
  if (petId == null) return PetSummaryModel.empty;

  final service = ref.watch(petSummaryServiceProvider);
  return service.getSummary(petId);
});

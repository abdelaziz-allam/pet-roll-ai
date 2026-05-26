import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/pet_model.dart';
import '../services/pet_service.dart';

export '../services/pet_service.dart' show petServiceProvider;

final userPetsProvider = FutureProvider<List<PetModel>>((ref) async {
  final petService = ref.watch(petServiceProvider);
  return petService.getUserPets();
});

final petDetailProvider = FutureProvider.family<PetModel, String>((ref, petId) async {
  final petService = ref.watch(petServiceProvider);
  return petService.getPetById(petId);
});

final breedsProvider = FutureProvider.family<List<Map<String, dynamic>>, String?>((ref, species) async {
  final petService = ref.watch(petServiceProvider);
  return petService.searchBreeds(species: species);
});

final selectedPetProvider = StateProvider<String?>((ref) => null);

import '../../../core/services/api_service.dart';
import '../models/vaccination_model.dart';

class VaccinationService {
  final ApiService _api = ApiService();

  Future<Map<String, dynamic>> logVaccination(String petId, Map<String, dynamic> data) async {
    return await _api.post('/pets/$petId/vaccinations', data);
  }

  Future<List<Vaccination>> getVaccinations(String petId) async {
    final data = await _api.get('/pets/$petId/vaccinations');
    final List<dynamic> items = data is List ? data : (data['vaccinations'] ?? data['data'] ?? []);
    return items.map((e) => Vaccination.fromJson(e as Map<String, dynamic>)).toList();
  }

  Future<List<Vaccination>> getUpcoming(String petId) async {
    final data = await _api.get('/pets/$petId/vaccinations/upcoming');
    final List<dynamic> items = data is List ? data : (data['vaccinations'] ?? data['data'] ?? []);
    return items.map((e) => Vaccination.fromJson(e as Map<String, dynamic>)).toList();
  }

  Future<Map<String, dynamic>> updateVaccination(String petId, String id, Map<String, dynamic> data) async {
    return await _api.put('/pets/$petId/vaccinations/$id', data);
  }

  Future<void> deleteVaccination(String petId, String id) async {
    await _api.delete('/pets/$petId/vaccinations/$id');
  }
}

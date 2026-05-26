import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../services/report_service.dart';

final reportServiceProvider = Provider<ReportService>((ref) {
  return ReportService(ref.watch(apiClientProvider));
});

final petReportsProvider =
    FutureProvider.family<List<Map<String, dynamic>>, String>(
        (ref, petId) async {
  final service = ref.watch(reportServiceProvider);
  return service.getReports(petId);
});

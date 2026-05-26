import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/tip_model.dart';
import '../services/tips_service.dart';

final dailyTipProvider = FutureProvider<TipModel>((ref) async {
  final service = ref.watch(tipsServiceProvider);
  return service.getDailyTip();
});

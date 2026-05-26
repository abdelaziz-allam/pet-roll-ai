import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/chat_model.dart';
import '../services/chat_service.dart';

export '../services/chat_service.dart' show chatServiceProvider;

final chatRoomsProvider = FutureProvider<List<ChatRoom>>((ref) async {
  final chatService = ref.watch(chatServiceProvider);
  return chatService.getRooms();
});

final chatMessagesProvider =
    StreamProvider.family<List<ChatMessage>, String>((ref, roomId) {
  final chatService = ref.watch(chatServiceProvider);
  return chatService.getMessages(roomId);
});

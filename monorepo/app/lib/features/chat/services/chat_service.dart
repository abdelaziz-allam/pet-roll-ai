import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../models/chat_model.dart';

final chatServiceProvider = Provider<ChatService>((ref) {
  return ChatService(ref.watch(apiClientProvider));
});

class ChatService {
  final ApiClient _apiClient;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  ChatService(this._apiClient);

  Future<List<ChatRoom>> getRooms() async {
    final response = await _apiClient.get('/chat/rooms');
    final responseData = response.data;
    final List list = responseData is List
        ? responseData
        : (responseData['rooms'] ?? []) as List;
    return list
        .map((e) => ChatRoom.fromJson(e as Map<String, dynamic>))
        .toList();
  }

  Future<ChatRoom> getRoomById(String roomId) async {
    final response = await _apiClient.get('/chat/rooms/$roomId');
    return ChatRoom.fromJson(response.data as Map<String, dynamic>);
  }

  Stream<List<ChatMessage>> getMessages(String roomId) {
    return _firestore
        .collection('chat_rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('createdAt', descending: true)
        .snapshots()
        .map((snapshot) => snapshot.docs
            .map((doc) => ChatMessage.fromJson({
                  'id': doc.id,
                  ...doc.data(),
                }))
            .toList());
  }

  Future<void> sendMessage(
    String roomId, {
    String? text,
    String? imageUrl,
  }) async {
    final type = imageUrl != null ? ChatMessageType.image : ChatMessageType.text;
    await _firestore
        .collection('chat_rooms')
        .doc(roomId)
        .collection('messages')
        .add({
      'roomId': roomId,
      'senderId': '', // Will be set by backend/security rules
      'text': text,
      'imageUrl': imageUrl,
      'type': type.name,
      'createdAt': FieldValue.serverTimestamp(),
    });
  }
}

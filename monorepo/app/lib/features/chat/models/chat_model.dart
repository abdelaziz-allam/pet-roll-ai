import '../../../core/utils/date_parsing.dart';

enum ChatMessageType { text, image }

class ChatRoom {
  final String id;
  final List<String> participants;
  final String? listingId;
  final String? matchRequestId;
  final DateTime createdAt;
  final String? lastMessage;
  final DateTime? lastMessageAt;
  final String? otherUserName;
  final String? otherUserPhoto;

  const ChatRoom({
    required this.id,
    required this.participants,
    this.listingId,
    this.matchRequestId,
    required this.createdAt,
    this.lastMessage,
    this.lastMessageAt,
    this.otherUserName,
    this.otherUserPhoto,
  });

  factory ChatRoom.fromJson(Map<String, dynamic> json) {
    return ChatRoom(
      id: json['id'] as String,
      participants: (json['participants'] as List)
          .map((e) => e as String)
          .toList(),
      listingId: json['listingId'] as String?,
      matchRequestId: json['matchRequestId'] as String?,
      createdAt: parseDateTime(json['createdAt']) ?? DateTime.now(),
      lastMessage: json['lastMessage'] as String?,
      lastMessageAt: parseDateTime(json['lastMessageAt']),
      otherUserName: json['otherUserName'] as String?,
      otherUserPhoto: json['otherUserPhoto'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'participants': participants,
      'listingId': listingId,
      'matchRequestId': matchRequestId,
      'createdAt': createdAt.toIso8601String(),
      'lastMessage': lastMessage,
      'lastMessageAt': lastMessageAt?.toIso8601String(),
      'otherUserName': otherUserName,
      'otherUserPhoto': otherUserPhoto,
    };
  }
}

class ChatMessage {
  final String id;
  final String roomId;
  final String senderId;
  final String? text;
  final String? imageUrl;
  final ChatMessageType type;
  final DateTime createdAt;

  const ChatMessage({
    required this.id,
    required this.roomId,
    required this.senderId,
    this.text,
    this.imageUrl,
    required this.type,
    required this.createdAt,
  });

  factory ChatMessage.fromJson(Map<String, dynamic> json) {
    return ChatMessage(
      id: json['id'] as String? ?? '',
      roomId: json['roomId'] as String,
      senderId: json['senderId'] as String,
      text: json['text'] as String?,
      imageUrl: json['imageUrl'] as String?,
      type: ChatMessageType.values.firstWhere(
        (e) => e.name == json['type'],
        orElse: () => ChatMessageType.text,
      ),
      createdAt: json['createdAt'] is String
          ? DateTime.parse(json['createdAt'] as String)
          : (json['createdAt']?.toDate() ?? DateTime.now()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'roomId': roomId,
      'senderId': senderId,
      'text': text,
      'imageUrl': imageUrl,
      'type': type.name,
      'createdAt': createdAt.toIso8601String(),
    };
  }
}

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/avatar_widget.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../models/chat_model.dart';
import '../providers/chat_provider.dart';
import '../services/chat_service.dart';

class ChatRoomScreen extends ConsumerStatefulWidget {
  final String roomId;

  const ChatRoomScreen({super.key, required this.roomId});

  @override
  ConsumerState<ChatRoomScreen> createState() => _ChatRoomScreenState();
}

class _ChatRoomScreenState extends ConsumerState<ChatRoomScreen> {
  final _messageController = TextEditingController();
  final _scrollController = ScrollController();
  ChatRoom? _room;
  bool _isLoadingRoom = true;

  @override
  void initState() {
    super.initState();
    _loadRoom();
  }

  Future<void> _loadRoom() async {
    try {
      final chatService = ref.read(chatServiceProvider);
      final room = await chatService.getRoomById(widget.roomId);
      if (mounted) {
        setState(() {
          _room = room;
          _isLoadingRoom = false;
        });
      }
    } catch (_) {
      if (mounted) {
        setState(() => _isLoadingRoom = false);
      }
    }
  }

  @override
  void dispose() {
    _messageController.dispose();
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final messagesAsync = ref.watch(chatMessagesProvider(widget.roomId));

    return Scaffold(
      appBar: AppBar(
        titleSpacing: 0,
        title: _isLoadingRoom
            ? Text(l10n.chat)
            : Row(
                children: [
                  AvatarWidget(
                    imageUrl: _room?.otherUserPhoto,
                    name: _room?.otherUserName,
                    size: 36,
                    fallbackIcon: Icons.person,
                  ),
                  const SizedBox(width: 10),
                  Text(
                    _room?.otherUserName ?? l10n.chat,
                    style: AppTypography.heading3
                        .copyWith(color: AppColors.textPrimary),
                  ),
                ],
              ),
      ),
      body: Column(
        children: [
          Expanded(
            child: messagesAsync.when(
              loading: () => const LoadingIndicator(),
              error: (error, _) => ErrorView(message: error.toString()),
              data: (messages) => _buildMessageList(messages),
            ),
          ),
          _buildInputBar(),
        ],
      ),
    );
  }

  Widget _buildMessageList(List<ChatMessage> messages) {
    if (messages.isEmpty) {
      return Center(
        child: Text(
          AppLocalizations.of(context)!.noMessagesSayHello,
          style: const TextStyle(color: AppColors.textSecondary),
        ),
      );
    }

    return ListView.builder(
      controller: _scrollController,
      reverse: true,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      itemCount: messages.length,
      itemBuilder: (context, index) {
        final message = messages[index];
        final showDateSeparator = _shouldShowDateSeparator(messages, index);

        return Column(
          children: [
            if (showDateSeparator) _buildDateSeparator(message.createdAt),
            _MessageBubble(
              message: message,
              isSent: _isSentByCurrentUser(message),
            ),
          ],
        );
      },
    );
  }

  bool _shouldShowDateSeparator(List<ChatMessage> messages, int index) {
    if (index == messages.length - 1) return true;
    final current = messages[index].createdAt;
    final previous = messages[index + 1].createdAt;
    return current.day != previous.day ||
        current.month != previous.month ||
        current.year != previous.year;
  }

  bool _isSentByCurrentUser(ChatMessage message) {
    if (_room == null || _room!.participants.isEmpty) return false;
    return message.senderId == _room!.participants.first;
  }

  Widget _buildDateSeparator(DateTime date) {
    final now = DateTime.now();
    String label;

    if (date.year == now.year &&
        date.month == now.month &&
        date.day == now.day) {
      label = AppLocalizations.of(context)!.today;
    } else if (date.year == now.year &&
        date.month == now.month &&
        date.day == now.day - 1) {
      label = AppLocalizations.of(context)!.yesterday;
    } else {
      label = '${date.day}/${date.month}/${date.year}';
    }

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 12),
      child: Center(
        child: Container(
          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 4),
          decoration: BoxDecoration(
            color: AppColors.bgTertiary,
            borderRadius: BorderRadius.circular(12),
          ),
          child: Text(
            label,
            style:
                AppTypography.caption.copyWith(color: AppColors.textSecondary),
          ),
        ),
      ),
    );
  }

  Widget _buildInputBar() {
    return Container(
      padding: EdgeInsets.only(
        left: 12,
        right: 8,
        top: 8,
        bottom: MediaQuery.of(context).padding.bottom + 8,
      ),
      decoration: const BoxDecoration(
        color: AppColors.bgPrimary,
        border: Border(
          top: BorderSide(color: AppColors.borderLight),
        ),
      ),
      child: Row(
        children: [
          IconButton(
            icon: const Icon(Icons.camera_alt_outlined,
                color: AppColors.textSecondary),
            onPressed: _sendImage,
          ),
          Expanded(
            child: TextField(
              controller: _messageController,
              textInputAction: TextInputAction.send,
              onSubmitted: (_) => _sendTextMessage(),
              decoration: InputDecoration(
                hintText: l10n.typeAMessage,
                hintStyle: AppTypography.body
                    .copyWith(color: AppColors.textHint),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(24),
                  borderSide: const BorderSide(color: AppColors.borderDefault),
                ),
                contentPadding:
                    const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
                isDense: true,
              ),
            ),
          ),
          const SizedBox(width: 4),
          IconButton(
            icon: const Icon(Icons.send, color: AppColors.brandPrimary),
            onPressed: _sendTextMessage,
          ),
        ],
      ),
    );
  }

  Future<void> _sendTextMessage() async {
    final text = _messageController.text.trim();
    if (text.isEmpty) return;

    _messageController.clear();

    final chatService = ref.read(chatServiceProvider);
    await chatService.sendMessage(widget.roomId, text: text);
  }

  Future<void> _sendImage() async {
    // Image picker integration placeholder
    // In production, use image_picker to select an image,
    // upload it to storage, then send the URL
  }
}

class _MessageBubble extends StatelessWidget {
  final ChatMessage message;
  final bool isSent;

  const _MessageBubble({
    required this.message,
    required this.isSent,
  });

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: isSent ? Alignment.centerRight : Alignment.centerLeft,
      child: Container(
        constraints: BoxConstraints(
          maxWidth: MediaQuery.of(context).size.width * 0.75,
        ),
        margin: const EdgeInsets.symmetric(vertical: 3),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
        decoration: BoxDecoration(
          color: isSent
              ? AppColors.brandPrimary.withOpacity(0.9)
              : AppColors.bgTertiary,
          borderRadius: BorderRadius.only(
            topLeft: const Radius.circular(16),
            topRight: const Radius.circular(16),
            bottomLeft: isSent
                ? const Radius.circular(16)
                : const Radius.circular(4),
            bottomRight: isSent
                ? const Radius.circular(4)
                : const Radius.circular(16),
          ),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            if (message.type == ChatMessageType.image &&
                message.imageUrl != null)
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.network(
                  message.imageUrl!,
                  width: 200,
                  fit: BoxFit.cover,
                ),
              ),
            if (message.text != null && message.text!.isNotEmpty)
              Text(
                message.text!,
                style: AppTypography.body.copyWith(
                  color: isSent ? AppColors.textInverse : AppColors.textPrimary,
                ),
              ),
            const SizedBox(height: 2),
            Text(
              _formatMessageTime(message.createdAt),
              style: AppTypography.caption.copyWith(
                color: isSent
                    ? AppColors.textInverse.withOpacity(0.7)
                    : AppColors.textSecondary,
                fontSize: 9,
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _formatMessageTime(DateTime dateTime) {
    final hour = dateTime.hour.toString().padLeft(2, '0');
    final minute = dateTime.minute.toString().padLeft(2, '0');
    return '$hour:$minute';
  }
}

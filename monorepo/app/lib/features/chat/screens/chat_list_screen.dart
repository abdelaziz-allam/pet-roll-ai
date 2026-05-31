import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/router/route_names.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/avatar_widget.dart';
import '../../../core/widgets/empty_state.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../../l10n/generated/app_localizations.dart';
import '../models/chat_model.dart';
import '../providers/chat_provider.dart';

class ChatListScreen extends ConsumerWidget {
  const ChatListScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final roomsAsync = ref.watch(chatRoomsProvider);

    return Scaffold(
      appBar: AppBar(title: Text(l10n.messages)),
      body: roomsAsync.when(
        loading: () => const LoadingIndicator(),
        error: (error, _) => ErrorView(
          message: error.toString(),
          onRetry: () => ref.invalidate(chatRoomsProvider),
        ),
        data: (rooms) {
          if (rooms.isEmpty) {
            return EmptyState(
              title: l10n.noMessagesYet,
              subtitle: l10n.startChattingSubtitle,
              icon: Icons.chat_bubble_outline,
            );
          }
          return RefreshIndicator(
            onRefresh: () async => ref.invalidate(chatRoomsProvider),
            child: ListView.separated(
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemCount: rooms.length,
              separatorBuilder: (_, __) => const Divider(
                height: 1,
                indent: 76,
              ),
              itemBuilder: (context, index) =>
                  _ChatRoomTile(room: rooms[index]),
            ),
          );
        },
      ),
    );
  }
}

class _ChatRoomTile extends StatelessWidget {
  final ChatRoom room;

  const _ChatRoomTile({required this.room});

  @override
  Widget build(BuildContext context) {
    final hasUnread = room.lastMessage != null;

    return ListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
      leading: AvatarWidget(
        imageUrl: room.otherUserPhoto,
        name: room.otherUserName,
        size: 52,
        fallbackIcon: Icons.person,
      ),
      title: Text(
        room.otherUserName ?? 'Unknown',
        style: AppTypography.label.copyWith(
          color: AppColors.textPrimary,
          fontWeight: hasUnread ? FontWeight.w600 : FontWeight.w500,
        ),
      ),
      subtitle: room.lastMessage != null
          ? Text(
              room.lastMessage!,
              style: AppTypography.bodySmall.copyWith(
                color: AppColors.textSecondary,
                fontWeight:
                    hasUnread ? FontWeight.w500 : FontWeight.w400,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            )
          : null,
      trailing: room.lastMessageAt != null
          ? Text(
              _formatTime(room.lastMessageAt!),
              style: AppTypography.caption
                  .copyWith(color: AppColors.textSecondary),
            )
          : null,
      onTap: () => context.pushNamed(
        RouteNames.chatRoom,
        pathParameters: {'roomId': room.id},
      ),
    );
  }

  String _formatTime(DateTime dateTime) {
    final now = DateTime.now();
    final diff = now.difference(dateTime);

    if (diff.inDays == 0) {
      final hour = dateTime.hour.toString().padLeft(2, '0');
      final minute = dateTime.minute.toString().padLeft(2, '0');
      return '$hour:$minute';
    } else if (diff.inDays == 1) {
      return 'Yesterday';
    } else if (diff.inDays < 7) {
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      return days[dateTime.weekday - 1];
    }
    return '${dateTime.day}/${dateTime.month}';
  }
}

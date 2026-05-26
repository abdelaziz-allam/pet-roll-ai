import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:package_info_plus/package_info_plus.dart';

import '../../../core/router/route_names.dart';
import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/widgets/avatar_widget.dart';
import '../../auth/providers/auth_provider.dart';

class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  bool _pushEnabled = true;
  TimeOfDay _reminderTime = const TimeOfDay(hour: 9, minute: 0);
  String _appVersion = '';

  @override
  void initState() {
    super.initState();
    _loadVersion();
  }

  Future<void> _loadVersion() async {
    final info = await PackageInfo.fromPlatform();
    if (mounted) {
      setState(() => _appVersion = '${info.version} (${info.buildNumber})');
    }
  }

  @override
  Widget build(BuildContext context) {
    final profileAsync = ref.watch(userProfileProvider);

    return Scaffold(
      backgroundColor: AppColors.bgSecondary,
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(child: _buildHeader(profileAsync)),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.fromLTRB(20, 24, 20, 100),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _SettingsGroup(
                    title: 'Account',
                    children: [
                      _SettingsTile(
                        icon: Icons.person_rounded,
                        iconColor: AppColors.brandPrimary,
                        iconBg: AppColors.brandPrimary.withOpacity(0.1),
                        title: 'Edit Profile',
                        onTap: () => context.goNamed(RouteNames.editProfile),
                      ),
                      _SettingsTile(
                        icon: Icons.lock_rounded,
                        iconColor: AppColors.brandSecondary,
                        iconBg: AppColors.brandSecondary.withOpacity(0.1),
                        title: 'Change Password',
                        onTap: () {},
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  _SettingsGroup(
                    title: 'Notifications',
                    children: [
                      _SettingsSwitch(
                        icon: Icons.notifications_rounded,
                        iconColor: AppColors.accentOrange,
                        iconBg: AppColors.accentOrange.withOpacity(0.1),
                        title: 'Push Notifications',
                        value: _pushEnabled,
                        onChanged: (v) => setState(() => _pushEnabled = v),
                      ),
                      _SettingsTile(
                        icon: Icons.schedule_rounded,
                        iconColor: AppColors.info,
                        iconBg: AppColors.info.withOpacity(0.1),
                        title: 'Reminder Time',
                        trailing: Text(
                          _reminderTime.format(context),
                          style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
                        ),
                        onTap: () async {
                          final picked = await showTimePicker(
                            context: context,
                            initialTime: _reminderTime,
                          );
                          if (picked != null) setState(() => _reminderTime = picked);
                        },
                      ),
                    ],
                  ),
                  const SizedBox(height: 20),
                  _SettingsGroup(
                    title: 'App',
                    children: [
                      _SettingsTile(
                        icon: Icons.language_rounded,
                        iconColor: AppColors.brandTertiary,
                        iconBg: AppColors.brandTertiary.withOpacity(0.1),
                        title: 'Language',
                        trailing: Text(
                          'English',
                          style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
                        ),
                        onTap: () {},
                      ),
                      _SettingsTile(
                        icon: Icons.info_rounded,
                        iconColor: AppColors.textSecondary,
                        iconBg: AppColors.bgTertiary,
                        title: 'About',
                        onTap: () {},
                      ),
                      _SettingsTile(
                        icon: Icons.shield_rounded,
                        iconColor: AppColors.success,
                        iconBg: AppColors.success.withOpacity(0.1),
                        title: 'Privacy Policy',
                        onTap: () {},
                      ),
                    ],
                  ),
                  const SizedBox(height: 28),
                  AppButton(
                    label: 'Log Out',
                    variant: AppButtonVariant.outline,
                    onPressed: () async {
                      await ref.read(authControllerProvider.notifier).logout();
                      if (context.mounted) context.goNamed(RouteNames.login);
                    },
                  ),
                  const SizedBox(height: 16),
                  Center(
                    child: Text(
                      'Version $_appVersion',
                      style: AppTypography.caption.copyWith(color: AppColors.textHint),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeader(AsyncValue<Map<String, dynamic>?> profileAsync) {
    return profileAsync.when(
      data: (profile) {
        final name = profile?['displayName'] ?? 'User';
        final email = profile?['email'] ?? '';
        final avatarUrl = profile?['avatarUrl'] as String?;

        return Container(
          padding: EdgeInsets.fromLTRB(
            20, MediaQuery.of(context).padding.top + 20, 20, 32,
          ),
          decoration: const BoxDecoration(
            gradient: AppColors.headerGradient,
            borderRadius: BorderRadius.vertical(bottom: Radius.circular(32)),
          ),
          child: Column(
            children: [
              Container(
                padding: const EdgeInsets.all(4),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.white.withOpacity(0.4), width: 3),
                ),
                child: AvatarWidget(imageUrl: avatarUrl, name: name, size: 80),
              ),
              const SizedBox(height: 14),
              Text(
                name,
                style: AppTypography.heading2.copyWith(color: Colors.white),
              ),
              const SizedBox(height: 4),
              Text(
                email,
                style: AppTypography.bodySmall.copyWith(
                  color: Colors.white.withOpacity(0.8),
                ),
              ),
            ],
          ),
        );
      },
      loading: () => Container(
        height: 220,
        decoration: const BoxDecoration(
          gradient: AppColors.headerGradient,
          borderRadius: BorderRadius.vertical(bottom: Radius.circular(32)),
        ),
      ),
      error: (_, __) => const SizedBox.shrink(),
    );
  }
}

class _SettingsGroup extends StatelessWidget {
  final String title;
  final List<Widget> children;

  const _SettingsGroup({required this.title, required this.children});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: AppTypography.bodySmall.copyWith(
            color: AppColors.textSecondary,
            fontWeight: FontWeight.w600,
            letterSpacing: 0.5,
          ),
        ),
        const SizedBox(height: 10),
        Container(
          decoration: BoxDecoration(
            color: AppColors.bgPrimary,
            borderRadius: BorderRadius.circular(20),
            boxShadow: [
              BoxShadow(
                color: Colors.black.withOpacity(0.03),
                blurRadius: 12,
                offset: const Offset(0, 4),
              ),
            ],
          ),
          child: Column(
            children: [
              for (int i = 0; i < children.length; i++) ...[
                children[i],
                if (i < children.length - 1)
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Divider(height: 1, color: AppColors.borderLight),
                  ),
              ],
            ],
          ),
        ),
      ],
    );
  }
}

class _SettingsTile extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final Color iconBg;
  final String title;
  final Widget? trailing;
  final VoidCallback onTap;

  const _SettingsTile({
    required this.icon,
    required this.iconColor,
    required this.iconBg,
    required this.title,
    this.trailing,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(20),
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(8),
              decoration: BoxDecoration(
                color: iconBg,
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(icon, size: 20, color: iconColor),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Text(
                title,
                style: AppTypography.body.copyWith(
                  color: AppColors.textPrimary,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ),
            trailing ?? const Icon(Icons.chevron_right_rounded, size: 20, color: AppColors.textHint),
          ],
        ),
      ),
    );
  }
}

class _SettingsSwitch extends StatelessWidget {
  final IconData icon;
  final Color iconColor;
  final Color iconBg;
  final String title;
  final bool value;
  final ValueChanged<bool> onChanged;

  const _SettingsSwitch({
    required this.icon,
    required this.iconColor,
    required this.iconBg,
    required this.title,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: iconBg,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, size: 20, color: iconColor),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Text(
              title,
              style: AppTypography.body.copyWith(
                color: AppColors.textPrimary,
                fontWeight: FontWeight.w500,
              ),
            ),
          ),
          Switch.adaptive(
            value: value,
            onChanged: onChanged,
            activeColor: AppColors.brandPrimary,
          ),
        ],
      ),
    );
  }
}

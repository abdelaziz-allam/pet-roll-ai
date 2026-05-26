import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';

class HomeShell extends StatelessWidget {
  final Widget child;

  const HomeShell({super.key, required this.child});

  int _currentIndex(BuildContext context) {
    final location = GoRouterState.of(context).matchedLocation;
    if (location.startsWith('/home')) return 0;
    if (location.startsWith('/pets')) return 1;
    if (location.startsWith('/mating')) return 2;
    if (location.startsWith('/chat')) return 3;
    if (location.startsWith('/profile')) return 4;
    return 0;
  }

  void _onTabTapped(BuildContext context, int index) {
    switch (index) {
      case 0:
        context.go('/home');
      case 1:
        context.go('/pets');
      case 2:
        context.go('/mating');
      case 3:
        context.go('/chat');
      case 4:
        context.go('/profile');
    }
  }

  @override
  Widget build(BuildContext context) {
    final selectedIndex = _currentIndex(context);

    return Scaffold(
      body: child,
      extendBody: true,
      bottomNavigationBar: Container(
        margin: const EdgeInsets.fromLTRB(16, 0, 16, 12),
        decoration: BoxDecoration(
          color: AppColors.navBackground,
          borderRadius: BorderRadius.circular(28),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.08),
              blurRadius: 24,
              offset: const Offset(0, 4),
              spreadRadius: 0,
            ),
          ],
        ),
        child: SafeArea(
          top: false,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 8),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _NavItem(
                  icon: Icons.home_rounded,
                  label: 'Home',
                  isActive: selectedIndex == 0,
                  onTap: () => _onTabTapped(context, 0),
                ),
                _NavItem(
                  icon: Icons.pets_rounded,
                  label: 'Pets',
                  isActive: selectedIndex == 1,
                  onTap: () => _onTabTapped(context, 1),
                ),
                _NavItem(
                  icon: Icons.favorite_rounded,
                  label: 'Mating',
                  isActive: selectedIndex == 2,
                  onTap: () => _onTabTapped(context, 2),
                  isPrimary: true,
                ),
                _NavItem(
                  icon: Icons.chat_bubble_rounded,
                  label: 'Chat',
                  isActive: selectedIndex == 3,
                  onTap: () => _onTabTapped(context, 3),
                ),
                _NavItem(
                  icon: Icons.person_rounded,
                  label: 'Profile',
                  isActive: selectedIndex == 4,
                  onTap: () => _onTabTapped(context, 4),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _NavItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final bool isActive;
  final bool isPrimary;
  final VoidCallback onTap;

  const _NavItem({
    required this.icon,
    required this.label,
    required this.isActive,
    required this.onTap,
    this.isPrimary = false,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 250),
        curve: Curves.easeInOut,
        padding: EdgeInsets.symmetric(
          horizontal: isActive ? 16 : 12,
          vertical: 8,
        ),
        decoration: BoxDecoration(
          color: isActive
              ? (isPrimary
                  ? AppColors.brandPrimary
                  : AppColors.brandPrimary.withOpacity(0.1))
              : Colors.transparent,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              icon,
              color: isActive
                  ? (isPrimary ? Colors.white : AppColors.brandPrimary)
                  : AppColors.navInactive,
              size: 22,
            ),
            if (isActive) ...[
              const SizedBox(width: 6),
              Text(
                label,
                style: AppTypography.caption.copyWith(
                  color: isPrimary ? Colors.white : AppColors.brandPrimary,
                  fontWeight: FontWeight.w700,
                  fontSize: 11,
                ),
              ),
            ],
          ],
        ),
      ),
    );
  }
}

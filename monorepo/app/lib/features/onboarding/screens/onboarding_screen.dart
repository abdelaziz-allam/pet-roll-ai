import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/widgets/app_button.dart';
import '../../../core/storage/local_storage.dart';
import '../../../core/router/route_names.dart';

class _OnboardingPage {
  final String title;
  final String description;
  final IconData icon;
  final Color iconColor;

  const _OnboardingPage({
    required this.title,
    required this.description,
    required this.icon,
    required this.iconColor,
  });
}

const _pages = [
  _OnboardingPage(
    title: 'Track Your Pet\'s Health',
    description: 'Keep medical records, vaccination schedules, and health history all in one place.',
    icon: Icons.favorite,
    iconColor: AppColors.brandPrimary,
  ),
  _OnboardingPage(
    title: 'Smart Reminders',
    description: 'Never miss a vaccination, feeding time, or vet appointment with intelligent notifications.',
    icon: Icons.notifications_active,
    iconColor: AppColors.brandSecondary,
  ),
  _OnboardingPage(
    title: 'Connect & Breed',
    description: 'Find verified breeding partners and connect with other pet owners in your community.',
    icon: Icons.pets,
    iconColor: AppColors.accentGreen,
  ),
];

class OnboardingScreen extends ConsumerStatefulWidget {
  const OnboardingScreen({super.key});

  @override
  ConsumerState<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends ConsumerState<OnboardingScreen> {
  final _pageController = PageController();
  int _currentPage = 0;

  @override
  void dispose() {
    _pageController.dispose();
    super.dispose();
  }

  void _onNext() {
    if (_currentPage < _pages.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _completeOnboarding();
    }
  }

  void _completeOnboarding() {
    ref.read(localStorageProvider).setOnboardingComplete();
    context.goNamed(RouteNames.login);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          children: [
            // Skip button
            Align(
              alignment: Alignment.topRight,
              child: TextButton(
                onPressed: _completeOnboarding,
                child: Text(
                  'Skip',
                  style: AppTypography.label.copyWith(color: AppColors.textSecondary),
                ),
              ),
            ),

            // Pages
            Expanded(
              child: PageView.builder(
                controller: _pageController,
                itemCount: _pages.length,
                onPageChanged: (index) => setState(() => _currentPage = index),
                itemBuilder: (context, index) {
                  final page = _pages[index];
                  return Padding(
                    padding: const EdgeInsets.all(32),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Container(
                          width: 160,
                          height: 160,
                          decoration: BoxDecoration(
                            color: page.iconColor.withOpacity(0.1),
                            shape: BoxShape.circle,
                          ),
                          child: Icon(
                            page.icon,
                            size: 80,
                            color: page.iconColor,
                          ),
                        ),
                        const SizedBox(height: 48),
                        Text(
                          page.title,
                          style: AppTypography.heading1,
                          textAlign: TextAlign.center,
                        ),
                        const SizedBox(height: 16),
                        Text(
                          page.description,
                          style: AppTypography.bodyLarge.copyWith(
                            color: AppColors.textSecondary,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),

            // Dots indicator
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(_pages.length, (index) {
                return AnimatedContainer(
                  duration: const Duration(milliseconds: 300),
                  margin: const EdgeInsets.symmetric(horizontal: 4),
                  width: _currentPage == index ? 24 : 8,
                  height: 8,
                  decoration: BoxDecoration(
                    color: _currentPage == index
                        ? AppColors.brandPrimary
                        : AppColors.borderLight,
                    borderRadius: BorderRadius.circular(4),
                  ),
                );
              }),
            ),
            const SizedBox(height: 32),

            // Button
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 32),
              child: AppButton(
                label: _currentPage == _pages.length - 1 ? 'Get Started' : 'Next',
                onPressed: _onNext,
              ),
            ),
            const SizedBox(height: 32),
          ],
        ),
      ),
    );
  }
}

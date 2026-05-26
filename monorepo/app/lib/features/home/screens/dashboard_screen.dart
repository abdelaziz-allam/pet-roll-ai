import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/router/route_names.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../../core/widgets/avatar_widget.dart';
import '../../auth/providers/auth_provider.dart';
import '../../pets/models/pet_model.dart';
import '../../pets/providers/pet_provider.dart';
import '../providers/tips_provider.dart';
import '../providers/pet_summary_provider.dart';
import '../models/tip_model.dart';
import '../models/pet_summary_model.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final userProfile = ref.watch(userProfileProvider);
    final userPets = ref.watch(userPetsProvider);
    final selectedPetId = ref.watch(selectedPetProvider);

    return Scaffold(
      backgroundColor: AppColors.bgSecondary,
      body: RefreshIndicator(
        color: AppColors.brandPrimary,
        onRefresh: () async {
          ref.invalidate(userPetsProvider);
          ref.invalidate(userProfileProvider);
          ref.invalidate(dailyTipProvider);
          ref.invalidate(petSummaryProvider);
        },
        child: CustomScrollView(
          physics: const AlwaysScrollableScrollPhysics(),
          slivers: [
            SliverToBoxAdapter(child: _HeaderSection(userProfile: userProfile)),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 24, 20, 0),
                child: _PetCarousel(
                  petsAsync: userPets,
                  selectedPetId: selectedPetId,
                  onPetSelected: (petId) {
                    ref.read(selectedPetProvider.notifier).state = petId;
                  },
                ),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 28, 20, 0),
                child: _QuickActionsSection(),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 28, 20, 0),
                child: _StatsOverview(),
              ),
            ),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 28, 20, 100),
                child: _TipsSection(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _HeaderSection extends StatelessWidget {
  final AsyncValue<Map<String, dynamic>?> userProfile;

  const _HeaderSection({required this.userProfile});

  @override
  Widget build(BuildContext context) {
    final name = userProfile.valueOrNull?['displayName'] as String? ?? 'there';
    final avatarUrl = userProfile.valueOrNull?['avatarUrl'] as String?;
    final hour = DateTime.now().hour;
    String greeting;
    String emoji;
    if (hour < 12) {
      greeting = 'Good morning';
      emoji = '🌅';
    } else if (hour < 17) {
      greeting = 'Good afternoon';
      emoji = '☀️';
    } else {
      greeting = 'Good evening';
      emoji = '🌙';
    }

    return Container(
      padding: EdgeInsets.fromLTRB(
        20, MediaQuery.of(context).padding.top + 20, 20, 32,
      ),
      decoration: BoxDecoration(
        color: AppColors.bgPrimary,
        borderRadius: const BorderRadius.vertical(bottom: Radius.circular(32)),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.04),
            blurRadius: 20,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  '$greeting $emoji',
                  style: AppTypography.body.copyWith(
                    color: AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  name,
                  style: AppTypography.heading1.copyWith(
                    color: AppColors.textPrimary,
                    fontSize: 26,
                  ),
                ),
              ],
            ),
          ),
          GestureDetector(
            onTap: () => context.go('/profile'),
            child: Container(
              padding: const EdgeInsets.all(3),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: Border.all(color: AppColors.brandPrimary.withOpacity(0.3), width: 2),
              ),
              child: AvatarWidget(
                imageUrl: avatarUrl,
                name: name,
                size: 44,
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class _PetCarousel extends StatelessWidget {
  final AsyncValue<List<PetModel>> petsAsync;
  final String? selectedPetId;
  final ValueChanged<String> onPetSelected;

  const _PetCarousel({
    required this.petsAsync,
    required this.selectedPetId,
    required this.onPetSelected,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Text(
              'My Fur Babies',
              style: AppTypography.heading3.copyWith(
                color: AppColors.textPrimary,
                fontWeight: FontWeight.w700,
              ),
            ),
            const Spacer(),
            GestureDetector(
              onTap: () => context.go('/pets'),
              child: Text(
                'See All',
                style: AppTypography.bodySmall.copyWith(
                  color: AppColors.brandPrimary,
                  fontWeight: FontWeight.w600,
                ),
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),
        petsAsync.when(
          loading: () => const SizedBox(
            height: 110,
            child: Center(child: LoadingIndicator(size: 24)),
          ),
          error: (_, __) => const SizedBox.shrink(),
          data: (pets) {
            if (pets.isEmpty) {
              return _EmptyPetCard(
                onTap: () => context.pushNamed(RouteNames.addPet),
              );
            }
            return SizedBox(
              height: 110,
              child: ListView.separated(
                scrollDirection: Axis.horizontal,
                itemCount: pets.length + 1,
                separatorBuilder: (_, __) => const SizedBox(width: 12),
                itemBuilder: (context, index) {
                  if (index == pets.length) {
                    return _AddPetMiniCard(
                      onTap: () => context.pushNamed(RouteNames.addPet),
                    );
                  }
                  final pet = pets[index];
                  final isSelected = pet.id == selectedPetId ||
                      (selectedPetId == null && index == 0);
                  return _PetAvatarCard(
                    pet: pet,
                    isSelected: isSelected,
                    onTap: () => onPetSelected(pet.id),
                  );
                },
              ),
            );
          },
        ),
      ],
    );
  }
}

class _PetAvatarCard extends StatelessWidget {
  final PetModel pet;
  final bool isSelected;
  final VoidCallback onTap;

  const _PetAvatarCard({
    required this.pet,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        width: 85,
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.brandPrimary.withOpacity(0.08) : AppColors.bgPrimary,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(
            color: isSelected ? AppColors.brandPrimary : AppColors.borderLight,
            width: isSelected ? 2 : 1,
          ),
          boxShadow: isSelected
              ? [BoxShadow(color: AppColors.shadowPrimary, blurRadius: 12, offset: const Offset(0, 4))]
              : [BoxShadow(color: AppColors.shadowLight, blurRadius: 8, offset: const Offset(0, 2))],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(2),
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                border: isSelected
                    ? Border.all(color: AppColors.brandPrimary, width: 2)
                    : null,
              ),
              child: AvatarWidget(
                imageUrl: pet.primaryPhotoUrl,
                name: pet.name,
                size: 44,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              pet.name,
              style: AppTypography.caption.copyWith(
                color: isSelected ? AppColors.brandPrimary : AppColors.textPrimary,
                fontWeight: isSelected ? FontWeight.w700 : FontWeight.w500,
              ),
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
            ),
          ],
        ),
      ),
    );
  }
}

class _AddPetMiniCard extends StatelessWidget {
  final VoidCallback onTap;

  const _AddPetMiniCard({required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: 85,
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: AppColors.bgPrimary,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.borderLight, style: BorderStyle.solid),
          boxShadow: [BoxShadow(color: AppColors.shadowLight, blurRadius: 8, offset: const Offset(0, 2))],
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 44,
              height: 44,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.brandPrimary.withOpacity(0.1),
              ),
              child: const Icon(Icons.add_rounded, color: AppColors.brandPrimary, size: 24),
            ),
            const SizedBox(height: 8),
            Text(
              'Add',
              style: AppTypography.caption.copyWith(
                color: AppColors.brandPrimary,
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _EmptyPetCard extends StatelessWidget {
  final VoidCallback onTap;

  const _EmptyPetCard({required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 110,
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppColors.bgPrimary,
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: AppColors.borderLight),
        ),
        child: Row(
          children: [
            Container(
              width: 56,
              height: 56,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: AppColors.brandPrimary.withOpacity(0.1),
              ),
              child: const Icon(Icons.pets_rounded, color: AppColors.brandPrimary, size: 28),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    'Add your first pet!',
                    style: AppTypography.heading3.copyWith(color: AppColors.textPrimary),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Start tracking their health & happiness',
                    style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
                  ),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios_rounded, size: 16, color: AppColors.textHint),
          ],
        ),
      ),
    );
  }
}

class _QuickActionsSection extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Quick Actions',
          style: AppTypography.heading3.copyWith(
            color: AppColors.textPrimary,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 14),
        Row(
          children: [
            Expanded(
              child: _ActionCard(
                icon: Icons.medical_services_rounded,
                label: 'Health',
                color: AppColors.success,
                bgColor: AppColors.categoryHealth,
                onTap: () => context.go('/pets'),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _ActionCard(
                icon: Icons.vaccines_rounded,
                label: 'Vaccines',
                color: AppColors.accentOrange,
                bgColor: AppColors.categorySchedule,
                onTap: () => context.go('/pets'),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _ActionCard(
                icon: Icons.favorite_rounded,
                label: 'Mating',
                color: AppColors.brandPrimary,
                bgColor: AppColors.categoryBreeding,
                onTap: () => context.go('/mating'),
              ),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: _ActionCard(
                icon: Icons.calendar_month_rounded,
                label: 'Schedule',
                color: AppColors.brandTertiary,
                bgColor: AppColors.categoryGrooming,
                onTap: () => context.go('/pets'),
              ),
            ),
          ],
        ),
      ],
    );
  }
}

class _ActionCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color color;
  final Color bgColor;
  final VoidCallback onTap;

  const _ActionCard({
    required this.icon,
    required this.label,
    required this.color,
    required this.bgColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 16),
        decoration: BoxDecoration(
          color: bgColor,
          borderRadius: BorderRadius.circular(18),
        ),
        child: Column(
          children: [
            Container(
              padding: const EdgeInsets.all(10),
              decoration: BoxDecoration(
                color: color.withOpacity(0.15),
                shape: BoxShape.circle,
              ),
              child: Icon(icon, size: 22, color: color),
            ),
            const SizedBox(height: 8),
            Text(
              label,
              style: AppTypography.caption.copyWith(
                color: AppColors.textPrimary,
                fontWeight: FontWeight.w600,
                fontSize: 11,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}

class _StatsOverview extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final summaryAsync = ref.watch(petSummaryProvider);
    final summary = summaryAsync.valueOrNull ?? PetSummaryModel.empty;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        gradient: AppColors.cardGradient,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: AppColors.brandPrimary.withOpacity(0.12),
            blurRadius: 16,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              const Icon(Icons.insights_rounded, color: Colors.white, size: 20),
              const SizedBox(width: 8),
              Text(
                'Pet Health Overview',
                style: AppTypography.label.copyWith(
                  color: Colors.white,
                  fontWeight: FontWeight.w700,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(child: _MiniStat(label: 'Vaccines', value: summary.vaccineStatus, icon: Icons.check_circle_rounded)),
              Expanded(child: _MiniStat(label: 'Checkup', value: summary.formattedCheckup, icon: Icons.event_rounded)),
              Expanded(child: _MiniStat(label: 'Weight', value: summary.formattedWeight, icon: Icons.monitor_weight_rounded)),
            ],
          ),
        ],
      ),
    );
  }
}

class _MiniStat extends StatelessWidget {
  final String label;
  final String value;
  final IconData icon;

  const _MiniStat({required this.label, required this.value, required this.icon});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Icon(icon, color: Colors.white.withOpacity(0.8), size: 20),
        const SizedBox(height: 6),
        Text(
          value,
          style: AppTypography.caption.copyWith(
            color: Colors.white,
            fontWeight: FontWeight.w700,
            fontSize: 11,
          ),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: AppTypography.caption.copyWith(
            color: Colors.white.withOpacity(0.7),
            fontSize: 10,
          ),
        ),
      ],
    );
  }
}

class _TipsSection extends ConsumerWidget {
  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final tipAsync = ref.watch(dailyTipProvider);
    final tip = tipAsync.valueOrNull ?? TipModel.fallback;

    return Container(
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.bgPrimary,
        borderRadius: BorderRadius.circular(20),
        boxShadow: [
          BoxShadow(
            color: AppColors.shadowLight,
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: AppColors.accentOrange.withOpacity(0.1),
              borderRadius: BorderRadius.circular(14),
            ),
            child: const Icon(Icons.lightbulb_rounded, color: AppColors.accentOrange, size: 24),
          ),
          const SizedBox(width: 14),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  tip.title,
                  style: AppTypography.label.copyWith(
                    color: AppColors.textPrimary,
                    fontWeight: FontWeight.w700,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  tip.body,
                  style: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

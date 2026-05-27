import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../../core/theme/app_colors.dart';
import '../../../core/theme/app_typography.dart';
import '../../../core/router/route_names.dart';
import '../../../core/widgets/birthday_celebration.dart';
import '../../../core/widgets/loading_indicator.dart';
import '../../../core/widgets/error_view.dart';
import '../../../core/widgets/avatar_widget.dart';
import '../../notifications/services/birthday_notification_service.dart';
import '../models/pet_model.dart';
import '../providers/pet_provider.dart';
import '../services/pet_service.dart';

class PetDetailScreen extends ConsumerWidget {
  final String petId;

  const PetDetailScreen({super.key, required this.petId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final petAsync = ref.watch(petDetailProvider(petId));

    return petAsync.when(
      loading: () => const Scaffold(body: LoadingIndicator()),
      error: (error, _) => Scaffold(
        body: ErrorView(
          message: error.toString(),
          onRetry: () => ref.invalidate(petDetailProvider(petId)),
        ),
      ),
      data: (pet) => _PetDetailContent(pet: pet),
    );
  }
}

class _PetDetailContent extends ConsumerWidget {
  final PetModel pet;

  const _PetDetailContent({required this.pet});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return BirthdayCelebration(
      showCelebration: pet.isBirthdayToday,
      child: Scaffold(
        backgroundColor: AppColors.bgSecondary,
        body: CustomScrollView(
          slivers: [
            _PetHeader(pet: pet, ref: ref),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 0, 20, 100),
                child: Column(
                  children: [
                    Transform.translate(
                      offset: const Offset(0, -20),
                      child: _InfoCard(pet: pet),
                    ),
                    _ManageSection(petId: pet.id),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _PetHeader extends StatelessWidget {
  final PetModel pet;
  final WidgetRef ref;

  const _PetHeader({required this.pet, required this.ref});

  @override
  Widget build(BuildContext context) {
    return SliverAppBar(
      expandedHeight: 280,
      pinned: true,
      backgroundColor: AppColors.brandPrimary,
      foregroundColor: Colors.white,
      leading: GestureDetector(
        onTap: () => context.pop(),
        child: Container(
          margin: const EdgeInsets.all(8),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: const Icon(Icons.arrow_back_ios_new_rounded, size: 18, color: Colors.white),
        ),
      ),
      actions: [
        GestureDetector(
          onTap: () => _showMenu(context),
          child: Container(
            margin: const EdgeInsets.all(8),
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.white.withOpacity(0.2),
              borderRadius: BorderRadius.circular(12),
            ),
            child: const Icon(Icons.more_horiz_rounded, size: 20, color: Colors.white),
          ),
        ),
      ],
      flexibleSpace: FlexibleSpaceBar(
        background: _PhotoSection(photos: pet.photos, name: pet.name),
      ),
    );
  }

  void _showMenu(BuildContext context) {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (ctx) => Container(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: AppColors.borderDefault,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            const SizedBox(height: 24),
            _MenuOption(
              icon: Icons.edit_rounded,
              label: 'Edit Pet',
              onTap: () {
                Navigator.pop(ctx);
                context.pushNamed(
                  RouteNames.editPet,
                  pathParameters: {'petId': pet.id},
                );
              },
            ),
            const SizedBox(height: 8),
            _MenuOption(
              icon: Icons.delete_outline_rounded,
              label: 'Delete Pet',
              color: AppColors.error,
              onTap: () {
                Navigator.pop(ctx);
                _showDeleteDialog(context);
              },
            ),
          ],
        ),
      ),
    );
  }

  void _showDeleteDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text('Delete Pet'),
        content: Text('Are you sure you want to delete ${pet.name}?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          TextButton(
            onPressed: () async {
              Navigator.pop(ctx);
              await ref.read(petServiceProvider).deletePet(pet.id);
              await ref.read(birthdayNotificationServiceProvider).cancelBirthdayNotification(pet.id);
              ref.invalidate(userPetsProvider);
              if (context.mounted) context.pop();
            },
            child: Text('Delete', style: TextStyle(color: AppColors.error)),
          ),
        ],
      ),
    );
  }
}

class _MenuOption extends StatelessWidget {
  final IconData icon;
  final String label;
  final Color? color;
  final VoidCallback onTap;

  const _MenuOption({required this.icon, required this.label, this.color, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final c = color ?? AppColors.textPrimary;
    return ListTile(
      onTap: onTap,
      leading: Icon(icon, color: c),
      title: Text(label, style: AppTypography.label.copyWith(color: c)),
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
    );
  }
}

class _PhotoSection extends StatelessWidget {
  final List<PetPhoto> photos;
  final String name;

  const _PhotoSection({required this.photos, required this.name});

  @override
  Widget build(BuildContext context) {
    if (photos.isEmpty) {
      return Container(
        decoration: const BoxDecoration(gradient: AppColors.headerGradient),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(height: 40),
              AvatarWidget(name: name, size: 100),
              const SizedBox(height: 12),
              Text(
                name,
                style: AppTypography.heading2.copyWith(color: Colors.white),
              ),
            ],
          ),
        ),
      );
    }

    return PageView.builder(
      itemCount: photos.length,
      itemBuilder: (context, index) {
        return Stack(
          fit: StackFit.expand,
          children: [
            Image.network(
              photos[index].url,
              fit: BoxFit.cover,
              errorBuilder: (_, __, ___) => Container(
                decoration: const BoxDecoration(gradient: AppColors.headerGradient),
                child: Center(child: AvatarWidget(name: name, size: 80)),
              ),
            ),
            Container(
              decoration: BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Colors.transparent, Colors.black.withOpacity(0.3)],
                ),
              ),
            ),
          ],
        );
      },
    );
  }
}

class _InfoCard extends StatelessWidget {
  final PetModel pet;

  const _InfoCard({required this.pet});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.bgPrimary,
        borderRadius: BorderRadius.circular(24),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.06),
            blurRadius: 20,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      pet.name,
                      style: AppTypography.heading1.copyWith(
                        color: AppColors.textPrimary,
                        fontSize: 26,
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      '${pet.species} • ${pet.breed}',
                      style: AppTypography.body.copyWith(
                        color: AppColors.textSecondary,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                  ],
                ),
              ),
              if (pet.isAvailableForMating)
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    gradient: AppColors.primaryGradient,
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Icon(Icons.favorite_rounded, size: 14, color: Colors.white),
                      const SizedBox(width: 4),
                      Text(
                        'Mating',
                        style: AppTypography.caption.copyWith(
                          color: Colors.white,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
            ],
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              Expanded(child: _StatPill(icon: Icons.cake_rounded, label: 'Age', value: pet.age)),
              const SizedBox(width: 10),
              Expanded(
                child: _StatPill(
                  icon: Icons.monitor_weight_rounded,
                  label: 'Weight',
                  value: pet.weight != null ? '${pet.weight} ${pet.weightUnit ?? 'kg'}' : '--',
                ),
              ),
              const SizedBox(width: 10),
              Expanded(child: _StatPill(icon: Icons.wc_rounded, label: 'Gender', value: pet.gender)),
            ],
          ),
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              color: pet.isBirthdayToday
                  ? const Color(0xFFFF6B6B).withOpacity(0.08)
                  : AppColors.bgSecondary,
              borderRadius: BorderRadius.circular(14),
              border: pet.isBirthdayToday
                  ? Border.all(color: const Color(0xFFFF6B6B).withOpacity(0.3))
                  : null,
            ),
            child: Row(
              children: [
                Icon(
                  Icons.celebration_rounded,
                  size: 16,
                  color: pet.isBirthdayToday ? const Color(0xFFFF6B6B) : AppColors.textSecondary,
                ),
                const SizedBox(width: 8),
                Text(
                  'Born: ${pet.formattedDateOfBirth}',
                  style: AppTypography.bodySmall.copyWith(
                    color: pet.isBirthdayToday ? const Color(0xFFFF6B6B) : AppColors.textSecondary,
                    fontWeight: pet.isBirthdayToday ? FontWeight.w600 : FontWeight.w400,
                  ),
                ),
                if (pet.isBirthdayToday) ...[
                  const Spacer(),
                  Text(
                    '🎂 Today!',
                    style: AppTypography.bodySmall.copyWith(
                      fontWeight: FontWeight.w700,
                      color: const Color(0xFFFF6B6B),
                    ),
                  ),
                ],
              ],
            ),
          ),
          if (pet.isNeutered) ...[
            const SizedBox(height: 14),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: AppColors.success.withOpacity(0.1),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Icon(Icons.check_circle_rounded, size: 14, color: AppColors.success),
                  const SizedBox(width: 6),
                  Text(
                    'Neutered',
                    style: AppTypography.bodySmall.copyWith(
                      color: AppColors.success,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _StatPill extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;

  const _StatPill({required this.icon, required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 10),
      decoration: BoxDecoration(
        color: AppColors.bgTertiary,
        borderRadius: BorderRadius.circular(14),
        border: Border.all(color: AppColors.borderDefault.withOpacity(0.5)),
      ),
      child: Column(
        children: [
          Icon(icon, size: 18, color: AppColors.brandPrimary),
          const SizedBox(height: 6),
          Text(
            value,
            style: AppTypography.label.copyWith(
              color: AppColors.textPrimary,
              fontSize: 14,
              fontWeight: FontWeight.w700,
            ),
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            textAlign: TextAlign.center,
          ),
          const SizedBox(height: 2),
          Text(
            label,
            style: AppTypography.caption.copyWith(
              color: AppColors.textSecondary,
              fontSize: 11,
              fontWeight: FontWeight.w500,
            ),
          ),
        ],
      ),
    );
  }
}

class _ManageSection extends StatelessWidget {
  final String petId;

  const _ManageSection({required this.petId});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Manage',
          style: AppTypography.heading3.copyWith(
            color: AppColors.textPrimary,
            fontWeight: FontWeight.w700,
          ),
        ),
        const SizedBox(height: 14),
        _ManageTile(
          icon: Icons.medical_services_rounded,
          label: 'Health Records',
          subtitle: 'Track vet visits & diagnoses',
          color: AppColors.success,
          bgColor: AppColors.categoryHealth,
          onTap: () => context.pushNamed(
            RouteNames.healthRecords,
            pathParameters: {'petId': petId},
          ),
        ),
        const SizedBox(height: 10),
        _ManageTile(
          icon: Icons.vaccines_rounded,
          label: 'Vaccinations',
          subtitle: 'Stay up to date',
          color: AppColors.accentOrange,
          bgColor: AppColors.categorySchedule,
          onTap: () => context.pushNamed(
            RouteNames.vaccinations,
            pathParameters: {'petId': petId},
          ),
        ),
        const SizedBox(height: 10),
        _ManageTile(
          icon: Icons.child_friendly_rounded,
          label: 'Pregnancy',
          subtitle: 'Monitor pregnancy journey',
          color: AppColors.brandSecondary,
          bgColor: AppColors.categoryBreeding,
          onTap: () => context.pushNamed(
            RouteNames.pregnancy,
            pathParameters: {'petId': petId},
          ),
        ),
        const SizedBox(height: 10),
        _ManageTile(
          icon: Icons.calendar_month_rounded,
          label: 'Schedules',
          subtitle: 'Reminders & appointments',
          color: AppColors.info,
          bgColor: AppColors.categoryGrooming,
          onTap: () => context.pushNamed(
            RouteNames.schedules,
            pathParameters: {'petId': petId},
          ),
        ),
      ],
    );
  }
}

class _ManageTile extends StatelessWidget {
  final IconData icon;
  final String label;
  final String subtitle;
  final Color color;
  final Color bgColor;
  final VoidCallback onTap;

  const _ManageTile({
    required this.icon,
    required this.label,
    required this.subtitle,
    required this.color,
    required this.bgColor,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: AppColors.bgPrimary,
          borderRadius: BorderRadius.circular(18),
          boxShadow: [
            BoxShadow(
              color: Colors.black.withOpacity(0.03),
              blurRadius: 10,
              offset: const Offset(0, 3),
            ),
          ],
        ),
        child: Row(
          children: [
            Container(
              padding: const EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: bgColor,
                borderRadius: BorderRadius.circular(14),
              ),
              child: Icon(icon, size: 22, color: color),
            ),
            const SizedBox(width: 14),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    label,
                    style: AppTypography.label.copyWith(
                      color: AppColors.textPrimary,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    subtitle,
                    style: AppTypography.caption.copyWith(color: AppColors.textSecondary),
                  ),
                ],
              ),
            ),
            Icon(Icons.arrow_forward_ios_rounded, size: 14, color: AppColors.textHint),
          ],
        ),
      ),
    );
  }
}

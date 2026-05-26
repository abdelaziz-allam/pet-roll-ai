import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../theme/app_colors.dart';

class AvatarWidget extends StatelessWidget {
  final String? imageUrl;
  final double size;
  final IconData fallbackIcon;
  final String? name;

  const AvatarWidget({
    super.key,
    this.imageUrl,
    this.size = 48,
    this.fallbackIcon = Icons.pets,
    this.name,
  });

  @override
  Widget build(BuildContext context) {
    if (imageUrl != null && imageUrl!.isNotEmpty) {
      return ClipOval(
        child: CachedNetworkImage(
          imageUrl: imageUrl!,
          width: size,
          height: size,
          fit: BoxFit.cover,
          placeholder: (_, __) => _buildPlaceholder(),
          errorWidget: (_, __, ___) => _buildFallback(),
        ),
      );
    }

    return _buildFallback();
  }

  Widget _buildPlaceholder() {
    return Container(
      width: size,
      height: size,
      decoration: const BoxDecoration(
        color: AppColors.bgTertiary,
        shape: BoxShape.circle,
      ),
      child: const Center(
        child: CircularProgressIndicator(strokeWidth: 2),
      ),
    );
  }

  Widget _buildFallback() {
    if (name != null && name!.isNotEmpty) {
      return Container(
        width: size,
        height: size,
        decoration: BoxDecoration(
          color: AppColors.brandPrimary.withOpacity(0.1),
          shape: BoxShape.circle,
        ),
        child: Center(
          child: Text(
            name![0].toUpperCase(),
            style: TextStyle(
              fontFamily: 'Poppins',
              fontSize: size * 0.4,
              fontWeight: FontWeight.w600,
              color: AppColors.brandPrimary,
            ),
          ),
        ),
      );
    }

    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        color: AppColors.bgTertiary,
        shape: BoxShape.circle,
      ),
      child: Icon(fallbackIcon, size: size * 0.5, color: AppColors.textHint),
    );
  }
}

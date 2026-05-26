import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  // Brand — #F1379D is the star, everything else supports it
  static const Color brandPrimary = Color(0xFFF1379D);
  static const Color brandPrimaryDark = Color(0xFFD42D85);
  static const Color brandSecondary = Color(0xFFF7A072);
  static const Color brandTertiary = Color(0xFF7BBECC);
  static const Color accentGreen = Color(0xFF4CC287);
  static const Color accentGreenDark = Color(0xFF3A9E6E);
  static const Color accentOrange = Color(0xFFF0A856);

  // Gradients — pink stays dominant, subtle warm fade
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [Color(0xFFF1379D), Color(0xFFF7A072)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient headerGradient = LinearGradient(
    colors: [Color(0xFFD42D85), Color(0xFFF1379D), Color(0xFFF77FA0)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  static const LinearGradient cardGradient = LinearGradient(
    colors: [Color(0xFFF97BB8), Color(0xFFFBA4C8)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );

  // Backgrounds — clean & warm, let the pink hero shine
  static const Color bgPrimary = Color(0xFFFFFFFF);
  static const Color bgSecondary = Color(0xFFFCFAF9);
  static const Color bgTertiary = Color(0xFFF5F2F0);
  static const Color bgWarm = Color(0xFFFFF1ED);
  static const Color bgDark = Color(0xFF1E1A2E);
  static const Color bgOverlay = Color(0xFFFFF7F5);

  // Text — deep warm plum-black for premium contrast
  static const Color textPrimary = Color(0xFF1E1A2E);
  static const Color textSecondary = Color(0xFF6B6078);
  static const Color textHint = Color(0xFFB5AEBF);
  static const Color textDisabled = Color(0xFF9C94A5);
  static const Color textInverse = Color(0xFFFFFFFF);

  // UI Elements
  static const Color borderDefault = Color(0xFFE8E4E1);
  static const Color borderLight = Color(0xFFF2EDEB);
  static const Color navActive = Color(0xFFF1379D);
  static const Color navInactive = Color(0xFFB5AEBF);
  static const Color navBackground = Color(0xFFFFFFFF);

  // Status — clean, confident, not competing with brand
  static const Color error = Color(0xFFE5484D);
  static const Color warning = Color(0xFFE5A33E);
  static const Color success = Color(0xFF46A758);
  static const Color info = Color(0xFF5B9BD8);

  // Category Pastel Cards — subtle tints, elegant & light
  static const Color categoryHealth = Color(0xFFEEF8F1);
  static const Color categoryFood = Color(0xFFFFF6EE);
  static const Color categoryGrooming = Color(0xFFEEF3FB);
  static const Color categoryBreeding = Color(0xFFFDEFF4);
  static const Color categoryAlert = Color(0xFFFFF0EE);
  static const Color categorySchedule = Color(0xFFF4F0F9);
  static const Color categoryCommunity = Color(0xFFEEF5F7);
  static const Color categoryMarket = Color(0xFFEEF8F2);

  // Shadows — pink-kissed for brand elements
  static const Color shadowLight = Color(0x0A1E1A2E);
  static const Color shadowMedium = Color(0x141E1A2E);
  static const Color shadowPrimary = Color(0x30F1379D);
}

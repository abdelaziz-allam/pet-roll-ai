import 'dart:convert';
import 'dart:io';
import 'dart:math';

import 'package:crypto/crypto.dart';
import 'package:flutter/material.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:sign_in_with_apple/sign_in_with_apple.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../core/services/api_service.dart';
import '../../core/theme/app_theme.dart';
import '../../l10n/generated/app_localizations.dart';
import '../../main.dart';
import '../home/home_screen.dart';

class AppLoginScreen extends StatefulWidget {
  const AppLoginScreen({super.key});

  @override
  State<AppLoginScreen> createState() => _AppLoginScreenState();
}

class _AppLoginScreenState extends State<AppLoginScreen> {
  final _formKey = GlobalKey<FormState>();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _nameController = TextEditingController();
  bool _loading = false;
  bool _obscurePassword = true;
  bool _isSignUp = false;
  String? _error;

  @override
  void dispose() {
    _emailController.dispose();
    _passwordController.dispose();
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _submitForm() async {
    if (!_formKey.currentState!.validate()) return;

    setState(() { _loading = true; _error = null; });

    try {
      final auth = FirebaseAuth.instance;
      UserCredential credential;

      if (_isSignUp) {
        credential = await auth.createUserWithEmailAndPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );
      } else {
        credential = await auth.signInWithEmailAndPassword(
          email: _emailController.text.trim(),
          password: _passwordController.text,
        );
      }

      await _authenticateWithBackend(credential.user!, isNewUser: _isSignUp);
    } on FirebaseAuthException catch (e) {
      setState(() {
        _error = _mapFirebaseError(e.code);
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _error = e.toString().contains('409')
            ? 'Account already exists. Please sign in instead.'
            : 'Something went wrong. Please try again.';
        _loading = false;
      });
    }
  }

  Future<void> _signInWithGoogle() async {
    setState(() { _loading = true; _error = null; });

    try {
      final googleSignIn = GoogleSignIn(
        scopes: ['email', 'profile'],
        serverClientId: '834040996278-0lmec5vdgu349d8fktcog17qmd2ae3tt.apps.googleusercontent.com',
      );
      final googleUser = await googleSignIn.signIn();
      if (googleUser == null) {
        setState(() { _loading = false; });
        return;
      }

      final googleAuth = await googleUser.authentication;
      final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final userCredential = await FirebaseAuth.instance.signInWithCredential(credential);
      final isNew = userCredential.additionalUserInfo?.isNewUser ?? false;

      await _authenticateWithBackend(userCredential.user!, isNewUser: isNew);
    } on FirebaseAuthException catch (e) {
      setState(() {
        _error = _mapFirebaseError(e.code);
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _error = 'Google sign-in failed. Please try again.';
        _loading = false;
      });
    }
  }

  String _generateNonce([int length = 32]) {
    const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVXYZabcdefghijklmnopqrstuvwxyz-._';
    final random = Random.secure();
    return List.generate(length, (_) => charset[random.nextInt(charset.length)]).join();
  }

  String _sha256ofString(String input) {
    final bytes = utf8.encode(input);
    final digest = sha256.convert(bytes);
    return digest.toString();
  }

  Future<void> _signInWithApple() async {
    setState(() { _loading = true; _error = null; });

    try {
      final rawNonce = _generateNonce();
      final nonce = _sha256ofString(rawNonce);

      final appleCredential = await SignInWithApple.getAppleIDCredential(
        scopes: [
          AppleIDAuthorizationScopes.email,
          AppleIDAuthorizationScopes.fullName,
        ],
        nonce: nonce,
      );

      final oauthCredential = OAuthProvider('apple.com').credential(
        idToken: appleCredential.identityToken,
        rawNonce: rawNonce,
      );

      final userCredential = await FirebaseAuth.instance.signInWithCredential(oauthCredential);
      final isNew = userCredential.additionalUserInfo?.isNewUser ?? false;

      if (isNew && userCredential.user != null) {
        final fullName = [
          appleCredential.givenName,
          appleCredential.familyName,
        ].where((n) => n != null && n.isNotEmpty).join(' ');

        if (fullName.isNotEmpty) {
          await userCredential.user!.updateDisplayName(fullName);
        }
      }

      await _authenticateWithBackend(userCredential.user!, isNewUser: isNew);
    } on SignInWithAppleAuthorizationException catch (e) {
      if (e.code == AuthorizationErrorCode.canceled) {
        setState(() { _loading = false; });
        return;
      }
      setState(() {
        _error = 'Apple sign-in failed. Please try again.';
        _loading = false;
      });
    } on FirebaseAuthException catch (e) {
      setState(() {
        _error = _mapFirebaseError(e.code);
        _loading = false;
      });
    } catch (e) {
      setState(() {
        _error = 'Apple sign-in failed. Please try again.';
        _loading = false;
      });
    }
  }

  Future<void> _authenticateWithBackend(User user, {required bool isNewUser}) async {
    final idToken = await user.getIdToken();
    if (idToken == null) throw Exception('Failed to get Firebase token');

    final api = ApiService();

    try {
      if (isNewUser) {
        final displayName = _nameController.text.trim().isNotEmpty
            ? _nameController.text.trim()
            : user.displayName ?? user.email?.split('@').first ?? 'User';

        final result = await api.postWithFirebaseToken('/auth/register', idToken, {
          'displayName': displayName,
        });
        await api.setTokens(result['accessToken'], result['refreshToken']);
      } else {
        final result = await api.postWithFirebaseToken('/auth/login', idToken);
        await api.setTokens(result['accessToken'], result['refreshToken']);
      }
    } on ApiException catch (e) {
      if (e.statusCode == 409 && isNewUser) {
        final result = await api.postWithFirebaseToken('/auth/login', idToken);
        await api.setTokens(result['accessToken'], result['refreshToken']);
      } else {
        rethrow;
      }
    }

    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const HomeScreen()),
      );
    }
  }

  String _mapFirebaseError(String code) {
    switch (code) {
      case 'user-not-found':
        return 'No account found with this email. Sign up instead?';
      case 'wrong-password':
      case 'invalid-credential':
        return 'Invalid email or password.';
      case 'email-already-in-use':
        return 'This email is already registered. Sign in instead?';
      case 'weak-password':
        return 'Password must be at least 6 characters.';
      case 'invalid-email':
        return 'Please enter a valid email address.';
      case 'too-many-requests':
        return 'Too many attempts. Please try again later.';
      case 'network-request-failed':
        return 'Network error. Check your connection.';
      default:
        return 'Authentication failed. Please try again.';
    }
  }

  void _showLanguagePicker() {
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(borderRadius: BorderRadius.vertical(top: Radius.circular(20))),
      builder: (ctx) => Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Select Language', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)),
            const SizedBox(height: 20),
            _buildLangOption(ctx, 'English', 'en'),
            const SizedBox(height: 8),
            _buildLangOption(ctx, 'Svenska', 'sv'),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _buildLangOption(BuildContext ctx, String label, String code) {
    final isSelected = localeNotifier.value.languageCode == code;
    return GestureDetector(
      onTap: () async {
        final prefs = await SharedPreferences.getInstance();
        await prefs.setString('app_locale', code);
        localeNotifier.value = Locale(code);
        if (mounted) setState(() {});
        Navigator.pop(ctx);
      },
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
        decoration: BoxDecoration(
          color: isSelected ? AppTheme.primary.withOpacity(0.08) : Colors.grey.shade50,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(
            color: isSelected ? AppTheme.primary : Colors.grey.shade200,
            width: isSelected ? 1.5 : 1,
          ),
        ),
        child: Row(
          children: [
            Text(label, style: TextStyle(fontSize: 16, fontWeight: isSelected ? FontWeight.w600 : FontWeight.w500)),
            const Spacer(),
            if (isSelected) const Icon(Icons.check_circle, color: AppTheme.primary, size: 22),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Align(
                  alignment: Alignment.topRight,
                  child: GestureDetector(
                    onTap: _showLanguagePicker,
                    child: Container(
                      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                      decoration: BoxDecoration(
                        color: Colors.grey.shade100,
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: Row(
                        mainAxisSize: MainAxisSize.min,
                        children: [
                          const Icon(Icons.language, size: 18, color: AppTheme.primary),
                          const SizedBox(width: 6),
                          Text(
                            localeNotifier.value.languageCode == 'sv' ? 'SV' : 'EN',
                            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w600, color: AppTheme.primary),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                Center(
                  child: Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      gradient: AppTheme.primaryGradient,
                      borderRadius: BorderRadius.circular(20),
                    ),
                    child: const Icon(Icons.pets, size: 40, color: Colors.white),
                  ),
                ),
                const SizedBox(height: 24),
                const Center(
                  child: Text('Petfolioo', style: TextStyle(fontSize: 28, fontWeight: FontWeight.w800)),
                ),
                const SizedBox(height: 8),
                Center(
                  child: Text(
                    _isSignUp ? l10n.createAccount : l10n.signIn,
                    style: TextStyle(color: Colors.grey[600], fontSize: 15),
                  ),
                ),
                const SizedBox(height: 36),
                if (_error != null) ...[
                  Container(
                    padding: const EdgeInsets.all(12),
                    decoration: BoxDecoration(
                      color: AppTheme.error.withOpacity(0.08),
                      borderRadius: BorderRadius.circular(12),
                      border: Border.all(color: AppTheme.error.withOpacity(0.3)),
                    ),
                    child: Row(
                      children: [
                        const Icon(Icons.error_outline, color: AppTheme.error, size: 20),
                        const SizedBox(width: 8),
                        Expanded(child: Text(_error!, style: const TextStyle(color: AppTheme.error, fontSize: 13))),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                ],
                if (_isSignUp) ...[
                  TextFormField(
                    controller: _nameController,
                    textCapitalization: TextCapitalization.words,
                    decoration: InputDecoration(
                      labelText: l10n.fullName,
                      prefixIcon: const Icon(Icons.person_outlined),
                      border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                      filled: true,
                      fillColor: Colors.grey[50],
                    ),
                    validator: (v) {
                      if (v == null || v.trim().isEmpty) return l10n.fullName;
                      if (v.trim().length < 2) return l10n.fullName;
                      return null;
                    },
                  ),
                  const SizedBox(height: 16),
                ],
                TextFormField(
                  controller: _emailController,
                  keyboardType: TextInputType.emailAddress,
                  autocorrect: false,
                  decoration: InputDecoration(
                    labelText: l10n.email,
                    prefixIcon: const Icon(Icons.email_outlined),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                    filled: true,
                    fillColor: Colors.grey[50],
                  ),
                  validator: (v) {
                    if (v == null || v.trim().isEmpty) return l10n.email;
                    if (!v.contains('@')) return l10n.email;
                    return null;
                  },
                ),
                const SizedBox(height: 16),
                TextFormField(
                  controller: _passwordController,
                  obscureText: _obscurePassword,
                  decoration: InputDecoration(
                    labelText: l10n.password,
                    prefixIcon: const Icon(Icons.lock_outlined),
                    suffixIcon: IconButton(
                      icon: Icon(_obscurePassword ? Icons.visibility_off : Icons.visibility),
                      onPressed: () => setState(() => _obscurePassword = !_obscurePassword),
                    ),
                    border: OutlineInputBorder(borderRadius: BorderRadius.circular(14)),
                    filled: true,
                    fillColor: Colors.grey[50],
                  ),
                  validator: (v) {
                    if (v == null || v.isEmpty) return l10n.password;
                    if (_isSignUp && v.length < 6) return l10n.password;
                    return null;
                  },
                ),
                const SizedBox(height: 24),
                SizedBox(
                  height: 52,
                  child: ElevatedButton(
                    onPressed: _loading ? null : _submitForm,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.primary,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      elevation: 0,
                    ),
                    child: _loading
                        ? const SizedBox(width: 24, height: 24, child: CircularProgressIndicator(strokeWidth: 2, color: Colors.white))
                        : Text(_isSignUp ? l10n.createAccount : l10n.signIn, style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600)),
                  ),
                ),
                const SizedBox(height: 20),
                Row(
                  children: [
                    Expanded(child: Divider(color: Colors.grey[300])),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16),
                      child: Text('or', style: TextStyle(color: Colors.grey[500], fontSize: 13)),
                    ),
                    Expanded(child: Divider(color: Colors.grey[300])),
                  ],
                ),
                const SizedBox(height: 20),
                SizedBox(
                  height: 52,
                  child: OutlinedButton.icon(
                    onPressed: _loading ? null : _signInWithGoogle,
                    icon: const Icon(Icons.g_mobiledata, size: 28, color: Colors.red),
                    label: Text(l10n.continueWithGoogle, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500)),
                    style: OutlinedButton.styleFrom(
                      foregroundColor: Colors.black87,
                      side: BorderSide(color: Colors.grey[300]!),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                    ),
                  ),
                ),
                if (Platform.isIOS) ...[
                  const SizedBox(height: 12),
                  SizedBox(
                    height: 52,
                    child: OutlinedButton.icon(
                      onPressed: _loading ? null : _signInWithApple,
                      icon: const Icon(Icons.apple, size: 24, color: Colors.black),
                      label: Text(l10n.continueWithApple, style: const TextStyle(fontSize: 15, fontWeight: FontWeight.w500)),
                      style: OutlinedButton.styleFrom(
                        foregroundColor: Colors.black87,
                        side: BorderSide(color: Colors.grey[300]!),
                        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(14)),
                      ),
                    ),
                  ),
                ],
                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      _isSignUp ? l10n.alreadyHaveAccount : l10n.dontHaveAccount,
                      style: TextStyle(color: Colors.grey[600], fontSize: 14),
                    ),
                    GestureDetector(
                      onTap: () {
                        setState(() {
                          _isSignUp = !_isSignUp;
                          _error = null;
                        });
                      },
                      child: Text(
                        _isSignUp ? l10n.signIn : l10n.signUp,
                        style: const TextStyle(color: AppTheme.primary, fontWeight: FontWeight.w600, fontSize: 14),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

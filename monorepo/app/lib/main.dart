import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'l10n/generated/app_localizations.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'core/theme/app_theme.dart';
import 'core/services/api_service.dart';
import 'core/services/notification_service.dart';
import 'features/home/home_screen.dart';
import 'features/auth/login_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.dark,
  ));
  runApp(const PetfoliooApp());
}

class LocaleNotifier extends ValueNotifier<Locale> {
  LocaleNotifier(super.value);

  static const _key = 'app_locale';

  static Future<LocaleNotifier> create() async {
    final prefs = await SharedPreferences.getInstance();
    final code = prefs.getString(_key) ?? 'en';
    return LocaleNotifier(Locale(code));
  }

  Future<void> setLocale(Locale locale) async {
    value = locale;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_key, locale.languageCode);
  }
}

final localeNotifier = ValueNotifier<Locale>(const Locale('en'));

class PetfoliooApp extends StatefulWidget {
  const PetfoliooApp({super.key});

  @override
  State<PetfoliooApp> createState() => _PetfoliooAppState();
}

class _PetfoliooAppState extends State<PetfoliooApp> {
  @override
  void initState() {
    super.initState();
    _loadLocale();
    localeNotifier.addListener(() => setState(() {}));
  }

  Future<void> _loadLocale() async {
    final prefs = await SharedPreferences.getInstance();
    final code = prefs.getString('app_locale') ?? 'en';
    localeNotifier.value = Locale(code);
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Petfolioo',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.theme,
      locale: localeNotifier.value,
      localizationsDelegates: const [
        AppLocalizations.delegate,
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: const [
        Locale('en'),
        Locale('sv'),
      ],
      home: const SplashLoader(),
    );
  }
}

class SplashLoader extends StatefulWidget {
  const SplashLoader({super.key});

  @override
  State<SplashLoader> createState() => _SplashLoaderState();
}

class _SplashLoaderState extends State<SplashLoader> {
  @override
  void initState() {
    super.initState();
    _init();
  }

  Future<void> _init() async {
    final notifService = NotificationService();
    await notifService.init();
    await notifService.requestPermissions();

    final api = ApiService();
    await api.loadToken();

    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(
          builder: (_) => api.isLoggedIn ? const HomeScreen() : const AppLoginScreen(),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              width: 100,
              height: 100,
              decoration: BoxDecoration(
                gradient: AppTheme.primaryGradient,
                borderRadius: BorderRadius.circular(25),
              ),
              child: const Icon(Icons.pets, size: 50, color: Colors.white),
            ),
            const SizedBox(height: 24),
            const Text('Petfolioo', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            Text('Your Pet Companion', style: TextStyle(color: Colors.grey[500])),
            const SizedBox(height: 32),
            const CircularProgressIndicator(color: AppTheme.primary),
          ],
        ),
      ),
    );
  }
}

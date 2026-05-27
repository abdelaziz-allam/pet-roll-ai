import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'core/theme/app_theme.dart';
import 'core/services/api_service.dart';
import 'core/services/notification_service.dart';
import 'features/home/home_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(const SystemUiOverlayStyle(
    statusBarColor: Colors.transparent,
    statusBarIconBrightness: Brightness.dark,
  ));
  runApp(const PetRollApp());
}

class PetRollApp extends StatelessWidget {
  const PetRollApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PET Roll',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.theme,
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
    if (!api.isLoggedIn) {
      try {
        final loginData = await api.post('/auth/dev-login', {
          'email': 'ahmed@example.com',
        });
        api.setToken(loginData['accessToken']);
      } catch (_) {}
    }
    if (mounted) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (_) => const HomeScreen()),
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
            const Text('PET Roll', style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold)),
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

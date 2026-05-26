import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart' as fb;
import 'package:google_sign_in/google_sign_in.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../../core/network/api_client.dart';
import '../../../core/network/api_exception.dart';
import '../../../core/storage/secure_storage.dart';
import '../../../core/constants/app_constants.dart';

final authServiceProvider = Provider<AuthService>((ref) {
  return AuthService(
    ref.watch(apiClientProvider),
    ref.watch(secureStorageProvider),
  );
});

class AuthService {
  final ApiClient _api;
  final SecureStorageService _secureStorage;
  final fb.FirebaseAuth _firebaseAuth = fb.FirebaseAuth.instance;
  final GoogleSignIn _googleSignIn = GoogleSignIn();

  AuthService(this._api, this._secureStorage);

  Future<Map<String, dynamic>> register({
    required String email,
    required String password,
    required String displayName,
  }) async {
    try {
      final credential = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      await credential.user?.updateDisplayName(displayName);

      final idToken = await credential.user!.getIdToken();

      final response = await _api.post('/auth/register', data: {
        'firebaseToken': idToken,
        'displayName': displayName,
      });

      await _storeTokens(response.data);
      return response.data;
    } on fb.FirebaseAuthException catch (e) {
      throw ApiException(message: _mapFirebaseError(e.code));
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    try {
      final credential = await _firebaseAuth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      final idToken = await credential.user!.getIdToken();

      final response = await _api.post('/auth/login', data: {
        'firebaseToken': idToken,
      });

      await _storeTokens(response.data);
      return response.data;
    } on fb.FirebaseAuthException catch (e) {
      throw ApiException(message: _mapFirebaseError(e.code));
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<Map<String, dynamic>> loginWithGoogle() async {
    try {
      final googleUser = await _googleSignIn.signIn();
      if (googleUser == null) {
        throw ApiException(message: 'Google sign-in cancelled');
      }

      final googleAuth = await googleUser.authentication;
      final credential = fb.GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final userCredential = await _firebaseAuth.signInWithCredential(credential);
      final idToken = await userCredential.user!.getIdToken();

      final response = await _api.post('/auth/login', data: {
        'firebaseToken': idToken,
      });

      await _storeTokens(response.data);
      return response.data;
    } on fb.FirebaseAuthException catch (e) {
      throw ApiException(message: _mapFirebaseError(e.code));
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<Map<String, dynamic>> getProfile() async {
    try {
      final response = await _api.get('/auth/me');
      return response.data;
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<Map<String, dynamic>> updateProfile(Map<String, dynamic> data) async {
    try {
      final response = await _api.put('/auth/me', data: data);
      return response.data;
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<void> logout() async {
    await _firebaseAuth.signOut();
    await _googleSignIn.signOut();
    await _secureStorage.deleteAll();
  }

  Future<void> deleteAccount() async {
    try {
      await _api.delete('/auth/me');
      await _firebaseAuth.currentUser?.delete();
      await _secureStorage.deleteAll();
    } on DioException catch (e) {
      throw ApiException.fromDioException(e);
    }
  }

  Future<void> _storeTokens(Map<String, dynamic> data) async {
    if (data['accessToken'] != null) {
      await _secureStorage.write(AppConstants.accessTokenKey, data['accessToken']);
    }
    if (data['refreshToken'] != null) {
      await _secureStorage.write(AppConstants.refreshTokenKey, data['refreshToken']);
    }
    if (data['user']?['id'] != null) {
      await _secureStorage.write(AppConstants.userIdKey, data['user']['id']);
    }
  }

  String _mapFirebaseError(String code) {
    switch (code) {
      case 'user-not-found':
        return 'No account found with this email.';
      case 'wrong-password':
      case 'invalid-credential':
        return 'Incorrect email or password.';
      case 'email-already-in-use':
        return 'An account already exists with this email.';
      case 'weak-password':
        return 'Password is too weak.';
      case 'invalid-email':
        return 'Invalid email address.';
      case 'user-disabled':
        return 'This account has been disabled.';
      case 'too-many-requests':
        return 'Too many attempts. Please try again later.';
      case 'network-request-failed':
        return 'Network error. Check your connection.';
      default:
        return 'Authentication failed ($code). Please try again.';
    }
  }
}

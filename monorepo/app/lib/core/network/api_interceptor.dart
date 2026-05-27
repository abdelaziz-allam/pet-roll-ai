import 'package:dio/dio.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../storage/secure_storage.dart';
import '../constants/app_constants.dart';

class AuthInterceptor extends Interceptor {
  final Ref _ref;

  AuthInterceptor(this._ref);

  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final secureStorage = _ref.read(secureStorageProvider);
    final token = await secureStorage.read(AppConstants.accessTokenKey);

    if (token != null) {
      options.headers['Authorization'] = 'Bearer $token';
    }

    handler.next(options);
  }

  @override
  void onError(DioException err, ErrorInterceptorHandler handler) async {
    if (err.response?.statusCode == 401) {
      final refreshed = await _tryRefreshToken();
      if (refreshed) {
        final retryResponse = await _retry(err.requestOptions);
        return handler.resolve(retryResponse);
      }
      await FirebaseAuth.instance.signOut();
    }
    handler.next(err);
  }

  Future<bool> _tryRefreshToken() async {
    try {
      final secureStorage = _ref.read(secureStorageProvider);
      final refreshToken = await secureStorage.read(AppConstants.refreshTokenKey);

      if (refreshToken == null) return false;

      final dio = Dio(BaseOptions(baseUrl: AppConstants.apiBaseUrl));
      final response = await dio.post('/auth/refresh', data: {
        'refreshToken': refreshToken,
      });

      if (response.statusCode == 200) {
        final newAccessToken = response.data['accessToken'] as String;
        final newRefreshToken = response.data['refreshToken'] as String;

        await secureStorage.write(AppConstants.accessTokenKey, newAccessToken);
        await secureStorage.write(AppConstants.refreshTokenKey, newRefreshToken);
        return true;
      }
    } catch (_) {}
    return false;
  }

  Future<Response> _retry(RequestOptions requestOptions) async {
    final secureStorage = _ref.read(secureStorageProvider);
    final token = await secureStorage.read(AppConstants.accessTokenKey);

    final options = Options(
      method: requestOptions.method,
      headers: {
        ...requestOptions.headers,
        'Authorization': 'Bearer $token',
      },
    );

    return Dio(BaseOptions(baseUrl: AppConstants.apiBaseUrl)).request(
      requestOptions.path,
      data: requestOptions.data,
      queryParameters: requestOptions.queryParameters,
      options: options,
    );
  }
}

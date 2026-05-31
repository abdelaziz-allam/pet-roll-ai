import 'dart:convert';
import 'dart:io';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ApiService {
  static final ApiService _instance = ApiService._internal();
  factory ApiService() => _instance;
  ApiService._internal();

  static const _tokenKey = 'auth_token';
  static const _refreshTokenKey = 'refresh_token';

  String get baseUrl {
    const configuredUrl = String.fromEnvironment('API_BASE_URL');
    if (configuredUrl.isNotEmpty) return configuredUrl;
    return 'https://api.petfolioo.com/api/v1';
  }

  String? _token;
  String? _refreshToken;
  bool get isLoggedIn => _token != null;

  Future<void> loadToken() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString(_tokenKey);
    _refreshToken = prefs.getString(_refreshTokenKey);
  }

  Future<void> setToken(String token) async {
    _token = token;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
  }

  Future<void> setRefreshToken(String token) async {
    _refreshToken = token;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_refreshTokenKey, token);
  }

  Future<void> setTokens(String accessToken, String refreshToken) async {
    _token = accessToken;
    _refreshToken = refreshToken;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, accessToken);
    await prefs.setString(_refreshTokenKey, refreshToken);
  }

  Future<void> clearToken() async {
    _token = null;
    _refreshToken = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    await prefs.remove(_refreshTokenKey);
  }

  Future<bool> _tryRefresh() async {
    if (_refreshToken == null) return false;
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/refresh'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'refreshToken': _refreshToken}),
      );
      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        await setTokens(data['accessToken'], data['refreshToken']);
        return true;
      }
    } catch (_) {}
    return false;
  }

  Map<String, String> get _headers => {
        'Content-Type': 'application/json',
        if (_token != null) 'Authorization': 'Bearer $_token',
      };

  Future<dynamic> get(String path) async {
    var response = await http.get(Uri.parse('$baseUrl$path'), headers: _headers);
    if (response.statusCode == 401 && await _tryRefresh()) {
      response = await http.get(Uri.parse('$baseUrl$path'), headers: _headers);
    }
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw ApiException(response.statusCode, response.body);
  }

  Future<dynamic> post(String path, Map<String, dynamic> body) async {
    var response = await http.post(
      Uri.parse('$baseUrl$path'),
      headers: _headers,
      body: jsonEncode(body),
    );
    if (response.statusCode == 401 && await _tryRefresh()) {
      response = await http.post(
        Uri.parse('$baseUrl$path'),
        headers: _headers,
        body: jsonEncode(body),
      );
    }
    if (response.statusCode == 200 || response.statusCode == 201) {
      return jsonDecode(response.body);
    }
    throw ApiException(response.statusCode, response.body);
  }

  Future<dynamic> put(String path, Map<String, dynamic> body) async {
    var response = await http.put(
      Uri.parse('$baseUrl$path'),
      headers: _headers,
      body: jsonEncode(body),
    );
    if (response.statusCode == 401 && await _tryRefresh()) {
      response = await http.put(
        Uri.parse('$baseUrl$path'),
        headers: _headers,
        body: jsonEncode(body),
      );
    }
    if (response.statusCode == 200) {
      return jsonDecode(response.body);
    }
    throw ApiException(response.statusCode, response.body);
  }

  Future<void> delete(String path) async {
    var response = await http.delete(Uri.parse('$baseUrl$path'), headers: _headers);
    if (response.statusCode == 401 && await _tryRefresh()) {
      response = await http.delete(Uri.parse('$baseUrl$path'), headers: _headers);
    }
    if (response.statusCode != 200 && response.statusCode != 204) {
      throw ApiException(response.statusCode, response.body);
    }
  }

  Future<dynamic> postWithFirebaseToken(String path, String firebaseToken, [Map<String, dynamic>? body]) async {
    final response = await http.post(
      Uri.parse('$baseUrl$path'),
      headers: {
        'Content-Type': 'application/json',
        'x-firebase-token': firebaseToken,
      },
      body: jsonEncode(body ?? {}),
    );
    if (response.statusCode == 200 || response.statusCode == 201) {
      return jsonDecode(response.body);
    }
    throw ApiException(response.statusCode, response.body);
  }

  Future<dynamic> uploadFile(String path, File file, {Map<String, String>? fields}) async {
    final request = http.MultipartRequest('POST', Uri.parse('$baseUrl$path'));
    request.headers.addAll({'Authorization': 'Bearer $_token'});
    if (fields != null) request.fields.addAll(fields);
    request.files.add(await http.MultipartFile.fromPath('file', file.path));
    final streamed = await request.send();
    final response = await http.Response.fromStream(streamed);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return jsonDecode(response.body);
    }
    throw ApiException(response.statusCode, response.body);
  }
}

class ApiException implements Exception {
  final int statusCode;
  final String body;
  ApiException(this.statusCode, this.body);

  @override
  String toString() => 'API Error ($statusCode): $body';
}

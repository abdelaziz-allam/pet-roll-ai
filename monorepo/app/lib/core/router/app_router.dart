import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../features/auth/providers/auth_provider.dart';
import '../../features/auth/screens/login_screen.dart';
import '../../features/auth/screens/register_screen.dart';
import '../../features/onboarding/screens/onboarding_screen.dart';
import '../../features/onboarding/screens/splash_screen.dart';
import '../../features/home/screens/home_shell.dart';
import '../../features/home/screens/dashboard_screen.dart';
import '../../features/pets/screens/pets_list_screen.dart';
import '../../features/pets/screens/pet_detail_screen.dart';
import '../../features/pets/screens/add_pet_screen.dart';
import '../../features/pets/screens/edit_pet_screen.dart';
import '../../features/health/screens/health_records_screen.dart';
import '../../features/health/screens/add_health_record_screen.dart';
import '../../features/vaccination/screens/vaccination_list_screen.dart';
import '../../features/vaccination/screens/add_vaccination_screen.dart';
import '../../features/pregnancy/screens/pregnancy_tracker_screen.dart';
import '../../features/pregnancy/screens/start_pregnancy_screen.dart';
import '../../features/schedules/screens/schedules_screen.dart';
import '../../features/schedules/screens/add_schedule_screen.dart';
import '../../features/mating/screens/mating_browse_screen.dart';
import '../../features/mating/screens/mating_detail_screen.dart';
import '../../features/mating/screens/create_listing_screen.dart';
import '../../features/mating/screens/match_requests_screen.dart';
import '../../features/chat/screens/chat_list_screen.dart';
import '../../features/chat/screens/chat_room_screen.dart';
import '../../features/notifications/screens/notifications_screen.dart';
import '../../features/reports/screens/reports_screen.dart';
import '../../features/profile/screens/profile_screen.dart';
import '../../features/profile/screens/edit_profile_screen.dart';
import '../storage/local_storage.dart';
import 'route_names.dart';

final appRouterProvider = Provider<GoRouter>((ref) {
  final authState = ref.watch(authStateProvider);
  final localStorage = ref.read(localStorageProvider);

  return GoRouter(
    initialLocation: '/',
    debugLogDiagnostics: true,
    redirect: (context, state) {
      final isLoggedIn = authState.valueOrNull != null;
      final isOnAuthRoute = state.matchedLocation == '/login' ||
          state.matchedLocation == '/register';
      final isSplash = state.matchedLocation == '/';
      final isOnboarding = state.matchedLocation == '/onboarding';

      if (isSplash) return null;

      if (!localStorage.onboardingComplete && !isOnboarding) {
        return '/onboarding';
      }

      if (!isLoggedIn && !isOnAuthRoute && !isOnboarding) {
        return '/login';
      }

      if (isLoggedIn && isOnAuthRoute) {
        return '/home';
      }

      return null;
    },
    routes: [
      GoRoute(
        path: '/',
        name: RouteNames.splash,
        builder: (context, state) => const SplashScreen(),
      ),
      GoRoute(
        path: '/onboarding',
        name: RouteNames.onboarding,
        builder: (context, state) => const OnboardingScreen(),
      ),
      GoRoute(
        path: '/login',
        name: RouteNames.login,
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/register',
        name: RouteNames.register,
        builder: (context, state) => const RegisterScreen(),
      ),
      ShellRoute(
        builder: (context, state, child) => HomeShell(child: child),
        routes: [
          GoRoute(
            path: '/home',
            name: RouteNames.home,
            builder: (context, state) => const DashboardScreen(),
          ),
          GoRoute(
            path: '/pets',
            name: RouteNames.pets,
            builder: (context, state) => const PetsListScreen(),
            routes: [
              GoRoute(
                path: 'add',
                name: RouteNames.addPet,
                builder: (context, state) => const AddPetScreen(),
              ),
              GoRoute(
                path: ':petId',
                name: RouteNames.petDetail,
                builder: (context, state) => PetDetailScreen(
                  petId: state.pathParameters['petId']!,
                ),
                routes: [
                  GoRoute(
                    path: 'edit',
                    name: RouteNames.editPet,
                    builder: (context, state) => EditPetScreen(
                      petId: state.pathParameters['petId']!,
                    ),
                  ),
                  GoRoute(
                    path: 'health',
                    name: RouteNames.healthRecords,
                    builder: (context, state) => HealthRecordsScreen(
                      petId: state.pathParameters['petId']!,
                    ),
                    routes: [
                      GoRoute(
                        path: 'add',
                        name: RouteNames.addHealthRecord,
                        builder: (context, state) => AddHealthRecordScreen(
                          petId: state.pathParameters['petId']!,
                        ),
                      ),
                    ],
                  ),
                  GoRoute(
                    path: 'vaccinations',
                    name: RouteNames.vaccinations,
                    builder: (context, state) => VaccinationListScreen(
                      petId: state.pathParameters['petId']!,
                    ),
                    routes: [
                      GoRoute(
                        path: 'add',
                        name: RouteNames.addVaccination,
                        builder: (context, state) => AddVaccinationScreen(
                          petId: state.pathParameters['petId']!,
                        ),
                      ),
                    ],
                  ),
                  GoRoute(
                    path: 'pregnancy',
                    name: RouteNames.pregnancy,
                    builder: (context, state) => PregnancyTrackerScreen(
                      petId: state.pathParameters['petId']!,
                    ),
                    routes: [
                      GoRoute(
                        path: 'start',
                        name: RouteNames.startPregnancy,
                        builder: (context, state) => StartPregnancyScreen(
                          petId: state.pathParameters['petId']!,
                        ),
                      ),
                    ],
                  ),
                  GoRoute(
                    path: 'schedules',
                    name: RouteNames.schedules,
                    builder: (context, state) => SchedulesScreen(
                      petId: state.pathParameters['petId']!,
                    ),
                    routes: [
                      GoRoute(
                        path: 'add',
                        name: RouteNames.addSchedule,
                        builder: (context, state) => AddScheduleScreen(
                          petId: state.pathParameters['petId']!,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ],
          ),
          GoRoute(
            path: '/mating',
            name: RouteNames.mating,
            builder: (context, state) => const MatingBrowseScreen(),
            routes: [
              GoRoute(
                path: 'create',
                name: RouteNames.createListing,
                builder: (context, state) => const CreateListingScreen(),
              ),
              GoRoute(
                path: 'requests',
                name: RouteNames.matchRequests,
                builder: (context, state) => const MatchRequestsScreen(),
              ),
              GoRoute(
                path: ':listingId',
                name: RouteNames.matingDetail,
                builder: (context, state) => MatingDetailScreen(
                  listingId: state.pathParameters['listingId']!,
                ),
              ),
            ],
          ),
          GoRoute(
            path: '/chat',
            name: RouteNames.chat,
            builder: (context, state) => const ChatListScreen(),
            routes: [
              GoRoute(
                path: ':roomId',
                name: RouteNames.chatRoom,
                builder: (context, state) => ChatRoomScreen(
                  roomId: state.pathParameters['roomId']!,
                ),
              ),
            ],
          ),
          GoRoute(
            path: '/profile',
            name: RouteNames.profile,
            builder: (context, state) => const ProfileScreen(),
            routes: [
              GoRoute(
                path: 'edit',
                name: RouteNames.editProfile,
                builder: (context, state) => const EditProfileScreen(),
              ),
            ],
          ),
        ],
      ),
      GoRoute(
        path: '/notifications',
        name: RouteNames.notifications,
        builder: (context, state) => const NotificationsScreen(),
      ),
      GoRoute(
        path: '/reports/:petId',
        name: RouteNames.reports,
        builder: (context, state) => ReportsScreen(
          petId: state.pathParameters['petId']!,
        ),
      ),
    ],
  );
});

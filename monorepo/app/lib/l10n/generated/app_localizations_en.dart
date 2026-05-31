// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appTitle => 'Petfolioo';

  @override
  String get myPets => 'My Pets';

  @override
  String get mating => 'Mating';

  @override
  String get verify => 'Verify';

  @override
  String get profile => 'Profile';

  @override
  String get settings => 'Settings';

  @override
  String get language => 'Language';

  @override
  String get about => 'About';

  @override
  String get logout => 'Log Out';

  @override
  String get deleteAccount => 'Delete Account';

  @override
  String get deleteAccountConfirm =>
      'This will permanently delete your account and all associated data including pets, health records, and mating listings. This action cannot be undone.';

  @override
  String get cancel => 'Cancel';

  @override
  String get delete => 'Delete';

  @override
  String get save => 'Save';

  @override
  String get submit => 'Submit';

  @override
  String get loading => 'Loading...';

  @override
  String get error => 'Error';

  @override
  String get success => 'Success';

  @override
  String get retry => 'Retry';

  @override
  String get noData => 'No data available';

  @override
  String get signIn => 'Sign In';

  @override
  String get signUp => 'Sign Up';

  @override
  String get email => 'Email';

  @override
  String get password => 'Password';

  @override
  String get fullName => 'Full Name';

  @override
  String get createAccount => 'Create Account';

  @override
  String get continueWithGoogle => 'Continue with Google';

  @override
  String get continueWithApple => 'Continue with Apple';

  @override
  String get alreadyHaveAccount => 'Already have an account? ';

  @override
  String get dontHaveAccount => 'Don\'t have an account? ';

  @override
  String get reminderNotifications => 'Reminder Notifications';

  @override
  String get reminderNotificationsDesc =>
      'How many reminders before each event';

  @override
  String get feedbackAndSuggestions => 'Feedback & Suggestions';

  @override
  String get feedbackDesc => 'Help us improve Petfolioo';

  @override
  String get rateUs => 'Rate Us';

  @override
  String get rateUsDesc => 'Love Petfolioo? Leave a review!';

  @override
  String get enjoyingApp => 'Enjoying Petfolioo?';

  @override
  String get rateUsMessage =>
      'If you love our app, please take a moment to rate us on the Play Store. Your feedback helps us grow!';

  @override
  String get rateNow => 'Rate Now';

  @override
  String get later => 'Later';

  @override
  String get feedback => 'Feedback';

  @override
  String get myFeedback => 'My Feedback';

  @override
  String get newFeedback => 'New Feedback';

  @override
  String get bugReport => 'Bug Report';

  @override
  String get suggestion => 'Suggestion';

  @override
  String get general => 'General';

  @override
  String get feedbackPlaceholder => 'Describe your feedback or suggestion...';

  @override
  String get submitFeedback => 'Submit Feedback';

  @override
  String get feedbackSent => 'Thank you! Your feedback has been submitted.';

  @override
  String get noFeedbackYet => 'No feedback yet. Share your thoughts with us!';

  @override
  String get adminReply => 'Admin Reply';

  @override
  String get open => 'Open';

  @override
  String get replied => 'Replied';

  @override
  String get closed => 'Closed';

  @override
  String petsRegistered(int count) {
    return '$count pet(s) registered';
  }

  @override
  String get noPetsYet => 'No pets yet';

  @override
  String get yourFurryFamily => 'Your furry family members';

  @override
  String get tapToAddPet => 'Tap + to add your first pet';

  @override
  String get dangerZone => 'Danger Zone';

  @override
  String get permanentlyRemoveData => 'Permanently remove all data';

  @override
  String get english => 'English';

  @override
  String get swedish => 'Svenska';

  @override
  String get selectLanguage => 'Select Language';
}

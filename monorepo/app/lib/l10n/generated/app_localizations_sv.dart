// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for Swedish (`sv`).
class AppLocalizationsSv extends AppLocalizations {
  AppLocalizationsSv([String locale = 'sv']) : super(locale);

  @override
  String get appTitle => 'Petfolioo';

  @override
  String get myPets => 'Mina Husdjur';

  @override
  String get mating => 'Parning';

  @override
  String get verify => 'Verifiera';

  @override
  String get profile => 'Profil';

  @override
  String get settings => 'Inställningar';

  @override
  String get language => 'Språk';

  @override
  String get about => 'Om';

  @override
  String get logout => 'Logga Ut';

  @override
  String get deleteAccount => 'Radera Konto';

  @override
  String get deleteAccountConfirm =>
      'Detta kommer permanent radera ditt konto och all tillhörande data inklusive husdjur, hälsojournaler och parningsannonser. Denna åtgärd kan inte ångras.';

  @override
  String get cancel => 'Avbryt';

  @override
  String get delete => 'Radera';

  @override
  String get save => 'Spara';

  @override
  String get submit => 'Skicka';

  @override
  String get loading => 'Laddar...';

  @override
  String get error => 'Fel';

  @override
  String get success => 'Lyckat';

  @override
  String get retry => 'Försök igen';

  @override
  String get noData => 'Ingen data tillgänglig';

  @override
  String get signIn => 'Logga In';

  @override
  String get signUp => 'Registrera';

  @override
  String get email => 'E-post';

  @override
  String get password => 'Lösenord';

  @override
  String get fullName => 'Fullständigt Namn';

  @override
  String get createAccount => 'Skapa Konto';

  @override
  String get continueWithGoogle => 'Fortsätt med Google';

  @override
  String get continueWithApple => 'Fortsätt med Apple';

  @override
  String get alreadyHaveAccount => 'Har du redan ett konto? ';

  @override
  String get dontHaveAccount => 'Har du inget konto? ';

  @override
  String get reminderNotifications => 'Påminnelser';

  @override
  String get reminderNotificationsDesc =>
      'Antal påminnelser före varje händelse';

  @override
  String get feedbackAndSuggestions => 'Feedback & Förslag';

  @override
  String get feedbackDesc => 'Hjälp oss förbättra Petfolioo';

  @override
  String get rateUs => 'Betygsätt Oss';

  @override
  String get rateUsDesc => 'Gillar du Petfolioo? Lämna ett omdöme!';

  @override
  String get enjoyingApp => 'Gillar du Petfolioo?';

  @override
  String get rateUsMessage =>
      'Om du gillar vår app, vänligen ta en stund att betygsätta oss på Play Store. Din feedback hjälper oss växa!';

  @override
  String get rateNow => 'Betygsätt Nu';

  @override
  String get later => 'Senare';

  @override
  String get feedback => 'Feedback';

  @override
  String get myFeedback => 'Min Feedback';

  @override
  String get newFeedback => 'Ny Feedback';

  @override
  String get bugReport => 'Felrapport';

  @override
  String get suggestion => 'Förslag';

  @override
  String get general => 'Allmänt';

  @override
  String get feedbackPlaceholder =>
      'Beskriv din feedback eller ditt förslag...';

  @override
  String get submitFeedback => 'Skicka Feedback';

  @override
  String get feedbackSent => 'Tack! Din feedback har skickats.';

  @override
  String get noFeedbackYet => 'Ingen feedback ännu. Dela dina tankar med oss!';

  @override
  String get adminReply => 'Adminsvar';

  @override
  String get open => 'Öppen';

  @override
  String get replied => 'Besvarad';

  @override
  String get closed => 'Stängd';

  @override
  String petsRegistered(int count) {
    return '$count husdjur registrerade';
  }

  @override
  String get noPetsYet => 'Inga husdjur ännu';

  @override
  String get yourFurryFamily => 'Dina lurviga familjemedlemmar';

  @override
  String get tapToAddPet => 'Tryck + för att lägga till ditt första husdjur';

  @override
  String get dangerZone => 'Riskzon';

  @override
  String get permanentlyRemoveData => 'Ta bort all data permanent';

  @override
  String get english => 'English';

  @override
  String get swedish => 'Svenska';

  @override
  String get selectLanguage => 'Välj Språk';
}

import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_en.dart';
import 'app_localizations_sv.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'generated/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
      : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations? of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations);
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('en'),
    Locale('sv')
  ];

  /// No description provided for @appTitle.
  ///
  /// In en, this message translates to:
  /// **'Petfolioo'**
  String get appTitle;

  /// No description provided for @myPets.
  ///
  /// In en, this message translates to:
  /// **'My Pets'**
  String get myPets;

  /// No description provided for @mating.
  ///
  /// In en, this message translates to:
  /// **'Mating'**
  String get mating;

  /// No description provided for @verify.
  ///
  /// In en, this message translates to:
  /// **'Verify'**
  String get verify;

  /// No description provided for @profile.
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get profile;

  /// No description provided for @settings.
  ///
  /// In en, this message translates to:
  /// **'Settings'**
  String get settings;

  /// No description provided for @language.
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get language;

  /// No description provided for @about.
  ///
  /// In en, this message translates to:
  /// **'About'**
  String get about;

  /// No description provided for @logout.
  ///
  /// In en, this message translates to:
  /// **'Log Out'**
  String get logout;

  /// No description provided for @deleteAccount.
  ///
  /// In en, this message translates to:
  /// **'Delete Account'**
  String get deleteAccount;

  /// No description provided for @deleteAccountConfirm.
  ///
  /// In en, this message translates to:
  /// **'This will permanently delete your account and all associated data including pets, health records, and mating listings. This action cannot be undone.'**
  String get deleteAccountConfirm;

  /// No description provided for @cancel.
  ///
  /// In en, this message translates to:
  /// **'Cancel'**
  String get cancel;

  /// No description provided for @delete.
  ///
  /// In en, this message translates to:
  /// **'Delete'**
  String get delete;

  /// No description provided for @save.
  ///
  /// In en, this message translates to:
  /// **'Save'**
  String get save;

  /// No description provided for @submit.
  ///
  /// In en, this message translates to:
  /// **'Submit'**
  String get submit;

  /// No description provided for @loading.
  ///
  /// In en, this message translates to:
  /// **'Loading...'**
  String get loading;

  /// No description provided for @error.
  ///
  /// In en, this message translates to:
  /// **'Error'**
  String get error;

  /// No description provided for @success.
  ///
  /// In en, this message translates to:
  /// **'Success'**
  String get success;

  /// No description provided for @retry.
  ///
  /// In en, this message translates to:
  /// **'Retry'**
  String get retry;

  /// No description provided for @noData.
  ///
  /// In en, this message translates to:
  /// **'No data available'**
  String get noData;

  /// No description provided for @signIn.
  ///
  /// In en, this message translates to:
  /// **'Sign In'**
  String get signIn;

  /// No description provided for @signUp.
  ///
  /// In en, this message translates to:
  /// **'Sign Up'**
  String get signUp;

  /// No description provided for @email.
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get email;

  /// No description provided for @password.
  ///
  /// In en, this message translates to:
  /// **'Password'**
  String get password;

  /// No description provided for @fullName.
  ///
  /// In en, this message translates to:
  /// **'Full Name'**
  String get fullName;

  /// No description provided for @createAccount.
  ///
  /// In en, this message translates to:
  /// **'Create Account'**
  String get createAccount;

  /// No description provided for @continueWithGoogle.
  ///
  /// In en, this message translates to:
  /// **'Continue with Google'**
  String get continueWithGoogle;

  /// No description provided for @continueWithApple.
  ///
  /// In en, this message translates to:
  /// **'Continue with Apple'**
  String get continueWithApple;

  /// No description provided for @alreadyHaveAccount.
  ///
  /// In en, this message translates to:
  /// **'Already have an account? '**
  String get alreadyHaveAccount;

  /// No description provided for @dontHaveAccount.
  ///
  /// In en, this message translates to:
  /// **'Don\'t have an account? '**
  String get dontHaveAccount;

  /// No description provided for @reminderNotifications.
  ///
  /// In en, this message translates to:
  /// **'Reminder Notifications'**
  String get reminderNotifications;

  /// No description provided for @reminderNotificationsDesc.
  ///
  /// In en, this message translates to:
  /// **'How many reminders before each event'**
  String get reminderNotificationsDesc;

  /// No description provided for @feedbackAndSuggestions.
  ///
  /// In en, this message translates to:
  /// **'Feedback & Suggestions'**
  String get feedbackAndSuggestions;

  /// No description provided for @feedbackDesc.
  ///
  /// In en, this message translates to:
  /// **'Help us improve Petfolioo'**
  String get feedbackDesc;

  /// No description provided for @rateUs.
  ///
  /// In en, this message translates to:
  /// **'Rate Us'**
  String get rateUs;

  /// No description provided for @rateUsDesc.
  ///
  /// In en, this message translates to:
  /// **'Love Petfolioo? Leave a review!'**
  String get rateUsDesc;

  /// No description provided for @enjoyingApp.
  ///
  /// In en, this message translates to:
  /// **'Enjoying Petfolioo?'**
  String get enjoyingApp;

  /// No description provided for @rateUsMessage.
  ///
  /// In en, this message translates to:
  /// **'If you love our app, please take a moment to rate us on the Play Store. Your feedback helps us grow!'**
  String get rateUsMessage;

  /// No description provided for @rateNow.
  ///
  /// In en, this message translates to:
  /// **'Rate Now'**
  String get rateNow;

  /// No description provided for @later.
  ///
  /// In en, this message translates to:
  /// **'Later'**
  String get later;

  /// No description provided for @feedback.
  ///
  /// In en, this message translates to:
  /// **'Feedback'**
  String get feedback;

  /// No description provided for @myFeedback.
  ///
  /// In en, this message translates to:
  /// **'My Feedback'**
  String get myFeedback;

  /// No description provided for @newFeedback.
  ///
  /// In en, this message translates to:
  /// **'New Feedback'**
  String get newFeedback;

  /// No description provided for @bugReport.
  ///
  /// In en, this message translates to:
  /// **'Bug Report'**
  String get bugReport;

  /// No description provided for @suggestion.
  ///
  /// In en, this message translates to:
  /// **'Suggestion'**
  String get suggestion;

  /// No description provided for @general.
  ///
  /// In en, this message translates to:
  /// **'General'**
  String get general;

  /// No description provided for @feedbackPlaceholder.
  ///
  /// In en, this message translates to:
  /// **'Describe your feedback or suggestion...'**
  String get feedbackPlaceholder;

  /// No description provided for @submitFeedback.
  ///
  /// In en, this message translates to:
  /// **'Submit Feedback'**
  String get submitFeedback;

  /// No description provided for @feedbackSent.
  ///
  /// In en, this message translates to:
  /// **'Thank you! Your feedback has been submitted.'**
  String get feedbackSent;

  /// No description provided for @noFeedbackYet.
  ///
  /// In en, this message translates to:
  /// **'No feedback yet. Share your thoughts with us!'**
  String get noFeedbackYet;

  /// No description provided for @adminReply.
  ///
  /// In en, this message translates to:
  /// **'Admin Reply'**
  String get adminReply;

  /// No description provided for @open.
  ///
  /// In en, this message translates to:
  /// **'Open'**
  String get open;

  /// No description provided for @replied.
  ///
  /// In en, this message translates to:
  /// **'Replied'**
  String get replied;

  /// No description provided for @closed.
  ///
  /// In en, this message translates to:
  /// **'Closed'**
  String get closed;

  /// No description provided for @petsRegistered.
  ///
  /// In en, this message translates to:
  /// **'{count} pet(s) registered'**
  String petsRegistered(int count);

  /// No description provided for @noPetsYet.
  ///
  /// In en, this message translates to:
  /// **'No pets yet'**
  String get noPetsYet;

  /// No description provided for @yourFurryFamily.
  ///
  /// In en, this message translates to:
  /// **'Your furry family members'**
  String get yourFurryFamily;

  /// No description provided for @tapToAddPet.
  ///
  /// In en, this message translates to:
  /// **'Tap + to add your first pet'**
  String get tapToAddPet;

  /// No description provided for @dangerZone.
  ///
  /// In en, this message translates to:
  /// **'Danger Zone'**
  String get dangerZone;

  /// No description provided for @permanentlyRemoveData.
  ///
  /// In en, this message translates to:
  /// **'Permanently remove all data'**
  String get permanentlyRemoveData;

  /// No description provided for @english.
  ///
  /// In en, this message translates to:
  /// **'English'**
  String get english;

  /// No description provided for @swedish.
  ///
  /// In en, this message translates to:
  /// **'Svenska'**
  String get swedish;

  /// No description provided for @selectLanguage.
  ///
  /// In en, this message translates to:
  /// **'Select Language'**
  String get selectLanguage;

  /// No description provided for @feedbackType.
  ///
  /// In en, this message translates to:
  /// **'Feedback Type'**
  String get feedbackType;

  /// No description provided for @yourMessage.
  ///
  /// In en, this message translates to:
  /// **'Your Message'**
  String get yourMessage;

  /// No description provided for @justNow.
  ///
  /// In en, this message translates to:
  /// **'Just now'**
  String get justNow;

  /// No description provided for @connectionError.
  ///
  /// In en, this message translates to:
  /// **'Connection Error'**
  String get connectionError;

  /// No description provided for @unknown.
  ///
  /// In en, this message translates to:
  /// **'Unknown'**
  String get unknown;

  /// No description provided for @add.
  ///
  /// In en, this message translates to:
  /// **'Add'**
  String get add;

  /// No description provided for @search.
  ///
  /// In en, this message translates to:
  /// **'Search...'**
  String get search;

  /// No description provided for @noResultsFound.
  ///
  /// In en, this message translates to:
  /// **'No results found'**
  String get noResultsFound;

  /// No description provided for @saveChanges.
  ///
  /// In en, this message translates to:
  /// **'Save Changes'**
  String get saveChanges;

  /// No description provided for @confirm.
  ///
  /// In en, this message translates to:
  /// **'Confirm'**
  String get confirm;

  /// No description provided for @remove.
  ///
  /// In en, this message translates to:
  /// **'Remove'**
  String get remove;

  /// No description provided for @yes.
  ///
  /// In en, this message translates to:
  /// **'Yes'**
  String get yes;

  /// No description provided for @no.
  ///
  /// In en, this message translates to:
  /// **'No'**
  String get no;

  /// No description provided for @done.
  ///
  /// In en, this message translates to:
  /// **'Done'**
  String get done;

  /// No description provided for @close.
  ///
  /// In en, this message translates to:
  /// **'Close'**
  String get close;

  /// No description provided for @today.
  ///
  /// In en, this message translates to:
  /// **'Today'**
  String get today;

  /// No description provided for @yesterday.
  ///
  /// In en, this message translates to:
  /// **'Yesterday'**
  String get yesterday;

  /// No description provided for @overdue.
  ///
  /// In en, this message translates to:
  /// **'Overdue'**
  String get overdue;

  /// No description provided for @active.
  ///
  /// In en, this message translates to:
  /// **'Active'**
  String get active;

  /// No description provided for @completed.
  ///
  /// In en, this message translates to:
  /// **'Completed'**
  String get completed;

  /// No description provided for @pending.
  ///
  /// In en, this message translates to:
  /// **'Pending'**
  String get pending;

  /// No description provided for @accepted.
  ///
  /// In en, this message translates to:
  /// **'Accepted'**
  String get accepted;

  /// No description provided for @rejected.
  ///
  /// In en, this message translates to:
  /// **'Rejected'**
  String get rejected;

  /// No description provided for @photos.
  ///
  /// In en, this message translates to:
  /// **'Photos'**
  String get photos;

  /// No description provided for @addPhoto.
  ///
  /// In en, this message translates to:
  /// **'Add Photo'**
  String get addPhoto;

  /// No description provided for @camera.
  ///
  /// In en, this message translates to:
  /// **'Camera'**
  String get camera;

  /// No description provided for @gallery.
  ///
  /// In en, this message translates to:
  /// **'Gallery'**
  String get gallery;

  /// No description provided for @notes.
  ///
  /// In en, this message translates to:
  /// **'Notes'**
  String get notes;

  /// No description provided for @description.
  ///
  /// In en, this message translates to:
  /// **'Description'**
  String get description;

  /// No description provided for @type.
  ///
  /// In en, this message translates to:
  /// **'Type'**
  String get type;

  /// No description provided for @addNewPet.
  ///
  /// In en, this message translates to:
  /// **'Add New Pet'**
  String get addNewPet;

  /// No description provided for @basicInformation.
  ///
  /// In en, this message translates to:
  /// **'Basic Information'**
  String get basicInformation;

  /// No description provided for @petName.
  ///
  /// In en, this message translates to:
  /// **'Pet Name'**
  String get petName;

  /// No description provided for @petNameRequired.
  ///
  /// In en, this message translates to:
  /// **'Name is required'**
  String get petNameRequired;

  /// No description provided for @species.
  ///
  /// In en, this message translates to:
  /// **'Species'**
  String get species;

  /// No description provided for @selectSpecies.
  ///
  /// In en, this message translates to:
  /// **'Select Species'**
  String get selectSpecies;

  /// No description provided for @searchSpecies.
  ///
  /// In en, this message translates to:
  /// **'Search species...'**
  String get searchSpecies;

  /// No description provided for @gender.
  ///
  /// In en, this message translates to:
  /// **'Gender'**
  String get gender;

  /// No description provided for @breed.
  ///
  /// In en, this message translates to:
  /// **'Breed'**
  String get breed;

  /// No description provided for @weightKg.
  ///
  /// In en, this message translates to:
  /// **'Weight (kg)'**
  String get weightKg;

  /// No description provided for @color.
  ///
  /// In en, this message translates to:
  /// **'Color'**
  String get color;

  /// No description provided for @dateOfBirth.
  ///
  /// In en, this message translates to:
  /// **'Date of Birth'**
  String get dateOfBirth;

  /// No description provided for @location.
  ///
  /// In en, this message translates to:
  /// **'Location'**
  String get location;

  /// No description provided for @country.
  ///
  /// In en, this message translates to:
  /// **'Country'**
  String get country;

  /// No description provided for @selectCountry.
  ///
  /// In en, this message translates to:
  /// **'Select Country'**
  String get selectCountry;

  /// No description provided for @city.
  ///
  /// In en, this message translates to:
  /// **'City'**
  String get city;

  /// No description provided for @selectCity.
  ///
  /// In en, this message translates to:
  /// **'Select City'**
  String get selectCity;

  /// No description provided for @pleaseSelectCountryFirst.
  ///
  /// In en, this message translates to:
  /// **'Please select a country first'**
  String get pleaseSelectCountryFirst;

  /// No description provided for @details.
  ///
  /// In en, this message translates to:
  /// **'Details'**
  String get details;

  /// No description provided for @neuteredSpayed.
  ///
  /// In en, this message translates to:
  /// **'Neutered / Spayed'**
  String get neuteredSpayed;

  /// No description provided for @availableForMating.
  ///
  /// In en, this message translates to:
  /// **'Available for Mating'**
  String get availableForMating;

  /// No description provided for @addPet.
  ///
  /// In en, this message translates to:
  /// **'Add Pet'**
  String get addPet;

  /// No description provided for @petAddedSuccessfully.
  ///
  /// In en, this message translates to:
  /// **'Pet added successfully!'**
  String get petAddedSuccessfully;

  /// No description provided for @editPet.
  ///
  /// In en, this message translates to:
  /// **'Edit Pet'**
  String get editPet;

  /// No description provided for @enterPetName.
  ///
  /// In en, this message translates to:
  /// **'Enter pet name'**
  String get enterPetName;

  /// No description provided for @enterBreed.
  ///
  /// In en, this message translates to:
  /// **'Enter breed'**
  String get enterBreed;

  /// No description provided for @selectDateOfBirth.
  ///
  /// In en, this message translates to:
  /// **'Select date of birth'**
  String get selectDateOfBirth;

  /// No description provided for @enterWeight.
  ///
  /// In en, this message translates to:
  /// **'Enter weight'**
  String get enterWeight;

  /// No description provided for @neutered.
  ///
  /// In en, this message translates to:
  /// **'Neutered'**
  String get neutered;

  /// No description provided for @uploading.
  ///
  /// In en, this message translates to:
  /// **'Uploading...'**
  String get uploading;

  /// No description provided for @noPhotosYet.
  ///
  /// In en, this message translates to:
  /// **'No photos yet. Add one!'**
  String get noPhotosYet;

  /// No description provided for @tapPhotoToSetProfile.
  ///
  /// In en, this message translates to:
  /// **'Tap a photo to set it as profile image'**
  String get tapPhotoToSetProfile;

  /// No description provided for @petUpdatedSuccessfully.
  ///
  /// In en, this message translates to:
  /// **'Pet updated successfully!'**
  String get petUpdatedSuccessfully;

  /// No description provided for @failedToUpdate.
  ///
  /// In en, this message translates to:
  /// **'Failed to update'**
  String get failedToUpdate;

  /// No description provided for @failedToUploadPhoto.
  ///
  /// In en, this message translates to:
  /// **'Failed to upload photo'**
  String get failedToUploadPhoto;

  /// No description provided for @removePhoto.
  ///
  /// In en, this message translates to:
  /// **'Remove Photo'**
  String get removePhoto;

  /// No description provided for @removePhotoConfirm.
  ///
  /// In en, this message translates to:
  /// **'Are you sure you want to remove this photo?'**
  String get removePhotoConfirm;

  /// No description provided for @failedToRemovePhoto.
  ///
  /// In en, this message translates to:
  /// **'Failed to remove photo'**
  String get failedToRemovePhoto;

  /// No description provided for @basicInfo.
  ///
  /// In en, this message translates to:
  /// **'Basic Info'**
  String get basicInfo;

  /// No description provided for @status.
  ///
  /// In en, this message translates to:
  /// **'Status'**
  String get status;

  /// No description provided for @health.
  ///
  /// In en, this message translates to:
  /// **'Health'**
  String get health;

  /// No description provided for @more.
  ///
  /// In en, this message translates to:
  /// **'More'**
  String get more;

  /// No description provided for @vaccinations.
  ///
  /// In en, this message translates to:
  /// **'Vaccinations'**
  String get vaccinations;

  /// No description provided for @trackVaccinesDosesSchedules.
  ///
  /// In en, this message translates to:
  /// **'Track vaccines, doses & schedules'**
  String get trackVaccinesDosesSchedules;

  /// No description provided for @pregnancy.
  ///
  /// In en, this message translates to:
  /// **'Pregnancy'**
  String get pregnancy;

  /// No description provided for @trackPregnanciesDueDates.
  ///
  /// In en, this message translates to:
  /// **'Track pregnancies & due dates'**
  String get trackPregnanciesDueDates;

  /// No description provided for @healthCertification.
  ///
  /// In en, this message translates to:
  /// **'Health Certification'**
  String get healthCertification;

  /// No description provided for @photoGallery.
  ///
  /// In en, this message translates to:
  /// **'Photo Gallery'**
  String get photoGallery;

  /// No description provided for @deletePet.
  ///
  /// In en, this message translates to:
  /// **'Delete Pet'**
  String get deletePet;

  /// No description provided for @petUpdated.
  ///
  /// In en, this message translates to:
  /// **'Pet updated'**
  String get petUpdated;

  /// No description provided for @weight.
  ///
  /// In en, this message translates to:
  /// **'Weight'**
  String get weight;

  /// No description provided for @browse.
  ///
  /// In en, this message translates to:
  /// **'Browse'**
  String get browse;

  /// No description provided for @requests.
  ///
  /// In en, this message translates to:
  /// **'Requests'**
  String get requests;

  /// No description provided for @cards.
  ///
  /// In en, this message translates to:
  /// **'Cards'**
  String get cards;

  /// No description provided for @createListing.
  ///
  /// In en, this message translates to:
  /// **'Create Listing'**
  String get createListing;

  /// No description provided for @listingDetails.
  ///
  /// In en, this message translates to:
  /// **'Listing Details'**
  String get listingDetails;

  /// No description provided for @petDetails.
  ///
  /// In en, this message translates to:
  /// **'Pet Details'**
  String get petDetails;

  /// No description provided for @preferences.
  ///
  /// In en, this message translates to:
  /// **'Preferences'**
  String get preferences;

  /// No description provided for @sendMatchRequest.
  ///
  /// In en, this message translates to:
  /// **'Send Match Request'**
  String get sendMatchRequest;

  /// No description provided for @verifiedBreeder.
  ///
  /// In en, this message translates to:
  /// **'Verified Breeder'**
  String get verifiedBreeder;

  /// No description provided for @matchRequest.
  ///
  /// In en, this message translates to:
  /// **'Match Request'**
  String get matchRequest;

  /// No description provided for @matingRequest.
  ///
  /// In en, this message translates to:
  /// **'Mating Request'**
  String get matingRequest;

  /// No description provided for @requestDetails.
  ///
  /// In en, this message translates to:
  /// **'Request Details'**
  String get requestDetails;

  /// No description provided for @listingPet.
  ///
  /// In en, this message translates to:
  /// **'Listing Pet'**
  String get listingPet;

  /// No description provided for @yourPet.
  ///
  /// In en, this message translates to:
  /// **'Your Pet'**
  String get yourPet;

  /// No description provided for @message.
  ///
  /// In en, this message translates to:
  /// **'Message'**
  String get message;

  /// No description provided for @matchConfirmed.
  ///
  /// In en, this message translates to:
  /// **'Match Confirmed!'**
  String get matchConfirmed;

  /// No description provided for @viewWeddingCard.
  ///
  /// In en, this message translates to:
  /// **'View Wedding Card'**
  String get viewWeddingCard;

  /// No description provided for @decline.
  ///
  /// In en, this message translates to:
  /// **'Decline'**
  String get decline;

  /// No description provided for @accept.
  ///
  /// In en, this message translates to:
  /// **'Accept'**
  String get accept;

  /// No description provided for @sent.
  ///
  /// In en, this message translates to:
  /// **'Sent'**
  String get sent;

  /// No description provided for @received.
  ///
  /// In en, this message translates to:
  /// **'Received'**
  String get received;

  /// No description provided for @noRequestsYet.
  ///
  /// In en, this message translates to:
  /// **'No requests yet'**
  String get noRequestsYet;

  /// No description provided for @noListingsFound.
  ///
  /// In en, this message translates to:
  /// **'No listings found'**
  String get noListingsFound;

  /// No description provided for @filterBySpecies.
  ///
  /// In en, this message translates to:
  /// **'Filter by species'**
  String get filterBySpecies;

  /// No description provided for @allSpecies.
  ///
  /// In en, this message translates to:
  /// **'All Species'**
  String get allSpecies;

  /// No description provided for @sendRequest.
  ///
  /// In en, this message translates to:
  /// **'Send Request'**
  String get sendRequest;

  /// No description provided for @requestSent.
  ///
  /// In en, this message translates to:
  /// **'Request sent!'**
  String get requestSent;

  /// No description provided for @topBreeders.
  ///
  /// In en, this message translates to:
  /// **'Top Breeders'**
  String get topBreeders;

  /// No description provided for @noRankingsYet.
  ///
  /// In en, this message translates to:
  /// **'No rankings yet'**
  String get noRankingsYet;

  /// No description provided for @matchesCount.
  ///
  /// In en, this message translates to:
  /// **'matches'**
  String get matchesCount;

  /// No description provided for @listingsCount.
  ///
  /// In en, this message translates to:
  /// **'listings'**
  String get listingsCount;

  /// No description provided for @viewsCount.
  ///
  /// In en, this message translates to:
  /// **'views'**
  String get viewsCount;

  /// No description provided for @weddingCard.
  ///
  /// In en, this message translates to:
  /// **'Wedding Card'**
  String get weddingCard;

  /// No description provided for @shareWeddingCard.
  ///
  /// In en, this message translates to:
  /// **'Share Wedding Card'**
  String get shareWeddingCard;

  /// No description provided for @preparingShare.
  ///
  /// In en, this message translates to:
  /// **'Preparing...'**
  String get preparingShare;

  /// No description provided for @congratulations.
  ///
  /// In en, this message translates to:
  /// **'Congratulations'**
  String get congratulations;

  /// No description provided for @wonderful.
  ///
  /// In en, this message translates to:
  /// **'Wonderful!'**
  String get wonderful;

  /// No description provided for @perfectPairFound.
  ///
  /// In en, this message translates to:
  /// **'A perfect pair has been found'**
  String get perfectPairFound;

  /// No description provided for @noWeddingCardsYet.
  ///
  /// In en, this message translates to:
  /// **'No wedding cards yet'**
  String get noWeddingCardsYet;

  /// No description provided for @selectPet.
  ///
  /// In en, this message translates to:
  /// **'Select Pet'**
  String get selectPet;

  /// No description provided for @enterDescription.
  ///
  /// In en, this message translates to:
  /// **'Enter description'**
  String get enterDescription;

  /// No description provided for @createMatingListing.
  ///
  /// In en, this message translates to:
  /// **'Create Mating Listing'**
  String get createMatingListing;

  /// No description provided for @listingCreated.
  ///
  /// In en, this message translates to:
  /// **'Listing created successfully!'**
  String get listingCreated;

  /// No description provided for @healthRecords.
  ///
  /// In en, this message translates to:
  /// **'Health Records'**
  String get healthRecords;

  /// No description provided for @matingProfile.
  ///
  /// In en, this message translates to:
  /// **'Mating Profile'**
  String get matingProfile;

  /// No description provided for @verificationStatus.
  ///
  /// In en, this message translates to:
  /// **'Verification Status'**
  String get verificationStatus;

  /// No description provided for @submitVerification.
  ///
  /// In en, this message translates to:
  /// **'Submit Verification'**
  String get submitVerification;

  /// No description provided for @verificationPending.
  ///
  /// In en, this message translates to:
  /// **'Verification Pending'**
  String get verificationPending;

  /// No description provided for @verificationApproved.
  ///
  /// In en, this message translates to:
  /// **'Verification Approved'**
  String get verificationApproved;

  /// No description provided for @verificationRejected.
  ///
  /// In en, this message translates to:
  /// **'Verification Rejected'**
  String get verificationRejected;

  /// No description provided for @verificationExpired.
  ///
  /// In en, this message translates to:
  /// **'Verification Expired'**
  String get verificationExpired;

  /// No description provided for @breederCertificate.
  ///
  /// In en, this message translates to:
  /// **'Breeder Certificate'**
  String get breederCertificate;

  /// No description provided for @verifiedSince.
  ///
  /// In en, this message translates to:
  /// **'Verified since'**
  String get verifiedSince;

  /// No description provided for @expiresOn.
  ///
  /// In en, this message translates to:
  /// **'Expires on'**
  String get expiresOn;

  /// No description provided for @resubmit.
  ///
  /// In en, this message translates to:
  /// **'Resubmit'**
  String get resubmit;

  /// No description provided for @uploadDocuments.
  ///
  /// In en, this message translates to:
  /// **'Upload Documents'**
  String get uploadDocuments;

  /// No description provided for @idDocument.
  ///
  /// In en, this message translates to:
  /// **'ID Document'**
  String get idDocument;

  /// No description provided for @breedingLicense.
  ///
  /// In en, this message translates to:
  /// **'Breeding License'**
  String get breedingLicense;

  /// No description provided for @facilityPhotos.
  ///
  /// In en, this message translates to:
  /// **'Facility Photos'**
  String get facilityPhotos;

  /// No description provided for @yearsOfExperience.
  ///
  /// In en, this message translates to:
  /// **'Years of Experience'**
  String get yearsOfExperience;

  /// No description provided for @numberOfBreeds.
  ///
  /// In en, this message translates to:
  /// **'Number of Breeds'**
  String get numberOfBreeds;

  /// No description provided for @kennelName.
  ///
  /// In en, this message translates to:
  /// **'Kennel Name'**
  String get kennelName;

  /// No description provided for @registrationNumber.
  ///
  /// In en, this message translates to:
  /// **'Registration Number'**
  String get registrationNumber;

  /// No description provided for @verificationSubmitted.
  ///
  /// In en, this message translates to:
  /// **'Verification submitted successfully'**
  String get verificationSubmitted;

  /// No description provided for @banned.
  ///
  /// In en, this message translates to:
  /// **'Banned'**
  String get banned;

  /// No description provided for @revoked.
  ///
  /// In en, this message translates to:
  /// **'Revoked'**
  String get revoked;

  /// No description provided for @editProfile.
  ///
  /// In en, this message translates to:
  /// **'Edit Profile'**
  String get editProfile;

  /// No description provided for @displayName.
  ///
  /// In en, this message translates to:
  /// **'Display Name'**
  String get displayName;

  /// No description provided for @enterDisplayName.
  ///
  /// In en, this message translates to:
  /// **'Enter your display name'**
  String get enterDisplayName;

  /// No description provided for @displayNameRequired.
  ///
  /// In en, this message translates to:
  /// **'Display name is required'**
  String get displayNameRequired;

  /// No description provided for @timezone.
  ///
  /// In en, this message translates to:
  /// **'Timezone'**
  String get timezone;

  /// No description provided for @selectTimezone.
  ///
  /// In en, this message translates to:
  /// **'Select timezone'**
  String get selectTimezone;

  /// No description provided for @selectYourCountry.
  ///
  /// In en, this message translates to:
  /// **'Select your country'**
  String get selectYourCountry;

  /// No description provided for @cityOptional.
  ///
  /// In en, this message translates to:
  /// **'City (Optional)'**
  String get cityOptional;

  /// No description provided for @enterYourCity.
  ///
  /// In en, this message translates to:
  /// **'Enter your city'**
  String get enterYourCity;

  /// No description provided for @profileUpdatedSuccessfully.
  ///
  /// In en, this message translates to:
  /// **'Profile updated successfully'**
  String get profileUpdatedSuccessfully;

  /// No description provided for @failedToUpdateProfile.
  ///
  /// In en, this message translates to:
  /// **'Failed to update profile'**
  String get failedToUpdateProfile;

  /// No description provided for @notificationSettings.
  ///
  /// In en, this message translates to:
  /// **'Notification Settings'**
  String get notificationSettings;

  /// No description provided for @numberOfReminders.
  ///
  /// In en, this message translates to:
  /// **'Number of Reminders'**
  String get numberOfReminders;

  /// No description provided for @saveSettings.
  ///
  /// In en, this message translates to:
  /// **'Save Settings'**
  String get saveSettings;

  /// No description provided for @notifications.
  ///
  /// In en, this message translates to:
  /// **'Notifications'**
  String get notifications;

  /// No description provided for @markAllRead.
  ///
  /// In en, this message translates to:
  /// **'Mark all read'**
  String get markAllRead;

  /// No description provided for @noNotificationsYet.
  ///
  /// In en, this message translates to:
  /// **'No notifications yet'**
  String get noNotificationsYet;

  /// No description provided for @notificationsSubtitle.
  ///
  /// In en, this message translates to:
  /// **'You\'ll see updates about your pets here'**
  String get notificationsSubtitle;

  /// No description provided for @messages.
  ///
  /// In en, this message translates to:
  /// **'Messages'**
  String get messages;

  /// No description provided for @noMessagesYet.
  ///
  /// In en, this message translates to:
  /// **'No Messages Yet'**
  String get noMessagesYet;

  /// No description provided for @startChattingSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Start chatting by accepting a match request or browsing mating listings.'**
  String get startChattingSubtitle;

  /// No description provided for @noMessagesSayHello.
  ///
  /// In en, this message translates to:
  /// **'No messages yet. Say hello!'**
  String get noMessagesSayHello;

  /// No description provided for @typeAMessage.
  ///
  /// In en, this message translates to:
  /// **'Type a message...'**
  String get typeAMessage;

  /// No description provided for @chat.
  ///
  /// In en, this message translates to:
  /// **'Chat'**
  String get chat;

  /// No description provided for @reports.
  ///
  /// In en, this message translates to:
  /// **'Reports'**
  String get reports;

  /// No description provided for @generateNewReport.
  ///
  /// In en, this message translates to:
  /// **'Generate New Report'**
  String get generateNewReport;

  /// No description provided for @noReportsYet.
  ///
  /// In en, this message translates to:
  /// **'No reports yet'**
  String get noReportsYet;

  /// No description provided for @generateHealthReport.
  ///
  /// In en, this message translates to:
  /// **'Generate a health report for your pet'**
  String get generateHealthReport;

  /// No description provided for @healthReport.
  ///
  /// In en, this message translates to:
  /// **'Health Report'**
  String get healthReport;

  /// No description provided for @reportPreview.
  ///
  /// In en, this message translates to:
  /// **'Report Preview'**
  String get reportPreview;

  /// No description provided for @preview.
  ///
  /// In en, this message translates to:
  /// **'Preview'**
  String get preview;

  /// No description provided for @share.
  ///
  /// In en, this message translates to:
  /// **'Share'**
  String get share;

  /// No description provided for @failedToGenerateReport.
  ///
  /// In en, this message translates to:
  /// **'Failed to generate report'**
  String get failedToGenerateReport;

  /// No description provided for @failedToLoadPreview.
  ///
  /// In en, this message translates to:
  /// **'Failed to load preview'**
  String get failedToLoadPreview;

  /// No description provided for @failedToShareReport.
  ///
  /// In en, this message translates to:
  /// **'Failed to share report'**
  String get failedToShareReport;

  /// No description provided for @addHealthRecord.
  ///
  /// In en, this message translates to:
  /// **'Add Health Record'**
  String get addHealthRecord;

  /// No description provided for @checkup.
  ///
  /// In en, this message translates to:
  /// **'Checkup'**
  String get checkup;

  /// No description provided for @illness.
  ///
  /// In en, this message translates to:
  /// **'Illness'**
  String get illness;

  /// No description provided for @injury.
  ///
  /// In en, this message translates to:
  /// **'Injury'**
  String get injury;

  /// No description provided for @surgery.
  ///
  /// In en, this message translates to:
  /// **'Surgery'**
  String get surgery;

  /// No description provided for @dental.
  ///
  /// In en, this message translates to:
  /// **'Dental'**
  String get dental;

  /// No description provided for @other.
  ///
  /// In en, this message translates to:
  /// **'Other'**
  String get other;

  /// No description provided for @veterinarian.
  ///
  /// In en, this message translates to:
  /// **'Veterinarian'**
  String get veterinarian;

  /// No description provided for @clinic.
  ///
  /// In en, this message translates to:
  /// **'Clinic'**
  String get clinic;

  /// No description provided for @visitDate.
  ///
  /// In en, this message translates to:
  /// **'Visit Date'**
  String get visitDate;

  /// No description provided for @nextVisitDate.
  ///
  /// In en, this message translates to:
  /// **'Next Visit Date'**
  String get nextVisitDate;

  /// No description provided for @setToReceiveReminders.
  ///
  /// In en, this message translates to:
  /// **'Set to receive reminders'**
  String get setToReceiveReminders;

  /// No description provided for @youWillBeRemindedBeforeDate.
  ///
  /// In en, this message translates to:
  /// **'You will be reminded before this date'**
  String get youWillBeRemindedBeforeDate;

  /// No description provided for @titleAndVisitDateRequired.
  ///
  /// In en, this message translates to:
  /// **'Title and Visit Date are required'**
  String get titleAndVisitDateRequired;

  /// No description provided for @saveRecord.
  ///
  /// In en, this message translates to:
  /// **'Save Record'**
  String get saveRecord;

  /// No description provided for @noHealthRecords.
  ///
  /// In en, this message translates to:
  /// **'No health records'**
  String get noHealthRecords;

  /// No description provided for @tapPlusToAddOne.
  ///
  /// In en, this message translates to:
  /// **'Tap + to add one'**
  String get tapPlusToAddOne;

  /// No description provided for @nextVisitInDays.
  ///
  /// In en, this message translates to:
  /// **'Next visit in {days} day(s)'**
  String nextVisitInDays(int days);

  /// No description provided for @visitOverdueByDays.
  ///
  /// In en, this message translates to:
  /// **'Visit overdue by {days} day(s)'**
  String visitOverdueByDays(int days);

  /// No description provided for @addVaccination.
  ///
  /// In en, this message translates to:
  /// **'Add Vaccination'**
  String get addVaccination;

  /// No description provided for @vaccineName.
  ///
  /// In en, this message translates to:
  /// **'Vaccine Name'**
  String get vaccineName;

  /// No description provided for @manufacturer.
  ///
  /// In en, this message translates to:
  /// **'Manufacturer'**
  String get manufacturer;

  /// No description provided for @batchNumber.
  ///
  /// In en, this message translates to:
  /// **'Batch Number'**
  String get batchNumber;

  /// No description provided for @firstDoseDate.
  ///
  /// In en, this message translates to:
  /// **'First Dose Date'**
  String get firstDoseDate;

  /// No description provided for @totalDoses.
  ///
  /// In en, this message translates to:
  /// **'Total Doses'**
  String get totalDoses;

  /// No description provided for @howManyDosesInTotal.
  ///
  /// In en, this message translates to:
  /// **'How many doses in total?'**
  String get howManyDosesInTotal;

  /// No description provided for @scheduleNextDoses.
  ///
  /// In en, this message translates to:
  /// **'Schedule Next Doses'**
  String get scheduleNextDoses;

  /// No description provided for @setDatesToReceiveReminders.
  ///
  /// In en, this message translates to:
  /// **'Set dates to receive reminders for each dose'**
  String get setDatesToReceiveReminders;

  /// No description provided for @vaccineNameAndDateRequired.
  ///
  /// In en, this message translates to:
  /// **'Vaccine name and first dose date are required'**
  String get vaccineNameAndDateRequired;

  /// No description provided for @saveVaccination.
  ///
  /// In en, this message translates to:
  /// **'Save Vaccination'**
  String get saveVaccination;

  /// No description provided for @noVaccinationsRecorded.
  ///
  /// In en, this message translates to:
  /// **'No vaccinations recorded'**
  String get noVaccinationsRecorded;

  /// No description provided for @tapPlusToAddVaccination.
  ///
  /// In en, this message translates to:
  /// **'Tap + to add a vaccination'**
  String get tapPlusToAddVaccination;

  /// No description provided for @doses.
  ///
  /// In en, this message translates to:
  /// **'doses'**
  String get doses;

  /// No description provided for @nextDoseInDays.
  ///
  /// In en, this message translates to:
  /// **'Next dose in {days} day(s)'**
  String nextDoseInDays(int days);

  /// No description provided for @pregnancyTracker.
  ///
  /// In en, this message translates to:
  /// **'Pregnancy Tracker'**
  String get pregnancyTracker;

  /// No description provided for @trackPregnancy.
  ///
  /// In en, this message translates to:
  /// **'Track Pregnancy'**
  String get trackPregnancy;

  /// No description provided for @matingDate.
  ///
  /// In en, this message translates to:
  /// **'Mating Date'**
  String get matingDate;

  /// No description provided for @whenDidMatingOccur.
  ///
  /// In en, this message translates to:
  /// **'When did mating occur?'**
  String get whenDidMatingOccur;

  /// No description provided for @expectedDeliveryDate.
  ///
  /// In en, this message translates to:
  /// **'Expected Delivery Date'**
  String get expectedDeliveryDate;

  /// No description provided for @autoCalculatedFromMatingDate.
  ///
  /// In en, this message translates to:
  /// **'Auto-calculated from mating date'**
  String get autoCalculatedFromMatingDate;

  /// No description provided for @tapToSetManually.
  ///
  /// In en, this message translates to:
  /// **'Tap to set manually'**
  String get tapToSetManually;

  /// No description provided for @autoCalculated63Days.
  ///
  /// In en, this message translates to:
  /// **'Auto-calculated: 63 days from mating date'**
  String get autoCalculated63Days;

  /// No description provided for @fatherDetails.
  ///
  /// In en, this message translates to:
  /// **'Father Details'**
  String get fatherDetails;

  /// No description provided for @infoAboutSire.
  ///
  /// In en, this message translates to:
  /// **'Info about the sire for your records'**
  String get infoAboutSire;

  /// No description provided for @fatherName.
  ///
  /// In en, this message translates to:
  /// **'Father Name'**
  String get fatherName;

  /// No description provided for @ownerName.
  ///
  /// In en, this message translates to:
  /// **'Owner Name'**
  String get ownerName;

  /// No description provided for @notesAboutFather.
  ///
  /// In en, this message translates to:
  /// **'Notes about father'**
  String get notesAboutFather;

  /// No description provided for @photosUpTo10.
  ///
  /// In en, this message translates to:
  /// **'Photos (up to 10)'**
  String get photosUpTo10;

  /// No description provided for @notificationSchedule.
  ///
  /// In en, this message translates to:
  /// **'Notification Schedule'**
  String get notificationSchedule;

  /// No description provided for @remindersBeforeDeliveryDate.
  ///
  /// In en, this message translates to:
  /// **'Reminders before delivery date'**
  String get remindersBeforeDeliveryDate;

  /// No description provided for @deliveryWeekDailyAlerts.
  ///
  /// In en, this message translates to:
  /// **'Delivery week daily alerts'**
  String get deliveryWeekDailyAlerts;

  /// No description provided for @deliveryDayNotification.
  ///
  /// In en, this message translates to:
  /// **'Delivery day notification'**
  String get deliveryDayNotification;

  /// No description provided for @setBothDates.
  ///
  /// In en, this message translates to:
  /// **'Please set both mating and delivery dates'**
  String get setBothDates;

  /// No description provided for @startTracking.
  ///
  /// In en, this message translates to:
  /// **'Start Tracking'**
  String get startTracking;

  /// No description provided for @noPregnancyRecords.
  ///
  /// In en, this message translates to:
  /// **'No pregnancy records'**
  String get noPregnancyRecords;

  /// No description provided for @tapPlusToTrackPregnancy.
  ///
  /// In en, this message translates to:
  /// **'Tap + to track a pregnancy'**
  String get tapPlusToTrackPregnancy;

  /// No description provided for @activePregnancy.
  ///
  /// In en, this message translates to:
  /// **'Active Pregnancy'**
  String get activePregnancy;

  /// No description provided for @daysRemaining.
  ///
  /// In en, this message translates to:
  /// **'{days} days remaining'**
  String daysRemaining(int days);

  /// No description provided for @dueTodayOrOverdue.
  ///
  /// In en, this message translates to:
  /// **'Due today or overdue!'**
  String get dueTodayOrOverdue;

  /// No description provided for @dueSoon.
  ///
  /// In en, this message translates to:
  /// **'Due Soon'**
  String get dueSoon;

  /// No description provided for @deliveryWeekPrepare.
  ///
  /// In en, this message translates to:
  /// **'Delivery week! Prepare for the arrival.'**
  String get deliveryWeekPrepare;

  /// No description provided for @litterSize.
  ///
  /// In en, this message translates to:
  /// **'Litter size'**
  String get litterSize;

  /// No description provided for @generalNotes.
  ///
  /// In en, this message translates to:
  /// **'General Notes'**
  String get generalNotes;

  /// No description provided for @schedules.
  ///
  /// In en, this message translates to:
  /// **'Schedules'**
  String get schedules;

  /// No description provided for @addSchedule.
  ///
  /// In en, this message translates to:
  /// **'Add Schedule'**
  String get addSchedule;

  /// No description provided for @todaysTasks.
  ///
  /// In en, this message translates to:
  /// **'Today\'s Tasks'**
  String get todaysTasks;

  /// No description provided for @noSchedulesYet.
  ///
  /// In en, this message translates to:
  /// **'No schedules yet. Tap + to add one.'**
  String get noSchedulesYet;

  /// No description provided for @allActiveSchedules.
  ///
  /// In en, this message translates to:
  /// **'All Active Schedules'**
  String get allActiveSchedules;

  /// No description provided for @daily.
  ///
  /// In en, this message translates to:
  /// **'Daily'**
  String get daily;

  /// No description provided for @twiceDaily.
  ///
  /// In en, this message translates to:
  /// **'Twice Daily'**
  String get twiceDaily;

  /// No description provided for @weekly.
  ///
  /// In en, this message translates to:
  /// **'Weekly'**
  String get weekly;

  /// No description provided for @custom.
  ///
  /// In en, this message translates to:
  /// **'Custom'**
  String get custom;

  /// No description provided for @feeding.
  ///
  /// In en, this message translates to:
  /// **'Feeding'**
  String get feeding;

  /// No description provided for @medication.
  ///
  /// In en, this message translates to:
  /// **'Medication'**
  String get medication;

  /// No description provided for @grooming.
  ///
  /// In en, this message translates to:
  /// **'Grooming'**
  String get grooming;

  /// No description provided for @exercise.
  ///
  /// In en, this message translates to:
  /// **'Exercise'**
  String get exercise;

  /// No description provided for @times.
  ///
  /// In en, this message translates to:
  /// **'Times'**
  String get times;

  /// No description provided for @addTime.
  ///
  /// In en, this message translates to:
  /// **'Add Time'**
  String get addTime;

  /// No description provided for @pleaseEnterTitle.
  ///
  /// In en, this message translates to:
  /// **'Please enter a title'**
  String get pleaseEnterTitle;

  /// No description provided for @saveSchedule.
  ///
  /// In en, this message translates to:
  /// **'Save Schedule'**
  String get saveSchedule;

  /// No description provided for @optionalNotes.
  ///
  /// In en, this message translates to:
  /// **'Optional notes'**
  String get optionalNotes;

  /// No description provided for @frequency.
  ///
  /// In en, this message translates to:
  /// **'Frequency'**
  String get frequency;

  /// No description provided for @certificationStatus.
  ///
  /// In en, this message translates to:
  /// **'Certification Status'**
  String get certificationStatus;

  /// No description provided for @uploadHealthCertificate.
  ///
  /// In en, this message translates to:
  /// **'Upload Health Certificate'**
  String get uploadHealthCertificate;

  /// No description provided for @certificationApproved.
  ///
  /// In en, this message translates to:
  /// **'Certification Approved'**
  String get certificationApproved;

  /// No description provided for @certificationPending.
  ///
  /// In en, this message translates to:
  /// **'Certification Pending'**
  String get certificationPending;

  /// No description provided for @certificationRejected.
  ///
  /// In en, this message translates to:
  /// **'Certification Rejected'**
  String get certificationRejected;

  /// No description provided for @noCertification.
  ///
  /// In en, this message translates to:
  /// **'No certification uploaded'**
  String get noCertification;

  /// No description provided for @submitCertification.
  ///
  /// In en, this message translates to:
  /// **'Submit Certification'**
  String get submitCertification;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['en', 'sv'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'en':
      return AppLocalizationsEn();
    case 'sv':
      return AppLocalizationsSv();
  }

  throw FlutterError(
      'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
      'an issue with the localizations generation tool. Please file an issue '
      'on GitHub with a reproducible sample app and the gen-l10n configuration '
      'that was used.');
}

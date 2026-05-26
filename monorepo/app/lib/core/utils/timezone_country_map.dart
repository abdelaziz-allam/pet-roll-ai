class TimezoneCountryEntry {
  final String timezone;
  final String country;
  final String countryCode;

  const TimezoneCountryEntry({
    required this.timezone,
    required this.country,
    required this.countryCode,
  });
}

const List<TimezoneCountryEntry> timezoneCountryMap = [
  TimezoneCountryEntry(timezone: 'Pacific/Midway', country: 'US Minor Outlying Islands', countryCode: 'UM'),
  TimezoneCountryEntry(timezone: 'Pacific/Honolulu', country: 'United States', countryCode: 'US'),
  TimezoneCountryEntry(timezone: 'America/Anchorage', country: 'United States', countryCode: 'US'),
  TimezoneCountryEntry(timezone: 'America/Los_Angeles', country: 'United States', countryCode: 'US'),
  TimezoneCountryEntry(timezone: 'America/Denver', country: 'United States', countryCode: 'US'),
  TimezoneCountryEntry(timezone: 'America/Chicago', country: 'United States', countryCode: 'US'),
  TimezoneCountryEntry(timezone: 'America/New_York', country: 'United States', countryCode: 'US'),
  TimezoneCountryEntry(timezone: 'America/Toronto', country: 'Canada', countryCode: 'CA'),
  TimezoneCountryEntry(timezone: 'America/Vancouver', country: 'Canada', countryCode: 'CA'),
  TimezoneCountryEntry(timezone: 'America/Mexico_City', country: 'Mexico', countryCode: 'MX'),
  TimezoneCountryEntry(timezone: 'America/Bogota', country: 'Colombia', countryCode: 'CO'),
  TimezoneCountryEntry(timezone: 'America/Lima', country: 'Peru', countryCode: 'PE'),
  TimezoneCountryEntry(timezone: 'America/Sao_Paulo', country: 'Brazil', countryCode: 'BR'),
  TimezoneCountryEntry(timezone: 'America/Argentina/Buenos_Aires', country: 'Argentina', countryCode: 'AR'),
  TimezoneCountryEntry(timezone: 'America/Santiago', country: 'Chile', countryCode: 'CL'),
  TimezoneCountryEntry(timezone: 'Atlantic/Reykjavik', country: 'Iceland', countryCode: 'IS'),
  TimezoneCountryEntry(timezone: 'Europe/London', country: 'United Kingdom', countryCode: 'GB'),
  TimezoneCountryEntry(timezone: 'Europe/Dublin', country: 'Ireland', countryCode: 'IE'),
  TimezoneCountryEntry(timezone: 'Europe/Lisbon', country: 'Portugal', countryCode: 'PT'),
  TimezoneCountryEntry(timezone: 'Europe/Paris', country: 'France', countryCode: 'FR'),
  TimezoneCountryEntry(timezone: 'Europe/Berlin', country: 'Germany', countryCode: 'DE'),
  TimezoneCountryEntry(timezone: 'Europe/Amsterdam', country: 'Netherlands', countryCode: 'NL'),
  TimezoneCountryEntry(timezone: 'Europe/Brussels', country: 'Belgium', countryCode: 'BE'),
  TimezoneCountryEntry(timezone: 'Europe/Zurich', country: 'Switzerland', countryCode: 'CH'),
  TimezoneCountryEntry(timezone: 'Europe/Vienna', country: 'Austria', countryCode: 'AT'),
  TimezoneCountryEntry(timezone: 'Europe/Rome', country: 'Italy', countryCode: 'IT'),
  TimezoneCountryEntry(timezone: 'Europe/Madrid', country: 'Spain', countryCode: 'ES'),
  TimezoneCountryEntry(timezone: 'Europe/Stockholm', country: 'Sweden', countryCode: 'SE'),
  TimezoneCountryEntry(timezone: 'Europe/Oslo', country: 'Norway', countryCode: 'NO'),
  TimezoneCountryEntry(timezone: 'Europe/Copenhagen', country: 'Denmark', countryCode: 'DK'),
  TimezoneCountryEntry(timezone: 'Europe/Helsinki', country: 'Finland', countryCode: 'FI'),
  TimezoneCountryEntry(timezone: 'Europe/Warsaw', country: 'Poland', countryCode: 'PL'),
  TimezoneCountryEntry(timezone: 'Europe/Prague', country: 'Czech Republic', countryCode: 'CZ'),
  TimezoneCountryEntry(timezone: 'Europe/Budapest', country: 'Hungary', countryCode: 'HU'),
  TimezoneCountryEntry(timezone: 'Europe/Bucharest', country: 'Romania', countryCode: 'RO'),
  TimezoneCountryEntry(timezone: 'Europe/Athens', country: 'Greece', countryCode: 'GR'),
  TimezoneCountryEntry(timezone: 'Europe/Istanbul', country: 'Turkey', countryCode: 'TR'),
  TimezoneCountryEntry(timezone: 'Europe/Moscow', country: 'Russia', countryCode: 'RU'),
  TimezoneCountryEntry(timezone: 'Africa/Cairo', country: 'Egypt', countryCode: 'EG'),
  TimezoneCountryEntry(timezone: 'Africa/Lagos', country: 'Nigeria', countryCode: 'NG'),
  TimezoneCountryEntry(timezone: 'Africa/Nairobi', country: 'Kenya', countryCode: 'KE'),
  TimezoneCountryEntry(timezone: 'Africa/Johannesburg', country: 'South Africa', countryCode: 'ZA'),
  TimezoneCountryEntry(timezone: 'Africa/Casablanca', country: 'Morocco', countryCode: 'MA'),
  TimezoneCountryEntry(timezone: 'Asia/Dubai', country: 'United Arab Emirates', countryCode: 'AE'),
  TimezoneCountryEntry(timezone: 'Asia/Riyadh', country: 'Saudi Arabia', countryCode: 'SA'),
  TimezoneCountryEntry(timezone: 'Asia/Qatar', country: 'Qatar', countryCode: 'QA'),
  TimezoneCountryEntry(timezone: 'Asia/Kuwait', country: 'Kuwait', countryCode: 'KW'),
  TimezoneCountryEntry(timezone: 'Asia/Bahrain', country: 'Bahrain', countryCode: 'BH'),
  TimezoneCountryEntry(timezone: 'Asia/Muscat', country: 'Oman', countryCode: 'OM'),
  TimezoneCountryEntry(timezone: 'Asia/Tehran', country: 'Iran', countryCode: 'IR'),
  TimezoneCountryEntry(timezone: 'Asia/Karachi', country: 'Pakistan', countryCode: 'PK'),
  TimezoneCountryEntry(timezone: 'Asia/Kolkata', country: 'India', countryCode: 'IN'),
  TimezoneCountryEntry(timezone: 'Asia/Dhaka', country: 'Bangladesh', countryCode: 'BD'),
  TimezoneCountryEntry(timezone: 'Asia/Bangkok', country: 'Thailand', countryCode: 'TH'),
  TimezoneCountryEntry(timezone: 'Asia/Singapore', country: 'Singapore', countryCode: 'SG'),
  TimezoneCountryEntry(timezone: 'Asia/Kuala_Lumpur', country: 'Malaysia', countryCode: 'MY'),
  TimezoneCountryEntry(timezone: 'Asia/Jakarta', country: 'Indonesia', countryCode: 'ID'),
  TimezoneCountryEntry(timezone: 'Asia/Manila', country: 'Philippines', countryCode: 'PH'),
  TimezoneCountryEntry(timezone: 'Asia/Shanghai', country: 'China', countryCode: 'CN'),
  TimezoneCountryEntry(timezone: 'Asia/Hong_Kong', country: 'Hong Kong', countryCode: 'HK'),
  TimezoneCountryEntry(timezone: 'Asia/Taipei', country: 'Taiwan', countryCode: 'TW'),
  TimezoneCountryEntry(timezone: 'Asia/Seoul', country: 'South Korea', countryCode: 'KR'),
  TimezoneCountryEntry(timezone: 'Asia/Tokyo', country: 'Japan', countryCode: 'JP'),
  TimezoneCountryEntry(timezone: 'Australia/Perth', country: 'Australia', countryCode: 'AU'),
  TimezoneCountryEntry(timezone: 'Australia/Sydney', country: 'Australia', countryCode: 'AU'),
  TimezoneCountryEntry(timezone: 'Australia/Melbourne', country: 'Australia', countryCode: 'AU'),
  TimezoneCountryEntry(timezone: 'Pacific/Auckland', country: 'New Zealand', countryCode: 'NZ'),
  TimezoneCountryEntry(timezone: 'UTC', country: '', countryCode: ''),
];

String? countryForTimezone(String timezone) {
  final entry = timezoneCountryMap.where((e) => e.timezone == timezone).firstOrNull;
  return entry?.country.isNotEmpty == true ? entry!.country : null;
}

String? timezoneForCountry(String country) {
  final entry = timezoneCountryMap.where((e) => e.country == country).firstOrNull;
  return entry?.timezone;
}

List<String> get allTimezones =>
    timezoneCountryMap.map((e) => e.timezone).toList();

List<String> get allCountries =>
    timezoneCountryMap
        .where((e) => e.country.isNotEmpty)
        .map((e) => e.country)
        .toSet()
        .toList()
      ..sort();

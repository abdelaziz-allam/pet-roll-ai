const TIMEZONE_TO_COUNTRY: Record<string, string> = {
  'Pacific/Honolulu': 'United States',
  'America/Anchorage': 'United States',
  'America/Los_Angeles': 'United States',
  'America/Denver': 'United States',
  'America/Chicago': 'United States',
  'America/New_York': 'United States',
  'America/Toronto': 'Canada',
  'America/Vancouver': 'Canada',
  'America/Mexico_City': 'Mexico',
  'America/Sao_Paulo': 'Brazil',
  'America/Argentina/Buenos_Aires': 'Argentina',
  'America/Bogota': 'Colombia',
  'America/Lima': 'Peru',
  'America/Santiago': 'Chile',
  'America/Caracas': 'Venezuela',
  'Europe/London': 'United Kingdom',
  'Europe/Paris': 'France',
  'Europe/Berlin': 'Germany',
  'Europe/Madrid': 'Spain',
  'Europe/Rome': 'Italy',
  'Europe/Amsterdam': 'Netherlands',
  'Europe/Brussels': 'Belgium',
  'Europe/Zurich': 'Switzerland',
  'Europe/Vienna': 'Austria',
  'Europe/Stockholm': 'Sweden',
  'Europe/Oslo': 'Norway',
  'Europe/Copenhagen': 'Denmark',
  'Europe/Helsinki': 'Finland',
  'Europe/Warsaw': 'Poland',
  'Europe/Prague': 'Czech Republic',
  'Europe/Budapest': 'Hungary',
  'Europe/Bucharest': 'Romania',
  'Europe/Athens': 'Greece',
  'Europe/Istanbul': 'Turkey',
  'Europe/Moscow': 'Russia',
  'Europe/Kiev': 'Ukraine',
  'Europe/Lisbon': 'Portugal',
  'Europe/Dublin': 'Ireland',
  'Africa/Cairo': 'Egypt',
  'Africa/Lagos': 'Nigeria',
  'Africa/Johannesburg': 'South Africa',
  'Africa/Nairobi': 'Kenya',
  'Africa/Casablanca': 'Morocco',
  'Africa/Algiers': 'Algeria',
  'Africa/Tunis': 'Tunisia',
  'Africa/Accra': 'Ghana',
  'Africa/Dar_es_Salaam': 'Tanzania',
  'Asia/Dubai': 'United Arab Emirates',
  'Asia/Riyadh': 'Saudi Arabia',
  'Asia/Qatar': 'Qatar',
  'Asia/Kuwait': 'Kuwait',
  'Asia/Bahrain': 'Bahrain',
  'Asia/Muscat': 'Oman',
  'Asia/Tehran': 'Iran',
  'Asia/Karachi': 'Pakistan',
  'Asia/Kolkata': 'India',
  'Asia/Colombo': 'Sri Lanka',
  'Asia/Dhaka': 'Bangladesh',
  'Asia/Bangkok': 'Thailand',
  'Asia/Jakarta': 'Indonesia',
  'Asia/Singapore': 'Singapore',
  'Asia/Kuala_Lumpur': 'Malaysia',
  'Asia/Manila': 'Philippines',
  'Asia/Ho_Chi_Minh': 'Vietnam',
  'Asia/Shanghai': 'China',
  'Asia/Hong_Kong': 'Hong Kong',
  'Asia/Taipei': 'Taiwan',
  'Asia/Tokyo': 'Japan',
  'Asia/Seoul': 'South Korea',
  'Australia/Sydney': 'Australia',
  'Australia/Melbourne': 'Australia',
  'Australia/Brisbane': 'Australia',
  'Australia/Perth': 'Australia',
  'Pacific/Auckland': 'New Zealand',
};

const COUNTRY_TO_TIMEZONE: Record<string, string> = {
  'United States': 'America/New_York',
  'Canada': 'America/Toronto',
  'Mexico': 'America/Mexico_City',
  'Brazil': 'America/Sao_Paulo',
  'Argentina': 'America/Argentina/Buenos_Aires',
  'Colombia': 'America/Bogota',
  'Peru': 'America/Lima',
  'Chile': 'America/Santiago',
  'Venezuela': 'America/Caracas',
  'United Kingdom': 'Europe/London',
  'France': 'Europe/Paris',
  'Germany': 'Europe/Berlin',
  'Spain': 'Europe/Madrid',
  'Italy': 'Europe/Rome',
  'Netherlands': 'Europe/Amsterdam',
  'Belgium': 'Europe/Brussels',
  'Switzerland': 'Europe/Zurich',
  'Austria': 'Europe/Vienna',
  'Sweden': 'Europe/Stockholm',
  'Norway': 'Europe/Oslo',
  'Denmark': 'Europe/Copenhagen',
  'Finland': 'Europe/Helsinki',
  'Poland': 'Europe/Warsaw',
  'Czech Republic': 'Europe/Prague',
  'Hungary': 'Europe/Budapest',
  'Romania': 'Europe/Bucharest',
  'Greece': 'Europe/Athens',
  'Turkey': 'Europe/Istanbul',
  'Russia': 'Europe/Moscow',
  'Ukraine': 'Europe/Kiev',
  'Portugal': 'Europe/Lisbon',
  'Ireland': 'Europe/Dublin',
  'Egypt': 'Africa/Cairo',
  'Nigeria': 'Africa/Lagos',
  'South Africa': 'Africa/Johannesburg',
  'Kenya': 'Africa/Nairobi',
  'Morocco': 'Africa/Casablanca',
  'Algeria': 'Africa/Algiers',
  'Tunisia': 'Africa/Tunis',
  'Ghana': 'Africa/Accra',
  'Tanzania': 'Africa/Dar_es_Salaam',
  'United Arab Emirates': 'Asia/Dubai',
  'Saudi Arabia': 'Asia/Riyadh',
  'Qatar': 'Asia/Qatar',
  'Kuwait': 'Asia/Kuwait',
  'Bahrain': 'Asia/Bahrain',
  'Oman': 'Asia/Muscat',
  'Iran': 'Asia/Tehran',
  'Pakistan': 'Asia/Karachi',
  'India': 'Asia/Kolkata',
  'Sri Lanka': 'Asia/Colombo',
  'Bangladesh': 'Asia/Dhaka',
  'Thailand': 'Asia/Bangkok',
  'Indonesia': 'Asia/Jakarta',
  'Singapore': 'Asia/Singapore',
  'Malaysia': 'Asia/Kuala_Lumpur',
  'Philippines': 'Asia/Manila',
  'Vietnam': 'Asia/Ho_Chi_Minh',
  'China': 'Asia/Shanghai',
  'Hong Kong': 'Asia/Hong_Kong',
  'Taiwan': 'Asia/Taipei',
  'Japan': 'Asia/Tokyo',
  'South Korea': 'Asia/Seoul',
  'Australia': 'Australia/Sydney',
  'New Zealand': 'Pacific/Auckland',
};

export function getCountryFromTimezone(timezone: string): string | null {
  return TIMEZONE_TO_COUNTRY[timezone] || null;
}

export function getTimezoneFromCountry(country: string): string | null {
  return COUNTRY_TO_TIMEZONE[country] || null;
}

export function resolveTimezoneCountrySync(
  timezone?: string | null,
  country?: string | null
): { timezone?: string; country?: string } {
  const result: { timezone?: string; country?: string } = {};

  if (timezone) {
    result.timezone = timezone;
    if (!country) {
      const mapped = getCountryFromTimezone(timezone);
      if (mapped) result.country = mapped;
    } else {
      result.country = country;
    }
  } else if (country) {
    result.country = country;
    const mapped = getTimezoneFromCountry(country);
    if (mapped) result.timezone = mapped;
  }

  return result;
}

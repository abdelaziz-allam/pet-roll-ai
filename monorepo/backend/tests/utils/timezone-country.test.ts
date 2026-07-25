import { describe, it, expect } from 'vitest';
import {
  getCountryFromTimezone,
  getTimezoneFromCountry,
  resolveTimezoneCountrySync,
} from '../../src/utils/timezone-country';

describe('timezone-country', () => {
  describe('getCountryFromTimezone', () => {
    it('should return country for a known timezone', () => {
      expect(getCountryFromTimezone('America/New_York')).toBe('United States');
      expect(getCountryFromTimezone('Europe/London')).toBe('United Kingdom');
      expect(getCountryFromTimezone('Asia/Tokyo')).toBe('Japan');
    });

    it('should return null for an unknown timezone', () => {
      expect(getCountryFromTimezone('Unknown/Zone')).toBeNull();
      expect(getCountryFromTimezone('')).toBeNull();
    });

    it('should handle all US timezones', () => {
      expect(getCountryFromTimezone('Pacific/Honolulu')).toBe('United States');
      expect(getCountryFromTimezone('America/Anchorage')).toBe('United States');
      expect(getCountryFromTimezone('America/Los_Angeles')).toBe('United States');
      expect(getCountryFromTimezone('America/Denver')).toBe('United States');
      expect(getCountryFromTimezone('America/Chicago')).toBe('United States');
    });

    it('should handle Australian timezones', () => {
      expect(getCountryFromTimezone('Australia/Sydney')).toBe('Australia');
      expect(getCountryFromTimezone('Australia/Melbourne')).toBe('Australia');
      expect(getCountryFromTimezone('Australia/Brisbane')).toBe('Australia');
      expect(getCountryFromTimezone('Australia/Perth')).toBe('Australia');
    });
  });

  describe('getTimezoneFromCountry', () => {
    it('should return timezone for a known country', () => {
      expect(getTimezoneFromCountry('United States')).toBe('America/New_York');
      expect(getTimezoneFromCountry('Japan')).toBe('Asia/Tokyo');
      expect(getTimezoneFromCountry('Australia')).toBe('Australia/Sydney');
    });

    it('should return null for an unknown country', () => {
      expect(getTimezoneFromCountry('Atlantis')).toBeNull();
      expect(getTimezoneFromCountry('')).toBeNull();
    });

    it('should handle Middle Eastern countries', () => {
      expect(getTimezoneFromCountry('United Arab Emirates')).toBe('Asia/Dubai');
      expect(getTimezoneFromCountry('Saudi Arabia')).toBe('Asia/Riyadh');
      expect(getTimezoneFromCountry('Qatar')).toBe('Asia/Qatar');
    });
  });

  describe('resolveTimezoneCountrySync', () => {
    it('should return empty object when neither timezone nor country provided', () => {
      expect(resolveTimezoneCountrySync()).toEqual({});
      expect(resolveTimezoneCountrySync(null, null)).toEqual({});
      expect(resolveTimezoneCountrySync(undefined, undefined)).toEqual({});
    });

    it('should resolve country from timezone when country not provided', () => {
      const result = resolveTimezoneCountrySync('Europe/Berlin', null);
      expect(result).toEqual({ timezone: 'Europe/Berlin', country: 'Germany' });
    });

    it('should keep both when both provided', () => {
      const result = resolveTimezoneCountrySync('America/New_York', 'United States');
      expect(result).toEqual({ timezone: 'America/New_York', country: 'United States' });
    });

    it('should resolve timezone from country when timezone not provided', () => {
      const result = resolveTimezoneCountrySync(null, 'France');
      expect(result).toEqual({ timezone: 'Europe/Paris', country: 'France' });
    });

    it('should not override provided country with mapped one', () => {
      const result = resolveTimezoneCountrySync('America/New_York', 'Custom Country');
      expect(result).toEqual({ timezone: 'America/New_York', country: 'Custom Country' });
    });

    it('should return only timezone if no country can be mapped', () => {
      const result = resolveTimezoneCountrySync('Unknown/Zone', null);
      expect(result).toEqual({ timezone: 'Unknown/Zone' });
    });

    it('should return only country if no timezone can be mapped', () => {
      const result = resolveTimezoneCountrySync(null, 'Atlantis');
      expect(result).toEqual({ country: 'Atlantis' });
    });

    it('should treat empty string timezone as falsy', () => {
      const result = resolveTimezoneCountrySync('', 'Japan');
      expect(result).toEqual({ timezone: 'Asia/Tokyo', country: 'Japan' });
    });

    it('should treat empty string country as falsy', () => {
      const result = resolveTimezoneCountrySync('Asia/Tokyo', '');
      expect(result).toEqual({ timezone: 'Asia/Tokyo', country: 'Japan' });
    });
  });
});

import { parsePhoneNumberFromString, getCountries, getCountryCallingCode } from 'libphonenumber-js';

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

export const COUNTRY_CODES = getCountries().map((country) => {
  let name = country;
  try {
    name = regionNames.of(country);
  } catch (e) {}
  
  return {
    code: country,
    name: name,
    callingCode: `+${getCountryCallingCode(country)}`,
  };
});

export function validatePhone(phone, country = 'IN') {
  const phoneNumber = parsePhoneNumberFromString(phone, country);

  if (!phoneNumber) {
    return {
      valid: false,
      message: "Enter a valid phone number",
    };
  }

  if (!phoneNumber.isValid()) {
    return {
      valid: false,
      message: "Enter a valid phone number",
    };
  }

  return {
    valid: true,
    e164: phoneNumber.number,
  };
}

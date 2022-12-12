import {countryCodes} from '../data/countries';

/**
 * function to get country name against country code
 * @param code country code
 * @returns country name
 */
export const getCountry = code => {
  var countryName = code;
  countryCodes.filter(function (item) {
    if (item.code === code) {
      countryName = item.name;
    }
  });

  return countryName;
};

/**
 * function to get scanned card type
 * @param type card type
 * @returns  value according to type
 */
export const getCardType = type => {
  if (type === 'I') return 'ID Card';
  else if (type === 'P') return 'Passport';
  else if (type === 'V') return 'Visa';
  else return 'Invalid Type';
};

/**
 * function to get gender
 * @param gender gender
 * @returns value according to gender
 */
export const getGender = gender => {
  if (gender === 'F') return 'Female';
  else if (gender === 'P') return 'Male';
  else return 'Not Defined';
};

/**
 * get formatted months
 * @param month month code
 * @returns month name
 */
const getMonth = month => {
  let m;
  switch (month) {
    case '01':
      m = 'Jan';
      break;
    case '02':
      m = 'Feb';
      break;
    case '03':
      m = 'Mar';
      break;
    case '04':
      m = 'Apr';
      break;
    case '05':
      m = 'May';
      break;
    case '06':
      m = 'Jun';
      break;
    case '07':
      m = 'Jul';
      break;
    case '08':
      m = 'Aug';
      break;
    case '09':
      m = 'Sep';
      break;
    case '10':
      m = 'Oct';
      break;
    case '11':
      m = 'Nov';
      break;
    case '12':
      m = 'Dec';
      break;
    default:
      m = 'MMM';
      break;
  }

  return m;
};

/**
 * get formated date for scanned cards
 * @param date date from card
 * @returns formatted date
 */
export const getDate = date => {
  const year = date.substring(0, 2);
  const month = date.substring(2, 4);
  const day = date.substring(4, 6);

  return day + '-' + getMonth(month) + '-' + year;
};

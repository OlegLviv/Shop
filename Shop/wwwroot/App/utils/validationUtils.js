export const isValidWhiteSpace = s => new RegExp('^\\S+$').test(s);

export const isValidEmail = s => new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$').test(s);

export const isValidPassword = s => new RegExp('^(?=(?:.*[A-Z]))\\S{6,20}$').test(s);

export const isValidNameAndLastName = s => new RegExp('^[a-zA-zа-яА-ЯёЁ]{1,20}$').test(s);

export const isValidPossibleProp = s => new RegExp('[a-zA-Zа-яА-ЯёЁ]$').test(s);

export const isValidWhiteSpace = s => new RegExp('^\\S+$').test(s);

export const isValidEmail = s => new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$').test(s);

export const isValidPassword = s => new RegExp('^(?=(?:.*[A-Z]))\\S{6,20}$').test(s);

export const isValidNameAndLastName = s => new RegExp('^([A-zА-яёЁіІ]+(\\\'|\\-)?[A-zА-яёЁіІ]+){1,20}$').test(s);

export const isValidPossibleProp = s => new RegExp('^[A-zА-яёЁіІ0-9]{2,20}$').test(s);

export const isValidPhoneNumber = s => new RegExp('^((\\+7|\\+3)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$').test(s);

export const isValidNameLastName = s => new RegExp('^(([A-zА-яёЁіІ]+(\\\'|\\-)?[A-zА-яёЁіІ]+)((\\s?)([A-zА-яёЁіІ]+(\\\'|\\-)?[A-zА-яёЁіІ]+))?){1,20}$').test(s);
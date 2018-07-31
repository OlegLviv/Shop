export const isValidWhiteSpace = s => new RegExp('^\\S+$').test(s);

export const isValidMailingSubject = s => new RegExp('^[A-zА-яіІёЁ1-9 ]{4,64}$').test(s);

export const isValidMailingBody = s => new RegExp('^[\\W\\w ]{16,512}$').test(s);

export const isValidEmail = s => new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$').test(s);

export const isValidPassword = s => new RegExp('^(?=(?:.*[A-Z]))\\S{6,20}$').test(s);

export const isValidNameAndLastName = s => new RegExp('^([A-zА-яёЁіІ]+(\\\'|\\-)?[A-zА-яёЁіІ]+){1,20}$').test(s);

export const isValidPossibleProp = s => new RegExp('^[^;]{2,20}$').test(s);

export const isValidPhoneNumber = s => new RegExp('^((\\+7|\\+3)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$').test(s);

export const isValidNameLastName = s => new RegExp('^(([A-zА-яёЁіІ]+(\\\'|\\-)?[A-zА-яёЁіІ]+)((\\s?)([A-zА-яёЁіІ]+(\\\'|\\-)?[A-zА-яёЁіІ]+))?){1,20}$').test(s);

//	Products
export const isValidProductName = s => new RegExp('^[^;]{2,64}$').test(s);

export const isValidProductPrice = s => new RegExp('^[0-9]{0,5}[.,]?[0-9]{1,2}$').test(s);

export const isValidProductDiscount = s => new RegExp('^[0-9]{1,3}$').test(s) && Number(s) <= 100;

//	todo need fix white space
export const isValidProductDescription = s => new RegExp('^[A-zА-яіІёЁ0-9\\S\\n ]{0,512}$').test(s);
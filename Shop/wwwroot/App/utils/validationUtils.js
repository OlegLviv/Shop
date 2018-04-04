export const isValidWhiteSpace = (s) => new RegExp('^\\S+$').test(s);
export const isValidPassword = (s) => new RegExp('^(?=(?:.*[a-z]){2})\\S{6,}$').test(s);
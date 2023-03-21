/*eslint no-control-regex: "off"*/
export const FORM_CONST = {
  FORGOT_PASSWORD: 'Enter your registered email below to recieve password reset instructions',
  PASSWORD_RESET_SUCCESS: 'Your password was reset successfully!',
  IS_REQUIRED: 'This field is required',
  MAX_LENGTH: 'You exceeded the max length',
  MIN_LENGTH: 'Password must have at least 6 characters',
  PASSWORD_NOT_MATCH: "Password doesn't match",
  PASSCODE_NOT_MATCH: "Passcode doesn't match",
  EMAIL_VALIDATE: 'Email is invalid',
  PASSWORD_VALIDATE: 'Password must at have least 10 characters, at least one capital letter, at least one number AND at least one special character',
  NUMBER_VALIDATE: 'Number only',
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;\"\'<>,.?/])(?=.*\d)[A-Za-z\d~!@#$%^&*_\-+=`|\\(){}[\]:;\"\'<>,.?/]{10,64}$/,
  EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  NUMBER_REGEX: /^[0-9]*$/,
  DIGIT_REGEX: /^\d+$/,
  PASSCODE_REGEX: /^[0-9]{4}$/,
  PASSCODE_VALIDATE: 'Passcode must be 4 digits',
  DESC_MAX_LENGTH_500:"Descriptions must be less than 500 characters",
  SUBJECT_MAX_LENGTH_200: "Subject must be less than 200 characters"
};

export const AUTHENTICATION = {
  UNAUTHORIZED: 'Incorrect email or password',
  TOO_MANY_REQUESTS: 'You are making too many requests. You will be frozen in action for a short time'

}
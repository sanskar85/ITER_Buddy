export const LOGIN_DETAIL = {
  USERNAME: 'username',
  PASSWORD: 'password',
  USERNAME_ERROR: 'username_error',
  PASSWORD_ERROR: 'password_error',
  INVALID_CREDENTIALS: 'invalid_credentials',
  VALID: 'valid',
};

export const loginDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_DETAIL.USERNAME:
      return {
        ...state,
        [action.type]: action.payload,
        [LOGIN_DETAIL.USERNAME_ERROR]: false,
        [LOGIN_DETAIL.PASSWORD_ERROR]: false,
      };
    case LOGIN_DETAIL.PASSWORD:
      return {
        ...state,
        [action.type]: action.payload,
        [LOGIN_DETAIL.USERNAME_ERROR]: false,
        [LOGIN_DETAIL.PASSWORD_ERROR]: false,
      };
    case LOGIN_DETAIL.USERNAME_ERROR:
    case LOGIN_DETAIL.PASSWORD_ERROR:
      return {...state, [action.type]: true};
    case LOGIN_DETAIL.INVALID_CREDENTIALS:
      return {
        ...state,
        [LOGIN_DETAIL.USERNAME_ERROR]: true,
        [LOGIN_DETAIL.PASSWORD_ERROR]: true,
      };
    case LOGIN_DETAIL.VALID:
      return {
        ...state,
        [LOGIN_DETAIL.USERNAME_ERROR]: false,
        [LOGIN_DETAIL.PASSWORD_ERROR]: false,
      };
    default:
      return state;
  }
};

import { createAction, props } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_START = 'LOGIN_START';
export const SIGNUP = 'SIGNUP_START';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAIL = 'AUTHENTICATE_FAIL';

export const logout = createAction(LOGOUT);
export const loginStart = createAction(
  LOGIN_START,

  props<{ email: string; password: string }>()
);

export const authenticateSuccess = createAction(
  AUTHENTICATE_SUCCESS,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

// export const login = createAction(
//   LOGIN,
//   props<{
//     email: string;
//     userId: string;
//     token: string;
//     expirationDate: Date;
//   }>()
// );

export const signupStart = createAction(
  SIGNUP,
  props<{ email: string; password: string }>()
);

export const clearError = createAction('CLEAR_ERROR');



export const authenticateFail = createAction(
  AUTHENTICATE_FAIL,
  props<{ errorMessage: string }>()
);

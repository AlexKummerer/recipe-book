import { createAction, props } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_FAIL = 'LOGIN_FAIL';

export const logout = createAction(LOGOUT);
export const loginStart = createAction(LOGIN_START,

  props<{ email: string; password: string }>()

  );


export const authenticateSuccess = createAction(
  LOGIN,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);

export const login = createAction(
LOGIN,
  props<{
    email: string;
    userId: string;
    token: string;
    expirationDate: Date;
  }>()
);
;

export const authenticateFail = createAction(
  LOGIN_FAIL,
  props<{ errorMessage: string }>()
);

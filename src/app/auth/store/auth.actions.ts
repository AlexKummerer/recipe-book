import { createAction, props } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const LOGIN_START = 'LOGIN_START';

export const logout = createAction(LOGOUT);
export const loginStart = createAction(LOGIN_START);


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

export const authenticateFail = createAction(
  LOGIN,
  props<{ errorMessage: string }>()
);

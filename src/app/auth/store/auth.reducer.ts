import { createReducer, on } from "@ngrx/store";
import { User } from "../user.model";
import * as AuthActions from './auth.actions';



export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState : State = {
  user: null,
  authError: null,
  loading: false,
};


export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state: State, action) => {
    const user = new User(
      action.email,
      action.userId,
      action.token,
      action.expirationDate
    );
    return {
      ...state,
      user: user,
      authError: null,
      loading: false,
    };
  }),

  on(AuthActions.logout, (state: State) => {
    return {
      ...state,
      user: null,
      authError: null,
      loading: false,
    };
  }),

  // on(AuthActions.loginStart, (state: State) => {
  //   return {
  //     ...state,
  //     authError: null,
  //     loading: true,
  //   };
  // }),

//   on(AuthActions.authenticateSuccess, (state: State, action) => {
//     const user = new User(
//       action.email,
//       action.userId,
//       action.token,
//       action.expirationDate
//     );
//     return {
//       ...state,
//       user: user,
//       authError: null,
//       loading: false,
//     };
//   }),

//   on(AuthActions.authenticateFail, (state: State, action) => {
//     return {
//       ...state,
//       user: null,
//       authError: action.errorMessage,
//       loading: false,
//     };
//   }),

//   on(AuthActions.signupStart, (state: State) => {
//     return {
//       ...state,
//       authError: null,
//       loading: true,
//     };
//   }),

//   on(AuthActions.clearError, (state: State) => {
//     return {
//       ...state,
//       authError: null,
//     };
//   })
// );
)

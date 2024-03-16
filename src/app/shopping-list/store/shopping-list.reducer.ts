import { Store, createReducer, on } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
// import { addIngredient, addIngredients, deleteIngredient, startEdit, stopEdit, updateIngredient } from "./shopping-list.actions";

import * as ShoppingListActions from './shopping-list.actions';


export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
    new Ingredient('Potatoes', 7),
    new Ingredient('Carrots', 3),
  ],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export const shoppingListReducer = createReducer(
  initialState,

  on(ShoppingListActions.addIngredient, (state: State, action) => {
    return {
      ...state,
      ingredients: [...state.ingredients, action.ingredient],
    };
  }),

  on(ShoppingListActions.addIngredients, (state: State, action) => {
    console.log('action.ingredients', action.ingredients);

    return {
      ...state,
      ingredients: [...state.ingredients, ...action.ingredients],
    };
  }),

  on(ShoppingListActions.updateIngredient, (state: State, action) => {
    const updatedIngredient = {
      ...state.ingredients[state.editedIngredientIndex],
      ...action.ingredient,
    };
    const updatedIngredients = [...state.ingredients];
    updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
    return {
      ...state,
      ingredients: updatedIngredients,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),

  on(ShoppingListActions.deleteIngredient, (state: State, action) => {
    return {
      ...state,
      ingredients: state.ingredients.filter((ig, igIndex) => {
        return igIndex !== state.editedIngredientIndex;
      }),
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  }),

  on(ShoppingListActions.startEdit, (state: State, action) => {
    return {
      ...state,
      editedIngredient: { ...state.ingredients[action.index] },
      editedIngredientIndex: action.index,
    };
  }),

  on(ShoppingListActions.stopEdit, (state: State) => {
    return {
      ...state,
      editedIngredient: null,
      editedIngredientIndex: -1,
    };
  })
);

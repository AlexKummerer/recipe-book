import { createAction, props } from "@ngrx/store";
import { Recipe } from "../recipe.model";



export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipes] Add Recipe';
export const UPDATE_RECIPE = '[Recipes] Update Recipe';
export const DELETE_RECIPE = '[Recipes] Delete Recipe';
export const STORE_RECIPES = '[Recipes] Store Recipes';



export const setRecipes = createAction(
  SET_RECIPES,
  props<{ recipes: Recipe[] }>()
);


export const fetchRecipes = createAction(
  FETCH_RECIPES
);

export const addRecipe = createAction(
  ADD_RECIPE,
  props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
  UPDATE_RECIPE,
  props<{ id: string, newRecipe: Recipe }>()
);

export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{ id: string }>()
);

export const storeRecipes = createAction(
  STORE_RECIPES
);

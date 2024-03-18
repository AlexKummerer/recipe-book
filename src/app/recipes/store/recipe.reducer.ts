import { createReducer, on } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export const recipeReducer = createReducer(
  initialState,

  on(RecipeActions.setRecipes, (state, { recipes }) => ({
    ...state,
    recipes: [...recipes],
  })),

  on(RecipeActions.addRecipe, (state, { recipe }) => ({
    ...state,
    recipes: [...state.recipes, recipe],
  })),

  on(RecipeActions.updateRecipe, (state, { id, newRecipe }) => {
    const updatedRecipes = [...state.recipes];
    const index = updatedRecipes.findIndex((recipe) => {
      return recipe.id === id;
    });
    if (index !== -1) {
      updatedRecipes[index] = newRecipe;
    }
    return {
      ...state,
      recipes: updatedRecipes,
    };
  }),

  on(RecipeActions.deleteRecipe, (state, { id }) => ({
    ...state,
    recipes: state.recipes.filter((recipe) => recipe.id !== id),


  }))
);

import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as RecipeActions from '../store/recipe.actions';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent {
  id: string;
  editMode = false;
  ingredients: Ingredient[] = [];
  private storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}

  recipeForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    description: [
      '',
      [Validators.required, Validators.min(10), Validators.max(4200)],
    ],
    imagePath: ['', [Validators.required]],
    ingredients: this.formBuilder.array([
      this.formBuilder.group({
        name: [undefined, [Validators.required]],
        amount: [
          undefined,
          [
            Validators.required,
            Validators.min(0.1),
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ],
        ],
      }),
    ]),
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.editMode = params.get('id') != null;
        this.initForm();
      }
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = this.formBuilder.array<
      FormGroup<{ name: FormControl; amount: FormControl }>
    >([]);

    if (this.editMode) {
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map((recipesState) => {
            return recipesState.recipes.find((recipe) => {
              return recipe.id === this.id;
            });
          })
        )
        .subscribe((recipe) => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                this.formBuilder.group({
                  name: [ingredient.name, [Validators.required]],
                  amount: [
                    ingredient.amount,
                    [
                      Validators.required,
                      Validators.min(0.1),
                      Validators.pattern(/^[1-9]+[0-9]*$/),
                    ],
                  ],
                })
              );
            }
          }
        });
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, [Validators.required]],
      description: [recipeDescription, [Validators.required]],
      imagePath: [recipeImagePath, [Validators.required]],
      ingredients: recipeIngredients,
    });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      this.formBuilder.group({
        name: ['', [Validators.required]],
        amount: [
          0,
          [
            Validators.required,
            Validators.min(0.1),
            Validators.pattern(/^[1-9]+[0-9]*$/),
          ],
        ],
      })
    );

    // throw new Error('Method not implemented.');
  }
  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.id,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients.map(
        (ingredient: any) => new Ingredient(ingredient.name, ingredient.amount)
      )
    );

    if (this.editMode) {
      this.store.dispatch(
        RecipeActions.updateRecipe({ id: this.id, newRecipe })
      );
      // this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.store.dispatch(RecipeActions.addRecipe({ recipe: newRecipe }));
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }

  onCancel() {
    this.recipeForm.reset();
    this.editMode = false;
  }
}

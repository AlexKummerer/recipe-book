import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss',
})
export class RecipeEditComponent {
  id: string;
  editMode = false;
  ingredients: Ingredient[] = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService,
    private router : Router
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
      const recipe = this.recipeService.getRecipeById(this.id);
      console.log(recipe);

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
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipeName, [Validators.required]],
      description: [recipeDescription, [Validators.required]],
      imagePath: [recipeImagePath, [Validators.required]],
      ingredients: recipeIngredients,
    });

    console.log(this.recipeForm);

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
    console.log(i);
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);

  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.id,
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      this.recipeForm.value.ingredients.map((ingredient: any) => new Ingredient(ingredient.name, ingredient.amount))
    );
    console.log(newRecipe);


    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    console.log(this.recipeForm);
  }

  onCancel() {
    this.recipeForm.reset();
    this.editMode = false;
    this.router.navigate(['../'], { relativeTo: this.route });

  }
}

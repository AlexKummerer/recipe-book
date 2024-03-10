import { Ingredient } from "../shared/ingredient.model";
import * as uuid from "uuid";

export class Recipe {
  public id: string;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(id: string, name: string, desc: string, imagePath: string, ingredients: Ingredient[]) {
    this.id = id ? id : uuid.v3(name, uuid.v3.DNS);
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }


}

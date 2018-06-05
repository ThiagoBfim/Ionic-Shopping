import { Ingredient } from './../models/Ingredient';
import { Recipe } from '../models/recipe';
export class RecipesService {


  private recipes: Recipe[] = [];

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  addRecipes(itens: Recipe[]) {
    this.recipes.push(...itens);
  }

  retrieveAll() {
    return this.recipes.slice();
  }

  removeRecipe(index: number){
    this.recipes.splice(index, 1);
  }

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

}

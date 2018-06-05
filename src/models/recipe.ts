import { Ingredient } from './../models/Ingredient';
export class Recipe {

  constructor(public title: string, public descricao: string, public dificuldade: string, public ingredients: Ingredient[]) {
  }

}

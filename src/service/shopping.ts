import { Ingredient } from './../models/Ingredient';
export class ShoppingListService {

  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItens(itens: Ingredient[]) {
    this.ingredients.push(...itens);
  }

  retrieveAll() {
    return this.ingredients.slice();
  }

  removeIten(index: number){
    this.ingredients.splice(index, 1);
  }

}

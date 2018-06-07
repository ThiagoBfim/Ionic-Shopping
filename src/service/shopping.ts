import { Ingredient } from './../models/Ingredient';
export class ShoppingListService {

  private ingredients: Ingredient[] = [];

  addItem(name: string, amount: number) {
    this.addIngredient(new Ingredient(name, amount));
  }

  addItens(itens: Ingredient[]) {
    itens.forEach(element => {
     this.addIngredient(element);
    });
    // this.ingredients.push(...itens);
  }

  retrieveAll() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  private addIngredient(element: Ingredient) {
    var naoPossuiElemento = true;
      this.ingredients.forEach(f => {
        if (f.name == element.name) {
          f.amount = Number(f.amount) + Number(element.amount);
          naoPossuiElemento = false;
        }
      });
      if(naoPossuiElemento) {
        this.ingredients.push(element);
      }
  }

}

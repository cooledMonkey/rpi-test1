import { AbstractComponent } from '../framework/view/abstract-component.js';
import { CategoryLabel, Category } from '../const.js';

function createTemplate(amount,name,category  ) {
    return (
        `
        <div class = "list-item">
            <p class = "list-item__label">Сумма: ${amount}</p>
            <p class = "list-item__label">Название: ${name}</p>
            <p class = "list-item__label">Категория: ${CategoryLabel[category]}</p>
        </div>
        `
      );
}

export default class ListItemComponent extends AbstractComponent{
  constructor({amount,name,category }){
    super();
    this.amount = amount;
    this.name = name;
    this.category = category;
  }

  get template(){
        return createTemplate(this.amount, this.name, this.category);
  }
}
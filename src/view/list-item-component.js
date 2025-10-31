import { AbstractComponent } from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js'; 

function createTemplate(amount,name,category  ) {
    return (
        `
        <div class = "list-item">
            <p>Сумма: ${amount}</p>
            <p>Название: ${name}</p>
            <p>Категория: ${category}</p>
        </div>
        `
      );
}

export default class ListItemComponent extends AbstractComponent{
  constructor({amount,name,category }){
    super();
    this.amount = amount;
    this.name = name;
    if(category === "Food"){
      this.category = "Еда";
    }
    else if(category === "Transport"){
      this.category = "Транспорт";
    }
    else if(category === "Entertainment"){
      this.category = "Развлечения";
    }
    else{
      this.category = "Другое";
    }
  }

  get template(){
        return createTemplate(this.amount, this.name, this.category);
  }
}
import { AbstractComponent } from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js'; 

function createTemplate(amount,name,category  ) {
    return (
        `
        <div class = "list-item">
            <p>Название: ${amount}</p>
            <p>Автор: ${name}</p>
            <p>Категория: ${category}</p>
        </div>
        `
      );
}

export default class ListItemComponent extends AbstractComponent{
  #handleClick = null 
  constructor({amount,name,category }){
    super();
    //this.#handleClick = onClick;
    //this.element.addEventListener('submit', this.#clickHandler);
    this.amount = amount;
    this.name = name;
    this.category = category;
  }

  get template(){
        return createTemplate(this.amount, this.name, this.category);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
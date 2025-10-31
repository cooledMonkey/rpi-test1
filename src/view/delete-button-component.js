import { AbstractComponent } from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js'; 

function createTemplate(author, name) {
    return (
        `
            <button class = "book-item button">Удалить</button>
        `
      );
}


export default class DeleteButtonComponent extends AbstractComponent{
    #handleClick = null 
    constructor({id, model}){
        super();
        this.id = id;

        function a(){
            model.deleteItem({id: this.id});
        }
        this.#handleClick = a;
        this.element.addEventListener('click', this.#clickHandler);
  }

  get template(){
        return createTemplate(this.author, this.name);
  }

    #clickHandler = (evt) => {
        evt.preventDefault();
        this.#handleClick();
    };
}
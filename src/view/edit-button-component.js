import { AbstractComponent } from '../framework/view/abstract-component.js';


function createEditButtonTemplate(author, name) {
    return (
        `
            <button class = "book-item__edit-button button">Редактировать</button>
        `
      );
}


export default class EditButtonComponent extends AbstractComponent{
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
        return createEditButtonTemplate(this.author, this.name);
  }

    #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
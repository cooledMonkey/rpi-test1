import { AbstractComponent } from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js'; 

function createTemplate() {
    return (
                `<div>
            <h2>Книги</h2>
            <ul id="book-list">
            
            </ul>
        </div>
        `
      );
}

export default class ListComponent extends AbstractComponent{
  constructor(){
    super();
  }

  get template(){
        return createTemplate();
  }
}
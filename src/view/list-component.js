import { AbstractComponent } from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js'; 

function createTemplate() {
    return (
        `<h2>Список расходов</h2>
            <ul id="expense-list">
                
            </ul>`
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
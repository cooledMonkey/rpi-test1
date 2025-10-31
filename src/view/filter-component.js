import { AbstractComponent } from '../framework/view/abstract-component.js';
import {createElement} from '../framework/render.js'; 

function createTemplate() {
    return (
        `<div>
        <label for="category-filter">Фильтр по категориям:</label>
            <select id="category-filter">
                <option value="all">Все</option>
                <option value="Food">Еда</option>
                <option value="Transport">Транспорт</option>
                <option value="Entertainment">Развлечения</option>
                <option value="Entertainment">Другое</option>
            </select>

            <label><input type="checkbox" id="max-amount-filter" /> Показывать расходы более 5000</label>
        </div>`
      );
}

export default class FilterComponent extends AbstractComponent{
  constructor(){
    super();
  }

  get template(){
        return createTemplate();
  }
}
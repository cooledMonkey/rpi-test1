import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTemplate() {
    return (
        `            
            <form id="expense-form">
            <h2>Добавить расходы</h2>
                <label for="expense-name">Наименование расхода:</label>
                <input type="text" id="expense-name" placeholder="Например, еда" required />
                <label for="expense-amount">Стоимость:</label>
                <input type="number" id="expense-amount" placeholder="Amount" required />
                
                <fieldset>
                    <legend>Категория:</legend>
                    <label><input type="radio" name="expense-category" value="Food" required /> Еда</label>
                    <label><input type="radio" name="expense-category" value="Transport" required /> Транспорт</label>
                    <label><input type="radio" name="expense-category" value="Entertainment" required /> Развлечения</label>
                    <label><input type="radio" name="expense-category" value="Other" required /> Другое</label>
                </fieldset>

                <button type="submit">Добавить расходы</button>
            </form>`
      );
}

export default class FormComponent extends AbstractComponent{
  #handleClick = null 
  constructor({onClick}){
    super();
    this.#handleClick = onClick;
    this.element.addEventListener('submit', this.#clickHandler);
  }

  get template(){
        return createTemplate();
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this.#handleClick();
  };
}
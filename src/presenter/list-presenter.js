import ListItemComponent from "../view/list-item-component.js";
import { render } from "../framework/render.js";
import DeleteButtonComponent from "../view/delete-button-component.js";
import EditButtonComponent from "../view/edit-button-component.js";

export default class ListPresenter{
    #model = null;
    #listContainer = null;

    #items = [];

    constructor({boardContainer, model}){
        this.#listContainer = boardContainer;
        this.#model = model; 

        this.#model.addObserver(this.#handleModelChange.bind(this));
    }

    init(){
        this.items = [...this.#model.items];
        this.#renderBoard();
    }

    create(){
        const name = document.getElementById('expense-name').value.trim();
        const amount = document.getElementById('expense-amount').value.trim();
        const selectedRadio = document.querySelector('input[name="expense-category"]:checked');


        const selectedValue = selectedRadio.value;
        if(!name && !amount && selectedRadio){
            return;
        }
        const category = selectedValue;
        this.#model.addItem(name, amount, category);

        document.getElementById('expense-name').value = '';
        document.getElementById('expense-amount').value = '';
    }

    edit(task){
        const name = document.getElementById('expense-name-edit').value.trim();
        const amount = document.getElementById('expense-amount-edit').value.trim();
        const selectedRadio = document.querySelector('input[name="expense-category-edit"]:checked');

        if(!name && !amount && selectedRadio){
            return;
        }
        const selectedValue = selectedRadio.value;
        this.#model.editItem(name, amount, selectedValue, task.id);
        let popupBg = document.querySelector('.popup__bg'); 
        let popup = document.querySelector('.popup'); 
        popupBg.classList.remove('active');
        popup.classList.remove('active');   
    }

    filterSelection(){
        this.#handleModelChange();
    }

    #delete(){
        this.model.deleteItem(this.id);
    }

    #filterByGenre(tasks, status){
        return tasks.filter(x => {
            return x.category == status;
        });
    }

    #renderItem(task, container){
        const taskComponent = new ListItemComponent({amount: task.amount, name: task.title,category: task.category});
        const deleteButton = new DeleteButtonComponent({id: task.id, model: this.#model})
        
        const editButton = new EditButtonComponent({id: task.id, model: this.#model})
        render(deleteButton, taskComponent.element)
        render(editButton, taskComponent.element)
        render(taskComponent, container);

        let popupBg = document.querySelector('.popup__bg'); 
        let popup = document.querySelector('.popup'); 
        let openPopupButtons = editButton; 
        let closePopupButton = document.querySelector('.close-popup');
        let saveButton = document.getElementById('save-book-button-edit');
        const self = this;

        editButton.element.addEventListener('click', (e) => { 
            e.preventDefault(); 
            popupBg.classList.add('active');
            popup.classList.add('active'); 
            document.getElementById('expense-name-edit').value = task.title;
            document.getElementById('expense-amount-edit').value = task.amount;
            const radioButton = document.querySelector(`input[name="expense-category-edit"][value="${task.category}"]`);
            if (radioButton) {
                radioButton.checked = true;
            }

            const newSaveButton = saveButton.cloneNode(true);
            saveButton.parentNode.replaceChild(newSaveButton, saveButton);
            saveButton = newSaveButton;
            saveButton.addEventListener('click', self.edit.bind(self, task));
        });

        closePopupButton.addEventListener('click',() => { 
            popupBg.classList.remove('active'); 
            popup.classList.remove('active'); 
        });

        document.addEventListener('click', (e) => {
            if(e.target === popupBg) {
                popupBg.classList.remove('active'); 
                popup.classList.remove('active'); 
            }
        });
    }

    #renderBoard(){
            let tasksForStatus = this.#model.items;
            const category = document.getElementById('category-filter').value.trim();
            if((category != "all")){
                tasksForStatus = this.#filterByGenre(this.#model.items, category);
            }
            tasksForStatus.forEach((task) => {
                this.#renderItem(task, this.#listContainer.element);
            })
    }

    #clearBoard(){
        this.#listContainer.element.innerHTML = '';
    }

    #handleModelChange(){
        this.#clearBoard();
        this.#renderBoard();
    }
}

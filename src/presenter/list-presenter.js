import ListComponent from "../view/list-component.js";
import ListItemComponent from "../view/list-item-component.js";
import { render } from "../framework/render.js";
import DeleteButtonComponent from "../view/delete-button-component.js";

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

        // get items(){
    //     return this.#model.items;
    // }

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
        const bookitle = document.getElementById('book-title-edit').value.trim();
        const bookAuthor = document.getElementById('book-author-edit').value.trim();
        const bookGenre = document.getElementById('book-genre-edit').value.trim();
        if(!bookitle && !bookAuthor && (bookGenre != "Выбрать жанр")){
            return;
        }
        this.#model.editItem(bookitle, bookAuthor, bookGenre, task.id);
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
            return x.genre == status;
        });
    }

    #renderItem(task, container){
        const taskComponent = new ListItemComponent({amount: task.amount, name: task.title,category: task.category});
        const deleteButton = new DeleteButtonComponent({id: task.id, model: this.#model})
        
        //const editButton = new EditButtonComponent({id: task.id, model: this.#model})
        render(deleteButton, taskComponent.element)
        //render(editButton, taskComponent.element)
        render(taskComponent, container);

        // let popupBg = document.querySelector('.popup__bg'); 
        // let popup = document.querySelector('.popup'); 
        // let openPopupButtons = editButton; 
        // let closePopupButton = document.querySelector('.close-popup');
        // let saveButton = document.getElementById('save-book-button-edit');
        // const self = this;

        // editButton.element.addEventListener('click', (e) => { 
        //     e.preventDefault(); 
        //     popupBg.classList.add('active');
        //     popup.classList.add('active'); 
        //     document.getElementById('book-title-edit').value = task.title;
        //     document.getElementById('book-author-edit').value = task.author;
        //     document.getElementById('book-genre-edit').value = task.genre;

        //     const newSaveButton = saveButton.cloneNode(true);
        //     saveButton.parentNode.replaceChild(newSaveButton, saveButton);
        //     saveButton = newSaveButton;
        //     saveButton.addEventListener('click', self.editBook.bind(self, task));
        // });

        // closePopupButton.addEventListener('click',() => { 
        //     popupBg.classList.remove('active'); 
        //     popup.classList.remove('active'); 
        // });

        // document.addEventListener('click', (e) => {
        //     if(e.target === popupBg) {
        //         popupBg.classList.remove('active'); 
        //         popup.classList.remove('active'); 
        //     }
        // });
    }

    #renderBoard(){
            let tasksForStatus = this.#model.items;
            //const bookGenre = document.getElementById('genre-filter').value.trim();
            // if((bookGenre != "all")){
            //     tasksForStatus = this.#filterByGenre(this.#model.items, bookGenre);
            // }
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

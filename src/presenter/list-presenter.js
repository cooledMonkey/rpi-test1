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

    create(){
        const bookitle = document.getElementById('book-title').value.trim();
        const bookAuthor = document.getElementById('book-author').value.trim();
        const bookGenre = document.getElementById('book-genre').value.trim();
        if(!bookitle && !bookAuthor && (bookGenre != "Выбрать жанр")){
            return;
        }
        this.#model.addBook(bookitle, bookAuthor, bookGenre);

        document.getElementById('book-title').value = '';
        document.getElementById('book-author').value = '';
    }

    edit(task){
        const bookitle = document.getElementById('book-title-edit').value.trim();
        const bookAuthor = document.getElementById('book-author-edit').value.trim();
        const bookGenre = document.getElementById('book-genre-edit').value.trim();
        if(!bookitle && !bookAuthor && (bookGenre != "Выбрать жанр")){
            return;
        }
        this.#model.editBook(bookitle, bookAuthor, bookGenre, task.id);
        let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
        let popup = document.querySelector('.popup'); 
        popupBg.classList.remove('active'); // Убираем активный класс с фона
        popup.classList.remove('active');   
    }

    filterSelection(){
        this.#handleModelChange();
    }

    #delete(){
        this.model.delete(this.id);
    }

    #filterByGenre(tasks, status){
        return tasks.filter(x => {
            return x.genre == status;
        });
    }

    #renderTask(task, container){
        const taskComponent = new ListItemComponent({author: task.author, name: task.title, 
            id: task.id, model: this.#model});
        const deleteButton = new DeleteButtonComponent({id: task.id, model: this.#model})
        
        const editButton = new EditButtonComponent({id: task.id, model: this.#model})
        render(deleteButton, taskComponent.element)
        render(editButton, taskComponent.element)
        render(taskComponent, container);

        let popupBg = document.querySelector('.popup__bg'); // Фон попап окна
        let popup = document.querySelector('.popup'); // Само окно
        let openPopupButtons = editButton; // Кнопки для показа окна
        let closePopupButton = document.querySelector('.close-popup'); // Кнопка для скрытия окна
        let saveButton = document.getElementById('save-book-button-edit');
        const self = this;

        editButton.element.addEventListener('click', (e) => { 
            e.preventDefault(); 
            popupBg.classList.add('active'); // Добавляем класс 'active' для фона
            popup.classList.add('active'); // И для самого окна
            document.getElementById('book-title-edit').value = task.title;
            document.getElementById('book-author-edit').value = task.author;
            document.getElementById('book-genre-edit').value = task.genre;
            const newSaveButton = saveButton.cloneNode(true);
            saveButton.parentNode.replaceChild(newSaveButton, saveButton);
    
            // Обновляем ссылку
            saveButton = newSaveButton;
            //saveButton.getEventListeners.
            saveButton.addEventListener('click', self.editBook.bind(self, task));
        });

        closePopupButton.addEventListener('click',() => { // Вешаем обработчик на крестик
            popupBg.classList.remove('active'); // Убираем активный класс с фона
            popup.classList.remove('active'); // И с окна
        });

        document.addEventListener('click', (e) => { // Вешаем обработчик на весь документ
            if(e.target === popupBg) { // Если цель клика - фот, то:
                popupBg.classList.remove('active'); // Убираем активный класс с фона
                popup.classList.remove('active'); // И с окна
            }
        });
    }

    

    #renderBoard(){
            let tasksForStatus = this.#model.items;
            const bookGenre = document.getElementById('genre-filter').value.trim();
            if((bookGenre != "all")){
                tasksForStatus = this.#filterByGenre(this.#model.items, bookGenre);
            }
            tasksForStatus.forEach((task) => {
                this.#renderTask(task, this.#listContainer.element);
            })
    }

    get items(){
        return this.#model.items;
    }

    #clearBoard(){
        this.#listContainer.element.innerHTML = '';
    }

    #handleModelChange(){
        this.#clearBoard();
        this.#renderBoard();
    }
}

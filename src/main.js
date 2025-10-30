import FormComponent from "./view/form-component.js";
import { RenderPosition, render } from "./framework/render.js";
import ListComponent from "./view/list-component.js";
import Model from "./model/model.js";
import ListPresenter from "./presenter/list-presenter.js";

const bodyContainer = document.querySelector('.header');
const formContainer = document.querySelector('.book-form');
const filterContainer = document.querySelector('.book-filter');
const listContainer = document.querySelector('.book-list');

const listComponent = new ListComponent();
render(listComponent, listContainer, RenderPosition.AFTERBEGIN);

const model = new Model();

const taskBoardPresenter = new ListPresenter({
    listContainer: listComponent, 
    model: model,
});

function handleNewTaskButtonClick(){
    taskBoardPresenter.create();
}
const formComponent = new FormComponent({onClick: handleNewTaskButtonClick});

render(formComponent, formContainer, RenderPosition.AFTERBEGIN);

function handleFilterSelection(){
    taskBoardPresenter.filterSelection();
}
const filterBookComponent = new FilterBooksComponent({onClick: handleFilterSelection});
render(filterBookComponent, filterContainer, RenderPosition.AFTERBEGIN);

taskBoardPresenter.init();

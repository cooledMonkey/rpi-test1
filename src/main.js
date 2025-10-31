import FormComponent from "./view/form-component.js";
import { RenderPosition, render } from "./framework/render.js";
import ListComponent from "./view/list-component.js";
import Model from "./model/model.js";
import ListPresenter from "./presenter/list-presenter.js";
import FilterComponent from "./view/filter-component.js";

const bodyContainer = document.querySelector('.header');
const formContainer = document.querySelector('.expense-form');
const filterContainer = document.querySelector('.expense-filter');
const listContainer = document.querySelector('.expense-list');

const listComponent = new ListComponent();
render(listComponent, listContainer, RenderPosition.AFTERBEGIN);

const model = new Model();

const taskBoardPresenter = new ListPresenter({
    boardContainer: listComponent, 
    model: model,
});

function handleNewTaskButtonClick(){
    taskBoardPresenter.create();
}
const formComponent = new FormComponent({onClick: handleNewTaskButtonClick});

render(formComponent, formContainer, RenderPosition.AFTERBEGIN);


const filterComponent = new FilterComponent();
render(filterComponent, filterContainer)

function handleFilterSelection(){
    taskBoardPresenter.filterSelection();
}

taskBoardPresenter.init();

import {items} from '../mock/mock.js';
import generateID from '../utils.js'

export default class Model{
    #data = items;
    #observers = [];

    get items(){
        return this.#data;
    }

    getItemByStatus(status){
        return this.#data.filter(task => task.status === status);
    }

    addItem(name, amount, category){
        const newItem = {
            id: generateID(),
            title: name,
            amount: amount, 
            category: category,
        };
        this.#data.push(newItem);
        this._notifyObservers();
        return newItem;
    }

    editItem(name, amount, category, oldItemId){
        const newItem = {
            id: generateID(),
            title: name,
            amount: amount, 
            category: category,
        };
        this.#data.push(newItem);
        this.#data = this.items.filter((x) => x.id !== oldItemId);
        this._notifyObservers();
    }

    deleteItem(id){
        this.#data = this.items.filter((x) => x.id !== id.id);
        this._notifyObservers();
    }

    addObserver(observer){
        this.#observers.push(observer);
    }

    removeObserver(observer){
        this.#observers = this.#observers.filter((obs) => obs !== observer);
    }

    _notifyObservers(){
        this.#observers.forEach((observer) => observer());
    }
}
import {Todo} from "./AddTodo.js";

export class Project{
    constructor(name){
        this.name = name;
        this.todos = [];
    }
    addTodo(todoData){
        const newTodo = new Todo ({...todoData,project:this.name})
        this.todos.push(newTodo);
        return newTodo;
    }
    removeTodo(id){
        this.todos = this.todos.filter(todo => todo.id!==id);
    }
    getTodoById(id){
        return this.todos.find(todo => todo.id == id);
    }
}
import "./style.css";
import { Todo } from "./AddTodo";
import { Project } from "./addProject";
import { Storage } from "./Storage.js";
import { TodoUI } from "./todoUI.js";
import { TodoManager } from "./todoManager.js";


document.addEventListener('DOMContentLoaded', () => {
    // Initialize core components
    const todoManager = new TodoManager();
    const storage = new Storage('todoAppData');
    const todoUI = new TodoUI(todoManager, storage);
  
    // Load saved data or initialize defaults
    const storedProjects = storage.load();
    if (storedProjects) {
      storedProjects.forEach(projectData => {
        const project = new Project(projectData.name);
        projectData.todos.forEach(todoData => {
          project.addTodo(todoData);
        });
        todoManager.projects.push(project);
      });
      todoManager.setCurrentProject(storedProjects[0].name);
    } else {
      // First-time setup
      todoManager.addProject('Default');
    }
  
    // Start UI
    todoUI.init();
  });


import { Project } from "./addProject.js";

export class TodoManager{
    constructor(){
        this.projects = [];
        this.currentProjects = null;
    }
    addProject(name) {
        const newProject = new Project(name);
        this.projects.push(newProject);
        
        if (!this.currentProject) {
          this.currentProject = newProject;
        }
        
        return newProject;
      }
    
      setCurrentProject(projectName) {
        this.currentProject = this.projects.find(
          project => project.name === projectName
        );
      }
    
      getCurrentTodos() {
        return this.currentProject ? this.currentProject.todos : [];
      }
    
      getProjectNames() {
        return this.projects.map(project => project.name);
      }
}
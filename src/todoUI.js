export class TodoUI{
    constructor(todoManager, storage){
        this.todoManager = todoManager;
        this.storage = storage;
        this.projectList = document.querySelector("#project-list");
        this.currentProjectName = document.querySelector("#current-project-name");
        this.todoList = document.querySelector("#todo-list");
        this.todoForm = document.querySelector("#todo-form");
        this.projectForm = document.querySelector("#project-form");
    }
    handleAddTodo(e){
        e.preventDefault();
        const todoData = {
            title: document.querySelector("#todo-title").value,
            description: document.querySelector("#desc").value,
            dueDate: document.querySelector("#dueDate").value,
            priority: document.querySelector("#priority").value
        };
        this.todoManager.currentProject.addTodo(todoData);
        this.storage.save(this.todoManager.projects);
        this.renderTodos();
        e.target.reset();
    }
    handleAddProject(e){
        e.preventDefault();
        const projectName = document.querySelector("#project-name").value.trim();
        if(!projectName) return;
        this.todoManager.addProject(projectName)
        this.renderProjects();
        document.querySelector("#project-name").value = "";
    }
    renderProjects(){
        this.projectList.innerHTML="";
        this.todoManager.projects.forEach(project => {
            const projectElement = document.createElement("div");
            projectElement.className = `project ${project === this.todoManager.currentProject ? 'active' : ''}`;
            projectElement.textContent = project.name;
            
            projectElement.addEventListener('click', ()=>{
                this.todoManager.setCurrentProject(project.name);
                this.currentProjectName.textContent = project.name;
                this.renderProjects();
                this.renderTodos();
            });
            this.projectList.appendChild(projectElement);
        });
    }
    renderTodos(){
        this.todoList.innerHTML = '';
    const todos = this.todoManager.getCurrentTodos();
    
    if (todos.length === 0) {
      const emptyMessage = document.createElement('p');
      emptyMessage.textContent = 'No tasks in this project yet.';
      this.todoList.appendChild(emptyMessage);
      return;
    }

    todos.forEach(todo => {
      const todoCard = document.createElement('div');
      todoCard.className = `todo-card ${todo.completed ? 'completed' : ''}`;
      
      // Title
      const title = document.createElement('h3');
      title.className = 'todo-title';
      title.textContent = todo.title;
      todoCard.appendChild(title);
      
      // Description 
      if (todo.description) {
        const description = document.createElement('p');
        description.className = 'todo-description';
        description.textContent = todo.description;
        todoCard.appendChild(description);
      }
      
      // Meta container
      const metaContainer = document.createElement('div');
      metaContainer.className = 'todo-meta';
      
      // Priority
      const priority = document.createElement('span');
      priority.className = `priority-${todo.priority}`;
      priority.textContent = todo.priority;
      metaContainer.appendChild(priority);
      
      // Due date
      const dueDate = document.createElement('span');
      dueDate.className = 'due-date';
      dueDate.textContent = todo.formattedDueDate();
      metaContainer.appendChild(dueDate);
      
      todoCard.appendChild(metaContainer);
      
      // Button container 
      const buttonContainer = document.createElement('div');
      buttonContainer.className = 'todo-actions';
      
      // Toggle button
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'toggle-btn';
      toggleBtn.dataset.id = todo.id;
      toggleBtn.textContent = todo.completed ? 'Undo' : 'Complete';
      toggleBtn.addEventListener('click', () => {
        todo.toggle();
        this.storage.save(this.todoManager.projects);
        this.renderTodos();
      });
      buttonContainer.appendChild(toggleBtn);
      
      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.dataset.id = todo.id;
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', () => {
        this.todoManager.currentProject.removeTodo(todo.id);
        this.storage.save(this.todoManager.projects);
        this.renderTodos();
      });
      buttonContainer.appendChild(deleteBtn);
      
      todoCard.appendChild(buttonContainer);
      this.todoList.appendChild(todoCard);
    });
    }
    setEventListeners(){
        this.projectForm.addEventListener('submit',(e)=>this.handleAddProject(e));
        this.todoForm.addEventListener('submit', (e)=>this.handleAddTodo(e));
    }
    init(){
        this.renderProjects();
        this.renderTodos();
        this.setEventListeners();
    }
}
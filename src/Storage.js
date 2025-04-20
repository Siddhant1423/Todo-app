export class Storage{
    constructor(key){
        this.key = key;
    }
    save(projects){
        const data = projects.map(project =>({
            name: project.name,
            todos: project.todos.map(todo => ({
                title: todo.title,
                description: todo.description,
                dueDate: todo.dueDate ? todo.dueDate.toISOString() : null,
                priority: todo.priority,
                completed: todo.completed,
                id: todo.id,
                project: todo.project   
            }))
        }));
        localStorage.setItem(this.key, JSON.stringify(data))
    }
    load(){
        const stored = localStorage.getItem(this.key);
        return stored ? JSON.parse(stored): null;
    }
}
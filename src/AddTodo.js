import { parseISO,format } from 'date-fns';

export class Todo{
    constructor({title,description="",dueDate=null,priority,project="Default"}){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate ? parseISO(dueDate) : null;
        this.priority = priority;
        this.completed = false;
        this.id = Date.now().toString();
        this.project = project;
    }
    toggle(){
        this.completed = !this.completed; 
    }
    formattedDueDate() {
        return this.dueDate ? format(this.dueDate, 'dd MMM yyyy') : 'No date';
      }
}
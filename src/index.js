import "./style.css";

const addProject = document.querySelector("#addProjectBtn");
const projectList = document.querySelector("#project-list");

addProject.addEventListener('click',()=>{
    const li = document.createElement("li");
    // write here
    
    projectList.append(li)
    li.textContent = "";
})
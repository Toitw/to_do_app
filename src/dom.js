import { tasks } from './tasks.js';
import { projects } from './projects.js';

//Open tasks modal
const addTaskButton = document.querySelector('.add-task-button');
const taskModal = document.querySelector('.task-modal');

addTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'block';
});

//Close tasks modal
const closeTaskButton = document.querySelector('.close-button');
closeTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'none';
});

// Update project list in the task modal
const projectSelect = document.querySelector('#project');

for (const project of projects) {
  const projectOption = document.createElement('option');
  projectOption.value = project.name;
  projectOption.textContent = project.name;
  projectSelect.appendChild(projectOption);
}



//Add project modal
const addProjectButton = document.querySelector('.add-project-button');
const projectModal = document.querySelector('.project-modal');

addProjectButton.addEventListener('click', () => {
  projectModal.style.display = 'block';
}
);

//Close projectmodal
const closeProjectButton = document.querySelector('.project-close-button');
closeProjectButton.addEventListener('click', () => {
  projectModal.style.display = 'none';
});

// Display projects
function displayProjects() {
  const defaultProject = document.querySelector('.default-project');

  for (const project of projects) {
    const projectItem = document.createElement('li');
    projectItem.textContent = project.name;
    defaultProject.appendChild(projectItem);

    const taskList = document.createElement('ul');
    projectItem.appendChild(taskList);

    for (const task of project.tasks) {
      const taskItem = document.createElement('li');
      taskItem.textContent = task.title;
      taskList.appendChild(taskItem);
    }
  }
}

export { displayProjects };




import { tasks } from './tasks.js';
import { projects } from './projects.js';

//Open tasks modal
const addTaskButton = document.querySelector('.add-task-button');
const taskModal = document.querySelector('.task-modal');

addTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'block';
  updateProjectList();
});

//Close tasks modal
const closeTaskButton = document.querySelector('.close-button');
closeTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'none';
});

function updateProjectList() {
  // Get the project select element
  const projectSelect = document.querySelector('#project');

  // Loop through the projects array
  for (const project of projects) {
    // Check if an option with the project name already exists
    const existingOption = projectSelect.querySelector(`option[value="${project.name}"]`);

    // If an option does not exist, create a new one and add it to the project select element
    if (!existingOption) {
      const projectOption = document.createElement('option');
      projectOption.value = project.name;
      projectOption.textContent = project.name;
      projectSelect.appendChild(projectOption);
    }
  }
}



// Get the add project button and project modal
const addProjectButton = document.querySelector('.add-project-button');
const projectModal = document.querySelector('.project-modal');

// Add an event listener to the add project button to open the project modal
addProjectButton.addEventListener('click', () => {
  projectModal.style.display = 'block';
});


//Close projectmodal
const closeProjectButton = document.querySelector('.project-close-button');
closeProjectButton.addEventListener('click', () => {
  projectModal.style.display = 'none';
});

// Display projects
function updateProjects() {
  const projectList = document.querySelector('.project-list');

  for (const project of projects) {
    // Check if a project item with the project name already exists
    const existingProjectItem = projectList.querySelector(`li[data-project="${project.name}"]`);
  
    // If a project item does not exist, create a new one and add it to the project list
    if (!existingProjectItem) {
      const projectItem = document.createElement('li');
      projectItem.dataset.project = project.name;
      projectItem.textContent = project.name;
      projectList.appendChild(projectItem);
  
      const taskList = document.createElement('ul');
      projectItem.appendChild(taskList);
  
      for (const task of project.tasks) {
        // Check if a task item with the task title already exists
        const existingTaskItem = taskList.querySelector(`li[data-task="${task.title}"]`);
  
        // If a task item does not exist, create a new one and add it to the task list
        if (!existingTaskItem) {
          const taskItem = document.createElement('li');
          taskItem.dataset.task = task.title;
          taskItem.textContent = task.title;
          taskList.appendChild(taskItem);
        }
      }
    } else {
      // If a project item already exists, update the task list
      const taskList = existingProjectItem.querySelector('ul');
  
      for (const task of project.tasks) {
        // Check if a task item with the task title already exists
        const existingTaskItem = taskList.querySelector(`li[data-task="${task.title}"]`);
  
        // If a task item does not exist, create a new one and add it to the task list
        if (!existingTaskItem) {
          const taskItem = document.createElement('li');
          taskItem.dataset.task = task.title;
          taskItem.textContent = task.title;
          taskList.appendChild(taskItem);
        }
      }
    }
  }
}

//Function to update the project and task lists
const taskForm = document.querySelector('.task-form');
const projectForm = document.querySelector('.project-form');

taskForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  updateProjects();
});

projectForm.addEventListener('submit', (event) => {
  event.preventDefault(); 
  updateProjects();
});


export { updateProjects };




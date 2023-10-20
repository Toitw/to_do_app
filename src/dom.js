import { completeTask, deleteTask } from './tasks.js';
import { projects } from './projects.js';
import { setValid, getValid } from './validations.js';

let activeTask = null;


//Open tasks modal
const addTaskButton = document.querySelector('.add-task-button');
const taskModal = document.querySelector('.task-modal');

addTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'block';
  updateProjectList();
  // Add event listeners to the task form fields to validate input on blur
  const taskForm = document.querySelector('.task-form');
  taskForm.elements['taskName'].addEventListener('blur', (event) => {
    const title = event.target.value.trim();
    if (title.length > 20) {
      const errorMessage = 'The title must be no more than 20 characters.';
      displayErrorMessage(event.target, errorMessage);
      setValid(false);
    } else {
      clearErrorMessage(event.target);
      setValid(true);
    }
  });

  taskForm.elements['taskDescription'].addEventListener('blur', (event) => {
    const description = event.target.value.trim();
    if (description.length > 300) {
      const errorMessage = 'The description must be no more than 300 characters.';
      displayErrorMessage(event.target, errorMessage);
      setValid(false);
    } else {
      clearErrorMessage(event.target);
      setValid(true);
    }
  });

  taskForm.elements['dueDate'].addEventListener('blur', (event) => {
    const dueDate = event.target.value.trim();
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dueDate)) {
      const errorMessage = 'Please enter the due date in the format DD/MM/YYYY.';
      displayErrorMessage(event.target, errorMessage);
      setValid(false);
    } else {
      clearErrorMessage(event.target);
      setValid(true);
    }
  });

  // Function to display an error message for a form field
  function displayErrorMessage(field, message) {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('task-validation-error-message')) {
      errorElement.textContent = message;
    } else {
      const newErrorElement = document.createElement('p');
      newErrorElement.textContent = message;
      newErrorElement.classList.add('task-validation-error-message');
      field.insertAdjacentElement('afterend', newErrorElement);
    }
  }

  // Function to clear an error message for a form field
  function clearErrorMessage(field) {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('task-validation-error-message')) {
      errorElement.remove();
    }
  }
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
function closeModal() {
  projectModal.style.display = 'none';
}

const closeProjectButton = document.querySelector('.project-close-button');
closeProjectButton.addEventListener('click', () => {
  closeModal();
});

//Add project to the project list
function addProjectToList(project) {
  const projectName = project.name;
  const projectList = document.querySelector('.project-list');
  const projectItem = document.createElement('li');
  projectItem.classList.add('project-item');
  projectItem.dataset.project = projectName;
  projectItem.textContent = projectName;
  projectList.appendChild(projectItem);
}

//Add task to the task list
function addTaskToList(task, project) {
  const projectItem = document.querySelector(`li[data-project="${project.name}"]`);
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  taskItem.dataset.task = task.title;
  taskItem.textContent = task.title;
  projectItem.appendChild(taskItem);
}

// Initialize showCompleted variable from local storage or default to false
let showCompleted = JSON.parse(localStorage.getItem('showCompleted')) || false;

window.addEventListener('DOMContentLoaded', () => {
  for (const project of projects) {
    addProjectToList(project);
    for (const task of project.tasks) {
      if (showCompleted) {
        addTaskToList(task, project);
      } else if (!task.completed && !showCompleted) {
        addTaskToList(task, project);
      }
    }
  }
});

// Display task details
const projectList = document.querySelector('.project-list');
projectList.addEventListener('click', displayTaskDetails);

function displayTaskDetails(event) {
  const completedTaskButton = document.querySelector('.complete-task-button');
  const deleteTaskButton = document.querySelector('.delete-task-button');
  if (event.target.classList.contains('task-item')) {
    const taskTitle = event.target.dataset.task;
    const taskProjectName = event.target.closest('[data-project]').dataset.project;
    const project = projects.find((project) => project.name === taskProjectName);
    const task = project.tasks.find((task) => task.title === taskTitle);
    activeTask = task;
    completedTaskButton.style.display = 'block';
    deleteTaskButton.style.display = 'block';
    updateTaskDetails(task);
  }
}

function updateTaskDetails(task) {
  const taskProjectName = document.querySelector('#task-details-project');
  taskProjectName.textContent = task.project;
  const taskTitleElement = document.querySelector('#task-details-title');
  taskTitleElement.textContent = task.title;
  const taskDescription = document.querySelector('#task-details-description');
  taskDescription.textContent = task.description;
  const taskDueDate = document.querySelector('#task-details-due-date');
  taskDueDate.textContent = task.dueDate;
  const taskPriority = document.querySelector('#task-details-priority');
  taskPriority.textContent = task.priority;
}

//Complete task
const completeTaskButton = document.querySelector('.complete-task-button');
completeTaskButton.addEventListener('click', () => {
  completeTask(activeTask);
  updateTaskDetails(activeTask);
  location.reload();
});

//Show completed tasks
const showCompletedButton = document.querySelector('.show-completed-button');
showCompletedButton.textContent = showCompleted ? 'Hide completed' : 'Show completed';
showCompletedButton.addEventListener('click', () => {
  showCompleted = !showCompleted;
  showCompletedButton.textContent = showCompleted ? 'Hide completed' : 'Show completed';
  localStorage.setItem('showCompleted', JSON.stringify(showCompleted));
  location.reload();
});

//Delete task
const deleteTaskButton = document.querySelector('.delete-task-button');
deleteTaskButton.addEventListener('click', () => {
  deleteTask(activeTask);
  location.reload();
});





export { addProjectToList, addTaskToList, closeModal };




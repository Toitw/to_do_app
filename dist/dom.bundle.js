"use strict";
(self["webpackChunkto_do_app"] = self["webpackChunkto_do_app"] || []).push([["dom"],{

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addProjectToList: () => (/* binding */ addProjectToList),
/* harmony export */   addTaskToList: () => (/* binding */ addTaskToList),
/* harmony export */   closeModal: () => (/* binding */ closeModal)
/* harmony export */ });
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ "./src/tasks.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _validations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validations.js */ "./src/validations.js");




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
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)('name', false);
    } else {
      clearErrorMessage(event.target);
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)('name', true);
    }
  });

  taskForm.elements['taskDescription'].addEventListener('blur', (event) => {
    const description = event.target.value.trim();
    if (description.length > 300 && description.length < 1) {
      const errorMessage = 'The description must be no more than 300 characters and not left blank.';
      displayErrorMessage(event.target, errorMessage);
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)('description', false);
    } else {
      clearErrorMessage(event.target);
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)('description', true);
    }
  });

  taskForm.elements['dueDate'].addEventListener('blur', (event) => {
    const dueDate = event.target.value.trim();
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dueDate)) {
      const errorMessage = 'Please enter the due date in the format DD/MM/YYYY.';
      displayErrorMessage(event.target, errorMessage);
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)('date', false);
    } else {
      clearErrorMessage(event.target);
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)('date', true);
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
  for (const project of _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects) {
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

// Add task to the task list
function addTaskToList(task, project) {
  const projectItem = document.querySelector(`li[data-project="${project.name}"]`);
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  taskItem.dataset.task = task.title;
  taskItem.textContent = task.title;

  // Check if the project item has a task item container
  let taskItemContainer = projectItem.querySelector('.task-item-container');
  if (!taskItemContainer) {
    // Create a new task item container if it does not exist
    taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item-container');
    projectItem.appendChild(taskItemContainer);
  }

  // Append the task item to the task item container
  taskItemContainer.appendChild(taskItem);
}

// Initialize showCompleted variable from local storage or default to false
let showCompleted = JSON.parse(localStorage.getItem('showCompleted')) || false;

window.addEventListener('DOMContentLoaded', () => {
  for (const project of _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects) {
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
    const project = _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects.find((project) => project.name === taskProjectName);
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
  (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.completeTask)(activeTask);
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
  (0,_tasks_js__WEBPACK_IMPORTED_MODULE_0__.deleteTask)(activeTask);
  location.reload();
});











/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   initProjects: () => (/* binding */ initProjects),
/* harmony export */   projects: () => (/* binding */ projects)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");


// Define the Project object factory
function Project(name, tasks) {
    return {
      name: name,
      tasks: tasks
    };
}

// Load projects from web storage
let projects = JSON.parse(localStorage.getItem('projects')) || [];

function initProjects() {
  // Check if the "Default" project already exists
  const defaultProject = projects.find((project) => project.name === 'Default');

  // If the "Default" project does not exist, create it
  if (!defaultProject) {
    const newDefaultProject = Project('Default', []);
    projects.push(newDefaultProject);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

//Get the project form
const projectForm = document.querySelector('.project-form');

//Add an event listener to the project form to handle form submissions
projectForm.addEventListener('submit', (event) => {
    //Prevent the default form submission behavior
    event.preventDefault();

    //Get the values of the form fields
    const name = projectForm.elements['projectName'].value;
    // Check if a project with the same name already exists
    const existingProject = projects.find((p) => p.name === name);
    if (existingProject) {
      const errorMessage = `A project with the name "${name}" already exists.`;
      const errorElement = document.createElement('p');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('project-name-error-message');
      projectForm.appendChild(errorElement);
    } else {
      //Create a new project object using the Project object factory
      const project = Project(name, []);

      //Store the project in web storage
      projects.push(project);
      localStorage.setItem('projects', JSON.stringify(projects));

      //Add the project to the project list
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.addProjectToList)(project);

      //Clear the form fields
      projectForm.reset();

      //Close the form
      (0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.closeModal)();
    }
});

// Export the projects array and the createProject function


/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   completeTask: () => (/* binding */ completeTask),
/* harmony export */   deleteTask: () => (/* binding */ deleteTask)
/* harmony export */ });
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
/* harmony import */ var _validations_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./validations.js */ "./src/validations.js");




// Define the Task object factory
function Task(title, project, description, dueDate, priority) {
    return {
      title: title,
      project: project,
      description: description,
      dueDate: dueDate,
      priority: priority,
      completed: false
    };
  }

  // Get the task form
  const taskForm = document.querySelector('.task-form');

  // Load tasks from web storage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Add an event listener to the task form to handle form submissions
  taskForm.addEventListener('submit', (event) => {
    if (!(0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.getValid)()) {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Show modal window with error message
      const errorMessage = document.querySelector('.error-message');
      errorMessage.style.display = 'block';
      // Hide modal window with error message after 3 seconds
      setTimeout(() => {
        errorMessage.style.display = 'none';
      }, 3000);
    } else {
      // Get the values of the form fields
      const title = taskForm.elements['taskName'].value;
      const projectName = taskForm.elements['project'].value;
      const description = taskForm.elements['taskDescription'].value;
      const dueDate = taskForm.elements['dueDate'].value;
      const priority = taskForm.elements['priority'].value;
      const completed = false;

      // Find the project object with the matching name
      const project = _projects_js__WEBPACK_IMPORTED_MODULE_0__.projects.find((project) => project.name === projectName);
      const existingTask = project.tasks.find((task) => task.title === title);
      if (existingTask && existingTask.completed === false) {
        const errorMessage = `A task with the name "${title}" already exists in the "${projectName}" project.`;
        const errorElement = document.createElement('p');
        errorElement.textContent = errorMessage;
        errorElement.classList.add('task-name-error-message');
        taskForm.appendChild(errorElement);
        return;
      } else {
        // Create a new task object using the Task object factory
        const task = Task(title, projectName, description, dueDate, priority, completed);

        // Add the task to the project and store it in web storage
        if (project) {
          project.tasks.push(task);
          localStorage.setItem('projects', JSON.stringify(_projects_js__WEBPACK_IMPORTED_MODULE_0__.projects));
        }

        // Add the task to the task list
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.addTaskToList)(task, project);
      
        // Clear the form fields
        taskForm.reset();

        // Close the form
        (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.closeModal)();
      }
    }
  });

  //Complete task
  function completeTask(task) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    for (const project of projects) {
      const tasks = project.tasks;
      for (const t of tasks) {
        if (t.title === task.title && t.projectName === task.projectName) {
          t.completed = true;
          localStorage.setItem('projects', JSON.stringify(projects));
          return;
        }
      }
    }
  }

  //Delete task
  function deleteTask(task) {
    const projects = JSON.parse(localStorage.getItem('projects'));
    for (const project of projects) {
      const tasks = project.tasks;
      for (const t of tasks) {
        if (t.title === task.title && t.projectName === task.projectName) {
          const index = tasks.indexOf(t);
          tasks.splice(index, 1);
          localStorage.setItem('projects', JSON.stringify(projects));
          return;
        }
      }
    }
  }

  // Export the tasks array
  



/***/ }),

/***/ "./src/validations.js":
/*!****************************!*\
  !*** ./src/validations.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   dateIsValid: () => (/* binding */ dateIsValid),
/* harmony export */   descriptionIsValid: () => (/* binding */ descriptionIsValid),
/* harmony export */   getValid: () => (/* binding */ getValid),
/* harmony export */   nameIsValid: () => (/* binding */ nameIsValid),
/* harmony export */   setValid: () => (/* binding */ setValid)
/* harmony export */ });
let dateIsValid = false;
let nameIsValid = false;
let descriptionIsValid = false;

function setValid(type, value) {
  if (type === 'date') {
    dateIsValid = value;
  } else if (type === 'name') {
    nameIsValid = value;
  } else if (type === 'description') {
    descriptionIsValid = value;
  }
}

function getValid() {
  return dateIsValid && nameIsValid && descriptionIsValid;
}



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/dom.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL3ZhbGlkYXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXBsZXRlVGFzaywgZGVsZXRlVGFzayB9IGZyb20gJy4vdGFza3MuanMnO1xyXG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xyXG5pbXBvcnQgeyBzZXRWYWxpZCwgbmFtZUlzVmFsaWQsIGRlc2NyaXB0aW9uSXNWYWxpZCwgZGF0ZUlzVmFsaWQgfSBmcm9tICcuL3ZhbGlkYXRpb25zLmpzJztcclxuXHJcbmxldCBhY3RpdmVUYXNrID0gbnVsbDtcclxuXHJcblxyXG4vL09wZW4gdGFza3MgbW9kYWxcclxuY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1idXR0b24nKTtcclxuY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbW9kYWwnKTtcclxuXHJcbmFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIHVwZGF0ZVByb2plY3RMaXN0KCk7XHJcblxyXG4gIC8vIEFkZCBldmVudCBsaXN0ZW5lcnMgdG8gdGhlIHRhc2sgZm9ybSBmaWVsZHMgdG8gdmFsaWRhdGUgaW5wdXQgb24gYmx1clxyXG4gIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybScpO1xyXG4gIHRhc2tGb3JtLmVsZW1lbnRzWyd0YXNrTmFtZSddLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IHRpdGxlID0gZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKTtcclxuICAgIGlmICh0aXRsZS5sZW5ndGggPiAyMCkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnVGhlIHRpdGxlIG11c3QgYmUgbm8gbW9yZSB0aGFuIDIwIGNoYXJhY3RlcnMuJztcclxuICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShldmVudC50YXJnZXQsIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgIHNldFZhbGlkKCduYW1lJywgZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJFcnJvck1lc3NhZ2UoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgc2V0VmFsaWQoJ25hbWUnLCB0cnVlKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tEZXNjcmlwdGlvbiddLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKTtcclxuICAgIGlmIChkZXNjcmlwdGlvbi5sZW5ndGggPiAzMDAgJiYgZGVzY3JpcHRpb24ubGVuZ3RoIDwgMSkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnVGhlIGRlc2NyaXB0aW9uIG11c3QgYmUgbm8gbW9yZSB0aGFuIDMwMCBjaGFyYWN0ZXJzIGFuZCBub3QgbGVmdCBibGFuay4nO1xyXG4gICAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGV2ZW50LnRhcmdldCwgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgc2V0VmFsaWQoJ2Rlc2NyaXB0aW9uJywgZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJFcnJvck1lc3NhZ2UoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgc2V0VmFsaWQoJ2Rlc2NyaXB0aW9uJywgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHRhc2tGb3JtLmVsZW1lbnRzWydkdWVEYXRlJ10uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IGV2ZW50LnRhcmdldC52YWx1ZS50cmltKCk7XHJcbiAgICBjb25zdCBkYXRlUmVnZXggPSAvXlxcZHsyfVxcL1xcZHsyfVxcL1xcZHs0fSQvO1xyXG4gICAgaWYgKCFkYXRlUmVnZXgudGVzdChkdWVEYXRlKSkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIHRoZSBkdWUgZGF0ZSBpbiB0aGUgZm9ybWF0IEREL01NL1lZWVkuJztcclxuICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShldmVudC50YXJnZXQsIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgIHNldFZhbGlkKCdkYXRlJywgZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJFcnJvck1lc3NhZ2UoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgc2V0VmFsaWQoJ2RhdGUnLCB0cnVlKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8gRnVuY3Rpb24gdG8gZGlzcGxheSBhbiBlcnJvciBtZXNzYWdlIGZvciBhIGZvcm0gZmllbGRcclxuICBmdW5jdGlvbiBkaXNwbGF5RXJyb3JNZXNzYWdlKGZpZWxkLCBtZXNzYWdlKSB7XHJcbiAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBmaWVsZC5uZXh0RWxlbWVudFNpYmxpbmc7XHJcbiAgICBpZiAoZXJyb3JFbGVtZW50ICYmIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2stdmFsaWRhdGlvbi1lcnJvci1tZXNzYWdlJykpIHtcclxuICAgICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG5ld0Vycm9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgbmV3RXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gbWVzc2FnZTtcclxuICAgICAgbmV3RXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2stdmFsaWRhdGlvbi1lcnJvci1tZXNzYWdlJyk7XHJcbiAgICAgIGZpZWxkLmluc2VydEFkamFjZW50RWxlbWVudCgnYWZ0ZXJlbmQnLCBuZXdFcnJvckVsZW1lbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRnVuY3Rpb24gdG8gY2xlYXIgYW4gZXJyb3IgbWVzc2FnZSBmb3IgYSBmb3JtIGZpZWxkXHJcbiAgZnVuY3Rpb24gY2xlYXJFcnJvck1lc3NhZ2UoZmllbGQpIHtcclxuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IGZpZWxkLm5leHRFbGVtZW50U2libGluZztcclxuICAgIGlmIChlcnJvckVsZW1lbnQgJiYgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndGFzay12YWxpZGF0aW9uLWVycm9yLW1lc3NhZ2UnKSkge1xyXG4gICAgICBlcnJvckVsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vQ2xvc2UgdGFza3MgbW9kYWxcclxuY29uc3QgY2xvc2VUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLWJ1dHRvbicpO1xyXG5jbG9zZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoKSB7XHJcbiAgLy8gR2V0IHRoZSBwcm9qZWN0IHNlbGVjdCBlbGVtZW50XHJcbiAgY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XHJcblxyXG4gIC8vIExvb3AgdGhyb3VnaCB0aGUgcHJvamVjdHMgYXJyYXlcclxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgIC8vIENoZWNrIGlmIGFuIG9wdGlvbiB3aXRoIHRoZSBwcm9qZWN0IG5hbWUgYWxyZWFkeSBleGlzdHNcclxuICAgIGNvbnN0IGV4aXN0aW5nT3B0aW9uID0gcHJvamVjdFNlbGVjdC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke3Byb2plY3QubmFtZX1cIl1gKTtcclxuXHJcbiAgICAvLyBJZiBhbiBvcHRpb24gZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBhIG5ldyBvbmUgYW5kIGFkZCBpdCB0byB0aGUgcHJvamVjdCBzZWxlY3QgZWxlbWVudFxyXG4gICAgaWYgKCFleGlzdGluZ09wdGlvbikge1xyXG4gICAgICBjb25zdCBwcm9qZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgIHByb2plY3RPcHRpb24udmFsdWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgIHByb2plY3RPcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgIHByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQocHJvamVjdE9wdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbi8vIEdldCB0aGUgYWRkIHByb2plY3QgYnV0dG9uIGFuZCBwcm9qZWN0IG1vZGFsXHJcbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnV0dG9uJyk7XHJcbmNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LW1vZGFsJyk7XHJcblxyXG4vLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGFkZCBwcm9qZWN0IGJ1dHRvbiB0byBvcGVuIHRoZSBwcm9qZWN0IG1vZGFsXHJcbmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgcHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG59KTtcclxuXHJcblxyXG4vL0Nsb3NlIHByb2plY3Rtb2RhbFxyXG5mdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gIHByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59XHJcblxyXG5jb25zdCBjbG9zZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jbG9zZS1idXR0b24nKTtcclxuY2xvc2VQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNsb3NlTW9kYWwoKTtcclxufSk7XHJcblxyXG4vL0FkZCBwcm9qZWN0IHRvIHRoZSBwcm9qZWN0IGxpc3RcclxuZnVuY3Rpb24gYWRkUHJvamVjdFRvTGlzdChwcm9qZWN0KSB7XHJcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XHJcbiAgY29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gIHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaXRlbScpO1xyXG4gIHByb2plY3RJdGVtLmRhdGFzZXQucHJvamVjdCA9IHByb2plY3ROYW1lO1xyXG4gIHByb2plY3RJdGVtLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XHJcbiAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xyXG59XHJcblxyXG4vLyBBZGQgdGFzayB0byB0aGUgdGFzayBsaXN0XHJcbmZ1bmN0aW9uIGFkZFRhc2tUb0xpc3QodGFzaywgcHJvamVjdCkge1xyXG4gIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlbZGF0YS1wcm9qZWN0PVwiJHtwcm9qZWN0Lm5hbWV9XCJdYCk7XHJcbiAgY29uc3QgdGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2staXRlbScpO1xyXG4gIHRhc2tJdGVtLmRhdGFzZXQudGFzayA9IHRhc2sudGl0bGU7XHJcbiAgdGFza0l0ZW0udGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xyXG5cclxuICAvLyBDaGVjayBpZiB0aGUgcHJvamVjdCBpdGVtIGhhcyBhIHRhc2sgaXRlbSBjb250YWluZXJcclxuICBsZXQgdGFza0l0ZW1Db250YWluZXIgPSBwcm9qZWN0SXRlbS5xdWVyeVNlbGVjdG9yKCcudGFzay1pdGVtLWNvbnRhaW5lcicpO1xyXG4gIGlmICghdGFza0l0ZW1Db250YWluZXIpIHtcclxuICAgIC8vIENyZWF0ZSBhIG5ldyB0YXNrIGl0ZW0gY29udGFpbmVyIGlmIGl0IGRvZXMgbm90IGV4aXN0XHJcbiAgICB0YXNrSXRlbUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdGFza0l0ZW1Db250YWluZXIuY2xhc3NMaXN0LmFkZCgndGFzay1pdGVtLWNvbnRhaW5lcicpO1xyXG4gICAgcHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQodGFza0l0ZW1Db250YWluZXIpO1xyXG4gIH1cclxuXHJcbiAgLy8gQXBwZW5kIHRoZSB0YXNrIGl0ZW0gdG8gdGhlIHRhc2sgaXRlbSBjb250YWluZXJcclxuICB0YXNrSXRlbUNvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpemUgc2hvd0NvbXBsZXRlZCB2YXJpYWJsZSBmcm9tIGxvY2FsIHN0b3JhZ2Ugb3IgZGVmYXVsdCB0byBmYWxzZVxyXG5sZXQgc2hvd0NvbXBsZXRlZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nob3dDb21wbGV0ZWQnKSkgfHwgZmFsc2U7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgIGFkZFByb2plY3RUb0xpc3QocHJvamVjdCk7XHJcbiAgICBmb3IgKGNvbnN0IHRhc2sgb2YgcHJvamVjdC50YXNrcykge1xyXG4gICAgICBpZiAoc2hvd0NvbXBsZXRlZCkge1xyXG4gICAgICAgIGFkZFRhc2tUb0xpc3QodGFzaywgcHJvamVjdCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRhc2suY29tcGxldGVkICYmICFzaG93Q29tcGxldGVkKSB7XHJcbiAgICAgICAgYWRkVGFza1RvTGlzdCh0YXNrLCBwcm9qZWN0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG4vLyBEaXNwbGF5IHRhc2sgZGV0YWlsc1xyXG5jb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcclxucHJvamVjdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXNwbGF5VGFza0RldGFpbHMpO1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheVRhc2tEZXRhaWxzKGV2ZW50KSB7XHJcbiAgY29uc3QgY29tcGxldGVkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wbGV0ZS10YXNrLWJ1dHRvbicpO1xyXG4gIGNvbnN0IGRlbGV0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLXRhc2stYnV0dG9uJyk7XHJcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2staXRlbScpKSB7XHJcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBldmVudC50YXJnZXQuZGF0YXNldC50YXNrO1xyXG4gICAgY29uc3QgdGFza1Byb2plY3ROYW1lID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXByb2plY3RdJykuZGF0YXNldC5wcm9qZWN0O1xyXG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gdGFza1Byb2plY3ROYW1lKTtcclxuICAgIGNvbnN0IHRhc2sgPSBwcm9qZWN0LnRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2sudGl0bGUgPT09IHRhc2tUaXRsZSk7XHJcbiAgICBhY3RpdmVUYXNrID0gdGFzaztcclxuICAgIGNvbXBsZXRlZFRhc2tCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBkZWxldGVUYXNrQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgdXBkYXRlVGFza0RldGFpbHModGFzayk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUYXNrRGV0YWlscyh0YXNrKSB7XHJcbiAgY29uc3QgdGFza1Byb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1wcm9qZWN0Jyk7XHJcbiAgdGFza1Byb2plY3ROYW1lLnRleHRDb250ZW50ID0gdGFzay5wcm9qZWN0O1xyXG4gIGNvbnN0IHRhc2tUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLXRpdGxlJyk7XHJcbiAgdGFza1RpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1kZXNjcmlwdGlvbicpO1xyXG4gIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XHJcbiAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLWR1ZS1kYXRlJyk7XHJcbiAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XHJcbiAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1wcmlvcml0eScpO1xyXG4gIHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9IHRhc2sucHJpb3JpdHk7XHJcbn1cclxuXHJcbi8vQ29tcGxldGUgdGFza1xyXG5jb25zdCBjb21wbGV0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcGxldGUtdGFzay1idXR0b24nKTtcclxuY29tcGxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbXBsZXRlVGFzayhhY3RpdmVUYXNrKTtcclxuICB1cGRhdGVUYXNrRGV0YWlscyhhY3RpdmVUYXNrKTtcclxuICBsb2NhdGlvbi5yZWxvYWQoKTtcclxufSk7XHJcblxyXG4vL1Nob3cgY29tcGxldGVkIHRhc2tzXHJcbmNvbnN0IHNob3dDb21wbGV0ZWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hvdy1jb21wbGV0ZWQtYnV0dG9uJyk7XHJcbnNob3dDb21wbGV0ZWRCdXR0b24udGV4dENvbnRlbnQgPSBzaG93Q29tcGxldGVkID8gJ0hpZGUgY29tcGxldGVkJyA6ICdTaG93IGNvbXBsZXRlZCc7XHJcbnNob3dDb21wbGV0ZWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgc2hvd0NvbXBsZXRlZCA9ICFzaG93Q29tcGxldGVkO1xyXG4gIHNob3dDb21wbGV0ZWRCdXR0b24udGV4dENvbnRlbnQgPSBzaG93Q29tcGxldGVkID8gJ0hpZGUgY29tcGxldGVkJyA6ICdTaG93IGNvbXBsZXRlZCc7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nob3dDb21wbGV0ZWQnLCBKU09OLnN0cmluZ2lmeShzaG93Q29tcGxldGVkKSk7XHJcbiAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbn0pO1xyXG5cclxuLy9EZWxldGUgdGFza1xyXG5jb25zdCBkZWxldGVUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZS10YXNrLWJ1dHRvbicpO1xyXG5kZWxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGRlbGV0ZVRhc2soYWN0aXZlVGFzayk7XHJcbiAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIGFkZFRhc2tUb0xpc3QsIGNsb3NlTW9kYWwgfTtcclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgY2xvc2VNb2RhbCB9IGZyb20gJy4vZG9tLmpzJztcclxuXHJcbi8vIERlZmluZSB0aGUgUHJvamVjdCBvYmplY3QgZmFjdG9yeVxyXG5mdW5jdGlvbiBQcm9qZWN0KG5hbWUsIHRhc2tzKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICB0YXNrczogdGFza3NcclxuICAgIH07XHJcbn1cclxuXHJcbi8vIExvYWQgcHJvamVjdHMgZnJvbSB3ZWIgc3RvcmFnZVxyXG5sZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKSB8fCBbXTtcclxuXHJcbmZ1bmN0aW9uIGluaXRQcm9qZWN0cygpIHtcclxuICAvLyBDaGVjayBpZiB0aGUgXCJEZWZhdWx0XCIgcHJvamVjdCBhbHJlYWR5IGV4aXN0c1xyXG4gIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSAnRGVmYXVsdCcpO1xyXG5cclxuICAvLyBJZiB0aGUgXCJEZWZhdWx0XCIgcHJvamVjdCBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGl0XHJcbiAgaWYgKCFkZWZhdWx0UHJvamVjdCkge1xyXG4gICAgY29uc3QgbmV3RGVmYXVsdFByb2plY3QgPSBQcm9qZWN0KCdEZWZhdWx0JywgW10pO1xyXG4gICAgcHJvamVjdHMucHVzaChuZXdEZWZhdWx0UHJvamVjdCk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gIH1cclxufVxyXG5cclxuLy9HZXQgdGhlIHByb2plY3QgZm9ybVxyXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0nKTtcclxuXHJcbi8vQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBwcm9qZWN0IGZvcm0gdG8gaGFuZGxlIGZvcm0gc3VibWlzc2lvbnNcclxucHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAvL1ByZXZlbnQgdGhlIGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uIGJlaGF2aW9yXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgIC8vR2V0IHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gZmllbGRzXHJcbiAgICBjb25zdCBuYW1lID0gcHJvamVjdEZvcm0uZWxlbWVudHNbJ3Byb2plY3ROYW1lJ10udmFsdWU7XHJcbiAgICAvLyBDaGVjayBpZiBhIHByb2plY3Qgd2l0aCB0aGUgc2FtZSBuYW1lIGFscmVhZHkgZXhpc3RzXHJcbiAgICBjb25zdCBleGlzdGluZ1Byb2plY3QgPSBwcm9qZWN0cy5maW5kKChwKSA9PiBwLm5hbWUgPT09IG5hbWUpO1xyXG4gICAgaWYgKGV4aXN0aW5nUHJvamVjdCkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgQSBwcm9qZWN0IHdpdGggdGhlIG5hbWUgXCIke25hbWV9XCIgYWxyZWFkeSBleGlzdHMuYDtcclxuICAgICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XHJcbiAgICAgIGVycm9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LW5hbWUtZXJyb3ItbWVzc2FnZScpO1xyXG4gICAgICBwcm9qZWN0Rm9ybS5hcHBlbmRDaGlsZChlcnJvckVsZW1lbnQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy9DcmVhdGUgYSBuZXcgcHJvamVjdCBvYmplY3QgdXNpbmcgdGhlIFByb2plY3Qgb2JqZWN0IGZhY3RvcnlcclxuICAgICAgY29uc3QgcHJvamVjdCA9IFByb2plY3QobmFtZSwgW10pO1xyXG5cclxuICAgICAgLy9TdG9yZSB0aGUgcHJvamVjdCBpbiB3ZWIgc3RvcmFnZVxyXG4gICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG5cclxuICAgICAgLy9BZGQgdGhlIHByb2plY3QgdG8gdGhlIHByb2plY3QgbGlzdFxyXG4gICAgICBhZGRQcm9qZWN0VG9MaXN0KHByb2plY3QpO1xyXG5cclxuICAgICAgLy9DbGVhciB0aGUgZm9ybSBmaWVsZHNcclxuICAgICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcclxuXHJcbiAgICAgIC8vQ2xvc2UgdGhlIGZvcm1cclxuICAgICAgY2xvc2VNb2RhbCgpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8vIEV4cG9ydCB0aGUgcHJvamVjdHMgYXJyYXkgYW5kIHRoZSBjcmVhdGVQcm9qZWN0IGZ1bmN0aW9uXHJcbmV4cG9ydCB7IGluaXRQcm9qZWN0cywgcHJvamVjdHMgfTsiLCJpbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gXCIuL3Byb2plY3RzLmpzXCI7XHJcbmltcG9ydCB7IGFkZFRhc2tUb0xpc3QsIGNsb3NlTW9kYWwgfSBmcm9tIFwiLi9kb20uanNcIjtcclxuaW1wb3J0IHsgZ2V0VmFsaWQgfSBmcm9tIFwiLi92YWxpZGF0aW9ucy5qc1wiO1xyXG5cclxuLy8gRGVmaW5lIHRoZSBUYXNrIG9iamVjdCBmYWN0b3J5XHJcbmZ1bmN0aW9uIFRhc2sodGl0bGUsIHByb2plY3QsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICBwcm9qZWN0OiBwcm9qZWN0LFxyXG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXHJcbiAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgICAgY29tcGxldGVkOiBmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIEdldCB0aGUgdGFzayBmb3JtXHJcbiAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtJyk7XHJcblxyXG4gIC8vIExvYWQgdGFza3MgZnJvbSB3ZWIgc3RvcmFnZVxyXG4gIGxldCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpIHx8IFtdO1xyXG5cclxuICAvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHRhc2sgZm9ybSB0byBoYW5kbGUgZm9ybSBzdWJtaXNzaW9uc1xyXG4gIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xyXG4gICAgaWYgKCFnZXRWYWxpZCgpKSB7XHJcbiAgICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uIGJlaGF2aW9yXHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIC8vIFNob3cgbW9kYWwgd2luZG93IHdpdGggZXJyb3IgbWVzc2FnZVxyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXJyb3ItbWVzc2FnZScpO1xyXG4gICAgICBlcnJvck1lc3NhZ2Uuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgIC8vIEhpZGUgbW9kYWwgd2luZG93IHdpdGggZXJyb3IgbWVzc2FnZSBhZnRlciAzIHNlY29uZHNcclxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgZXJyb3JNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgIH0sIDMwMDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gR2V0IHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gZmllbGRzXHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tOYW1lJ10udmFsdWU7XHJcbiAgICAgIGNvbnN0IHByb2plY3ROYW1lID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Byb2plY3QnXS52YWx1ZTtcclxuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSB0YXNrRm9ybS5lbGVtZW50c1sndGFza0Rlc2NyaXB0aW9uJ10udmFsdWU7XHJcbiAgICAgIGNvbnN0IGR1ZURhdGUgPSB0YXNrRm9ybS5lbGVtZW50c1snZHVlRGF0ZSddLnZhbHVlO1xyXG4gICAgICBjb25zdCBwcmlvcml0eSA9IHRhc2tGb3JtLmVsZW1lbnRzWydwcmlvcml0eSddLnZhbHVlO1xyXG4gICAgICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgIC8vIEZpbmQgdGhlIHByb2plY3Qgb2JqZWN0IHdpdGggdGhlIG1hdGNoaW5nIG5hbWVcclxuICAgICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gcHJvamVjdE5hbWUpO1xyXG4gICAgICBjb25zdCBleGlzdGluZ1Rhc2sgPSBwcm9qZWN0LnRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2sudGl0bGUgPT09IHRpdGxlKTtcclxuICAgICAgaWYgKGV4aXN0aW5nVGFzayAmJiBleGlzdGluZ1Rhc2suY29tcGxldGVkID09PSBmYWxzZSkge1xyXG4gICAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBBIHRhc2sgd2l0aCB0aGUgbmFtZSBcIiR7dGl0bGV9XCIgYWxyZWFkeSBleGlzdHMgaW4gdGhlIFwiJHtwcm9qZWN0TmFtZX1cIiBwcm9qZWN0LmA7XHJcbiAgICAgICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcclxuICAgICAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndGFzay1uYW1lLWVycm9yLW1lc3NhZ2UnKTtcclxuICAgICAgICB0YXNrRm9ybS5hcHBlbmRDaGlsZChlcnJvckVsZW1lbnQpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBDcmVhdGUgYSBuZXcgdGFzayBvYmplY3QgdXNpbmcgdGhlIFRhc2sgb2JqZWN0IGZhY3RvcnlcclxuICAgICAgICBjb25zdCB0YXNrID0gVGFzayh0aXRsZSwgcHJvamVjdE5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGVkKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIHRoZSB0YXNrIHRvIHRoZSBwcm9qZWN0IGFuZCBzdG9yZSBpdCBpbiB3ZWIgc3RvcmFnZVxyXG4gICAgICAgIGlmIChwcm9qZWN0KSB7XHJcbiAgICAgICAgICBwcm9qZWN0LnRhc2tzLnB1c2godGFzayk7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWRkIHRoZSB0YXNrIHRvIHRoZSB0YXNrIGxpc3RcclxuICAgICAgICBhZGRUYXNrVG9MaXN0KHRhc2ssIHByb2plY3QpO1xyXG4gICAgICBcclxuICAgICAgICAvLyBDbGVhciB0aGUgZm9ybSBmaWVsZHNcclxuICAgICAgICB0YXNrRm9ybS5yZXNldCgpO1xyXG5cclxuICAgICAgICAvLyBDbG9zZSB0aGUgZm9ybVxyXG4gICAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvL0NvbXBsZXRlIHRhc2tcclxuICBmdW5jdGlvbiBjb21wbGV0ZVRhc2sodGFzaykge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcclxuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgICBjb25zdCB0YXNrcyA9IHByb2plY3QudGFza3M7XHJcbiAgICAgIGZvciAoY29uc3QgdCBvZiB0YXNrcykge1xyXG4gICAgICAgIGlmICh0LnRpdGxlID09PSB0YXNrLnRpdGxlICYmIHQucHJvamVjdE5hbWUgPT09IHRhc2sucHJvamVjdE5hbWUpIHtcclxuICAgICAgICAgIHQuY29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL0RlbGV0ZSB0YXNrXHJcbiAgZnVuY3Rpb24gZGVsZXRlVGFzayh0YXNrKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xyXG4gICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XHJcbiAgICAgIGNvbnN0IHRhc2tzID0gcHJvamVjdC50YXNrcztcclxuICAgICAgZm9yIChjb25zdCB0IG9mIHRhc2tzKSB7XHJcbiAgICAgICAgaWYgKHQudGl0bGUgPT09IHRhc2sudGl0bGUgJiYgdC5wcm9qZWN0TmFtZSA9PT0gdGFzay5wcm9qZWN0TmFtZSkge1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrcy5pbmRleE9mKHQpO1xyXG4gICAgICAgICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBFeHBvcnQgdGhlIHRhc2tzIGFycmF5XHJcbiAgZXhwb3J0IHsgY29tcGxldGVUYXNrLCBkZWxldGVUYXNrIH07XHJcblxyXG4iLCJsZXQgZGF0ZUlzVmFsaWQgPSBmYWxzZTtcclxubGV0IG5hbWVJc1ZhbGlkID0gZmFsc2U7XHJcbmxldCBkZXNjcmlwdGlvbklzVmFsaWQgPSBmYWxzZTtcclxuXHJcbmZ1bmN0aW9uIHNldFZhbGlkKHR5cGUsIHZhbHVlKSB7XHJcbiAgaWYgKHR5cGUgPT09ICdkYXRlJykge1xyXG4gICAgZGF0ZUlzVmFsaWQgPSB2YWx1ZTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICduYW1lJykge1xyXG4gICAgbmFtZUlzVmFsaWQgPSB2YWx1ZTtcclxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkZXNjcmlwdGlvbicpIHtcclxuICAgIGRlc2NyaXB0aW9uSXNWYWxpZCA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0VmFsaWQoKSB7XHJcbiAgcmV0dXJuIGRhdGVJc1ZhbGlkICYmIG5hbWVJc1ZhbGlkICYmIGRlc2NyaXB0aW9uSXNWYWxpZDtcclxufVxyXG5cclxuZXhwb3J0IHsgc2V0VmFsaWQsIGdldFZhbGlkLCBkYXRlSXNWYWxpZCwgbmFtZUlzVmFsaWQsIGRlc2NyaXB0aW9uSXNWYWxpZCB9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
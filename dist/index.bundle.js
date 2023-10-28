"use strict";
(self["webpackChunkto_do_app"] = self["webpackChunkto_do_app"] || []).push([["index"],{

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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");


(0,_projects_js__WEBPACK_IMPORTED_MODULE_0__.initProjects)();


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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL3ZhbGlkYXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNvbXBsZXRlVGFzaywgZGVsZXRlVGFzayB9IGZyb20gJy4vdGFza3MuanMnO1xyXG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xyXG5pbXBvcnQgeyBzZXRWYWxpZCwgbmFtZUlzVmFsaWQsIGRlc2NyaXB0aW9uSXNWYWxpZCwgZGF0ZUlzVmFsaWQgfSBmcm9tICcuL3ZhbGlkYXRpb25zLmpzJztcclxuXHJcbmxldCBhY3RpdmVUYXNrID0gbnVsbDtcclxuXHJcblxyXG4vL09wZW4gdGFza3MgbW9kYWxcclxuY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1idXR0b24nKTtcclxuY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbW9kYWwnKTtcclxuXHJcbmFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIHVwZGF0ZVByb2plY3RMaXN0KCk7XHJcbiAgLy8gQWRkIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgdGFzayBmb3JtIGZpZWxkcyB0byB2YWxpZGF0ZSBpbnB1dCBvbiBibHVyXHJcbiAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtJyk7XHJcbiAgdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tOYW1lJ10uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgdGl0bGUgPSBldmVudC50YXJnZXQudmFsdWUudHJpbSgpO1xyXG4gICAgaWYgKHRpdGxlLmxlbmd0aCA+IDIwKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdUaGUgdGl0bGUgbXVzdCBiZSBubyBtb3JlIHRoYW4gMjAgY2hhcmFjdGVycy4nO1xyXG4gICAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGV2ZW50LnRhcmdldCwgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgc2V0VmFsaWQoJ25hbWUnLCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhckVycm9yTWVzc2FnZShldmVudC50YXJnZXQpO1xyXG4gICAgICBzZXRWYWxpZCgnbmFtZScsIHRydWUpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICB0YXNrRm9ybS5lbGVtZW50c1sndGFza0Rlc2NyaXB0aW9uJ10uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBldmVudC50YXJnZXQudmFsdWUudHJpbSgpO1xyXG4gICAgaWYgKGRlc2NyaXB0aW9uLmxlbmd0aCA+IDMwMCAmJiBkZXNjcmlwdGlvbi5sZW5ndGggPCAxKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdUaGUgZGVzY3JpcHRpb24gbXVzdCBiZSBubyBtb3JlIHRoYW4gMzAwIGNoYXJhY3RlcnMgYW5kIG5vdCBsZWZ0IGJsYW5rLic7XHJcbiAgICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZXZlbnQudGFyZ2V0LCBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICBzZXRWYWxpZCgnZGVzY3JpcHRpb24nLCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhckVycm9yTWVzc2FnZShldmVudC50YXJnZXQpO1xyXG4gICAgICBzZXRWYWxpZCgnZGVzY3JpcHRpb24nLCB0cnVlKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdGFza0Zvcm0uZWxlbWVudHNbJ2R1ZURhdGUnXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKTtcclxuICAgIGNvbnN0IGRhdGVSZWdleCA9IC9eXFxkezJ9XFwvXFxkezJ9XFwvXFxkezR9JC87XHJcbiAgICBpZiAoIWRhdGVSZWdleC50ZXN0KGR1ZURhdGUpKSB7XHJcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9ICdQbGVhc2UgZW50ZXIgdGhlIGR1ZSBkYXRlIGluIHRoZSBmb3JtYXQgREQvTU0vWVlZWS4nO1xyXG4gICAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGV2ZW50LnRhcmdldCwgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgc2V0VmFsaWQoJ2RhdGUnLCBmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhckVycm9yTWVzc2FnZShldmVudC50YXJnZXQpO1xyXG4gICAgICBzZXRWYWxpZCgnZGF0ZScsIHRydWUpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBGdW5jdGlvbiB0byBkaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgZm9yIGEgZm9ybSBmaWVsZFxyXG4gIGZ1bmN0aW9uIGRpc3BsYXlFcnJvck1lc3NhZ2UoZmllbGQsIG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IGZpZWxkLm5leHRFbGVtZW50U2libGluZztcclxuICAgIGlmIChlcnJvckVsZW1lbnQgJiYgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndGFzay12YWxpZGF0aW9uLWVycm9yLW1lc3NhZ2UnKSkge1xyXG4gICAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbmV3RXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICBuZXdFcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgICBuZXdFcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndGFzay12YWxpZGF0aW9uLWVycm9yLW1lc3NhZ2UnKTtcclxuICAgICAgZmllbGQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIG5ld0Vycm9yRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBGdW5jdGlvbiB0byBjbGVhciBhbiBlcnJvciBtZXNzYWdlIGZvciBhIGZvcm0gZmllbGRcclxuICBmdW5jdGlvbiBjbGVhckVycm9yTWVzc2FnZShmaWVsZCkge1xyXG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZmllbGQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgaWYgKGVycm9yRWxlbWVudCAmJiBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLXZhbGlkYXRpb24tZXJyb3ItbWVzc2FnZScpKSB7XHJcbiAgICAgIGVycm9yRWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuLy9DbG9zZSB0YXNrcyBtb2RhbFxyXG5jb25zdCBjbG9zZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYnV0dG9uJyk7XHJcbmNsb3NlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufSk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0TGlzdCgpIHtcclxuICAvLyBHZXQgdGhlIHByb2plY3Qgc2VsZWN0IGVsZW1lbnRcclxuICBjb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcclxuXHJcbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSBwcm9qZWN0cyBhcnJheVxyXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgLy8gQ2hlY2sgaWYgYW4gb3B0aW9uIHdpdGggdGhlIHByb2plY3QgbmFtZSBhbHJlYWR5IGV4aXN0c1xyXG4gICAgY29uc3QgZXhpc3RpbmdPcHRpb24gPSBwcm9qZWN0U2VsZWN0LnF1ZXJ5U2VsZWN0b3IoYG9wdGlvblt2YWx1ZT1cIiR7cHJvamVjdC5uYW1lfVwiXWApO1xyXG5cclxuICAgIC8vIElmIGFuIG9wdGlvbiBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBwcm9qZWN0IHNlbGVjdCBlbGVtZW50XHJcbiAgICBpZiAoIWV4aXN0aW5nT3B0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgcHJvamVjdE9wdGlvbi52YWx1ZSA9IHByb2plY3QubmFtZTtcclxuICAgICAgcHJvamVjdE9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChwcm9qZWN0T3B0aW9uKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuLy8gR2V0IHRoZSBhZGQgcHJvamVjdCBidXR0b24gYW5kIHByb2plY3QgbW9kYWxcclxuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1idXR0b24nKTtcclxuY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbW9kYWwnKTtcclxuXHJcbi8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgYWRkIHByb2plY3QgYnV0dG9uIHRvIG9wZW4gdGhlIHByb2plY3QgbW9kYWxcclxuYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBwcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbn0pO1xyXG5cclxuXHJcbi8vQ2xvc2UgcHJvamVjdG1vZGFsXHJcbmZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XHJcbiAgcHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn1cclxuXHJcbmNvbnN0IGNsb3NlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNsb3NlLWJ1dHRvbicpO1xyXG5jbG9zZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY2xvc2VNb2RhbCgpO1xyXG59KTtcclxuXHJcbi8vQWRkIHByb2plY3QgdG8gdGhlIHByb2plY3QgbGlzdFxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0VG9MaXN0KHByb2plY3QpIHtcclxuICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3QubmFtZTtcclxuICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcclxuICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgcHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1pdGVtJyk7XHJcbiAgcHJvamVjdEl0ZW0uZGF0YXNldC5wcm9qZWN0ID0gcHJvamVjdE5hbWU7XHJcbiAgcHJvamVjdEl0ZW0udGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcclxuICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XHJcbn1cclxuXHJcbi8vIEFkZCB0YXNrIHRvIHRoZSB0YXNrIGxpc3RcclxuZnVuY3Rpb24gYWRkVGFza1RvTGlzdCh0YXNrLCBwcm9qZWN0KSB7XHJcbiAgY29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaVtkYXRhLXByb2plY3Q9XCIke3Byb2plY3QubmFtZX1cIl1gKTtcclxuICBjb25zdCB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1pdGVtJyk7XHJcbiAgdGFza0l0ZW0uZGF0YXNldC50YXNrID0gdGFzay50aXRsZTtcclxuICB0YXNrSXRlbS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcblxyXG4gIC8vIENoZWNrIGlmIHRoZSBwcm9qZWN0IGl0ZW0gaGFzIGEgdGFzayBpdGVtIGNvbnRhaW5lclxyXG4gIGxldCB0YXNrSXRlbUNvbnRhaW5lciA9IHByb2plY3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWl0ZW0tY29udGFpbmVyJyk7XHJcbiAgaWYgKCF0YXNrSXRlbUNvbnRhaW5lcikge1xyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHRhc2sgaXRlbSBjb250YWluZXIgaWYgaXQgZG9lcyBub3QgZXhpc3RcclxuICAgIHRhc2tJdGVtQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB0YXNrSXRlbUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWl0ZW0tY29udGFpbmVyJyk7XHJcbiAgICBwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZCh0YXNrSXRlbUNvbnRhaW5lcik7XHJcbiAgfVxyXG5cclxuICAvLyBBcHBlbmQgdGhlIHRhc2sgaXRlbSB0byB0aGUgdGFzayBpdGVtIGNvbnRhaW5lclxyXG4gIHRhc2tJdGVtQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tJdGVtKTtcclxufVxyXG5cclxuLy8gSW5pdGlhbGl6ZSBzaG93Q29tcGxldGVkIHZhcmlhYmxlIGZyb20gbG9jYWwgc3RvcmFnZSBvciBkZWZhdWx0IHRvIGZhbHNlXHJcbmxldCBzaG93Q29tcGxldGVkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2hvd0NvbXBsZXRlZCcpKSB8fCBmYWxzZTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgYWRkUHJvamVjdFRvTGlzdChwcm9qZWN0KTtcclxuICAgIGZvciAoY29uc3QgdGFzayBvZiBwcm9qZWN0LnRhc2tzKSB7XHJcbiAgICAgIGlmIChzaG93Q29tcGxldGVkKSB7XHJcbiAgICAgICAgYWRkVGFza1RvTGlzdCh0YXNrLCBwcm9qZWN0KTtcclxuICAgICAgfSBlbHNlIGlmICghdGFzay5jb21wbGV0ZWQgJiYgIXNob3dDb21wbGV0ZWQpIHtcclxuICAgICAgICBhZGRUYXNrVG9MaXN0KHRhc2ssIHByb2plY3QpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIERpc3BsYXkgdGFzayBkZXRhaWxzXHJcbmNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGlzdCcpO1xyXG5wcm9qZWN0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXlUYXNrRGV0YWlscyk7XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VGFza0RldGFpbHMoZXZlbnQpIHtcclxuICBjb25zdCBjb21wbGV0ZWRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXBsZXRlLXRhc2stYnV0dG9uJyk7XHJcbiAgY29uc3QgZGVsZXRlVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtdGFzay1idXR0b24nKTtcclxuICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFzay1pdGVtJykpIHtcclxuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnRhc2s7XHJcbiAgICBjb25zdCB0YXNrUHJvamVjdE5hbWUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcHJvamVjdF0nKS5kYXRhc2V0LnByb2plY3Q7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSB0YXNrUHJvamVjdE5hbWUpO1xyXG4gICAgY29uc3QgdGFzayA9IHByb2plY3QudGFza3MuZmluZCgodGFzaykgPT4gdGFzay50aXRsZSA9PT0gdGFza1RpdGxlKTtcclxuICAgIGFjdGl2ZVRhc2sgPSB0YXNrO1xyXG4gICAgY29tcGxldGVkVGFza0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIGRlbGV0ZVRhc2tCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB1cGRhdGVUYXNrRGV0YWlscyh0YXNrKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVRhc2tEZXRhaWxzKHRhc2spIHtcclxuICBjb25zdCB0YXNrUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLXByb2plY3QnKTtcclxuICB0YXNrUHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSB0YXNrLnByb2plY3Q7XHJcbiAgY29uc3QgdGFza1RpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtdGl0bGUnKTtcclxuICB0YXNrVGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLWRlc2NyaXB0aW9uJyk7XHJcbiAgdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdGFzay5kZXNjcmlwdGlvbjtcclxuICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtZHVlLWRhdGUnKTtcclxuICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcclxuICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLXByaW9yaXR5Jyk7XHJcbiAgdGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gdGFzay5wcmlvcml0eTtcclxufVxyXG5cclxuLy9Db21wbGV0ZSB0YXNrXHJcbmNvbnN0IGNvbXBsZXRlVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wbGV0ZS10YXNrLWJ1dHRvbicpO1xyXG5jb21wbGV0ZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29tcGxldGVUYXNrKGFjdGl2ZVRhc2spO1xyXG4gIHVwZGF0ZVRhc2tEZXRhaWxzKGFjdGl2ZVRhc2spO1xyXG4gIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG59KTtcclxuXHJcbi8vU2hvdyBjb21wbGV0ZWQgdGFza3NcclxuY29uc3Qgc2hvd0NvbXBsZXRlZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG93LWNvbXBsZXRlZC1idXR0b24nKTtcclxuc2hvd0NvbXBsZXRlZEJ1dHRvbi50ZXh0Q29udGVudCA9IHNob3dDb21wbGV0ZWQgPyAnSGlkZSBjb21wbGV0ZWQnIDogJ1Nob3cgY29tcGxldGVkJztcclxuc2hvd0NvbXBsZXRlZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBzaG93Q29tcGxldGVkID0gIXNob3dDb21wbGV0ZWQ7XHJcbiAgc2hvd0NvbXBsZXRlZEJ1dHRvbi50ZXh0Q29udGVudCA9IHNob3dDb21wbGV0ZWQgPyAnSGlkZSBjb21wbGV0ZWQnIDogJ1Nob3cgY29tcGxldGVkJztcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2hvd0NvbXBsZXRlZCcsIEpTT04uc3RyaW5naWZ5KHNob3dDb21wbGV0ZWQpKTtcclxuICBsb2NhdGlvbi5yZWxvYWQoKTtcclxufSk7XHJcblxyXG4vL0RlbGV0ZSB0YXNrXHJcbmNvbnN0IGRlbGV0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLXRhc2stYnV0dG9uJyk7XHJcbmRlbGV0ZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgZGVsZXRlVGFzayhhY3RpdmVUYXNrKTtcclxuICBsb2NhdGlvbi5yZWxvYWQoKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgYWRkVGFza1RvTGlzdCwgY2xvc2VNb2RhbCB9O1xyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBpbml0UHJvamVjdHMgfSBmcm9tIFwiLi9wcm9qZWN0cy5qc1wiO1xyXG5cclxuaW5pdFByb2plY3RzKCk7XHJcbiIsImltcG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIGNsb3NlTW9kYWwgfSBmcm9tICcuL2RvbS5qcyc7XHJcblxyXG4vLyBEZWZpbmUgdGhlIFByb2plY3Qgb2JqZWN0IGZhY3RvcnlcclxuZnVuY3Rpb24gUHJvamVjdChuYW1lLCB0YXNrcykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgdGFza3M6IHRhc2tzXHJcbiAgICB9O1xyXG59XHJcblxyXG4vLyBMb2FkIHByb2plY3RzIGZyb20gd2ViIHN0b3JhZ2VcclxubGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgfHwgW107XHJcblxyXG5mdW5jdGlvbiBpbml0UHJvamVjdHMoKSB7XHJcbiAgLy8gQ2hlY2sgaWYgdGhlIFwiRGVmYXVsdFwiIHByb2plY3QgYWxyZWFkeSBleGlzdHNcclxuICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gJ0RlZmF1bHQnKTtcclxuXHJcbiAgLy8gSWYgdGhlIFwiRGVmYXVsdFwiIHByb2plY3QgZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBpdFxyXG4gIGlmICghZGVmYXVsdFByb2plY3QpIHtcclxuICAgIGNvbnN0IG5ld0RlZmF1bHRQcm9qZWN0ID0gUHJvamVjdCgnRGVmYXVsdCcsIFtdKTtcclxuICAgIHByb2plY3RzLnB1c2gobmV3RGVmYXVsdFByb2plY3QpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICB9XHJcbn1cclxuXHJcbi8vR2V0IHRoZSBwcm9qZWN0IGZvcm1cclxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XHJcblxyXG4vL0FkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgcHJvamVjdCBmb3JtIHRvIGhhbmRsZSBmb3JtIHN1Ym1pc3Npb25zXHJcbnByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xyXG4gICAgLy9QcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvL0dldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgY29uc3QgbmFtZSA9IHByb2plY3RGb3JtLmVsZW1lbnRzWydwcm9qZWN0TmFtZSddLnZhbHVlO1xyXG4gICAgLy8gQ2hlY2sgaWYgYSBwcm9qZWN0IHdpdGggdGhlIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0c1xyXG4gICAgY29uc3QgZXhpc3RpbmdQcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocCkgPT4gcC5uYW1lID09PSBuYW1lKTtcclxuICAgIGlmIChleGlzdGluZ1Byb2plY3QpIHtcclxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYEEgcHJvamVjdCB3aXRoIHRoZSBuYW1lIFwiJHtuYW1lfVwiIGFscmVhZHkgZXhpc3RzLmA7XHJcbiAgICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1uYW1lLWVycm9yLW1lc3NhZ2UnKTtcclxuICAgICAgcHJvamVjdEZvcm0uYXBwZW5kQ2hpbGQoZXJyb3JFbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vQ3JlYXRlIGEgbmV3IHByb2plY3Qgb2JqZWN0IHVzaW5nIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XHJcbiAgICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0KG5hbWUsIFtdKTtcclxuXHJcbiAgICAgIC8vU3RvcmUgdGhlIHByb2plY3QgaW4gd2ViIHN0b3JhZ2VcclxuICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuXHJcbiAgICAgIC8vQWRkIHRoZSBwcm9qZWN0IHRvIHRoZSBwcm9qZWN0IGxpc3RcclxuICAgICAgYWRkUHJvamVjdFRvTGlzdChwcm9qZWN0KTtcclxuXHJcbiAgICAgIC8vQ2xlYXIgdGhlIGZvcm0gZmllbGRzXHJcbiAgICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XHJcblxyXG4gICAgICAvL0Nsb3NlIHRoZSBmb3JtXHJcbiAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBFeHBvcnQgdGhlIHByb2plY3RzIGFycmF5IGFuZCB0aGUgY3JlYXRlUHJvamVjdCBmdW5jdGlvblxyXG5leHBvcnQgeyBpbml0UHJvamVjdHMsIHByb2plY3RzIH07IiwiaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tIFwiLi9wcm9qZWN0cy5qc1wiO1xyXG5pbXBvcnQgeyBhZGRUYXNrVG9MaXN0LCBjbG9zZU1vZGFsIH0gZnJvbSBcIi4vZG9tLmpzXCI7XHJcbmltcG9ydCB7IGdldFZhbGlkIH0gZnJvbSBcIi4vdmFsaWRhdGlvbnMuanNcIjtcclxuXHJcbi8vIERlZmluZSB0aGUgVGFzayBvYmplY3QgZmFjdG9yeVxyXG5mdW5jdGlvbiBUYXNrKHRpdGxlLCBwcm9qZWN0LCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgcHJvamVjdDogcHJvamVjdCxcclxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICBkdWVEYXRlOiBkdWVEYXRlLFxyXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXHJcbiAgICAgIGNvbXBsZXRlZDogZmFsc2VcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgdGhlIHRhc2sgZm9ybVxyXG4gIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybScpO1xyXG5cclxuICAvLyBMb2FkIHRhc2tzIGZyb20gd2ViIHN0b3JhZ2VcclxuICBsZXQgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKSB8fCBbXTtcclxuXHJcbiAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSB0YXNrIGZvcm0gdG8gaGFuZGxlIGZvcm0gc3VibWlzc2lvbnNcclxuICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICAgIGlmICghZ2V0VmFsaWQoKSkge1xyXG4gICAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAvLyBTaG93IG1vZGFsIHdpbmRvdyB3aXRoIGVycm9yIG1lc3NhZ2VcclxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVycm9yLW1lc3NhZ2UnKTtcclxuICAgICAgZXJyb3JNZXNzYWdlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAvLyBIaWRlIG1vZGFsIHdpbmRvdyB3aXRoIGVycm9yIG1lc3NhZ2UgYWZ0ZXIgMyBzZWNvbmRzXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGVycm9yTWVzc2FnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICB9LCAzMDAwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIEdldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRhc2tGb3JtLmVsZW1lbnRzWyd0YXNrTmFtZSddLnZhbHVlO1xyXG4gICAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRhc2tGb3JtLmVsZW1lbnRzWydwcm9qZWN0J10udmFsdWU7XHJcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tEZXNjcmlwdGlvbiddLnZhbHVlO1xyXG4gICAgICBjb25zdCBkdWVEYXRlID0gdGFza0Zvcm0uZWxlbWVudHNbJ2R1ZURhdGUnXS52YWx1ZTtcclxuICAgICAgY29uc3QgcHJpb3JpdHkgPSB0YXNrRm9ybS5lbGVtZW50c1sncHJpb3JpdHknXS52YWx1ZTtcclxuICAgICAgY29uc3QgY29tcGxldGVkID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBGaW5kIHRoZSBwcm9qZWN0IG9iamVjdCB3aXRoIHRoZSBtYXRjaGluZyBuYW1lXHJcbiAgICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09IHByb2plY3ROYW1lKTtcclxuICAgICAgY29uc3QgZXhpc3RpbmdUYXNrID0gcHJvamVjdC50YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLnRpdGxlID09PSB0aXRsZSk7XHJcbiAgICAgIGlmIChleGlzdGluZ1Rhc2sgJiYgZXhpc3RpbmdUYXNrLmNvbXBsZXRlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgQSB0YXNrIHdpdGggdGhlIG5hbWUgXCIke3RpdGxlfVwiIGFscmVhZHkgZXhpc3RzIGluIHRoZSBcIiR7cHJvamVjdE5hbWV9XCIgcHJvamVjdC5gO1xyXG4gICAgICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBlcnJvck1lc3NhZ2U7XHJcbiAgICAgICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2stbmFtZS1lcnJvci1tZXNzYWdlJyk7XHJcbiAgICAgICAgdGFza0Zvcm0uYXBwZW5kQ2hpbGQoZXJyb3JFbGVtZW50KTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHRhc2sgb2JqZWN0IHVzaW5nIHRoZSBUYXNrIG9iamVjdCBmYWN0b3J5XHJcbiAgICAgICAgY29uc3QgdGFzayA9IFRhc2sodGl0bGUsIHByb2plY3ROYW1lLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNvbXBsZXRlZCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCB0aGUgdGFzayB0byB0aGUgcHJvamVjdCBhbmQgc3RvcmUgaXQgaW4gd2ViIHN0b3JhZ2VcclxuICAgICAgICBpZiAocHJvamVjdCkge1xyXG4gICAgICAgICAgcHJvamVjdC50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFkZCB0aGUgdGFzayB0byB0aGUgdGFzayBsaXN0XHJcbiAgICAgICAgYWRkVGFza1RvTGlzdCh0YXNrLCBwcm9qZWN0KTtcclxuICAgICAgXHJcbiAgICAgICAgLy8gQ2xlYXIgdGhlIGZvcm0gZmllbGRzXHJcbiAgICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcclxuXHJcbiAgICAgICAgLy8gQ2xvc2UgdGhlIGZvcm1cclxuICAgICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy9Db21wbGV0ZSB0YXNrXHJcbiAgZnVuY3Rpb24gY29tcGxldGVUYXNrKHRhc2spIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XHJcbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgICAgY29uc3QgdGFza3MgPSBwcm9qZWN0LnRhc2tzO1xyXG4gICAgICBmb3IgKGNvbnN0IHQgb2YgdGFza3MpIHtcclxuICAgICAgICBpZiAodC50aXRsZSA9PT0gdGFzay50aXRsZSAmJiB0LnByb2plY3ROYW1lID09PSB0YXNrLnByb2plY3ROYW1lKSB7XHJcbiAgICAgICAgICB0LmNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9EZWxldGUgdGFza1xyXG4gIGZ1bmN0aW9uIGRlbGV0ZVRhc2sodGFzaykge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcclxuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgICBjb25zdCB0YXNrcyA9IHByb2plY3QudGFza3M7XHJcbiAgICAgIGZvciAoY29uc3QgdCBvZiB0YXNrcykge1xyXG4gICAgICAgIGlmICh0LnRpdGxlID09PSB0YXNrLnRpdGxlICYmIHQucHJvamVjdE5hbWUgPT09IHRhc2sucHJvamVjdE5hbWUpIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGFza3MuaW5kZXhPZih0KTtcclxuICAgICAgICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRXhwb3J0IHRoZSB0YXNrcyBhcnJheVxyXG4gIGV4cG9ydCB7IGNvbXBsZXRlVGFzaywgZGVsZXRlVGFzayB9O1xyXG5cclxuIiwibGV0IGRhdGVJc1ZhbGlkID0gZmFsc2U7XHJcbmxldCBuYW1lSXNWYWxpZCA9IGZhbHNlO1xyXG5sZXQgZGVzY3JpcHRpb25Jc1ZhbGlkID0gZmFsc2U7XHJcblxyXG5mdW5jdGlvbiBzZXRWYWxpZCh0eXBlLCB2YWx1ZSkge1xyXG4gIGlmICh0eXBlID09PSAnZGF0ZScpIHtcclxuICAgIGRhdGVJc1ZhbGlkID0gdmFsdWU7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnbmFtZScpIHtcclxuICAgIG5hbWVJc1ZhbGlkID0gdmFsdWU7XHJcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnZGVzY3JpcHRpb24nKSB7XHJcbiAgICBkZXNjcmlwdGlvbklzVmFsaWQgPSB2YWx1ZTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFZhbGlkKCkge1xyXG4gIHJldHVybiBkYXRlSXNWYWxpZCAmJiBuYW1lSXNWYWxpZCAmJiBkZXNjcmlwdGlvbklzVmFsaWQ7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHNldFZhbGlkLCBnZXRWYWxpZCwgZGF0ZUlzVmFsaWQsIG5hbWVJc1ZhbGlkLCBkZXNjcmlwdGlvbklzVmFsaWQgfTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
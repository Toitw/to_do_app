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
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)(false);
    } else {
      clearErrorMessage(event.target);
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)(true);
    }
  });

  taskForm.elements['taskDescription'].addEventListener('blur', (event) => {
    const description = event.target.value.trim();
    if (description.length > 300) {
      const errorMessage = 'The description must be no more than 300 characters.';
      displayErrorMessage(event.target, errorMessage);
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)(false);
    } else {
      clearErrorMessage(event.target);
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)(true);
    }
  });

  taskForm.elements['dueDate'].addEventListener('blur', (event) => {
    const dueDate = event.target.value.trim();
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dueDate)) {
      const errorMessage = 'Please enter the due date in the format DD/MM/YYYY.';
      displayErrorMessage(event.target, errorMessage);
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)(false);
    } else {
      clearErrorMessage(event.target);
      (0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.setValid)(true);
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
    console.log((0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.getValid)());
    if (!(0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.getValid)()) {
      console.log((0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.getValid)())
      // Prevent the default form submission behavior
      event.preventDefault();
    } else {
      console.log((0,_validations_js__WEBPACK_IMPORTED_MODULE_2__.getValid)())
    }

  
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
/* harmony export */   getValid: () => (/* binding */ getValid),
/* harmony export */   isValid: () => (/* binding */ isValid),
/* harmony export */   setValid: () => (/* binding */ setValid)
/* harmony export */ });
let isValid = true;

function setValid(value) {
  isValid = value;
}

function getValid() {
  return isValid;
}



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b19kb19hcHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvdmFsaWRhdGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcGxldGVUYXNrLCBkZWxldGVUYXNrIH0gZnJvbSAnLi90YXNrcy5qcyc7XHJcbmltcG9ydCB7IHByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XHJcbmltcG9ydCB7IHNldFZhbGlkLCBnZXRWYWxpZCB9IGZyb20gJy4vdmFsaWRhdGlvbnMuanMnO1xyXG5cclxubGV0IGFjdGl2ZVRhc2sgPSBudWxsO1xyXG5cclxuXHJcbi8vT3BlbiB0YXNrcyBtb2RhbFxyXG5jb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLWJ1dHRvbicpO1xyXG5jb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1tb2RhbCcpO1xyXG5cclxuYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgdXBkYXRlUHJvamVjdExpc3QoKTtcclxuICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSB0YXNrIGZvcm0gZmllbGRzIHRvIHZhbGlkYXRlIGlucHV0IG9uIGJsdXJcclxuICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0nKTtcclxuICB0YXNrRm9ybS5lbGVtZW50c1sndGFza05hbWUnXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zdCB0aXRsZSA9IGV2ZW50LnRhcmdldC52YWx1ZS50cmltKCk7XHJcbiAgICBpZiAodGl0bGUubGVuZ3RoID4gMjApIHtcclxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ1RoZSB0aXRsZSBtdXN0IGJlIG5vIG1vcmUgdGhhbiAyMCBjaGFyYWN0ZXJzLic7XHJcbiAgICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZXZlbnQudGFyZ2V0LCBlcnJvck1lc3NhZ2UpO1xyXG4gICAgICBzZXRWYWxpZChmYWxzZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjbGVhckVycm9yTWVzc2FnZShldmVudC50YXJnZXQpO1xyXG4gICAgICBzZXRWYWxpZCh0cnVlKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tEZXNjcmlwdGlvbiddLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZXZlbnQudGFyZ2V0LnZhbHVlLnRyaW0oKTtcclxuICAgIGlmIChkZXNjcmlwdGlvbi5sZW5ndGggPiAzMDApIHtcclxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gJ1RoZSBkZXNjcmlwdGlvbiBtdXN0IGJlIG5vIG1vcmUgdGhhbiAzMDAgY2hhcmFjdGVycy4nO1xyXG4gICAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGV2ZW50LnRhcmdldCwgZXJyb3JNZXNzYWdlKTtcclxuICAgICAgc2V0VmFsaWQoZmFsc2UpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2xlYXJFcnJvck1lc3NhZ2UoZXZlbnQudGFyZ2V0KTtcclxuICAgICAgc2V0VmFsaWQodHJ1ZSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHRhc2tGb3JtLmVsZW1lbnRzWydkdWVEYXRlJ10uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChldmVudCkgPT4ge1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IGV2ZW50LnRhcmdldC52YWx1ZS50cmltKCk7XHJcbiAgICBjb25zdCBkYXRlUmVnZXggPSAvXlxcZHsyfVxcL1xcZHsyfVxcL1xcZHs0fSQvO1xyXG4gICAgaWYgKCFkYXRlUmVnZXgudGVzdChkdWVEYXRlKSkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAnUGxlYXNlIGVudGVyIHRoZSBkdWUgZGF0ZSBpbiB0aGUgZm9ybWF0IEREL01NL1lZWVkuJztcclxuICAgICAgZGlzcGxheUVycm9yTWVzc2FnZShldmVudC50YXJnZXQsIGVycm9yTWVzc2FnZSk7XHJcbiAgICAgIHNldFZhbGlkKGZhbHNlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNsZWFyRXJyb3JNZXNzYWdlKGV2ZW50LnRhcmdldCk7XHJcbiAgICAgIHNldFZhbGlkKHRydWUpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBGdW5jdGlvbiB0byBkaXNwbGF5IGFuIGVycm9yIG1lc3NhZ2UgZm9yIGEgZm9ybSBmaWVsZFxyXG4gIGZ1bmN0aW9uIGRpc3BsYXlFcnJvck1lc3NhZ2UoZmllbGQsIG1lc3NhZ2UpIHtcclxuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IGZpZWxkLm5leHRFbGVtZW50U2libGluZztcclxuICAgIGlmIChlcnJvckVsZW1lbnQgJiYgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndGFzay12YWxpZGF0aW9uLWVycm9yLW1lc3NhZ2UnKSkge1xyXG4gICAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgbmV3RXJyb3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICBuZXdFcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBtZXNzYWdlO1xyXG4gICAgICBuZXdFcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgndGFzay12YWxpZGF0aW9uLWVycm9yLW1lc3NhZ2UnKTtcclxuICAgICAgZmllbGQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIG5ld0Vycm9yRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBGdW5jdGlvbiB0byBjbGVhciBhbiBlcnJvciBtZXNzYWdlIGZvciBhIGZvcm0gZmllbGRcclxuICBmdW5jdGlvbiBjbGVhckVycm9yTWVzc2FnZShmaWVsZCkge1xyXG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gZmllbGQubmV4dEVsZW1lbnRTaWJsaW5nO1xyXG4gICAgaWYgKGVycm9yRWxlbWVudCAmJiBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLXZhbGlkYXRpb24tZXJyb3ItbWVzc2FnZScpKSB7XHJcbiAgICAgIGVycm9yRWxlbWVudC5yZW1vdmUoKTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuLy9DbG9zZSB0YXNrcyBtb2RhbFxyXG5jb25zdCBjbG9zZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYnV0dG9uJyk7XHJcbmNsb3NlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufSk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0TGlzdCgpIHtcclxuICAvLyBHZXQgdGhlIHByb2plY3Qgc2VsZWN0IGVsZW1lbnRcclxuICBjb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcclxuXHJcbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSBwcm9qZWN0cyBhcnJheVxyXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgLy8gQ2hlY2sgaWYgYW4gb3B0aW9uIHdpdGggdGhlIHByb2plY3QgbmFtZSBhbHJlYWR5IGV4aXN0c1xyXG4gICAgY29uc3QgZXhpc3RpbmdPcHRpb24gPSBwcm9qZWN0U2VsZWN0LnF1ZXJ5U2VsZWN0b3IoYG9wdGlvblt2YWx1ZT1cIiR7cHJvamVjdC5uYW1lfVwiXWApO1xyXG5cclxuICAgIC8vIElmIGFuIG9wdGlvbiBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBwcm9qZWN0IHNlbGVjdCBlbGVtZW50XHJcbiAgICBpZiAoIWV4aXN0aW5nT3B0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgcHJvamVjdE9wdGlvbi52YWx1ZSA9IHByb2plY3QubmFtZTtcclxuICAgICAgcHJvamVjdE9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChwcm9qZWN0T3B0aW9uKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuLy8gR2V0IHRoZSBhZGQgcHJvamVjdCBidXR0b24gYW5kIHByb2plY3QgbW9kYWxcclxuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1idXR0b24nKTtcclxuY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbW9kYWwnKTtcclxuXHJcbi8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgYWRkIHByb2plY3QgYnV0dG9uIHRvIG9wZW4gdGhlIHByb2plY3QgbW9kYWxcclxuYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBwcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbn0pO1xyXG5cclxuXHJcbi8vQ2xvc2UgcHJvamVjdG1vZGFsXHJcbmZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XHJcbiAgcHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn1cclxuXHJcbmNvbnN0IGNsb3NlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNsb3NlLWJ1dHRvbicpO1xyXG5jbG9zZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY2xvc2VNb2RhbCgpO1xyXG59KTtcclxuXHJcbi8vQWRkIHByb2plY3QgdG8gdGhlIHByb2plY3QgbGlzdFxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0VG9MaXN0KHByb2plY3QpIHtcclxuICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3QubmFtZTtcclxuICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcclxuICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgcHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1pdGVtJyk7XHJcbiAgcHJvamVjdEl0ZW0uZGF0YXNldC5wcm9qZWN0ID0gcHJvamVjdE5hbWU7XHJcbiAgcHJvamVjdEl0ZW0udGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcclxuICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XHJcbn1cclxuXHJcbi8vQWRkIHRhc2sgdG8gdGhlIHRhc2sgbGlzdFxyXG5mdW5jdGlvbiBhZGRUYXNrVG9MaXN0KHRhc2ssIHByb2plY3QpIHtcclxuICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpW2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdC5uYW1lfVwiXWApO1xyXG4gIGNvbnN0IHRhc2tJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWl0ZW0nKTtcclxuICB0YXNrSXRlbS5kYXRhc2V0LnRhc2sgPSB0YXNrLnRpdGxlO1xyXG4gIHRhc2tJdGVtLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuICBwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpemUgc2hvd0NvbXBsZXRlZCB2YXJpYWJsZSBmcm9tIGxvY2FsIHN0b3JhZ2Ugb3IgZGVmYXVsdCB0byBmYWxzZVxyXG5sZXQgc2hvd0NvbXBsZXRlZCA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Nob3dDb21wbGV0ZWQnKSkgfHwgZmFsc2U7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgIGFkZFByb2plY3RUb0xpc3QocHJvamVjdCk7XHJcbiAgICBmb3IgKGNvbnN0IHRhc2sgb2YgcHJvamVjdC50YXNrcykge1xyXG4gICAgICBpZiAoc2hvd0NvbXBsZXRlZCkge1xyXG4gICAgICAgIGFkZFRhc2tUb0xpc3QodGFzaywgcHJvamVjdCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIXRhc2suY29tcGxldGVkICYmICFzaG93Q29tcGxldGVkKSB7XHJcbiAgICAgICAgYWRkVGFza1RvTGlzdCh0YXNrLCBwcm9qZWN0KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG4vLyBEaXNwbGF5IHRhc2sgZGV0YWlsc1xyXG5jb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcclxucHJvamVjdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXNwbGF5VGFza0RldGFpbHMpO1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheVRhc2tEZXRhaWxzKGV2ZW50KSB7XHJcbiAgY29uc3QgY29tcGxldGVkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wbGV0ZS10YXNrLWJ1dHRvbicpO1xyXG4gIGNvbnN0IGRlbGV0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLXRhc2stYnV0dG9uJyk7XHJcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2staXRlbScpKSB7XHJcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBldmVudC50YXJnZXQuZGF0YXNldC50YXNrO1xyXG4gICAgY29uc3QgdGFza1Byb2plY3ROYW1lID0gZXZlbnQudGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLXByb2plY3RdJykuZGF0YXNldC5wcm9qZWN0O1xyXG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gdGFza1Byb2plY3ROYW1lKTtcclxuICAgIGNvbnN0IHRhc2sgPSBwcm9qZWN0LnRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2sudGl0bGUgPT09IHRhc2tUaXRsZSk7XHJcbiAgICBhY3RpdmVUYXNrID0gdGFzaztcclxuICAgIGNvbXBsZXRlZFRhc2tCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICBkZWxldGVUYXNrQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgdXBkYXRlVGFza0RldGFpbHModGFzayk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUYXNrRGV0YWlscyh0YXNrKSB7XHJcbiAgY29uc3QgdGFza1Byb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1wcm9qZWN0Jyk7XHJcbiAgdGFza1Byb2plY3ROYW1lLnRleHRDb250ZW50ID0gdGFzay5wcm9qZWN0O1xyXG4gIGNvbnN0IHRhc2tUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLXRpdGxlJyk7XHJcbiAgdGFza1RpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1kZXNjcmlwdGlvbicpO1xyXG4gIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XHJcbiAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLWR1ZS1kYXRlJyk7XHJcbiAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XHJcbiAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1wcmlvcml0eScpO1xyXG4gIHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9IHRhc2sucHJpb3JpdHk7XHJcbn1cclxuXHJcbi8vQ29tcGxldGUgdGFza1xyXG5jb25zdCBjb21wbGV0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcGxldGUtdGFzay1idXR0b24nKTtcclxuY29tcGxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbXBsZXRlVGFzayhhY3RpdmVUYXNrKTtcclxuICB1cGRhdGVUYXNrRGV0YWlscyhhY3RpdmVUYXNrKTtcclxuICBsb2NhdGlvbi5yZWxvYWQoKTtcclxufSk7XHJcblxyXG4vL1Nob3cgY29tcGxldGVkIHRhc2tzXHJcbmNvbnN0IHNob3dDb21wbGV0ZWRCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hvdy1jb21wbGV0ZWQtYnV0dG9uJyk7XHJcbnNob3dDb21wbGV0ZWRCdXR0b24udGV4dENvbnRlbnQgPSBzaG93Q29tcGxldGVkID8gJ0hpZGUgY29tcGxldGVkJyA6ICdTaG93IGNvbXBsZXRlZCc7XHJcbnNob3dDb21wbGV0ZWRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgc2hvd0NvbXBsZXRlZCA9ICFzaG93Q29tcGxldGVkO1xyXG4gIHNob3dDb21wbGV0ZWRCdXR0b24udGV4dENvbnRlbnQgPSBzaG93Q29tcGxldGVkID8gJ0hpZGUgY29tcGxldGVkJyA6ICdTaG93IGNvbXBsZXRlZCc7XHJcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Nob3dDb21wbGV0ZWQnLCBKU09OLnN0cmluZ2lmeShzaG93Q29tcGxldGVkKSk7XHJcbiAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbn0pO1xyXG5cclxuLy9EZWxldGUgdGFza1xyXG5jb25zdCBkZWxldGVUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZS10YXNrLWJ1dHRvbicpO1xyXG5kZWxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGRlbGV0ZVRhc2soYWN0aXZlVGFzayk7XHJcbiAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbn0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcbmV4cG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIGFkZFRhc2tUb0xpc3QsIGNsb3NlTW9kYWwgfTtcclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgaW5pdFByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdHMuanNcIjtcclxuXHJcbmluaXRQcm9qZWN0cygpO1xyXG4iLCJpbXBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBjbG9zZU1vZGFsIH0gZnJvbSAnLi9kb20uanMnO1xyXG5cclxuLy8gRGVmaW5lIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XHJcbmZ1bmN0aW9uIFByb2plY3QobmFtZSwgdGFza3MpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgIHRhc2tzOiB0YXNrc1xyXG4gICAgfTtcclxufVxyXG5cclxuLy8gTG9hZCBwcm9qZWN0cyBmcm9tIHdlYiBzdG9yYWdlXHJcbmxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpIHx8IFtdO1xyXG5cclxuZnVuY3Rpb24gaW5pdFByb2plY3RzKCkge1xyXG4gIC8vIENoZWNrIGlmIHRoZSBcIkRlZmF1bHRcIiBwcm9qZWN0IGFscmVhZHkgZXhpc3RzXHJcbiAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09ICdEZWZhdWx0Jyk7XHJcblxyXG4gIC8vIElmIHRoZSBcIkRlZmF1bHRcIiBwcm9qZWN0IGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgaXRcclxuICBpZiAoIWRlZmF1bHRQcm9qZWN0KSB7XHJcbiAgICBjb25zdCBuZXdEZWZhdWx0UHJvamVjdCA9IFByb2plY3QoJ0RlZmF1bHQnLCBbXSk7XHJcbiAgICBwcm9qZWN0cy5wdXNoKG5ld0RlZmF1bHRQcm9qZWN0KTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgfVxyXG59XHJcblxyXG4vL0dldCB0aGUgcHJvamVjdCBmb3JtXHJcbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybScpO1xyXG5cclxuLy9BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHByb2plY3QgZm9ybSB0byBoYW5kbGUgZm9ybSBzdWJtaXNzaW9uc1xyXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICAgIC8vUHJldmVudCB0aGUgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb24gYmVoYXZpb3JcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgLy9HZXQgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybSBmaWVsZHNcclxuICAgIGNvbnN0IG5hbWUgPSBwcm9qZWN0Rm9ybS5lbGVtZW50c1sncHJvamVjdE5hbWUnXS52YWx1ZTtcclxuICAgIC8vIENoZWNrIGlmIGEgcHJvamVjdCB3aXRoIHRoZSBzYW1lIG5hbWUgYWxyZWFkeSBleGlzdHNcclxuICAgIGNvbnN0IGV4aXN0aW5nUHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHApID0+IHAubmFtZSA9PT0gbmFtZSk7XHJcbiAgICBpZiAoZXhpc3RpbmdQcm9qZWN0KSB7XHJcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IGBBIHByb2plY3Qgd2l0aCB0aGUgbmFtZSBcIiR7bmFtZX1cIiBhbHJlYWR5IGV4aXN0cy5gO1xyXG4gICAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcclxuICAgICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtbmFtZS1lcnJvci1tZXNzYWdlJyk7XHJcbiAgICAgIHByb2plY3RGb3JtLmFwcGVuZENoaWxkKGVycm9yRWxlbWVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvL0NyZWF0ZSBhIG5ldyBwcm9qZWN0IG9iamVjdCB1c2luZyB0aGUgUHJvamVjdCBvYmplY3QgZmFjdG9yeVxyXG4gICAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdChuYW1lLCBbXSk7XHJcblxyXG4gICAgICAvL1N0b3JlIHRoZSBwcm9qZWN0IGluIHdlYiBzdG9yYWdlXHJcbiAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcblxyXG4gICAgICAvL0FkZCB0aGUgcHJvamVjdCB0byB0aGUgcHJvamVjdCBsaXN0XHJcbiAgICAgIGFkZFByb2plY3RUb0xpc3QocHJvamVjdCk7XHJcblxyXG4gICAgICAvL0NsZWFyIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xyXG5cclxuICAgICAgLy9DbG9zZSB0aGUgZm9ybVxyXG4gICAgICBjbG9zZU1vZGFsKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLy8gRXhwb3J0IHRoZSBwcm9qZWN0cyBhcnJheSBhbmQgdGhlIGNyZWF0ZVByb2plY3QgZnVuY3Rpb25cclxuZXhwb3J0IHsgaW5pdFByb2plY3RzLCBwcm9qZWN0cyB9OyIsImltcG9ydCB7IHByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdHMuanNcIjtcclxuaW1wb3J0IHsgYWRkVGFza1RvTGlzdCwgY2xvc2VNb2RhbCB9IGZyb20gXCIuL2RvbS5qc1wiO1xyXG5pbXBvcnQgeyBnZXRWYWxpZCB9IGZyb20gXCIuL3ZhbGlkYXRpb25zLmpzXCI7XHJcblxyXG4vLyBEZWZpbmUgdGhlIFRhc2sgb2JqZWN0IGZhY3RvcnlcclxuZnVuY3Rpb24gVGFzayh0aXRsZSwgcHJvamVjdCwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIHByb2plY3Q6IHByb2plY3QsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgZHVlRGF0ZTogZHVlRGF0ZSxcclxuICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxyXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gR2V0IHRoZSB0YXNrIGZvcm1cclxuICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0nKTtcclxuXHJcbiAgLy8gTG9hZCB0YXNrcyBmcm9tIHdlYiBzdG9yYWdlXHJcbiAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSkgfHwgW107XHJcblxyXG4gIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgdGFzayBmb3JtIHRvIGhhbmRsZSBmb3JtIHN1Ym1pc3Npb25zXHJcbiAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhnZXRWYWxpZCgpKTtcclxuICAgIGlmICghZ2V0VmFsaWQoKSkge1xyXG4gICAgICBjb25zb2xlLmxvZyhnZXRWYWxpZCgpKVxyXG4gICAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS5sb2coZ2V0VmFsaWQoKSlcclxuICAgIH1cclxuXHJcbiAgXHJcbiAgICAvLyBHZXQgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybSBmaWVsZHNcclxuICAgIGNvbnN0IHRpdGxlID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tOYW1lJ10udmFsdWU7XHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRhc2tGb3JtLmVsZW1lbnRzWydwcm9qZWN0J10udmFsdWU7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHRhc2tGb3JtLmVsZW1lbnRzWyd0YXNrRGVzY3JpcHRpb24nXS52YWx1ZTtcclxuICAgIGNvbnN0IGR1ZURhdGUgPSB0YXNrRm9ybS5lbGVtZW50c1snZHVlRGF0ZSddLnZhbHVlO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSB0YXNrRm9ybS5lbGVtZW50c1sncHJpb3JpdHknXS52YWx1ZTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEZpbmQgdGhlIHByb2plY3Qgb2JqZWN0IHdpdGggdGhlIG1hdGNoaW5nIG5hbWVcclxuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09IHByb2plY3ROYW1lKTtcclxuICAgIGNvbnN0IGV4aXN0aW5nVGFzayA9IHByb2plY3QudGFza3MuZmluZCgodGFzaykgPT4gdGFzay50aXRsZSA9PT0gdGl0bGUpO1xyXG4gICAgaWYgKGV4aXN0aW5nVGFzayAmJiBleGlzdGluZ1Rhc2suY29tcGxldGVkID09PSBmYWxzZSkge1xyXG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSBgQSB0YXNrIHdpdGggdGhlIG5hbWUgXCIke3RpdGxlfVwiIGFscmVhZHkgZXhpc3RzIGluIHRoZSBcIiR7cHJvamVjdE5hbWV9XCIgcHJvamVjdC5gO1xyXG4gICAgICBjb25zdCBlcnJvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgIGVycm9yRWxlbWVudC50ZXh0Q29udGVudCA9IGVycm9yTWVzc2FnZTtcclxuICAgICAgZXJyb3JFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3Rhc2stbmFtZS1lcnJvci1tZXNzYWdlJyk7XHJcbiAgICAgIHRhc2tGb3JtLmFwcGVuZENoaWxkKGVycm9yRWxlbWVudCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIENyZWF0ZSBhIG5ldyB0YXNrIG9iamVjdCB1c2luZyB0aGUgVGFzayBvYmplY3QgZmFjdG9yeVxyXG4gICAgICBjb25zdCB0YXNrID0gVGFzayh0aXRsZSwgcHJvamVjdE5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGVkKTtcclxuXHJcbiAgICAgIC8vIEFkZCB0aGUgdGFzayB0byB0aGUgcHJvamVjdCBhbmQgc3RvcmUgaXQgaW4gd2ViIHN0b3JhZ2VcclxuICAgICAgaWYgKHByb2plY3QpIHtcclxuICAgICAgICBwcm9qZWN0LnRhc2tzLnB1c2godGFzayk7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gQWRkIHRoZSB0YXNrIHRvIHRoZSB0YXNrIGxpc3RcclxuICAgICAgYWRkVGFza1RvTGlzdCh0YXNrLCBwcm9qZWN0KTtcclxuICAgIFxyXG4gICAgICAvLyBDbGVhciB0aGUgZm9ybSBmaWVsZHNcclxuICAgICAgdGFza0Zvcm0ucmVzZXQoKTtcclxuXHJcbiAgICAgIC8vIENsb3NlIHRoZSBmb3JtXHJcbiAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy9Db21wbGV0ZSB0YXNrXHJcbiAgZnVuY3Rpb24gY29tcGxldGVUYXNrKHRhc2spIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XHJcbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgICAgY29uc3QgdGFza3MgPSBwcm9qZWN0LnRhc2tzO1xyXG4gICAgICBmb3IgKGNvbnN0IHQgb2YgdGFza3MpIHtcclxuICAgICAgICBpZiAodC50aXRsZSA9PT0gdGFzay50aXRsZSAmJiB0LnByb2plY3ROYW1lID09PSB0YXNrLnByb2plY3ROYW1lKSB7XHJcbiAgICAgICAgICB0LmNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9EZWxldGUgdGFza1xyXG4gIGZ1bmN0aW9uIGRlbGV0ZVRhc2sodGFzaykge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcclxuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgICBjb25zdCB0YXNrcyA9IHByb2plY3QudGFza3M7XHJcbiAgICAgIGZvciAoY29uc3QgdCBvZiB0YXNrcykge1xyXG4gICAgICAgIGlmICh0LnRpdGxlID09PSB0YXNrLnRpdGxlICYmIHQucHJvamVjdE5hbWUgPT09IHRhc2sucHJvamVjdE5hbWUpIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGFza3MuaW5kZXhPZih0KTtcclxuICAgICAgICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRXhwb3J0IHRoZSB0YXNrcyBhcnJheVxyXG4gIGV4cG9ydCB7IGNvbXBsZXRlVGFzaywgZGVsZXRlVGFzayB9O1xyXG5cclxuIiwibGV0IGlzVmFsaWQgPSB0cnVlO1xuXG5mdW5jdGlvbiBzZXRWYWxpZCh2YWx1ZSkge1xuICBpc1ZhbGlkID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGdldFZhbGlkKCkge1xuICByZXR1cm4gaXNWYWxpZDtcbn1cblxuZXhwb3J0IHsgc2V0VmFsaWQsIGdldFZhbGlkLCBpc1ZhbGlkIH07Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
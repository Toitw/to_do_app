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

//Display project/task list on the menu
window.addEventListener('DOMContentLoaded', () => {
  for (const project of _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects) {
    addProjectToList(project);
    for (const task of project.tasks) {
      addTaskToList(task, project);
    }
  }
});

// Display task details
const projectList = document.querySelector('.project-list');
projectList.addEventListener('click', displayTaskDetails);

function displayTaskDetails(event) {
  if (event.target.classList.contains('task-item')) {
    const taskTitle = event.target.dataset.task;
    const task = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.tasks.find((task) => task.title === taskTitle);
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
/* harmony export */   tasks: () => (/* binding */ tasks)
/* harmony export */ });
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");



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
    // Prevent the default form submission behavior
    event.preventDefault();
  
    // Get the values of the form fields
    const title = taskForm.elements['taskName'].value;
    const projectName = taskForm.elements['project'].value;
    const description = taskForm.elements['taskDescription'].value;
    const dueDate = taskForm.elements['dueDate'].value;
    const priority = taskForm.elements['priority'].value;
    const completed = false;

    // Find the project object with the matching name
    const project = _projects_js__WEBPACK_IMPORTED_MODULE_0__.projects.find((project) => project.name === projectName);
  
    // Create a new task object using the Task object factory
    const task = Task(title, projectName, description, dueDate, priority, completed);

    // Store the task in web storage
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Add the task to the project and store it in web storage
    if (project) {
      project.tasks.push(task);
      localStorage.setItem('projects', JSON.stringify(_projects_js__WEBPACK_IMPORTED_MODULE_0__.projects));
    }

    // Add the task to the task list
    (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.addTaskToList)(task, project);
  
    // Clear the form fields
    taskForm.reset();
  });

  // Export the tasks array
  



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQW1DO0FBQ007QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrREFBUTtBQUNoQztBQUNBLHdFQUF3RSxhQUFhO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSxhQUFhO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrREFBUTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNENBQUs7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDdUQ7QUFDdkQ7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDM0g2Qzs7QUFFN0MsMERBQVk7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRjRDOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLHlEQUFnQjs7QUFFcEI7QUFDQTs7QUFFQTtBQUNBLElBQUksbURBQVU7QUFDZCxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JEeUM7QUFDQTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0RBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxrREFBUTtBQUM5RDtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNEQUFhO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBbUI7QUFDbkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL3Rhc2tzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRhc2tzIH0gZnJvbSAnLi90YXNrcy5qcyc7XHJcbmltcG9ydCB7IHByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XHJcblxyXG4vL09wZW4gdGFza3MgbW9kYWxcclxuY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1idXR0b24nKTtcclxuY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbW9kYWwnKTtcclxuXHJcbmFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIHVwZGF0ZVByb2plY3RMaXN0KCk7XHJcbn0pO1xyXG5cclxuLy9DbG9zZSB0YXNrcyBtb2RhbFxyXG5jb25zdCBjbG9zZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYnV0dG9uJyk7XHJcbmNsb3NlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufSk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0TGlzdCgpIHtcclxuICAvLyBHZXQgdGhlIHByb2plY3Qgc2VsZWN0IGVsZW1lbnRcclxuICBjb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcclxuXHJcbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSBwcm9qZWN0cyBhcnJheVxyXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgLy8gQ2hlY2sgaWYgYW4gb3B0aW9uIHdpdGggdGhlIHByb2plY3QgbmFtZSBhbHJlYWR5IGV4aXN0c1xyXG4gICAgY29uc3QgZXhpc3RpbmdPcHRpb24gPSBwcm9qZWN0U2VsZWN0LnF1ZXJ5U2VsZWN0b3IoYG9wdGlvblt2YWx1ZT1cIiR7cHJvamVjdC5uYW1lfVwiXWApO1xyXG5cclxuICAgIC8vIElmIGFuIG9wdGlvbiBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBwcm9qZWN0IHNlbGVjdCBlbGVtZW50XHJcbiAgICBpZiAoIWV4aXN0aW5nT3B0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgcHJvamVjdE9wdGlvbi52YWx1ZSA9IHByb2plY3QubmFtZTtcclxuICAgICAgcHJvamVjdE9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChwcm9qZWN0T3B0aW9uKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuLy8gR2V0IHRoZSBhZGQgcHJvamVjdCBidXR0b24gYW5kIHByb2plY3QgbW9kYWxcclxuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1idXR0b24nKTtcclxuY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbW9kYWwnKTtcclxuXHJcbi8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgYWRkIHByb2plY3QgYnV0dG9uIHRvIG9wZW4gdGhlIHByb2plY3QgbW9kYWxcclxuYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBwcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbn0pO1xyXG5cclxuXHJcbi8vQ2xvc2UgcHJvamVjdG1vZGFsXHJcbmZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7XHJcbiAgcHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn1cclxuXHJcbmNvbnN0IGNsb3NlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNsb3NlLWJ1dHRvbicpO1xyXG5jbG9zZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY2xvc2VNb2RhbCgpO1xyXG59KTtcclxuXHJcbi8vQWRkIHByb2plY3QgdG8gdGhlIHByb2plY3QgbGlzdFxyXG5mdW5jdGlvbiBhZGRQcm9qZWN0VG9MaXN0KHByb2plY3QpIHtcclxuICBjb25zdCBwcm9qZWN0TmFtZSA9IHByb2plY3QubmFtZTtcclxuICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcclxuICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgcHJvamVjdEl0ZW0uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1pdGVtJyk7XHJcbiAgcHJvamVjdEl0ZW0uZGF0YXNldC5wcm9qZWN0ID0gcHJvamVjdE5hbWU7XHJcbiAgcHJvamVjdEl0ZW0udGV4dENvbnRlbnQgPSBwcm9qZWN0TmFtZTtcclxuICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XHJcbn1cclxuXHJcbi8vQWRkIHRhc2sgdG8gdGhlIHRhc2sgbGlzdFxyXG5mdW5jdGlvbiBhZGRUYXNrVG9MaXN0KHRhc2ssIHByb2plY3QpIHtcclxuICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpW2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdC5uYW1lfVwiXWApO1xyXG4gIGNvbnN0IHRhc2tJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWl0ZW0nKTtcclxuICB0YXNrSXRlbS5kYXRhc2V0LnRhc2sgPSB0YXNrLnRpdGxlO1xyXG4gIHRhc2tJdGVtLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuICBwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XHJcbn1cclxuXHJcbi8vRGlzcGxheSBwcm9qZWN0L3Rhc2sgbGlzdCBvbiB0aGUgbWVudVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgIGFkZFByb2plY3RUb0xpc3QocHJvamVjdCk7XHJcbiAgICBmb3IgKGNvbnN0IHRhc2sgb2YgcHJvamVjdC50YXNrcykge1xyXG4gICAgICBhZGRUYXNrVG9MaXN0KHRhc2ssIHByb2plY3QpO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG4vLyBEaXNwbGF5IHRhc2sgZGV0YWlsc1xyXG5jb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcclxucHJvamVjdExpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXNwbGF5VGFza0RldGFpbHMpO1xyXG5cclxuZnVuY3Rpb24gZGlzcGxheVRhc2tEZXRhaWxzKGV2ZW50KSB7XHJcbiAgaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Rhc2staXRlbScpKSB7XHJcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBldmVudC50YXJnZXQuZGF0YXNldC50YXNrO1xyXG4gICAgY29uc3QgdGFzayA9IHRhc2tzLmZpbmQoKHRhc2spID0+IHRhc2sudGl0bGUgPT09IHRhc2tUaXRsZSk7XHJcbiAgICB1cGRhdGVUYXNrRGV0YWlscyh0YXNrKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVRhc2tEZXRhaWxzKHRhc2spIHtcclxuICBjb25zdCB0YXNrUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLXByb2plY3QnKTtcclxuICB0YXNrUHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSB0YXNrLnByb2plY3Q7XHJcbiAgY29uc3QgdGFza1RpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtdGl0bGUnKTtcclxuICB0YXNrVGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLWRlc2NyaXB0aW9uJyk7XHJcbiAgdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdGFzay5kZXNjcmlwdGlvbjtcclxuICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtZHVlLWRhdGUnKTtcclxuICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcclxuICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLXByaW9yaXR5Jyk7XHJcbiAgdGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gdGFzay5wcmlvcml0eTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBhZGRUYXNrVG9MaXN0LCBjbG9zZU1vZGFsIH07XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IGluaXRQcm9qZWN0cyB9IGZyb20gXCIuL3Byb2plY3RzLmpzXCI7XG5cbmluaXRQcm9qZWN0cygpO1xuIiwiaW1wb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgY2xvc2VNb2RhbCB9IGZyb20gJy4vZG9tLmpzJztcblxuLy8gRGVmaW5lIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XG5mdW5jdGlvbiBQcm9qZWN0KG5hbWUsIHRhc2tzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICB0YXNrczogdGFza3NcbiAgICB9O1xufVxuXG4vLyBMb2FkIHByb2plY3RzIGZyb20gd2ViIHN0b3JhZ2VcbmxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpIHx8IFtdO1xuXG5mdW5jdGlvbiBpbml0UHJvamVjdHMoKSB7XG4gIC8vIENoZWNrIGlmIHRoZSBcIkRlZmF1bHRcIiBwcm9qZWN0IGFscmVhZHkgZXhpc3RzXG4gIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSAnRGVmYXVsdCcpO1xuXG4gIC8vIElmIHRoZSBcIkRlZmF1bHRcIiBwcm9qZWN0IGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgaXRcbiAgaWYgKCFkZWZhdWx0UHJvamVjdCkge1xuICAgIGNvbnN0IG5ld0RlZmF1bHRQcm9qZWN0ID0gUHJvamVjdCgnRGVmYXVsdCcsIFtdKTtcbiAgICBwcm9qZWN0cy5wdXNoKG5ld0RlZmF1bHRQcm9qZWN0KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuICB9XG59XG5cbi8vR2V0IHRoZSBwcm9qZWN0IGZvcm1cbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybScpO1xuXG4vL0FkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgcHJvamVjdCBmb3JtIHRvIGhhbmRsZSBmb3JtIHN1Ym1pc3Npb25zXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAvL1ByZXZlbnQgdGhlIGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uIGJlaGF2aW9yXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vR2V0IHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gZmllbGRzXG4gICAgY29uc3QgbmFtZSA9IHByb2plY3RGb3JtLmVsZW1lbnRzWydwcm9qZWN0TmFtZSddLnZhbHVlO1xuXG4gICAgLy9DcmVhdGUgYSBuZXcgcHJvamVjdCBvYmplY3QgdXNpbmcgdGhlIFByb2plY3Qgb2JqZWN0IGZhY3RvcnlcbiAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdChuYW1lLCBbXSk7XG5cbiAgICAvL1N0b3JlIHRoZSBwcm9qZWN0IGluIHdlYiBzdG9yYWdlXG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuXG4gICAgLy9BZGQgdGhlIHByb2plY3QgdG8gdGhlIHByb2plY3QgbGlzdFxuICAgIGFkZFByb2plY3RUb0xpc3QocHJvamVjdCk7XG5cbiAgICAvL0NsZWFyIHRoZSBmb3JtIGZpZWxkc1xuICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG5cbiAgICAvL0Nsb3NlIHRoZSBmb3JtXG4gICAgY2xvc2VNb2RhbCgpO1xufSk7XG5cbi8vIEV4cG9ydCB0aGUgcHJvamVjdHMgYXJyYXkgYW5kIHRoZSBjcmVhdGVQcm9qZWN0IGZ1bmN0aW9uXG5leHBvcnQgeyBpbml0UHJvamVjdHMsIHByb2plY3RzIH07IiwiaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tIFwiLi9wcm9qZWN0cy5qc1wiO1xyXG5pbXBvcnQgeyBhZGRUYXNrVG9MaXN0IH0gZnJvbSBcIi4vZG9tLmpzXCI7XHJcblxyXG4vLyBEZWZpbmUgdGhlIFRhc2sgb2JqZWN0IGZhY3RvcnlcclxuZnVuY3Rpb24gVGFzayh0aXRsZSwgcHJvamVjdCwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIHByb2plY3Q6IHByb2plY3QsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgZHVlRGF0ZTogZHVlRGF0ZSxcclxuICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxyXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gR2V0IHRoZSB0YXNrIGZvcm1cclxuICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0nKTtcclxuXHJcbiAgLy8gTG9hZCB0YXNrcyBmcm9tIHdlYiBzdG9yYWdlXHJcbiAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSkgfHwgW107XHJcblxyXG4gIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgdGFzayBmb3JtIHRvIGhhbmRsZSBmb3JtIHN1Ym1pc3Npb25zXHJcbiAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICBcclxuICAgIC8vIEdldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgY29uc3QgdGl0bGUgPSB0YXNrRm9ybS5lbGVtZW50c1sndGFza05hbWUnXS52YWx1ZTtcclxuICAgIGNvbnN0IHByb2plY3ROYW1lID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Byb2plY3QnXS52YWx1ZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tEZXNjcmlwdGlvbiddLnZhbHVlO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IHRhc2tGb3JtLmVsZW1lbnRzWydkdWVEYXRlJ10udmFsdWU7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IHRhc2tGb3JtLmVsZW1lbnRzWydwcmlvcml0eSddLnZhbHVlO1xyXG4gICAgY29uc3QgY29tcGxldGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gRmluZCB0aGUgcHJvamVjdCBvYmplY3Qgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZVxyXG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gcHJvamVjdE5hbWUpO1xyXG4gIFxyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHRhc2sgb2JqZWN0IHVzaW5nIHRoZSBUYXNrIG9iamVjdCBmYWN0b3J5XHJcbiAgICBjb25zdCB0YXNrID0gVGFzayh0aXRsZSwgcHJvamVjdE5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGVkKTtcclxuXHJcbiAgICAvLyBTdG9yZSB0aGUgdGFzayBpbiB3ZWIgc3RvcmFnZVxyXG4gICAgdGFza3MucHVzaCh0YXNrKTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSB0YXNrIHRvIHRoZSBwcm9qZWN0IGFuZCBzdG9yZSBpdCBpbiB3ZWIgc3RvcmFnZVxyXG4gICAgaWYgKHByb2plY3QpIHtcclxuICAgICAgcHJvamVjdC50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCB0aGUgdGFzayB0byB0aGUgdGFzayBsaXN0XHJcbiAgICBhZGRUYXNrVG9MaXN0KHRhc2ssIHByb2plY3QpO1xyXG4gIFxyXG4gICAgLy8gQ2xlYXIgdGhlIGZvcm0gZmllbGRzXHJcbiAgICB0YXNrRm9ybS5yZXNldCgpO1xyXG4gIH0pO1xyXG5cclxuICAvLyBFeHBvcnQgdGhlIHRhc2tzIGFycmF5XHJcbiAgZXhwb3J0IHsgdGFza3MgfTtcclxuXHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
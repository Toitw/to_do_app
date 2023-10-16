"use strict";
(self["webpackChunkto_do_app"] = self["webpackChunkto_do_app"] || []).push([["index"],{

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   updateProjects: () => (/* binding */ updateProjects)
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
const closeProjectButton = document.querySelector('.project-close-button');
closeProjectButton.addEventListener('click', () => {
  projectModal.style.display = 'none';
});

// Display projects/tasks on the menu
function updateProjects() {
  const projectList = document.querySelector('.project-list');

  for (const project of _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects) {
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
          taskItem.classList.add('task-item');
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

//Display task details

function createTaskItemEventListener(taskItems, taskDetailsProject, taskDetailsTitle, taskDetailsDescription, taskDetailsDueDate, taskDetailsPriority) {
  return function(event) {
    // Get the task title from the clicked task item element
    const taskTitle = event.target.dataset.task;

    // Find the task with the matching title
    const task = _tasks_js__WEBPACK_IMPORTED_MODULE_0__.tasks.find((task) => task.title === taskTitle);

    // Update the task details with the task information
    taskDetailsProject.textContent = `${task.project}`;
    taskDetailsTitle.textContent = `${task.title}`;
    taskDetailsDescription.textContent = `${task.description}`;
    taskDetailsDueDate.textContent = `${task.dueDate}`;
    taskDetailsPriority.textContent = `${task.priority}`;
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const taskItems = document.querySelectorAll('.task-item');
  const taskDetailsProject = document.querySelector('#task-details-project');
  const taskDetailsTitle = document.querySelector('#task-details-title');
  const taskDetailsDescription = document.querySelector('#task-details-description');
  const taskDetailsDueDate = document.querySelector('#task-details-due-date');
  const taskDetailsPriority = document.querySelector('#task-details-priority');

  const taskItemEventListener = createTaskItemEventListener(taskItems, taskDetailsProject, taskDetailsTitle, taskDetailsDescription, taskDetailsDueDate, taskDetailsPriority);

  taskItems.forEach((taskItem) => {
    taskItem.addEventListener('click', taskItemEventListener);
  });
});

//Complete a task








/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");



(0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.initProjects)();
(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.updateProjects)();

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

    //Clear the form fields
    projectForm.reset();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFtQztBQUNNO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0RBQVE7QUFDaEM7QUFDQSx3RUFBd0UsYUFBYTtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtEQUFRO0FBQ2hDO0FBQ0EsOEVBQThFLGFBQWE7QUFDM0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsV0FBVztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXlFLFdBQVc7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsNENBQUs7QUFDdEI7QUFDQTtBQUNBLHdDQUF3QyxhQUFhO0FBQ3JELHNDQUFzQyxXQUFXO0FBQ2pELDRDQUE0QyxpQkFBaUI7QUFDN0Qsd0NBQXdDLGFBQWE7QUFDckQseUNBQXlDLGNBQWM7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUMwQjtBQUMxQjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDaEswQztBQUNHOztBQUU3QywwREFBWTtBQUNaLHVEQUFjOzs7Ozs7Ozs7Ozs7Ozs7QUNKZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3Q3lDOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBb0Isa0RBQVE7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Qsa0RBQVE7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0EsRUFBbUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL3Rhc2tzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHRhc2tzIH0gZnJvbSAnLi90YXNrcy5qcyc7XHJcbmltcG9ydCB7IHByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XHJcblxyXG4vL09wZW4gdGFza3MgbW9kYWxcclxuY29uc3QgYWRkVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtdGFzay1idXR0b24nKTtcclxuY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbW9kYWwnKTtcclxuXHJcbmFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIHVwZGF0ZVByb2plY3RMaXN0KCk7XHJcbn0pO1xyXG5cclxuLy9DbG9zZSB0YXNrcyBtb2RhbFxyXG5jb25zdCBjbG9zZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UtYnV0dG9uJyk7XHJcbmNsb3NlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufSk7XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0TGlzdCgpIHtcclxuICAvLyBHZXQgdGhlIHByb2plY3Qgc2VsZWN0IGVsZW1lbnRcclxuICBjb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcclxuXHJcbiAgLy8gTG9vcCB0aHJvdWdoIHRoZSBwcm9qZWN0cyBhcnJheVxyXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgLy8gQ2hlY2sgaWYgYW4gb3B0aW9uIHdpdGggdGhlIHByb2plY3QgbmFtZSBhbHJlYWR5IGV4aXN0c1xyXG4gICAgY29uc3QgZXhpc3RpbmdPcHRpb24gPSBwcm9qZWN0U2VsZWN0LnF1ZXJ5U2VsZWN0b3IoYG9wdGlvblt2YWx1ZT1cIiR7cHJvamVjdC5uYW1lfVwiXWApO1xyXG5cclxuICAgIC8vIElmIGFuIG9wdGlvbiBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBwcm9qZWN0IHNlbGVjdCBlbGVtZW50XHJcbiAgICBpZiAoIWV4aXN0aW5nT3B0aW9uKSB7XHJcbiAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcclxuICAgICAgcHJvamVjdE9wdGlvbi52YWx1ZSA9IHByb2plY3QubmFtZTtcclxuICAgICAgcHJvamVjdE9wdGlvbi50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChwcm9qZWN0T3B0aW9uKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuLy8gR2V0IHRoZSBhZGQgcHJvamVjdCBidXR0b24gYW5kIHByb2plY3QgbW9kYWxcclxuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtcHJvamVjdC1idXR0b24nKTtcclxuY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbW9kYWwnKTtcclxuXHJcbi8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgYWRkIHByb2plY3QgYnV0dG9uIHRvIG9wZW4gdGhlIHByb2plY3QgbW9kYWxcclxuYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBwcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbn0pO1xyXG5cclxuXHJcbi8vQ2xvc2UgcHJvamVjdG1vZGFsXHJcbmNvbnN0IGNsb3NlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNsb3NlLWJ1dHRvbicpO1xyXG5jbG9zZVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgcHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn0pO1xyXG5cclxuLy8gRGlzcGxheSBwcm9qZWN0cy90YXNrcyBvbiB0aGUgbWVudVxyXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0cygpIHtcclxuICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWxpc3QnKTtcclxuXHJcbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XHJcbiAgICAvLyBDaGVjayBpZiBhIHByb2plY3QgaXRlbSB3aXRoIHRoZSBwcm9qZWN0IG5hbWUgYWxyZWFkeSBleGlzdHNcclxuICAgIGNvbnN0IGV4aXN0aW5nUHJvamVjdEl0ZW0gPSBwcm9qZWN0TGlzdC5xdWVyeVNlbGVjdG9yKGBsaVtkYXRhLXByb2plY3Q9XCIke3Byb2plY3QubmFtZX1cIl1gKTtcclxuICBcclxuICAgIC8vIElmIGEgcHJvamVjdCBpdGVtIGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgYSBuZXcgb25lIGFuZCBhZGQgaXQgdG8gdGhlIHByb2plY3QgbGlzdFxyXG4gICAgaWYgKCFleGlzdGluZ1Byb2plY3RJdGVtKSB7XHJcbiAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgcHJvamVjdEl0ZW0uZGF0YXNldC5wcm9qZWN0ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgICBwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcclxuICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xyXG4gIFxyXG4gICAgICBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XHJcbiAgICAgIHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHRhc2tMaXN0KTtcclxuICBcclxuICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHByb2plY3QudGFza3MpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiBhIHRhc2sgaXRlbSB3aXRoIHRoZSB0YXNrIHRpdGxlIGFscmVhZHkgZXhpc3RzXHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdUYXNrSXRlbSA9IHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3IoYGxpW2RhdGEtdGFzaz1cIiR7dGFzay50aXRsZX1cIl1gKTtcclxuICBcclxuICAgICAgICAvLyBJZiBhIHRhc2sgaXRlbSBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSB0YXNrIGxpc3RcclxuICAgICAgICBpZiAoIWV4aXN0aW5nVGFza0l0ZW0pIHtcclxuICAgICAgICAgIGNvbnN0IHRhc2tJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICAgIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2staXRlbScpO1xyXG4gICAgICAgICAgdGFza0l0ZW0uZGF0YXNldC50YXNrID0gdGFzay50aXRsZTtcclxuICAgICAgICAgIHRhc2tJdGVtLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuICAgICAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIElmIGEgcHJvamVjdCBpdGVtIGFscmVhZHkgZXhpc3RzLCB1cGRhdGUgdGhlIHRhc2sgbGlzdFxyXG4gICAgICBjb25zdCB0YXNrTGlzdCA9IGV4aXN0aW5nUHJvamVjdEl0ZW0ucXVlcnlTZWxlY3RvcigndWwnKTtcclxuICBcclxuICAgICAgZm9yIChjb25zdCB0YXNrIG9mIHByb2plY3QudGFza3MpIHtcclxuICAgICAgICAvLyBDaGVjayBpZiBhIHRhc2sgaXRlbSB3aXRoIHRoZSB0YXNrIHRpdGxlIGFscmVhZHkgZXhpc3RzXHJcbiAgICAgICAgY29uc3QgZXhpc3RpbmdUYXNrSXRlbSA9IHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3IoYGxpW2RhdGEtdGFzaz1cIiR7dGFzay50aXRsZX1cIl1gKTtcclxuICBcclxuICAgICAgICAvLyBJZiBhIHRhc2sgaXRlbSBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSB0YXNrIGxpc3RcclxuICAgICAgICBpZiAoIWV4aXN0aW5nVGFza0l0ZW0pIHtcclxuICAgICAgICAgIGNvbnN0IHRhc2tJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICAgICAgICAgIHRhc2tJdGVtLmRhdGFzZXQudGFzayA9IHRhc2sudGl0bGU7XHJcbiAgICAgICAgICB0YXNrSXRlbS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgICAgICAgICB0YXNrTGlzdC5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vL0Z1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJvamVjdCBhbmQgdGFzayBsaXN0c1xyXG5jb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0nKTtcclxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XHJcblxyXG50YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBcclxuICB1cGRhdGVQcm9qZWN0cygpO1xyXG59KTtcclxuXHJcbnByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IFxyXG4gIHVwZGF0ZVByb2plY3RzKCk7XHJcbn0pO1xyXG5cclxuLy9EaXNwbGF5IHRhc2sgZGV0YWlsc1xyXG5cclxuZnVuY3Rpb24gY3JlYXRlVGFza0l0ZW1FdmVudExpc3RlbmVyKHRhc2tJdGVtcywgdGFza0RldGFpbHNQcm9qZWN0LCB0YXNrRGV0YWlsc1RpdGxlLCB0YXNrRGV0YWlsc0Rlc2NyaXB0aW9uLCB0YXNrRGV0YWlsc0R1ZURhdGUsIHRhc2tEZXRhaWxzUHJpb3JpdHkpIHtcclxuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIC8vIEdldCB0aGUgdGFzayB0aXRsZSBmcm9tIHRoZSBjbGlja2VkIHRhc2sgaXRlbSBlbGVtZW50XHJcbiAgICBjb25zdCB0YXNrVGl0bGUgPSBldmVudC50YXJnZXQuZGF0YXNldC50YXNrO1xyXG5cclxuICAgIC8vIEZpbmQgdGhlIHRhc2sgd2l0aCB0aGUgbWF0Y2hpbmcgdGl0bGVcclxuICAgIGNvbnN0IHRhc2sgPSB0YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLnRpdGxlID09PSB0YXNrVGl0bGUpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSB0aGUgdGFzayBkZXRhaWxzIHdpdGggdGhlIHRhc2sgaW5mb3JtYXRpb25cclxuICAgIHRhc2tEZXRhaWxzUHJvamVjdC50ZXh0Q29udGVudCA9IGAke3Rhc2sucHJvamVjdH1gO1xyXG4gICAgdGFza0RldGFpbHNUaXRsZS50ZXh0Q29udGVudCA9IGAke3Rhc2sudGl0bGV9YDtcclxuICAgIHRhc2tEZXRhaWxzRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgJHt0YXNrLmRlc2NyaXB0aW9ufWA7XHJcbiAgICB0YXNrRGV0YWlsc0R1ZURhdGUudGV4dENvbnRlbnQgPSBgJHt0YXNrLmR1ZURhdGV9YDtcclxuICAgIHRhc2tEZXRhaWxzUHJpb3JpdHkudGV4dENvbnRlbnQgPSBgJHt0YXNrLnByaW9yaXR5fWA7XHJcbiAgfTtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICBjb25zdCB0YXNrSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFzay1pdGVtJyk7XHJcbiAgY29uc3QgdGFza0RldGFpbHNQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1wcm9qZWN0Jyk7XHJcbiAgY29uc3QgdGFza0RldGFpbHNUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtdGl0bGUnKTtcclxuICBjb25zdCB0YXNrRGV0YWlsc0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1kZXNjcmlwdGlvbicpO1xyXG4gIGNvbnN0IHRhc2tEZXRhaWxzRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtZHVlLWRhdGUnKTtcclxuICBjb25zdCB0YXNrRGV0YWlsc1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1wcmlvcml0eScpO1xyXG5cclxuICBjb25zdCB0YXNrSXRlbUV2ZW50TGlzdGVuZXIgPSBjcmVhdGVUYXNrSXRlbUV2ZW50TGlzdGVuZXIodGFza0l0ZW1zLCB0YXNrRGV0YWlsc1Byb2plY3QsIHRhc2tEZXRhaWxzVGl0bGUsIHRhc2tEZXRhaWxzRGVzY3JpcHRpb24sIHRhc2tEZXRhaWxzRHVlRGF0ZSwgdGFza0RldGFpbHNQcmlvcml0eSk7XHJcblxyXG4gIHRhc2tJdGVtcy5mb3JFYWNoKCh0YXNrSXRlbSkgPT4ge1xyXG4gICAgdGFza0l0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0YXNrSXRlbUV2ZW50TGlzdGVuZXIpO1xyXG4gIH0pO1xyXG59KTtcclxuXHJcbi8vQ29tcGxldGUgYSB0YXNrXHJcblxyXG5cclxuZXhwb3J0IHsgdXBkYXRlUHJvamVjdHMgfTtcclxuXHJcblxyXG5cclxuIiwiaW1wb3J0IHsgdXBkYXRlUHJvamVjdHMgfSBmcm9tIFwiLi9kb20uanNcIjtcbmltcG9ydCB7IGluaXRQcm9qZWN0cyB9IGZyb20gXCIuL3Byb2plY3RzLmpzXCI7XG5cbmluaXRQcm9qZWN0cygpO1xudXBkYXRlUHJvamVjdHMoKTsiLCIvLyBEZWZpbmUgdGhlIFByb2plY3Qgb2JqZWN0IGZhY3RvcnlcbmZ1bmN0aW9uIFByb2plY3QobmFtZSwgdGFza3MpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogbmFtZSxcbiAgICAgIHRhc2tzOiB0YXNrc1xuICAgIH07XG59XG5cbi8vIExvYWQgcHJvamVjdHMgZnJvbSB3ZWIgc3RvcmFnZVxubGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgfHwgW107XG5cbmZ1bmN0aW9uIGluaXRQcm9qZWN0cygpIHtcbiAgLy8gQ2hlY2sgaWYgdGhlIFwiRGVmYXVsdFwiIHByb2plY3QgYWxyZWFkeSBleGlzdHNcbiAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09ICdEZWZhdWx0Jyk7XG5cbiAgLy8gSWYgdGhlIFwiRGVmYXVsdFwiIHByb2plY3QgZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBpdFxuICBpZiAoIWRlZmF1bHRQcm9qZWN0KSB7XG4gICAgY29uc3QgbmV3RGVmYXVsdFByb2plY3QgPSBQcm9qZWN0KCdEZWZhdWx0JywgW10pO1xuICAgIHByb2plY3RzLnB1c2gobmV3RGVmYXVsdFByb2plY3QpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG4gIH1cbn1cblxuLy9HZXQgdGhlIHByb2plY3QgZm9ybVxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XG5cbi8vQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBwcm9qZWN0IGZvcm0gdG8gaGFuZGxlIGZvcm0gc3VibWlzc2lvbnNcbnByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuICAgIC8vUHJldmVudCB0aGUgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb24gYmVoYXZpb3JcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy9HZXQgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybSBmaWVsZHNcbiAgICBjb25zdCBuYW1lID0gcHJvamVjdEZvcm0uZWxlbWVudHNbJ3Byb2plY3ROYW1lJ10udmFsdWU7XG5cbiAgICAvL0NyZWF0ZSBhIG5ldyBwcm9qZWN0IG9iamVjdCB1c2luZyB0aGUgUHJvamVjdCBvYmplY3QgZmFjdG9yeVxuICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0KG5hbWUsIFtdKTtcblxuICAgIC8vU3RvcmUgdGhlIHByb2plY3QgaW4gd2ViIHN0b3JhZ2VcbiAgICBwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG5cbiAgICAvL0NsZWFyIHRoZSBmb3JtIGZpZWxkc1xuICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XG59KTtcblxuLy8gRXhwb3J0IHRoZSBwcm9qZWN0cyBhcnJheSBhbmQgdGhlIGNyZWF0ZVByb2plY3QgZnVuY3Rpb25cbmV4cG9ydCB7IGluaXRQcm9qZWN0cywgcHJvamVjdHMgfTsiLCJpbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gXCIuL3Byb2plY3RzLmpzXCI7XG5cbi8vIERlZmluZSB0aGUgVGFzayBvYmplY3QgZmFjdG9yeVxuZnVuY3Rpb24gVGFzayh0aXRsZSwgcHJvamVjdCwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgIHByb2plY3Q6IHByb2plY3QsXG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICBkdWVEYXRlOiBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxuICAgICAgY29tcGxldGVkOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICAvLyBHZXQgdGhlIHRhc2sgZm9ybVxuICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0nKTtcblxuICAvLyBMb2FkIHRhc2tzIGZyb20gd2ViIHN0b3JhZ2VcbiAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSkgfHwgW107XG5cbiAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSB0YXNrIGZvcm0gdG8gaGFuZGxlIGZvcm0gc3VibWlzc2lvbnNcbiAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gICAgLy8gUHJldmVudCB0aGUgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb24gYmVoYXZpb3JcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBcbiAgICAvLyBHZXQgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybSBmaWVsZHNcbiAgICBjb25zdCB0aXRsZSA9IHRhc2tGb3JtLmVsZW1lbnRzWyd0YXNrTmFtZSddLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3ROYW1lID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Byb2plY3QnXS52YWx1ZTtcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHRhc2tGb3JtLmVsZW1lbnRzWyd0YXNrRGVzY3JpcHRpb24nXS52YWx1ZTtcbiAgICBjb25zdCBkdWVEYXRlID0gdGFza0Zvcm0uZWxlbWVudHNbJ2R1ZURhdGUnXS52YWx1ZTtcbiAgICBjb25zdCBwcmlvcml0eSA9IHRhc2tGb3JtLmVsZW1lbnRzWydwcmlvcml0eSddLnZhbHVlO1xuICAgIGNvbnN0IGNvbXBsZXRlZCA9IGZhbHNlO1xuXG4gICAgLy8gRmluZCB0aGUgcHJvamVjdCBvYmplY3Qgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZVxuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09IHByb2plY3ROYW1lKTtcbiAgXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHRhc2sgb2JqZWN0IHVzaW5nIHRoZSBUYXNrIG9iamVjdCBmYWN0b3J5XG4gICAgY29uc3QgdGFzayA9IFRhc2sodGl0bGUsIHByb2plY3ROYW1lLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNvbXBsZXRlZCk7XG5cbiAgICAvLyBTdG9yZSB0aGUgdGFzayBpbiB3ZWIgc3RvcmFnZVxuICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkodGFza3MpKTtcblxuICAgIC8vIEFkZCB0aGUgdGFzayB0byB0aGUgcHJvamVjdCBhbmQgc3RvcmUgaXQgaW4gd2ViIHN0b3JhZ2VcbiAgICBpZiAocHJvamVjdCkge1xuICAgICAgcHJvamVjdC50YXNrcy5wdXNoKHRhc2spO1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbiAgICB9XG4gIFxuICAgIC8vIENsZWFyIHRoZSBmb3JtIGZpZWxkc1xuICAgIHRhc2tGb3JtLnJlc2V0KCk7XG4gIH0pO1xuXG4gIC8vIEV4cG9ydCB0aGUgdGFza3MgYXJyYXlcbiAgZXhwb3J0IHsgdGFza3MgfTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
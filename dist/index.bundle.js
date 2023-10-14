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

// Display projects
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFtQztBQUNNOztBQUV6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLGtEQUFRO0FBQ2hDO0FBQ0Esd0VBQXdFLGFBQWE7O0FBRXJGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixrREFBUTtBQUNoQztBQUNBLDhFQUE4RSxhQUFhO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXlFLFdBQVc7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5RUFBeUUsV0FBVztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR3lCOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hIZ0I7QUFDRzs7QUFFN0MsMERBQVk7QUFDWix1REFBYzs7Ozs7Ozs7Ozs7Ozs7O0FDSmQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7O0FDN0N5Qzs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLGtEQUFRO0FBQzVCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELGtEQUFRO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLEVBQW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy90YXNrcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YXNrcyB9IGZyb20gJy4vdGFza3MuanMnO1xuaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcblxuLy9PcGVuIHRhc2tzIG1vZGFsXG5jb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLWJ1dHRvbicpO1xuY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbW9kYWwnKTtcblxuYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xufSk7XG5cbi8vQ2xvc2UgdGFza3MgbW9kYWxcbmNvbnN0IGNsb3NlVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idXR0b24nKTtcbmNsb3NlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoKSB7XG4gIC8vIEdldCB0aGUgcHJvamVjdCBzZWxlY3QgZWxlbWVudFxuICBjb25zdCBwcm9qZWN0U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Byb2plY3QnKTtcblxuICAvLyBMb29wIHRocm91Z2ggdGhlIHByb2plY3RzIGFycmF5XG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgIC8vIENoZWNrIGlmIGFuIG9wdGlvbiB3aXRoIHRoZSBwcm9qZWN0IG5hbWUgYWxyZWFkeSBleGlzdHNcbiAgICBjb25zdCBleGlzdGluZ09wdGlvbiA9IHByb2plY3RTZWxlY3QucXVlcnlTZWxlY3Rvcihgb3B0aW9uW3ZhbHVlPVwiJHtwcm9qZWN0Lm5hbWV9XCJdYCk7XG5cbiAgICAvLyBJZiBhbiBvcHRpb24gZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBhIG5ldyBvbmUgYW5kIGFkZCBpdCB0byB0aGUgcHJvamVjdCBzZWxlY3QgZWxlbWVudFxuICAgIGlmICghZXhpc3RpbmdPcHRpb24pIHtcbiAgICAgIGNvbnN0IHByb2plY3RPcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIHByb2plY3RPcHRpb24udmFsdWUgPSBwcm9qZWN0Lm5hbWU7XG4gICAgICBwcm9qZWN0T3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuICAgICAgcHJvamVjdFNlbGVjdC5hcHBlbmRDaGlsZChwcm9qZWN0T3B0aW9uKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIEdldCB0aGUgYWRkIHByb2plY3QgYnV0dG9uIGFuZCBwcm9qZWN0IG1vZGFsXG5jb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWJ1dHRvbicpO1xuY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbW9kYWwnKTtcblxuLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBhZGQgcHJvamVjdCBidXR0b24gdG8gb3BlbiB0aGUgcHJvamVjdCBtb2RhbFxuYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgcHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufSk7XG5cblxuLy9DbG9zZSBwcm9qZWN0bW9kYWxcbmNvbnN0IGNsb3NlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNsb3NlLWJ1dHRvbicpO1xuY2xvc2VQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBwcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuXG4vLyBEaXNwbGF5IHByb2plY3RzXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0cygpIHtcbiAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XG5cbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XG4gICAgLy8gQ2hlY2sgaWYgYSBwcm9qZWN0IGl0ZW0gd2l0aCB0aGUgcHJvamVjdCBuYW1lIGFscmVhZHkgZXhpc3RzXG4gICAgY29uc3QgZXhpc3RpbmdQcm9qZWN0SXRlbSA9IHByb2plY3RMaXN0LnF1ZXJ5U2VsZWN0b3IoYGxpW2RhdGEtcHJvamVjdD1cIiR7cHJvamVjdC5uYW1lfVwiXWApO1xuICBcbiAgICAvLyBJZiBhIHByb2plY3QgaXRlbSBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBwcm9qZWN0IGxpc3RcbiAgICBpZiAoIWV4aXN0aW5nUHJvamVjdEl0ZW0pIHtcbiAgICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIHByb2plY3RJdGVtLmRhdGFzZXQucHJvamVjdCA9IHByb2plY3QubmFtZTtcbiAgICAgIHByb2plY3RJdGVtLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xuICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xuICBcbiAgICAgIGNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgIHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHRhc2tMaXN0KTtcbiAgXG4gICAgICBmb3IgKGNvbnN0IHRhc2sgb2YgcHJvamVjdC50YXNrcykge1xuICAgICAgICAvLyBDaGVjayBpZiBhIHRhc2sgaXRlbSB3aXRoIHRoZSB0YXNrIHRpdGxlIGFscmVhZHkgZXhpc3RzXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nVGFza0l0ZW0gPSB0YXNrTGlzdC5xdWVyeVNlbGVjdG9yKGBsaVtkYXRhLXRhc2s9XCIke3Rhc2sudGl0bGV9XCJdYCk7XG4gIFxuICAgICAgICAvLyBJZiBhIHRhc2sgaXRlbSBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSB0YXNrIGxpc3RcbiAgICAgICAgaWYgKCFleGlzdGluZ1Rhc2tJdGVtKSB7XG4gICAgICAgICAgY29uc3QgdGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgIHRhc2tJdGVtLmRhdGFzZXQudGFzayA9IHRhc2sudGl0bGU7XG4gICAgICAgICAgdGFza0l0ZW0udGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xuICAgICAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tJdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJZiBhIHByb2plY3QgaXRlbSBhbHJlYWR5IGV4aXN0cywgdXBkYXRlIHRoZSB0YXNrIGxpc3RcbiAgICAgIGNvbnN0IHRhc2tMaXN0ID0gZXhpc3RpbmdQcm9qZWN0SXRlbS5xdWVyeVNlbGVjdG9yKCd1bCcpO1xuICBcbiAgICAgIGZvciAoY29uc3QgdGFzayBvZiBwcm9qZWN0LnRhc2tzKSB7XG4gICAgICAgIC8vIENoZWNrIGlmIGEgdGFzayBpdGVtIHdpdGggdGhlIHRhc2sgdGl0bGUgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgY29uc3QgZXhpc3RpbmdUYXNrSXRlbSA9IHRhc2tMaXN0LnF1ZXJ5U2VsZWN0b3IoYGxpW2RhdGEtdGFzaz1cIiR7dGFzay50aXRsZX1cIl1gKTtcbiAgXG4gICAgICAgIC8vIElmIGEgdGFzayBpdGVtIGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgYSBuZXcgb25lIGFuZCBhZGQgaXQgdG8gdGhlIHRhc2sgbGlzdFxuICAgICAgICBpZiAoIWV4aXN0aW5nVGFza0l0ZW0pIHtcbiAgICAgICAgICBjb25zdCB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgdGFza0l0ZW0uZGF0YXNldC50YXNrID0gdGFzay50aXRsZTtcbiAgICAgICAgICB0YXNrSXRlbS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XG4gICAgICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQodGFza0l0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwcm9qZWN0IGFuZCB0YXNrIGxpc3RzXG5jb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0nKTtcbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybScpO1xuXG50YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgXG4gIHVwZGF0ZVByb2plY3RzKCk7XG59KTtcblxucHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IFxuICB1cGRhdGVQcm9qZWN0cygpO1xufSk7XG5cblxuZXhwb3J0IHsgdXBkYXRlUHJvamVjdHMgfTtcblxuXG5cbiIsImltcG9ydCB7IHVwZGF0ZVByb2plY3RzIH0gZnJvbSBcIi4vZG9tLmpzXCI7XG5pbXBvcnQgeyBpbml0UHJvamVjdHMgfSBmcm9tIFwiLi9wcm9qZWN0cy5qc1wiO1xuXG5pbml0UHJvamVjdHMoKTtcbnVwZGF0ZVByb2plY3RzKCk7IiwiLy8gRGVmaW5lIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XG5mdW5jdGlvbiBQcm9qZWN0KG5hbWUsIHRhc2tzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICB0YXNrczogdGFza3NcbiAgICB9O1xufVxuXG4vLyBMb2FkIHByb2plY3RzIGZyb20gd2ViIHN0b3JhZ2VcbmxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpIHx8IFtdO1xuXG5mdW5jdGlvbiBpbml0UHJvamVjdHMoKSB7XG4gIC8vIENoZWNrIGlmIHRoZSBcIkRlZmF1bHRcIiBwcm9qZWN0IGFscmVhZHkgZXhpc3RzXG4gIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSAnRGVmYXVsdCcpO1xuXG4gIC8vIElmIHRoZSBcIkRlZmF1bHRcIiBwcm9qZWN0IGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgaXRcbiAgaWYgKCFkZWZhdWx0UHJvamVjdCkge1xuICAgIGNvbnN0IG5ld0RlZmF1bHRQcm9qZWN0ID0gUHJvamVjdCgnRGVmYXVsdCcsIFtdKTtcbiAgICBwcm9qZWN0cy5wdXNoKG5ld0RlZmF1bHRQcm9qZWN0KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuICB9XG59XG5cbi8vR2V0IHRoZSBwcm9qZWN0IGZvcm1cbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybScpO1xuXG4vL0FkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgcHJvamVjdCBmb3JtIHRvIGhhbmRsZSBmb3JtIHN1Ym1pc3Npb25zXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAvL1ByZXZlbnQgdGhlIGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uIGJlaGF2aW9yXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vR2V0IHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gZmllbGRzXG4gICAgY29uc3QgbmFtZSA9IHByb2plY3RGb3JtLmVsZW1lbnRzWydwcm9qZWN0TmFtZSddLnZhbHVlO1xuXG4gICAgLy9DcmVhdGUgYSBuZXcgcHJvamVjdCBvYmplY3QgdXNpbmcgdGhlIFByb2plY3Qgb2JqZWN0IGZhY3RvcnlcbiAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdChuYW1lLCBbXSk7XG5cbiAgICAvL1N0b3JlIHRoZSBwcm9qZWN0IGluIHdlYiBzdG9yYWdlXG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuXG4gICAgLy9DbGVhciB0aGUgZm9ybSBmaWVsZHNcbiAgICBwcm9qZWN0Rm9ybS5yZXNldCgpO1xufSk7XG5cbi8vIEV4cG9ydCB0aGUgcHJvamVjdHMgYXJyYXkgYW5kIHRoZSBjcmVhdGVQcm9qZWN0IGZ1bmN0aW9uXG5leHBvcnQgeyBpbml0UHJvamVjdHMsIHByb2plY3RzIH07IiwiaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tIFwiLi9wcm9qZWN0cy5qc1wiO1xuXG4vLyBEZWZpbmUgdGhlIFRhc2sgb2JqZWN0IGZhY3RvcnlcbmZ1bmN0aW9uIFRhc2sodGl0bGUsIHByb2plY3QsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xuICAgIHJldHVybiB7XG4gICAgICB0aXRsZTogdGl0bGUsXG4gICAgICBwcm9qZWN0OiBwcm9qZWN0LFxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgZHVlRGF0ZTogZHVlRGF0ZSxcbiAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcbiAgICAgIGNvbXBsZXRlZDogZmFsc2VcbiAgICB9O1xuICB9XG5cbiAgLy8gR2V0IHRoZSB0YXNrIGZvcm1cbiAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtJyk7XG5cbiAgLy8gTG9hZCB0YXNrcyBmcm9tIHdlYiBzdG9yYWdlXG4gIGxldCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpIHx8IFtdO1xuXG4gIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgdGFzayBmb3JtIHRvIGhhbmRsZSBmb3JtIHN1Ym1pc3Npb25zXG4gIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xuICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uIGJlaGF2aW9yXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgXG4gICAgLy8gR2V0IHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gZmllbGRzXG4gICAgY29uc3QgdGl0bGUgPSB0YXNrRm9ybS5lbGVtZW50c1sndGFza05hbWUnXS52YWx1ZTtcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRhc2tGb3JtLmVsZW1lbnRzWydwcm9qZWN0J10udmFsdWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB0YXNrRm9ybS5lbGVtZW50c1sndGFza0Rlc2NyaXB0aW9uJ10udmFsdWU7XG4gICAgY29uc3QgZHVlRGF0ZSA9IHRhc2tGb3JtLmVsZW1lbnRzWydkdWVEYXRlJ10udmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHkgPSB0YXNrRm9ybS5lbGVtZW50c1sncHJpb3JpdHknXS52YWx1ZTtcbiAgICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcblxuICAgIC8vIEZpbmQgdGhlIHByb2plY3Qgb2JqZWN0IHdpdGggdGhlIG1hdGNoaW5nIG5hbWVcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSBwcm9qZWN0TmFtZSk7XG4gIFxuICAgIC8vIENyZWF0ZSBhIG5ldyB0YXNrIG9iamVjdCB1c2luZyB0aGUgVGFzayBvYmplY3QgZmFjdG9yeVxuICAgIGNvbnN0IHRhc2sgPSBUYXNrKHRpdGxlLCBwcm9qZWN0TmFtZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZWQpO1xuXG4gICAgLy8gU3RvcmUgdGhlIHRhc2sgaW4gd2ViIHN0b3JhZ2VcbiAgICB0YXNrcy5wdXNoKHRhc2spO1xuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIEpTT04uc3RyaW5naWZ5KHRhc2tzKSk7XG5cbiAgICAvLyBBZGQgdGhlIHRhc2sgdG8gdGhlIHByb2plY3QgYW5kIHN0b3JlIGl0IGluIHdlYiBzdG9yYWdlXG4gICAgaWYgKHByb2plY3QpIHtcbiAgICAgIHByb2plY3QudGFza3MucHVzaCh0YXNrKTtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG4gICAgfVxuICBcbiAgICAvLyBDbGVhciB0aGUgZm9ybSBmaWVsZHNcbiAgICB0YXNrRm9ybS5yZXNldCgpO1xuICB9KTtcblxuICAvLyBFeHBvcnQgdGhlIHRhc2tzIGFycmF5XG4gIGV4cG9ydCB7IHRhc2tzIH07XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
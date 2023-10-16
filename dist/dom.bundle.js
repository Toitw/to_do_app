"use strict";
(self["webpackChunkto_do_app"] = self["webpackChunkto_do_app"] || []).push([["dom"],{

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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/dom.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBbUM7QUFDTTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtEQUFRO0FBQ2hDO0FBQ0Esd0VBQXdFLGFBQWE7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrREFBUTtBQUNoQztBQUNBLDhFQUE4RSxhQUFhO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXlFLFdBQVc7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RSxXQUFXO0FBQ3BGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDRDQUFLO0FBQ3RCO0FBQ0E7QUFDQSx3Q0FBd0MsYUFBYTtBQUNyRCxzQ0FBc0MsV0FBVztBQUNqRCw0Q0FBNEMsaUJBQWlCO0FBQzdELHdDQUF3QyxhQUFhO0FBQ3JELHlDQUF5QyxjQUFjO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDMEI7QUFDMUI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7OztBQzdDeUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQixrREFBUTtBQUM1QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxrREFBUTtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSxFQUFtQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy90YXNrcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YXNrcyB9IGZyb20gJy4vdGFza3MuanMnO1xyXG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xyXG5cclxuLy9PcGVuIHRhc2tzIG1vZGFsXHJcbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stYnV0dG9uJyk7XHJcbmNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLW1vZGFsJyk7XHJcblxyXG5hZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xyXG59KTtcclxuXHJcbi8vQ2xvc2UgdGFza3MgbW9kYWxcclxuY29uc3QgY2xvc2VUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLWJ1dHRvbicpO1xyXG5jbG9zZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoKSB7XHJcbiAgLy8gR2V0IHRoZSBwcm9qZWN0IHNlbGVjdCBlbGVtZW50XHJcbiAgY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XHJcblxyXG4gIC8vIExvb3AgdGhyb3VnaCB0aGUgcHJvamVjdHMgYXJyYXlcclxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgIC8vIENoZWNrIGlmIGFuIG9wdGlvbiB3aXRoIHRoZSBwcm9qZWN0IG5hbWUgYWxyZWFkeSBleGlzdHNcclxuICAgIGNvbnN0IGV4aXN0aW5nT3B0aW9uID0gcHJvamVjdFNlbGVjdC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke3Byb2plY3QubmFtZX1cIl1gKTtcclxuXHJcbiAgICAvLyBJZiBhbiBvcHRpb24gZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBhIG5ldyBvbmUgYW5kIGFkZCBpdCB0byB0aGUgcHJvamVjdCBzZWxlY3QgZWxlbWVudFxyXG4gICAgaWYgKCFleGlzdGluZ09wdGlvbikge1xyXG4gICAgICBjb25zdCBwcm9qZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgIHByb2plY3RPcHRpb24udmFsdWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgIHByb2plY3RPcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgIHByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQocHJvamVjdE9wdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbi8vIEdldCB0aGUgYWRkIHByb2plY3QgYnV0dG9uIGFuZCBwcm9qZWN0IG1vZGFsXHJcbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnV0dG9uJyk7XHJcbmNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LW1vZGFsJyk7XHJcblxyXG4vLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGFkZCBwcm9qZWN0IGJ1dHRvbiB0byBvcGVuIHRoZSBwcm9qZWN0IG1vZGFsXHJcbmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgcHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG59KTtcclxuXHJcblxyXG4vL0Nsb3NlIHByb2plY3Rtb2RhbFxyXG5jb25zdCBjbG9zZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jbG9zZS1idXR0b24nKTtcclxuY2xvc2VQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59KTtcclxuXHJcbi8vIERpc3BsYXkgcHJvamVjdHMvdGFza3Mgb24gdGhlIG1lbnVcclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdHMoKSB7XHJcbiAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XHJcblxyXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgLy8gQ2hlY2sgaWYgYSBwcm9qZWN0IGl0ZW0gd2l0aCB0aGUgcHJvamVjdCBuYW1lIGFscmVhZHkgZXhpc3RzXHJcbiAgICBjb25zdCBleGlzdGluZ1Byb2plY3RJdGVtID0gcHJvamVjdExpc3QucXVlcnlTZWxlY3RvcihgbGlbZGF0YS1wcm9qZWN0PVwiJHtwcm9qZWN0Lm5hbWV9XCJdYCk7XHJcbiAgXHJcbiAgICAvLyBJZiBhIHByb2plY3QgaXRlbSBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGEgbmV3IG9uZSBhbmQgYWRkIGl0IHRvIHRoZSBwcm9qZWN0IGxpc3RcclxuICAgIGlmICghZXhpc3RpbmdQcm9qZWN0SXRlbSkge1xyXG4gICAgICBjb25zdCBwcm9qZWN0SXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgIHByb2plY3RJdGVtLmRhdGFzZXQucHJvamVjdCA9IHByb2plY3QubmFtZTtcclxuICAgICAgcHJvamVjdEl0ZW0udGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcclxuICBcclxuICAgICAgY29uc3QgdGFza0xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xyXG4gICAgICBwcm9qZWN0SXRlbS5hcHBlbmRDaGlsZCh0YXNrTGlzdCk7XHJcbiAgXHJcbiAgICAgIGZvciAoY29uc3QgdGFzayBvZiBwcm9qZWN0LnRhc2tzKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgYSB0YXNrIGl0ZW0gd2l0aCB0aGUgdGFzayB0aXRsZSBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nVGFza0l0ZW0gPSB0YXNrTGlzdC5xdWVyeVNlbGVjdG9yKGBsaVtkYXRhLXRhc2s9XCIke3Rhc2sudGl0bGV9XCJdYCk7XHJcbiAgXHJcbiAgICAgICAgLy8gSWYgYSB0YXNrIGl0ZW0gZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBhIG5ldyBvbmUgYW5kIGFkZCBpdCB0byB0aGUgdGFzayBsaXN0XHJcbiAgICAgICAgaWYgKCFleGlzdGluZ1Rhc2tJdGVtKSB7XHJcbiAgICAgICAgICBjb25zdCB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICB0YXNrSXRlbS5jbGFzc0xpc3QuYWRkKCd0YXNrLWl0ZW0nKTtcclxuICAgICAgICAgIHRhc2tJdGVtLmRhdGFzZXQudGFzayA9IHRhc2sudGl0bGU7XHJcbiAgICAgICAgICB0YXNrSXRlbS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgICAgICAgICB0YXNrTGlzdC5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBJZiBhIHByb2plY3QgaXRlbSBhbHJlYWR5IGV4aXN0cywgdXBkYXRlIHRoZSB0YXNrIGxpc3RcclxuICAgICAgY29uc3QgdGFza0xpc3QgPSBleGlzdGluZ1Byb2plY3RJdGVtLnF1ZXJ5U2VsZWN0b3IoJ3VsJyk7XHJcbiAgXHJcbiAgICAgIGZvciAoY29uc3QgdGFzayBvZiBwcm9qZWN0LnRhc2tzKSB7XHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgYSB0YXNrIGl0ZW0gd2l0aCB0aGUgdGFzayB0aXRsZSBhbHJlYWR5IGV4aXN0c1xyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nVGFza0l0ZW0gPSB0YXNrTGlzdC5xdWVyeVNlbGVjdG9yKGBsaVtkYXRhLXRhc2s9XCIke3Rhc2sudGl0bGV9XCJdYCk7XHJcbiAgXHJcbiAgICAgICAgLy8gSWYgYSB0YXNrIGl0ZW0gZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBhIG5ldyBvbmUgYW5kIGFkZCBpdCB0byB0aGUgdGFzayBsaXN0XHJcbiAgICAgICAgaWYgKCFleGlzdGluZ1Rhc2tJdGVtKSB7XHJcbiAgICAgICAgICBjb25zdCB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgICAgICAgICB0YXNrSXRlbS5kYXRhc2V0LnRhc2sgPSB0YXNrLnRpdGxlO1xyXG4gICAgICAgICAgdGFza0l0ZW0udGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xyXG4gICAgICAgICAgdGFza0xpc3QuYXBwZW5kQ2hpbGQodGFza0l0ZW0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy9GdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByb2plY3QgYW5kIHRhc2sgbGlzdHNcclxuY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtJyk7XHJcbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybScpO1xyXG5cclxudGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgXHJcbiAgdXBkYXRlUHJvamVjdHMoKTtcclxufSk7XHJcblxyXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyBcclxuICB1cGRhdGVQcm9qZWN0cygpO1xyXG59KTtcclxuXHJcbi8vRGlzcGxheSB0YXNrIGRldGFpbHNcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZVRhc2tJdGVtRXZlbnRMaXN0ZW5lcih0YXNrSXRlbXMsIHRhc2tEZXRhaWxzUHJvamVjdCwgdGFza0RldGFpbHNUaXRsZSwgdGFza0RldGFpbHNEZXNjcmlwdGlvbiwgdGFza0RldGFpbHNEdWVEYXRlLCB0YXNrRGV0YWlsc1ByaW9yaXR5KSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvLyBHZXQgdGhlIHRhc2sgdGl0bGUgZnJvbSB0aGUgY2xpY2tlZCB0YXNrIGl0ZW0gZWxlbWVudFxyXG4gICAgY29uc3QgdGFza1RpdGxlID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQudGFzaztcclxuXHJcbiAgICAvLyBGaW5kIHRoZSB0YXNrIHdpdGggdGhlIG1hdGNoaW5nIHRpdGxlXHJcbiAgICBjb25zdCB0YXNrID0gdGFza3MuZmluZCgodGFzaykgPT4gdGFzay50aXRsZSA9PT0gdGFza1RpdGxlKTtcclxuXHJcbiAgICAvLyBVcGRhdGUgdGhlIHRhc2sgZGV0YWlscyB3aXRoIHRoZSB0YXNrIGluZm9ybWF0aW9uXHJcbiAgICB0YXNrRGV0YWlsc1Byb2plY3QudGV4dENvbnRlbnQgPSBgJHt0YXNrLnByb2plY3R9YDtcclxuICAgIHRhc2tEZXRhaWxzVGl0bGUudGV4dENvbnRlbnQgPSBgJHt0YXNrLnRpdGxlfWA7XHJcbiAgICB0YXNrRGV0YWlsc0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYCR7dGFzay5kZXNjcmlwdGlvbn1gO1xyXG4gICAgdGFza0RldGFpbHNEdWVEYXRlLnRleHRDb250ZW50ID0gYCR7dGFzay5kdWVEYXRlfWA7XHJcbiAgICB0YXNrRGV0YWlsc1ByaW9yaXR5LnRleHRDb250ZW50ID0gYCR7dGFzay5wcmlvcml0eX1gO1xyXG4gIH07XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgY29uc3QgdGFza0l0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhc2staXRlbScpO1xyXG4gIGNvbnN0IHRhc2tEZXRhaWxzUHJvamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtcHJvamVjdCcpO1xyXG4gIGNvbnN0IHRhc2tEZXRhaWxzVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLXRpdGxlJyk7XHJcbiAgY29uc3QgdGFza0RldGFpbHNEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtZGVzY3JpcHRpb24nKTtcclxuICBjb25zdCB0YXNrRGV0YWlsc0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLWR1ZS1kYXRlJyk7XHJcbiAgY29uc3QgdGFza0RldGFpbHNQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtcHJpb3JpdHknKTtcclxuXHJcbiAgY29uc3QgdGFza0l0ZW1FdmVudExpc3RlbmVyID0gY3JlYXRlVGFza0l0ZW1FdmVudExpc3RlbmVyKHRhc2tJdGVtcywgdGFza0RldGFpbHNQcm9qZWN0LCB0YXNrRGV0YWlsc1RpdGxlLCB0YXNrRGV0YWlsc0Rlc2NyaXB0aW9uLCB0YXNrRGV0YWlsc0R1ZURhdGUsIHRhc2tEZXRhaWxzUHJpb3JpdHkpO1xyXG5cclxuICB0YXNrSXRlbXMuZm9yRWFjaCgodGFza0l0ZW0pID0+IHtcclxuICAgIHRhc2tJdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGFza0l0ZW1FdmVudExpc3RlbmVyKTtcclxuICB9KTtcclxufSk7XHJcblxyXG4vL0NvbXBsZXRlIGEgdGFza1xyXG5cclxuXHJcbmV4cG9ydCB7IHVwZGF0ZVByb2plY3RzIH07XHJcblxyXG5cclxuXHJcbiIsIi8vIERlZmluZSB0aGUgUHJvamVjdCBvYmplY3QgZmFjdG9yeVxuZnVuY3Rpb24gUHJvamVjdChuYW1lLCB0YXNrcykge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgdGFza3M6IHRhc2tzXG4gICAgfTtcbn1cblxuLy8gTG9hZCBwcm9qZWN0cyBmcm9tIHdlYiBzdG9yYWdlXG5sZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKSB8fCBbXTtcblxuZnVuY3Rpb24gaW5pdFByb2plY3RzKCkge1xuICAvLyBDaGVjayBpZiB0aGUgXCJEZWZhdWx0XCIgcHJvamVjdCBhbHJlYWR5IGV4aXN0c1xuICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gJ0RlZmF1bHQnKTtcblxuICAvLyBJZiB0aGUgXCJEZWZhdWx0XCIgcHJvamVjdCBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGl0XG4gIGlmICghZGVmYXVsdFByb2plY3QpIHtcbiAgICBjb25zdCBuZXdEZWZhdWx0UHJvamVjdCA9IFByb2plY3QoJ0RlZmF1bHQnLCBbXSk7XG4gICAgcHJvamVjdHMucHVzaChuZXdEZWZhdWx0UHJvamVjdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbiAgfVxufVxuXG4vL0dldCB0aGUgcHJvamVjdCBmb3JtXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0nKTtcblxuLy9BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHByb2plY3QgZm9ybSB0byBoYW5kbGUgZm9ybSBzdWJtaXNzaW9uc1xucHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gICAgLy9QcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvL0dldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xuICAgIGNvbnN0IG5hbWUgPSBwcm9qZWN0Rm9ybS5lbGVtZW50c1sncHJvamVjdE5hbWUnXS52YWx1ZTtcblxuICAgIC8vQ3JlYXRlIGEgbmV3IHByb2plY3Qgb2JqZWN0IHVzaW5nIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XG4gICAgY29uc3QgcHJvamVjdCA9IFByb2plY3QobmFtZSwgW10pO1xuXG4gICAgLy9TdG9yZSB0aGUgcHJvamVjdCBpbiB3ZWIgc3RvcmFnZVxuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcblxuICAgIC8vQ2xlYXIgdGhlIGZvcm0gZmllbGRzXG4gICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbn0pO1xuXG4vLyBFeHBvcnQgdGhlIHByb2plY3RzIGFycmF5IGFuZCB0aGUgY3JlYXRlUHJvamVjdCBmdW5jdGlvblxuZXhwb3J0IHsgaW5pdFByb2plY3RzLCBwcm9qZWN0cyB9OyIsImltcG9ydCB7IHByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdHMuanNcIjtcblxuLy8gRGVmaW5lIHRoZSBUYXNrIG9iamVjdCBmYWN0b3J5XG5mdW5jdGlvbiBUYXNrKHRpdGxlLCBwcm9qZWN0LCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgcHJvamVjdDogcHJvamVjdCxcbiAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuXG4gIC8vIEdldCB0aGUgdGFzayBmb3JtXG4gIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybScpO1xuXG4gIC8vIExvYWQgdGFza3MgZnJvbSB3ZWIgc3RvcmFnZVxuICBsZXQgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKSB8fCBbXTtcblxuICAvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHRhc2sgZm9ybSB0byBoYW5kbGUgZm9ybSBzdWJtaXNzaW9uc1xuICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIFxuICAgIC8vIEdldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xuICAgIGNvbnN0IHRpdGxlID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tOYW1lJ10udmFsdWU7XG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSB0YXNrRm9ybS5lbGVtZW50c1sncHJvamVjdCddLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tEZXNjcmlwdGlvbiddLnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSB0YXNrRm9ybS5lbGVtZW50c1snZHVlRGF0ZSddLnZhbHVlO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gdGFza0Zvcm0uZWxlbWVudHNbJ3ByaW9yaXR5J10udmFsdWU7XG4gICAgY29uc3QgY29tcGxldGVkID0gZmFsc2U7XG5cbiAgICAvLyBGaW5kIHRoZSBwcm9qZWN0IG9iamVjdCB3aXRoIHRoZSBtYXRjaGluZyBuYW1lXG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gcHJvamVjdE5hbWUpO1xuICBcbiAgICAvLyBDcmVhdGUgYSBuZXcgdGFzayBvYmplY3QgdXNpbmcgdGhlIFRhc2sgb2JqZWN0IGZhY3RvcnlcbiAgICBjb25zdCB0YXNrID0gVGFzayh0aXRsZSwgcHJvamVjdE5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGVkKTtcblxuICAgIC8vIFN0b3JlIHRoZSB0YXNrIGluIHdlYiBzdG9yYWdlXG4gICAgdGFza3MucHVzaCh0YXNrKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza3MnLCBKU09OLnN0cmluZ2lmeSh0YXNrcykpO1xuXG4gICAgLy8gQWRkIHRoZSB0YXNrIHRvIHRoZSBwcm9qZWN0IGFuZCBzdG9yZSBpdCBpbiB3ZWIgc3RvcmFnZVxuICAgIGlmIChwcm9qZWN0KSB7XG4gICAgICBwcm9qZWN0LnRhc2tzLnB1c2godGFzayk7XG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xuICAgIH1cbiAgXG4gICAgLy8gQ2xlYXIgdGhlIGZvcm0gZmllbGRzXG4gICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgfSk7XG5cbiAgLy8gRXhwb3J0IHRoZSB0YXNrcyBhcnJheVxuICBleHBvcnQgeyB0YXNrcyB9O1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
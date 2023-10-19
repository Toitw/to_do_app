"use strict";
(self["webpackChunkto_do_app"] = self["webpackChunkto_do_app"] || []).push([["tasks"],{

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



let activeTask = null;

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
      if (task.completed != true) {
        console.log(task);
        addTaskToList(task, project);
      } else {
        continue;
      }
    }
  }
});

// Display task details
const projectList = document.querySelector('.project-list');
projectList.addEventListener('click', displayTaskDetails);

function displayTaskDetails(event) {
  if (event.target.classList.contains('task-item')) {
    const taskTitle = event.target.dataset.task;
    const taskProjectName = event.target.closest('[data-project]').dataset.project;
    const project = _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects.find((project) => project.name === taskProjectName);
    const task = project.tasks.find((task) => task.title === taskTitle);
    activeTask = task;
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
  // const taskItem = document.querySelector(`li[data-task="${activeTask.title}"]`);
  // taskItem.remove();
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
/* harmony export */   completeTask: () => (/* binding */ completeTask),
/* harmony export */   notCompletedTasks: () => (/* binding */ notCompletedTasks)
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
  });

  //Not completed tasks
  function notCompletedTasks() {
    return tasks.filter((task) => !task.completed);
  }

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

  // Export the tasks array
  



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/tasks.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQTZEO0FBQ3BCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtEQUFRO0FBQ2hDO0FBQ0Esd0VBQXdFLGFBQWE7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLGFBQWE7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGtEQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtEQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRSx1REFBWTtBQUNkO0FBQ0E7QUFDQSw4REFBOEQsaUJBQWlCO0FBQy9FO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3VEO0FBQ3ZEO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoSndEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx5REFBZ0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksbURBQVU7QUFDZCxDQUFDO0FBQ0Q7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckR5QztBQUNZO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrREFBUTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxrREFBUTtBQUM5RDtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNEQUFhO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1EQUFVO0FBQ2QsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBNkM7QUFDN0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvdGFza3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbm90Q29tcGxldGVkVGFza3MsIGNvbXBsZXRlVGFzayB9IGZyb20gJy4vdGFza3MuanMnO1xyXG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xyXG5cclxubGV0IGFjdGl2ZVRhc2sgPSBudWxsO1xyXG5cclxuLy9PcGVuIHRhc2tzIG1vZGFsXHJcbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stYnV0dG9uJyk7XHJcbmNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLW1vZGFsJyk7XHJcblxyXG5hZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xyXG59KTtcclxuXHJcbi8vQ2xvc2UgdGFza3MgbW9kYWxcclxuY29uc3QgY2xvc2VUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLWJ1dHRvbicpO1xyXG5jbG9zZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoKSB7XHJcbiAgLy8gR2V0IHRoZSBwcm9qZWN0IHNlbGVjdCBlbGVtZW50XHJcbiAgY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XHJcblxyXG4gIC8vIExvb3AgdGhyb3VnaCB0aGUgcHJvamVjdHMgYXJyYXlcclxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgIC8vIENoZWNrIGlmIGFuIG9wdGlvbiB3aXRoIHRoZSBwcm9qZWN0IG5hbWUgYWxyZWFkeSBleGlzdHNcclxuICAgIGNvbnN0IGV4aXN0aW5nT3B0aW9uID0gcHJvamVjdFNlbGVjdC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke3Byb2plY3QubmFtZX1cIl1gKTtcclxuXHJcbiAgICAvLyBJZiBhbiBvcHRpb24gZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBhIG5ldyBvbmUgYW5kIGFkZCBpdCB0byB0aGUgcHJvamVjdCBzZWxlY3QgZWxlbWVudFxyXG4gICAgaWYgKCFleGlzdGluZ09wdGlvbikge1xyXG4gICAgICBjb25zdCBwcm9qZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgIHByb2plY3RPcHRpb24udmFsdWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgIHByb2plY3RPcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgIHByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQocHJvamVjdE9wdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbi8vIEdldCB0aGUgYWRkIHByb2plY3QgYnV0dG9uIGFuZCBwcm9qZWN0IG1vZGFsXHJcbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnV0dG9uJyk7XHJcbmNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LW1vZGFsJyk7XHJcblxyXG4vLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGFkZCBwcm9qZWN0IGJ1dHRvbiB0byBvcGVuIHRoZSBwcm9qZWN0IG1vZGFsXHJcbmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgcHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG59KTtcclxuXHJcblxyXG4vL0Nsb3NlIHByb2plY3Rtb2RhbFxyXG5mdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gIHByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59XHJcblxyXG5jb25zdCBjbG9zZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jbG9zZS1idXR0b24nKTtcclxuY2xvc2VQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNsb3NlTW9kYWwoKTtcclxufSk7XHJcblxyXG4vL0FkZCBwcm9qZWN0IHRvIHRoZSBwcm9qZWN0IGxpc3RcclxuZnVuY3Rpb24gYWRkUHJvamVjdFRvTGlzdChwcm9qZWN0KSB7XHJcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XHJcbiAgY29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gIHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaXRlbScpO1xyXG4gIHByb2plY3RJdGVtLmRhdGFzZXQucHJvamVjdCA9IHByb2plY3ROYW1lO1xyXG4gIHByb2plY3RJdGVtLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XHJcbiAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xyXG59XHJcblxyXG4vL0FkZCB0YXNrIHRvIHRoZSB0YXNrIGxpc3RcclxuZnVuY3Rpb24gYWRkVGFza1RvTGlzdCh0YXNrLCBwcm9qZWN0KSB7XHJcbiAgY29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaVtkYXRhLXByb2plY3Q9XCIke3Byb2plY3QubmFtZX1cIl1gKTtcclxuICBjb25zdCB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1pdGVtJyk7XHJcbiAgdGFza0l0ZW0uZGF0YXNldC50YXNrID0gdGFzay50aXRsZTtcclxuICB0YXNrSXRlbS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgcHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQodGFza0l0ZW0pO1xyXG59XHJcblxyXG4vL0Rpc3BsYXkgcHJvamVjdC90YXNrIGxpc3Qgb24gdGhlIG1lbnVcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XHJcbiAgICBhZGRQcm9qZWN0VG9MaXN0KHByb2plY3QpO1xyXG4gICAgZm9yIChjb25zdCB0YXNrIG9mIHByb2plY3QudGFza3MpIHtcclxuICAgICAgaWYgKHRhc2suY29tcGxldGVkICE9IHRydWUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0YXNrKTtcclxuICAgICAgICBhZGRUYXNrVG9MaXN0KHRhc2ssIHByb2plY3QpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIERpc3BsYXkgdGFzayBkZXRhaWxzXHJcbmNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGlzdCcpO1xyXG5wcm9qZWN0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXlUYXNrRGV0YWlscyk7XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VGFza0RldGFpbHMoZXZlbnQpIHtcclxuICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFzay1pdGVtJykpIHtcclxuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnRhc2s7XHJcbiAgICBjb25zdCB0YXNrUHJvamVjdE5hbWUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcHJvamVjdF0nKS5kYXRhc2V0LnByb2plY3Q7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSB0YXNrUHJvamVjdE5hbWUpO1xyXG4gICAgY29uc3QgdGFzayA9IHByb2plY3QudGFza3MuZmluZCgodGFzaykgPT4gdGFzay50aXRsZSA9PT0gdGFza1RpdGxlKTtcclxuICAgIGFjdGl2ZVRhc2sgPSB0YXNrO1xyXG4gICAgdXBkYXRlVGFza0RldGFpbHModGFzayk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUYXNrRGV0YWlscyh0YXNrKSB7XHJcbiAgY29uc3QgdGFza1Byb2plY3ROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1wcm9qZWN0Jyk7XHJcbiAgdGFza1Byb2plY3ROYW1lLnRleHRDb250ZW50ID0gdGFzay5wcm9qZWN0O1xyXG4gIGNvbnN0IHRhc2tUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLXRpdGxlJyk7XHJcbiAgdGFza1RpdGxlRWxlbWVudC50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1kZXNjcmlwdGlvbicpO1xyXG4gIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRhc2suZGVzY3JpcHRpb247XHJcbiAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLWR1ZS1kYXRlJyk7XHJcbiAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSB0YXNrLmR1ZURhdGU7XHJcbiAgY29uc3QgdGFza1ByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1wcmlvcml0eScpO1xyXG4gIHRhc2tQcmlvcml0eS50ZXh0Q29udGVudCA9IHRhc2sucHJpb3JpdHk7XHJcbn1cclxuXHJcbi8vQ29tcGxldGUgdGFza1xyXG5jb25zdCBjb21wbGV0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcGxldGUtdGFzay1idXR0b24nKTtcclxuY29tcGxldGVUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNvbXBsZXRlVGFzayhhY3RpdmVUYXNrKTtcclxuICB1cGRhdGVUYXNrRGV0YWlscyhhY3RpdmVUYXNrKTtcclxuICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAvLyBjb25zdCB0YXNrSXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYGxpW2RhdGEtdGFzaz1cIiR7YWN0aXZlVGFzay50aXRsZX1cIl1gKTtcclxuICAvLyB0YXNrSXRlbS5yZW1vdmUoKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBhZGRUYXNrVG9MaXN0LCBjbG9zZU1vZGFsIH07XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIGNsb3NlTW9kYWwgfSBmcm9tICcuL2RvbS5qcyc7XHJcblxyXG4vLyBEZWZpbmUgdGhlIFByb2plY3Qgb2JqZWN0IGZhY3RvcnlcclxuZnVuY3Rpb24gUHJvamVjdChuYW1lLCB0YXNrcykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgdGFza3M6IHRhc2tzXHJcbiAgICB9O1xyXG59XHJcblxyXG4vLyBMb2FkIHByb2plY3RzIGZyb20gd2ViIHN0b3JhZ2VcclxubGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgfHwgW107XHJcblxyXG5mdW5jdGlvbiBpbml0UHJvamVjdHMoKSB7XHJcbiAgLy8gQ2hlY2sgaWYgdGhlIFwiRGVmYXVsdFwiIHByb2plY3QgYWxyZWFkeSBleGlzdHNcclxuICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gJ0RlZmF1bHQnKTtcclxuXHJcbiAgLy8gSWYgdGhlIFwiRGVmYXVsdFwiIHByb2plY3QgZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBpdFxyXG4gIGlmICghZGVmYXVsdFByb2plY3QpIHtcclxuICAgIGNvbnN0IG5ld0RlZmF1bHRQcm9qZWN0ID0gUHJvamVjdCgnRGVmYXVsdCcsIFtdKTtcclxuICAgIHByb2plY3RzLnB1c2gobmV3RGVmYXVsdFByb2plY3QpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICB9XHJcbn1cclxuXHJcbi8vR2V0IHRoZSBwcm9qZWN0IGZvcm1cclxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XHJcblxyXG4vL0FkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgcHJvamVjdCBmb3JtIHRvIGhhbmRsZSBmb3JtIHN1Ym1pc3Npb25zXHJcbnByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xyXG4gICAgLy9QcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvL0dldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgY29uc3QgbmFtZSA9IHByb2plY3RGb3JtLmVsZW1lbnRzWydwcm9qZWN0TmFtZSddLnZhbHVlO1xyXG5cclxuICAgIC8vQ3JlYXRlIGEgbmV3IHByb2plY3Qgb2JqZWN0IHVzaW5nIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gUHJvamVjdChuYW1lLCBbXSk7XHJcblxyXG4gICAgLy9TdG9yZSB0aGUgcHJvamVjdCBpbiB3ZWIgc3RvcmFnZVxyXG4gICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcblxyXG4gICAgLy9BZGQgdGhlIHByb2plY3QgdG8gdGhlIHByb2plY3QgbGlzdFxyXG4gICAgYWRkUHJvamVjdFRvTGlzdChwcm9qZWN0KTtcclxuXHJcbiAgICAvL0NsZWFyIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcclxuXHJcbiAgICAvL0Nsb3NlIHRoZSBmb3JtXHJcbiAgICBjbG9zZU1vZGFsKCk7XHJcbn0pO1xyXG5cclxuLy8gRXhwb3J0IHRoZSBwcm9qZWN0cyBhcnJheSBhbmQgdGhlIGNyZWF0ZVByb2plY3QgZnVuY3Rpb25cclxuZXhwb3J0IHsgaW5pdFByb2plY3RzLCBwcm9qZWN0cyB9OyIsImltcG9ydCB7IHByb2plY3RzIH0gZnJvbSBcIi4vcHJvamVjdHMuanNcIjtcclxuaW1wb3J0IHsgYWRkVGFza1RvTGlzdCwgY2xvc2VNb2RhbCB9IGZyb20gXCIuL2RvbS5qc1wiO1xyXG5cclxuLy8gRGVmaW5lIHRoZSBUYXNrIG9iamVjdCBmYWN0b3J5XHJcbmZ1bmN0aW9uIFRhc2sodGl0bGUsIHByb2plY3QsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICBwcm9qZWN0OiBwcm9qZWN0LFxyXG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXHJcbiAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXHJcbiAgICAgIHByaW9yaXR5OiBwcmlvcml0eSxcclxuICAgICAgY29tcGxldGVkOiBmYWxzZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIC8vIEdldCB0aGUgdGFzayBmb3JtXHJcbiAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtJyk7XHJcblxyXG4gIC8vIExvYWQgdGFza3MgZnJvbSB3ZWIgc3RvcmFnZVxyXG4gIGxldCB0YXNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpIHx8IFtdO1xyXG5cclxuICAvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHRhc2sgZm9ybSB0byBoYW5kbGUgZm9ybSBzdWJtaXNzaW9uc1xyXG4gIHRhc2tGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xyXG4gICAgLy8gUHJldmVudCB0aGUgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb24gYmVoYXZpb3JcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgXHJcbiAgICAvLyBHZXQgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybSBmaWVsZHNcclxuICAgIGNvbnN0IHRpdGxlID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tOYW1lJ10udmFsdWU7XHJcbiAgICBjb25zdCBwcm9qZWN0TmFtZSA9IHRhc2tGb3JtLmVsZW1lbnRzWydwcm9qZWN0J10udmFsdWU7XHJcbiAgICBjb25zdCBkZXNjcmlwdGlvbiA9IHRhc2tGb3JtLmVsZW1lbnRzWyd0YXNrRGVzY3JpcHRpb24nXS52YWx1ZTtcclxuICAgIGNvbnN0IGR1ZURhdGUgPSB0YXNrRm9ybS5lbGVtZW50c1snZHVlRGF0ZSddLnZhbHVlO1xyXG4gICAgY29uc3QgcHJpb3JpdHkgPSB0YXNrRm9ybS5lbGVtZW50c1sncHJpb3JpdHknXS52YWx1ZTtcclxuICAgIGNvbnN0IGNvbXBsZXRlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vIEZpbmQgdGhlIHByb2plY3Qgb2JqZWN0IHdpdGggdGhlIG1hdGNoaW5nIG5hbWVcclxuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09IHByb2plY3ROYW1lKTtcclxuICBcclxuICAgIC8vIENyZWF0ZSBhIG5ldyB0YXNrIG9iamVjdCB1c2luZyB0aGUgVGFzayBvYmplY3QgZmFjdG9yeVxyXG4gICAgY29uc3QgdGFzayA9IFRhc2sodGl0bGUsIHByb2plY3ROYW1lLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNvbXBsZXRlZCk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSB0YXNrIHRvIHRoZSBwcm9qZWN0IGFuZCBzdG9yZSBpdCBpbiB3ZWIgc3RvcmFnZVxyXG4gICAgaWYgKHByb2plY3QpIHtcclxuICAgICAgcHJvamVjdC50YXNrcy5wdXNoKHRhc2spO1xyXG4gICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCB0aGUgdGFzayB0byB0aGUgdGFzayBsaXN0XHJcbiAgICBhZGRUYXNrVG9MaXN0KHRhc2ssIHByb2plY3QpO1xyXG4gIFxyXG4gICAgLy8gQ2xlYXIgdGhlIGZvcm0gZmllbGRzXHJcbiAgICB0YXNrRm9ybS5yZXNldCgpO1xyXG5cclxuICAgIC8vIENsb3NlIHRoZSBmb3JtXHJcbiAgICBjbG9zZU1vZGFsKCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vTm90IGNvbXBsZXRlZCB0YXNrc1xyXG4gIGZ1bmN0aW9uIG5vdENvbXBsZXRlZFRhc2tzKCkge1xyXG4gICAgcmV0dXJuIHRhc2tzLmZpbHRlcigodGFzaykgPT4gIXRhc2suY29tcGxldGVkKTtcclxuICB9XHJcblxyXG4gIC8vQ29tcGxldGUgdGFza1xyXG4gIGZ1bmN0aW9uIGNvbXBsZXRlVGFzayh0YXNrKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xyXG4gICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XHJcbiAgICAgIGNvbnN0IHRhc2tzID0gcHJvamVjdC50YXNrcztcclxuICAgICAgZm9yIChjb25zdCB0IG9mIHRhc2tzKSB7XHJcbiAgICAgICAgaWYgKHQudGl0bGUgPT09IHRhc2sudGl0bGUgJiYgdC5wcm9qZWN0TmFtZSA9PT0gdGFzay5wcm9qZWN0TmFtZSkge1xyXG4gICAgICAgICAgdC5jb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEV4cG9ydCB0aGUgdGFza3MgYXJyYXlcclxuICBleHBvcnQgeyBub3RDb21wbGV0ZWRUYXNrcywgY29tcGxldGVUYXNrIH07XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
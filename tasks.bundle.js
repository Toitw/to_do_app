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
  



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/tasks.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBc0M7QUFDdEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvdGFza3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcGxldGVUYXNrLCBkZWxldGVUYXNrIH0gZnJvbSAnLi90YXNrcy5qcyc7XHJcbmltcG9ydCB7IHByb2plY3RzIH0gZnJvbSAnLi9wcm9qZWN0cy5qcyc7XHJcblxyXG5sZXQgYWN0aXZlVGFzayA9IG51bGw7XHJcblxyXG5cclxuLy9PcGVuIHRhc2tzIG1vZGFsXHJcbmNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXRhc2stYnV0dG9uJyk7XHJcbmNvbnN0IHRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLW1vZGFsJyk7XHJcblxyXG5hZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB1cGRhdGVQcm9qZWN0TGlzdCgpO1xyXG59KTtcclxuXHJcbi8vQ2xvc2UgdGFza3MgbW9kYWxcclxuY29uc3QgY2xvc2VUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlLWJ1dHRvbicpO1xyXG5jbG9zZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbn0pO1xyXG5cclxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdExpc3QoKSB7XHJcbiAgLy8gR2V0IHRoZSBwcm9qZWN0IHNlbGVjdCBlbGVtZW50XHJcbiAgY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XHJcblxyXG4gIC8vIExvb3AgdGhyb3VnaCB0aGUgcHJvamVjdHMgYXJyYXlcclxuICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgIC8vIENoZWNrIGlmIGFuIG9wdGlvbiB3aXRoIHRoZSBwcm9qZWN0IG5hbWUgYWxyZWFkeSBleGlzdHNcclxuICAgIGNvbnN0IGV4aXN0aW5nT3B0aW9uID0gcHJvamVjdFNlbGVjdC5xdWVyeVNlbGVjdG9yKGBvcHRpb25bdmFsdWU9XCIke3Byb2plY3QubmFtZX1cIl1gKTtcclxuXHJcbiAgICAvLyBJZiBhbiBvcHRpb24gZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBhIG5ldyBvbmUgYW5kIGFkZCBpdCB0byB0aGUgcHJvamVjdCBzZWxlY3QgZWxlbWVudFxyXG4gICAgaWYgKCFleGlzdGluZ09wdGlvbikge1xyXG4gICAgICBjb25zdCBwcm9qZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XHJcbiAgICAgIHByb2plY3RPcHRpb24udmFsdWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgIHByb2plY3RPcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgICAgIHByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQocHJvamVjdE9wdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5cclxuXHJcbi8vIEdldCB0aGUgYWRkIHByb2plY3QgYnV0dG9uIGFuZCBwcm9qZWN0IG1vZGFsXHJcbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLXByb2plY3QtYnV0dG9uJyk7XHJcbmNvbnN0IHByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LW1vZGFsJyk7XHJcblxyXG4vLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGFkZCBwcm9qZWN0IGJ1dHRvbiB0byBvcGVuIHRoZSBwcm9qZWN0IG1vZGFsXHJcbmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgcHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG59KTtcclxuXHJcblxyXG4vL0Nsb3NlIHByb2plY3Rtb2RhbFxyXG5mdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gIHByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59XHJcblxyXG5jb25zdCBjbG9zZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1jbG9zZS1idXR0b24nKTtcclxuY2xvc2VQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGNsb3NlTW9kYWwoKTtcclxufSk7XHJcblxyXG4vL0FkZCBwcm9qZWN0IHRvIHRoZSBwcm9qZWN0IGxpc3RcclxuZnVuY3Rpb24gYWRkUHJvamVjdFRvTGlzdChwcm9qZWN0KSB7XHJcbiAgY29uc3QgcHJvamVjdE5hbWUgPSBwcm9qZWN0Lm5hbWU7XHJcbiAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XHJcbiAgY29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gIHByb2plY3RJdGVtLmNsYXNzTGlzdC5hZGQoJ3Byb2plY3QtaXRlbScpO1xyXG4gIHByb2plY3RJdGVtLmRhdGFzZXQucHJvamVjdCA9IHByb2plY3ROYW1lO1xyXG4gIHByb2plY3RJdGVtLnRleHRDb250ZW50ID0gcHJvamVjdE5hbWU7XHJcbiAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQocHJvamVjdEl0ZW0pO1xyXG59XHJcblxyXG4vL0FkZCB0YXNrIHRvIHRoZSB0YXNrIGxpc3RcclxuZnVuY3Rpb24gYWRkVGFza1RvTGlzdCh0YXNrLCBwcm9qZWN0KSB7XHJcbiAgY29uc3QgcHJvamVjdEl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBsaVtkYXRhLXByb2plY3Q9XCIke3Byb2plY3QubmFtZX1cIl1gKTtcclxuICBjb25zdCB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcbiAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1pdGVtJyk7XHJcbiAgdGFza0l0ZW0uZGF0YXNldC50YXNrID0gdGFzay50aXRsZTtcclxuICB0YXNrSXRlbS50ZXh0Q29udGVudCA9IHRhc2sudGl0bGU7XHJcbiAgcHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQodGFza0l0ZW0pO1xyXG59XHJcblxyXG4vLyBJbml0aWFsaXplIHNob3dDb21wbGV0ZWQgdmFyaWFibGUgZnJvbSBsb2NhbCBzdG9yYWdlIG9yIGRlZmF1bHQgdG8gZmFsc2VcclxubGV0IHNob3dDb21wbGV0ZWQgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdzaG93Q29tcGxldGVkJykpIHx8IGZhbHNlO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XHJcbiAgICBhZGRQcm9qZWN0VG9MaXN0KHByb2plY3QpO1xyXG4gICAgZm9yIChjb25zdCB0YXNrIG9mIHByb2plY3QudGFza3MpIHtcclxuICAgICAgaWYgKHNob3dDb21wbGV0ZWQpIHtcclxuICAgICAgICBhZGRUYXNrVG9MaXN0KHRhc2ssIHByb2plY3QpO1xyXG4gICAgICB9IGVsc2UgaWYgKCF0YXNrLmNvbXBsZXRlZCAmJiAhc2hvd0NvbXBsZXRlZCkge1xyXG4gICAgICAgIGFkZFRhc2tUb0xpc3QodGFzaywgcHJvamVjdCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuLy8gRGlzcGxheSB0YXNrIGRldGFpbHNcclxuY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1saXN0Jyk7XHJcbnByb2plY3RMaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGlzcGxheVRhc2tEZXRhaWxzKTtcclxuXHJcbmZ1bmN0aW9uIGRpc3BsYXlUYXNrRGV0YWlscyhldmVudCkge1xyXG4gIGNvbnN0IGNvbXBsZXRlZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29tcGxldGUtdGFzay1idXR0b24nKTtcclxuICBjb25zdCBkZWxldGVUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlbGV0ZS10YXNrLWJ1dHRvbicpO1xyXG4gIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCd0YXNrLWl0ZW0nKSkge1xyXG4gICAgY29uc3QgdGFza1RpdGxlID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQudGFzaztcclxuICAgIGNvbnN0IHRhc2tQcm9qZWN0TmFtZSA9IGV2ZW50LnRhcmdldC5jbG9zZXN0KCdbZGF0YS1wcm9qZWN0XScpLmRhdGFzZXQucHJvamVjdDtcclxuICAgIGNvbnN0IHByb2plY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09IHRhc2tQcm9qZWN0TmFtZSk7XHJcbiAgICBjb25zdCB0YXNrID0gcHJvamVjdC50YXNrcy5maW5kKCh0YXNrKSA9PiB0YXNrLnRpdGxlID09PSB0YXNrVGl0bGUpO1xyXG4gICAgYWN0aXZlVGFzayA9IHRhc2s7XHJcbiAgICBjb21wbGV0ZWRUYXNrQnV0dG9uLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgZGVsZXRlVGFza0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIHVwZGF0ZVRhc2tEZXRhaWxzKHRhc2spO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlVGFza0RldGFpbHModGFzaykge1xyXG4gIGNvbnN0IHRhc2tQcm9qZWN0TmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtcHJvamVjdCcpO1xyXG4gIHRhc2tQcm9qZWN0TmFtZS50ZXh0Q29udGVudCA9IHRhc2sucHJvamVjdDtcclxuICBjb25zdCB0YXNrVGl0bGVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy10aXRsZScpO1xyXG4gIHRhc2tUaXRsZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xyXG4gIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtZGVzY3JpcHRpb24nKTtcclxuICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSB0YXNrLmRlc2NyaXB0aW9uO1xyXG4gIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Rhc2stZGV0YWlscy1kdWUtZGF0ZScpO1xyXG4gIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gdGFzay5kdWVEYXRlO1xyXG4gIGNvbnN0IHRhc2tQcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtcHJpb3JpdHknKTtcclxuICB0YXNrUHJpb3JpdHkudGV4dENvbnRlbnQgPSB0YXNrLnByaW9yaXR5O1xyXG59XHJcblxyXG4vL0NvbXBsZXRlIHRhc2tcclxuY29uc3QgY29tcGxldGVUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXBsZXRlLXRhc2stYnV0dG9uJyk7XHJcbmNvbXBsZXRlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb21wbGV0ZVRhc2soYWN0aXZlVGFzayk7XHJcbiAgdXBkYXRlVGFza0RldGFpbHMoYWN0aXZlVGFzayk7XHJcbiAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbn0pO1xyXG5cclxuLy9TaG93IGNvbXBsZXRlZCB0YXNrc1xyXG5jb25zdCBzaG93Q29tcGxldGVkQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNob3ctY29tcGxldGVkLWJ1dHRvbicpO1xyXG5zaG93Q29tcGxldGVkQnV0dG9uLnRleHRDb250ZW50ID0gc2hvd0NvbXBsZXRlZCA/ICdIaWRlIGNvbXBsZXRlZCcgOiAnU2hvdyBjb21wbGV0ZWQnO1xyXG5zaG93Q29tcGxldGVkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHNob3dDb21wbGV0ZWQgPSAhc2hvd0NvbXBsZXRlZDtcclxuICBzaG93Q29tcGxldGVkQnV0dG9uLnRleHRDb250ZW50ID0gc2hvd0NvbXBsZXRlZCA/ICdIaWRlIGNvbXBsZXRlZCcgOiAnU2hvdyBjb21wbGV0ZWQnO1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdzaG93Q29tcGxldGVkJywgSlNPTi5zdHJpbmdpZnkoc2hvd0NvbXBsZXRlZCkpO1xyXG4gIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG59KTtcclxuXHJcbi8vRGVsZXRlIHRhc2tcclxuY29uc3QgZGVsZXRlVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtdGFzay1idXR0b24nKTtcclxuZGVsZXRlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBkZWxldGVUYXNrKGFjdGl2ZVRhc2spO1xyXG4gIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG59KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5leHBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBhZGRUYXNrVG9MaXN0LCBjbG9zZU1vZGFsIH07XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCB7IGFkZFByb2plY3RUb0xpc3QsIGNsb3NlTW9kYWwgfSBmcm9tICcuL2RvbS5qcyc7XHJcblxyXG4vLyBEZWZpbmUgdGhlIFByb2plY3Qgb2JqZWN0IGZhY3RvcnlcclxuZnVuY3Rpb24gUHJvamVjdChuYW1lLCB0YXNrcykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgdGFza3M6IHRhc2tzXHJcbiAgICB9O1xyXG59XHJcblxyXG4vLyBMb2FkIHByb2plY3RzIGZyb20gd2ViIHN0b3JhZ2VcclxubGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSkgfHwgW107XHJcblxyXG5mdW5jdGlvbiBpbml0UHJvamVjdHMoKSB7XHJcbiAgLy8gQ2hlY2sgaWYgdGhlIFwiRGVmYXVsdFwiIHByb2plY3QgYWxyZWFkeSBleGlzdHNcclxuICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gJ0RlZmF1bHQnKTtcclxuXHJcbiAgLy8gSWYgdGhlIFwiRGVmYXVsdFwiIHByb2plY3QgZG9lcyBub3QgZXhpc3QsIGNyZWF0ZSBpdFxyXG4gIGlmICghZGVmYXVsdFByb2plY3QpIHtcclxuICAgIGNvbnN0IG5ld0RlZmF1bHRQcm9qZWN0ID0gUHJvamVjdCgnRGVmYXVsdCcsIFtdKTtcclxuICAgIHByb2plY3RzLnB1c2gobmV3RGVmYXVsdFByb2plY3QpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICB9XHJcbn1cclxuXHJcbi8vR2V0IHRoZSBwcm9qZWN0IGZvcm1cclxuY29uc3QgcHJvamVjdEZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1mb3JtJyk7XHJcblxyXG4vL0FkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgcHJvamVjdCBmb3JtIHRvIGhhbmRsZSBmb3JtIHN1Ym1pc3Npb25zXHJcbnByb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudCkgPT4ge1xyXG4gICAgLy9QcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAvL0dldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgY29uc3QgbmFtZSA9IHByb2plY3RGb3JtLmVsZW1lbnRzWydwcm9qZWN0TmFtZSddLnZhbHVlO1xyXG4gICAgLy8gQ2hlY2sgaWYgYSBwcm9qZWN0IHdpdGggdGhlIHNhbWUgbmFtZSBhbHJlYWR5IGV4aXN0c1xyXG4gICAgY29uc3QgZXhpc3RpbmdQcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocCkgPT4gcC5uYW1lID09PSBuYW1lKTtcclxuICAgIGlmIChleGlzdGluZ1Byb2plY3QpIHtcclxuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gYEEgcHJvamVjdCB3aXRoIHRoZSBuYW1lIFwiJHtuYW1lfVwiIGFscmVhZHkgZXhpc3RzLmA7XHJcbiAgICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gZXJyb3JNZXNzYWdlO1xyXG4gICAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1uYW1lLWVycm9yLW1lc3NhZ2UnKTtcclxuICAgICAgcHJvamVjdEZvcm0uYXBwZW5kQ2hpbGQoZXJyb3JFbGVtZW50KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vQ3JlYXRlIGEgbmV3IHByb2plY3Qgb2JqZWN0IHVzaW5nIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XHJcbiAgICAgIGNvbnN0IHByb2plY3QgPSBQcm9qZWN0KG5hbWUsIFtdKTtcclxuXHJcbiAgICAgIC8vU3RvcmUgdGhlIHByb2plY3QgaW4gd2ViIHN0b3JhZ2VcclxuICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuXHJcbiAgICAgIC8vQWRkIHRoZSBwcm9qZWN0IHRvIHRoZSBwcm9qZWN0IGxpc3RcclxuICAgICAgYWRkUHJvamVjdFRvTGlzdChwcm9qZWN0KTtcclxuXHJcbiAgICAgIC8vQ2xlYXIgdGhlIGZvcm0gZmllbGRzXHJcbiAgICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XHJcblxyXG4gICAgICAvL0Nsb3NlIHRoZSBmb3JtXHJcbiAgICAgIGNsb3NlTW9kYWwoKTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vLyBFeHBvcnQgdGhlIHByb2plY3RzIGFycmF5IGFuZCB0aGUgY3JlYXRlUHJvamVjdCBmdW5jdGlvblxyXG5leHBvcnQgeyBpbml0UHJvamVjdHMsIHByb2plY3RzIH07IiwiaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tIFwiLi9wcm9qZWN0cy5qc1wiO1xyXG5pbXBvcnQgeyBhZGRUYXNrVG9MaXN0LCBjbG9zZU1vZGFsIH0gZnJvbSBcIi4vZG9tLmpzXCI7XHJcblxyXG4vLyBEZWZpbmUgdGhlIFRhc2sgb2JqZWN0IGZhY3RvcnlcclxuZnVuY3Rpb24gVGFzayh0aXRsZSwgcHJvamVjdCwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIHByb2plY3Q6IHByb2plY3QsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcclxuICAgICAgZHVlRGF0ZTogZHVlRGF0ZSxcclxuICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxyXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgLy8gR2V0IHRoZSB0YXNrIGZvcm1cclxuICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0nKTtcclxuXHJcbiAgLy8gTG9hZCB0YXNrcyBmcm9tIHdlYiBzdG9yYWdlXHJcbiAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSkgfHwgW107XHJcblxyXG4gIC8vIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGUgdGFzayBmb3JtIHRvIGhhbmRsZSBmb3JtIHN1Ym1pc3Npb25zXHJcbiAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XHJcbiAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICBcclxuICAgIC8vIEdldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgY29uc3QgdGl0bGUgPSB0YXNrRm9ybS5lbGVtZW50c1sndGFza05hbWUnXS52YWx1ZTtcclxuICAgIGNvbnN0IHByb2plY3ROYW1lID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Byb2plY3QnXS52YWx1ZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tEZXNjcmlwdGlvbiddLnZhbHVlO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IHRhc2tGb3JtLmVsZW1lbnRzWydkdWVEYXRlJ10udmFsdWU7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IHRhc2tGb3JtLmVsZW1lbnRzWydwcmlvcml0eSddLnZhbHVlO1xyXG4gICAgY29uc3QgY29tcGxldGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gRmluZCB0aGUgcHJvamVjdCBvYmplY3Qgd2l0aCB0aGUgbWF0Y2hpbmcgbmFtZVxyXG4gICAgY29uc3QgcHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gcHJvamVjdE5hbWUpO1xyXG4gIFxyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHRhc2sgb2JqZWN0IHVzaW5nIHRoZSBUYXNrIG9iamVjdCBmYWN0b3J5XHJcbiAgICBjb25zdCB0YXNrID0gVGFzayh0aXRsZSwgcHJvamVjdE5hbWUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGVkKTtcclxuXHJcbiAgICAvLyBBZGQgdGhlIHRhc2sgdG8gdGhlIHByb2plY3QgYW5kIHN0b3JlIGl0IGluIHdlYiBzdG9yYWdlXHJcbiAgICBpZiAocHJvamVjdCkge1xyXG4gICAgICBwcm9qZWN0LnRhc2tzLnB1c2godGFzayk7XHJcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIHRoZSB0YXNrIHRvIHRoZSB0YXNrIGxpc3RcclxuICAgIGFkZFRhc2tUb0xpc3QodGFzaywgcHJvamVjdCk7XHJcbiAgXHJcbiAgICAvLyBDbGVhciB0aGUgZm9ybSBmaWVsZHNcclxuICAgIHRhc2tGb3JtLnJlc2V0KCk7XHJcblxyXG4gICAgLy8gQ2xvc2UgdGhlIGZvcm1cclxuICAgIGNsb3NlTW9kYWwoKTtcclxuICB9KTtcclxuXHJcbiAgLy9Db21wbGV0ZSB0YXNrXHJcbiAgZnVuY3Rpb24gY29tcGxldGVUYXNrKHRhc2spIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSk7XHJcbiAgICBmb3IgKGNvbnN0IHByb2plY3Qgb2YgcHJvamVjdHMpIHtcclxuICAgICAgY29uc3QgdGFza3MgPSBwcm9qZWN0LnRhc2tzO1xyXG4gICAgICBmb3IgKGNvbnN0IHQgb2YgdGFza3MpIHtcclxuICAgICAgICBpZiAodC50aXRsZSA9PT0gdGFzay50aXRsZSAmJiB0LnByb2plY3ROYW1lID09PSB0YXNrLnByb2plY3ROYW1lKSB7XHJcbiAgICAgICAgICB0LmNvbXBsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy9EZWxldGUgdGFza1xyXG4gIGZ1bmN0aW9uIGRlbGV0ZVRhc2sodGFzaykge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcclxuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgICBjb25zdCB0YXNrcyA9IHByb2plY3QudGFza3M7XHJcbiAgICAgIGZvciAoY29uc3QgdCBvZiB0YXNrcykge1xyXG4gICAgICAgIGlmICh0LnRpdGxlID09PSB0YXNrLnRpdGxlICYmIHQucHJvamVjdE5hbWUgPT09IHRhc2sucHJvamVjdE5hbWUpIHtcclxuICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGFza3MuaW5kZXhPZih0KTtcclxuICAgICAgICAgIHRhc2tzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRXhwb3J0IHRoZSB0YXNrcyBhcnJheVxyXG4gIGV4cG9ydCB7IGNvbXBsZXRlVGFzaywgZGVsZXRlVGFzayB9O1xyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
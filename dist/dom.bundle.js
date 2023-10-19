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
/* harmony export */   deleteTask: () => (/* binding */ deleteTask),
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
/******/ var __webpack_exports__ = (__webpack_exec__("./src/dom.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBeUQ7QUFDekQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvdGFza3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbm90Q29tcGxldGVkVGFza3MsIGNvbXBsZXRlVGFzaywgZGVsZXRlVGFzayB9IGZyb20gJy4vdGFza3MuanMnO1xyXG5pbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gJy4vcHJvamVjdHMuanMnO1xyXG5cclxubGV0IGFjdGl2ZVRhc2sgPSBudWxsO1xyXG5cclxuXHJcbi8vT3BlbiB0YXNrcyBtb2RhbFxyXG5jb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLWJ1dHRvbicpO1xyXG5jb25zdCB0YXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1tb2RhbCcpO1xyXG5cclxuYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICB0YXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgdXBkYXRlUHJvamVjdExpc3QoKTtcclxufSk7XHJcblxyXG4vL0Nsb3NlIHRhc2tzIG1vZGFsXHJcbmNvbnN0IGNsb3NlVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idXR0b24nKTtcclxuY2xvc2VUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG59KTtcclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RMaXN0KCkge1xyXG4gIC8vIEdldCB0aGUgcHJvamVjdCBzZWxlY3QgZWxlbWVudFxyXG4gIGNvbnN0IHByb2plY3RTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjcHJvamVjdCcpO1xyXG5cclxuICAvLyBMb29wIHRocm91Z2ggdGhlIHByb2plY3RzIGFycmF5XHJcbiAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XHJcbiAgICAvLyBDaGVjayBpZiBhbiBvcHRpb24gd2l0aCB0aGUgcHJvamVjdCBuYW1lIGFscmVhZHkgZXhpc3RzXHJcbiAgICBjb25zdCBleGlzdGluZ09wdGlvbiA9IHByb2plY3RTZWxlY3QucXVlcnlTZWxlY3Rvcihgb3B0aW9uW3ZhbHVlPVwiJHtwcm9qZWN0Lm5hbWV9XCJdYCk7XHJcblxyXG4gICAgLy8gSWYgYW4gb3B0aW9uIGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgYSBuZXcgb25lIGFuZCBhZGQgaXQgdG8gdGhlIHByb2plY3Qgc2VsZWN0IGVsZW1lbnRcclxuICAgIGlmICghZXhpc3RpbmdPcHRpb24pIHtcclxuICAgICAgY29uc3QgcHJvamVjdE9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpO1xyXG4gICAgICBwcm9qZWN0T3B0aW9uLnZhbHVlID0gcHJvamVjdC5uYW1lO1xyXG4gICAgICBwcm9qZWN0T3B0aW9uLnRleHRDb250ZW50ID0gcHJvamVjdC5uYW1lO1xyXG4gICAgICBwcm9qZWN0U2VsZWN0LmFwcGVuZENoaWxkKHByb2plY3RPcHRpb24pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG4vLyBHZXQgdGhlIGFkZCBwcm9qZWN0IGJ1dHRvbiBhbmQgcHJvamVjdCBtb2RhbFxyXG5jb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWJ1dHRvbicpO1xyXG5jb25zdCBwcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvamVjdC1tb2RhbCcpO1xyXG5cclxuLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBhZGQgcHJvamVjdCBidXR0b24gdG8gb3BlbiB0aGUgcHJvamVjdCBtb2RhbFxyXG5hZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxufSk7XHJcblxyXG5cclxuLy9DbG9zZSBwcm9qZWN0bW9kYWxcclxuZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcclxuICBwcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxufVxyXG5cclxuY29uc3QgY2xvc2VQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtY2xvc2UtYnV0dG9uJyk7XHJcbmNsb3NlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjbG9zZU1vZGFsKCk7XHJcbn0pO1xyXG5cclxuLy9BZGQgcHJvamVjdCB0byB0aGUgcHJvamVjdCBsaXN0XHJcbmZ1bmN0aW9uIGFkZFByb2plY3RUb0xpc3QocHJvamVjdCkge1xyXG4gIGNvbnN0IHByb2plY3ROYW1lID0gcHJvamVjdC5uYW1lO1xyXG4gIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGlzdCcpO1xyXG4gIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuICBwcm9qZWN0SXRlbS5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWl0ZW0nKTtcclxuICBwcm9qZWN0SXRlbS5kYXRhc2V0LnByb2plY3QgPSBwcm9qZWN0TmFtZTtcclxuICBwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3ROYW1lO1xyXG4gIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKHByb2plY3RJdGVtKTtcclxufVxyXG5cclxuLy9BZGQgdGFzayB0byB0aGUgdGFzayBsaXN0XHJcbmZ1bmN0aW9uIGFkZFRhc2tUb0xpc3QodGFzaywgcHJvamVjdCkge1xyXG4gIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgbGlbZGF0YS1wcm9qZWN0PVwiJHtwcm9qZWN0Lm5hbWV9XCJdYCk7XHJcbiAgY29uc3QgdGFza0l0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG4gIHRhc2tJdGVtLmNsYXNzTGlzdC5hZGQoJ3Rhc2staXRlbScpO1xyXG4gIHRhc2tJdGVtLmRhdGFzZXQudGFzayA9IHRhc2sudGl0bGU7XHJcbiAgdGFza0l0ZW0udGV4dENvbnRlbnQgPSB0YXNrLnRpdGxlO1xyXG4gIHByb2plY3RJdGVtLmFwcGVuZENoaWxkKHRhc2tJdGVtKTtcclxufVxyXG5cclxuLy8gSW5pdGlhbGl6ZSBzaG93Q29tcGxldGVkIHZhcmlhYmxlIGZyb20gbG9jYWwgc3RvcmFnZSBvciBkZWZhdWx0IHRvIGZhbHNlXHJcbmxldCBzaG93Q29tcGxldGVkID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnc2hvd0NvbXBsZXRlZCcpKSB8fCBmYWxzZTtcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgYWRkUHJvamVjdFRvTGlzdChwcm9qZWN0KTtcclxuICAgIGZvciAoY29uc3QgdGFzayBvZiBwcm9qZWN0LnRhc2tzKSB7XHJcbiAgICAgIGlmIChzaG93Q29tcGxldGVkKSB7XHJcbiAgICAgICAgYWRkVGFza1RvTGlzdCh0YXNrLCBwcm9qZWN0KTtcclxuICAgICAgfSBlbHNlIGlmICghdGFzay5jb21wbGV0ZWQgJiYgIXNob3dDb21wbGV0ZWQpIHtcclxuICAgICAgICBhZGRUYXNrVG9MaXN0KHRhc2ssIHByb2plY3QpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIERpc3BsYXkgdGFzayBkZXRhaWxzXHJcbmNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbGlzdCcpO1xyXG5wcm9qZWN0TGlzdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpc3BsYXlUYXNrRGV0YWlscyk7XHJcblxyXG5mdW5jdGlvbiBkaXNwbGF5VGFza0RldGFpbHMoZXZlbnQpIHtcclxuICBjb25zdCBjb21wbGV0ZWRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbXBsZXRlLXRhc2stYnV0dG9uJyk7XHJcbiAgY29uc3QgZGVsZXRlVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtdGFzay1idXR0b24nKTtcclxuICBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygndGFzay1pdGVtJykpIHtcclxuICAgIGNvbnN0IHRhc2tUaXRsZSA9IGV2ZW50LnRhcmdldC5kYXRhc2V0LnRhc2s7XHJcbiAgICBjb25zdCB0YXNrUHJvamVjdE5hbWUgPSBldmVudC50YXJnZXQuY2xvc2VzdCgnW2RhdGEtcHJvamVjdF0nKS5kYXRhc2V0LnByb2plY3Q7XHJcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSB0YXNrUHJvamVjdE5hbWUpO1xyXG4gICAgY29uc3QgdGFzayA9IHByb2plY3QudGFza3MuZmluZCgodGFzaykgPT4gdGFzay50aXRsZSA9PT0gdGFza1RpdGxlKTtcclxuICAgIGFjdGl2ZVRhc2sgPSB0YXNrO1xyXG4gICAgY29tcGxldGVkVGFza0J1dHRvbi5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgIGRlbGV0ZVRhc2tCdXR0b24uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICB1cGRhdGVUYXNrRGV0YWlscyh0YXNrKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZVRhc2tEZXRhaWxzKHRhc2spIHtcclxuICBjb25zdCB0YXNrUHJvamVjdE5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLXByb2plY3QnKTtcclxuICB0YXNrUHJvamVjdE5hbWUudGV4dENvbnRlbnQgPSB0YXNrLnByb2plY3Q7XHJcbiAgY29uc3QgdGFza1RpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtdGl0bGUnKTtcclxuICB0YXNrVGl0bGVFbGVtZW50LnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcclxuICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLWRlc2NyaXB0aW9uJyk7XHJcbiAgdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdGFzay5kZXNjcmlwdGlvbjtcclxuICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0YXNrLWRldGFpbHMtZHVlLWRhdGUnKTtcclxuICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IHRhc2suZHVlRGF0ZTtcclxuICBjb25zdCB0YXNrUHJpb3JpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdGFzay1kZXRhaWxzLXByaW9yaXR5Jyk7XHJcbiAgdGFza1ByaW9yaXR5LnRleHRDb250ZW50ID0gdGFzay5wcmlvcml0eTtcclxufVxyXG5cclxuLy9Db21wbGV0ZSB0YXNrXHJcbmNvbnN0IGNvbXBsZXRlVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wbGV0ZS10YXNrLWJ1dHRvbicpO1xyXG5jb21wbGV0ZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgY29tcGxldGVUYXNrKGFjdGl2ZVRhc2spO1xyXG4gIHVwZGF0ZVRhc2tEZXRhaWxzKGFjdGl2ZVRhc2spO1xyXG4gIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG59KTtcclxuXHJcbi8vU2hvdyBjb21wbGV0ZWQgdGFza3NcclxuY29uc3Qgc2hvd0NvbXBsZXRlZEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG93LWNvbXBsZXRlZC1idXR0b24nKTtcclxuc2hvd0NvbXBsZXRlZEJ1dHRvbi50ZXh0Q29udGVudCA9IHNob3dDb21wbGV0ZWQgPyAnSGlkZSBjb21wbGV0ZWQnIDogJ1Nob3cgY29tcGxldGVkJztcclxuc2hvd0NvbXBsZXRlZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBzaG93Q29tcGxldGVkID0gIXNob3dDb21wbGV0ZWQ7XHJcbiAgc2hvd0NvbXBsZXRlZEJ1dHRvbi50ZXh0Q29udGVudCA9IHNob3dDb21wbGV0ZWQgPyAnSGlkZSBjb21wbGV0ZWQnIDogJ1Nob3cgY29tcGxldGVkJztcclxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnc2hvd0NvbXBsZXRlZCcsIEpTT04uc3RyaW5naWZ5KHNob3dDb21wbGV0ZWQpKTtcclxuICBsb2NhdGlvbi5yZWxvYWQoKTtcclxufSk7XHJcblxyXG4vL0RlbGV0ZSB0YXNrXHJcbmNvbnN0IGRlbGV0ZVRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLXRhc2stYnV0dG9uJyk7XHJcbmRlbGV0ZVRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgZGVsZXRlVGFzayhhY3RpdmVUYXNrKTtcclxuICBsb2NhdGlvbi5yZWxvYWQoKTtcclxufSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuZXhwb3J0IHsgYWRkUHJvamVjdFRvTGlzdCwgYWRkVGFza1RvTGlzdCwgY2xvc2VNb2RhbCB9O1xyXG5cclxuXHJcblxyXG4iLCJpbXBvcnQgeyBhZGRQcm9qZWN0VG9MaXN0LCBjbG9zZU1vZGFsIH0gZnJvbSAnLi9kb20uanMnO1xyXG5cclxuLy8gRGVmaW5lIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XHJcbmZ1bmN0aW9uIFByb2plY3QobmFtZSwgdGFza3MpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgIHRhc2tzOiB0YXNrc1xyXG4gICAgfTtcclxufVxyXG5cclxuLy8gTG9hZCBwcm9qZWN0cyBmcm9tIHdlYiBzdG9yYWdlXHJcbmxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpIHx8IFtdO1xyXG5cclxuZnVuY3Rpb24gaW5pdFByb2plY3RzKCkge1xyXG4gIC8vIENoZWNrIGlmIHRoZSBcIkRlZmF1bHRcIiBwcm9qZWN0IGFscmVhZHkgZXhpc3RzXHJcbiAgY29uc3QgZGVmYXVsdFByb2plY3QgPSBwcm9qZWN0cy5maW5kKChwcm9qZWN0KSA9PiBwcm9qZWN0Lm5hbWUgPT09ICdEZWZhdWx0Jyk7XHJcblxyXG4gIC8vIElmIHRoZSBcIkRlZmF1bHRcIiBwcm9qZWN0IGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgaXRcclxuICBpZiAoIWRlZmF1bHRQcm9qZWN0KSB7XHJcbiAgICBjb25zdCBuZXdEZWZhdWx0UHJvamVjdCA9IFByb2plY3QoJ0RlZmF1bHQnLCBbXSk7XHJcbiAgICBwcm9qZWN0cy5wdXNoKG5ld0RlZmF1bHRQcm9qZWN0KTtcclxuICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgfVxyXG59XHJcblxyXG4vL0dldCB0aGUgcHJvamVjdCBmb3JtXHJcbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtZm9ybScpO1xyXG5cclxuLy9BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHByb2plY3QgZm9ybSB0byBoYW5kbGUgZm9ybSBzdWJtaXNzaW9uc1xyXG5wcm9qZWN0Rm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICAgIC8vUHJldmVudCB0aGUgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb24gYmVoYXZpb3JcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgLy9HZXQgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybSBmaWVsZHNcclxuICAgIGNvbnN0IG5hbWUgPSBwcm9qZWN0Rm9ybS5lbGVtZW50c1sncHJvamVjdE5hbWUnXS52YWx1ZTtcclxuXHJcbiAgICAvL0NyZWF0ZSBhIG5ldyBwcm9qZWN0IG9iamVjdCB1c2luZyB0aGUgUHJvamVjdCBvYmplY3QgZmFjdG9yeVxyXG4gICAgY29uc3QgcHJvamVjdCA9IFByb2plY3QobmFtZSwgW10pO1xyXG5cclxuICAgIC8vU3RvcmUgdGhlIHByb2plY3QgaW4gd2ViIHN0b3JhZ2VcclxuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XHJcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0cykpO1xyXG5cclxuICAgIC8vQWRkIHRoZSBwcm9qZWN0IHRvIHRoZSBwcm9qZWN0IGxpc3RcclxuICAgIGFkZFByb2plY3RUb0xpc3QocHJvamVjdCk7XHJcblxyXG4gICAgLy9DbGVhciB0aGUgZm9ybSBmaWVsZHNcclxuICAgIHByb2plY3RGb3JtLnJlc2V0KCk7XHJcblxyXG4gICAgLy9DbG9zZSB0aGUgZm9ybVxyXG4gICAgY2xvc2VNb2RhbCgpO1xyXG59KTtcclxuXHJcbi8vIEV4cG9ydCB0aGUgcHJvamVjdHMgYXJyYXkgYW5kIHRoZSBjcmVhdGVQcm9qZWN0IGZ1bmN0aW9uXHJcbmV4cG9ydCB7IGluaXRQcm9qZWN0cywgcHJvamVjdHMgfTsiLCJpbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gXCIuL3Byb2plY3RzLmpzXCI7XHJcbmltcG9ydCB7IGFkZFRhc2tUb0xpc3QsIGNsb3NlTW9kYWwgfSBmcm9tIFwiLi9kb20uanNcIjtcclxuXHJcbi8vIERlZmluZSB0aGUgVGFzayBvYmplY3QgZmFjdG9yeVxyXG5mdW5jdGlvbiBUYXNrKHRpdGxlLCBwcm9qZWN0LCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgcHJvamVjdDogcHJvamVjdCxcclxuICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxyXG4gICAgICBkdWVEYXRlOiBkdWVEYXRlLFxyXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXHJcbiAgICAgIGNvbXBsZXRlZDogZmFsc2VcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgdGhlIHRhc2sgZm9ybVxyXG4gIGNvbnN0IHRhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stZm9ybScpO1xyXG5cclxuICAvLyBMb2FkIHRhc2tzIGZyb20gd2ViIHN0b3JhZ2VcclxuICBsZXQgdGFza3MgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKSB8fCBbXTtcclxuXHJcbiAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSB0YXNrIGZvcm0gdG8gaGFuZGxlIGZvcm0gc3VibWlzc2lvbnNcclxuICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcclxuICAgIC8vIFByZXZlbnQgdGhlIGRlZmF1bHQgZm9ybSBzdWJtaXNzaW9uIGJlaGF2aW9yXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIFxyXG4gICAgLy8gR2V0IHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gZmllbGRzXHJcbiAgICBjb25zdCB0aXRsZSA9IHRhc2tGb3JtLmVsZW1lbnRzWyd0YXNrTmFtZSddLnZhbHVlO1xyXG4gICAgY29uc3QgcHJvamVjdE5hbWUgPSB0YXNrRm9ybS5lbGVtZW50c1sncHJvamVjdCddLnZhbHVlO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB0YXNrRm9ybS5lbGVtZW50c1sndGFza0Rlc2NyaXB0aW9uJ10udmFsdWU7XHJcbiAgICBjb25zdCBkdWVEYXRlID0gdGFza0Zvcm0uZWxlbWVudHNbJ2R1ZURhdGUnXS52YWx1ZTtcclxuICAgIGNvbnN0IHByaW9yaXR5ID0gdGFza0Zvcm0uZWxlbWVudHNbJ3ByaW9yaXR5J10udmFsdWU7XHJcbiAgICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBGaW5kIHRoZSBwcm9qZWN0IG9iamVjdCB3aXRoIHRoZSBtYXRjaGluZyBuYW1lXHJcbiAgICBjb25zdCBwcm9qZWN0ID0gcHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5uYW1lID09PSBwcm9qZWN0TmFtZSk7XHJcbiAgXHJcbiAgICAvLyBDcmVhdGUgYSBuZXcgdGFzayBvYmplY3QgdXNpbmcgdGhlIFRhc2sgb2JqZWN0IGZhY3RvcnlcclxuICAgIGNvbnN0IHRhc2sgPSBUYXNrKHRpdGxlLCBwcm9qZWN0TmFtZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZWQpO1xyXG5cclxuICAgIC8vIEFkZCB0aGUgdGFzayB0byB0aGUgcHJvamVjdCBhbmQgc3RvcmUgaXQgaW4gd2ViIHN0b3JhZ2VcclxuICAgIGlmIChwcm9qZWN0KSB7XHJcbiAgICAgIHByb2plY3QudGFza3MucHVzaCh0YXNrKTtcclxuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgdGhlIHRhc2sgdG8gdGhlIHRhc2sgbGlzdFxyXG4gICAgYWRkVGFza1RvTGlzdCh0YXNrLCBwcm9qZWN0KTtcclxuICBcclxuICAgIC8vIENsZWFyIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgdGFza0Zvcm0ucmVzZXQoKTtcclxuXHJcbiAgICAvLyBDbG9zZSB0aGUgZm9ybVxyXG4gICAgY2xvc2VNb2RhbCgpO1xyXG4gIH0pO1xyXG5cclxuICAvL05vdCBjb21wbGV0ZWQgdGFza3NcclxuICBmdW5jdGlvbiBub3RDb21wbGV0ZWRUYXNrcygpIHtcclxuICAgIHJldHVybiB0YXNrcy5maWx0ZXIoKHRhc2spID0+ICF0YXNrLmNvbXBsZXRlZCk7XHJcbiAgfVxyXG5cclxuICAvL0NvbXBsZXRlIHRhc2tcclxuICBmdW5jdGlvbiBjb21wbGV0ZVRhc2sodGFzaykge1xyXG4gICAgY29uc3QgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKTtcclxuICAgIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xyXG4gICAgICBjb25zdCB0YXNrcyA9IHByb2plY3QudGFza3M7XHJcbiAgICAgIGZvciAoY29uc3QgdCBvZiB0YXNrcykge1xyXG4gICAgICAgIGlmICh0LnRpdGxlID09PSB0YXNrLnRpdGxlICYmIHQucHJvamVjdE5hbWUgPT09IHRhc2sucHJvamVjdE5hbWUpIHtcclxuICAgICAgICAgIHQuY29tcGxldGVkID0gdHJ1ZTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvL0RlbGV0ZSB0YXNrXHJcbiAgZnVuY3Rpb24gZGVsZXRlVGFzayh0YXNrKSB7XHJcbiAgICBjb25zdCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpO1xyXG4gICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHByb2plY3RzKSB7XHJcbiAgICAgIGNvbnN0IHRhc2tzID0gcHJvamVjdC50YXNrcztcclxuICAgICAgZm9yIChjb25zdCB0IG9mIHRhc2tzKSB7XHJcbiAgICAgICAgaWYgKHQudGl0bGUgPT09IHRhc2sudGl0bGUgJiYgdC5wcm9qZWN0TmFtZSA9PT0gdGFzay5wcm9qZWN0TmFtZSkge1xyXG4gICAgICAgICAgY29uc3QgaW5kZXggPSB0YXNrcy5pbmRleE9mKHQpO1xyXG4gICAgICAgICAgdGFza3Muc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBFeHBvcnQgdGhlIHRhc2tzIGFycmF5XHJcbiAgZXhwb3J0IHsgbm90Q29tcGxldGVkVGFza3MsIGNvbXBsZXRlVGFzaywgZGVsZXRlVGFzayB9O1xyXG5cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9
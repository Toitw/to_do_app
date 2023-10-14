"use strict";
(self["webpackChunkto_do_app"] = self["webpackChunkto_do_app"] || []).push([["index"],{

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   displayProjects: () => (/* binding */ displayProjects)
/* harmony export */ });
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ "./src/tasks.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");



//Open tasks modal
const addTaskButton = document.querySelector('.add-task-button');
const taskModal = document.querySelector('.task-modal');

addTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'block';
});

//Close tasks modal
const closeTaskButton = document.querySelector('.close-button');
closeTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'none';
});

// Update project list in the task modal
const projectSelect = document.querySelector('#project');

for (const project of _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects) {
  const projectOption = document.createElement('option');
  projectOption.value = project.name;
  projectOption.textContent = project.name;
  projectSelect.appendChild(projectOption);
}



//Add project modal
const addProjectButton = document.querySelector('.add-project-button');
const projectModal = document.querySelector('.project-modal');

addProjectButton.addEventListener('click', () => {
  projectModal.style.display = 'block';
}
);

//Close projectmodal
const closeProjectButton = document.querySelector('.project-close-button');
closeProjectButton.addEventListener('click', () => {
  projectModal.style.display = 'none';
});

// Display projects
function displayProjects() {
  const defaultProject = document.querySelector('.default-project');

  for (const project of _projects_js__WEBPACK_IMPORTED_MODULE_1__.projects) {
    const projectItem = document.createElement('li');
    projectItem.textContent = project.name;
    defaultProject.appendChild(projectItem);

    const taskList = document.createElement('ul');
    projectItem.appendChild(taskList);

    for (const task of project.tasks) {
      const taskItem = document.createElement('li');
      taskItem.textContent = task.title;
      taskList.appendChild(taskItem);
    }
  }
}







/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");


(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.displayProjects)();

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
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
    const project = taskForm.elements['project'].value;
    const description = taskForm.elements['taskDescription'].value;
    const dueDate = taskForm.elements['dueDate'].value;
    const priority = taskForm.elements['priority'].value;
    const completed = false;
  
    // Create a new task object using the Task object factory
    const task = Task(title, project, description, dueDate, priority, completed);

    // Store the task in web storage
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Add the task to the project and store it in web storage
    project.tasks.push(task);
    localStorage.setItem('projects', JSON.stringify(_projects_js__WEBPACK_IMPORTED_MODULE_0__.projects));
  
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFtQztBQUNNOztBQUV6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUEsc0JBQXNCLGtEQUFRO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0Isa0RBQVE7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRTJCOzs7Ozs7Ozs7Ozs7Ozs7O0FDaEVnQjs7QUFFM0Msd0RBQWU7Ozs7Ozs7Ozs7Ozs7O0FDRmY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ3lDOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvREFBb0Qsa0RBQVE7QUFDNUQ7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLEVBQW1CIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvX2RvX2FwcC8uL3NyYy90YXNrcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0YXNrcyB9IGZyb20gJy4vdGFza3MuanMnO1xuaW1wb3J0IHsgcHJvamVjdHMgfSBmcm9tICcuL3Byb2plY3RzLmpzJztcblxuLy9PcGVuIHRhc2tzIG1vZGFsXG5jb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC10YXNrLWJ1dHRvbicpO1xuY29uc3QgdGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRhc2stbW9kYWwnKTtcblxuYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufSk7XG5cbi8vQ2xvc2UgdGFza3MgbW9kYWxcbmNvbnN0IGNsb3NlVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZS1idXR0b24nKTtcbmNsb3NlVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgdGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG59KTtcblxuLy8gVXBkYXRlIHByb2plY3QgbGlzdCBpbiB0aGUgdGFzayBtb2RhbFxuY29uc3QgcHJvamVjdFNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwcm9qZWN0Jyk7XG5cbmZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICBjb25zdCBwcm9qZWN0T3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gIHByb2plY3RPcHRpb24udmFsdWUgPSBwcm9qZWN0Lm5hbWU7XG4gIHByb2plY3RPcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0Lm5hbWU7XG4gIHByb2plY3RTZWxlY3QuYXBwZW5kQ2hpbGQocHJvamVjdE9wdGlvbik7XG59XG5cblxuXG4vL0FkZCBwcm9qZWN0IG1vZGFsXG5jb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1wcm9qZWN0LWJ1dHRvbicpO1xuY29uc3QgcHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2plY3QtbW9kYWwnKTtcblxuYWRkUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgcHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xufVxuKTtcblxuLy9DbG9zZSBwcm9qZWN0bW9kYWxcbmNvbnN0IGNsb3NlUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWNsb3NlLWJ1dHRvbicpO1xuY2xvc2VQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICBwcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbn0pO1xuXG4vLyBEaXNwbGF5IHByb2plY3RzXG5mdW5jdGlvbiBkaXNwbGF5UHJvamVjdHMoKSB7XG4gIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlZmF1bHQtcHJvamVjdCcpO1xuXG4gIGZvciAoY29uc3QgcHJvamVjdCBvZiBwcm9qZWN0cykge1xuICAgIGNvbnN0IHByb2plY3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBwcm9qZWN0SXRlbS50ZXh0Q29udGVudCA9IHByb2plY3QubmFtZTtcbiAgICBkZWZhdWx0UHJvamVjdC5hcHBlbmRDaGlsZChwcm9qZWN0SXRlbSk7XG5cbiAgICBjb25zdCB0YXNrTGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgcHJvamVjdEl0ZW0uYXBwZW5kQ2hpbGQodGFza0xpc3QpO1xuXG4gICAgZm9yIChjb25zdCB0YXNrIG9mIHByb2plY3QudGFza3MpIHtcbiAgICAgIGNvbnN0IHRhc2tJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIHRhc2tJdGVtLnRleHRDb250ZW50ID0gdGFzay50aXRsZTtcbiAgICAgIHRhc2tMaXN0LmFwcGVuZENoaWxkKHRhc2tJdGVtKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IHsgZGlzcGxheVByb2plY3RzIH07XG5cblxuXG4iLCJpbXBvcnQgeyBkaXNwbGF5UHJvamVjdHMgfSBmcm9tIFwiLi9kb20uanNcIjtcblxuZGlzcGxheVByb2plY3RzKCk7IiwiLy8gRGVmaW5lIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XG5mdW5jdGlvbiBQcm9qZWN0KG5hbWUsIHRhc2tzKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IG5hbWUsXG4gICAgICB0YXNrczogdGFza3NcbiAgICB9O1xufVxuXG4vLyBMb2FkIHByb2plY3RzIGZyb20gd2ViIHN0b3JhZ2VcbmxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpIHx8IFtdO1xuXG4vL0dldCB0aGUgcHJvamVjdCBmb3JtXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0nKTtcblxuLy9BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHByb2plY3QgZm9ybSB0byBoYW5kbGUgZm9ybSBzdWJtaXNzaW9uc1xucHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gICAgLy9QcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvL0dldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xuICAgIGNvbnN0IG5hbWUgPSBwcm9qZWN0Rm9ybS5lbGVtZW50c1sncHJvamVjdE5hbWUnXS52YWx1ZTtcblxuICAgIC8vQ3JlYXRlIGEgbmV3IHByb2plY3Qgb2JqZWN0IHVzaW5nIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XG4gICAgY29uc3QgcHJvamVjdCA9IFByb2plY3QobmFtZSwgW10pO1xuXG4gICAgLy9TdG9yZSB0aGUgcHJvamVjdCBpbiB3ZWIgc3RvcmFnZVxuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcblxuICAgIC8vQ2xlYXIgdGhlIGZvcm0gZmllbGRzXG4gICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbn0pO1xuXG4vLyBFeHBvcnQgdGhlIHByb2plY3RzIGFycmF5IGFuZCB0aGUgY3JlYXRlUHJvamVjdCBmdW5jdGlvblxuZXhwb3J0IHsgcHJvamVjdHMgfTsiLCJpbXBvcnQgeyBwcm9qZWN0cyB9IGZyb20gXCIuL3Byb2plY3RzLmpzXCI7XG5cbi8vIERlZmluZSB0aGUgVGFzayBvYmplY3QgZmFjdG9yeVxuZnVuY3Rpb24gVGFzayh0aXRsZSwgcHJvamVjdCwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgIHByb2plY3Q6IHByb2plY3QsXG4gICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICBkdWVEYXRlOiBkdWVEYXRlLFxuICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LFxuICAgICAgY29tcGxldGVkOiBmYWxzZVxuICAgIH07XG4gIH1cblxuICAvLyBHZXQgdGhlIHRhc2sgZm9ybVxuICBjb25zdCB0YXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YXNrLWZvcm0nKTtcblxuICAvLyBMb2FkIHRhc2tzIGZyb20gd2ViIHN0b3JhZ2VcbiAgbGV0IHRhc2tzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSkgfHwgW107XG5cbiAgLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSB0YXNrIGZvcm0gdG8gaGFuZGxlIGZvcm0gc3VibWlzc2lvbnNcbiAgdGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gICAgLy8gUHJldmVudCB0aGUgZGVmYXVsdCBmb3JtIHN1Ym1pc3Npb24gYmVoYXZpb3JcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBcbiAgICAvLyBHZXQgdGhlIHZhbHVlcyBvZiB0aGUgZm9ybSBmaWVsZHNcbiAgICBjb25zdCB0aXRsZSA9IHRhc2tGb3JtLmVsZW1lbnRzWyd0YXNrTmFtZSddLnZhbHVlO1xuICAgIGNvbnN0IHByb2plY3QgPSB0YXNrRm9ybS5lbGVtZW50c1sncHJvamVjdCddLnZhbHVlO1xuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tEZXNjcmlwdGlvbiddLnZhbHVlO1xuICAgIGNvbnN0IGR1ZURhdGUgPSB0YXNrRm9ybS5lbGVtZW50c1snZHVlRGF0ZSddLnZhbHVlO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gdGFza0Zvcm0uZWxlbWVudHNbJ3ByaW9yaXR5J10udmFsdWU7XG4gICAgY29uc3QgY29tcGxldGVkID0gZmFsc2U7XG4gIFxuICAgIC8vIENyZWF0ZSBhIG5ldyB0YXNrIG9iamVjdCB1c2luZyB0aGUgVGFzayBvYmplY3QgZmFjdG9yeVxuICAgIGNvbnN0IHRhc2sgPSBUYXNrKHRpdGxlLCBwcm9qZWN0LCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNvbXBsZXRlZCk7XG5cbiAgICAvLyBTdG9yZSB0aGUgdGFzayBpbiB3ZWIgc3RvcmFnZVxuICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgSlNPTi5zdHJpbmdpZnkodGFza3MpKTtcblxuICAgIC8vIEFkZCB0aGUgdGFzayB0byB0aGUgcHJvamVjdCBhbmQgc3RvcmUgaXQgaW4gd2ViIHN0b3JhZ2VcbiAgICBwcm9qZWN0LnRhc2tzLnB1c2godGFzayk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbiAgXG4gICAgLy8gQ2xlYXIgdGhlIGZvcm0gZmllbGRzXG4gICAgdGFza0Zvcm0ucmVzZXQoKTtcbiAgfSk7XG5cbiAgLy8gRXhwb3J0IHRoZSB0YXNrcyBhcnJheVxuICBleHBvcnQgeyB0YXNrcyB9O1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
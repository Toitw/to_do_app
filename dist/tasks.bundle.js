(self["webpackChunkto_do_app"] = self["webpackChunkto_do_app"] || []).push([["tasks"],{

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ (() => {

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
  
  // Get a reference to the task form
  const taskForm = document.querySelector('.task-form');
  const defaultProject = document.querySelector('.default-project');

  
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
  
    // Create a new task object using the Task object factory
    const task = Task(title, project, description, dueDate, priority);
  
    // Add the task to the task list
    const taskItemlist = document.createElement('ul');
    taskItemlist.classList.add('task-item-list');
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = task.title;
    defaultProject.appendChild(taskItemlist);
    taskItemlist.appendChild(taskItem);
  
    // Clear the form fields
    taskForm.reset();
  });



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/tasks.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFza3MuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b19kb19hcHAvLi9zcmMvdGFza3MuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVmaW5lIHRoZSBUYXNrIG9iamVjdCBmYWN0b3J5XG5mdW5jdGlvbiBUYXNrKHRpdGxlLCBwcm9qZWN0LCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgcHJvamVjdDogcHJvamVjdCxcbiAgICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcbiAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXG4gICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICBjb21wbGV0ZWQ6IGZhbHNlXG4gICAgfTtcbiAgfVxuICBcbiAgLy8gR2V0IGEgcmVmZXJlbmNlIHRvIHRoZSB0YXNrIGZvcm1cbiAgY29uc3QgdGFza0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFzay1mb3JtJyk7XG4gIGNvbnN0IGRlZmF1bHRQcm9qZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRlZmF1bHQtcHJvamVjdCcpO1xuXG4gIFxuICAvLyBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHRhc2sgZm9ybSB0byBoYW5kbGUgZm9ybSBzdWJtaXNzaW9uc1xuICB0YXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQpID0+IHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIFxuICAgIC8vIEdldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xuICAgIGNvbnN0IHRpdGxlID0gdGFza0Zvcm0uZWxlbWVudHNbJ3Rhc2tOYW1lJ10udmFsdWU7XG4gICAgY29uc3QgcHJvamVjdCA9IHRhc2tGb3JtLmVsZW1lbnRzWydwcm9qZWN0J10udmFsdWU7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB0YXNrRm9ybS5lbGVtZW50c1sndGFza0Rlc2NyaXB0aW9uJ10udmFsdWU7XG4gICAgY29uc3QgZHVlRGF0ZSA9IHRhc2tGb3JtLmVsZW1lbnRzWydkdWVEYXRlJ10udmFsdWU7XG4gICAgY29uc3QgcHJpb3JpdHkgPSB0YXNrRm9ybS5lbGVtZW50c1sncHJpb3JpdHknXS52YWx1ZTtcbiAgXG4gICAgLy8gQ3JlYXRlIGEgbmV3IHRhc2sgb2JqZWN0IHVzaW5nIHRoZSBUYXNrIG9iamVjdCBmYWN0b3J5XG4gICAgY29uc3QgdGFzayA9IFRhc2sodGl0bGUsIHByb2plY3QsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSk7XG4gIFxuICAgIC8vIEFkZCB0aGUgdGFzayB0byB0aGUgdGFzayBsaXN0XG4gICAgY29uc3QgdGFza0l0ZW1saXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICB0YXNrSXRlbWxpc3QuY2xhc3NMaXN0LmFkZCgndGFzay1pdGVtLWxpc3QnKTtcbiAgICBjb25zdCB0YXNrSXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgdGFza0l0ZW0uY2xhc3NMaXN0LmFkZCgndGFzay1pdGVtJyk7XG4gICAgdGFza0l0ZW0uaW5uZXJIVE1MID0gdGFzay50aXRsZTtcbiAgICBkZWZhdWx0UHJvamVjdC5hcHBlbmRDaGlsZCh0YXNrSXRlbWxpc3QpO1xuICAgIHRhc2tJdGVtbGlzdC5hcHBlbmRDaGlsZCh0YXNrSXRlbSk7XG4gIFxuICAgIC8vIENsZWFyIHRoZSBmb3JtIGZpZWxkc1xuICAgIHRhc2tGb3JtLnJlc2V0KCk7XG4gIH0pO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=
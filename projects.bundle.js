"use strict";
(self["webpackChunkto_do_app"] = self["webpackChunkto_do_app"] || []).push([["projects"],{

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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/projects.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9fZG9fYXBwLy4vc3JjL3Byb2plY3RzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIERlZmluZSB0aGUgUHJvamVjdCBvYmplY3QgZmFjdG9yeVxuZnVuY3Rpb24gUHJvamVjdChuYW1lLCB0YXNrcykge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgdGFza3M6IHRhc2tzXG4gICAgfTtcbn1cblxuLy8gTG9hZCBwcm9qZWN0cyBmcm9tIHdlYiBzdG9yYWdlXG5sZXQgcHJvamVjdHMgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKSB8fCBbXTtcblxuZnVuY3Rpb24gaW5pdFByb2plY3RzKCkge1xuICAvLyBDaGVjayBpZiB0aGUgXCJEZWZhdWx0XCIgcHJvamVjdCBhbHJlYWR5IGV4aXN0c1xuICBjb25zdCBkZWZhdWx0UHJvamVjdCA9IHByb2plY3RzLmZpbmQoKHByb2plY3QpID0+IHByb2plY3QubmFtZSA9PT0gJ0RlZmF1bHQnKTtcblxuICAvLyBJZiB0aGUgXCJEZWZhdWx0XCIgcHJvamVjdCBkb2VzIG5vdCBleGlzdCwgY3JlYXRlIGl0XG4gIGlmICghZGVmYXVsdFByb2plY3QpIHtcbiAgICBjb25zdCBuZXdEZWZhdWx0UHJvamVjdCA9IFByb2plY3QoJ0RlZmF1bHQnLCBbXSk7XG4gICAgcHJvamVjdHMucHVzaChuZXdEZWZhdWx0UHJvamVjdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbiAgfVxufVxuXG4vL0dldCB0aGUgcHJvamVjdCBmb3JtXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9qZWN0LWZvcm0nKTtcblxuLy9BZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHByb2plY3QgZm9ybSB0byBoYW5kbGUgZm9ybSBzdWJtaXNzaW9uc1xucHJvamVjdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgKGV2ZW50KSA9PiB7XG4gICAgLy9QcmV2ZW50IHRoZSBkZWZhdWx0IGZvcm0gc3VibWlzc2lvbiBiZWhhdmlvclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAvL0dldCB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGZpZWxkc1xuICAgIGNvbnN0IG5hbWUgPSBwcm9qZWN0Rm9ybS5lbGVtZW50c1sncHJvamVjdE5hbWUnXS52YWx1ZTtcblxuICAgIC8vQ3JlYXRlIGEgbmV3IHByb2plY3Qgb2JqZWN0IHVzaW5nIHRoZSBQcm9qZWN0IG9iamVjdCBmYWN0b3J5XG4gICAgY29uc3QgcHJvamVjdCA9IFByb2plY3QobmFtZSwgW10pO1xuXG4gICAgLy9TdG9yZSB0aGUgcHJvamVjdCBpbiB3ZWIgc3RvcmFnZVxuICAgIHByb2plY3RzLnB1c2gocHJvamVjdCk7XG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcblxuICAgIC8vQ2xlYXIgdGhlIGZvcm0gZmllbGRzXG4gICAgcHJvamVjdEZvcm0ucmVzZXQoKTtcbn0pO1xuXG4vLyBFeHBvcnQgdGhlIHByb2plY3RzIGFycmF5IGFuZCB0aGUgY3JlYXRlUHJvamVjdCBmdW5jdGlvblxuZXhwb3J0IHsgaW5pdFByb2plY3RzLCBwcm9qZWN0cyB9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==
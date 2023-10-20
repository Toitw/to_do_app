import { projects } from "./projects.js";
import { addTaskToList, closeModal } from "./dom.js";
import { getValid } from "./validations.js";

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
    console.log(getValid());
    if (!getValid()) {
      console.log(getValid())
      // Prevent the default form submission behavior
      event.preventDefault();
    } else {
      console.log(getValid())
    }

  
    // Get the values of the form fields
    const title = taskForm.elements['taskName'].value;
    const projectName = taskForm.elements['project'].value;
    const description = taskForm.elements['taskDescription'].value;
    const dueDate = taskForm.elements['dueDate'].value;
    const priority = taskForm.elements['priority'].value;
    const completed = false;

    // Find the project object with the matching name
    const project = projects.find((project) => project.name === projectName);
    const existingTask = project.tasks.find((task) => task.title === title);
    if (existingTask && existingTask.completed === false) {
      const errorMessage = `A task with the name "${title}" already exists in the "${projectName}" project.`;
      const errorElement = document.createElement('p');
      errorElement.textContent = errorMessage;
      errorElement.classList.add('task-name-error-message');
      taskForm.appendChild(errorElement);
      return;
    } else {
      // Create a new task object using the Task object factory
      const task = Task(title, projectName, description, dueDate, priority, completed);

      // Add the task to the project and store it in web storage
      if (project) {
        project.tasks.push(task);
        localStorage.setItem('projects', JSON.stringify(projects));
      }

      // Add the task to the task list
      addTaskToList(task, project);
    
      // Clear the form fields
      taskForm.reset();

      // Close the form
      closeModal();
    }
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
  export { completeTask, deleteTask };


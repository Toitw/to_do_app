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


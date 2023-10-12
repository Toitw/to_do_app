//Open modal
const addTaskButton = document.querySelector('.add-task-button');
const taskModal = document.querySelector('.task-modal');

addTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'block';
});

//Close modal
const closeTaskButton = document.querySelector('.close-button');
closeTaskButton.addEventListener('click', () => {
  taskModal.style.display = 'none';
});


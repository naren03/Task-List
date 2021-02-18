//value of new task
const task = document.getElementById('input-task');

//event listener for add btn
document.querySelector('.add-btn').addEventListener('click', addTask);
//event listener for deleting
document.querySelector('#container').addEventListener('dblclick', deleteTask);
//filter event
document.querySelector('#input-search').addEventListener('keyup', filterTasks);

function addTask(e) {
	if (task.value === '') {
		alert('Field is Empty !!!');
	} else {
		//creating new li
		const li = document.createElement('li');
		//setting a class
		li.setAttribute('class', 'task-item');
		//putting value of task-input into it
		li.appendChild(document.createTextNode(task.value));
		//appending to ul parent
		document.getElementById('task').appendChild(li);
		//localstorage
		let tasks;

		if (localStorage.getItem('tasks') === null) {
			tasks = [];
		} else {
			tasks = JSON.parse(localStorage.getItem('tasks'));
		}

		tasks.push(task.value);
		localStorage.setItem('tasks', JSON.stringify(tasks));

		//clearing task input
		task.value = '';
	}

	//preventing default behaviour of submit
	e.preventDefault();
}

function deleteTask(e) {
	if (e.target.classList.contains('task-item')) {
		//localStorage
		let tasks;
		let newTasks = [];
		tasks = JSON.parse(localStorage.getItem('tasks'));

		tasks.forEach((task) => {
			if (task !== e.target.textContent) newTasks.push(task);
		});
		tasks.pop(e.target.textContent);
		localStorage.setItem('tasks', JSON.stringify(newTasks));

		//remove from UI
		document.getElementById('task').removeChild(e.target);
	}

	e.preventDefault();
}

function filterTasks(e) {
	search = e.target.value;

	let tasks = Array.from(document.querySelectorAll('.task-item'));

	tasks.forEach(function (task) {
		if (task.textContent.indexOf(search) !== -1) {
			task.style.display = 'block';
		} else {
			task.style.display = 'none';
		}
	});
}

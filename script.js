document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    const loadTasks = () => {
        taskList.innerHTML = '';
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="edit-btn" data-index="${index}">Edit</button>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    const saveTasks = (tasks) => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText });
        saveTasks(tasks);
        taskInput.value = '';
        loadTasks();
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-btn')) {
            const index = e.target.dataset.index;
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            const newTaskText = prompt('Edit Task', tasks[index].text);
            if (newTaskText !== null) {
                tasks[index].text = newTaskText;
                saveTasks(tasks);
                loadTasks();
            }
        }
    });

    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = e.target.dataset.index;
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.splice(index, 1);
            saveTasks(tasks);
            loadTasks();
        }
    });

    loadTasks(); 
});

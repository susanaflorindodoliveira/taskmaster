const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Carregar tarefas guardadas no LocalStorage ou iniciar um array vazio
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Função para renderizar as tarefas no ecrã
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">X</button>
        `;
        taskList.appendChild(li);
    });
}

// Função para adicionar uma nova tarefa
function addTask() {
    const text = taskInput.value.trim();
    if (text !== '') {
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        updateLocalStorage();
        renderTasks();
    }
}

// Função para marcar/desmarcar tarefa como concluída
function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    updateLocalStorage();
    renderTasks();
}

// Função para apagar tarefa
function deleteTask(index) {
    tasks.splice(index, 1);
    updateLocalStorage();
    renderTasks();
}

// Atualizar o LocalStorage
function updateLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') addTask();
});

// Renderizar as tarefas ao carregar a página
renderTasks();

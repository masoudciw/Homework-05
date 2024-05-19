// Retrieve tasks and nextId from localStorage
// const nextId = JSON.parse(localStorage.getItem("nextId"));
const taskForm = document.getElementById('formGroup');
const addTask = document.getElementById('taskButton');
const titleForm = document.getElementById('title');
const dateForm = document.getElementById('date');
const textareaForm = document.getElementById('textarea');
const buttonForm = document.getElementById('formButton');
const todos = document.getElementById('todo-cards');
const inProgress = document.getElementById('in-progress');
const projectDone = document.getElementById('done');
const inProgressCards = document.getElementById('in-progress-cards');
const done = document.getElementById('done');
const doneCards = document.getElementById('done-cards');

var myModal = document.getElementById('exampleModal')
var myInput = document.getElementById('formBox')

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus();
});

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Math.round(
        Math.random() * Math.random() * Math.pow(10, 15)
    ).toString();
};

let taskList = JSON.parse(localStorage.getItem('todos')) || [];

const saveToLocalStorage = function () {
    localStorage.setItem('todos', JSON.stringify(taskList));
};
// Todo: create a function to create a task card
addTask.addEventListener('click', function () {
    taskForm.setAttribute('style', 'display: block;');
});


function displayTasks() {
    todos.innerHTML = '';
    if (!taskList.length) {
        todos.innerHTML = 'No Task Found!';
        return;
    }

    if (taskList !== null) {
        taskList.forEach(userData => {
            const div = document.createElement('div');
            div.setAttribute('style', 'border: 3px solid black; border-radius:5px; padding: 5px; margin-bottom: 10px;');
            const titleBody = document.createElement('h2');
            titleBody.textContent = userData.titleContent;
            const dateBody = document.createElement('p');
            dateBody.textContent = userData.dateContent;
            const textareaBody = document.createElement('p');
            textareaBody.textContent = userData.textareaContent;
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.setAttribute('style', 'background-color: red; font-weight: bold; color: #ffffff; margin-bottom:25px;');
            // deleteButton.addEventListener('click', deleteUsers(userData.id));
            const today = dayjs().format('YYYY-MM-DD');
            if (userData.dateContent === today) {
                dateBody.setAttribute('style', ' background-color: green;');
                dateBody.textContent = 'Today!';
            } else if (userData.dateContent < today) {
                dateBody.setAttribute('style', ' background-color: red;');
                dateBody.textContent = 'Past Due!';
            } else if (userData.dateContent > today) {
                dateBody.setAttribute('style', ' background-color: transparent;');
            } else {
                console.log("hello");
            }

            div.appendChild(titleBody);
            div.appendChild(dateBody);
            div.appendChild(textareaBody);
            div.appendChild(deleteButton);
            todos.appendChild(div);
            deleteButton.addEventListener('click', function () {
                const filtered = taskList.filter((item) => item.id !== userData.id);
                taskList = filtered;
                localStorage.removeItem(taskList);
                saveToLocalStorage();
                displayTasks();
                alert('Task Deleted Successfully!');
            });


            $(div).draggable({
                opacity: 0.7,
                zIndex: 100,
                helper: function (e) {
                    const original = $(div).hasClass('ui-draggable')
                        ? $(e.target)
                        : $(e.target).closest('.ui-draggable');
                    return original.clone().css({
                        width: original.outerWidth(),
                    });
                },
            });
            $(document).ready(function () {
                $(inProgress).droppable({
                    accept: div,
                    drop: function (event, ui) {
                        $(inProgress).find("#in-progress-cards").append(div);
                    }
                });
            });
            $(document).ready(function () {
                $(done).droppable({
                    accept: div,
                    drop: function (event, ui) {
                        $(done).find(doneCards).append(div);
                    }
                });
            });



        });
    };
};

displayTasks();


// Todo: create a function to handle adding a new task
function handleAddTask(event) {
    event.preventDefault();

    const titles = titleForm.value.trim();
    const dates = dateForm.value.trim();
    const textareas = textareaForm.value.trim();
    const tasks = {
        id: generateTaskId(),
        titleContent: titles,
        dateContent: dates,
        textareaContent: textareas
    }
    if (tasks) {
        taskList.push(tasks);
        saveToLocalStorage();
        displayTasks();
    } else {
        alert('Please Insert All The Informations!')
    };
};



// Todo: create a function to render the task list and make cards draggable



// // Todo: create a function to handle dropping a task into a new status lane
// function handleDrop(event, ui) {

// }

// // Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
// $(document).ready(function () {

// });

buttonForm.addEventListener('click', handleAddTask);
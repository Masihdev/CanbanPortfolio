let tasksOnBoard = [];
let tasksInBacklog = [];
let selectedUser = [];
let newTask;
let title;
let date;
let category;
let urgency;
let description;
let id;
let selectedEmployee;

let employee = [{
        'name': 'John',
        'email': 'john@gmail.com',
        'pic': '1.png'
    },
    {
        'name': 'Michael',
        'email': 'michael@yahoo.de',
        'pic': '2.png'
    },
    {
        'name': 'Cathrine',
        'email': 'cathrine@gmail.de',
        'pic': '3.png'
    },
    {
        'name': 'Bahar',
        'email': 'bahar@web.de',
        'pic': '4.png'
    },
    {
        'name': 'Darya',
        'email': 'darya@web.de',
        'pic': 'Masih.jpg'
    },
    {
        'name': 'Masih',
        'email': 'masih@web.de',
        'pic': 'masih_img_l (compressed).jpg'
    }
];


/**
 * gets values from input fields and pushes them to tasksOnBoard and tasksinBacklog arrays.
 */

function addNewTask() {
    title = document.getElementById('title');
    date = document.getElementById('date');
    category = document.getElementById('category');
    urgency = document.getElementById('urgency');
    description = document.getElementById('description');

    newTask = {
        'title': title.value,
        'date': date.value,
        'category': category.value,
        'urgency': urgency.value,
        'description': description.value,
        'id': Date.now(),
        'employee': [selectedEmployee]
    };

    pushNewTaskToArray(newTask);
    saveOnBackend();
    reset();
}


/**
 * pushs new task to tasksOnBoard and tasksInBacklog arrays.
 */

function pushNewTaskToArray(newTask) {
    tasksOnBoard.push(newTask);
    tasksInBacklog.push(newTask);
}


/**
 * stringifies the tasksOnBoard and tasksOnBoard arrays.
 */

async function saveOnBackend() {
    await backend.setItem('tasksOnBoard', JSON.stringify(tasksOnBoard));
    await backend.setItem('tasksInBacklog', JSON.stringify(tasksOnBoard));
}


/**
 * clears form input fields after the values are pushed to arrays.
 */

function reset() {
    title.value = '';
    date.value = '';
    category.value = '';
    urgency.value = '';
    description.value = '';
}


/**
 * visualize assigned user while selecting
 */

function selectUser(i) {
    let user = document.getElementById(`user-${i}`);
    user.classList.toggle('avatar-selected');
    if (selectedUser.includes(employee[i])) {
        selectedUser = selectedUser.filter(a => a != employee[i]);
    } else {
        selectedUser.push(employee[i]);
        selectedEmployee = employee[i];
    }
}
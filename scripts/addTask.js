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
        'pic': '1.png',
        'id': ''
    },
    {
        'name': 'Michael',
        'email': 'michael@yahoo.de',
        'pic': '2.png',
        'id': ''
    },
    {
        'name': 'Cathrine',
        'email': 'cathrine@gmail.de',
        'pic': '3.png',
        'id': ''
    },
    {
        'name': 'Bahar',
        'email': 'bahar@web.de',
        'pic': '4.png',
        'id': ''
    }
];



// get values from add task form

async function addNewTask() {
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

    tasksOnBoard.push(newTask);
    tasksInBacklog.push(newTask);
    await backend.setItem('tasksOnBoard', JSON.stringify(tasksOnBoard));
    await backend.setItem('tasksInBacklog', JSON.stringify(tasksInBacklog));
    reset();
}


// reset

function reset() {
    title.value = '';
    date.value = '';
    category.value = '';
    urgency.value = '';
    description.value = '';
}



// render avatar 

// function renderAvatar() {
//     let avatar = document.getElementById('avatar');
//     avatar.innerHTML = '';

//     for (let i = 0; i < users.length; i++) {
//         const user = users[i];

//         avatar.innerHTML += `<img src="./img/${user}">`;

//     }
// }

function selectUser(i) {
    let user = document.getElementById(`user-${i}`);
    user.classList.toggle('avatar-selected');
    if (selectedUser.includes(employee[i])) {
        selectedUser = selectedUser.filter(a => a != employee[i]);
    } else {
        selectedUser.push(employee[i]);
        selectedEmployee = employee[i];
        // tasksOnBoard.push(employee[i]);
        // tasksInBacklog.push(employee[i]);

    }
}
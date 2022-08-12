let currentDraggedElement;



// load tasks on board

async function loadTasks() {
    await downloadFromServer();
    tasksOnBoard = JSON.parse(backend.getItem('tasksOnBoard')) || [];
}

async function loadTasksBacklog() {
    await downloadFromServer();
    tasksInBacklog = JSON.parse(backend.getItem('tasksInBacklog')) || [];
}


// update board

async function updateBoard() {
    await loadTasks();
    let todo = tasksOnBoard.filter(t => t['category'] == 'Management');
    document.getElementById('todo').innerHTML = '';

    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += `
        <div class="dragbox dragbox-priority1" ondragstart="startdragging(${element['id']})" draggable="true">
            <div>
                <p>${element['title']}</p>
                <p>${element['category']}</p>
                <p>${element['urgency']}</p>
                <p>${element['date']}</p>
            </div>
            <div class="dragbox-img">
                <img id="b-img${i}" class="user-photo" alt="">
                <img onclick="deleteTaskBoard(${element['id']})" class="delete" src="./img/delete.ico" alt="">
            </div> 
        </div>
        `;
        for (let j = 0; j < element['employee'].length; j++) {
            const employeePic = element['employee'][j];

            let employeeImgBoard = document.getElementById(`b-img${i}`);
            employeeImgBoard.src = `./img/${employeePic.pic}`;

        }
    }
    updateCategoryInProgress();
    updateCategoryTesting();
    updateCategoryDone();
}


// update category in progress

function updateCategoryInProgress() {
    let inProgress = tasksOnBoard.filter(t => t['category'] == 'IT');
    document.getElementById('in-progress').innerHTML = '';

    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('in-progress').innerHTML += `
        <div class="dragbox dragbox-priority2" ondragstart="startdragging(${element['id']})" draggable="true">
            <div>
                <p>${element['title']}</p>
                <p>${element['category']}</p>
                <p>${element['urgency']}</p>
                <p>${element['date']}</p>
            </div>
            <div class="dragbox-img">
            <img id="b-img-p${i}" class="user-photo" alt="">
            <img onclick="deleteTaskBoard(${element['id']})" class="delete" src="./img/delete.ico" alt="">
            </div> 
        </div>
        `;
        for (let j = 0; j < element['employee'].length; j++) {
            const employeePic = element['employee'][j];

            let employeeImgBoard = document.getElementById(`b-img-p${i}`);
            employeeImgBoard.src = `./img/${employeePic.pic}`;

        }
    }
}


// update category testing

function updateCategoryTesting() {
    let testing = tasksOnBoard.filter(t => t['category'] == 'Design');
    document.getElementById('testing').innerHTML = '';

    for (let i = 0; i < testing.length; i++) {
        const element = testing[i];
        document.getElementById('testing').innerHTML += `
        <div class="dragbox dragbox-priority3" ondragstart="startdragging(${element['id']})" draggable="true">
            <div>
                <p>${element['title']}</p>
                <p>${element['category']}</p>
                <p>${element['urgency']}</p>
                <p>${element['date']}</p>
            </div>
            <div class="dragbox-img">
            <img id="b-img-t${i}" class="user-photo" alt="">
                <img onclick="deleteTaskBoard(${element['id']})" class="delete" src="./img/delete.ico" alt="">
            </div> 
        </div>
        `;
        for (let j = 0; j < element['employee'].length; j++) {
            const employeePic = element['employee'][j];

            let employeeImgBoard = document.getElementById(`b-img-t${i}`);
            employeeImgBoard.src = `./img/${employeePic.pic}`;

        }
    }
}


// update category done

function updateCategoryDone() {
    let done = tasksOnBoard.filter(t => t['category'] == 'Product');
    document.getElementById('done').innerHTML = '';

    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += `
        <div class="dragbox dragbox-priority4" ondragstart="startdragging(${element['id']})" draggable="true">
            <div>
                <p>${element['title']}</p>
                <p>${element['category']}</p>
                <p>${element['urgency']}</p>
                <p>${element['date']}</p>
            </div>
            <div class="dragbox-img">
            <img id="b-img-d${i}" class="user-photo" alt="">
                <img onclick="deleteTaskBoard(${element['id']})" class="delete" src="./img/delete.ico" alt="">
            </div> 
        </div>
        `;
        for (let j = 0; j < element['employee'].length; j++) {
            const employeePic = element['employee'][j];

            let employeeImgBoard = document.getElementById(`b-img-d${i}`);
            employeeImgBoard.src = `./img/${employeePic.pic}`;

        }
    }
}


// function renderTasksOnBoard() {
//     return
// }


async function deleteTaskBoard(id) {
    let taskCard = tasksOnBoard.findIndex(obj => obj.id == id);
    tasksOnBoard.splice(taskCard, 1);
    await backend.setItem('tasksOnBoard', JSON.stringify(tasksOnBoard));
    updateBoard();
}

async function deleteTaskBacklog(id) {
    let taskCard = tasksInBacklog.findIndex(obj => obj.id == id);
    tasksInBacklog.splice(taskCard, 1);
    await backend.setItem('tasksInBacklog', JSON.stringify(tasksInBacklog));
    showBacklog();
}


// function test() {
//     if (urgency == 'High') {
//         document.getElementById('pic-and-name').style.borderColor = 'red';
//         // } else if (category == 'IT') {
//         //     document.getElementById('pic-and-name').style.borderColor = 'green';
//         // } else if (category == 'Design') {
//         //     document.getElementById('pic-and-name').style.borderColor = 'yellow';
//         // } else if (category == 'Product') {
//         //     document.getElementById('pic-and-name').style.borderColor = 'pink';
//         // }
//     }
// }


// start dragging 

function startdragging(id) {
    currentDraggedElement = id;
}


// allow drop

function allowDrop(ev) {
    ev.preventDefault();
}


// move to 

async function moveTo(category) {
    let currentId = tasksOnBoard.find(t => t.id == currentDraggedElement);
    currentId['category'] = category;

    await backend.setItem('tasksOnBoard', JSON.stringify(tasksOnBoard));
    updateBoard();
}


function deleteAllTasks() {
    backend.deleteItem('tasksOnBoard');
    console.log(tasksOnBoard);
    backend.setItem('tasksOnBoard', JSON.stringify(tasksOnBoard));
    // backend.setItem('tasksInBacklog', JSON.stringify(tasksInBacklog));
    updateBoard();
    // showBacklog();
}
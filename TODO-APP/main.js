let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textArea = document.getElementById("textarea");
let msg = document.getElementById('msg');
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log('failure');
        msg.innerHTML = "Task cannot be blank!";
    } else {
        console.log('success');
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");

        // simulate a button click
        add.click();

        // immediately invoked functional expression
        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

let data = [];

let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textArea.value,
    });

    // store the tasks in localStorage
    localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createTasks();
};

// add the new task to the DOM
let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (
            tasks.innerHTML += 
            `
                <div id=${y}>
                    <span class="fw-bold">${x.text}</span>
                    <span class="small text-secondary">${x.date}</span>
                    <p>${x.description}</p>

                    <span class="options">
                        <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa fa-pencil" aria-hidden="true"></i>
                        <i onClick="deleteTask(this)" class="fa fa-trash" aria-hidden="true"></i>
                    </span>
                </div>
            `
            );
        });
    
    resetForm();
}

// delete a task
let deleteTask = (e) => {
    // first parentElement= <span class="options"
    // second parentElement = <div></div>
    e.parentElement.parentElement.remove();

    // we want to remove an item selected for delete
    data.splice(e.parentElement.parentElement.id, 1);

    // store the tasks in localStorage
    localStorage.setItem("data", JSON.stringify(data));
}

// edit the task
let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML; // first child  <span class="fw-bold">${data.text}</span>
    dateInput.value = selectedTask.children[1].innerHTML;
    textArea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

// reset form after Task is added
let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textArea.value = "";
}

// immediately invoked function
(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    createTasks();
    console.log(data);
})();
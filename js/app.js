(function IIFE() {
    const form = document.querySelector(".task-form");
    const taskInput = document.querySelector(".task");
    const tasksList = document.querySelector(".list-group");
    const filterTasks = document.querySelector(".filter-tasks");
    const clearTasksBtn = document.querySelector(".clear-tasks");
    let tasks;
    let id = 0;
    let status = false;

    loadEventListeners();

    function loadEventListeners() {
        document.addEventListener("DOMContentLoaded", getTasks);
        form.addEventListener("submit", addTask);
        tasksList.addEventListener("click", deleteTask);
        clearTasksBtn.addEventListener("click", clearTasks);
        filterTasks.addEventListener("keyup", taskFilter);
    }

    function getTasks() {
        checkStorage();
        tasks.map(item => {
            createTask(item.task);
            if (item.status === true) {
                document.querySelectorAll(".list-group-item").forEach(list => {
                    list.classList.add("done");
                })
            }
        });
    }

    function addTask(e) {
        if (taskInput.value === "") {
            alert("Please add a task.");
        } else {
            createTask(taskInput.value);
            id++;
            status = false;
        }
        storeTasksInLocaleStorage(taskInput.value, status, id);
        taskInput.value = "";
        e.preventDefault();
    }

    function storeTasksInLocaleStorage(task, status, id) {
        checkStorage();
        tasks.push({ task, status, id });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function deleteTask(e) {
        if (e.target.parentElement.classList.contains("delete-task")) {
            if (confirm("Are you sure?")) {
                e.target.parentElement.parentElement.remove();
                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
            }
        }
    }

    function removeTaskFromLocalStorage(taskItem) {
        checkStorage();
        tasks.forEach((task, index) => {
            if (taskItem.textContent === task.task) {
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function clearTasks() {
        while (tasksList.firstChild) {
            tasksList.removeChild(tasksList.firstChild);
        }
        clearLocalStorage();
    }

    function clearLocalStorage() {
        localStorage.clear();
    }

    function taskFilter(e) {
        const text = e.target.value.toLowerCase();
        document.querySelectorAll(".list-group-item").forEach(function (task) {
            const item = task.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task.classList.add("d-flex");
            } else {
                task.classList.add("d-none");
                task.classList.remove("d-flex");
            }
        });
    }

    function createTask(text) {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        const liTask = document.createTextNode(text);
        li.appendChild(liTask);
        const deleteTask = document.createElement("a");
        deleteTask.className = "delete-task";
        deleteTask.setAttribute("href", "#");
        deleteTask.innerHTML = "<i class='fa fa-trash-alt text-dark'></i>";
        li.appendChild(deleteTask);
        tasksList.appendChild(li);
        li.addEventListener("click", function (e) {
            this.classList.toggle("done");
            if (e.target.parentElement.classList.contains("delete-task")) {
                this.classList.toggle("done");
            }
            if (this.classList.contains("done")) {
                status = true;
            } else {
                status = false;
            }
            let store = JSON.parse(localStorage.getItem("tasks"));
            store.map(item => {
                if (item.task == text) {
                    item.status = status;
                }
            });
            localStorage.setItem("tasks", JSON.stringify(store));
        });

    }

    function checkStorage() {
        if (localStorage.getItem("tasks") === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }
    }
})();


(function IIFE() {
    const form = document.querySelector(".task-form");
    const taskInput = document.querySelector(".task");
    const tasksList = document.querySelector(".list-group");
    const filterTasks = document.querySelector(".filter-tasks");
    const clearTasksBtn = document.querySelector(".clear-tasks");

    loadEventListeners();


    function loadEventListeners() {
        form.addEventListener("submit", addTask);
        tasksList.addEventListener("click", deleteTask);
        clearTasksBtn.addEventListener("click", clearTasks);
        filterTasks.addEventListener("keyup", taskFilter);
    }

    function addTask(e) {
        if (taskInput.value === "") {
            alert("Please add a task.");
        } else {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            const liTask = document.createTextNode(taskInput.value);
            li.appendChild(liTask);
            const deleteTask = document.createElement("a");
            deleteTask.className = "delete-task";
            deleteTask.setAttribute("href", "#");
            deleteTask.innerHTML = "<i class='fa fa-trash-alt text-dark'></i>";
            li.appendChild(deleteTask);
            tasksList.appendChild(li);
            taskInput.value = "";
        }
        e.preventDefault();
    }

    function deleteTask(e) {
        if (e.target.parentElement.classList.contains("delete-task")) {
            if (confirm("Are you sure?")) {
                e.target.parentElement.parentElement.remove();
            }
        }
    }

    function clearTasks() {
        while (tasksList.firstChild) {
            tasksList.removeChild(tasksList.firstChild);
        }
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

})();


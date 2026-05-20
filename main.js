let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");

// to store the tasks
let arrayOfTasks = [];
// هنشوف بقي لو في تاسكات في اللوكال ستوريدج هنضيفها في arrayOfTasks
// علشان مش كل ريفريش للصفحة يفضي الأراي ويبدأ من الأول
if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}

getDatafromLocalStorage();

submit.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value); //add tasks to array
    input.value = "";
  }
};

// to delete or update
tasksDiv.addEventListener("click", (e) => {
  // delete button
  if (e.target.classList.contains("del")) {
    // remove from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
    // remove element from page
    e.target.parentElement.remove();
  }
  // task
  if (e.target.classList.contains("task")) {
    taskToggleCompleted(e.target.getAttribute("data-id"));
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(task);
  // هنضيف العناصر او التاسكات للصفحة
  addElementsToPageFrom(arrayOfTasks);
  // هنضيف التاسكس ل اللوكال ستوريدج
  addToLocalStorage(arrayOfTasks);
}
// الفانكشن دي هتاخد addTaskToArray وتعمل لوب عليها وتنشأ عنصر تحطه ف الصفحة
//  وبالتالي لازم أفضي ال TaskDiv علشان مش كل شوية يضيف نفس التاسكات
function addElementsToPageFrom(addTaskToArray) {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let div = document.createElement("div"); //main div
    div.className = "task";
    if (task.completed) {
      div.className = "task done";
    }
    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));
    let span = document.createElement("span");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    // add task div (main div) to class container
    tasksDiv.appendChild(div);
  });
}
function addToLocalStorage(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}
function getDatafromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addToLocalStorage(arrayOfTasks);
}
function taskToggleCompleted(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false
        ? (arrayOfTasks[i].completed = true)
        : (arrayOfTasks[i].completed = false);
    }
  }
  addToLocalStorage(arrayOfTasks);
}

const addNewTask = document.getElementById("addNewTask");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");
const addTask = document.getElementById("addTask");
const addTaskInput = document.getElementById("addTaskInput");
const tasks = document.querySelector(".tasks");
const mon = document.querySelector(".fa-moon");
const sun = document.querySelector(".fa-sun");
const labelBtn = document.querySelector(".label-darkmode");
const numberTask = document.querySelector("#number-task");
const complated = document.getElementById("complated2");
const urgent = document.getElementById("urgent2");
const important = document.getElementById("important2");
const later = document.getElementById("later2");
const toStudy = document.getElementById("toStudy2");
const btns2 = document.querySelectorAll(".btn2");
const tasksClear = document.querySelector(".tasks-clear");
const tasksClearDelet = document.querySelector(".tasks-clear-delet");
const taskContainer = document.querySelector(".task-container");
const updateInput = document.querySelector("#update_input");
const updateBtn = document.querySelector("#update_btn");
const modalUpX = document.querySelector(".p-relative button");
const typeBtns = document.querySelectorAll(".modal-buttons button");
let arr = JSON.parse(localStorage.getItem("todos")) || [];
// sun.style.display = "none";
typeBtns.forEach((e) => {
  e.addEventListener("click", () => {
    type = e.textContent.toLocaleLowerCase().replaceAll(" ", "");
    addTask.style.display = "inline";
  });
  inputValue();
});
function inputValue() {
  if (addTaskInput.value == false) {
    // pustoy
  } else {
    arr.push({
      id: arr.length,
      title: addTaskInput.value,
      complated: false,
      type: type,
    });
  }
  addTask.style.display = "none";
  renderList();
  addTaskInput.value = "";
  localStorage.setItem("todos", JSON.stringify(arr));
  numberTask.innerHTML = arr.length;
}
function updateTask() {
  arr.map((item) => {
    if (item.id == isUptedId) {
      item.title = updateInput.value;
    }
  });
  document.querySelector(".modal-update").style.display = "none";
  renderList();
  addTaskInput.value = "";
  localStorage.setItem("todos", JSON.stringify(arr));
}
updateBtn.addEventListener("click", updateTask);
modalUpX.addEventListener("click", () => {
  document.querySelector(".modal-update").style.display = "none";
});
let storedTogglBlac = localStorage.getItem("togglBlac");
let togglBlac = true;
if (storedTogglBlac) {
  togglBlac = JSON.parse(storedTogglBlac);
} else {
  localStorage.setItem("togglBlac", togglBlac);
}

function toggleColors() {
  if (togglBlac) {
    modal.style.background = "#54BAB9";
    document.querySelector(".root").style.background = "white";
    document.querySelector(".section1-child1").style.background = "#54BAB9";
    document.querySelector(".section1-main").style.background = "#54BAB9";
    document.querySelector(".section1-child2-header").style.background =
      "#54BAB9";
    document.querySelector(".modal-update").style.background = "#54BAB9";
  } else {
    modal.style.background = "#354259";
    document.querySelector(".root").style.background = "#1C273C";
    document.querySelector(".section1-child1").style.background = "#354259";
    document.querySelector(".section1-main").style.background = "#354259";
    document.querySelector(".section1-child2-header").style.background =
      "#354259";
    document.querySelector(".modal-update").style.background = "#354259";
  }
}
function toggleMode() {
  togglBlac = !togglBlac;
  toggleColors();
  localStorage.setItem("togglBlac", togglBlac);
}
toggleColors();
labelBtn.addEventListener("click", toggleMode);
document.addEventListener("keydown", (e) => {
  if (e.key == "Escape") {
    addClass();
  }
});
addTask.addEventListener("click", inputValue);
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    inputValue();
  }
});
function renderAddTasks() {}
function renderList() {
  tasks.innerHTML = "";
  arr.forEach((item) => {
    let li = document.createElement("li");
    tasks.appendChild(li);
    li.innerHTML = `
    <li class="task">
    <div class="task__item">
      <button class="btn-complated check-btn" type="button">
        <i id="check" class="fa-solid fa-check"></i>
      </button>
      <p class="task-text">${item.title}</p>
    </div>
    <div>
      <button  class="task-type ${item.type} btn">${item.type}</button>
      <button class="task-clear">
        <i class="fa-solid fa-xmark"></i>
      </button>
      <button class="task-updet">
        <i class="fa-solid fa-pencil"></i>
      </button>
    </div>
  </li>
    `;
    let taskClear = li.querySelector(".task-clear");
    let taskClearI = li.querySelector(".task-clear i");
    let complatedBtn = li.querySelector(".btn-complated");
    let complatedBtnI = li.querySelector(".btn-complated i");
    let updet = li.querySelector(".task-updet");
    let updetI = li.querySelector(".task-updet i");
    updet.id = item.id;
    updetI.id = item.id;
    if (item.complated) {
      complatedBtn.style.backgroundColor = "#409543";
      complatedBtnI.style.color = "white";
    } else {
      complatedBtn.style.backgroundColor = "none";
      complatedBtnI.style.color = "none";
    }
    taskClear.id = item.id;
    taskClearI.id = item.id;
    complatedBtn.id = item.id;
    complatedBtnI.id = item.id;
    li.querySelector(".task-type").id = item.id;
    addTaskInput.value = "";
  });
  renderCloseBtn();
  addClass();
  complatedTask();
  updet();
}
renderList();
function renderCloseBtn() {
  let closeBtn = document.querySelectorAll(".task-clear");
  closeBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      let newArr = arr.filter((element) => element.id !== Number(e.target.id));
      arr = newArr;
      renderList();
      localStorage.setItem("todos", JSON.stringify(arr));
    });
  });
  numberTask.innerHTML = arr.length;
}
renderCloseBtn();
function complatedTask() {
  let complatedBtn = document.querySelectorAll(".btn-complated");
  complatedBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      arr.forEach((element) => {
        if (element.id == Number(e.target.id)) {
          element.complated = !element.complated;
          renderList();
          localStorage.setItem("todos", JSON.stringify(arr));
        }
      });
    });
  });
}
complatedTask();
function updet() {
  let updetBtn = document.querySelectorAll(".task-updet");
  updetBtn.forEach((item) => {
    item.addEventListener("click", (e) => {
      removeClass();
      document.querySelector(".modal-update").style.display = "inline";
      let textApted = arr.find(
        (element) => element.id == Number(e.target.id)
      ).title;
      updateInput.value = textApted;
      isUptedId = Number(e.target.id);
      renderList();
    });
  });
}
updet();
function addClass() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}
function removeClass() {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
addNewTask.addEventListener("click", removeClass);
overlay.addEventListener("click", addClass);
function searchTask() {
  const filterBtns = document.querySelectorAll(".filter-bottoms button");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.id == "show-all") {
        renderList();
      } else {
        const filteredTasks = arr.filter((task) => {
          return task.type.includes(e.target.id);
        });
        renderFilteredTasks(filteredTasks);
      }
    });
  });
}
searchTask();
function renderFilteredTasks(filteredTasks) {
  tasks.innerHTML = "";
  filteredTasks.forEach((item) => {
    let li = document.createElement("li");
    tasks.appendChild(li);
    li.innerHTML = `
      <li class="task">
        <div class="task__item">
          <button class="btn-complated check-btn" type="button">
            <i id="check" class="fa-solid fa-check"></i>
          </button>
          <p class="task-text">${item.title}</p>
        </div>
        <div>
          <button class="task-type ${item.type} btn">${item.type}</button>
          <button class="task-clear">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <button class="task-updet">
            <i class="fa-solid fa-pencil"></i>
          </button>
        </div>
      </li>
    `;
    let taskClear = li.querySelector(".task-clear");
    let taskClearI = li.querySelector(".task-clear i");
    let complatedBtn = li.querySelector(".btn-complated");
    let complatedBtnI = li.querySelector(".btn-complated i");
    let updet = li.querySelector(".task-updet");
    let updetI = li.querySelector(".task-updet i");
    updet.id = item.id;
    updetI.id = item.id;
    if (item.complated) {
      complatedBtn.style.backgroundColor = "#409543";
      complatedBtnI.style.color = "white";
    } else {
      complatedBtn.style.backgroundColor = "none";
      complatedBtnI.style.color = "none";
    }
    taskClear.id = item.id;
    taskClearI.id = item.id;
    complatedBtn.id = item.id;
    complatedBtnI.id = item.id;
    li.querySelector(".task-type").id = item.id;
    addTaskInput.value = "";
  });
  renderCloseBtn();
  addClass();
  complatedTask();
  updet();
}
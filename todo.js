// Hiệu ứng tuyết rơi full màn hình
const snowContainer = document.getElementById("snow-container");
const snowflakes = 100; // Số lượng bông tuyết

for (let i = 0; i < snowflakes; i++) {
  const snowflake = document.createElement("div");
  snowflake.classList.add("snowflake");
  snowflake.textContent = "❄";

  // Random vị trí, kích thước và tốc độ
  const randomX = Math.random() * 100; // Vị trí ngang
  const randomDelay = Math.random() * 5; // Trễ bắt đầu
  const randomDuration = Math.random() * 5 + 5; // Thời gian rơi (5-10 giây)
  const randomSize = Math.random() * 1.5 + 0.5; // Kích thước (0.5-2rem)

  snowflake.style.left = `${randomX}vw`;
  snowflake.style.animationDelay = `${randomDelay}s`;
  snowflake.style.animationDuration = `${randomDuration}s`;
  snowflake.style.fontSize = `${randomSize}rem`;

  snowContainer.appendChild(snowflake);
}

// Danh sách Todo
let todos = [
  {
    id: 1,
    task: "Decorate Christmas Tree 🎄",
    dueDate: "2024-12-15",
    status: "Pending",
  },
  { id: 2, task: "Buy Gifts 🎁", dueDate: "2024-12-20", status: "Pending" },
  {
    id: 3,
    task: "Prepare Christmas Dinner 🍗",
    dueDate: "2024-12-24",
    status: "Completed",
  },
];

// Hiển thị danh sách Todo
function displayTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear danh sách cũ

  todos.forEach((todo) => {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${todo.task}</td>
            <td>${todo.dueDate}</td>
            <td>
                <select class="status-select" data-id="${todo.id}">
                    <option value="Pending" ${
                      todo.status === "Pending" ? "selected" : ""
                    }>Pending</option>
                    <option value="Completed" ${
                      todo.status === "Completed" ? "selected" : ""
                    }>Completed</option>
                </select>
            </td>
            <td>
                <button class="edit-btn" data-id="${todo.id}">Edit</button>
                <button class="delete-btn" data-id="${todo.id}">Delete</button>
            </td>
        `;

    todoList.appendChild(row);
  });

  attachStatusChangeListeners();
  attachEventListeners();
}

// Thêm Task
function addTodo() {
  const taskInput = document.getElementById("new-task");
  const dueDateInput = document.getElementById("new-due-date");

  if (taskInput.value.trim() === "" || dueDateInput.value.trim() === "") {
    alert("Please fill out both fields!");
    return;
  }

  const newTodo = {
    id: Date.now(),
    task: taskInput.value,
    dueDate: dueDateInput.value,
    status: "Pending",
  };

  todos.push(newTodo);
  displayTodos();

  taskInput.value = "";
  dueDateInput.value = "";
}

// Sửa Task
function editTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  const newTask = prompt("Edit Task:", todo.task);
  const newDueDate = prompt("Edit Due Date:", todo.dueDate);

  if (newTask && newDueDate) {
    todo.task = newTask;
    todo.dueDate = newDueDate;
    displayTodos();
  }
}

// Xóa Task
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  displayTodos();
}

// Gắn sự kiện sửa và xóa
function attachEventListeners() {
  const editButtons = document.querySelectorAll(".edit-btn");
  const deleteButtons = document.querySelectorAll(".delete-btn");

  editButtons.forEach((btn) => {
    btn.addEventListener("click", () => editTodo(Number(btn.dataset.id)));
  });

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => deleteTodo(Number(btn.dataset.id)));
  });
}

// Gắn sự kiện thay đổi trạng thái
function attachStatusChangeListeners() {
  const statusSelects = document.querySelectorAll(".status-select");

  statusSelects.forEach((select) => {
    select.addEventListener("change", (event) => {
      const id = Number(event.target.dataset.id);
      const newStatus = event.target.value;

      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        todo.status = newStatus;
        displayTodos();
      }
    });
  });
}

// Gắn sự kiện cho nút thêm
document.getElementById("add-btn").addEventListener("click", addTodo);

// Hiển thị danh sách Todo ban đầu
displayTodos();

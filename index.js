// Mảng chứa danh sách Todo
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

// Hàm hiển thị danh sách Todo
function displayTodos() {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // Clear nội dung cũ

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

  // Gắn sự kiện cho dropdown thay đổi status
  attachStatusChangeListeners();
  attachEventListeners();
}

// Hàm thêm Task mới
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

  // Clear input fields
  taskInput.value = "";
  dueDateInput.value = "";
}

// Hàm sửa Task
function editTodo(id) {
  const todo = todos.find((todo) => todo.id === id);

  const newTask = prompt("Edit Task:", todo.task);
  const newDueDate = prompt("Edit Due Date:", todo.dueDate);

  // Kiểm tra giá trị mới và cập nhật
  if (newTask && newDueDate) {
    todo.task = newTask;
    todo.dueDate = newDueDate;
    displayTodos();
  }
}

// Hàm xóa Task
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  displayTodos();
}

// Gắn sự kiện cho nút Sửa và Xóa
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

// Gắn sự kiện cho dropdown thay đổi status
function attachStatusChangeListeners() {
  const statusSelects = document.querySelectorAll(".status-select");

  statusSelects.forEach((select) => {
    select.addEventListener("change", (event) => {
      const id = Number(event.target.dataset.id);
      const newStatus = event.target.value;

      const todo = todos.find((todo) => todo.id === id);
      if (todo) {
        todo.status = newStatus;
        displayTodos(); // Cập nhật lại giao diện
      }
    });
  });
}

// Gắn sự kiện cho nút Thêm Task
document.getElementById("add-btn").addEventListener("click", addTodo);

// Hiển thị danh sách Todo ban đầu
displayTodos();

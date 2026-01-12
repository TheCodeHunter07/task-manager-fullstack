const API = "http://localhost:5000/tasks";
const AUTH_LOGIN = "http://localhost:5000/auth/login";
const AUTH_REGISTER = "http://localhost:5000/auth/register";

// store all tasks for filtering
let allTasks = [];

/* =========================
   AUTH HELPERS
========================= */
function getToken() {
  return localStorage.getItem("token");
}

/* =========================
   LOGIN
========================= */
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const errorEl = document.getElementById("loginError");

  errorEl.innerText = "";

  const res = await fetch(AUTH_LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    errorEl.innerText = data.message || "Login failed";
    return;
  }

  localStorage.setItem("token", data.token);

  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("app").style.display = "flex";

  fetchTasks();
}

/* =========================
   REGISTER
========================= */
async function register() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const errorEl = document.getElementById("loginError");

  errorEl.innerText = "";

  const res = await fetch(AUTH_REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (!res.ok) {
    errorEl.innerText = data.message;
    return;
  }

  errorEl.innerText = "Registered successfully. Please login.";
  toggleAuth();
}

/* =========================
   TOGGLE LOGIN / REGISTER
========================= */
let isLogin = true;

function toggleAuth() {
  isLogin = !isLogin;

  document.getElementById("authTitle").innerText = isLogin ? "Login" : "Register";
  document.getElementById("loginBtn").style.display = isLogin ? "block" : "none";
  document.getElementById("registerBtn").style.display = isLogin ? "none" : "block";
}

/* =========================
   LOGOUT
========================= */
function logout() {
  localStorage.removeItem("token");
  location.reload();
}

/* =========================
   ADD TASK
========================= */
async function addTask() {
  const token = getToken();
  if (!token) return alert("Please login first");

  const task = {
    title: title.value,
    description: description.value,
    priority: priority.value,
    dueDate: dueDate.value
  };

  await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify(task)
  });

  title.value = "";
  description.value = "";
  priority.value = "medium";
  dueDate.value = "";

  fetchTasks();
}

/* =========================
   FETCH TASKS
========================= */
async function fetchTasks() {
  const token = getToken();
  if (!token) return;

  const res = await fetch(API, {
    headers: { Authorization: "Bearer " + token }
  });

  const tasks = await res.json();
  allTasks = tasks;

  updateStats(tasks);
  renderTasks(tasks);
}

/* =========================
   UPDATE DASHBOARD STATS
========================= */
function updateStats(tasks) {
  total.innerText = tasks.length;

  const completedCount = tasks.filter(t => t.completed).length;
  const inProgressCount = tasks.filter(t => !t.completed).length;

  completed.innerText = completedCount;
  progress.innerText = inProgressCount;
}

/* =========================
   RENDER TASKS
========================= */
function renderTasks(tasks) {
  taskList.innerHTML = "";

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "task";

    div.innerHTML = `
      <input type="checkbox"
        ${task.completed ? "checked" : ""}
        onchange="toggleComplete('${task._id}', ${task.completed})"
      />

      <strong style="
        margin-left:8px;
        text-decoration:${task.completed ? "line-through" : "none"};
      ">
        ${task.title}
      </strong>

      <div>${task.description || ""}</div>
      <small>Priority: ${task.priority}</small><br>

      <button onclick="deleteTask('${task._id}')">Delete</button>
    `;

    taskList.appendChild(div);
  });
}

/* =========================
   TOGGLE COMPLETED
========================= */
async function toggleComplete(taskId, currentStatus) {
  const token = getToken();

  await fetch(`${API}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ completed: !currentStatus })
  });

  fetchTasks();
}

/* =========================
   DELETE TASK
========================= */
async function deleteTask(taskId) {
  const token = getToken();
  if (!confirm("Delete this task?")) return;

  await fetch(`${API}/${taskId}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });

  fetchTasks();
}

/* =========================
   TAB FILTERS
========================= */
function showAll() {
  renderTasks(allTasks);
}

function showCompleted() {
  renderTasks(allTasks.filter(t => t.completed));
}

function showInProgress() {
  renderTasks(allTasks.filter(t => !t.completed));
}

/* =========================
   SEARCH TASKS
========================= */
function searchTasks() {
  const query = document.getElementById("searchInput").value.toLowerCase();

  const filtered = allTasks.filter(task =>
    task.title.toLowerCase().includes(query) ||
    (task.description && task.description.toLowerCase().includes(query))
  );

  renderTasks(filtered);
}

/* =========================
   PAGE LOAD CHECK
========================= */
window.onload = () => {
  const token = getToken();

  if (token) {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("app").style.display = "flex";
    fetchTasks();
  } else {
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("app").style.display = "none";
  }
};

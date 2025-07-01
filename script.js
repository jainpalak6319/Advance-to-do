 const menuIcon = document.querySelector(".menu-sign");
  const navLinks = document.querySelector(".menu-list");

  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#list li').forEach(li => {
    const text = li.querySelector('span').textContent;
    const completed = li.querySelector('span').classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    const tasks = JSON.parse(saved);
    tasks.forEach(task => createTaskElement(task.text, task.completed));
  }
}
function updateCounts(){
  let total=document.querySelectorAll('#list li').length;
  let completed=document.querySelectorAll('#list .completed').length;
  let pending=total-completed;
  document.getElementById('total-count').textContent=total;
  document.getElementById('Completed-count').textContent=completed;
  document.getElementById('Pending-count').textContent=pending;
}
function createTaskElement(taskText, isCompleted) {
  const li = document.createElement('li');

  const span = document.createElement('span');
  span.textContent = taskText;
  if (isCompleted) span.classList.add('completed');

  // ✅ Toggle completed
  span.addEventListener('click', function () {
    this.classList.toggle('completed');
    updateCounts();
    saveTasks();
  });

  // ✅ Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '❌';
  deleteBtn.title = "Delete Task";
  deleteBtn.addEventListener('click', function () {
    li.remove();
    updateCounts();
    saveTasks();
  });

  // ✅ Edit button
  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.title = "Edit Task";

  editBtn.addEventListener('click', function () {
    // Prevent editing completed tasks
    if (span.classList.contains('completed')) {
      alert("You can't edit a completed task. Uncheck it first.");
      return;
    }

    if (editBtn.textContent === '✏️') {
      // Enter edit mode
      const input = document.createElement('input');
      input.type = 'text';
      input.value = span.textContent;
      input.classList.add('edit-input');

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') editBtn.click();
      });

      li.insertBefore(input, span);
      li.removeChild(span);
      editBtn.textContent = '💾';
      editBtn.title = 'Save Task';
      input.focus();
    } else {
      // Save edited task
      const input = li.querySelector('input');
      const newText = input.value.trim();

      if (newText === '') {
        alert("Task can't be empty!");
        return;
      }

      span.textContent = newText;
      li.insertBefore(span, input);
      li.removeChild(input);
      editBtn.textContent = '✏️';
      editBtn.title = "Edit Task";
      saveTasks();
    }
  });

  // Append elements
  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);
  document.getElementById('list').appendChild(li);
}


function addTask() {
  let userInput = document.getElementById('input-text');
  let task = userInput.value.trim();

  if (task === "") {
    return alert("Task can't be empty!");
  }

  createTaskElement(task, false);
  userInput.value = "";
  updateCounts();
  saveTasks();
}
window.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  updateCounts();
});
function filterTasks(type) {
  const listItems = document.querySelectorAll('#list li');

  listItems.forEach(li => {
    const isCompleted = li.querySelector('span').classList.contains('completed');

    if (type === 'all') {
      li.style.display = 'flex';
    } else if (type === 'completed' && isCompleted) {
      li.style.display = 'flex';
    } else if (type === 'pending' && !isCompleted) {
      li.style.display = 'flex';
    } else {
      li.style.display = 'none';
    }
  });
}
document.querySelector('.mode-switch').addEventListener('click', function () {
  document.body.classList.toggle('dark');
  document.querySelector('.main-content').style.backgroundColor='transparent';

  // Optional: Change button text based on mode
  this.textContent = document.body.classList.contains('dark')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';

  // Save user preference
  localStorage.setItem('darkMode', document.body.classList.contains('dark'));
});
window.addEventListener('DOMContentLoaded', () => {
  // Check if dark mode was saved
  const isDark = localStorage.getItem('darkMode') === 'true';
  if (isDark) {
    document.body.classList.add('dark');

    // Also set the button text (optional)
    const modeSwitch = document.querySelector('.mode-switch');
    if (modeSwitch) {
      modeSwitch.textContent = '☀️ Light Mode';
    }

    // Optional: set specific background styles again
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.style.backgroundColor = 'transparent';
    }
  }
});

function getGreeting() {
      const hours = new Date().getHours();

      if (hours >= 5 && hours < 12) {
        return "Good Morning ☀️";
      } else if (hours >= 12 && hours < 17) {
        return "Good Afternoon 🌞";
      } else if (hours >= 17 && hours < 21) {
        return "Good Evening 🌙";
      } else {
        return "Good Night 🌃";
      }
    }

    function updateGreeting() {
      document.getElementById("greetings").textContent = getGreeting();
    }

    // Initial greeting
    updateGreeting();

    // Update greeting every minute (60000 ms)
    setInterval(updateGreeting, 60000);

 
window.addEventListener('load', async() => {
  try {
    const response = await fetch('/todos', { method: 'GET' });
    const data = await response.json();

    if (data.length === 0) {
      return data;
    }

    return data.forEach((task) => {
      document.getElementById('taskTable').innerHTML += `
    <tr>
        <td id="name" class="title">${task.name}</td>
        <td id="date" class="dueDate">${task.due_date}</td>
        <td id="desc" class="description">${task.description}</td>
        <td id="isComplete" class="completed">${task.completed}</td>
        <td class="buttons">
          <button id="updateButton" onclick="updateTask(${task.id})">Update</button>
        </td>
        <td class="buttons">
          <button onclick="deleteTask(${task.id})">Delete</button>
        </td>
        <td class="buttons">
          <button onclick="completeTask(${task.id})">Complete</button>
        </td>
      </tr>
    `;
    });
  }
  catch (err) {
    console.log(err);
  }
});
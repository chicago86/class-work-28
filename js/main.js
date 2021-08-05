(function () {
  "use strict";
  const taskForm = document.querySelector(".ba-add-form");
  const completedList = document.querySelector("#completed-list");
  const incompletedList = document.querySelector("#incompleted-list");

  function addItem(event) {
    event.preventDefault();

    const liTmpl = document.getElementById("task-tmpl").innerHTML;
    const newTaskInput = document.getElementById("new-task");
    let newTask = newTaskInput.value;

    incompletedList.innerHTML += liTmpl.replace(/{{task}}/gi, newTask);

    this.reset();
    newTaskInput.focus();
  }

  taskForm.addEventListener("submit", addItem);

  function taskAction(event) {
    let eventEl = event.target;
    let action = eventEl.dataset.action;
    // console.log(eventEl);
    // console.log(action);
    console.log(event);

    let taskLi = eventEl.closest("li");
    if (taskLi == null) {
      return;
    }
    let editedInput = taskLi.querySelector('[type="text"]');

    switch (action) {
      case "move":
        if (eventEl.checked) {
          completedList.appendChild(taskLi);
        } else {
          incompletedList.appendChild(taskLi);
        }
        break;

      case "delete":
        taskLi.remove();
        break;
      //   case "save":
      //     if (event.keyCode == 13) {
      //       editedInput.readOnly = true;
      //     }
      //     if (event.keyCode == 27) {
      //       editedInput.value = editedInput.dataset.defValue;
      //     }
      //     break;
      case "edit":
        let editedInput = taskLi.querySelector('[type="text"]');
        editedInput.readOnly = !editedInput.readOnly;

        editedInput.dataset.defValue = editedInput.value;

        editedInput.focus();

        editedInput.selectionStart = editedInput.value.length;

        break;
    }
  }

  document.addEventListener("click", taskAction);
  document.addEventListener("keydown", taskAction);
})();

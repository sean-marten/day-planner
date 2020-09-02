$(document).ready(function () {
  // Declare variables
  const $schedule = $(".schedule");
  const dayHours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
  let tasks = [];

  // Initialize the planner by checking if there is locally stored data
  function init() {
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks !== null) {
      tasks = storedTasks;
    }
  }

  // Call methods to populate webpage
  init();
  renderPage();

  // Method to dynamically add schedule rows
  function renderPage() {
    for (let i = 0; i < dayHours.length; i++) {
      const $title = $("h1");
      const $row = $("<div>");
      const $task = $("<input>");
      const $time = $("<div>");
      const $updateContent = $("<button>");
      const $icon = $("<i>");

      const date = moment("2000-01-01 09:00:00").add(i, "hours");
      const amPm = moment(date).format("A");
      const timeDiff =
        (amPm === "AM"
          ? dayHours[i]
          : dayHours[i] === 12
          ? dayHours[i]
          : dayHours[i] + 12) - moment().format("HH");
      const bcgColor =
        timeDiff < 0
          ? "lightgray"
          : timeDiff === 0
          ? "lightcoral"
          : "lightgreen";

      tasks.forEach(function (task) {
        if (task.id == i) {
          $task.val(task.task);
        }
      });

      $title.text(`${moment().format("dddd")}'s Work Schedule`);

      $row.addClass("row align-items-center");

      $time
        .text(`${dayHours[i]}${amPm}`)
        .addClass("col-2 align-items-center")
        .css({
          border: "2px solid black",
          padding: "27px",
          "background-color": "lightblue",
          "font-weight": "bold",
        });

      $task
        .text(" ")
        .css({
          padding: "27px",
          "background-color": bcgColor,
          border: "2px solid black",
        })
        .addClass("col-8 task")
        .attr("id", i);

      $icon.addClass("fa fa-save fa-2x");
      $updateContent.addClass("col-2 d-inline-block").attr("id", i).css({
        height: "82px",
        "background-color": "lightblue",
      });

      $schedule.append($row.append($time, $task, $updateContent.append($icon)));
    }

    // Method to handle the click event for the save button
    function handleClick(e) {
      const id = e.target.id;
      const $task = $(`.task[id=${id}]`);
      let textToUpdate;

      for (let i = 0; i < $task.length; i++) {
        if ($task[i].id === id) {
          textToUpdate = $task.val();
        }
      }
      updateStorage(textToUpdate, id);
    }

    // Method to update the local storage of tasks
    function updateStorage(text, index) {
      for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === index) {
          tasks[i].task = text;
          console.log(tasks);
          break;
        } else {
          tasks.push({
            id: index,
            task: text,
          });
          console.log(tasks);
          break;
        }
      }
      if (tasks.length === 0) {
        tasks.push({
          id: index,
          task: text,
        });
        console.log(tasks);
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Event delegation to spot button clicks
    $(document).on("click", "button", handleClick);
  }
});

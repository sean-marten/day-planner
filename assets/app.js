$(document).ready(function () {
  const $schedule = $(".schedule");
  const dayHours = [9, 10, 11, 12, 1, 2, 3, 4, 5];
  let tasks = []

  // Initialize the planner by checking if there is locally stored data
  function init() {
    var storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks !== null) {
      tasks = storedTasks;
    }
  }
  init();
  renderPage();


  function renderPage() {
    for (let i = 0; i < dayHours.length; i++) {
      const $row = $("<div>");
      const $task = $("<input>");
      const $time = $("<div>");
      const $updateContent = $("<button>");

      const amPm = moment(`2000-01-01T09:00:00+0${i}:00`).format("A");
      const timeDiff = (amPm ? dayHours[i] : dayHours[i] + 12) - moment().format("HH");
      const bcgColor = timeDiff < 0 ? "gray" : (timeDiff === 0 ? "blue" : "green");

      tasks.forEach(function(task) {
        if (task.id == i) {
            $task.val(task.task);
        }
      })

      $row.addClass("row align-items-center");

      $time.text(`${dayHours[i]}${amPm}`).addClass("col-2 align-items-center").css({
        border: "2px solid black",
        padding: "27px",
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

      $updateContent.addClass("col-2 d-inline-block").css("height", "84px").attr("id", i);

      $schedule.append($row.append($time, $task, $updateContent));

    }

    function handleClick(e) {
        const id = e.target.id;
        const $task = $(`.task[id=${id}]`);
        let textToUpdate;

        for (let i = 0; i < $task.length; i++) {
            if ($task[i].id === id) {
                textToUpdate = $task.val();
            }
        }
        updateStorage(textToUpdate, id)
    }

    function updateStorage(text, index) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].id === index) {
                tasks[i].task = text;
                console.log(tasks)
            } else {
                tasks.push({
                    id: index,
                    task: text,
                });
                console.log(tasks)
            }
        }
        if (tasks.length === 0) {
            tasks.push({
                id: index,
                task: text,
            });
            console.log(tasks)
        }
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    $(document).on("click", "button", handleClick)


  }
});

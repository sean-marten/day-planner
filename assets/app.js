$(document).ready(function () {
  const $schedule = $(".schedule");
  const dayHours = [9, 10, 11, 12, 1, 2, 3, 4, 5];

  renderPage();
  function renderPage() {
    for (let i = 0; i < dayHours.length; i++) {
      const $row = $("<div>");
      const $task = $("<div>");
      const $time = $("<div>");
      const $updateContent = $("<button>");

      $row.addClass("row align-items-center");

      $time.text("12PM").addClass("col-2 align-items-center").css({
        border: "2px solid black",
        padding: "27px",
      });

      $task
        .text(" ")
        .css({
          padding: "40px",
          "background-color": "gray",
          border: "2px solid black",
        })
        .addClass("col-8");

      $updateContent.addClass("col-2 d-inline-block").css("height", "84px");

      $schedule.append($row.append($time, $task, $updateContent));
    }
  }
});

// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //

  var saveButton = $(".saveBtn")
  saveButton.on("click", function () {
    var timeId = $(this).parent().attr("id")
    var parent = $(this).parent()
    var textArea = $("> textarea", parent)
    var textContent = textArea.val()
    console.log(textContent)
    localStorage.setItem(timeId, textContent)
  })
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  var time = setInterval(function () {
    var hour = dayjs().format("HH")
    var schedule = $(".container-fluid div").filter(":even")
    for (i = 0; i < schedule.length; i++) {
      if (i + 9 > hour) {
        var currentEl = schedule.get(i)
        schedule.get(i).classList.add("future")
        schedule.get(i).classList.remove("present")
        schedule.get(i).classList.remove("past")
      } else if (i + 9 == hour) {
        schedule.get(i).classList.add("present")
        schedule.get(i).classList.remove("future")
        schedule.get(i).classList.remove("past")
      } else {
        schedule.get(i).classList.add("past")
        schedule.get(i).classList.remove("present")
        schedule.get(i).classList.remove("future")
      }
    }
  }, 1000)


  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  var container = $(".container-fluid textarea")
  $.each(container, function () {
    var attribute = $(this).parent().attr("id")
    var storedText = localStorage.getItem(attribute)
    var currentDiv = $(this).parent()
    var area = $(">textarea", currentDiv)
    area.text(storedText)
  })
  // TODO: Add code to display the current date in the header of the page.
  var currentTime = dayjs().format("MMM DD, YYYY")
  var timeEl = $("#currentDay")
  timeEl.text(currentTime)

})
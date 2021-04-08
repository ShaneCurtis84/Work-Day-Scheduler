$(document).ready(function () {
    // Add Current Day and Date//
    var currentTimeDate = moment().format("dddd, MMM Do YYYY");
    $("#currentDay").html(currentTimeDate);
  
    // Timeblocks array
  
    var timeBlock = [
      {
        hour: "9:00AM",
        time: "9",
        hourDiv: "hour9",
      },
  
      {
        hour: "10:00AM",
        time: "10",
        hourDiv: "hour10",
      },
  
      {
        hour: "11:00AM",
        time: "11",
        hourDiv: "hour11",
      },
  
      {
        hour: "12:00PM",
        time: "12",
        hourDiv: "hour12",
      },
  
      {
        hour: "1:00PM",
        time: "13",
        hourDiv: "hour13",
      },
  
      {
        hour: "2:00PM",
        time: "14",
        hourDiv: "hour14",
      },
  
      {
        hour: "3:00PM",
        time: "15",
        hourDiv: "hour15",
      },
  
      {
        hour: "4:00PM",
        time: "16",
        hourDiv: "hour16",
      },
  
      {
        hour: "5:00PM",
        time: "17",
        hourDiv: "hour17",
      },
    ];
  
    var containerEl = $(".container");
  
    // Loop through lenth of array and create elements for each timeblock row
  
    timeBlock.forEach(function (timeControl) {
      // creates timeblocks row
      var timeBlockRow = $("<div>");
  
      timeBlockRow.attr({ class: "time-block row" });
      timeBlockRow.attr("id", timeControl.hourDiv);
  
      // Current Hour Section
      var hourSection = $("<div>");
  
      hourSection.text(`${timeControl.hour}`);
      hourSection.attr({ class: "col-md-1 hour" });
  
      // Text field for scheduler
      var eventText = $("<textarea>");
  
      eventText.attr({ class: "col-md-10 description" });
  
      // create save button element and inner i element for save icon
      var saveButton = $("<button>");
  
      saveButton.attr({ class: "col-md-1 saveBtn" });
      var fontAwesIcon = $("<i>");
  
      fontAwesIcon.attr({ class: "far fa-save fa-lg" });
  
      //Append elements to the page
  
      containerEl.append(timeBlockRow);
      saveButton.append(fontAwesIcon);
      timeBlockRow.append(hourSection, eventText, saveButton);
    });
  
    function timeCheck() {
      //Variable for current hour in Moments.js
      var currentHour = moment().hour();
  
      //Loop to compare Currenthour with time block rows
      $(".time-block").each(function () {
        var currentTimeRow = parseInt($(this).attr("id").split("hour")[1]);
  
        //Check current time and add and remove css classes to indicate past/present or future
  
        if (currentTimeRow < currentHour) {
          $(this).addClass("past");
          $(this).removeClass("future");
          $(this).removeClass("present");
        } else if (currentTimeRow === currentHour) {
          $(this).removeClass("past");
          $(this).addClass("present");
          $(this).removeClass("future");
        } else {
          $(this).removeClass("present");
          $(this).removeClass("past");
          $(this).addClass("future");
        }
      });
    }
  
    // Call function
    timeCheck();
  
    //Load saved content from local storage
    function loadSavedContent() {
      $(".description").each(function () {
        var inputId = $(this).parent().attr("id");
        $(this).val(localStorage.getItem(inputId));
      });
    }
    loadSavedContent();
  
    //Click function for save buttons
    $(".saveBtn").on("click", function () {
      var hour = $(this).parent().attr("id");
      var event = $(this).siblings(".description").val();
  
      //Add content to local storage when save button clicked
      localStorage.setItem(hour, event);
    });
  });
  
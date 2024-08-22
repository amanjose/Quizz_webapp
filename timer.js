// Set the date and time to countdown to (in UTC)
var countdownDate = new Date("April 28, 2025 16:00:00").getTime();

// Update the countdown every second
var x = setInterval(function() {

  // Get the current date and time (in UTC)
  var now = new Date().getTime();

  // Calculate the difference between the current date and time and the countdown date and time
  var distance = countdownDate - now;

  // Calculate the days, hours, minutes, and seconds remaining
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var months = Math.floor(days / 30.44);
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the remaining time in the format of "months days hr:min:sec"
  var countdownStr = "";
  if (months > 0) {
    countdownStr += months + "/";
  }
  countdownStr += days + "/ " + hours + ":" + minutes + ":" + seconds;
  document.getElementById("timer").innerHTML = countdownStr;

  // If the countdown is finished, redirect to specified local file
  if (distance < 0) {
    clearInterval(x);
    window.location.href = "last.html";
  }
}, 1000);

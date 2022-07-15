// ###########################################

// usually we start following the code from the window.onload method
// since it will be executed automatically when the page finishes loading

// ###########################################

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let appointments = []; // calendar array

const now = new Date(); // date of today

const daysInThisMonth = function () {
  // We select the next month with "now.getMonth() +1", just to go back one day with "0" in the third arguement.
  // So starting from the next month from NOW, this will give us back the LAST DAY of the month before, so basically the last day of the current month.
  // And that's exactly what we needed, the last day of the current month is also the total number of days that we need to create in the calendar! ;)
  const getYear = now.getFullYear();
  const getMonth = now.getMonth();

  const lastDayDate = new Date(getYear, getMonth + 1, 0);
  const lastDayOfTheMonth = lastDayDate.getDate();

  return lastDayOfTheMonth; // returns the number of days in the current month

  // This method returns the last day of the month
  //   return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

const saveMeeting = function () {
  const previoslySelectedDay = document.querySelector(".selected"); // if there's any selected day in the page it will save it
  // are there any "selected" cell in the calendar?
  if (previoslySelectedDay) {
    // the following code will execute only if a .selected element exists in the page
    const meetingDay = document.getElementById("newMeetingDay").innerText; // grabs the number of day from the newMeetingDay span
    const indexOfToday = parseInt(meetingDay) - 1; // uses the number of the day to transform it in an index position to use with the array
    const meetingTime = document.getElementById("newMeetingTime"); // grabs the time from the input
    const meetingName = document.getElementById("newMeetingName"); // grabs the meeting name from the input

    const meetingText = meetingTime.value + " - " + meetingName.value; // composes the string for the meeting with time + name

    // performs some checks before actually saving the meeting
    if (meetingTime.value && meetingName.value) {
      const calendar = document.getElementById("calendar"); // taking the calendar element node
      const dayCellNode = calendar.children[indexOfToday]; // taking the children of the calendar to extract the one matching the previously found index of the day

      const isDot = dayCellNode.querySelector(".dot"); // checking if we have a dot already on the cell (in that case we don't need to add another one)
      if (!isDot) {
        // only if we don't have a dot already we proceed
        dayCellNode.classList.add("widthEvent"); // adds css class to that particular cell (it will be styled to look like a dot which will mark the presence of meetings on that day)
        const dot = document.createElement("span"); // creates the span which will become the dot
        dot.className = "dot"; // adds the class that will make it styled
        dayCellNode.appendChild(dot); // adds the dot to the cell
      }

      appointments[indexOfToday].push(meetingText); // pushes the new appointment in the appropriate position in the appointments array
      // console.log(appointments);

      showAppointments(indexOfToday); // this triggers the function that searches the array for appointments in that day, by passing the index of the day as arguement
      window.scrollTo(0, document.body.scrollHeight); // scrolls the page to the bottom to show the new appointment
    } else if (!meetingTime.value && !meetingName.value) {
      // if both time and name are missing: alert
      alert("Pick a time and set the name of the meeting");
    } else if (!meetingName.value) {
      // if name is missing: alert
      alert("Set a name for your meeting");
    } else if (!meetingTime.value) {
      // if time is missing: alert
      alert("Pick a time before saving");
    }
  } else {
    // if day is not selected: generic alert
    alert("Select a day before saving!");
  }
};

const showAppointments = function (index) {
  // receives the index, so it knows which position of the appointments array needs to be accessed (which day)
  const todaysAppointments = appointments[index]; //accessing the day's array - ['13:05 - test']
  // now todaysAppointments is the array containing the events for the day passed

  const ul = document.getElementById("appointmentsList"); // here we target the unordered list in html
  ul.innerHTML = ""; // and here we make sure we always start with an empty list before we append new meetings of other days!

  document.getElementById("appointments").style.display = "block"; // sets the appointments section to be visible!

  for (let i = 0; i < todaysAppointments.length; i++) {
    // for every meeting in that day...
    const li = document.createElement("li"); // creates the list item node
    li.innerText = todaysAppointments[i]; // sets the text of it with the string in the current position i of the array
    ul.appendChild(li); // appends the li in the list
  }
};

// this function is used to unselect any previously existing selected day
const unselectDays = function () {
  const previoslySelectedDay = document.querySelector(".selected");
  if (previoslySelectedDay) {
    previoslySelectedDay.classList.remove("selected");
  }
};

const changeDayNumber = function (index) {
  const newMeetingDay = document.getElementById("newMeetingDay");
  newMeetingDay.innerText = index + 1; // insert the number of the day inside #newMeetingDay element
  newMeetingDay.classList.add("hasDay");
};

const createDays = function (days) {
  const calendar = document.getElementById("calendar");

  for (let i = 0; i < days; i++) {
    appointments[i] = []; // here we are creating an empty spot for each day we're looping ready to be filled up
    // an emtpy array will be inserted into the calendar array for every day in the month
    // appointments are like:
    // [
    //      [], [], [], [], [], [], [],
    //      [], [], [], [], [], [], [],
    //      [], [], [], [], [], [], [],
    //      [], [], [], [], [], [], [],
    //      [], [], []
    // ]

    const dayCellNode = document.createElement("div"); // this will create an empty day cell
    dayCellNode.className = "day"; // assigning the CSS class

    // this line of code will attach an event listener to every day cell in the page
    // when a day gets clicked here's the function that will run (on each click!):
    dayCellNode.onclick = function (e) {
      const clickedDayNode = e.currentTarget; // declaring the clicked node
      unselectDays(); // go to the function definition for unselectDays ↑ ↑ ↑
      clickedDayNode.classList.add("selected"); // adds the selected class to the clicked day

      changeDayNumber(i); // go to the function definition for changeDayNumber ↑ ↑ ↑

      // handles days appointments (if any)
      const currentDayAppointments = appointments[i]; // finding the appointments for the day in the appointments array
      if (currentDayAppointments.length > 0) {
        // if we have any appointments for that day
        showAppointments(i); // invoking showAppointments passing the index as day of the month as the arguement, lookup the function definition ↑ ↑ ↑
      } else {
        document.getElementById("appointments").style.display = "none"; // if no appointments present, make sure the section is hidden
      }
    };

    const day = document.createElement("h3"); // label for day's number
    // adding the number as innerText of the day's <h3> we've created
    day.innerText = i + 1; // for loop gives a 0 based index, let's increase it by 1 to count days properly

    const today = now.getDate(); // gets the today's number
    // if the day is the same of today...
    if (i + 1 === today) {
      day.classList.add("color-epic"); // colors the today's number in the calendar
    }

    dayCellNode.appendChild(day); // <div class="day"><h3 /></div>
    calendar.appendChild(dayCellNode); // <div id="calendar"> <div class="day"><h3 /></div> </div>
  }
  // console.log(appointments);
};

window.onload = function () {
  console.log("loaded");

  const title = document.querySelector("h1");
  const numberOfDays = daysInThisMonth(); // receives a number value from the function

  const monthIndex = now.getMonth();
  const currentMonth = months[monthIndex];
  title.innerText = currentMonth; // sets the month name as the page title

  createDays(numberOfDays); //go to the function definition for createDays ↑ ↑ ↑
};

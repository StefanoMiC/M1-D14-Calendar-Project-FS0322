const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let appointments = [];

const now = new Date(); // date of today

const daysInThisMonth = function () {
  const getYear = now.getFullYear();
  const getMonth = now.getMonth();

  const lastDayDate = new Date(getYear, getMonth + 1, 0);
  const lastDayOfTheMonth = lastDayDate.getDate();

  return lastDayOfTheMonth;

  // This method returns the last day of the month
  //   return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

const saveMeeting = function () {
  const previoslySelectedDay = document.querySelector(".selected");
  if (previoslySelectedDay) {
    const meetingDay = document.getElementById("newMeetingDay").innerText;
    const indexOfToday = parseInt(meetingDay) - 1;
    const meetingTime = document.getElementById("newMeetingTime");
    const meetingName = document.getElementById("newMeetingName");

    const meetingText = meetingTime.value + " - " + meetingName.value;
    if (meetingTime.value && meetingName.value) {
      const calendar = document.getElementById("calendar");
      const dayCellNode = calendar.children[indexOfToday];

      dayCellNode.classList.add("widthEvent");
      const dot = document.createElement("span");
      dot.className = "dot";

      const isDot = dayCellNode.querySelector(".dot");
      if (!isDot) {
        dayCellNode.appendChild(dot);
      }

      appointments[indexOfToday].push(meetingText);
      console.log(appointments);

      showAppointments(indexOfToday);
    } else if (!meetingTime.value && !meetingName.value) {
      alert("Pick a time and set the name of the meeting");
    } else if (!meetingName.value) {
      alert("Set a name for your meeting");
    } else if (!meetingTime.value) {
      alert("Pick a time before saving");
    }
  } else {
    alert("Select a day before saving!");
  }
};

const showAppointments = function (index) {
  const todaysAppointments = appointments[index]; //accessing the day's array - ['13:05 - test']

  const ul = document.getElementById("appointmentsList");
  ul.innerHTML = "";
  document.getElementById("appointments").style.display = "block"; // appointments div to be shown

  for (let i = 0; i < todaysAppointments.length; i++) {
    const li = document.createElement("li");
    li.innerText = todaysAppointments[i]; // access the day's array single string in the position i
    ul.appendChild(li);
  }
};

const unselectDays = function () {
  const previoslySelectedDay = document.querySelector(".selected");
  if (previoslySelectedDay) {
    previoslySelectedDay.classList.remove("selected");
  }
};
const changeDayNumber = function (index) {
  const newMeetingDay = document.getElementById("newMeetingDay");
  newMeetingDay.innerText = index + 1;
  newMeetingDay.classList.add("hasDay");
};

const createDays = function (days) {
  const calendar = document.getElementById("calendar");

  for (let i = 0; i < days; i++) {
    appointments[i] = [];
    // appointments are like:
    // [
    //      [], [], [], [], [], [], [],
    //      [], [], [], [], [], [], [],
    //      [], [], [], [], [], [], [],
    //      [], [], [], [], [], [], [],
    //      [], [], []
    // ]

    const dayCellNode = document.createElement("div");
    dayCellNode.className = "day";

    dayCellNode.onclick = function (e) {
      const clickedDay = e.currentTarget;
      unselectDays();
      clickedDay.classList.add("selected");

      changeDayNumber(i);

      const currentDayAppointments = appointments[i];
      if (currentDayAppointments.length > 0) {
        showAppointments(i);
      } else {
        document.getElementById("appointments").style.display = "none";
      }
    };

    const day = document.createElement("h3");
    day.innerText = i + 1;

    const today = now.getDate();

    if (i + 1 === today) {
      day.classList.add("color-epic");
    }

    dayCellNode.appendChild(day); // <div class="day"><h3 /></div>
    calendar.appendChild(dayCellNode); // <div id="calendar"> <div class="day"><h3 /></div> </div>
  }
  console.log(appointments);
};

window.onload = function () {
  console.log("loaded");

  const title = document.querySelector("h1");
  const numberOfDays = daysInThisMonth();

  const monthIndex = now.getMonth();
  const currentMonth = months[monthIndex];
  title.innerText = currentMonth;

  createDays(numberOfDays);
};

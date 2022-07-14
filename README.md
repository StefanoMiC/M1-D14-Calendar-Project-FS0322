# Calendar Functional Requirements

- Showing the days dynamically (it should show the actual days in this month)
- Show the days in groups of 7-days per line
- Let the user select a day, which should be highlighted, and related meetings should be displayed
- Provide some ways to collect user's input about the meetings that needs to be created
- Meetind details should includ meeting time and meeting description
- Create new meetings based on that user input
- Display related meetings when a day is selected, but also clear out the section if a day doesn't have any meetings
- 3 sections: Calendar section, User Input section, Meeting section

## LIST OF HTML ELEMENTS NEEDED

- A main title for the calendar page
- A container for the calendar
- A container for the day
- A secondary title for the Input section
  -- the container for the selected day
  -- the input field for the time
  -- the text input for the meeting description
  -- the button input for triggering the saving process
- A secondary title for the Display section
  -- display the single meeting with {time}-{description}

## CSS Styles required

- titles
- calendar container
- days
- selected day
- inputs
- input section
- button

## Nice to haves

- marker to mark the presence of meetings on that day

## JS Functions

- dynamically get the number of days that exist in the current month
- generate days cells in the DOM programmatically, based on the previous result (number of days in the month)
- select the day when the user clicks on one
- get the user input and create new meetings accordingly
- display the new meeting along with any previously saved ones
- be able to retrieve previous days meetings and display them in place of any previously displayed ones

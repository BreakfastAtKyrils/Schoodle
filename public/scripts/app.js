
/*// Client facing scripts here
$(document).ready(function () {
  //calendar code
  $("#choose-time").flatpickr({
    enableTime: true,
    inline: true,
    //ask mentor about this line
    // "plugins": [new confirmDatePlugin({})],
    dateFormat: "F, d Y H:i",
    // mode: "multiple",


  });
  // instance.config.onChange.push(function() { } );




});
*/

// Flatpickr.setDefaults({})
$(document).ready(function () {
  let potential_times = []

  let startDate = null;
  let endDate = null;

  const $meeting_times = $('.optionAll')
  const $meeting_times_selection = $('vote-table')

  const addMeetingTimes = function(start, end){
    let $start_time = $('<div class="optionStart">')
    $start_time.text(start)
    $('#start-options').append($start_time)

    let $end_time = $('<div class="optionsEnd">')
    $end_time.text(end)
    $('#end-options').append($end_time)
    $end_time.css("font-size", ".8em")
    $end_time.css("font-weight", "bolder")
    $end_time.css("color", "black")
    $end_time.css("margin", "10px 0px 10px 0px")
    $end_time.css("padding", "7px")
    $end_time.css("background-color", "white")
    $end_time.css("border-radius", "10px")

  }



  const $start_date = flatpickr('#startDate', {
  enableTime: true,
  minDate: 'today',
  allowInput: true,
  dateFormat: "F, d Y H:i",
  onChange: function(selectedDates, dateStr, instance) {
    startDate = dateStr;
  }
  })

  const $end_date = flatpickr('#endDate', {
    enableTime: true,
    minDate: 'today',
    allowInput: true,
    dateFormat: "F, d Y H:i",
    onChange: function(selectedDates, dateStr, instance) {
      endDate = dateStr;
    }
    })

  const $submit_meeting_time = $('#submit-meeting-time')

  $submit_meeting_time.click((event)=> {
    const final_start_date = startDate;
    const final_end_date = endDate;

    potential_times.push([startDate, endDate, 0, 0])




    console.log(`potential times are now: ${potential_times}`)
    addMeetingTimes(final_start_date, final_end_date)

    //reset calendar
    //need to add code for this

    //code for populating the possible meeting times
    //need to know how this will be passed

    //this function will receive an object called meetingTimes
    //inside the object we have .start, .end, as well as the votes
    const populateMeetingTimes = function(meetingTimes) {
      const $table_row = $('<tr>')
      let $start_time = $('<td class="date-vote">')
      let $end_time = $('<td class="date-vote">')
      let $vote_yes = $('<td><input type="radio" name="yes" value="true"></td>')
      let $vote_no = $('<td><input type="radio" name="no" value="false"></td>')
      $table_row.append($start_time)
      $table_row.append($end_time)
      $table_row.append($vote_yes)
      $table_row.append($vote_no)
      $start_time.text(meetingTimes.start)
      $end_time.text(meetingTimes.end)
      $meeting_times_selection.append($table_row)
    }
    test_meeting_times = {
      'start': 'START time test',
      'end': 'END time test',
    }
    populateMeetingTimes(test_meeting_times)

    //code to grab the attendees votes
    //need to know how you want to receive this

    //if a user votes for yes --> change the array [start, date, +1, 0]
  })

  const $createEvent = $("#create-event");
  $createEvent.click((e) =>{
    let $userEmail = $('#user-email').val()
    let $userName = $('#user-name').val()
    let $eventTitle = $('#event-title').val()
    let $eventDescription = $('#event-description').val()
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/create",
      data: { data: potential_times, email: $userEmail, name: $userName, title: $eventTitle, description: $eventDescription},
      dataType: "json",
      success: function () {
        alert("Added Successfully");
      },
      error: function (err) {
        console.log("err", err);
      },
    })
  });












// alert(date1)
// const start_date = new Promise((resolve, reject) => {
//   const date1 = flatpickr('#startDate', {
//     enableTime: true,
//     allowInput: true,
//     dateFormat: "F, d Y H:i",
//     //plugins: [new rangePlugin({ input: "#endDate"})]
//   })
//   resolve(date1)
// }).then((date1) => {
//   alert(date1)
// })


})

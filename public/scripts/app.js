$(document).ready(function () {
  let potential_times = []

  let startDate = null;
  let endDate = null;

  const $meeting_times = $('.optionAll')
  const $vote_table = $('#vote-table')

  // console.log(templateVars)

const addMeetingTimes = function(start, end){
    let $start_time = $('<div class="optionStart">')
    $start_time.text(start)
    $('#start-options').append($start_time)

    let $end_time = $('<div class="optionsEnd" style="margin: 10px 20px;">')
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

    potential_times.push([startDate, endDate])
    //console.log(`potential times are now: ${potential_times}`)
    addMeetingTimes(final_start_date, final_end_date)
})

const $createEvent = $("#create-event");
$createEvent.click((e) =>{
    let $userEmail = $('#user-email').val()
    let $userName = $('#user-name').val()
    let $eventTitle = $('#event-title').val()
    let $eventDescription = $('#event-description').val()
    console.log('Email  ', $userEmail)
    console.log('title  ', $eventTitle)
    console.log('$userName ', $userName)
    console.log('$eventDescription  ', $eventDescription)
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/create",
      data: { times: potential_times, email: $userEmail, name: $userName,
        title: $eventTitle, description: $eventDescription},
      // dataType: "json",
      success: function (data) {
        // res.redirect(`/events/${gen_id}`)???
        if(data){
          //console.log("DATA---------------------", data)
          window.location.href = data
        }// window.location is url on browser
      },
      error: function (err) {
        if(err.status === 200){
          window.location.href = err.responseText
        }
      },
    })
});





// const populateMeetingTimes = function(meetingTimes) {
//   // let number_of_votes = `<div data-time-id=${id} data-event-id=${event_id}><p>start time: ${start_time}</p><p>end time: ${end_time}</p></div>`



//   const $table_row = $('<tr>')
//   let $start_time = $('<td class="date-vote">')
//   let $end_time = $('<td class="date-vote">')
//   let $vote_yes = $('<td><input type="radio" name="radio" value="true"></td>')
//   let $vote_no = $('<td><input type="radio" name="radio" value="false"></td>')
//   $table_row.append($start_time)
//   $table_row.append($end_time)
//   $table_row.append($vote_yes)
//   $table_row.append($vote_no)
//   $start_time.text(meetingTimes.start)
//   $end_time.text(meetingTimes.end)
//   $vote_table.append($table_row)


// }
/*test_meeting_times = {
  'start': 'START time test',
  'end': 'END time test',
}
*/

// console.log(test_meeting_times.start)
// populateMeetingTimes(test_meeting_times)











})

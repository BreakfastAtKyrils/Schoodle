
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




  const $start_date = flatpickr('#startDate', {
  enableTime: true,
  minDate: 'today',
  allowInput: true,
  dateFormat: "F, d Y H:i",
  onChange: function(selectedDates, dateStr, instance) {
    startDate = dateStr;
    console.log('start_date function called')
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

    console.log(`Adding the following data: \n
    startDate --> ${final_start_date} \n
    endDate --> ${final_end_date}`)
    potential_times.push([startDate, endDate])
    console.log(`potential times are now: ${potential_times}`)

  })












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

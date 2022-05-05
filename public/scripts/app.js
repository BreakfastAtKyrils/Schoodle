
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
  let potential_times = {}

  const $start_date = flatpickr('#startDate', {
  enableTime: true,
  allowInput: true,
  dateFormat: "F, d Y H:i",
  parseDate: (datestr, format) => {
    return moment(datestr, format, true).toDate();
  },
  //plugins: [new rangePlugin({ input: "#endDate"})]
  })

  const $end_date = flatpickr('#endDate', {
    enableTime: true,
    allowInput: true,
    dateFormat: "F, d Y H:i",
    parseDate: (datestr, format) => {
      return moment(datestr, format, true).toDate();
    },
    //plugins: [new rangePlugin({ input: "#endDate"})]
    })

  const $submit_meeting_time = $('#submit-meeting-time')
  $submit_meeting_time.click(()=> {
    alert($start_date[0].parseDate)

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

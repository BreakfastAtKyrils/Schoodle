
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
  flatpickr('#startDate', {
  enableTime: true,
  allowInput: true,
  dateFormat: "F, d Y H:i",
  //plugins: [new rangePlugin({ input: "#endDate"})]
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

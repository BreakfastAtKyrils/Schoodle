
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

// Flatpickr.setDefaults({});

flatpickr('#startDate', {
  enableTime: true,
  allowInput: true,
  dateFormat: "m/d/Y h:iK",
  //plugins: [new rangePlugin({ input: "#endDate"})]
});

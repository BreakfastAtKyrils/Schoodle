const $createEvent = $("#create-event");
  $createEvent.click((e) =>{
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: "/create",
      data: { data: potential_times, email: "me@gmail.com", name:"me", title: "party1", description:"a nice party"},
      dataType: "json",
      success: function () {
        alert("Added Successfully");
      },
      error: function (err) {
        console.log("err", err);
      },
    })
  });

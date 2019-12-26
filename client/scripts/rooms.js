var Rooms = {
  list: {},

  add: function(roomname) {
    // check if room is added at the initialization of webpage or at the button click
    roomname = roomname || FormView.$form.find('input#message').val();

    // add new room to the list and render it on the drop down menu 
    if (!Rooms.list[roomname]) {
      Rooms.list[roomname] = true;
      RoomsView.renderRoom(roomname);
    }

    // clear input field
    FormView.$form.find('input#message').val('');
  }
};
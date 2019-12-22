var Rooms = {
  roomname: {},

  add: function(event) {
    App.startSpinner();

    // retrieve necessary information from page and change into message form
    var roomname = FormView.$form.find('input#message').val();
    RoomsView.renderRoom(roomname);
    Rooms.roomname[roomname] = true;

    App.stopSpinner();
  }
};
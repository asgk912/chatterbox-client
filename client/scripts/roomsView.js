var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$select.on('change', RoomsView.selectRoom);
    RoomsView.$button.on('click', Rooms.add);
  },

  selectRoom: function(event) {
    var selectedIndex = RoomsView.$select[0].options.selectedIndex;
    var selectedRoom = RoomsView.$select[0].options[selectedIndex].value;

    MessagesView.$chats.html('');

    for (var objectId in Messages) {
      if (Messages[objectId].roomname === selectedRoom) {
        MessagesView.renderMessage(Messages[objectId]);
      }
    }
  },

  renderRoom: function(room) {
    if (!Rooms.roomname[room]) {
      Rooms.roomname[room] = true;
      var htmlText = `<option value="${room}">${room}</option>`;
      RoomsView.$select.append(htmlText);
    }
  }
};

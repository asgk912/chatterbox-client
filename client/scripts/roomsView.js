var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    RoomsView.$select.on('change', RoomsView.changeRoom);
    RoomsView.$button.on('click', Rooms.add);
  },

  changeRoom: function() {
    // delete all the posts
    MessagesView.$chats.html('');

    // find the name of the changed room 
    var selectedIndex = RoomsView.$select[0].options.selectedIndex;
    var selectedRoom = RoomsView.$select[0].options[selectedIndex].value;
    // handle the case of message without specific roomname
    if (selectedRoom === '') {
      selectedRoom = undefined;
    }

    // render message that is in the changed room
    for (objectId in Messages) {
      if (Messages[objectId].roomname === selectedRoom) {
        MessagesView.renderMessage(Messages[objectId]);
      }
    }

    // decorate friends' messages
    Friends.decorate();

    // make each of username clickable
    MessagesView.initialize();
  },

  renderRoom: function(roomname) {
    var htmlText = `<option value="${roomname}">${roomname}</option>`;
    RoomsView.$select.append(htmlText);
  }
};

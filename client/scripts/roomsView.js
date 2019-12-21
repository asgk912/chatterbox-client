var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
  },

  render: function() {
  },

  renderRoom: function(room) {
    var htmlText = `<option value="${room}">${room}</option>`;
    RoomsView.$select.append(htmlText);
  }

};

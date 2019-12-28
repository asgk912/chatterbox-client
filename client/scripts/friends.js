var Friends = {
  list: {},

  toggleStatus: function(event) {
    var username = event.currentTarget.classList[1];
    if (!Friends.list[username]) {
      Friends.list[username] = true;
    } else {
      Friends.list[username] = false;
    }

    Friends.decorate();
  },

  decorate: function() {
    for (var friend in Friends.list) {
      if (Friends.list[friend]) {
        MessagesView.$chats.find(`.${friend}`).css('background-color', 'yellow');
      } else {
        MessagesView.$chats.find(`.${friend}`).attr('style', null);
      }
    }
  }
};
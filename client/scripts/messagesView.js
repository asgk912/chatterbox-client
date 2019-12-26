var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    MessagesView.$chats.find('.username').on('click', Friends.toggleStatus);
  },

  renderMessage: function(message) {
    MessagesView.$chats.prepend(MessageView.render(message));
  }
};
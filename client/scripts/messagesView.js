var MessagesView = {

  $chats: $('#chats'),

  initialize: function() {
    // to make messages display automatically by using renderMessage processing
  },

  render: function() {
    // Interact with messageView.js
    for (keys in Messages) {
      MessagesView.renderMessage(Messages[keys]);
    }
  },

  renderMessage: function(message) {
    MessagesView.$chats.append(MessageView.render(message));
  }
};
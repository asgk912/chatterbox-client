var FormView = {
  // Connect to "form" tag of HTML file
  $form: $('form'),

  initialize: function() {
    // When the "submit" button is clicked, perform handleSubmit function
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    // console.log('click!');
    // Need to grab the object and store in Controller
    // Then Controller sends the information back to the messageView
    var text = FormView.$form.find('input#message').val();
    var message = {'username': App.username, 'text': text};
    // Parse.create(myMsg);
    MessagesView.renderMessage(message);
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;

    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};
var FormView = {
  // Connect to "form" tag of HTML file
  $form: $('form'),

  initialize: function() {
    // when the "submit" button is clicked, perform handleSubmit function
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();

    // deativate submit button momentarily and start Spinner to tell user it is running
    FormView.setStatus(true);
    App.startSpinner();

    // retrieve necessary information from page and change into message form
    var text = FormView.$form.find('input#message').val();
    
    var selectedIndex = RoomsView.$select[0].options.selectedIndex;
    var selectedRoom = RoomsView.$select[0].options[selectedIndex].value;

    var message = {'username': App.username, 'text': text, 'roomname': selectedRoom};

    // Post message to the server, retrieve data back, and redner messages on page
    Parse.create(message);
    App.fetch();
    RoomsView.changeRoom();

    // reativate submit button and clear input field
    FormView.$form.find('input#message').val('');
    FormView.setStatus();
    App.stopSpinner();
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;

    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};
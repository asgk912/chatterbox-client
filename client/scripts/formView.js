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

    // deativate submit button momentarily and start Spinner to tell user it is running
    FormView.setStatus(true);
    App.startSpinner();

    // retrieve necessary information from page and change into message form
    var text = FormView.$form.find('input#message').val();
    var message = {'username': App.username, 'text': text, 'room': undefined};

    // Post message to the server and retrieve data back.
    Parse.create(message);
    App.fetch(App.stopSpinner);

    // reativate submit button
    FormView.setStatus();
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;

    FormView.$form.find('input[type=submit]').attr('disabled', status);
  }

};
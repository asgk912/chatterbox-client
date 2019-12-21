var App = {

  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
  },

  fetch: function(callback = ()=>{}) {
    Parse.readAll((data) => {
      // examine the response from the server request:
      // console.log(data);
      var objectId;
      for (var i = 0; i < data.results.length; i++) {
        // if (data.results[i].username !== undefined &&
        //   data.results[i].text !== undefined) {
        objectId = data.results[i].objectId;
        Messages[objectId] = data.results[i];
        delete Messages[objectId]['objectId'];
        // }
      }

      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};

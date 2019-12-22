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
      for (var i = 0; i < data.results.length; i++) {
        // check if both username and text have value
        if (data.results[i].username !== undefined && data.results[i].text !== undefined) {
          // check if username and text has html element
          var hasHTMLElement = false;
          for (var j = 0; j < 2; j++) {
            // choose either of username and text to check if it has html element
            if (j === 0) {
              var underTest = data.results[i].username;
            } else {
              var underTest = data.results[i].text;
            }

            // find where tag name "start"
            var openTagIndex = underTest.indexOf('<');
            if (openTagIndex === -1) {
              // no html element because it does not have <, skip to the next or get out of loop
              continue;
            }

            // find where tag name ends
            var endTagIndex = underTest.indexOf('>');
            if (openTagIndex === -1) {
              // no html element because it does not have >, skip to the next or get out of loop
              continue;
            }
            /* PAST WORK - not necessary
            var emptyIndex = underTest.indexOf(' ', openTagIndex);
            var closeTagIndex = underTest.indexOf('>', openTagIndex);
            if (emptyIndex < 0 && closeTagIndex < 0) {
              continue;
            } else if (emptyIndex < 0) {
              var tagNameEndIndex = closeTagIndex;
            } else if (closeTagIndex < 0) {
              var tagNameEndIndex = emptyIndex;
            } else {
              var tagNameEndIndex = (emptyIndex < closeTagIndex) ? emptyIndex : closeTagIndex;
            }
            */

            // select tag name
            var tagName = underTest.substring(openTagIndex + 1, endTagIndex);
            if (tagName.indexOf(' ') !== -1) {
              tagName = tagName.substring(0, tagName.indexOf(' '));
            }
            /* PAST WORK - not necessary
            var tagName = underTest.substring(openTagIndex + 1, tagNameEndIndex);
            */

            // it has opening tag, so check if it has closing tag
            if (underTest.includes(`</${tagName}>`, openTagIndex + 1)) {
              hasHTMLElement = true;
            }
          }
          // end checking html element

          // save data into message if there is no html element
          if (!hasHTMLElement) {
            var objectId = data.results[i].objectId;
            Messages[objectId] = data.results[i];
            delete Messages[objectId]['objectId'];

            // render room
            // MessagesView.renderMessage(Messages[objectId]);
            RoomsView.renderRoom(Messages[objectId].roomname);
          }
        }
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

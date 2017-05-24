
function handle_feedback(fromPersonEmail, forPersonEmail, qId, answer) {
  if (arguments.length != 4 || !fromPersonEmail || !forPersonEmail || !qId || !answer) {
    throw Utilities.formatString('Incorrect invocation of %s. Expected 4 arguments. Got %s', this.name, arguments.length);
  }
  writeRow_(asRow_(fromPersonEmail, forPersonEmail, qId, answer));
  
}

function handle_feedbacks_from_array(data) {
  var errors = [];
  for (i in data) {
    try {
      handle_feedback(data[i][0], data[i][1], data[i][2], data[i][3]);
    }
    catch(err) {
      errors.push("Unable to save feedback " + JSON.stringify(data[i]) + ":" + err);
    }
  }
  return errors;
}

function asRow_(fromPersonEmail, forPersonEmail, qId, answer) {
  var row = [new Date(), fromPersonEmail, forPersonEmail, qId, answer];
  return row;
}

function writeRow_(row) {
  SpreadsheetApp.getActive().getSheetByName("db").appendRow(row);
}


function test_write() {
  handle_feedback('a', 'b', 'c', 'd');
  Logger.log(handle_feedbacks_from_array([
    ['aa', 'ba', 'ca'], ['a1', 'b1', 'cc', 'd1']
  ]));
}





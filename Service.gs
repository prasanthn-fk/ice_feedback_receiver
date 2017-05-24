/**
 * handles a given feedback
 *
 * @param {date} receivedAt time feedback was received
 * @param {text} fromPersonEmail email id of the person who submits feedback
 * @param {text} qId question id
 * @param {text} answer feedback answer
 * @return {array} array of errors. empty array if no errors.
 */
function handle_feedback(receivedAt, fromPersonEmail, forPersonEmail, qId, answer) {
  if (arguments.length != 5 || !receivedAt || !fromPersonEmail || !forPersonEmail || !qId || !answer) {
    throw Utilities.formatString('Incorrect invocation of %s. Expected 5 arguments. Got %s', this.name, arguments.length);
  }
  writeRow_(asRow_(receivedAt, fromPersonEmail, forPersonEmail, qId, answer));
  
}

function handle_feedbacks_from_array(data) {
  var errors = [];
  for (i in data) {
    try {
      handle_feedback(data[i][0], data[i][1], data[i][2], data[i][3], data[i][4]);
    }
    catch(err) {
      errors.push("Unable to save feedback " + JSON.stringify(data[i]) + ":" + err);
    }
  }
  return errors;
}

function asRow_(receivedAt, fromPersonEmail, forPersonEmail, qId, answer) {
  var row = [receivedAt, fromPersonEmail, forPersonEmail, qId, answer];
  return row;
}

function writeRow_(row) {
  SpreadsheetApp.getActive().getSheetByName("db").appendRow(row);
}


function test_write() {
  handle_feedback('time', 'a', 'b', 'c', 'd');
  Logger.log(handle_feedbacks_from_array([
    ['t1', 'aa', 'ba', 'ca'], ['t2', 'a1', 'b1', 'cc', 'd1']
  ]));
}





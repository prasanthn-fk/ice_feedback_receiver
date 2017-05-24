function doGet(e) {
  Logger.log(JSON.stringify(e));
  if (e.parameter["send_emails"]) {
    return send_emails2();
  }
  else 
    return render_home_page_();
  
}

function doPost(e) {
  Logger.log("Post called:" + JSON.stringify(e));
  
  return HtmlService.createHtmlOutput("doPost called");
  
}

function send_emails() {
  Logger.log("Sendemails");
  return HtmlService.createTemplateFromFile("index").evaluate().getContent();

}

function send_emails2() {
  Logger.log("Sendemails2");
  return HtmlService.createTemplateFromFile("index").evaluate();

}



function render_control_page_() {
  Logger.log("Control called");
  return HtmlService.createHtmlOutput("<h1>Control called</h1>");
}

function render_home_page_() {
  var html =  HtmlService.createTemplateFromFile('home');  
  return html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
  
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent();
}

function questionFrom_(feedback_by, feedback_for, question, value) {
  return [new Date(), feedback_by, feedback_for, question, value];
}

function processForm(f) {
  Logger.log("-"+ JSON.stringify(f));
  var feedback_by = Session.getActiveUser().getEmail();
  var feedback_for = f.feedback_for;

  var questions = [];
  var re = new RegExp('^q');   


  var handle = function(item, index, arr) {
    if (re.test(item)) {
      questions.push(questionFrom_(feedback_by, feedback_for, item, f[item]));
    }
  };

  Object.keys(f).forEach(handle);
  Logger.log(JSON.stringify(questions));
  
  IceFeedbackDB.setDbUrl("https://docs.google.com/spreadsheets/d/1oo3JCIeNRrZlJ2ZqaKFUxn3hlWh-gWjaMT7Y_-o1Opk/edit#gid=0");
  var result = IceFeedbackDB.handle_feedbacks_from_array(questions);
  return result;  
}

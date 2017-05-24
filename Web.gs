function doGet(e) {
  var html =  HtmlService.createTemplateFromFile('index');  
  return html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
  
}
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
  .getContent();
}

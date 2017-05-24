function validate_(params) {
  Object.keys(params).forEach(function(name) {
    var value = params[name];
    if (isEmpty_(value)) {
      throw Utilities.formatString('%s is required.', name);
    }
  });
}


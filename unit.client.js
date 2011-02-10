// Client-side unit testing hooks.

on_error = function (name, e) {
  var d = document.createElement('div');
  d.appendChild(document.createTextNode('failure of test ' + name + ': ' + (e.description || e)));
  document.getElementById('log').appendChild(d);
};

log = function (message) {
  on_error('Log: ' + message);
};
// Generated by SDoc 

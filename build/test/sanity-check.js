caterwaul.test(function () {
  var threw = false;
  3 -should_be- 3;

  try {3 -should_be- 4}
  catch (e) {threw = true}

  threw -should_be- true;
});
// Generated by SDoc 

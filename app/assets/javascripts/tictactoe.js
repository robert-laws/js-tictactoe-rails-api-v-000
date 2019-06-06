// Code your JavaScript / jQuery solution here
var turn = 0;

function player() {
  result = ""
  if(turn % 2 == 0) {
    result = "X"
  } else {
    result = "O"
  }
  return result;
}

function updateState(sq) {
  var token = player();
  $(sq).text(token)
}

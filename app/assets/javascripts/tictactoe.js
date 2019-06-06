// Code your JavaScript / jQuery solution here
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
  player()
}

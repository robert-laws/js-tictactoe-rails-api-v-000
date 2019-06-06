// Code your JavaScript / jQuery solution here
function player(turn) {
  result = ""
  if(turn % 2 == 0) {
    result = "X"
  } else {
    result = "O"
  }
  return result;
}

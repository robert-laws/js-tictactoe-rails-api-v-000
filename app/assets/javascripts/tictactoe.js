// Code your JavaScript / jQuery solution here
var WINNING_COMBOS = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];

var turn = 0;
var currentGame = 0;

$(document).ready(function() {
  attachListeners();
})

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

function setMessage(string) {
  $("#message").text(string)
}

function checkWinner() {
  var board = {}
  var winner = false;

  $("td").text(function(index, square) {
    board[index] = square;
  });

  WINNING_COMBOS.some(function(combo) {
    if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
      setMessage("Player " + board[combo[0]] + " Won!");
      return winner = true;
    }
  })

  return winner;
}

function doTurn(sq) {
  updateState(sq);
  turn++;
  if(checkWinner()) {
    saveGame();
    resetBoard();
  } else {
    setMessage("Tie game.");
    saveGame();
    resetBoard();
  }
}

function updateState(sq) {
  var token = player();
  $(square).text(token);
}

function resetBoard() {
  $("td").empty();
  turn = 0;
  currentGame = 0;
}

function attachListeners() {
  $("td").on("click", function() {
    if (!$.text(this) && !checkWinner()) {
      doTurn(this);
    }
  });

  $("#save").on("click", function() {
    saveGame();
  });

  $("#previous").on("click", function() {
    showPreviousGames();
  })

  $("#clear").on("click", function() {
    resetBoard();
  })
}

function showPreviousGames() {
  $("games").empty();
  $.get("/games", function(savedGames) {
    if(savedGames.data.length) {
      savedGames.data.forEach(buttonizePreviousGame);
    }
  })
}

function buttonizePreviousGame(game) {
  $("#games").append("<button id='gameid-'" + game.id + ">" + game.id + "</button><br>");
  $("#gameid-" + game.id).on("click", function() {
    reloadGame(game.id);
  })
}



$(document).ready(function() {
  var playerTurn = 1;

  var gameBoard = [[100, 99, 98, 97, 96, 95, 94, 93, 92, 91],
                   [81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
                   [80, 79, 78, 77, 76, 75, 74, 73, 72, 71],
                   [61, 62, 63, 64, 65, 66, 67, 68, 69, 70],
                   [60, 59, 58, 57, 56, 55, 54, 53, 52, 51],
                   [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
                   [40, 39, 38, 37, 36, 35, 34, 33, 32, 31],
                   [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
                   [20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
                   [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]];

  function createBoard() {
    for(var i = 0; i < gameBoard.length; i++) {
      var row = $("<div>");
      $(".board").append(row);
      for(var j = 0; j < gameBoard[i].length; j++) {
        var box = $("<div>" + gameBoard[i][j] + "</div>").addClass("box").attr('id', gameBoard[i][j]);
        row.append(box);
      }
    }
  }
  createBoard();

  var playerStart = $("#1");
  //creating the players
  var playerOneSpawn = $("<div class='player-token one'></div>");
  var playerTwoSpawn = $("<div class='player-token two'></div>");

  playerStart.append(playerOneSpawn, playerTwoSpawn);
  //selecting the players
  var playerOne = $(".one");
  var playerTwo = $(".two");

  var newPosition = playerOne.parent().val();
  console.log(newPosition);

  function movePlayer(player, movement) {
    var newPosition = playerOne.parent().val();
    console.log(newPosition);
  }

  // Dicey Dicey
  $('.rollin').click(function() {
    rollDice();
  });

  function rollDice(player){
    var die1 = document.getElementById("die1");
    var die2 = document.getElementById("die2");
    var status = document.getElementById("status");
    var d1 = Math.floor(Math.random() * 6) + 1;
    var d2 = Math.floor(Math.random() * 6) + 1;
    var diceTotal = d1 + d2;
    die1.innerHTML = d1;
    die2.innerHTML = d2;
    status.innerHTML = "You rolled "+diceTotal+".";
    if(d1 == d2){
        status.innerHTML += " DOUBLES! You get a free turn!!";
    }
    movePlayer(playerOne, diceTotal);
  }

});


$(document).ready(function() {
  var playerTurnNumber = 1;
  var player1Position = 1;
  var player2Position = 1;

  var diceTotal = null;

  // Creating the player pieces
  var playerOnePiece = $("<div class='player-token one'></div>");
  var playerTwoPiece = $("<div class='player-token two'></div>");

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

// Snake Coordinates
  var snakeHead = [28, 41, 54, 77, 83, 96];
  var snakeTail = [7, 21, 32, 43, 55, 59];

// Ladder Coodinates
  var ladderStart = [5, 23, 46, 62, 88];
  var ladderEnd = [38, 44, 78, 71, 100];

// Set up the board
  function createBoard() {
    for(var i = 0; i < gameBoard.length; i++) {
      var row = $("<div>").addClass("row");
      $(".board").append(row);
      for(var j = 0; j < gameBoard[i].length; j++) {
        var box = $("<div>" + gameBoard[i][j] + "</div>").addClass("box").attr('id', gameBoard[i][j]);
        row.append(box);
      }
    }
  }
  createBoard();

  function makeSnake() {
    for(var i=0; i<snakeHead.length; i++) {
      var snake = snakeHead[i];
      $('#'+ snake).addClass("snake");
    }
  }
  makeSnake();

  function makeLadder() {
    for(var i=0; i<ladderStart.length; i++) {
      var ladder = ladderStart[i];
      $('#'+ ladder).addClass("ladder");
    }
  }
  makeLadder();

// Player Starting Positions
  var playerStart = $("#1");

  function appendStart() {
    playerStart.append(playerOnePiece, playerTwoPiece);
  }
  appendStart();

  // Dicey Dicey
  $('#roll').click(function() {
    var result = rollDice();
    newPosition();
    checkWinner();
    playerTurnNumber++;
  });

  function rollDice(){
    var die1 = document.getElementById("die1");
    var die2 = document.getElementById("die2");
    var status = document.getElementById("status");
    var d1 = Math.floor(Math.random() * 6) + 1;
    var d2 = Math.floor(Math.random() * 6) + 1;
    diceTotal = d1 + d2;
    die1.innerHTML = d1;
    die2.innerHTML = d2;
    status.innerHTML = "You rolled "+diceTotal+".";
    // if(d1 == d2){
    //     status.innerHTML += " DOUBLES! You get a free turn!!";
    // }
  }


  function checkLadder() {
    for(var i=0; i<ladderStart.length; i++) {
      if(player1Position === ladderStart[i]) {
        player1Position = ladderEnd[i];
        swal({title: 'Up up and away!', text: "You got a ride from a drifblim! Move up to " + player1Position + ".", imageUrl: '/assets/drifblim.gif', type: 'success', confirmButtonText: 'Next'});
        // alert("Up up and away! You got a ride from a drifblim! Move up to " + player1Position + ".");
      } else if(player2Position === ladderStart[i]) {
        player2Position = ladderEnd[i];
        swal({title: 'Up up and away!', text: "You got a ride from a drifblim! Move up to " + player2Position + ".", imageUrl: '/assets/drifblim.gif', type: 'success', confirmButtonText: 'Next'});
        // alert("Up up and away! You got a ride from a drifblim! Move up to " + player2Position + ".");
      }
      }
    }

    function checkSnake() {
      for(var i=0; i<snakeHead.length; i++) {
        if(player1Position === snakeHead[i]) {
          player1Position = snakeTail[i];
          swal({title: 'Ouch :(', text: "You got attacked by a wild ekans! Slide down to " + player1Position + ".", imageUrl: '/assets/ekans.gif', type: 'warning', confirmButtonText: 'Next'});
          // alert("Ouch, you got attacked by a wild ekans! Slide down to " + player1Position + " :(");
        } else if(player2Position === snakeHead[i]) {
          player2Position = snakeTail[i];
          // alert("Ouch, you got attacked by a wild ekans! Slide down to " + player2Position + " :(");
          swal({title: 'Ouch :(', text: "You got attacked by a wild ekans! Slide down to " + player2Position + ".", imageUrl: '/assets/ekans.gif', type: 'warning', confirmButtonText: 'Next'});
        }
        }
      }

  function newPosition() {
    if(playerTurnNumber % 2 === 1) {
      //it is playerOne's turn, move playerOne's piece by rollDice result
      player1Position += diceTotal;
      checkLadder();
      checkSnake();
      //checkSnake, checkLadder, update position
      $('#'+player1Position).append(playerOnePiece);
      $('#game-status').text("Player 1 moves to " + player1Position + "!");
      $('#player-turn').text("Player 2, roll the dice.");
    } else {
      player2Position += diceTotal;
      checkLadder();
      checkSnake();
      $('#'+player2Position).append(playerTwoPiece);
      $('#game-status').text("Player 2 moves to " + player2Position + "!");
      $('#player-turn').text("Player 1, roll the dice.");
    }
  }

  function checkWinner() {
    if(player1Position >= 100) {
      swal({title: 'You made it from 0 to 100!', text: "Player 1 wins! Play again?", type: 'success', confirmButtonText: 'Restart'});
      window.setTimeout(function(){
      location.reload();
      }, 3000);
    } else if(player2Position >= 100) {
      swal({title: 'You made it from 0 to 100!', text: "Player 2 wins! Play again?", type: 'success', confirmButtonText: 'Restart'});
      window.setTimeout(function(){
      location.reload();
      }, 3000);
    }
  }


});

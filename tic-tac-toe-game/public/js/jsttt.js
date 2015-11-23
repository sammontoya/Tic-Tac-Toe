var turn_count = 0;

// declare a winner
var player_wins = function(id0, id1, id2, marker) {
  if ($(id0).find("span").find('.'+marker).length > 0 &&
      $(id1).find("span").find('.'+marker).length > 0 &&
      $(id2).find("span").find('.'+marker).length > 0) {
    return true;
  } else {
    return false;
  }
} // END --- player_wins

// this displays x and o images for markers
var player_1 = 'x';
var player_2 = 'o';
var currentPlayer;
var player1Name;
var player2Name;
var winner;
var win_count_x = 0;
var win_count_o = 0;
// displays x or o - runs currentPlayer thru function; and subs value of currentPlayer in...  (Current Player will be player_1 or player_2, and will sub 'x' or 'o' into image html)
function playerMarker(z){
  return '<img class="' + z + '" src="css/' + z + '_image.png">';
} //end--playerMarker function

var playGame = function (place) {
    place.find("span").append(playerMarker(currentPlayer));
    place.off("click");
  // this finds who wins
  if (player_wins("#field1", "#field2", "#field3", currentPlayer)||
      player_wins("#field4", "#field5", "#field6", currentPlayer)||
      player_wins("#field7", "#field8", "#field9", currentPlayer)||
      player_wins("#field1", "#field5", "#field9", currentPlayer)||
      player_wins("#field3", "#field5", "#field7", currentPlayer)||
      player_wins("#field1", "#field4", "#field7", currentPlayer)||
      player_wins("#field2", "#field5", "#field8", currentPlayer)||
      player_wins("#field3", "#field6", "#field9", currentPlayer)) {
      // displays winning player
      if(currentPlayer===player_2) {
        alert(player2Name + " wins!");
        $("button#reset_game").show();
        winner = player_2;
        win_count_o++;
        $(".grid").hide();
        $("#win_count_box").append(player2Name + "'s Wins: " + win_count_o + "<br>" );
        // Turn off all cells
        $(".cell").off("click");
      } else {
        alert(player1Name + " wins!");
        $("button#reset_game").show();
        // Turn off all cells
        win_count_x++;
        winner = player_1;
        $(".grid").hide();
        $("#win_count_box").append(player1Name + "'s Wins: " + win_count_x + "<br>");
        $(".cell").off("click");
      }
    }
    turn_count++;
    // makes image and switches players
    if (currentPlayer === player_1) {
      currentPlayer = player_2
      playerMarker(currentPlayer);
    } else {
      currentPlayer = player_1
      playerMarker(currentPlayer);
    }
    if (turn_count === 9) {
      alert("Game Over! Cat's Game!");
      $("button#reset_game").show();
      $("#display_cat_game").show();
      $(".grid").hide();
    }
} // End playGame

$(document).ready(function() {

  // get player names
  $("#players").submit(function(event) {
    player1Name = $("input#player_one").val();
    player2Name = $("input#player_two").val();
    event.preventDefault();
    $("#players").hide();
    $(".grid").show();
    $("#name_1").append("player one: " + player1Name);
    $("#name_2").append("player two: " + player2Name);
    var turnChoice = Math.floor((Math.random()*10)+1);
    if (turnChoice >= 5) {
      currentPlayer = player_1;
      alert(player1Name + " goes first")
    } else {
      currentPlayer = player_2;
      alert(player2Name + " goes first")
    }
    // Start game, allow user to click on board
    $(".cell").on("click", function() { playGame($(this)); });

    $("button#reset_game").click(function(){
      $(".cell span").empty();
      turn_count = 0;
      $(".grid").show();
      $("#display_cat_game").hide();


      if (winner === player_1){
         currentPlayer = winner;
         alert(player1Name + "'s turn!'");
       } else if (winner === player_2){
         currentPlayer = winner;
         alert(player2Name + "'s turn!'");
       }  else if (turn_count === 9) {
        var turnChoice = Math.floor((Math.random()*10)+1);
            if (turnChoice >= 5) {
              currentPlayer = player_1;
              alert(player1Name + " goes first!");
            } else {
              currentPlayer = player_2;
              alert(player2Name + " goes first");
            }
      }

      // Start game, allow user to click on board
      $(".cell").on("click", function() { playGame($(this)); });
    }); // end button reset_game

  });// end players names
}); // END -- document ready

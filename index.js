var gameStarted = false;
var level = 1;
var colors = ["red", "purple", "green", "blue"];
var correctPattern = [];

var userAnswerIndex = 0;




//START THE GAME ON KEY PRESS
$(document).on("keypress", function() {
start()

});


$("button").click(function(){
  start()
})

function start(){
  if (!gameStarted) {
    $("h1").text("Level " + level);
    gameStarted = true;
    nextSequence();

    userAnswerIndex = 0;
  }
}






$(".clickable").click(function(event) {
  if (gameStarted) {
    var clickedElement = event.target.className.split(" ")[0];
    playSound(clickedElement);


    if (clickedElement === correctPattern[userAnswerIndex]) {
      userAnswerIndex++;

      if (userAnswerIndex === correctPattern.length) {
        //generate next sequence and increaste Level
        level++;
        $("h1").text("Level " + level);

        setTimeout(function() {

          nextSequence();

        }, 1000);

      }
    } else {
      $("h1").text("Game Over. Press any key to play");
      correctPattern = [];
      new Audio("sounds/wrong.mp3").play();
      level = 1;
      gameStarted = false;
    }

  }

});

//GENERATE NEW SEQUENCE
function nextSequence() {


  userAnswerIndex = 0;
  // generate the next sequence based on the level.
  var randomNumber = Math.floor(Math.random() * 4);
  var selectedElement = colors[randomNumber];

  correctPattern.push(selectedElement);



  //flicker the selected selectedElement
  $("." + selectedElement).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  //Play sound.
  playSound(selectedElement);
}


function playSound(soundTrack) {
  var audio = new Audio("sounds/" + soundTrack + ".mp3");
  audio.play();
}

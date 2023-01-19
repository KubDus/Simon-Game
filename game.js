const buttonColors = ["red", "blue", "green", "yellow"];
const gamePattern = [];
var gameProgress = 0; // level of game
var levelProgress = 0; // how far in a current level did I get
var gameRunning = false;
var clickedColor;

// get first random color

$(document).keypress(function () {
  if (gameRunning !== true) {
    gameRunning = true;
    changeLevelText();
    gamePattern.push(getRandColor());
    animateNext();
  }
});

$(".btn").click(function () {
  if (gameRunning === false) {
    return;
  } else {
    clickedColor = $(this).attr("id");
    if (checkForCorrectColor(clickedColor)) {
      if (gameProgress === levelProgress) {
        setTimeout(gameNextLevel, 500);
      } else {
        levelProgress++;
      }
    } else {
      gameOver();
    }
  }
});

function gameNextLevel() {
  gameProgress++;
  levelProgress = 0;
  changeLevelText();
  gamePattern.push(getRandColor());
  animateNext();
}

function changeLevelText() {
  var level = gameProgress + 1; // to show 1 instead of 01

  if (!gameRunning) {
    $("#level-title").text("Game Over, Press Any Key to Restart");
  } else {
    $("#level-title").text("Level " + level);
  }
}

function gameOver() {
  gameProgress = 0;
  levelProgress = 0;
  gameRunning = false;

  playSound("wrong")

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  changeLevelText();
}

function checkForCorrectColor(color) {
  if (color === gamePattern[levelProgress]) {
    return true;
  }
  return false;
}

function animateNext() {
  $("." + gamePattern[gameProgress])
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(gamePattern[gameProgress]);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function getRandColor() {
  var randomNumber = Math.floor(Math.random() * 4);
  return buttonColors[randomNumber];
}

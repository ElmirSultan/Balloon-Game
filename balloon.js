const qutu = document.getElementById("qutu");
const gameBoard = document.getElementById("game-board")
const qutuWidth = qutu.offsetWidth
const gameBoardWidth = gameBoard.offsetWidth
var translationAmount = 0;
const popSound = document.getElementById("popSound")
window.onload = alert("This game is designed for desktop and laptop computers and may not work properly on mobile devices or tablets.")

document.addEventListener("keydown", function (event) {
  if (event.code === "ArrowLeft") {
    translationAmount -= 20;
    if (translationAmount < 0) {
      translationAmount = 0
    }
    qutu.style.transform = "translateX(" + translationAmount + "px)"
  }
  else if (event.code === "ArrowRight") {
    translationAmount += 20;
    if (translationAmount + qutuWidth > gameBoardWidth) {
      translationAmount = gameBoardWidth - qutuWidth;
    }
    qutu.style.transform = "translateX(" + translationAmount + "px)"
  }
})



const balloons = document.getElementsByClassName("circle")

for (let i = 0; i < balloons.length; i++) {
  balloons[i].style.top = Math.floor(Math.random() * -800) + "px";
  balloons[i].style.left = Math.floor(Math.random() * 850) + "px";
  balloons[i].speed = Math.floor(Math.random() * 5) + 2;
}

let score = 0;
const scoreElement = document.getElementById("show-score");
scoreElement.innerText = "Score: 0";

function moveCircles() {
  var positions = [];


  for (var i = 0; i < balloons.length; i++) {
    var circle = balloons[i];

    var collision = false;
    for (var j = 0; j < positions.length; j++) {
      var position = positions[j];
      if (Math.abs(parseInt(circle.style.left) - position.x) < 50 && Math.abs(parseInt(circle.style.top) - position.y) < 100) {
        collision = true;
        break;
      }
    }

    if (!collision) {
      circle.style.top = parseInt(circle.style.top) + circle.speed + "px";
      if (parseInt(circle.style.top) > 500) {
        circle.style.top = Math.floor(Math.random() * -800) + "px";
        circle.style.left = Math.floor(Math.random() * 850) + "px";
        circle.speed = Math.floor(Math.random() * 5) + 2;
      }

      positions.push({ x: parseInt(circle.style.left), y: parseInt(circle.style.top) });
    }
  }

  for (var i = 0; i < balloons.length; i++) {
    var circle = balloons[i];

   
    var qutuRect = qutu.getBoundingClientRect();
    var circleRect = circle.getBoundingClientRect();
    if (circleRect.bottom > qutuRect.top && circleRect.top < qutuRect.bottom && circleRect.right > qutuRect.left && circleRect.left < qutuRect.right) {
      
      if (circle.classList.contains("middle")) {
        score += 2;
      }
      else if (circle.classList.contains("big")) {
        score += 3;
      }
      else {
        score += 1;
      }
     
      circle.style.top = Math.floor(Math.random() * -800) + "px";
      circle.style.left = Math.floor(Math.random() * 850) + "px";
      circle.speed = Math.floor(Math.random() * 5) + 2;

      popSound.volume = 1;
      popSound.play()
    }


    

    scoreElement.innerText = "Score: " + score;
  }

}


function endGame() {
  for (var i = 0; i < balloons.length; i++) {
    balloons[i].style.display = "none";
  }

  startButton.style.display = "block"
  startButton.innerText = "Restart"

  score = 0;

  startButton.addEventListener('click', function () {
    qutu.style.display = "block"
    for (let i = 0; i < balloons.length; i++) {
      balloons[i].style.display = "block"
      balloons[i].style.top = Math.floor(Math.random() * -800) + "px";
      balloons[i].style.left = Math.floor(Math.random() * 850) + "px";
      balloons[i].speed = Math.floor(Math.random() * 5) + 2;
    }
  })
}



const startButton = document.getElementById("start-button")
startButton.addEventListener('click', function () {
  let remainingTime = 60;
  const timeElement = document.getElementById("time");
  timeElement.innerText = "Time: " + remainingTime;

  const highestScoreElement = document.getElementById("highest-score");
  highestScoreElement.innerText = "Highest score: " + localStorage.getItem("highestScore") || 0;

  const intervalId = setInterval(function () {
    remainingTime--;
    timeElement.innerText = "Time: " + remainingTime;

    if (remainingTime === 0) {

      clearInterval(intervalId);

      
      alert("Your score is " + score);
      const highestScore = localStorage.getItem("highestScore") || 0;
      if (score > highestScore) {
        localStorage.setItem("highestScore", score);
        alert("Congratulations! Your new highest score is: " + score);
      } else {
        alert("Better luck next time! Your highest score is still: " + highestScore);
      }

      endGame();

    }
  }, 1000);


  startButton.style.display = "none"

})






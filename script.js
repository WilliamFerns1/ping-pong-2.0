const gameCanvas = document.getElementById("game-canvas");

const setCanvasSize = () => {
  gameCanvas.setAttribute("width", window.innerWidth);
  gameCanvas.setAttribute("height", window.innerHeight);
}


const renderElements = () => {
  const ball = gameCanvas.getContext("2d");
  ball.fillStyle= "white";
  ball.beginPath();
  ball.arc(95, 50, 20, 0, 2 * Math.PI);
  ball.strokeStyle = "white";
  ball.stroke();
  ball.fill();

  const player1Paddle = gameCanvas.getContext("2d");
  player1Paddle.fillStyle = "blue";
  player1Paddle.fillRect(0, 0, 30, 400);

  const player2Paddle = gameCanvas.getContext("2d");
  player2Paddle.fillStyle = "red";
  player2Paddle.fillRect(100, 0, 30, 400);
}

renderElements();

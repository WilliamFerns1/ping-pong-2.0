const startGame = () => {
  myGameArea.start();
}

let config = {
  gameConfig: {
    "winScore": 3,
    "powerups": [
      {
        "name": "speed boost",
        "icon": "./assets/powerups/speed-boost-powerup.svg",
        "description": "Temporarily increase the speed of the players paddle that uses this powerup",
        "elexirPrice": "1000",
        "timeout": 10,
      },
      {
        "name": "paddle enlargement",
        "icon": "./assets/powerups/paddle-enlargement-powerup.svg",
        "description": "Temporarily increase the size of the players paddle that uses this powerup",
        "elexirPrice": "1500",
        "timeout": 15,
      },
      {
        "name": "speed up ball",
        "icon": "./assets/powerups/speed-up-ball-powerup.svg",
        "description": "Temporarily increase the ball speed when going to the opposite player, making it more difficult for the other player.",
        "elexirPrice": "2500",
        "timeout": 15,
      },
      {
        "name": "freeze player",
        "icon": "./assets/powerups/freeze-player-powerup.svg",
        "description": "Temporary slows down the opponent speed a ton.",
        "elexirPrice": "5000",
        "timeout": 2,
      },
    ]
  },
  mainElements: {
    "ball": {
      "circleRadius": 20,
      "fill": "#fff",
      "type": "player1Paddle",
    },
    "paddle": {
      "width": 30,
      "height": 400,
      "players": {
        "player1": {
          "paddleColor": "blue",
          "currentPosition": [],
        },
        "player2": {
          "paddleColor": "red",
          "currentPosition": []
        },
      }
    }
  }
}

let gameState = {
  "ball": {
    "position": [window,innnerWidth / 2, window.innerHeight / 2]
  },
  "player1": {
    "position": [15, (window.innerHeight / 2) - (config.mainElements.paddle.height / 2)],
  },
  "player2": {
    "position": [window.innerWidth - 15, (window.innerHeight / 2) - (config.mainElements.paddle.height / 2)],
  },
  "score": {
    "totals": {
      "player1": 0,
      "player2": 0,
    },
  }
}


const myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    renderElements();
  },
  renderBall: function() {
    const ball = gameCanvas.getContext("2d");
    const getBallInitialPosition = (circleRadius) => {
      const x = window.innerWidth - circleRadius;
      return {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      }
    }
    const ballRadiusWidth = 20;
    const { x, y } = getBallInitialPosition(ballRadiusWidth);
    ball.beginPath();
    ball.arc(x, y, ballRadiusWidth, 0, 2 * Math.PI);

    ball.fillStyle= "white";
    ball.fill();
  },
  renderPaddles: function() {
    const player1Paddle = gameCanvas.getContext("2d");
    player1Paddle.fillStyle = "blue";
    player1Paddle.fillRect(0, 0, 30, 400);

    const player2Paddle = gameCanvas.getContext("2d");
    player2Paddle.fillStyle = "red";
    player2Paddle.fillRect(100, 0, 30, 400);
  }
}

const setCanvasSize = () => {
  gameCanvas.setAttribute("width", window.innerWidth);
  gameCanvas.setAttribute("height", window.innerHeight);
}

}


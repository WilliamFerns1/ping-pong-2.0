const startGame = () => {
  myGameArea.start();
}

let config = {
  themes: {
    "activeTheme": "default",
    "allThemes": [
      {
        "name": "default",
        "background": "#121212",
        "text": "#FFFFFF",
        "primary": "#0000FF",
        "secondary": "#800080",
        "tertiary": "#808080",
        "primaryContainer": "rgba(0, 0, 255, 0.2)",
        "secondaryContainer": "rgba(128, 0, 128, 0.35)",
        "tertiaryContainer": "rgba(128, 128, 128, 0.5)"
      },
      {
        "name": "retro",
        "background": "#2B2B2B",
        "text": "#FFFFFF",
        "primary": "#00FF00",
        "secondary": "#FF00FF",
        "tertiary": "#FFFF00",
        "primaryContainer": "rgba(0, 255, 0, 0.2)",
        "secondaryContainer": "rgba(255, 0, 255, 0.35)",
        "tertiaryContainer": "rgba(255, 255, 0, 0.5)"
      },
      {
        "name": "neon",
        "background": "#000000",
        "text": "#FFFFFF",
        "primary": "#FF00FF",
        "secondary": "#00FFFF",
        "tertiary": "#FF4500",
        "primaryContainer": "rgba(255, 0, 255, 0.2)",
        "secondaryContainer": "rgba(0, 255, 255, 0.35)",
        "tertiaryContainer": "rgba(255, 69, 0, 0.5)"
      },
      {
        "name": "forest",
        "background": "#1A472A",
        "text": "#FFFFFF",
        "primary": "#228B22",
        "secondary": "#556B2F",
        "tertiary": "#8FBC8F",
        "primaryContainer": "rgba(34, 139, 34, 0.2)",
        "secondaryContainer": "rgba(85, 107, 47, 0.35)",
        "tertiaryContainer": "rgba(143, 188, 143, 0.5)"
      },
      {
        "name": "sunset",
        "background": "#FF4500",
        "text": "#FFFFFF",
        "primary": "#FFD700",
        "secondary": "#FF6347",
        "tertiary": "#8B0000",
        "primaryContainer": "rgba(255, 215, 0, 0.2)",
        "secondaryContainer": "rgba(255, 99, 71, 0.35)",
        "tertiaryContainer": "rgba(139, 0, 0, 0.5)"
      },
      {
        "name": "ocean",
        "background": "#1E3F66",
        "text": "#FFFFFF",
        "primary": "#00BFFF",
        "secondary": "#4682B4",
        "tertiary": "#5F9EA0",
        "primaryContainer": "rgba(0, 191, 255, 0.2)",
        "secondaryContainer": "rgba(70, 130, 180, 0.35)",
        "tertiaryContainer": "rgba(95, 158, 160, 0.5)"
      }
    ],
  },
  gameConfig: {
    "winScore": 3,
    "startingElixir": 500,
    "powerups": [
      {
        "name": "speed boost",
        "icon": "./assets/powerups/speed-boost-powerup.svg",
        "description": "Temporarily increase the speed of the players paddle that uses this powerup",
        "elixirPrice": "1000",
        "timeout": 10
      },
      {
        "name": "paddle enlargement",
        "icon": "./assets/powerups/paddle-enlargement-powerup.svg",
        "description": "Temporarily increase the size of the players paddle that uses this powerup",
        "elixirPrice": "1500",
        "timeout": 15
      },
      {
        "name": "speed up ball",
        "icon": "./assets/powerups/speed-up-ball-powerup.svg",
        "description": "Temporarily increase the ball speed when going to the opposite player, making it more difficult for the other player.",
        "elixirPrice": "2500",
        "timeout": 15
      },
      {
        "name": "freeze player",
        "icon": "./assets/powerups/freeze-player-powerup.svg",
        "description": "Temporary slows down the opponent speed a ton.",
        "elixirPrice": "5000",
        "timeout": 2
      },
    ]
  },
  mainElements: {
    "ball": {
      "circleRadius": 20,
      "fill": "#fff",
      "startingPosition": [window.innerWidth / 2, window.innerHeight / 2],
    },
    "paddle": {
      "width": 30,
      "height": 400,
      "players": {
        "player1": {
          "playerName": "Player 1",
          "controls": {
            "up": "w",
            "down": "s",
            "powerups": ["1", "2", "3", "4"]
          },
          "paddleColor": "blue",
          "startingPosition": [15, (window.innerHeight / 2) - 200] // Replaced the reference to config
        },
        "player2": {
          "playerName": "Player 2",
          "controls": {
            "up": "up",
            "down": "down",
            "powerups": ["left", "right", ["left, up"], ["right, up"]]
          },
          "paddleColor": "red",
          "startingPosition": [window.innerWidth - 15, (window.innerHeight / 2) - 200] // Replaced the reference to config
        },
      }
    }
  }
}

// Used to keep track of all game scores, for streaks later on maybe.
let allGames = []

let gameState = {
  "ball": {
    "position": config.mainElements.ball.startingPosition,
  },
  "player1": {
    "position": config.mainElements.paddle.players.player1.startingPosition,
    "elixir": config.gameConfig.startingElixir,
    "activePowerups": [],
  },
  "player2": {
    "position": config.mainElements.paddle.players.player2.startingPosition,
    "elixir": config.gameConfig.startingElixir,
    "activePowerups": [],
  },
  "score": {
    "totals": {
      "player1": 0,
      "player2": 0,
    },
  },
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
    const ballRadiusWidth = config.mainElements.ball.circleRadius;
    const ballFillColor = config.mainElements.ball.fill;

    const [x, y] = gameState.ball.position;

    ball.beginPath();
    ball.arc(x, y, ballRadiusWidth, 0, 2 * Math.PI);

    ball.fillStyle = ballFillColor;
    ball.fill();
  },
  renderPaddles: function() {
    const paddleWidth = config.mainElements.paddle.width;
    const paddleHeight = config.mainElements.paddle.height;

    const paddle1Config = config.mainElements.paddle.players.player1;
    const paddle2Config = config.mainElements.paddle.players.player2;

    const [p1PositionX, p1PositionY] = gameState.player1.position; 
    const [p2PositionX, p2PositionY] = gameState.player2.position; 

    const player1Paddle = gameCanvas.getContext("2d");
    player1Paddle.fillStyle = paddle1Config.paddleColor;
    player1Paddle.fillRect(p1PositionX, p1PositionY, paddleWidth, paddleHeight);

    const player2Paddle = gameCanvas.getContext("2d");
    player2Paddle.fillStyle = paddle2Config.paddleColor;
    player2Paddle.fillRect(p2PositionX, p2PositionY, paddleWidth, paddleHeight);
  }
}

const setCanvasSize = () => {
  gameCanvas.setAttribute("width", window.innerWidth);
  gameCanvas.setAttribute("height", window.innerHeight);
}


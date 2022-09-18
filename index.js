const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const resetBtn = document.querySelector("#resetBtn");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "limegreen";
const snakeBorder = "black";
const foodColor = "red";
const foodBorder = "black";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;

//draw snake
let snake = [
  { x: unitSize * 4, y: 0 },
  { x: unitSize * 3, y: 0 },
  { x: unitSize * 2, y: 0 },
  { x: unitSize, y: 0 },
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();

function gameStart() {
  running = true;
  scoreText.textContent = score;
  createFood();
  drawFood();
  nextTick();
}

function nextTick() {
  if (running) {
    setTimeout(function onTick() {
      clearBoard();
      drawFood();
      moveSnake();
      drawSnake();
      checkGameOver();
      nextTick();
    }, 75);
  } else {
    displayGameOver();
  }
}

function clearBoard() {
  ctx.fillStyle = boardBackground;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function createFood() {
  function randomFood(min, max) {
    const randNum =
      Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
    return randNum;
  }
  foodX = randomFood(0, gameWidth - unitSize);
  foodY = randomFood(0, gameHeight - unitSize);
}

function drawFood() {
  ctx.fillStyle = foodColor;
  ctx.strokeStyle = foodBorder;
  ctx.fillRect(foodX, foodY, unitSize, unitSize);
  ctx.strokeRect(foodX, foodY, unitSize, unitSize);
}

function moveSnake() {
  const head = { x: snake[0].x + xVelocity, y: snake[0].y + yVelocity };
  snake.unshift(head);
  //check if snake ate food
  if (snake[0].x === foodX && snake[0].y === foodY) {
    score += 1;
    scoreText.textContent = score;
    createFood();
    drawFood();
  } else {
    snake.pop();
  }
}

function drawSnake() {
  ctx.fillStyle = snakeColor;
  ctx.strokeStyle = snakeBorder;
  snake.forEach((snakePart) => {
    ctx.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
    ctx.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
  });
}

function changeDirection(e) {
  const keyPressed = e.keyCode;
  const left = 37;
  const right = 39;
  const up = 38;
  const down = 40;

  const goingUp = yVelocity === -unitSize;
  const goingDown = yVelocity === unitSize;
  const goingRight = xVelocity === unitSize;
  const goingLeft = xVelocity === -unitSize;

  switch (true) {
    case keyPressed === left && !goingRight:
      xVelocity = -unitSize;
      yVelocity = 0;
      break;
    case keyPressed === up && !goingDown:
      xVelocity = 0;
      yVelocity = -unitSize;
      break;
    case keyPressed === right && !goingLeft:
      xVelocity = unitSize;
      yVelocity = 0;
      break;
    case keyPressed === down && !goingUp:
      xVelocity = 0;
      yVelocity = unitSize;
      break;
  }
}

function checkGameOver() {
  if (snake[0].x < 0 || snake[0].x > gameWidth - unitSize) {
    running = false;
  }
    if (snake[0].y < 0 || snake[0].y > gameHeight - unitSize) {
    running = false;
  }
    for (let i = 4; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      running = false;
    }
  }
}

function displayGameOver() {
  ctx.font = "50px Arial";
  ctx.fillStyle = "red";
  ctx.fillText("Game Over!", gameWidth / 6, gameHeight / 2);
}

function resetGame() {
  snake = [
    { x: unitSize * 4, y: 0 },
    { x: unitSize * 3, y: 0 },
    { x: unitSize * 2, y: 0 },
    { x: unitSize, y: 0 },
  ];
  xVelocity = unitSize;
  yVelocity = 0;
  score = 0;
  scoreText.innerHTML = score;
  foodX = null;
  foodY = null;
  gameStart();
}

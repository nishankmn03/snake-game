const canvas = document.getElementById("gameBoard");
const ctx = canvas.getContext("2d");

const scoreText = document.getElementById("score");
const levelText = document.getElementById("level");

const box = 20;

// Snake Initial Body
let snake = [
  { x: 200, y: 200 },
  { x: 180, y: 200 },
  { x: 160, y: 200 },
];

// Food
let food = generateFood();

// Direction
let direction = "RIGHT";

// Score & Level
let score = 0;
let level = 1;

// Initial Speed
let speed = 250;

let game;

// Keyboard Controls
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  if (event.key === "ArrowUp" && direction !== "DOWN") {
    direction = "UP";
  } else if (event.key === "ArrowDown" && direction !== "UP") {
    direction = "DOWN";
  } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {
    direction = "LEFT";
  } else if (event.key === "ArrowRight" && direction !== "LEFT") {
    direction = "RIGHT";
  }
}

// Generate Food
function generateFood() {
  return {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box,
  };
}

// Collision Detection
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }

  return false;
}

// Draw Game
function drawGame() {
  // Background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Snake
  for (let i = 0; i < snake.length; i++) {
    // Head Color
    if (i === 0) {
      ctx.fillStyle = "lime";
    }

    // Body Color
    else {
      ctx.fillStyle = "green";
    }

    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    // Border
    ctx.strokeStyle = "black";

    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw Food
  ctx.fillStyle = "red";

  ctx.fillRect(food.x, food.y, box, box);

  // Current Head Position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // Movement
  if (direction === "UP") snakeY -= box;
  if (direction === "DOWN") snakeY += box;
  if (direction === "LEFT") snakeX -= box;
  if (direction === "RIGHT") snakeX += box;

  // Eat Food
  if (snakeX === food.x && snakeY === food.y) {
    score++;
    scoreText.innerText = score;

    // Level Up Every 5 Points
    if (score % 5 === 0) {
      level++;
      levelText.innerText = level;

      // Increase Speed
      if (speed > 80) {
        speed -= 20;
      }

      clearInterval(game);
      game = setInterval(drawGame, speed);
    }

    food = generateFood();
  } else {
    snake.pop();
  }

  // New Head
  const newHead = {
    x: snakeX,
    y: snakeY,
  };

  // Wall or Self Collision
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX >= canvas.width ||
    snakeY >= canvas.height ||
    collision(newHead, snake)
  ) {
    clearInterval(game);

    alert("Game Over!\n\n" + "Score: " + score + "\nLevel: " + level);
  }

  // Add Head
  snake.unshift(newHead);
}

// Start Game
game = setInterval(drawGame, speed);

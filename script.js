document.addEventListener('DOMContentLoaded', (event) => {
//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context; 
var score = 0;
var scr = document.getElementById('score');

//speed

var difficulty = localStorage.getItem('difficulty')||1;
var speed = (2*difficulty)+ parseInt(difficulty);
console.log(speed);

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];

//food
var foodX;
var foodY;

//Hiscore
var hiscore=localStorage.getItem('hiscore')||0;
var highScr = document.getElementById('hiscore');
highScr.innerHTML = `Hiscore: ${hiscore}`;

//sound
let foodSound = new Audio('food.mp3');
let gameSound = new Audio('gameover.mp3');
let movedSound = new Audio('move.mp3');
let BGM = new Audio('music.mp3');
BGM.loop = true; // Set the BGM to loop

var gameOver = false;
var bgmPlaying = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //used for drawing on the board
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    document.addEventListener("keydown", function() {
        if (!bgmPlaying) {
            BGM.play();
            bgmPlaying = true;
        }
    });
    setInterval(update, 1000/speed); 
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        foodSound.play();
        score++;
        scr.innerHTML = `Score:${score}`;
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions
    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
       endGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
           endGame();
        }
    }
}
document.addEventListener('keydown', function(e) {
    if (e.code === "32") {
        togglePause();
        console.log('pressed');
    } else {
        if (!bgmPlaying) {
            BGM.play();
            bgmPlaying = true;
        }
        changeDirection(e);
    }
});

function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
        movedSound.play();
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
        movedSound.play();
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
        movedSound.play();
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
        movedSound.play();
    }
}
function togglePause() {
    paused = !paused;
    if (paused) {
        clearInterval(gameInterval);
        BGM.pause();
    } else {
        startGame();
        BGM.play();
    }
}

function placeFood() {
    let validPosition = false;
    while (!validPosition) {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
        validPosition = true;

        // Check if food coordinates are on the snake body
        if (foodX === snakeX && foodY === snakeY) {
            validPosition = false;
        } else {
            for (let i = 0; i < snakeBody.length; i++) {
                if (foodX === snakeBody[i][0] && foodY === snakeBody[i][1]) {
                    validPosition = false;
                    break;
                }
            }
        }
    }
}
function endGame() {
    gameOver = true;
    gameSound.play();
    BGM.pause();
    alert("Game Over");
    if (score > hiscore) {
        hiscore = score;
        localStorage.setItem('hiscore', hiscore);
        highScr.innerHTML = `Hiscore: ${hiscore}`;
    }
    window.location.href = 'page_0.html'; // Redirect after alert is acknowledged
}



});


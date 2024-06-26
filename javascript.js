document.addEventListener('DOMContentLoaded', (event) => {
    const gameArea = document.getElementById('gameArea');
    const paddle = document.getElementById('paddle');
    const ball = document.getElementById('ball');
    const gameOver = document.getElementById('gameOver');

    let paddleWidth = 100;
    let paddleX = (gameArea.clientWidth - paddleWidth) / 2;

    let ballRadius = 10;
    let ballX = gameArea.clientWidth / 2;
    let ballY = 50;
    let ballSpeedX = 2;
    let ballSpeedY = 2;

    let rightPressed = false;
    let leftPressed = false;
    let gameIsOver = false;

    document.addEventListener('keydown', keyDownHandler, false);
    document.addEventListener('keyup', keyUpHandler, false);

    function keyDownHandler(e) {
        if (e.key == 'Right' || e.key == 'ArrowRight') {
            rightPressed = true;
        } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if (e.key == 'Right' || e.key == 'ArrowRight') {
            rightPressed = false;
        } else if (e.key == 'Left' || e.key == 'ArrowLeft') {
            leftPressed = false;
        }
    }

    function drawPaddle() {
        paddle.style.left = `${paddleX}px`;
    }

    function drawBall() {
        ball.style.left = `${ballX}px`;
        ball.style.top = `${ballY}px`;
    }

    function showGameOver() {
        gameOver.classList.remove('hidden');
        gameOver.style.display = 'block';
        gameIsOver = true;
    }

    function update() {
        if (gameIsOver) return;

        if (ballX + ballSpeedX > gameArea.clientWidth - ballRadius || ballX + ballSpeedX < ballRadius) {
            ballSpeedX = -ballSpeedX;
        }

        if (ballY + ballSpeedY < ballRadius) {
            ballSpeedY = -ballSpeedY;
        } else if (ballY + ballSpeedY > gameArea.clientHeight - ballRadius) {
            if (ballX > paddleX && ballX < paddleX + paddleWidth) {
                ballSpeedY = -ballSpeedY;
            } else {
                showGameOver();
                return;
            }
        }

        ballX += ballSpeedX;
        ballY += ballSpeedY;

        if (rightPressed && paddleX < gameArea.clientWidth - paddleWidth) {
            paddleX += 7;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 7;
        }

        drawPaddle();
        drawBall();
        requestAnimationFrame(update);
    }

    update();
});

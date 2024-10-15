const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;

let player1Y = canvas.height / 2 - paddleHeight / 2;
let player2Y = canvas.height / 2 - paddleHeight / 2;
let player1Speed = 0;
let player2Speed = 0;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
}

function update() {
    // Di chuyển các thanh
    player1Y += player1Speed;
    player2Y += player2Speed;

    // Kiểm tra không cho thanh vượt quá màn hình
    if (player1Y < 0) player1Y = 0;
    if (player1Y + paddleHeight > canvas.height) player1Y = canvas.height - paddleHeight;

    if (player2Y < 0) player2Y = 0;
    if (player2Y + paddleHeight > canvas.height) player2Y = canvas.height - paddleHeight;

    // Di chuyển bóng
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Kiểm tra bóng va chạm với các bức tường trên/dưới
    if (ballY <= 0 || ballY >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Va chạm với player 1
    if (
        ballX + ballSize >= canvas.width - paddleWidth &&
        ballY >= player1Y &&
        ballY <= player1Y + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Va chạm với player 2
    if (
        ballX - ballSize <= paddleWidth &&
        ballY >= player2Y &&
        ballY <= player2Y + paddleHeight
    ) {
        ballSpeedX = -ballSpeedX;
    }

    // Kiểm tra bóng ra khỏi màn hình
    if (ballX + ballSize > canvas.width) {
        resetBall(); // Player 2 ghi điểm
    } else if (ballX - ballSize < 0) {
        resetBall(); // Player 1 ghi điểm
    }
}

function draw() {
    // Xóa canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Vẽ người chơi 1 (bên phải)
    drawRect(canvas.width - paddleWidth, player1Y, paddleWidth, paddleHeight, "#fff");

    // Vẽ người chơi 2 (bên trái)
    drawRect(0, player2Y, paddleWidth, paddleHeight, "#fff");

    // Vẽ bóng
    drawCircle(ballX, ballY, ballSize, "#fff");
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", function (e) {
    // Điều khiển người chơi 1 (phím mũi tên lên và xuống)
    if (e.key === "ArrowUp") {
        player1Speed = -6;
    } else if (e.key === "ArrowDown") {
        player1Speed = 6;
    }

    // Điều khiển người chơi 2 (phím W và S)
    if (e.key === "w") {
        player2Speed = -6;
    } else if (e.key === "s") {
        player2Speed = 6;
    }
});

window.addEventListener("keyup", function (e) {
    // Dừng di chuyển khi nhả phím
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        player1Speed = 0;
    }
    if (e.key === "w" || e.key === "s") {
        player2Speed = 0;
    }
});

gameLoop();
let player = document.getElementById('player');
let obstacle = document.getElementById('obstacle');
let scoreElement = document.getElementById('score');
let bountyElement = document.getElementById('bounty');
let score = 0;
let bounty = 0;
let isJumping = false;
let isPaused = false;

function jump() {
    if (isJumping || isPaused) return;
    isJumping = true;
    let jumpHeight = 150;
    let jumpDuration = 500;
    player.style.transition = `bottom ${jumpDuration / 1000}s`;
    player.style.bottom = `${parseInt(player.style.bottom) + jumpHeight}px`;

    setTimeout(() => {
        player.style.bottom = '20px';
        setTimeout(() => {
            isJumping = false;
        }, jumpDuration);
    }, jumpDuration);
}

function checkCollision() {
    let playerRect = player.getBoundingClientRect();
    let obstacleRect = obstacle.getBoundingClientRect();

    if (
        playerRect.left < obstacleRect.left + obstacleRect.width &&
        playerRect.left + playerRect.width > obstacleRect.left &&
        playerRect.top < obstacleRect.top + obstacleRect.height &&
        playerRect.top + playerRect.height > obstacleRect.top
    ) {
        pauseGame();
    } else if (obstacleRect.right < playerRect.left && !obstacle.passed) {
    score += 10;
    scoreElement.textContent = score;
    obstacle.passed = true; // Mark the obstacle as passed
    resetObstacle(); // Reset obstacle position
}
}

function resetObstacle() {
    obstacle.passed = false; // Reset the passed status
    obstacle.style.animation = 'none';
    setTimeout(() => {
        obstacle.style.animation = 'moveObstacle 2s linear infinite';
    }, 10);
}


function updateBounty() {
    if (score >= 40) {
        bounty += 100;
        bountyElement.textContent = bounty;
        resetGame();
        alert('You reached the goal! You won the bounty!');
    }
}

function pauseGame() {
    isPaused = true;
    obstacle.style.animationPlayState = 'paused';
    document.getElementById('pauseMessage').style.display = 'block';
}

function resumeGame() {
    isPaused = false;
    obstacle.style.animationPlayState = 'running';
    document.getElementById('pauseMessage').style.display = 'none';
}

function resetGame() {
    score = 0;
    scoreElement.textContent = score;
    resumeGame();
    obstacle.style.animation = 'none';
    setTimeout(() => {
        obstacle.style.animation = 'moveObstacle 2s linear infinite';
    }, 10);
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowUp') {
        jump();
    } else if (event.key === 'Enter' && isPaused) {
        resetGame();
    }
});

setInterval(() => {
    if (!isPaused) {
        checkCollision();
        updateBounty();
    }
}, 50);

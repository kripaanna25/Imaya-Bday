function nextPage(current) {
    const currentPage = document.getElementById("page" + current);
    const next = document.getElementById("page" + (current + 1));

    currentPage.classList.remove("active");
    next.classList.add("active");
}

/* Tic Tac Toe */

const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let cells = [];
let gameActive = true;

function startGame() {
    board.innerHTML = "";
    cells = [];
    gameActive = true;
    statusText.innerHTML = "Your Turn (X)";
    restartBtn.style.display = "none";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
        cells.push(cell);
    }
}

function handleClick(e) {
    if (!gameActive) return;

    const cell = e.target;

    if (cell.textContent !== "") return;

    cell.textContent = "X";

    if (checkWinner("X")) {
        endGame("🎉 YOU WON 🎉");
        return;
    }

    if (checkDraw()) {
        endGame("It's a draw 😭 Try again!");
        return;
    }

    statusText.innerHTML = "Computer's Turn...";
    setTimeout(computerMove, 600);
}

function computerMove() {
    if (!gameActive) return;

    let emptyCells = cells.filter(cell => cell.textContent === "");
    if (emptyCells.length === 0) return;

    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = "O";

    if (checkWinner("O")) {
        endGame("I won 😌 Try again!");
        return;
    }

    if (checkDraw()) {
        endGame("It's a draw 😭 Try again!");
        return;
    }

    statusText.innerHTML = "Your Turn (X)";
}

function checkWinner(player) {
    const winPatterns = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let pattern of winPatterns) {
        if (pattern.every(index => cells[index].textContent === player)) {
            drawWinningLine(pattern);
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return cells.every(cell => cell.textContent !== "");
}

function endGame(message) {
    gameActive = false;
    statusText.innerHTML = message;

    if (message.includes("YOU WON")) {
        setTimeout(() => {
            document.getElementById("board").style.opacity = "0";
        }, 800);

        setTimeout(() => {
            document.getElementById("finalOverlay").classList.add("active");
        }, 1800);
    } else {
        restartBtn.style.display = "inline-block";
    }
}

function drawWinningLine(pattern) {
    const line = document.createElement("div");
    line.classList.add("win-line");

    const boardRect = board.getBoundingClientRect();

    const positions = pattern.map(index => {
        const rect = cells[index].getBoundingClientRect();
        return {
            x: rect.left - boardRect.left + rect.width / 2,
            y: rect.top - boardRect.top + rect.height / 2
        };
    });

    const start = positions[0];
    const end = positions[2];

    const length = Math.hypot(end.x - start.x, end.y - start.y);
    const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

    line.style.width = length + "px";
    line.style.left = start.x + "px";
    line.style.top = start.y + "px";
    line.style.transform = `rotate(${angle}deg)`;

    board.appendChild(line);
}

startGame();

const menuClick = document.getElementById("menuClick");

function playMenuClick() {
    menuClick.currentTime = 0;
    menuClick.play();
}

const bgMusic = document.getElementById("bgMusic");

function startMusic() {
    bgMusic.volume = 0.5; // soft background
    bgMusic.play();
}
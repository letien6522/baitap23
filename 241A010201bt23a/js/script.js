const arena = document.getElementById("arena");
const target = document.getElementById("target");
const startBtn = document.getElementById("start-btn");
const btnChangeBg = document.getElementById("btn-change-bg");
const btnPlayer = document.getElementById("btn-player");
const timeSelect = document.getElementById("time-select");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const gameOverScreen = document.getElementById("game-over");
const finalScore = document.getElementById("final-score");
const playerModal = document.getElementById("player-modal");

const MSSV = "241A010201";
let score = 0;
let timeLeft = 0;
let timer = null;
let isPlaying = false;

// 1. Đổi màu nền ngẫu nhiên
btnChangeBg.onclick = () => {
  arena.style.background = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
};

// 2. Nút Người chơi hiển thị MSSV
btnPlayer.onclick = () => {
  playerModal.style.display = "flex";
};

playerModal.onclick = () => {
  playerModal.style.display = "none";
};

// Hàm tạo vị trí ngẫu nhiên cho mục tiêu
function moveTarget() {
  const maxX = 600 - 45;
  const maxY = 400 - 45;
  target.style.left = Math.floor(Math.random() * maxX) + "px";
  target.style.top = Math.floor(Math.random() * maxY) + "px";
}

// Bắt sự kiện click mục tiêu
target.onclick = () => {
  if (!isPlaying) return;
  score++;
  scoreDisplay.textContent = score;
  moveTarget();
};

// 3. Bắt đầu chơi với thời gian đếm ngược tùy chọn
startBtn.onclick = () => {
  score = 0;
  timeLeft = parseInt(timeSelect.value, 10);
  isPlaying = true;

  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;
  gameOverScreen.style.display = "none";
  startBtn.disabled = true;
  timeSelect.disabled = true;

  target.style.display = "block";
  moveTarget();

  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);
};

// Kết thúc trò chơi và khóa thao tác
function endGame() {
  isPlaying = false;
  clearInterval(timer);
  target.style.display = "none";
  gameOverScreen.style.display = "flex";
  finalScore.textContent = score;

  startBtn.disabled = false;
  timeSelect.disabled = false;
}
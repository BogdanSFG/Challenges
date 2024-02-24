const reset = document.querySelector('#reset');
const roll = document.querySelector('#roll');
const hold = document.querySelector('#hold');
const diceFace = document.querySelector('.dice-face img');
const p1 = document.querySelector('.player-1');
const p2 = document.querySelector('.player-2');

const p1ScoreShow = document.querySelector('.player-1 .total-score');
const p2ScoreShow = document.querySelector('.player-2 .total-score');
const p1CurrentShow = document.querySelector('.player-1 .current-score');
const p2CurrentShow = document.querySelector('.player-2 .current-score');

const appear = [{ opacity: 0 }, { opacity: 1 }];
const timing = { duration: 200, iteration: 1 };

let gameOver = true;
let p1Score;
let p2Score;
let p1Current;
let p2Current;
let random;

startGame();

reset.addEventListener('click', startGame);

roll.addEventListener('click', () => {
  if (!gameOver) {
    random = Math.floor(Math.random() * 6) + 1;
    showDiceFace(random);
    if (checkForOne()) return;

    if (!p1.classList.contains('disable')) {
      p1CurrentShow.innerHTML = parseInt(p1CurrentShow.innerHTML) + random;
    } else {
      p2CurrentShow.innerHTML = parseInt(p2CurrentShow.innerHTML) + random;
    }
  }
});

hold.addEventListener('click', () => {
  if (!p1.classList.contains('disable')) {
    p1ScoreShow.innerHTML =
      parseInt(p1ScoreShow.innerHTML) + parseInt(p1CurrentShow.innerHTML);
    p1CurrentShow.innerHTML = 0;
    switchP(p1, p2);
  } else if (!p2.classList.contains('disable')) {
    p2ScoreShow.innerHTML =
      parseInt(p2ScoreShow.innerHTML) + parseInt(p2CurrentShow.innerHTML);
    p2CurrentShow.innerHTML = 0;
    switchP(p1, p2);
  }
});

function startGame() {
  gameOver = false;
  p1Score = 0;
  p2Score = 0;
  p1Current = 0;
  p2Current = 0;
  updateHud();
  resetToInitial();
}

function resetToInitial() {
  if (p1.classList.contains('disable')) {
    p1.classList.remove('disable');
    p1.querySelector('.current').classList.remove('disable');
  }
  if (!p2.classList.contains('disable')) {
    p2.classList.add('disable');
    p2.querySelector('.current').classList.add('disable');
  }
}

function switchP(p1, p2) {
  p1.classList.toggle('disable');
  p1.querySelector('.current').classList.toggle('disable');
  p2.classList.toggle('disable');
  p2.querySelector('.current').classList.toggle('disable');
}

function updateHud() {
  p1ScoreShow.innerHTML = p1Score;
  p2ScoreShow.innerHTML = p1Score;
  p1CurrentShow.innerHTML = p1Current;
  p2CurrentShow.innerHTML = p2Current;
}

function checkForOne() {
  if (random === 1) {
    p1CurrentShow.innerHTML = '0';
    p2CurrentShow.innerHTML = '0';
    switchP(p1, p2);
    setTimeout(() => {
      diceFace.classList.add('hide');
    }, 1000);
    return true;
  }
  return false;
}

function showDiceFace(random) {
  diceFace.src = `images/df-${random}.png`;
  diceFace.animate(appear, timing);
  if (diceFace.classList.contains('hide')) {
    diceFace.classList.remove('hide');
  }
}

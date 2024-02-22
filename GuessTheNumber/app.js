const rangeDiv = document.querySelector(".game-start");
const rangeInput = document.querySelector("#range");
const game = document.querySelector(".game-play");
const rollBtn = document.querySelector("#roll-btn");
const title = document.querySelector("#title");
const highscoreShow = document.querySelector("#highscore");
const guessesLeftShow = document.querySelector("#guesses-left");
const scoreShow = document.querySelector("#score");

const guessInput = document.querySelector("#guess");
const checkBtn = document.querySelector("#check");
const modalWrapperWon = document.querySelector(".modal-wrapper");

const popIn = [
  { transform: "scale(40%)", opacity: 0 },
  { transform: "scale(100%)", opacity: 1 },
];
const disappear = [
  { transform: "scale(100%)", opacity: 1 },
  { transform: "scale(40%)", opacity: 0 },
];
const appear = [
  { transform: "translateX(-100%) scale(40%)", opacity: 0 },
  { transform: "translateX(0) scale(100%)", opacity: 1 },
];
const timing = { duration: 800, iterations: 1 };
const fast = { duration: 300, iterations: 1 };

let gameOver = true;
let score = 0;
let random = 0;
let guessesLeft = 0;
let highscore = 0;

rollBtn.addEventListener("click", (e) => {
  startGame();
});

rangeInput.addEventListener("input", async () => {
  const parent = rangeInput.closest(".game-start");
  if (rangeInput.value) {
    if (parent.firstElementChild.classList.contains("warning")) {
      parent.firstElementChild.animate(disappear, timing);
      setTimeout(() => {
        if (parent.firstElementChild.classList.contains("warning")) {
          parent.firstElementChild.remove();
        }
      }, timing.duration - 400);
    }
  } else {
    createWarning(parent, "Range field can't be empty!");
  }
});

checkBtn.addEventListener("click", () => {
  if (!gameOver) {
    if (parseInt(guessInput.value) !== random) {
      guessesLeft--;
      score = score - 100;
      console.log(random);
      console.log(score);
      updateScore();
      guessInput.value = "";
    } else {
      gameOver = true;
      // Pop modal here
      animateExtra(modalWrapperWon, popIn, fast);
      highscore < score ? (highscore = score) : (highscore = highscore);
      updateModal();
      highscoreShow.innerHTML = `Highscore: ${highscore} 🏆`;
    }
  }
});

window.onclick = function (e) {
  if (e.target == modalWrapperWon) {
    modalWrapperWon.animate(disappear, fast);
    setTimeout(() => {
      modalWrapperWon.classList.toggle("hide");
    }, fast.duration - 40);
  }
};

function startGame() {
  if (rangeInput.value) {
    gameOver = false;
    animateOut(rangeDiv);
    animateIn(game);
    random = Math.floor(Math.random() * rangeInput.value) + 1;
    updateHud();
  } else {
    if (!rangeDiv.firstElementChild.classList.contains("warning")) {
      createWarning(rangeDiv, "Range field can't be empty!");
    }
  }
}

function animateExtra(element, effect, time) {
  element.classList.toggle("hide");
  element.animate(effect, time);
}

function animateOut(element) {
  element.animate(disappear, timing);
  setTimeout(() => {
    element.classList.toggle("hide");
  }, timing.duration - 100);
}

function animateIn(element) {
  setTimeout(() => {
    element.classList.toggle("hide");
    element.animate(appear, timing);
  }, timing.duration - 100);
}

function createWarning(parent, text) {
  const warning = document.createElement("span");
  warning.classList.toggle("warning");
  warning.innerHTML = text;
  warning.animate(appear, timing);
  parent.insertAdjacentElement("afterbegin", warning);
}

function updateHud() {
  title.innerHTML += " " + rangeInput.value;
  score = 1000;
  guessesLeft = 10;
  guessesLeftShow.innerHTML = `Guesses left: ${guessesLeft} 👾`;
  scoreShow.innerHTML = `Score: ${score} 🌟`;
  highscoreShow.innerHTML = `Highscore: ${highscore} 🏆`;
}

function updateScore() {
  if (guessesLeft > 6) {
    guessesLeftShow.innerHTML = `Guesses left: ${guessesLeft} <span>👾</span>`;
  } else if (guessesLeft > 3) {
    guessesLeftShow.innerHTML = `Guesses left: ${guessesLeft} <span>👹</span>`;
    if (guessesLeft === 6) {
      const icon = guessesLeftShow.querySelector("span");
      icon.animate(appear, timing);
    }
  } else if (guessesLeft > 0) {
    guessesLeftShow.innerHTML = `Guesses left: ${guessesLeft} <span>👻</span>`;
    if (guessesLeft === 3) {
      const icon = guessesLeftShow.querySelector("span");
      icon.animate(appear, timing);
    }
  }
  if (guessesLeft === 0) {
    guessesLeftShow.innerHTML = `Guesses left: ${guessesLeft} <span>💀</span>`;
    if (guessesLeft === 3) {
      const icon = guessesLeftShow.querySelector("span");
      icon.animate(appear, timing);
    }
  }

  scoreShow.innerHTML = `Score: ${score} 🌟`;
}

function updateModal() {
  const number = document.querySelector(".modal-content .number");
  const scored = document.querySelector(".modal-content .score");

  number.innerHTML = `The number was indeed: ${random}`;
  scored.innerHTML = `You scored : ${score} 🎉`;
}

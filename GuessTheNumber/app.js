const rangeDiv = document.querySelector(".game-start");
const rangeInput = document.querySelector("#range");
const game = document.querySelector(".game-play");
const rollBtn = document.querySelector("#roll-btn");
const title = document.querySelector("#title");
const highscoreShow = document.querySelector("#highscore");
const guessesLeftShow = document.querySelector("#guesses-left");
const scoreShow = document.querySelector("#score");
const tipShow = document.querySelector(".tips");

const guessInput = document.querySelector("#guess");
const checkBtn = document.querySelector("#check");
const resetBtn = document.querySelector("#reset");
const resetBtnModal = document.querySelector("#resetBtn");
const modalWrapperWon = document.querySelector(".modal-wrapper");
const resetModal = document.querySelector(".reset-modal");
const resetInput = document.querySelector("#newRange");

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
    if (guessInput.value) {
      if (parseInt(guessInput.value) !== random) {
        guessesLeft--;
        score = score - 100;
        addTip(tipShow);
        updateScore();
        guessInput.value = "";
      } else {
        gameOver = true;
        tipShow.innerHTML = `💅 Congratulations !`;

        // Pop modal here
        animateExtra(modalWrapperWon, popIn, fast);
        highscore < score ? (highscore = score) : (highscore = highscore);
        updateModal();
        highscoreShow.innerHTML = `Highscore: ${highscore} 🏆`;
      }
      if (guessesLeft === 0) {
        document.body.style.backgroundColor = "red";
        tipShow.innerHTML = "Game OVER 🧟‍♂️";
      }
    }

    if (guessesLeft === 0) {
      gameOver = true;
    }
  }
});

resetBtn.addEventListener("click", () => {
  animateExtra(resetModal, appear, fast);
});

console.log(resetBtnModal);
resetBtnModal.addEventListener("click", () => {
  if (resetInput.value) {
    resetGame();
    resetInput.value = "";
    resetModal.classList.toggle("hide");
  }
});

window.onclick = function (e) {
  if (e.target == modalWrapperWon) {
    modalWrapperWon.animate(disappear, fast);
    setTimeout(() => {
      modalWrapperWon.classList.toggle("hide");
    }, fast.duration - 40);
  }

  if (e.target == resetModal) {
    animateOut(resetModal);
  }
};

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !rangeDiv.classList.contains("hide")) {
    rollBtn.click();
  }

  if (e.key === "Enter") {
    checkBtn.click();
  }

  if (e.key === "Escape" && !modalWrapperWon.classList.contains("hide")) {
    animateOut(modalWrapperWon);
  }

  if (e.key === "Enter" && !resetModal.classList.contains("hide")) {
    resetBtnModal.click();
  }

  if (e.key === "Escape" && !resetModal.classList.contains("hide")) {
    animateOut(resetModal);
  }
});

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
  title.innerHTML = `Ok here we go. Pick a number between 0 and ${rangeInput.value}`;
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

function resetGame() {
  updateHud();
  title.innerHTML = `Ok here we go. Pick a number between 0 and ${resetInput.value}`;
  guessInput.value = "";
  random = Math.floor(Math.random() * resetInput.value) + 1;
  gameOver = false;
  document.body.style.backgroundColor = "#151515";
  tipShow.innerHTML = `Good luck!`;
}

function addTip(element) {
  parseInt(guessInput.value) > random
    ? (element.innerHTML = `📈 Too high!`)
    : (element.innerHTML = `📉 Too low!`);
}

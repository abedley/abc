const alphabet = 'abcdefghijklmnopqrstuvwxyz';
var rng = function(s) {
    return function(min, max) {
        s = Math.sin(s) * 10000;
        return Math.floor((s - Math.floor(s)) * (max - min)) + min;
    };
};

const randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

document.addEventListener("DOMContentLoaded", function(event) {
  const random = randomInt;

  // Time
  const timer = document.getElementById("timer");
  let intervalId;
  let timeLeft;

  function updateTime() {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft == 0) {
      clearInterval(intervalId);
      endGame();
    }
  }

  // Game
  const before = document.getElementById("before");
  const after = document.getElementById("after");
  let score;
  let maxScore;

  function newLetters() {
    const newBefore = alphabet[random(0, alphabet.length)];
    let newAfter = alphabet[random(0, alphabet.length)];

    while (newBefore == newAfter) {
      newAfter = alphabet[random(0, alphabet.length)];
    }

    before.textContent = newBefore;
    after.textContent = newAfter;
  }

  function check() {
    return alphabet.indexOf(before.textContent) < alphabet.indexOf(after.textContent)
  }

  // Buttons
  const yes = document.getElementById("yes");
  const no = document.getElementById("no");

  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    
    console.log(keyName);

    if (keyName === 'q') {
      return yesPress();
    } else if (keyName === 'p') {
      return noPress();
    } else if (keyName === 'Enter') {
      return startGame();
    }
    
  });

  const yesPress = function() {
    if (timeLeft == 0) {
      return;
    }
    if (check()) {
      score++;
      update(true);
    } else {
      return update(false);
    }
    newLetters();
    maxScore++;
  };
  yes.addEventListener('click', yesPress);

  const noPress = function() {
    if (timeLeft == 0) {
      return;
    }
    if (!check()) {
      score++;
      update(true);
    } else {
      return update(false);
    }
    newLetters();
    maxScore++;
  }

  no.addEventListener('click', noPress);

  // Feedback
  const feedback = document.getElementById("feedback");

  function createSpan(text, klass) {
    const node = document.createElement('span');
    const textnode = document.createTextNode(text);
    node.appendChild(textnode);
    node.classList.add(klass);
    return node;
  }

  function update(correct) {
    if (correct) {
      feedback.appendChild(createSpan('✓', 'green'));
    } else {
      feedback.appendChild(createSpan('✘', 'red'));
      clearInterval(intervalId);
      endGame();
    }
  }

  // New game
  const newGame = document.getElementById("newGame");
  const game = document.getElementById("game");
  const splash = document.getElementById("splash");
  const blurb = document.getElementById("blurb");

  newGame.addEventListener('click', startGame);

  function startGame() {
    score = 0;
    timeLeft = 15 + 1;
    updateTime();
    newLetters();
    feedback.innerHTML = '';

    game.classList.remove("hide");
    splash.classList.add("hide");

    intervalId = setInterval(updateTime, 1000);
  }

  function endGame() {
    const prevHighScore = localStorage.getItem('highscore');
    let newHighScore = (prevHighScore === null) || (parseInt(prevHighScore) < score);
    if (newHighScore) {
      localStorage.setItem('highscore', score);
      blurb.innerHTML = 'You answered <strong>' + score + '</strong> correctly and set a new high score!';
    } else {
      blurb.innerHTML = 'You answered <strong>' + score + '</strong> correctly.<br> High score: ' + prevHighScore;
    }
    
    newGame.textContent = 'Play Again';

    game.classList.add("hide");
    splash.classList.remove("hide");
  }
});

var alphabet = 'abcdefghijklmnopqrstuvwxyz';
var rng = function(s) {
    return function(min, max) {
        s = Math.sin(s) * 10000;
        return Math.floor((s - Math.floor(s)) * (max - min)) + min;
    };
};

var randomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

document.addEventListener("DOMContentLoaded", function(event) {
  var random = randomInt;

  // Time
  var timer = document.getElementById("timer");
  var intervalId;
  var timeLeft;

  function updateTime() {
    timeLeft--;
    timer.textContent = timeLeft;
    if (timeLeft == 0) {
      clearInterval(intervalId);
      endGame();
    }
  }

  // Game
  var before = document.getElementById("before");
  var after = document.getElementById("after");
  var score;
  var maxScore;

  function newLetters() {
    var newBefore = alphabet[random(0, alphabet.length)];
    var newAfter = alphabet[random(0, alphabet.length)];

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
  var yes = document.getElementById("yes");
  var no = document.getElementById("no");

  yes.addEventListener('click', function() {
    if (timeLeft == 0) {
      return;
    }
    if (check()) {
      score++;
      update(true);
    } else {
      update(false);
    }
    newLetters();
    maxScore++;
  });

  no.addEventListener('click', function() {
    if (timeLeft == 0) {
      return;
    }
    if (!check()) {
      score++;
      update(true);
    } else {
      update(false);
    }
    newLetters();
    maxScore++;
  });

  // Feedback
  var feedback = document.getElementById("feedback");

  function createSpan(text, klass) {
    var node = document.createElement('span');
    var textnode = document.createTextNode(text);
    node.appendChild(textnode);
    node.classList.add(klass);
    return node;
  }

  function update(correct) {
    if (correct) {
      feedback.appendChild(createSpan('✓', 'green'));
    } else {
      feedback.appendChild(createSpan('✘', 'red'));
    }

    /*feedback.classList.remove("fadeOut");
    void feedback.offsetWidth; // force redraw
    feedback.classList.add("fadeOut");*/
  }

  // New game
  var newGame = document.getElementById("newGame");
  var game = document.getElementById("game");
  var splash = document.getElementById("splash");
  var blurb = document.getElementById("blurb");

  newGame.addEventListener('click', startGame);

  function startGame() {
    maxScore = 0;
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
    var percentage = Math.round(score/maxScore * 100);
    if (percentage !== percentage) {
      percentage = 0;
    }
    blurb.innerHTML = 'You answered <strong>' + score + '</strong> out of <strong>' + maxScore + '</strong> correctly. <span class="percentage">(' + percentage + '%)</span>';
    newGame.textContent = 'Play Again';

    game.classList.add("hide");
    splash.classList.remove("hide");
  }
});

var questions;
var totalQuestions;
var numberOfQuestions = 0;
let numberOfQuestionsSpan = document.getElementById('numberOfQuestions')
numberOfQuestionsSpan.innerText = numberOfQuestions
var time = document.getElementById("t");
var spinner = document.getElementById("spinner");
var score = 0;
var mostRecentScore;
var progresSatus = document.getElementById("progressStatus");
spinner.classList.add("hidden");
var game = document.getElementById("game");


var choices = Array.from(
  document.getElementsByClassName("proposition-content")
);
var questionText = document.getElementById("questionText");

var scoreText = document.querySelector("h1 #score");
scoreText.innerText = "0";
let questionsAvailable = [];

// Saving game
var MAX_QUESTION = 10;
var all = [];
var t = 20;

getData();

var startTime = () => {
  time.innerText = `${t}s`;
  t--;
  if (t == -1) {
    t = 20;
    time.innerText = `${t}s`;
    stopTime();
    getNewQuestion();
  }
};
var stopTime = () => {
  var i;
  for (i = 0; i < all.length; i++) clearInterval(all[i]);
  all = [];
};
getNewQuestion = () => {
  if (questionsAvailable.length == 0 || MAX_QUESTION + 1 === numberOfQuestions)
    document.location.assign("end.html");
  else {
    var t = 20;
    all.push(
      setInterval(() => {
        startTime();
      }, 1000)
    );
    spinner.classList.remove("hidden");
    game.classList.add("hidden");
    setTimeout(() => {
      spinner.classList.add("hidden");
      game.classList.remove("hidden");
      numberOfQuestions++;
      numberOfQuestionsSpan.innerText = numberOfQuestions
      progresSatus.style.width = `${(numberOfQuestions / MAX_QUESTION) * 100}%`;
      var questionIndex = Math.floor(Math.random() * questionsAvailable.length);
      questionSelected = questionsAvailable[questionIndex];
      questionText.innerHTML = questionSelected.question;
      questionsAvailable.splice(questionIndex, 1);
      choices.forEach((choice) => {
        var number = choice.dataset["number"];
        choice.innerHTML = questionSelected.choices[number];
      });
    }, 500);
  }
};
choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    var clickedChoice = e.target;
    var numberClicked = clickedChoice.dataset["number"];
    var appliedClass = "incorrect";
    if (questionSelected.answer == numberClicked) {
      score++;
      localStorage.setItem("mostRecentScore", score);
      appliedClass = "correct";
    }
    scoreText.innerText = "" + score;
    clickedChoice.classList.add(appliedClass);
    t = 20;

    stopTime();
    setTimeout(() => {
      clickedChoice.classList.remove(appliedClass);
      getNewQuestion();
    }, 500);
  });
});

function getData() {
  spinner.classList.add("hidden");
  game.classList.add("hidden");

  fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then((res) => {
      return res.json();
    })
    .then((loadData) => {
      var load = [...loadData.results];
      totalQuestions = load.length;
      questions = load.map((data) => {
        var pos = Math.floor(Math.random() * data.incorrect_answers.length) - 1;
        var ch = [...data.incorrect_answers];
        ch.splice(pos, 0, data.correct_answer);
        return {
          question: data.question,
          choices: ch,
          answer: pos,
        };
      });
      startGame();
    });
}

startGame = () => {
  questionsAvailable = [...questions];
  getNewQuestion();
};

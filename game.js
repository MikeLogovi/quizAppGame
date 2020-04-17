var questions;
var totalQuestions;
var numberOfQuesions=0;
var time=document.getElementById("t");
fetch("https://opentdb.com/api.php?amount=10&type=multiple").then(res=>{
    return res.json();
}).then(loadData=>{
      var load=[...loadData.results];
      totalQuestions=load.length;
      questions=load.map((data)=>{
          var pos=Math.floor(Math.random()*data.incorrect_answers.length)-1;
          var ch=[...data.incorrect_answers]
          ch.splice(pos,0,data.correct_answer);
          return {
            question:data.question,
            choices:ch,
            answer:pos
          }
      })
      console.log(questions);
        startGame();
      
})


console.log(totalQuestions)

var score=0;
var mostRecentScore;
var progresSatus= document.getElementById("progressStatus");
/*
var questions=[
    {
       question:"What is the name of the professor in Casa de Papel?",
       choices:["Denvert","Berlin","Tokio","Sergio Markina"],
       answer:3
    },
    {
       question:"What is the capital city of Togo?",
       choices:["Alger","Lome","Accra","Paris"],
       answer:1
    },
    {
       question:"What is the name of my university?",
       choices:["Algiers1","Usthb","Umto","SetifSchool"],
       answer:0
    },
    {
        question:"What is the outpout of 2+4?",
        choices:["2","24","6","4"],
        answer:2
    }
];
*/
var spinner = document.getElementById("spinner");
var game = document.getElementById("game");
var choices=Array.from(document.getElementsByClassName('proposition-content'));
var questionText=document.getElementById('questionText');

var scoreText=document.querySelector("h1 #score");
scoreText.innerText="0";
let questionsAvailable=[];

// Saving game
var MAX_QUESTION=10;
getNewQuestion= ()=>{
    clearInterval();
    if(questionsAvailable.length==0 ||( (MAX_QUESTION+1)===numberOfQuesions))
        document.location.assign("/quizAppGame/end.html");
    else{
        var t=20;
        setInterval(()=>{
            time.innerText=`${t}s`
            t--;
            if(t==-1){
                t=20;
                time.innerText=`${t}s`
                getNewQuestion();
            }
        },1000)
        spinner.classList.remove("hidden");
        game.classList.add("hidden");
        setTimeout(()=>{
            spinner.classList.add("hidden");
            game.classList.remove("hidden");
            numberOfQuesions++;
            console.log(numberOfQuesions + " "+questionsAvailable.length+" "+progresSatus)
            progresSatus.style.width=`${(numberOfQuesions/MAX_QUESTION)*100}%`
                var questionIndex=Math.floor(Math.random()*questionsAvailable.length);
                questionSelected=questionsAvailable[questionIndex];
                questionText.innerHTML=questionSelected.question;
                questionsAvailable.splice(questionIndex,1);
                choices.forEach(choice=>{
                        var number=choice.dataset["number"];
                        choice.innerHTML=questionSelected.choices[number];
                });
            
                
            
        },500);
    }
   
   
}
choices.forEach(choice=>{
    choice.addEventListener("click",(e)=>{
        var clickedChoice=e.target;
        var numberClicked=clickedChoice.dataset["number"];
        var appliedClass="incorrect";
        if(questionSelected.answer==numberClicked){
            score++;
            localStorage.setItem("mostRecentScore",score);
            appliedClass="correct";
        }
        scoreText.innerText=""+score;
        clickedChoice.classList.add(appliedClass);
        setTimeout(()=>{
            clickedChoice.classList.remove(appliedClass);
                getNewQuestion();

        },500);
    })
})
startGame=() =>{
    spinner.classList.add("hidden");
    game.classList.add("hidden");
    questionsAvailable= [...questions];
    getNewQuestion();
}




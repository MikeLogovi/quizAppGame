var score=0;
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
var choices=Array.from(document.getElementsByClassName('proposition-content'));
var questionText=document.getElementById('questionText');

var scoreText=document.querySelector("h1 #score");
scoreText.innerText="0";
let questionsAvailable=[];
getNewQuestion= ()=>{
    console.log(questionsAvailable.length);
    if(questionsAvailable.length==0)
        document.location.assign("/end.html");
    else{
        var questionIndex=Math.floor(Math.random()*questionsAvailable.length);
        questionSelected=questionsAvailable[questionIndex];
        questionText.innerText=questionSelected.question;
        questionsAvailable.splice(questionIndex,1);
        choices.forEach(choice=>{
                var number=choice.dataset["number"];
                choice.innerText=questionSelected.choices[number];
        });
       
        
    }
   
}
choices.forEach(choice=>{
    choice.addEventListener("click",(e)=>{
        var clickedChoice=e.target;
        var numberClicked=clickedChoice.dataset["number"];
        var appliedClass="incorrect";
        if(questionSelected.answer==numberClicked){
            score++;
            appliedClass="correct";
        }
        scoreText.innerText=""+score;
        clickedChoice.classList.add(appliedClass);
        setTimeout(()=>{
            clickedChoice.classList.remove(appliedClass);
            getNewQuestion();

        },1000);
    })
})
startGame=() =>{
    questionsAvailable= [...questions];
    getNewQuestion();
}

startGame();
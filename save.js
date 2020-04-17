var save = document.getElementById("submit");
var user=document.getElementById("username");
save.disabled=true
user.addEventListener("keyup",()=>{
    save.disabled=!user.value;
});
highscores= JSON.parse(localStorage.getItem("highscores")) || []
mostRecentScore=localStorage.getItem("mostRecentScore")||0;
save.addEventListener('click',(e)=>{
    e.preventDefault();
    score={
        username:username.value,
        score:mostRecentScore
    };
    highscores.push(score);
    highscores.sort((a,b)=>b.score-a.score);
    highscores.splice(5);
    localStorage.setItem("highscores",JSON.stringify(highscores));
    document.location.assign("highscore.html");
})

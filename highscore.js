var highscores= JSON.parse(localStorage.getItem("highscores")) || []
var highest = document.getElementById("highest");
highest.innerHTML=
highscores.map((score)=>{
    return `<li>${score.username} - ${score.score}</li>`
}).join("");
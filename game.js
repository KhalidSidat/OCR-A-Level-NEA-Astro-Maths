
let spaceship = document.getElementById("Spaceship_Boost")
let spaceshipLeftAdd = 0;

document.addEventListener('keydown', move_Spaceship);


function move_Spaceship(e) {
    maxwidth = window.innerWidth - 200; // Assuming the spaceship width is 200px
    if (e.key === "ArrowLeft") {
        spaceshipLeftAdd -= 400;
        spaceship.style.position = "relative";
        spaceship.style.left = spaceshipLeftAdd + "px";
    }


    if (e.key === "ArrowRight") {
        spaceshipLeftAdd += 400
        spaceship.style.position = "relative";
        spaceship.style.left = spaceshipLeftAdd + "px";
    }
    if (spaceshipLeftAdd < 0) {
        spaceshipLeftAdd = 0; // Prevent moving left beyond the screen
    }

}


//----------------------------------Timer-------------------------------------------------------------------------//


    var counter = 0;
    var timer = setInterval(function () {
      var minutes = parseInt(counter / 60);
      var seconds = counter % 60;
      counter = counter + 1;

      var formattedTime = "Time: " + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
      document.querySelector("#timer h1").textContent = formattedTime;
    }, 1000);

//----------------------------------Projectile Movement --------------------------------------------------//

let x = 0;
let y = 0;

addEventListener("keydown", function(e){
  console.log(e.code)
})




function End_game_restartGame() {
  document.getElementById("end_game_restart").addEventListener("click", function() {window.location.href = "SurvivalGame.html";});
}
End_game_restartGame();

function End_game_quitGame() {
  document.getElementById("end_game_quit").addEventListener("click", function() {window.location.href = "index.html";});
}
End_game_quitGame();
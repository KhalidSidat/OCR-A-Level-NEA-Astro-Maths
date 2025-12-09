function Instructions(modal_ID, instructionsBtn_ID, closeButtonSelector) { //Function which will enable the instruction popup to open and close
  const modal = document.getElementById(modal_ID); 
  const instructionsBtn = document.getElementById(instructionsBtn_ID);
  const closeBtn = document.querySelector(closeButtonSelector);

    if (!closeBtn||!instructionsBtn||!modal) { // Checks if these elements exist before everything else
    console.error("modal, Instructions button, or close button not found"); // If even one of these elements arent found, this error will be returned
    return;
  }

  instructionsBtn.onclick = function() { //When the user clicks on the button, the modal/instruction contents will open
    modal.style.display = "block";
  }

  closeBtn.onclick = function() { //When the user clicks on the close button represented as 'x', the modal/instruction contents will close
    modal.style.display = "none";
  }
  //The code shown below Closes the Modal/instruction contents when clicking anywhere outside of the modal
  window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  //The code shown below will close the modal/instructions contents when the "escape" key is pressed
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });
}

Instructions("Instructions-myModal", "Instructions-myBtn", ".Instructions-close"); 

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

const SurvivalGameBtn = document.getElementById("survival-myBtn");
if (!SurvivalGameBtn) {
  console.error("Sorry, the Survival Game was not found, please refresh and try again.");
}
else {
 SurvivalGameBtn.addEventListener("click", function() {window.location.href = "SurvivalGame.html";}); 
}
if (!document.getElementById("5minutes-myBtn")) {
  console.error("Sorry, the 5 Minutes Game button was not found, please refresh and try again.");
}
else {
  document.getElementById("5minutes-myBtn").addEventListener("click", function() {window.location.href = "5MinutesGame.html";}); 
}

//-------------------------------------------------------------------------------Spaceship Movement--------------------------------------------------------------------------------------------------------------------------------------------------------//
spaceship = document.getElementById("Spaceship_Boost") //Fetched spaceship's ID from SurvivalGame.html
//Initializes both the position and speed of the spaceship from the beginning
spaceship_position = window.innerWidth/2 // Sets the position halfway of the widows width: 50vw/50%
spaceship_speed = 0
let minimum_border = 64 // Trial and Tested Minimum border to match the same distance from edges like the maximum border
let maximum_border = window.innerWidth // Sets the border at the highest point of the width

//Function used to change the position of the spaceship every single frame
function move_Spaceship() {
  spaceship_position += spaceship_speed;
//code to prevent moving pass borders
  if (spaceship_position < minimum_border) {
    spaceship_position = minimum_border 
  }
  if (spaceship_position > maximum_border) {
    spaceship_position = maximum_border

  }
  spaceship.style.left = spaceship_position + 'px'; //Used to show the movement visually to yhe yser

  requestAnimationFrame(move_Spaceship); //Calls function before the next frame
}
// Used to detect when a key is pressed which can be shown through console.log(e)
document.addEventListener('keydown', function(e) {
  if (e.code === "ArrowLeft") {
    spaceship_speed = -10 //move left 10px each frame
  }
  if (e.code === "ArrowRight") {
    spaceship_speed = 10 //move right 10px each frame
  }
    if (e.code === "KeyA") {
    spaceship_speed = -10 
  }
    if (e.code === "KeyD") {
    spaceship_speed = 10 
  }
});
// USed to detect when a key is let go or released
document.addEventListener('keyup', function(e) {
  if (e.code === "ArrowLeft") {
    spaceship_speed = 0 //Stop moving on release 
  }
    if (e.code === "ArrowRight") {
    spaceship_speed = 0
  }
    if (e.code === "KeyA") {
    spaceship_speed = 0  
  }
    if (e.code === "KeyD") {
    spaceship_speed = 0  
  }
});

move_Spaceship() 

//----------------------------------------------------------------------------Rocket Contents-----------------------------------------------------------------------------------------------------------------------------------------------------------//

const projectile = document.getElementById("projectile");
let positionY = 0;

// Get the height of the Game Bar Container
const gameBarHeight = document.querySelector(".Game_Bar_Container").offsetHeight;

const intervalId = setInterval(() => {
  positionY += 0.1; // pixels to move each step
  projectile.style.top = positionY + "px";

  // Stop the projectile if it hits the Game Bar
  if (positionY > window.innerHeight - gameBarHeight) {
    clearInterval(intervalId); // Stop the movement
    window.location.href = "GameOver.html"; // Redirect to EndGame.html
  }
}, 16); // about 60 frames per second




//Random Number Generator//
const symbols = ['*', '+', '-', '/'];

function random_equation_generator(symbols) {
  const index = Math.floor(Math.random() * symbols.length);
  let first_num = Math.floor(Math.random() * 11);
  let second_num = Math.floor(Math.random() * 11);

  if (symbols[index] === "/") {
    first_num = Math.floor(Math.random() * 11) + 1;
    second_num = Math.floor(Math.random() * 11) + 1;
  }
  
  return `${first_num} ${symbols[index]} ${second_num}`;
}


// Creates a projectile and attaches a random question
function createProjectile() {
  const projectile = document.createElement("div");
  projectile.classList.add("projectile");

  const question = document.createElement("div");
  question.classList.add("question");
  question.textContent = random_equation_generator(symbols);  // Set the random question text

  // Attach the question to the projectile
  projectile.appendChild(question);

  const container = document.getElementById("projectiles-Container");
  container.appendChild(projectile);

  let positionY = -100; // Starting position
  const speed = 10; // Speed of movement

  const intervalId = setInterval(() => {
    positionY += speed;  // Move the projectile down
    projectile.style.top = positionY + "px";  // Update position of the projectile

    question.style.top = (positionY + 50) + "px";  // Update the question's position with the projectile

    // Stop if the projectile reaches the Game Bar (bottom of screen)
    if (positionY > window.innerHeight - document.querySelector(".Game_Bar_Container").offsetHeight) {
      clearInterval(intervalId);
      projectile.remove(); // Remove the projectile and question when off screen
    }
  }, 16); // 60 FPS
}

// Call this function to generate projectiles and questions
setInterval(createProjectile, 2000); // Generate a new projectile every 2 seconds



//----------------------------------------------------------------------------Pause Game-----------------------------------------------------------------------------------------------------------------------------------------------------------//

function PAUSE(modal_ID, pauseBtn_ID, closeButtonSelector) { //Function which will enable the instruction popup to open and close
  const modal = document.getElementById(modal_ID); 
  const pauseBtn = document.getElementById(pauseBtn_ID);
  const closeBtn = document.querySelector(closeButtonSelector);

    if (!closeBtn||!pauseBtn||!modal) { // Checks if these elements exist before everything else
    console.error("modal, Instructions button, or close button not found"); // If even one of these elements arent found, this error will be returned
    return;
  }

  pauseBtn.onclick = function() { //When the user clicks on the button, the modal/instruction contents will open
    modal.style.display = "block";
  }

  closeBtn.onclick = function() { //When the user clicks on the close button represented as 'x', the modal/instruction contents will close
    modal.style.display = "none";
  }
  //The code shown below Closes the Modal/instruction contents when clicking anywhere outside of the modal
  window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
  //The code shown below will close the modal/instructions contents when the "escape" key is pressed

  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape" && modal.style.display == "block") {
      modal.style.display = "none";
    }
    else if (e.key === "Escape" && modal.style.display == "none") {
      modal.style.display = "block";
    }
  });
}

PAUSE("Pause-myModal", "Pause", ".Pause-close"); 


function quitGame() {
  document.getElementById("quit_Btn").addEventListener("click", function() {window.location.href = "index.html";});
}
quitGame();

function restartGame() {
  document.getElementById("restart_Btn").addEventListener("click", function() {window.location.href = "SurvivalGame.html";});
}
restartGame();

function resumeGame() {
  const resumeBtn = document.querySelector("#resume_Btn"); //Remember to include #
  const Pause_modal = document.getElementById("Pause-myModal");
    resumeBtn.onclick = function() {
      Pause_modal.style.display = "none";
    }
  }
resumeGame();

function Pause_Instructions() {
  Instructions("Instructions-myModal", "Instructions-myBtn", ".Instructions-close");
}
Pause_Instructions();

//----------------------------------------------------------------------------Spaceship Shoot (Rocket Postioning)-----------------------------------------------------------------------------------------------------------------------------------------------------------//

function updateRocketPosition() {
  // Get the spaceship's position and width
  const spaceshipRect = spaceship.getBoundingClientRect();
  
  // Get the rocket's width
  const rocketWidth = rocket.offsetWidth;
  
  // Center the rocket horizontally above the spaceship
  const rocketLeft = spaceshipRect.left + (spaceshipRect.width / 2) - (rocketWidth / 2);
  
  // Place the rocket just above the spaceship
  const rocketBottom = window.innerHeight - spaceshipRect.top + 10; // 10px gap if you like
  
  // Update the rocket's style
  rocket.style.left = rocketLeft + "px";
  rocket.style.bottom = rocketBottom + "px";
}

//----------------------------------------------------------------------------Endgame Button Functionality-----------------------------------------------------------------------------------------------------------------------------------------------------------//

function End_game_restartGame() {
  document.getElementById("end_game_restart").addEventListener("click", function() {window.location.href = "SurvivalGame.html";});
}
End_game_restartGame();

function End_game_quitGame() {
  document.getElementById("end_game_quit").addEventListener("click", function() {window.location.href = "index.html";});
}
End_game_quitGame();

//----------------------------------------------------------------------------Timer-----------------------------------------------------------------------------------------------------------------------------------------------------------/

//----------------------------------------------------------------------------Spawn Power-Up-----------------------------------------------------------------------------------------------------------------------------------------------------------/

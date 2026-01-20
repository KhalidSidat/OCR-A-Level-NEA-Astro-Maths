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

const projectilesContainer = document.getElementById("projectiles-Container");
const gameBarHeight = document.querySelector(".Game_Bar_Container").offsetHeight;

let projectileSpeed = 0.5; // normal speed
let projectilesData = []; // tracks all projectiles

// Move all projectiles every frame
function moveProjectiles() {
  projectilesData.forEach((data, index) => {
    data.positionY += projectileSpeed;
    data.element.style.top = data.positionY + "px";

    // Track the last Y per lane
    if (data.positionY > laneLastY[data.lane]) {
      laneLastY[data.lane] = data.positionY;
    }

    // Remove projectile if it hits the Game Bar
    if (data.positionY + data.element.offsetHeight > window.innerHeight - gameBarHeight) {
      triggerGameOver();
    }    
  });

  requestAnimationFrame(moveProjectiles);
}

moveProjectiles();

const symbols = ["*", "+", "-", "/"];

function randomEquation() {
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  let a = Math.floor(Math.random() * 11);
  let b = Math.floor(Math.random() * 11);

  if (symbol === "/") {
    a = Math.floor(Math.random() * 11) + 1;
    b = Math.floor(Math.random() * 11) + 1;
    a = a * b; // ensures whole-number division
  }

  let answer;
  switch (symbol) {
    case "*": answer = a * b; break;
    case "+": answer = a + b; break;
    case "-": answer = a - b; break;
    case "/": answer = a / b; break;
  }

  return {
    question: `${a} ${symbol} ${b}`,
    answer: answer
  };
}



const spawnY = -100; // spawn just off-screen

function spawnProjectile() {
  for (let lane = 0; lane < laneCount; lane++) {

    const laneProjectiles = projectilesData.filter(p => p.lane === lane);
    let highestY = Infinity;

    laneProjectiles.forEach(p => {
      if (p.positionY < highestY) highestY = p.positionY;
    });

    if (laneProjectiles.length === 0 || highestY > laneSpacing) {

      const equation = randomEquation();

      const projectile = document.createElement("div");
      projectile.classList.add("projectile");
      projectile.style.top = spawnY + "px";

      const img = document.createElement("img");
      img.src = "Sprites/projectile.png";

      const text = document.createElement("div");
      text.classList.add("projectile-text");
      text.textContent = equation.question;

      projectile.appendChild(img);
      projectile.appendChild(text);
      projectilesContainer.appendChild(projectile);


      const width = projectile.offsetWidth;
      projectile.style.left = (lanePositions[lane] - width / 2) + "px";

      projectilesData.push({
        element: projectile,
        positionY: spawnY,
        lane: lane,
        answer: equation.answer
      });      
    }
  }
}




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


function quitGame() { //Function to quit the game and return to the main menu
  document.getElementById("quit_Btn").addEventListener("click", function() {window.location.href = "index.html";});
}
quitGame();

function restartGame() { //Function to restart the game and return to the SurvivalGame.html
  document.getElementById("restart_Btn").addEventListener("click", function() {window.location.href = "SurvivalGame.html";});
}
restartGame();

function resumeGame() { //Function to resume the game from pause menu
  const resumeBtn = document.querySelector("#resume_Btn"); //Remember to include #
  const Pause_modal = document.getElementById("Pause-myModal");
    resumeBtn.onclick = function() {
      Pause_modal.style.display = "none";
    }
  }
resumeGame();

function Pause_Instructions() { //Function which will enable the instruction popup to open and close from the pause menu
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
  const rocketBottom = window.innerHeight - spaceshipRect.top + 10; 
  
  // Update the rocket's style
  rocket.style.left = rocketLeft + "px";
  rocket.style.bottom = rocketBottom + "px";
}

//----------------------------------------------------------------------------Endgame Button Functionality-----------------------------------------------------------------------------------------------------------------------------------------------------------//
function End_game_restartGame() {
  const btn = document.getElementById("end_game_restart");
  if (!btn) return;

  btn.addEventListener("click", function() {
    window.location.href = "SurvivalGame.html"; //changed**
  });
}
End_game_restartGame();


function End_game_quitGame() {
  const btn = document.getElementById("end_game_quit"); //changed**
  if (!btn) return;

  btn.addEventListener("click", function() {
    window.location.href = "index.html";
  });
}
End_game_quitGame();

//----------------------------------------------------------------------------Timer-----------------------------------------------------------------------------------------------------------------------------------------------------------/


//----------------------------------------------------------------------------Freeze Power-Up-----------------------------------------------------------------------------------------------------------------------------------------------------------/

const freeze = document.getElementById("Freeze_PowerUp");
const clock = document.getElementById("Clock_PowerUp");
const multiplier = document.getElementById("Multiplier_PowerUp");
let freezeActive = false;
let clockActive = false;
let multiplierActive = false;



function checkCollisionMultiplier() {
  if (!multiplier || multiplier.style.display === "none") return;

  const shipRect = spaceship.getBoundingClientRect();
  const multiplierRect = multiplier.getBoundingClientRect();
  const tolerance = 10;

  if (
    shipRect.left + tolerance < multiplierRect.right &&
    shipRect.right - tolerance > multiplierRect.left &&
    shipRect.top + tolerance < multiplierRect.bottom &&
    shipRect.bottom - tolerance > multiplierRect.top
  ) {
    activateMultiplierPowerUp();
  }
}



function checkCollision1() {
  console.log("Checking collision...");
  if (!clock || clock.style.display === "none") return;

  const shipRect = spaceship.getBoundingClientRect();
  const clockRect = clock.getBoundingClientRect(); //doc
  const tolerance = 10;

  if (
    shipRect.left + tolerance < clockRect.right &&
    shipRect.right - tolerance > clockRect.left &&
    shipRect.top + tolerance < clockRect.bottom &&
    shipRect.bottom - tolerance > clockRect.top
  ) {
    activateClockPowerUp();
  }
}




function checkCollision() {
  if (!freeze || freeze.style.display === "none") return;

  const shipRect = spaceship.getBoundingClientRect();
  const freezeRect = freeze.getBoundingClientRect(); 
  const tolerance = 10;

  if (
    shipRect.left + tolerance < freezeRect.right &&
    shipRect.right - tolerance > freezeRect.left &&
    shipRect.top + tolerance < freezeRect.bottom &&
    shipRect.bottom - tolerance > freezeRect.top
  ) {
    activateFreezePowerUp();
  }
}

function activateFreezePowerUp() {
  if (freezeActive) return;

  freezeActive = true;
  freeze.style.display = "none";

  const normalSpeed = projectileSpeed;
  projectileSpeed = 0;

  setTimeout(() => {
    projectileSpeed = normalSpeed;
    freezeActive = false;
  }, 5000);
}

function activateClockPowerUp() {
  if (clockActive) return;

  clockActive = true;
  clock.style.display = "none";

  const normalSpeed = projectileSpeed;
  projectileSpeed = normalSpeed * 0.5;

  setTimeout(() => {
    projectileSpeed = normalSpeed;
    clockActive = false;
  }, 5000);
}

function activateMultiplierPowerUp() {
  if (multiplierActive) return;

  multiplierActive = true;
  multiplier.style.display = "none";

  scoreMultiplier = 1.5;

  setTimeout(() => {
    scoreMultiplier = 1;
    multiplierActive = false;
  }, 10000); // 10 seconds
}



function powerUpLoop() {
  checkCollision();          // Freeze
  checkCollision1();         // Clock
  checkCollisionMultiplier();// Multiplier
  requestAnimationFrame(powerUpLoop);
}
powerUpLoop();


//----------------------------------------------------------------------------Shooting Functionality-----------------------------------------------------------------------------------------------------------------------------------------------------------//


const rocketsContainer = document.getElementById("rockets-container");

let rockets = [];
let rocketSpeed = 8;

function shootRocket(answer = null) {
  const rocket = document.createElement("img");
  rocket.src = "Sprites/Rocket Launcher.png";
  rocket.classList.add("rocket");

  const shipRect = spaceship.getBoundingClientRect();

  rocket.style.left = shipRect.left + shipRect.width / 2 + "px";
  rocket.style.top = shipRect.top + "px";

  rocketsContainer.appendChild(rocket);

  rockets.push({
    element: rocket,
    y: shipRect.top,
    answer: answer 
  });
}


function moveRockets() {
  rockets.forEach((rocket, index) => {
    rocket.y -= rocketSpeed;
    rocket.element.style.top = rocket.y + "px";

    if (rocket.y < -50) {
      rocket.element.remove();
      rockets.splice(index, 1);
    }
  });

  requestAnimationFrame(moveRockets);
}
moveRockets();


const answerInput = document.getElementById("answerInput");
answerInput.focus();

document.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();

    const userAnswer = answerInput.value.trim();
    if (userAnswer === "") return;

    shootRocket(Number(userAnswer)); 

    answerInput.value = "";
  }
});

document.addEventListener("click", () => {
  answerInput.focus();
});

answerInput.addEventListener("keydown", function (e) {
  if (e.code === "Space") {
    e.preventDefault();
  }
});



function isColliding(rect1, rect2, tolerance = 5) {
  return (
    rect1.left + tolerance < rect2.right &&
    rect1.right - tolerance > rect2.left &&
    rect1.top + tolerance < rect2.bottom &&
    rect1.bottom - tolerance > rect2.top
  );
}


function checkRocketProjectileCollisions() {
  rockets.forEach((rocket, rIndex) => {
    const rocketRect = rocket.element.getBoundingClientRect();

    projectilesData.forEach((proj, pIndex) => {
      const projectileRect = proj.element.getBoundingClientRect();

      if (
        isColliding(rocketRect, projectileRect, 8) &&
        rocket.answer === proj.answer
      ) {
       
        rocket.element.remove();
        rockets.splice(rIndex, 1);

        proj.element.remove();
        projectilesData.splice(pIndex, 1);

        addScore(50);
      }
    });
  });
}


function rocketCollisionLoop() {
  checkRocketProjectileCollisions();
  requestAnimationFrame(rocketCollisionLoop);
}
rocketCollisionLoop();



let score = 0;
let scoreMultiplier = 1;
const scoreDisplay = document.querySelector("#score h1");

function addScore(amount) {
  score += Math.floor(amount * scoreMultiplier);
  scoreDisplay.textContent = "Score: " + score;
}







const laneCount = 4;
const lanePositions = [];

function calculateLanes() {
  lanePositions.length = 0;

  const screenWidth = window.innerWidth;
  const spacing = screenWidth / (laneCount + 1);

  for (let i = 1; i <= laneCount; i++) {
    lanePositions.push(spacing * i);
  }
}

calculateLanes();
window.addEventListener("resize", calculateLanes);


const laneLastY = new Array(laneCount).fill(-200);
const laneSpacing = 180; // distance between projectiles vertically

setInterval(spawnProjectile, 1000);

function checkTypedAnswer(input) {
  projectilesData.forEach((proj, index) => {
    if (Number(input) === proj.answer) {
      proj.element.remove();
      projectilesData.splice(index, 1);
      addScore(50);
    }
  });
}




function getClosestProjectile() {
  if (projectilesData.length === 0) return null;

  return projectilesData.reduce((closest, current) => {
    return current.positionY > closest.positionY ? current : closest;
  });
}

const gameStartTime = Date.now();


let gameOverTriggered = false;

function triggerGameOver() {
  if (gameOverTriggered) return;
  gameOverTriggered = true;

  const gameEndTime = Date.now();
  const timeSurvived = Math.floor((gameEndTime - gameStartTime) / 1000);

  localStorage.setItem("finalScore", score);
  localStorage.setItem("timeSurvived", timeSurvived);

  window.location.href = "GameOver.html";
}


End_game_restartGame();
End_game_quitGame();


var counter = 0;
var timer = setInterval(function () {
  var minutes = parseInt(counter / 60);
  var seconds = counter % 60;
  counter = counter + 1;

  var formattedTime = "Time: " + minutes + ":" + (seconds < 10 ? "0" + seconds : seconds);
  document.querySelector("#timer h1").textContent = formattedTime;
}, 1000);


const rocketHitbox = {
  x: rocketX + 30,
  y: rocketY + 5,
  width: 40,
  height: 90
};


const projectileHitbox = {
  x: proj.x + 40,
  y: proj.y + 30,
  width: proj.width - 80,
  height: proj.height - 60
};



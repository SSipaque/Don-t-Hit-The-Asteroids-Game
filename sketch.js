// The starfield background was not made by me, it was made by Graul98 on opengameart.org (https://opengameart.org/content/star-field). All the other art was made by me.
var gameState; //For the different screens
var player;
var obstacles;
var stars;
var starsAnimation;
//var playerAnimation;
var score = 0; //This variable will be used to display the current score later.

//This is all just here to preload the images.
function preload() {
bigPlayerImage =  loadImage('Astronaut 1.png');
playerImage = loadImage('Astronaut 01.png');
//playerAnimation = loadAnimation('Astronaut 01.png', 'Astronaut 02.png', 'Astronaut 03.png', 'Astronaut 04.png');
obstaclesImage = loadImage('Asteroid.png');
starsImage = loadImage('Star 01.png');
starsAnimation = loadAnimation('Star 1.png', 'Star 4.png');
backgroundImage = loadImage("starfield.png");
}

function setup() {
  createCanvas(500,500);
  //player = createSprite(50, 50, 40, 40);
  obstacles = new Group(); //I established these as groups so certain built-in functions in p5.play.js would be applicable to them.
  stars = new Group();
  gameState = 0;
}
function draw() {
// This was put here to make it possible for there to be multiple different screens, identified by their gameState number.
  if (gameState == 0) { // Title Screen
    titleScreen();
  } else if (gameState == 1) {
    playGame(); 
  } else if (gameState == 2) {
    showGameOver();
}else if (gameState == 3) {
    showCredits();
}
}

function titleScreen (){
  //This is the Title Screen,I wanted it to remain relatively simple so I could focus more on the game mechanics and visuals.
  background("#ADD9BC");  
  textSize(32);
  text("Don't Hit The Asteroids Game", 50, 40);
  textSize(10);
  text("By: Stephannie S.", 220, 55);
  //This is a larger version of the image of the player, I thought it made the title screen seem a little less plain.
  image(bigPlayerImage, 150, 130, 200, 200);
  textSize(30);
  text("Press Spacebar to Start", 90, 400);
  //This makes it so if you press the spacebar the gameState is changed so the game can be played.
  if (keyIsPressed) {
    if (keyCode == 32) { // Spacebar's keycode (see website: keycode.info)
       gameState = 1; 
}}
}

function playGame() {
  background(255,255,255);
  image(backgroundImage, 0, 0, width, height);
  player = createSprite(mouseX, mouseY, 40, 40);
  //This allows for the image I created for the charater to be placed on top of the sprite.
  player.addImage(playerImage);
 // player.addAnimation('Astronaut 01.png', 'Astronaut 02.png', 'Astronaut 03.png', 'Astronaut 04.png');
  //image(playerImage, mouseX-20, mouseY-20, 40, 40);
  player.life = 1; //I had to make this 1 otherwise multiple players would be generated and stay on the screen causing the game to slow down and eventually crash. This makes it so only 1 character exists at a time.
  //player.debug = true;
textSize(25);
text(score, 430, 30); //This is the score in the upper right corner.
//This randomly generates the different asteroids at random widths, speeds, and rotation directions (or as they're called in the sketch, the obstacles).
  if (frameCount % 10 == 0) {
  if (int(random(6)) == 3) {
     
      var tempObstacles = createSprite(random(width), height);
      obstacles.add(tempObstacles);
      tempObstacles.draw = createObstacles;
    let rspeed = [-2, 1.5, 2];
      tempObstacles.rotationSpeed = random (rspeed);
      tempObstacles.velocity.y = random(-5, -6);
      tempObstacles.setCollider("circle"); //This is here to make it easier for the code to able to accurately tell when the obstacles overlap with the player.
      //tempObstacles.debug = true;
      tempObstacles.life = 120; //This just stops them from being drawn after a certain time period so the code doesn't slow down the longer you play.
    }}
  //This creates the stars that you collect.
   if (frameCount % 60 == 0) {
  if (int(random(6)) == 3) {
     
      var tempStars = createSprite(random(width), height);
      stars.add(tempStars);
      tempStars.draw = createStars;
    let rspeed = [-2, 1.5, 2];
      tempStars.rotationSpeed = random (rspeed);
      tempStars.velocity.y = random(-5, -6);
      tempStars.setCollider("circle", 0, 0, 15); 
      //tempStars.debug = true;
      tempStars.life = 120;
    }}
  //This makes sure that every sprite is drawn.
  drawSprites();
  //This is here to prevent the player from cheating by going off the canvas.
   player.position.x = mouseX;
  if(player.position.x>width){
  player.position.x = width;
  }else{
    player.position.x = mouseX;
  }
  player.position.y = mouseY;
  player.setCollider("rectangle", 0, 0, 35, 40);//This has the same function as the one established for the obstacles or the stars, but this one is more specific.
  //player.debug = true;
  //If the player's collider touches the star's collider then the star will be "collected" (removed) and 1 will be added to the score.
  player.overlap(stars, collect)
   if(player.overlap(obstacles)){ //If the player's collider touches the obstacles' colliders then the player will be removed.
    player.remove();
    gameState = 2;//This takes you to the game over screen.
   }
 } 

function showGameOver(){
  //This is the game over screen.
   background("#ADD9BC"); 
 let phrases = ["Better Luck Next Time :(", "Try Again?","Dang, It's Alright", "Thanks For Playing!"];
  fill(50);
  textSize(32);
  text("Thanks For Playing!", 100, 50);
   textSize(50);
  //This displays the final score from the pervious game on screen.
  text(score, width/2, 200);
  textSize(30);
  text("Press Spacebar to Restart", 90, 400);
  //Pressing the spacebar will restart the game.
  if (keyIsPressed) {
    if (keyCode == 32) { // Spacebar's keycode (see website: keycode.info)
       score = 0;
       gameState = 1;
} }
     textSize(30);
  text("Press Shift for the Credits", 90, 450);
    if (keyCode == 16) { // Shift's keycode (see website: keycode.info)
       score = 0;
       gameState = 3;

  }

}
function showCredits (){
  //This is the Credit Screen.
  background("#ADD9BC");  
  textSize(30);
  text("Credits", 20, 40);
  textSize(18);
  text("Stephannie S. (For art and code)", 20, 65);
  text("Joshua Fishburn (For some code)", 20, 80);
  text("Graul98 on opengameart.org (For the space background)", 20, 95);
  image(bigPlayerImage, 150, 230, 200, 200);
  textSize(30);
  text("Press Spacebar to Restart", 90, 450);
  //This makes it so if you press the spacebar the gameState is changed so the game can be played again.
  if (keyIsPressed) {
    if (keyCode == 32) { // Spacebar's keycode (see website: keycode.info)
       gameState = 1; 
}}
}
//This is a custom function to create the obstacles/asteroids, I used an image I made for them.
function createObstacles(x, y, r) {
  noStroke();
  //fill("orange");
  //ellipse(0, 0, 100);
  image(obstaclesImage, 0, 0, 100, 100);
}
//This is a custom function to create the stars and add the animation to them.
function createStars(x, y, r) {
  //noStroke();
  //fill("yellow");
 // ellipse(0, 0, 30);
   image(starsImage, 0, 0, 30, 30);
   image.rotationSpeed = 0.5;
  animation(starsAnimation, 0, 0, 10, 10);
   
}
 //This is a custom function I made which removes the star and adds one to the score when the player overlaps with the star.
function collect(player, stars){
   score += 1;
   stars.remove();
}

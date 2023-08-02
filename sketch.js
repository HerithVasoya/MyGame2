var gameState;
var database;
//creates ground
var ground;
var upperGround;
//creates players, properties and starts game
var form, player, playerCount;
var playerImg;
var chr;
var game;
var lives1Img, lives2Img, lives3Img;
var hitbox;
var x, y;

function preload() {
  lives1Img = loadImage("./assets/lives.png");
  lives2Img = loadImage("./assets/lives2.png");
  lives3Img = loadImage("./assets/lives3.png");

  playerImg = loadImage("./assets/squareCharacter.png");
}

function setup() {
  createCanvas(800,400);

  database = firebase.database();

  ground = new Ground(400, 325, 800, 150);
  upperGround = new Ground(400, 265, 800, 30);
  
  game = new Game();
  game.start();

  hitbox = createSprite(x, y - 2, 50, 50);
}

function draw() {
  background(173, 216, 230);  
  drawSprites();
  
  ground.display(rgb(54, 34, 4));
  upperGround.display(rgb(19, 80, 0));

  if (gameState === 1) {
    game.play();
  }

  if (gameState === 2) {
    game.end();
  }

  if (gameState === 3) {
    game.congratulate();
  }

  hitbox.x = x;
  hitbox.y = y - 2;
  hitbox.visible = false;
}
class Game {
    constructor() {
      this.resetTitle = createElement("h2");
      this.resetButton = createButton("");
      
      this.playerMoving = false;
      this.jump = true
    }
  
    getState() {
      var gameStateRef = database.ref("gameState");
      gameStateRef.on("value", function(data) {
        gameState = data.val();
      });
    }
    
    update(state) {
      database.ref("/").update({
        gameState: state
      });
    }
  
    start() {
      player = new Player();
      playerCount = player.getCount();
  
      form = new Form();
      form.display();

      //creates playerImg
      chr = createSprite(50, 400, 50, 50);
      chr.addImage("player", playerImg);
    }
  
    handleElements() {
      form.hide();
      form.titleImg.position(40, 50);
      form.titleImg.class("gameTitleAfterEffect");

      this.resetTitle.html("Reset Game");
      this.resetTitle.class("resetText");
      this.resetTitle.position(width / 2 + 200, 40);
  
      this.resetButton.class("resetButton");
      this.resetButton.position(width / 2 + 230, 100);
    }
  
    play() {
      this.handleElements();
      this.handleResetButton();
  
      Player.getPlayersInfo();
  
      if (allPlayers !== undefined) {
        this.showLife();
  
        //index of the array
        var index = 0;
        for (var plr in allPlayers) {
          //add 1 to the index for every loop
          index = index + 1;
  
          //use data form the database to display the cars in x and y direction
          var x = allPlayers[plr].positionX;
          var y = height - allPlayers[plr].positionY;
  
          var currentlife = allPlayers[plr].life;
  
          /*if (currentlife <= 0) {
            
          }*/
  
          //cars[index - 1].position.x = x;
          //cars[index - 1].position.y = y;
  
          if (index === player.index) {
            stroke(10);
            fill("red");
            ellipse(x, y, 60, 60);
  
            if (player.life <= 0) {
              this.playerMoving = false;
            }
  
            // Changing level and spawn position
            if (player.x > 800) {
                level += 1
            }
          }
        }
  
        if (this.playerMoving) {
          player.update();
        }
  
        // handling keyboard events
        this.handlePlayerControls();
  
        if (player.level > 10) {
          gameState = 3;
          player.rank += 1;
          Player.updateCarsAtEnd(player.rank);
          player.update();
          this.showRank();
        }
  
        drawSprites();
      }
    }
  
    handleResetButton() {
      this.resetButton.mousePressed(() => {
        database.ref("/").set({
          playerCount: 0,
          gameState: 0,
          players: {},
        });
        window.location.reload();
      });
    }
  
    showLife() {
      if (player.lives === 3) {
        image(lives3Img, 30, 30, 50, 50);
      } else if (player.lives === 2) {
        image(lives2Img, 30, 30, 50, 50);
      } else if (player.lives === 1) {
        image(lives1Img, 30, 30, 50, 50);
      }
    }
  
    handlePlayerControls() {
      if (player.lives > 0) {
        if (keyIsDown(UP_ARROW) && this.jump) {
          this.playerMoving = true;
          player.positionY += 10;
          player.update();
        }
  
        if (keyIsDown(LEFT_ARROW)) {
          player.positionX -= 5;
          player.update();
        }
  
        if (keyIsDown(RIGHT_ARROW)) {
          player.positionX += 5;
          player.update();
        }
      }
    } 
  
    end() {
      console.log("Game Over");
    }

    congratulate() {
        text("Congratulations for winning </br> Hope you've had fun and thanks for playing", 400, 200);
    }

    canJump() {
      this.jump = true;
    }

    cannotJump() {
      this.jump = false;
    }
  }
  
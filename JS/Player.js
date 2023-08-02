class Player {
    constructor() {
      this.name = null;
      this.index = null;
      this.positionX = 0;
      this.positionY = 0;
      this.level = 1
      this.lives = 3;
    }
  
    addPlayer() {
      var playerIndex = "players/player" + this.index;
  
      this.positionX = 50;
      this.positionY = 400;
  
      database.ref(playerIndex).set({
        name: this.name,
        positionX: this.positionX,
        positionY: this.positionY,
      });
    }
  
    getCount() {
      var playerCountRef = database.ref("playerCount");
      playerCountRef.on("value", data => {
        playerCount = data.val();
      });
    }
  
    updateCount(count) {
      database.ref("/").update({
        playerCount: count
      });
    }
  
    update() {
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).update({
        positionX: this.positionX,
        positionY: this.positionY,
        lives: this.lives
      });
      x = player.x;
      y = player.y;
    }
  
    static getPlayersInfo() {
      var playerInfoRef = database.ref("players");
      playerInfoRef.on("value", data => {
        allPlayers = data.val();
      });
    }
  }
var Events = {
  eventsMax: 100,
  allowCop: false,

  randomEvent: function(){
    var which = Math.floor(Math.random() * Events.eventsMax);

    if (which > 98){
      Events.cop();
    }
  },

  cop: function(){
    if (!Events.allowCop){
      // cops need to be activated by selling an illegal plant
      return;
    }
    if ($("#cop").length > 0){
      // don't add a new cop if there is already one on screen
      return;
    }

    var entry = Math.floor(Math.random() * 500) + 100;
    function Cop(){
      game.playground
        .addSprite("cop", {animation: animations.cop.anim,
          width: animations.cop.width, height: animations.cop.height,
          posx: 0, posy: entry});
      this.elem = $("#cop");
      this.state = "initialize";
      this.visitedPlots = [];
    }

    Cop.prototype.think = Events.copThink;

    game.addThinker(new Cop(), 0, entry);
  },

  copThink: function(){
    // TODO: Cop behaviour:
    // Cop goes and looks at each plot in turn for illegal plants.
    // If one is found it is taken and the cop gives a fine.
    if (this.state == "initialize"){
      // just grab the first plot
      for (var i in game.plots){
        if (i.match(/plot/)){
          this.targetPlot = game.plots[i];
          break;
        }
      }
      this.state = "movingToPlot";
    }else if (this.state == "movingToPlot"){
      // if (near plot){
        // this.state = "checkingPlot";
      // }else{
        // TODO: Pull out moving information from farmer into a function and load it in as a mixin
        // move closer
      // }
    }else if (this.state == "checkingPlot"){
      if (this.targetPlot.contains.illegal){
        game.farmer.addMoney(this.targetPlot.contains.value * 2);
        this.targetPlot.removePlant();
      }
      this.visitedPlots.push(this.targetPlot);
      this.targetPlot = null;
      this.state = "lookingForPlot";
    }else if (this.state == "lookingForPlot"){
      // if (no more plots to check){
        // leave
      // }else{
        // search for an unvisited plot
      // }
    }
  }
}

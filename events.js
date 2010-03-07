/**
 * Copyright (C) 2010 Rob Britton

 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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

function Shop(){
}

Shop.prototype.sell = function(obj){
  if (obj.illegal){
    Events.allowCop = true;
  }
  game.farmer.addMoney(obj.value);
}


// Creates the target
var target = {
    name: "name",
    health: 100,
    equipment: []
}

// Creates the object to later become an item
var Obj = function(name, modifier, description){
    this.name = name;
    this.modifier = modifier;
    this.description = description;
}

// Creates the items to be added to the target
var items = {
    shield:new Obj("Shield",1,"I'm pretty sure this is a pot lid..."),
    potion:new Obj("Potion",2,"Tastes like watered down orange Gatorade..."),
    sword:new Obj("Sword",2,"It's a sword. Don't touch the pointy end.")
}

// Grabs the 'Health' label from HTML
var hp = document.getElementById("health");
// Grabs the 'Hits Taken' label from HTML
var round = document.getElementById("counter");
// Aggregate modifier if items are applied to target
var totalMod = 1;
// 'Hits Taken' counter
var hits = 0;

// If user clicks on 'Shield', 'Potion', or 'Sword', this adds the items
// to the equipment array
function giveItem(loot){
    // debugger
    target.equipment.push(items[loot]);
}

// This function aggregates modifiers from target's equipment array, if any
function addMods(){
    var total = 0;
    for (let i = 0; i < target.equipment.length; i++) {
        var item = target.equipment[i];
        total += item.modifier;
    }
    if (total != 0) {
        totalMod = total;
    }
}

// This function subtracts damage from target's health
function attack(dmg) {
    addMods();
    target.health -= dmg * totalMod;
    hits++;
    update(target.health.toFixed(2));
}

// Update function to update 'Health' and 'Hits Taken'
function update(health) {
    if (target.health <= 0) {
        health = 0;
    }

    hp.textContent = health;
    round.textContent = hits;
}

// Reset the bad guy to initial properties NEEDS WORK!
function reset() {
    target.health = 100;
    hits = 0;
    update(100);
}

// Allows for tooltips to appear above shield, potion, and sword.
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
});
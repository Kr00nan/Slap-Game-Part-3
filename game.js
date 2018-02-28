

// GAME CONTROLLER /////////////////////////

function GameController() {
    var gameService = new GameService();

    this.attack = function(type) {
        gameService.attack(type);
        gameService.update();
    } 
}

// GAME SERVICE ////////////////////////////

function GameService() {
    // var dataStore = this;
    var target = new target("Scarecrow", 100, 1, 5, 10);

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

    // Update function to update 'Health' and 'Hits Taken'
    function update() {

    }

    // Reset the bad guy to initial properties!
    function reset() {
        target.health = 100;
        hits = 0;
        update();
    }

    // Opponent constructor
    function Target(name, health, slap, punch, kick) {
        this.name = name;
        this.health = health;
        this.attacks = {
            "slap": slap,
            "punch": punch,
            "kick": kick
        };
        this.items = [];
        this.hits = 0;
    }

    // Item constructor
    function Item(name, modifier, description) {
        this.name = name;
        this.modifier = modifier;
        this.description = description;
    }

    // Creates the items
    var items = {
        shield:new Item("Shield",1,"I'm pretty sure this is a pot lid..."),
        potion:new Item("Potion",2,"Tastes like watered down orange Gatorade..."),
        sword:new Item("Sword",2,"It's a sword. Don't touch the pointy end.")
    }

    // Applies damage to opponents health
    // Increases hit counter
    this.attack = function(type) {
        target.health -= target.attacks[type] * this.addMods();
        target.hits += 1;
    }

    // Adds any modifiers from items being used
    // Currently set to 1, so this function needs work
    this.addMods = function() {
        return 1;
    }

    this.update = function() {
        var targetCopy = target;

        if (targetCopy.health <= 0) {
            targetCopy.health = 0;
        }

        hp.textContent = targetCopy.health.toFixed(2);
        round.textContent = targetCopy.hits;
    }

}
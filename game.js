

// ENTRY POINT //////////////////////////////

var app = {
    gameController: new GameController()
}


// GAME CONTROLLER /////////////////////////

function GameController() {

    var gameService = new GameService();

    // Grabs the 'Name' label from the DOM
    var tarName = document.getElementById('name');
    // Grabs the 'Health' label from DOM
    var tarHealth = document.getElementById('health');
    // Grabs the 'Hits Taken' label from DOM
    var tarHits = document.getElementById('counter');

    this.attack = function(type) {
        gameService.attack(type);
        this.update();
    }

    this.giveItem = function(item) {
        gameService.giveItem(item);
    }

    this.update = function() {
        var targetCopy = gameService.getTarget();

        if (targetCopy.health <= 0) {
            targetCopy.health = 0;
        }

        tarName.textContent = targetCopy.name;
        tarHealth.textContent = targetCopy.health.toFixed(2);
        tarHits.textContent = targetCopy.hits;
    }

    this.reset = function() {
        gameService.reset();
        this.update();
    }
}

// GAME SERVICE ////////////////////////////

function GameService() {

    var target = new Target("Scarecrow", 100, 1, 5, 10);
    var defaultMod = 1;

    // Opponent constructor
    function Target(name, health, slap, punch, kick) {
        this.name = name;
        this.health = health;
        this.attacks = {
            "slap": slap,
            "punch": punch,
            "kick": kick
        };
        this.hits = 0;
    }

    // Item constructor
    function Item(name, modifier, description, equipped) {
        this.name = name;
        this.modifier = modifier;
        this.description = description;
        this.equipped = equipped;
    }

    // Creates the items
    var belt = {
        shield:new Item("Shield",1,"I'm pretty sure this is a pot lid...", false),
        potion:new Item("Potion",2,"Tastes like watered down blue Gatorade...", false),
        sword:new Item("Sword",2,"It's a sword. Don't touch the pointy end.", false)
    }

    // Applies damage to opponents health; increases hit counter
    this.attack = function(type) {
        target.health -= target.attacks[type] * this.addMods();
        target.hits += 1;
    }

    this.giveItem = function(item) {
        belt[item].equipped = true;
    }

    // Adds any modifiers from items being used
    // Currently set to 1, so this function needs work
    this.addMods = function() {
        if (belt['sword'].equipped) {
            return belt['sword'].modifier;
        } else {
            return defaultMod;
        }
    };

    this.getTarget = function() {
        var targetCopy = {
            name: target.name,
            health: target.health,
            hits: target.hits
        };

        return targetCopy;
    };

    this.reset = function() {
        target = new Target("Scarecrow", 100, 1, 5, 10);
        belt['sword'].equipped = false;
    }

}

app.gameController.reset();
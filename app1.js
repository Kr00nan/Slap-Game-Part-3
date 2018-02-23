var cat1 = {
    name: 'Fluffy',
    happiness: 10,
    img: 'url'
}

var cat2 = {
    name: 'Nick Cat',
    happiness: 5,
    img: 'url'
}

var cats = [];
cats.push(cat1, cat2);

function drawCat() {
    var catsElem = document.getElementById('cat');
    var template = '';

    for (let i = 0; i < array.length; i++) {
        var cat = cats[i];
    template += `
    <h1>${cat.name}</h1>
    <img src='${cat.img}' style="height: 100px">
    <p>Happiness: ${cat.happiness}</p>
    <button onclick="pet(${i})">Pet</button>
    `   
    }
    catsElem.innerHTML = template;
}

function pet(i) {
    var cat =cats[i]
    cat.happiness--
    if(cat.happiness <= 0) {
        cat.happiness = 0;
    }
    drawCat();
}

drawCat();
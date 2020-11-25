var username = prompt("What is your name?");
var gameCanvas = document.getElementById('game');
var player = document.getElementById('sprite');
var bullet_container = document.getElementById('bullet-container');
var asteroid_container = document.getElementById('asteroid-container');
var heart_container = document.getElementById('hearts');
var hearts = Array.from(document.querySelectorAll('.heart'));
var scoreText = document.getElementById('score');
var levelText = document.getElementById('level');
var highScoreText = document.getElementById('highScore');
var introText = document.getElementById('intro');

var highScore = 0;
var score = 0;
var level = 0;
var healthpoints = hearts.length;

var pause = true;

var ennemies = [];
var bullets = [];

var lastTimeRender = 0;
var lastTimeShot = 0;
var lastTimeasteroid  = 0;

let ArrowDown = false;
let ArrowUp = false;
let ArrowLeft = false;
let ArrowRight = false;
let SpaceBar = false;

var playerr = {
    x: 100,
    y: 100,
    centerX: 150,
    centerY: 150
}
var gameSettings = {
    playerSpeed     : 12,
    bulletSpeed     : 13,
    asteroidSpeed     : 4,
    spawnRate       : 2
}

window.addEventListener('keydown', function(key) {
    if (key.defaultPrevented) {
        return;
    }
    switch (key.key) {
        case "ArrowDown":
            ArrowDown = true;
            break;
        case "ArrowUp":
            ArrowUp = true;
            break;
        case "ArrowLeft":
            ArrowLeft = true;
            break;
        case "ArrowRight":
            ArrowRight = true;
            break;
        case " ":
            SpaceBar = true;
            break;
        case "p":
            if (!pause) {
                pause = true;
            } else {
                pause = false;
            }
            break;
        default:
            return;
    }

    if (key.key != 'p' && pause) {
        pause = false;
        lastTimeShot = -1000;
        lastTimeasteroid = -1000;
    }

    event.preventDefault();
}, true);

window.addEventListener('keyup', function(keyy) {
    if (keyy.defaultPrevented) {
        return;
    }
    switch (keyy.key) {
        case "ArrowDown":
            ArrowDown = false;
            break;
        case "ArrowUp":
            ArrowUp = false;
            break;
        case "ArrowLeft":
            ArrowLeft = false;
            break;
        case "ArrowRight":
            ArrowRight = false;
            break;
        case " ":
            SpaceBar = false;
            break;
        default:
            return;
    }

    event.preventDefault();
}, true);

pause = true;
function main_loop(currentTime) {
    window.requestAnimationFrame(main_loop);
    const secondsSinceLastRender = (currentTime - lastTimeRender) / 1000;
    if (secondsSinceLastRender < 1/100 || pause) {return;}
    /* -------------------------- */
    introText.style.display = 'none';
    scoreText.innerHTML = 'Score : ' + String(score);
    highScoreText.innerHTML = 'High Score : ' + String(highScore);
    levelText.innerHTML = 'Level : ' + String(level);

    //make the bullets go forward
    for (const bullet of bullets) {
        bullet.update();
    }
    for (const e of ennemies) {
        e.update();
    }


    // Shooting event
    if (SpaceBar) {
        if ((currentTime - lastTimeShot)/1000 >= 0.3) {
            let newBull = new Bullet(bullet_container, player.offsetLeft, player.offsetTop);
            lastTimeShot = currentTime;
        }
    }

    // just so that it does not become unplayable
    let levell = level;
    if (level > 13) {
        levell = 13;
    }
    if ((currentTime - lastTimeasteroid)/1000 > 2 - 0.05*levell*gameSettings.spawnRate) {
        let newasteroid = new asteroid(asteroid_container, gameCanvas.offsetWidth, randInt(0-asteroid_container.offsetTop, Math.floor(gameCanvas.offsetHeight-player.offsetHeight)));
        lastTimeasteroid = currentTime;
    }

    //player movement
    if (ArrowDown) {
        move(0, 1);
    }
    if (ArrowUp) {
        move(0, -1);
    }
    if (ArrowLeft) {
        move(-1, 0);
    }
    if (ArrowRight) {
        move(1, 0);
    }
    playerr.centerX = player.offsetLeft + player.offsetWidth/2;
    playerr.centerY = player.offsetTop + player.offsetHeight/2;

    /* -------------------------- */
    lastTimeRender = currentTime;
}
window.requestAnimationFrame(main_loop);

function collideWorldBounds(obj, w, h) {
    if (obj.x + player.width > w) {
        player.style.left = String(w - player.width) + 'px';
        obj.x = w - player.width;
    }
    if (obj.x < 0) {
        player.style.left = '0px';
        obj.x = 0;
    }
    if (obj.y + player.height > h) {
        player.style.top = String(h - player.height) + 'px';
        obj.y = h - player.height ;
    }
    if (obj.y < 0) {
        player.style.top = '0px';
        obj.y = 0;
    }
}

function getCoords(element) {
    for (var lx=0, ly=0; 
        element != null; 
        lx += element.offsetLeft, ly += element.offsetTop, element = element.offsetParent);
    return {x: lx, y: ly};
}

class Bullet {
    constructor(scene, x, y) {
        this.x = x + player.offsetWidth + 4;
        this.y = y + player.offsetHeight/2 - 4;
        this.scene = scene;

        this.bullet = document.createElement('div');
        this.bullet.className = "bullet";
        this.bullet.style.left = String(this.x) + 'px';
        this.bullet.style.top = String(this.y) + 'px';

        this.scene.appendChild(this.bullet);
        bullets.push(this);

        this.centerY = this.y + this.bullet.offsetHeight/2;
        this.centerX = this.x + this.bullet.offsetWidth/2;
    }

    update() {
        this.x += gameSettings.bulletSpeed;
        this.centerX = this.x + this.bullet.offsetWidth/2;
        this.bullet.style.left = String(this.x) +'px';
        if (this.x + this.bullet.offsetWidth >= getCoords(this.scene).x + this.scene.offsetWidth) {
            this.destroy();
        }
    }

    destroy() {
        bullets.splice(bullets.indexOf(this), 1);
        this.bullet.remove();
    }
}

class asteroid {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.speed = randInt(1, gameSettings.asteroidSpeed+1);

        this.image = document.createElement('img');
        this.image.src = '../images/asteroid.png';
        this.image.className = 'asteroid';
        this.image.style.left = String(this.x) + 'px';
        this.image.style.top = String(this.y) + 'px';

        ennemies.push(this);
        this.scene.appendChild(this.image);

        this.centerX = this.x + this.image.offsetWidth/2;
        this.centerY = this.y + this.image.offsetHeight/2;
    }

    update() {
        this.x -= this.speed;
        this.centerX = this.x + this.image.offsetWidth/2;
        this.image.style.left = String(this.x) + 'px';
        if (this.x + this.image.offsetWidth < 0) {
            this.destroy();
            playerHurt();
        }
        for (const bull of bullets) {
            if (Math.sqrt((this.centerX-bull.centerX)**2 + (this.centerY-bull.centerY)**2)<50) {
                this.destroy();
                bull.destroy();
                scoreUp();
            }
        }
        if (Math.sqrt((this.centerX-playerr.centerX)**2 + (this.centerY-playerr.centerY)**2)<100) {
            this.destroy();
            playerHurt();
        }
    }

    destroy() {
        ennemies.splice(ennemies.indexOf(this), 1);
        this.image.remove();
    }
}

function move(mx, my) {
    playerr.x += mx * gameSettings.playerSpeed;
    playerr.y += my * gameSettings.playerSpeed;
    player.style.left = String(playerr.x) + 'px';
    player.style.top = String(playerr.y) + 'px';
    collideWorldBounds(playerr, 960, 540);
}

function randInt(min, max) {
    let a = max-min+1;
    return Math.floor(Math.random()*a)+min;
}

function scoreUp() {
    score += 16;
    if (score > highScore) {
        highScore = score;
    }
    if (Math.floor(score/100)>=level+1) {
        level+=1;
        if (level>13) {
            gameSettings.asteroidSpeed += 0.3;
        }
    }
}

function removeHeart() {
    hearts[0].remove();
    hearts.splice(0, 1);
}

function addHeart(qt) {
    for (var i=0; i<qt; i++) {
        let newElement = document.createElement('img');
        newElement.src = 'lives.png';
        newElement.className = 'heart';
        heart_container.appendChild(newElement);
        hearts.push(newElement);
    }
}

function playerHurt() {
    healthpoints -= 1;
    // don't have one HP
    if (healthpoints) {
        removeHeart();
    } else {
        alert ("Good try , " + username + ". Your score is " + score + ". Your high score is " + highScore)
        score = 0;
        level = 0;
        removeHeart();
        addHeart(3)
        healthpoints = 3;
        pause = true;
        introText.style.display = 'initial';
    }

    // go back to middle
    playerr.x = 150;
    player.style.left = String(playerr.x) + 'px';
    playerr.y = 200;
    player.style.top = String(playerr.y) + 'px';
    
    // kill monsters (twice bc sometimes it didn't work)
    for (const monster of ennemies) {
        monster.destroy();
    }
    while (ennemies.length != 0) {
        for (const monster of ennemies) {
            monster.destroy();
        }
    }
    // kill bullets
    for (const b of bullets) {
        b.destroy();
    }
}


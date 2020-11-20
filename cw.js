var username = prompt("What is your name?");
var gameCanvas = document.getElementById('game');
var player = document.getElementById('sprite');
var bullet_container = document.getElementById('bullet-container');
var ennemy_container = document.getElementById('enemy-container');
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

var enemies = [];
var bullets = [];

var lastTimeRender = 0;
var lastTimeShot = 0;
var lastTimeEnemy  = 0;

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
    enemySpeed     : 4,
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
        lastTimeEnemy = -1000;
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
    if ((currentTime - lastTimeEnemy)/1000 > 2 - 0.05*levell*gameSettings.spawnRate) {
        let newEnemy = new Enemy(enemy_container, gameCanvas.offsetWidth, randInt(0-enemy_container.offsetTop, Math.floor(gameCanvas.offsetHeight-player.offsetHeight)));
        lastTimeEnemy = currentTime;
    }
}
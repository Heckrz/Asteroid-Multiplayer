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
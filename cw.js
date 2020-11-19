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
import '../styles/index.scss';

const playerMaxSpeed = 4;
const playerMinSpeed = 1;
const playerInitSize = 20;
const playerMinSize = 5;

const createEnemyEachMS = 4000;
const createFoodEachMS = 1000;

const enemyInitSize = 30;
const enemyFoodSize = 5;
const enemyMaxSize = 90;
const enemyMinSpeed = 1;
const enemyMaxSpeed = 2;

let gameStartTime = 0;
let score = 0;
let paused = false;

let player = {
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  size: playerInitSize,
  speed: playerMaxSpeed,
};
let mouseX = 0;
let mouseY = 0;

let enemies = [];
let food = [];


function start() {
  console.log('game started');
  gameStartTime = Date.now();

  const scoreElem = document.getElementById('score');
  const bestElem = document.getElementById('best');
  const timeElem = document.getElementById('time');
  const canvasElem = document.getElementById('canvas');

  canvasElem.width = window.innerWidth;
  canvasElem.height = window.innerHeight;
  const ctx = canvasElem.getContext('2d');

  // get record
  const bestScore = parseInt(localStorage.getItem('best-score'));
  bestElem.innerHTML = `Record: ${bestScore || 0}`;

  // logic
  function moveToTarget(entity, x, y, range) {
    const distance = Math.sqrt(
      Math.pow((entity.x - x), 2) +
      Math.pow((entity.y - y), 2)
    );

    if (distance > range) {
      return false;
    }

    const dx = Math.abs(entity.x - x);
    const dy = Math.abs(entity.y - y);

    let velX = dx * entity.speed / distance;
    let velY = dy * entity.speed / distance;

    if (x < entity.x) {
      velX *= -1;
    }
    if (y < entity.y) {
      velY *= -1;
    }

    entity.x += velX;
    entity.y += velY;

    return true;
  }

  function checkEat(entityA, entityB) {
    const deltaSize = entityA.size / 2 + entityB.size / 2;
    return Math.abs(entityA.x - entityB.x) <= deltaSize && Math.abs(entityA.y - entityB.y) <= deltaSize;
  }

  // game
  function gameOver() {
    gameStartTime = Date.now();
    score = 0;
    paused = true;
    showInfo('You dead! Click to continue');
  }

  function showInfo(str) {
    const infoElem = document.createElement('div');
    infoElem.style.position = 'absolute';
    infoElem.style.left = `${window.innerWidth / 2 - 200}px`;
    infoElem.style.top = `${window.innerHeight / 2 - 50}px`;
    infoElem.style.width = '400px';
    infoElem.style.height = '100px';
    infoElem.style.fontFamily = 'Quicksand';
    infoElem.style.fontSize = '20px';
    infoElem.style.backgroundColor = 'black';
    infoElem.style.color = 'yellow';
    infoElem.style.display = 'flex';
    infoElem.style.alignItems = 'center';
    infoElem.style.justifyContent = 'center';
    infoElem.style.textAlign = 'center';
    infoElem.innerHTML = str;

    document.body.appendChild(infoElem);
    document.addEventListener('click', () => {
      document.body.removeChild(infoElem);
      document.removeEventListener('click', this);
      window.location.reload(false);
    })
  }

  // update
  function updateTime() {
    const time = Date.now() - gameStartTime;
    const d = new Date(time);
    timeElem.innerHTML = `Game time: ${d.getMinutes()}:${d.getSeconds()}`;
  }

  function updateScore() {
    const time = Date.now() - gameStartTime;
    const d = new Date(time);
    const timeScore = (d.getMinutes() + 1) * (d.getSeconds() + 1) * 10;
    score = Math.floor((player.size - playerMinSize) * 10 + timeScore);
    scoreElem.innerHTML = `Score: ${score}`;

    const bestScore = parseInt(localStorage.getItem('best-score')) || 0;
    if (score > bestScore) {
      localStorage.setItem('best-score', `${score}`);
      bestElem.innerHTML = `Record: ${bestScore || 0}`;
    }
  }

  function updateEnemies() {
    for (let i = 0; i < enemies.length; i += 1) {
      const moveToPlayer = moveToTarget(enemies[i], player.x, player.y, 300);
      enemies[i].angry = moveToPlayer;

      if (!moveToPlayer) {
        const rx = Math.random() * canvasElem.width;
        const ry = Math.random() * canvasElem.height;
        moveToTarget(enemies[i], rx, ry, Infinity);
      } else if (checkEat(enemies[i], player)) {
        if (enemies[i].size + enemyFoodSize < enemyMaxSize) {
          enemies[i].size += enemyFoodSize;
          enemies[i].speed -= 0.1;
          if (enemies[i].speed < enemyMinSpeed) {
            enemies[i].speed = enemyMinSpeed;
          }
        }
        player.size -= enemyFoodSize;
        if (player.size < playerMinSize) {
          player.size = playerMinSize;
          gameOver();
        }
      }
    }
  }

  function updatePlayer() {
    moveToTarget(player, mouseX, mouseY);
    // reduce speed
    player.speed -= 0.01;
    if (player.speed < playerMinSpeed) {
      player.speed = playerMinSpeed;
    }
    // check if eat
    const foodToDelete = [];
    food.forEach((food, index) => {
      if (checkEat(player, food)) {
        foodToDelete.push(index);
      }
    });
    foodToDelete.forEach((index) => {
      const foods = food.splice(index, 1);
      player.size += foods[0].size;
      player.speed = playerMaxSpeed;
    });
  }

  function drawPlayer() {
    ctx.beginPath();
    ctx.fillStyle = '#29983B';
    ctx.fillRect(player.x - player.size / 2, player.y - player.size / 2, player.size, player.size);
    const fullOpacity = (player.speed - 1) / 4;
    ctx.fillStyle = `rgba(0,255,255,${fullOpacity})`;
    ctx.fillRect(player.x - player.size / 4, player.y - player.size / 4, player.size / 2, player.size / 2);
    ctx.closePath();
    ctx.stroke();
  }

  function drawEnemies() {
    ctx.beginPath();
    enemies.forEach(({ x, y, size, angry }) => {
      ctx.fillStyle = angry ? '#E14B4B' : '#8B1313';
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    });
    ctx.closePath();
    ctx.stroke();
  }

  function drawFood() {
    ctx.beginPath();
    food.forEach(({ x, y, size }) => {
      ctx.fillStyle = 'green';
      ctx.fillRect(x - size / 2, y - size / 2, size, size);
    });
    ctx.closePath();
    ctx.stroke();
  }

  function randomCreateEnemy() {
    const rx = Math.random() * canvasElem.width;
    const ry = Math.random() * canvasElem.height;

    enemies.push({
      x: rx,
      y: ry,
      size: enemyInitSize,
      speed: enemyMaxSpeed,
      angry: false,
    });

    setTimeout(randomCreateEnemy, createEnemyEachMS);
  }

  function randomCreateFood() {
    const rx = Math.random() * canvasElem.width;
    const ry = Math.random() * canvasElem.height;
    const rSize = Math.random() * 8 + 2;

    food.push({
      x: rx,
      y: ry,
      size: rSize,
      speed: 0,
    });

    setTimeout(randomCreateFood, createFoodEachMS);
  }

  function draw() {
    if (!paused) {
      ctx.clearRect(0, 0, canvasElem.width, canvasElem.height);

      updateScore();
      updateTime();
      updateEnemies();
      updatePlayer();

      drawPlayer();
      drawEnemies();
      drawFood();

    }
    requestAnimationFrame(draw);
  }

  canvasElem.addEventListener('mousemove', (event) => {
    const bounds = canvasElem.getBoundingClientRect();
    mouseX = event.pageX - bounds.left;
    mouseY = event.pageY - bounds.top;
  });

  randomCreateEnemy();
  randomCreateFood();
  draw();
}

window.addEventListener('DOMContentLoaded', start);


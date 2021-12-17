let player;
let spaceZone; 
let wallpaper;
let bullets = [];
let enemies = [];
let enemyBullets = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    spaceZone = loadImage('spaceBackground.jpg');
    playerSprite = loadImage('shipSprite.png');
    playerBullet = loadImage('sword_bullet.png');
    enemy1 = loadImage('enemy_ship.png');
    enemyShot = loadImage('enemy_bullet.png');

    state = 0;
    playerLife = 100;

    speed = 5;
    reloadTime = 15;
    spawnRate = 30;
    

    player = new GameObject(windowWidth/2, windowHeight/2, playerSprite, 10);
    for (let i=0; i<20; i++) {
      enemies[i] = new Enemy(enemy1, 30, 2);
    }
}

  
function draw() {
  background(spaceZone);

  deathScreen();

  startScreen();

  if (state == 1) {
    fill(255);
    textSize(15);
		text("Life: " + playerLife, 30, 30);

    player.display(); 

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      player.y -= speed;
    }
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      player.y += speed;
    }
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      player.x -= speed;
    }
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      player.x += speed;
    }

    if (keyIsDown(32)) {
      if (reloadTime == 15) {
        bullets.push(new Projectile(player.x, player.y + 30, playerBullet, 5, 20));
        reloadTime = 0;
      } else {
        reloadTime += 1;
      }

    }

    enemyDisplay();

    bulletMove();

    enemyBulletMove();

    removeBullets(bullets);

    removeBullets(enemyBullets);

    if (playerLife <= 0) {
      state = 2;
    }

    if (enemies.length == 0) {
      fill(255);
      textSize(25);
		  text("STAGE", width/2, 300);
		  text("CLEAR", width/2, 350);
    }
  }
  
}

function enemyDisplay() {
  for (const enemy of enemies) {
    enemy.display();
    enemy.move();
    if (enemy.x <= -50) {
      console.log(enemies.length);
      enemy.x = windowWidth + random(0, 200);
      enemy.y = random(30, windowHeight - 30);
      enemy.randomState();
    }
    if (enemy.fire()) {
      enemyBullets.push(new Projectile(enemy.x, enemy.y, enemyShot, enemy.radius, -4));
    }
  }
}


function deathScreen() {
  if (state == 2) {
    fill(255);
    textSize(25);
		text("GAME OVER", width/2, 300);
		text("Press Enter to Continue", width/2, 350);
    if (keyIsDown(13)) {
      state = 1;
      playerLife = 100;
    }
  }
}

function startScreen() {
  if (state == 0) {
    fill(255);
    textSize(25);
		text("Press 'Return' to start", width/2 - 100, 300);
		text("Arrows or WASD to move", width/2 - 100, 350);
		text("Space bar to fire", width/2 - 100, 400);
    if (keyIsDown(13)) {
      state = 1;
    }
  }
}

//Inspired From https://github.com/LittleB0xes/SpaceShooter-P5js/blob/master/sketch.js#L450
function bulletMove() {
	for (let i = 0; i < bullets.length; i++) {
		bullets[i].move();
		bullets[i].display();
    hitDetection();
	}
}

function hitDetection() {
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      if (intersectWith(bullets[i], enemies[j])) {
        bullets[i].y = - 100;
        enemies[j].health -=10;
        if (enemies[j].health <= 0) {
          enemies.splice(j, 1);
          console.log(enemies.length);
        }
      }
    }
  }
}

function enemyBulletMove() {
  for (bullet of enemyBullets) {
		bullet.move();
		bullet.display();
		enemyHitDetection(bullet, player);
	}
}

function enemyHitDetection(bullet, player) {
  if (intersectWith(bullet, player)) {
    removeBullets(bullet);
    playerLife -= 20;
    background(255,0,0);
  }
}

function removeBullets(projectile) {
  for (let i = 0; i < projectile.length; i++) {
		if (projectile[i].x < 0 || projectile[i].x > width) {
			projectile.splice(i, 1);
		}
	}
}


function intersectWith(object1, object2) {
	let distance = dist(object1.x, object1.y, object2.x, object2.y);
	if (distance < object1.radius + object2.radius) {
		return true;
	} else {
		return false;
	}
}

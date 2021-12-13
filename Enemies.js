class Enemy extends GameObject {
    constructor(sprite, radius, speed) {
        super(x, y, sprite, radius);
        this.x = windowWidth + random(0, 500);
        this.y = random(30, windowHeight - 30);
        this.xSpeed = speed;
        this.health = 40;
        this.death = false;
        this.state = random(0,3);
    }
    //behaviours list: shoot, move, die

    move() {
        if (this.death) {
            this.y =  -100;
        } else {
            let mod = random(0,2);
            this.x -= mod * this.xSpeed;
            if (this.state > 0 && this.state <= 1) {
                this.y = this.startY + 30 * sin(this.x/30);
            }
            if (this.state > 1 && this.state <= 2) {
                this.y += (player.y - this.y)/abs(player.y - this.y);
            }
        }
        //don't move/ move on a curve/ move towards player
    }


    fire() {
		if (random(0,500) < 1 && this.y > 0) {
			return true;
		}
		return false;
	}

}
class Projectile extends GameObject {
    constructor (x, y, sprite, radius, speed) {
        super(x, y, sprite, radius);
        this.speed = speed;
    }
    
	move() {
		this.x += this.speed;
	}
}

class GameObject {
    constructor(x, y, sprite, radius) {
      this.x = x;
      this.y = y;
      this.sprite = sprite;
      this.radius = radius;
    }
  
    display() {
      image(this.sprite, this.x , this.y );
    }
  }
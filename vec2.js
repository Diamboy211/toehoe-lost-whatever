class vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  eq(other) {
    return this.x == other.x && this.y == other.y;
  }
  copy_to(other) {
    other.x = this.x;
    other.y = this.y;
  }
  copy_from(other) {
    this.x = other.x;
    this.y = other.y;
  }
  static copy(v) {
    return new vec2(v.x, v.y);
  }
}

export { vec2 };
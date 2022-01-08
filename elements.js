import { vec2 } from "./vec2.js"

class Rectangle {
  constructor(pos, size, info, onclick, active=true) {
    this.pos = vec2.copy(pos);
    this.size = vec2.copy(size);
    this.bg_color = info.rect_color ?? "#444";
    this.text_color = info.text_color ?? "#FFF";
    this.text = info.text ?? "";
    this.text_scale = info.text_scale ?? 1.0;
    this.onclick = onclick;
    this.active = active;
  }
  
  check(mouse_pos) {
    let mx = mouse_pos.x, my = mouse_pos.y;
    if (mx >= this.pos.x && mx <= this.pos.x + this.size.x
     && my >= this.pos.y && my <= this.pos.y + this.size.y) {
      this.onclick();
      return true;
    }
    return false;
  }
  
  draw(ctx) {
    if (!this.active) return;
    ctx.fillStyle = this.bg_color;
    ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
    if (this.text != "") {
      ctx.font = "16px Helvetica";
      let size = ctx.measureText(this.text);
      let w = size.actualBoundingBoxLeft + size.actualBoundingBoxRight;
      let h = size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
      let relx = 16 / w * this.size.x * this.text_scale;
      let rely = 16 / h * this.size.y * this.text_scale;
      ctx.font = `${Math.floor(relx > rely ? rely : relx)}px Helvetica`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = this.text_color;
      ctx.fillText(this.text, this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
      //ctx.fillRect(this.pos.x + this.size.x/2 - relx/2, this.pos.y + this.size.y/2 - rely/2, relx, rely);
    }
  }
}

class Circle {
  constructor(pos, radius, info, onclick, active=true) {
    this.pos = vec2.copy(pos);
    this.radius = radius;
    this.bg_color = info.rect_color ?? "#444";
    this.text_color = info.text_color ?? "#FFF";
    this.text = info.text ?? "";
    this.text_scale = info.text_scale ?? 1.0;
    this.onclick = onclick;
    this.active = active;
  }
  
  check(mouse_pos) {
    let mx = this.pos.x - mouse_pos.x, my = this.pos.y - mouse_pos.y;
    if (Math.hypot(mx, my) <= this.radius) {
      this.onclick();
      return true;
    }
    return false;
  }
  
  draw(ctx) {
    if (!this.active) return;
    ctx.fillStyle = this.bg_color;
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, 2*Math.PI);
    ctx.fill();
    if (this.text != "") {
      ctx.font = "16px Helvetica";
      let size = ctx.measureText(this.text);
      let w = size.actualBoundingBoxLeft + size.actualBoundingBoxRight;
      let h = size.actualBoundingBoxAscent + size.actualBoundingBoxDescent;
      let r = 8 / Math.hypot(w, h) * this.text_scale;
      ctx.font = `${Math.floor(r)}px Helvetica`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";
      ctx.fillStyle = this.text_color;
      ctx.fillText(this.text, this.pos.x + this.size.x/2, this.pos.y + this.size.y/2);
      //ctx.fillRect(this.pos.x + this.size.x/2 - relx/2, this.pos.y + this.size.y/2 - rely/2, relx, rely);
    }
  }
}

export { Rectangle, Circle };
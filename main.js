import * as util from "./utility.js";
import { vec2 } from "./vec2.js"

function main() {
  let menu = "title";
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let click_pos = new vec2(-1, -1);
  let click_anims = [];
  util.fit_canvas_to_screen(canvas);
  document.addEventListener("mousedown", e => {
    click_pos.x = e.clientX;
    click_pos.y = e.clientY;
    click_anims.push({
      pos: vec2.copy(click_pos),
      timer: 60,
    });
  });
  let screen_size = new vec2(canvas.width, canvas.height);
  let fineness = 5;
  
  (function loop() {
    requestAnimationFrame(loop);
    let nsize = util.screen_size();
    if (!screen_size.eq(nsize)) {
      util.fit_canvas_to_screen(canvas);
      screen_size.x = canvas.width;
      screen_size.y = canvas.height;
    }
    ctx.fillStyle = "#000000";
    for (let i = 0; i < fineness; i++) {
      for (let j = i % 2; j < fineness; j += 2) {
        ctx.fillRect(screen_size.x / fineness*j, screen_size.y / fineness*i, screen_size.x / fineness, screen_size.y / fineness);
      }
    }
    ctx.fillStyle = "#FFFFFF";
    for (let i = 0; i < fineness; i++) {
      for (let j = (i+1) % 2; j < fineness; j += 2) {
        ctx.fillRect(screen_size.x / fineness*j, screen_size.y / fineness*i, screen_size.x / fineness, screen_size.y / fineness);
      }
    }
    
    ctx.fillStyle = "#FF7F00";
    ctx.beginPath();
    for (let i = 0; i < click_anims.length; i++) {
      let t = (59 - click_anims[i].timer--) / 60;
      if (click_anims[i].timer == 0) {
        click_anims[i--] = click_anims[click_anims.length-1];
        click_anims.pop();
        continue;
      }
      for (let j = 0; j < 8; j++) {
        let t2 = 2*t;
        let pos = new vec2(
          15*(t2 * Math.cos(j*Math.PI/4)) + click_anims[i].pos.x,
          15*(t2*t2 - t2*Math.sin(j*Math.PI/4)-t2) + click_anims[i].pos.y
        )
        ctx.moveTo(pos.x, pos.y);
        ctx.arc(pos.x, pos.y, 6 - 6*t, 0, 2*Math.PI);
      }
    }
    ctx.fill();
  })();
}

main();

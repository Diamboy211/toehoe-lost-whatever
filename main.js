import * as util from "./utility.js";
import { vec2 } from "./vec2.js"
import * as elem from "./elements.js"

function update_buttons(elements, mode, scr) {
  elements.length = 0;
  let cmd = mode.split(' ');
  const func_table = {
    "title": () => {
      elements.push(
        new elem.Rectangle(
          new vec2(0, 0),
          scr,
          { rect_color: "#0000", text_scale: 0.5, text: "click your mouse to start" },
          () => {
            elements[0].text = "choose your fate whatever";
            elements[0].onclick = () => {
              prompt("give name");
              prompt("give in-game name", "reisen udongein inaba");
            }}
        ),
      )
    }
  }
  func_table[cmd[0]]();
}

function main() {
  // so you can actually see shit
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  
  // stuff that does not need to be saved
  let mode = "title";
  let click_pos = new vec2(-1, -1);
  let clicking = false;
  let click_anims = [];
  util.fit_canvas_to_screen(canvas);
  let screen_size = new vec2(canvas.width, canvas.height);
  let elements = [];
  update_buttons(elements, mode, screen_size);
  
  document.addEventListener("mousedown", e => {
    click_pos.x = e.clientX;
    click_pos.y = e.clientY;
    click_anims.push({
      pos: vec2.copy(click_pos),
      timer: 0.0,
    });
    clicking = true;
  });
  
  let last_tick = Date.now();
  
  (function loop() {
    requestAnimationFrame(loop);
    
    // time
    let dt = (-last_tick + (last_tick = Date.now())) * 0.001;
    
    // other stuff
    let nsize = util.screen_size();
    if (!screen_size.eq(nsize)) {
      util.fit_canvas_to_screen(canvas);
      screen_size.x = canvas.width;
      screen_size.y = canvas.height;
      update_buttons(elements, mode, screen_size);
    }
    
    // placeholder background
    const finenessx = 10;
    const finenessy = 5;
    ctx.fillStyle = "#000000";
    for (let i = 0; i < finenessy; i++) {
      for (let j = i % 2; j < finenessx; j += 2) {
        ctx.fillRect(screen_size.x / finenessx*j, screen_size.y / finenessy*i, screen_size.x / finenessx, screen_size.y / finenessy);
      }
    }
    ctx.fillStyle = "#7F7F7F";
    for (let i = 0; i < finenessy; i++) {
      for (let j = (i+1) % 2; j < finenessx; j += 2) {
        ctx.fillRect(screen_size.x / finenessx*j, screen_size.y / finenessy*i, screen_size.x / finenessx, screen_size.y / finenessy);
      }
    }
    
    // buttons stuff
    for (let i = 0; i < elements.length; i++)
    {
      elements[i].draw(ctx);
      if (clicking) elements[i].check(click_pos);
    }
    
    // draws the clicks
    ctx.fillStyle = "#FF7F00";
    ctx.beginPath();
    for (let i = 0; i < click_anims.length; i++) {
      let t = click_anims[i].timer;
      click_anims[i].timer += dt;
      if (t >= 1) {
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
    
    clicking = false;
  })();
}

main();

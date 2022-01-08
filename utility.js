import { vec2 } from "./vec2.js"

function fit_canvas_to_screen(canvas) {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

function screen_size() {
  return new vec2(document.body.clientWidth, document.body.clientHeight);
}

export { fit_canvas_to_screen, screen_size };

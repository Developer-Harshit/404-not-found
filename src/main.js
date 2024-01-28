import { Renderer } from "./scripts/renderer";
import "./css/retro.css";
import "./css/styles.css";
import { Ui } from "./scripts/ui";

// 1 . Canvas to draw game objects
// 2.  Canvas to apply shader
// 3.  Canvas to draw Ui and layered canvas

window.onload = () => {
  const renderer = new Renderer(document.getElementById("c"));
  const img = document.createElement("img");
  img.src = "/sample.jpg";

  const ctx = renderer.surf;

  renderer.init();
  const ui = new Ui(renderer);
  ui.init();

  let prevTime = 0;
  function draw(time) {
    requestAnimationFrame(draw);

    renderer.render();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.font = "900 16px monospace";

    ctx.lineWidth = 3;
    ctx.strokeStyle = "black";

    let dt = time - prevTime;
    prevTime = time;
    draw_fps(ctx, dt);
  }
  requestAnimationFrame(draw);
};

function draw_fps(ctx, dt) {
  let h = ctx.canvas.height / 2;
  let fps = 1000 / dt;
  ctx.strokeText(fps, 10, h);
  ctx.fillStyle = "white";
  ctx.fillText(fps, 10, h);
}

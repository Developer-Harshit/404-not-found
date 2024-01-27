import { Renderer } from "./scripts/renderer";

// 1 . Canvas to draw game objects
// 2.  Canvas to apply shader
// 3.  Canvas to draw Ui and layered canvas

window.onload = () => {
  const renderer = new Renderer(document.getElementById("c"));
  const img = document.createElement("img");
  img.src = "/sample.jpg";

  const ctx = renderer.surf;

  renderer.init();

  // dt = ? , fps = 60 ; frame b/w dt = 1 ; 1/60 s * 1000
  const timeNow = Date.now();
  setInterval(draw, 1000 / 30);
  function draw() {
    renderer.render();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.font = "900 16px monospace";

    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";

    let h = ctx.canvas.height / 2;
    let time = Date.now() - timeNow;
    let fps = (1000 * renderer.framecount) / time;
    ctx.strokeText(fps, 10, h);
    ctx.fillStyle = "white";

    ctx.fillText(fps, 10, h);
  }
};

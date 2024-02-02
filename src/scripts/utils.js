// Request
// Animation
// Frame
export function getRequestAnimationFrame() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (
      /* function FrameRequestCallback */ callback,
      /* DOMElement Element */ element
    ) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
}
/**
 *
 * @param {HTMLCanvasElement} cnv
 */
export function getGLContext(cnv) {
  const ctxOptions = {
    antialias: false,
    depth: false,
    stencil: false,
    alpha: false,
  };

  let ctx = cnv.getContext("webgl");
  if (ctx) {
    return ctx;
  }
  ctx = cnv.getContext("webgl2", ctxOptions);
  return ctx;
}

export function is_colliding(pos1, size1, pos2, size2) {
  // right r1 > left r2
  // left r1 < right r2
  // bottom r1 >= top r2
  // top r1 <= bottum r2

  return (
    pos1.x + size1.w >= pos2.x &&
    pos1.x <= pos2.x + size2.w &&
    pos1.y + size1.h >= pos2.y &&
    pos1.y <= pos2.y + size2.h
  );
}

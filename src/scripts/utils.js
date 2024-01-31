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
  const ctxOptions = { antialias: false, depth: false };

  let ctx = cnv.getContext("webgl", ctxOptions);
  if (ctx) {
    return ctx;
  }
  ctx = cnv.getContext("webgl2", ctxOptions);
  return ctx;
}

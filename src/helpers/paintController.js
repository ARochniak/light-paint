import getRelativeCoords from './getRelativeCoords';

const paintController = (paint, canvas) => {
  document.onselect = () => {
    return false;
  };
  document.querySelector('.paint__rect').onclick = () => {
    paint.setRect();
  };
  document.querySelector('.paint__arrow').onclick = () => {
    paint.setArrow();
  };
  document.querySelector('.paint__pencil').onclick = () => {
    paint.setPencil();
  };
  document.querySelector('.paint__color').onchange = e => {
    const color = e.target.value;
    paint.setColor(color);
  };
  document.querySelector('.paint__stroke-width').onchange = e => {
    const strokeWidth = e.target.value;
    paint.setStrokeWidth(strokeWidth);
  };
  document.querySelector('.paint__clear').onclick = () => {
    paint.clear();
  };
  document.querySelector('.paint__save').onclick = () => {
    paint.saveLocally();
  };
  document.querySelector('.paint__load').onclick = () => {
    paint.loadFromLocal();
  };
  canvas.addEventListener('mousedown', e => {
    const coords = getRelativeCoords(canvas, e.clientX, e.clientY);
    paint.state.startDrawing(coords.x, coords.y);
    paint.draw(coords.x, coords.y);
  });

  canvas.addEventListener('mousemove', e => {
    const coords = getRelativeCoords(canvas, e.clientX, e.clientY);
    paint.draw(coords.x, coords.y);
  });

  document.addEventListener('mouseup', e => {
    const coords = getRelativeCoords(canvas, e.clientX, e.clientY);
    if (paint.state.isDrawing) paint.stopDrawing({ x: coords.x, y: coords.y });
  });
};

export default paintController;

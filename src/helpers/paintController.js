import getRelativeCoords from './getRelativeCoords';

const setDrawingToolsHandlers = paint => {
  document.querySelector('.paint__rect').onclick = () => {
    paint.useRect();
  };
  document.querySelector('.paint__arrow').onclick = () => {
    paint.useArrow();
  };
  document.querySelector('.paint__pencil').onclick = () => {
    paint.usePencil();
  };
  document.querySelector('.paint__color').onchange = e => {
    const color = e.target.value;
    paint.setColor(color);
  };
  document.querySelector('.paint__line-width').onchange = e => {
    const lineWidth = e.target.value;
    paint.setLineWidth(lineWidth);
  };
};

const setEditingToolsHandlers = paint => {
  document.querySelector('.paint__clear').onclick = () => {
    paint.clear();
  };
  document.querySelector('.paint__save').onclick = () => {
    paint.saveLocally();
  };
  document.querySelector('.paint__load').onclick = () => {
    paint.loadFromLocal();
  };
};

const setCanvasInteraction = (canvas, paint) => {
  canvas.addEventListener('mousedown', e => {
    const coords = getRelativeCoords(canvas, e.clientX, e.clientY);
    paint.startDrawing(coords.x, coords.y);
    paint.draw(coords.x, coords.y);
  });

  canvas.addEventListener('mousemove', e => {
    const coords = getRelativeCoords(canvas, e.clientX, e.clientY);
    paint.draw(coords.x, coords.y);
  });

  document.addEventListener('mouseup', e => {
    const coords = getRelativeCoords(canvas, e.clientX, e.clientY);
    if (paint.shouldStopDrawing())
      paint.stopDrawing({ x: coords.x, y: coords.y });
  });
};

const paintController = (paint, canvas) => {
  document.onselect = () => {
    return false;
  };

  setDrawingToolsHandlers(paint);
  setEditingToolsHandlers(paint);
  setCanvasInteraction(canvas, paint);
};

export default paintController;

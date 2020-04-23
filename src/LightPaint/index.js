import Drawer from '../Drawer';
import PaintState from '../PaintState';

import { saveLocally, loadFromLocal } from '../helpers/localStorageInteraction';

export default class LightPaint {
  constructor(canvas) {
    this.drawer = new Drawer(canvas);
    this.state = new PaintState();
    this.tools = {
      pencil: this.drawCurve.bind(this),
      rect: this.drawRect.bind(this),
      arrow: this.drawArrow.bind(this)
    };
  }

  clear() {
    this.drawer.clearCanvas();
    this.state.clearState();
  }

  saveLocally() {
    saveLocally(this.state.savedObjects, 'drawing');
  }

  loadFromLocal() {
    this.state.savedObjects = loadFromLocal('drawing');
    this.state.isDrawing = true;
    this.redraw();
    this.state.isDrawing = false;
  }

  draw(x, y) {
    this.state.setEndPoint(x, y);
    this.tools[this.state.activeDrawingTool]();
  }

  stopDrawing(endPoint) {
    this.state.stopDrawing();
    this.drawer.endDrawing();
    this.saveObject(endPoint);
  }

  drawCurve() {
    if (!this.state.isDrawing) return false;
    const { x, y } = this.state.endPoint;
    const color = this.state.color;
    this.drawer.drawPoint(x, y, color);
    this.state.addCurvePoint(x, y);
  }

  drawRect({
    x = this.state.startPoint.x,
    y = this.state.startPoint.y,
    endX = this.state.endPoint.x,
    endY = this.state.endPoint.y,
    color = this.state.color
  } = {}) {
    if (!this.state.isDrawing) return false;
    if (!this.state.isRedraw) {
      this.drawer.clearCanvas();
      this.redraw();
    }
    const width = endX - x;
    const height = endY - y;
    this.drawer.drawReact({ x, y, width, height, color });
  }

  drawArrow({
    x = this.state.startPoint.x,
    y = this.state.startPoint.y,
    endX = this.state.endPoint.x,
    endY = this.state.endPoint.y,
    color = this.state.color
  } = {}) {
    if (!this.state.isDrawing) return false;
    if (!this.state.isRedraw) {
      this.drawer.clearCanvas();
      this.redraw();
    }
    this.drawer.drawArrow({ x, y, endX, endY, color });
  }

  redraw() {
    this.drawer.clearCanvas();
    if (!this.state.savedObjects) return false;
    this.state.startRedraw();
    this.state.savedObjects.forEach(object => {
      // TODO лишняя установка endPoint
      if (object.drawingTool === 'pencil') {
        object.curvePoints.forEach(curvePoint => {
          this.drawer.drawPoint(curvePoint.x, curvePoint.y, object.color);
        });
        this.drawer.endDrawing();
      } else {
        this.tools[object.drawingTool]({
          x: object.startPoint.x,
          y: object.startPoint.y,
          endX: object.endPoint.x,
          endY: object.endPoint.y,
          color: object.color
        });
      }
    });
    this.state.stopRedraw();
  }

  saveObject(endPoint) {
    if (this.state.activeDrawingTool === 'pencil') {
      this.state.saveCurve();
      // this.drawer.endDrawing();
    } else {
      this.state.saveShape(endPoint);
    }
  }

  setPencil() {
    this.state.setActiveDrawingTool('pencil');
  }

  setRect() {
    this.state.setActiveDrawingTool('rect');
  }

  setArrow() {
    this.state.setActiveDrawingTool('arrow');
  }

  setColor(color) {
    this.state.setColor(color);
  }
}

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
    if (!this.state.isDrawing) return false;
    this.state.setEndPoint(x, y);
    if (this.state.mustRedraw()) {
      this.redraw();
    }
    this.tools[this.state.activeDrawingTool]();
  }

  stopDrawing(endPoint) {
    this.state.stopDrawing();
    this.drawer.endDrawing();
    this.saveObject(endPoint);
  }

  drawCurve() {
    const { x, y } = this.state.endPoint;
    const color = this.state.color;
    const lineWidth = this.state.lineWidth;
    this.drawer.drawPoint(x, y, color, lineWidth);
    this.state.addCurvePoint(x, y);
  }

  drawRect(drawingParameters = this.state.getDrawingParameters()) {
    let { x, y, endX, endY, color, lineWidth } = drawingParameters;
    const width = endX - x;
    const height = endY - y;
    this.drawer.drawReact({ x, y, width, height, color, lineWidth });
  }

  drawArrow(drawingParameters = this.state.getDrawingParameters()) {
    this.drawer.drawArrow(drawingParameters);
  }

  redraw() {
    this.drawer.clearCanvas();
    this.state.startRedraw();
    this.state.savedObjects.forEach(object => {
      if (object.drawingTool === 'pencil') {
        object.curvePoints.forEach(curvePoint => {
          this.drawer.drawPoint(
            curvePoint.x,
            curvePoint.y,
            object.color,
            object.lineWidth
          );
        });
        this.drawer.endDrawing();
      } else {
        const drawingParameters = this.getObjectDrawingParameters(object);
        this.tools[object.drawingTool](drawingParameters);
      }
    });
    this.state.stopRedraw();
  }

  getObjectDrawingParameters(object) {
    return {
      x: object.startPoint.x,
      y: object.startPoint.y,
      endX: object.endPoint.x,
      endY: object.endPoint.y,
      lineWidth: object.lineWidth,
      color: object.color
    };
  }

  saveObject(endPoint) {
    if (this.state.activeDrawingTool === 'pencil') {
      this.state.saveCurve();
    } else {
      this.state.saveShape(endPoint);
    }
  }

  startDrawing(x, y) {
    this.state.startDrawing(x, y);
  }

  shouldStopDrawing() {
    return this.state.isDrawing;
  }

  usePencil() {
    this.state.setActiveDrawingTool('pencil');
  }

  useRect() {
    this.state.setActiveDrawingTool('rect');
  }

  useArrow() {
    this.state.setActiveDrawingTool('arrow');
  }

  setColor(color) {
    this.state.setColor(color);
  }
  setLineWidth(width) {
    this.state.setLineWidth(width);
  }
}

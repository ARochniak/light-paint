export default class PaintState {
  constructor() {
    this.isDrawing = false;
    this.savedObjects = [];
    this.curvePoints = [];
    this.startPoint = { x: 0, y: 0 };
    this.endPoint = {x: 0, y: 0};
    this.color = 'black';
    this.activeDrawingTool = 'pencil';
    this.isRedraw = false;
  }

  clearState() {
    this.savedObjects = [];
    this.curvePoints = [];
    this.startPoint = { x: 0, y: 0 };
    this.endPoint = {x: 0, y: 0};
  }

  startDrawing(x, y) {
    this.isDrawing = true;
    this.setStartPoint(x, y);
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  saveShape(endPoint) {
    this.savedObjects.push({
      startPoint: { ...this.startPoint },
      endPoint,
      color: this.color,
      drawingTool: this.activeDrawingTool
    });
  }

  saveCurve() {
    this.savedObjects.push({
      curvePoints: [...this.curvePoints],
      color: this.color,
      drawingTool: this.activeDrawingTool
    });
    this.curvePoints = [];
  }

  addCurvePoint(x, y) {
    this.curvePoints.push({ x, y });
  }

  startRedraw() {
    this.isRedraw = true
  }

  stopRedraw() {
    this.isRedraw = false;
  }

  setStartPoint(x, y) {
    this.startPoint = { x, y };
  }

  setEndPoint(x, y) {
    this.endPoint = { x, y };
  }

  setColor(color) {
    this.color = color;
  }

  setActiveDrawingTool(tool) {
    this.activeDrawingTool = tool;
  }
}

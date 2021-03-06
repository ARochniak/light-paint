export default class PaintState {
  constructor() {
    this.savedObjects = [];
    this.curvePoints = [];
    this.startPoint = { x: 0, y: 0 };
    this.endPoint = { x: 0, y: 0 };
    this.activeDrawingTool = 'pencil';
    this.color = 'black';
    this.lineWidth = 1;
    this.isDrawing = false;
    this.isRedraw = false;
  }

  getDrawingParameters() {
    return {
      x: this.startPoint.x,
      y: this.startPoint.y,
      endX: this.endPoint.x,
      endY: this.endPoint.y,
      color: this.color,
      lineWidth: this.lineWidth
    };
  }

  mustRedraw() {
    return (
      !this.isRedraw && this.activeDrawingTool !== 'pencil' && this.savedObjects
    );
  }

  clearState() {
    this.savedObjects = [];
    this.curvePoints = [];
    this.startPoint = { x: 0, y: 0 };
    this.endPoint = { x: 0, y: 0 };
  }

  saveShape(endPoint) {
    this.savedObjects.push({
      startPoint: { ...this.startPoint },
      endPoint,
      color: this.color,
      lineWidth: this.lineWidth,
      drawingTool: this.activeDrawingTool
    });
  }

  saveCurve() {
    this.savedObjects.push({
      curvePoints: [...this.curvePoints],
      color: this.color,
      lineWidth: this.lineWidth,
      drawingTool: this.activeDrawingTool
    });
    this.curvePoints = [];
  }

  addCurvePoint(x, y) {
    this.curvePoints.push({ x, y });
  }

  startDrawing(x, y) {
    this.isDrawing = true;
    this.setStartPoint(x, y);
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  startRedraw() {
    this.isRedraw = true;
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

  setLineWidth(width) {
    this.lineWidth = width;
  }

  setActiveDrawingTool(tool) {
    this.activeDrawingTool = tool;
  }
}

export default class Drawer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  clearCanvas() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawPoint(x, y, color, strokeWidth) {
    const ctx = this.ctx;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = strokeWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  endDrawing() {
    this.ctx.beginPath();
  }

  drawReact({ x, y, width, height, color, strokeWidth }) {
    this.setColor(color);
    this.ctx.beginPath();
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = strokeWidth;
    this.ctx.fillRect(x, y, width, height);
    this.ctx.rect(x, y, width, height);
    //TODO add support of select rectangle border
    this.ctx.stroke();
    this.ctx.beginPath();
  }

  drawArrow({x, y, endX, endY, color, strokeWidth}) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = strokeWidth;
    const arrowheadLength = 10;
    const dx = endX - x;
    const dy = endY - y;
    const angle = Math.atan2(dy, dx);
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(endX, endY);
    this.ctx.moveTo(endX, endY);
    this.ctx.lineTo(
      endX - arrowheadLength * Math.cos(angle - Math.PI / 6),
      endY - arrowheadLength * Math.sin(angle - Math.PI / 6)
    );
    this.ctx.moveTo(endX, endY);
    this.ctx.moveTo(endX, endY);
    this.ctx.lineTo(
      endX - arrowheadLength * Math.cos(angle + Math.PI / 6),
      endY - arrowheadLength * Math.sin(angle + Math.PI / 6)
    );
    this.ctx.stroke();
    this.ctx.beginPath();
  }

  setColor(color) {
    this.ctx.fillStyle = color;
  }
}

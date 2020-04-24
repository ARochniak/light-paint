export default class Drawer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawPoint(x, y, color, lineWidth) {
    const ctx = this.ctx;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  }

  endDrawing() {
    this.ctx.beginPath();
  }

  drawReact({ x, y, width, height, color, lineWidth }) {
    const ctx = this.ctx;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = lineWidth;
    ctx.fillRect(x, y, width, height);
    ctx.rect(x, y, width, height);
    //TODO add support of select border color
    ctx.stroke();
    ctx.beginPath();
  }

  drawArrow({ x, y, endX, endY, color, lineWidth }) {
    //TODO add support of selecting arrowHeadLength
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    const arrowheadLength = lineWidth * 10;
    const dx = endX - x;
    const dy = endY - y;
    const angle = Math.atan2(dy, dx);
    ctx.moveTo(x, y);
    ctx.lineTo(endX, endY);
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - arrowheadLength * Math.cos(angle - Math.PI / 6),
      endY - arrowheadLength * Math.sin(angle - Math.PI / 6)
    );
    ctx.moveTo(endX, endY);
    ctx.moveTo(endX, endY);
    ctx.lineTo(
      endX - arrowheadLength * Math.cos(angle + Math.PI / 6),
      endY - arrowheadLength * Math.sin(angle + Math.PI / 6)
    );
    ctx.stroke();
    ctx.beginPath();
  }
}

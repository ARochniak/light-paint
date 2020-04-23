const setCanvasSize = () => {
  const canvas = document.querySelector('.paint__canvas');

  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
};

export default setCanvasSize;

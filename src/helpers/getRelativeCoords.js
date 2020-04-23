const getRelativeCoords = (element, mouseX, mouseY) => {
  const elemRect = element.getBoundingClientRect();
  const x = mouseX - elemRect.left;
  const y = mouseY - elemRect.top;
  return { x, y };
};

export default getRelativeCoords;

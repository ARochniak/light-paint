import LightPaint from './LightPaint';

import paintController from './helpers/paintController';
import setCanvasSize from './helpers/setCanvasSize';

const canvas = document.querySelector('.paint__canvas');

setCanvasSize(canvas);
const paint = new LightPaint(canvas);

paintController(paint, canvas);

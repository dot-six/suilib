let { Window, Text } = require('../');

let w = new Window(500, 500);

let t = new Text(0, 0, 'sulib demo');

w.addChild(t);

w.mainLoopWhile();

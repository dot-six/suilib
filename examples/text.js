let Window = require('../lib/Window');
let Text = require('../lib/node/Text');

let w = new Window(500, 500);

let t = new Text(0, 0, 'sulib demo');

w.addChild(t);

w.mainLoopWhile();

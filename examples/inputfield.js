let { Window, InputField } = require('../');

let w = new Window(500, 500);
let input = new InputField();


w.addChild(input);
w.mainLoopWhile();

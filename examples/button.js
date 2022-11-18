let { Window, Button, Padding } = require('../');

let w = new Window(100, 100);

let button = new Button();
button.padding = new Padding(10);
w.addChild(button);

button.ev.on('mouse-click', () => console.log("Hello"));

w.mainLoopWhile();

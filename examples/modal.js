let { Window, Modal, Button, Padding, Text } = require('../');

let w = new Window(500, 500);
let modal = new Modal({x: 200, y: 170});
let button = new Button();
let button2 = new Button();
let t = new Text(50, 50, "Hey!");

modal.position = modal.position.add(50, 50);
button.padding = new Padding(10);
button2.padding = new Padding(10);

button2.position.x = 10;
button2.position.y = 10;

button.ev.on('mouse-click', () => { modal.opened = !modal.opened });
button2.ev.on('mouse-click', () => { modal.opened = !modal.opened });

modal.addChild(button2);
modal.addChild(t);

w.addChild(button);
w.addChild(modal);
w.mainLoopWhile();

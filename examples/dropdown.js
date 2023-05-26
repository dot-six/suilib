let { Window, DropDown } = require('../');

let w = new Window(500, 500);
let input = new DropDown(["Hello"]);

input.addItem("World");

input.ev.on('change', (selected) => console.log(selected));

w.addChild(input);
w.mainLoopWhile();

let { Window, ProgressBar } = require('../');

let w = new Window(500, 500);
let bar = new ProgressBar(0, 100);

bar.size.x = 100;
bar.size.y = 10;

setInterval(() => {
    if (bar.value < 100) {
        bar.value += 1;
    }
}, 100);

w.addChild(bar);
w.mainLoopWhile();

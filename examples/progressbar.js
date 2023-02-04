let { Window, ProgressBar } = require('../');

let w = new Window(500, 500);
let bar = new ProgressBar(0, 100);

bar.size.x = 200;
bar.size.y = 20;

w.addChild(bar);

w.setInterval(() => {
    if (bar.value < 100) {
        bar.value += 1;
    }
}, 100);

w.mainLoopWhile();

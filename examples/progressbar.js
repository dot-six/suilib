let { Window, ProgressBar } = require('../');

let w = new Window(500, 500);
let bar = new ProgressBar(0, 1000);

bar.size.x = 200;
bar.size.y = 20;

w.addChild(bar);
w.mainLoopWhile(() => {
    if (bar.value < 1000) {
        bar.value += 1;
    }
    return true;
});

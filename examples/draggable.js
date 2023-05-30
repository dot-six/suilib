let { Window, Rectangle } = require('../');
let { Mouse } = require('../');

let w = new Window(100, 100);

let rect = new Rectangle();
w.addChild(rect);

//rect.ev.on('mouse-drag', (delta) => console.log(delta));
rect.ev.on('mouse-drag', (delta) => console.log(rect.getRegion(), Mouse.getPosition(w.win)));
//rect.ev.on('mouse-click', () => );

w.setInterval(() => {
    console.log(w.eventState['MouseButtonPressed'])
    console.log(rect.getRegion())
}, 1000);

w.mainLoopWhile();

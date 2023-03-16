let { Window, WindowStyle, ConvexShape, Vector2D } = require('../');

let w = new Window(100, 100, WindowStyle.None);

let shape = new ConvexShape();
shape.setPointCount(6);

shape.setPoint(0, new Vector2D(1, 0));
shape.setPoint(1, new Vector2D(40, 0));
shape.setPoint(2, new Vector2D(60, 0));

shape.setPoint(3, new Vector2D(60, 20));
shape.setPoint(4, new Vector2D(40, 20));
shape.setPoint(5, new Vector2D(1, 20));

w.addChild(shape);

console.log(WindowStyle);
let a = [WindowStyle.None, WindowStyle.Default];
let b = 0;

w.setInterval(() => {
    w.borderStyle = a[++b % 2];
    console.log(w.borderStyle);
}, 1000);

w.mainLoopWhile();
const suilib = require('..');
let pos = new suilib.bindings.sdl.Vector2();
let siz = new suilib.bindings.sdl.Vector2();
let x = new suilib.bindings.sdl.Window("Yo", pos, siz);

console.log(pos.x, pos.y, siz.x, siz.y);
console.log(x, x.title, x.position, x.size);
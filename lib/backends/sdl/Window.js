const sdl = require('../../../build/Release/sdl.node');

function createWindowFlags(win) {
    let flags = sdl.WindowFlags.SHOWN | sdl.WindowFlags.RESIZABLE | sdl.WindowFlags.HIGHDPI;
    
    if (win.resizable == false) flags ^= sdl.WindowFlags.RESIZABLE;
    if (win.borderless) flags |= sdl.WindowFlags.BORDERLESS;

    if (win.visible == false) flags ^= sdl.WindowFlags.SHOWN | sdl.WindowFlags.HIDDEN;

    // TODO: Transform these into `windowState` property
    if (win.fullscreen) flags |= sdl.WindowFlags.FULLSCREEN;
    if (win.minimized) flags |= sdl.WindowFlags.MINIMIZED;
    if (win.maximized) flags |= sdl.WindowFlags.MAXIMIZED;

    if (win.alwaysOnTop) flags |= sdl.WindowFlags.ALWAYS_ON_TOP;
    if (win.highDPI == false) flags ^= sdl.WindowFlags.HIGHDPI;

    return flags;
}

class Window {
    constructor(win) {
        this.raw = {
            // TODO: create `sdl.CreateWindow` method
            win: sdl.CreateWindow(
                win.title,
                win.position.x, win.position.y,
                win.size.x, win.size.y,
                createWindowFlags(win)
            )
        }
    }
}

module.exports = Window;
module.exports = {
	bindings: {
        sdl: require('../build/Release/sdl.node')
    },
    backends: {
        sdl: require('./backends/sdl')
    }
};

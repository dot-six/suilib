const { Mouse } = require('../../sfml');
const { Vector2D } = require('../object');

module.exports = {};

module.exports.getPosition = function(win) {
    let relativePosition = Mouse.getPosition(win);
    // TODO: Complete the DPI awareness in SFML Forum #17092
    return new Vector2D(relativePosition).mul(2);
}

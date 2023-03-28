const { RectangleShape: SFRectangleShape } = require('../../sfml');
const { Color } = require('../object');
const Node = require('./Node');

module.exports = class Rectangle extends Node {
    constructor(x=0, y=0, width=10, height=10) {
        super();
        
        this.size.x = width;
        this.size.y = height;

        this.position.x = x;
        this.position.y = y;

        this.backgroundColor = new Color(0, 0, 0);

        this._rect = new SFRectangleShape(this.size);
    }

    render() {
        this._rect.setPosition(this.position);
        this._rect.setSize(this.size);
        this._rect.setFillColor(this.backgroundColor.toInteger());

        return [this._rect];
    }
}
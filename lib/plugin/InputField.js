const { RectangleShape } = require('../../sfml');

const Node = require('../node/Node');
const Text = require('../node/Text');

const { Vector2D, Color, Padding } = require('../object');

class InputField extends Node {
    constructor() {
        super();

        this._elements = {};
        this._elements.background = new RectangleShape(this.size);
        this._elements.text = new Text();

        this.backgroundColor = new Color(200, 200, 200);
        this.textColor = new Color(0, 0, 0);

        this.padding = new Padding(5, 5, 5, 5);
    }

    render() {
        // Sizing
        this._elements.background.setSize(this.size);

        // Positioning
        this._elements.background.setPosition(this.getGlobalPosition());
        this._elemets.text.position = this.getGlobalPosition().add(
            new Vector2D(this.padding.left, this.padding.top)
        );

        // Coloring
        this._elements.background.setFillColor(this.backgroundColor);
        this._elements.text.color = this.textColor;

        return [this._elements.background, ...this._elements.text.render()];
    }
}

exports.module = InputField;
const { RectangleShape } = require('../../sfml');

const Node = require('../node/Node');
const { Padding, Vector2D, Color } = require('../object');

class ProgressBar extends Node {
    constructor(min=0, max=100, value=undefined) {
        super();

        if (value === undefined) {
            value = min;
        }

        this.size.x = 200;
        this.size.y = 20;

        this.min = min;
        this.max = max;
        this.value = value;

        this._shapes = {};
        this._shapes.bg = new RectangleShape(this.size);
        this._shapes.inner = new RectangleShape(this.size);

        this.padding = new Padding(5, 5, 5, 5);

        this.backgroundColor = new Color(200, 200, 200);
        this.innerColor = new Color(0, 200, 0);
    }

    get value() {
        return this._value;
    }
    
    set value(val) {
        this._value = Math.max(this.min, Math.min(this.max, val));
        // TODO: @lib/node/plugin/ProgressBar: Add onchange event kind of
    }

    render() {
        // Sizing elements
        this._shapes.bg.setSize(this.size);

        let topleftvect = new Vector2D(
            this.padding.left,
            this.padding.top
        );
        let newSize = this.size.sub(topleftvect);
        newSize = newSize.sub(new Vector2D(
            this.padding.right,
            this.padding.bottom
        ));

        // Calculate relative progress width
        newSize.x = newSize.x * (this.value / this.max);
        
        this._shapes.inner.setSize(newSize);

        // Positioning
        const globalPos = this.getGlobalPosition();
        this._shapes.bg.setPosition(globalPos);
        this._shapes.inner.setPosition(globalPos.add(topleftvect));

        // Coloring elements
        this._shapes.bg.setFillColor(this.backgroundColor);
        this._shapes.inner.setFillColor(this.innerColor);

        // Return elements
        return [this._shapes.bg, this._shapes.inner];
    }
}

module.exports = ProgressBar;
const {
	ConvexShape: SFConvexShape
} = require('../../sfml');

const { Node, Text } = { Node: require('./Node'), Text: require('./Text') };
const { Vector2D, Color, Padding, Region } = require('../object');

class ConvexShape extends Node {
	constructor(x=0, y=0, pointCount=0) {
		super();

		this._shape = new SFConvexShape(pointCount);
		this.pointCount = pointCount;
		this.backgroundColor = new Color(0, 0, 0);
	}

	get size() {
		let reg = this.getRegion();

		return reg.end.sub(reg.start);
	}

	setPointCount(val) {
		this.pointCount = val;
		this._shape.setPointCount(val);
	}

	setPoint(id, pos) {
		this._shape.setPoint(id, pos.asVectorF());
	}

	getRegion() {
		let pos = this.getGlobalPosition();

		// TODO: @lib/node/ConvexShape: getRegion method
		let reg = new Region(pos, pos);
		return reg;
	}

	render() {
		this._shape.setFillColor(this.backgroundColor);

		let pos = this.getGlobalPosition();
		this._shape.setPosition(pos);

		return [this._shape];
	}
}

module.exports = ConvexShape;

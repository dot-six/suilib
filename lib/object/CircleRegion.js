const Vector2D = require('./Vector2D');
const Region = require('./Region');

class CircleRegion extends Region {
	constructor(origin, radius) {
		super(origin, origin);
		
		this.origin = origin;
		this.radius = radius;
	}

	contains(point) {
		return point.distance(this.origin) <= this.radius;
	}

	duplicate() {
		return new CircleRegion(this.origin, radius);
	}

	addPadding(pad) {
		let dup = this.duplicate();

		dup.radius += pad;
		
		return dup;
	}
}

module.exports = CircleRegion;

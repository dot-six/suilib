const Vector2D = require('./Vector2D');

class Region {
	constructor(start, end) {
		this.start = start;
		this.end = end;
	}

	contains(point) {
		if (point.x < this.start.x) return false;
		if (point.y < this.start.y) return false;

		if (point.x > this.end.x) return false;
		if (point.y > this.end.y) return false;

		return true;
	}
}

module.exports = Region;

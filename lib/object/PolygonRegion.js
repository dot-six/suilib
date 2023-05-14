const pointInPolygon = require('point-in-polygon');

class PolygonRegion {
	constructor (points) {
		this.points = points;
		this._flatten_points();
	}

	_flatten_points() {
		this._points = this.points.map(v => [v.x, v.y]);
	}

	addPoint(point) {
		this.point.push(point);
		this._flatten_points();
	}

	contains(point) {
		return pointInPolygon([point.x, point.y], this._points);
	}

	// TODO: @lib/object/PolygonRegion: addPadding method
}

module.exports = PolygonRegion;

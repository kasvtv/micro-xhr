module.exports = function parseRequestHeaders(obj) {
	var ret = { 'content-type': 'application/json' }; // defaults
	for (var key in obj) {
		ret[key.toLowerCase()] = obj[key];
	}
	return ret;
};
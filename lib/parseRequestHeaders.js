module.exports = function parseRequestHeaders(obj) {
	var lowercaseHeaders = {'content-type': 'application/json'}; // defaults
	for (var key in obj) {
		lowercaseHeaders[key.toLowerCase()] = obj[key];
	}
	return lowercaseHeaders;
};
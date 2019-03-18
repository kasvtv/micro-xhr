var xhrWrapper = require('./xhr');

module.exports = function xhrRequest(args) {
	return xhrWrapper(args).then(function(resp) {
		if (resp.status < 200 || resp.status > 299) {
			throw resp;
		}
	});
};
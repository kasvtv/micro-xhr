var xhrWrapper = require('./xhr');

module.exports = function xhrRequest(args) {
	var promise = xhrWrapper(args);
	
	var ret = promise.then(function(resp) {
		if (resp.status < 200 || resp.status > 299) {
			throw resp;
		}
	});

	ret.xhr = promise.xhr;

	return ret;
};
var parseHeaders = require('micro-xhr/lib/parseHeaders');

function isJson(headers) {
	return (headers['content-type'] || '').toLowerCase().indexOf('application/json') !== -1;
}

module.exports = function xhrWrapper(args) {
	var xhr;
	var promise = new Promise(function(resolve, reject) {
		xhr = args.xhrInstance || new XMLHttpRequest();

		xhr.open(args.method || 'get', args.url);

		var lowercaseHeaders = parseHeaders(args.headers);

		for (var name in lowercaseHeaders) {
			xhr.setRequestHeader(name.toLowerCase(), lowercaseHeaders[name]);
		}

		xhr.onreadystatechange = function() {
			if (xhr.readyState === this.DONE) {
				var responseHeaders = {};
				var responseData;

				try {

					xhr.getAllResponseHeaders()
						.split(/(\r)?\n/)
						.forEach(function(x) {
							if (!x) return;
							var parts = x.split(': ');
							responseHeaders[parts[0].toLowerCase()] = parts[1];
						});

					responseData = isJson(responseHeaders)
						? JSON.parse(xhr.responseText)
						: xhr.responseText;

				} catch (e) {
					e.rawBody = xhr.responseText;

					reject({
						status: xhr.status,
						error: e,
						headers: responseHeaders,
					});
				}

				resolve({
					status: xhr.status,
					data: responseData,
					headers: responseHeaders,
				});

			}
		};

		xhr.send(
			isJson(lowercaseHeaders)
				? JSON.stringify(args.data)
				: args.data
		);
	});

	promise.xhr = xhr;

	return promise;
};
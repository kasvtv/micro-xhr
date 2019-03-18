var parseRequestHeaders = require('micro-xhr/lib/parseRequestHeaders');

function isJson(headers) {
	return (headers['content-type'] || '').indexOf('application/json') !== -1;
}

module.exports = function xhrWrapper(args) {
	var xhr;
	var promise = new Promise(function(resolve) {
		xhr = new XMLHttpRequest();
	
		xhr.open(args.method || 'get', args.url);
		
		var lowercaseHeaders = parseRequestHeaders(args.headers);

		for (var name in lowercaseHeaders) {
			xhr.setRequestHeader(name.toLowerCase(), lowercaseHeaders[name]);
		}

		xhr.send(
			isJson(lowercaseHeaders) && args.data && typeof args.data === 'object'
				? JSON.stringify(args.data)
				: args.data
		);

		xhr.onreadystatechange = function () {
			if (xhr.readyState === this.DONE) {
				var responseHeaders = {};
				
				xhr.getAllResponseHeaders()
				.split('\n')
				.forEach(function(x) {
					if (!x) return;
					var separator = x.indexOf(': ');
					responseHeaders[x.slice(0, separator).toLowerCase()] = x.slice(separator+2);
				});

				var responseData = isJson(responseHeaders)
					? JSON.parse(xhr.responseText)
					: xhr.responseText;

				resolve({
					status: xhr.status,
					data: responseData,
					headers: responseHeaders,
				});
			}
		};
	});

	promise.xhr = xhr;

	return promise;
};
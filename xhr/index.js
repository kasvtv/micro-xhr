var parseRequestHeaders = require('micro-xhr/lib/parseRequestHeaders');

function isJson(headers) {
	return (headers['content-type'] || '').toLowerCase().indexOf('application/json') !== -1;
}

module.exports = function xhrWrapper(args) {
	var xhr;
	var promise = new Promise(function(resolve) {
		xhr = args.xhrInstance || new XMLHttpRequest();
	
		xhr.open(args.method || 'get', args.url);
		
		var lowercaseHeaders = parseRequestHeaders(args.headers);

		for (var name in lowercaseHeaders) {
			xhr.setRequestHeader(name.toLowerCase(), lowercaseHeaders[name]);
		}

		xhr.onreadystatechange = function () {
			if (xhr.readyState === this.DONE) {
				var responseHeaders = {};
				
				xhr.getAllResponseHeaders()
				.split(/(\r)?\n/)
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

		xhr.send(
			isJson(lowercaseHeaders) && args.data && typeof args.data === 'object'
				? JSON.stringify(args.data)
				: args.data
		);
	});

	promise.xhr = xhr;

	return promise;
};
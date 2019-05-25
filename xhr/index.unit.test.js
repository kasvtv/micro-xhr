const xhrWrapper = require('.');

const getFakeXhrInstance = () => {
	const obj = {
		open: jest.fn(),
		setRequestHeader: jest.fn(),
		getAllResponseHeaders: jest.fn(() => obj.responseHeaders || ""),
		send: jest.fn(),
		mockReady(toAdd={}) {
			for (key in toAdd) {
				obj[key] = toAdd[key];
			}
			
			obj.onreadystatechange();
		}
	};

	return obj;
};

describe("GIVEN XMLHttpRequest isn't overriden", () => {
	it('THEN uses the regular XMLHttpRequest constructor', () => {
		const result = xhrWrapper({});

		expect(result.xhr).toBeInstanceOf(XMLHttpRequest);
	});
})

describe("GIVEN XMLHttpRequest is mocked", () => {

	describe("WHEN fired", () => {

		it('THEN uses the mocked XMLHttpRequest instance', () => {
			const xhrInstance = getFakeXhrInstance();

			const result = xhrWrapper({
				xhrInstance
			});

			expect(result.xhr).toBe(xhrInstance);
		});

		it("THEN returns a promise with the XHR instance on the 'xhr' key", () => {
			const xhrInstance = getFakeXhrInstance();

			const result = xhrWrapper({
				xhrInstance
			});
			
			expect(result).toBeInstanceOf(Promise);
			expect(result.xhr).toBe(xhrInstance);
		});

	});

	describe("WHEN fired using an object as data AND content-type=application/json", () => {
		it("THEN calls send with given JSON stringified data", () => {
			const xhrInstance = getFakeXhrInstance();
			const data = {a:1, b:22, c:333};

			xhrWrapper({
				xhrInstance,
				data,
				headers: {
					'content-type': 'application/json'
				}
			});
			
			expect(xhrInstance.send).toHaveBeenCalledWith(JSON.stringify(data));
		});
	});

	describe("WHEN fired using a non-object as data", () => {
		it("THEN calls send with given data", () => {
			const xhrInstance = getFakeXhrInstance();
			const data = Symbol('mockData');

			xhrWrapper({
				xhrInstance,
				data
			});
			
			expect(xhrInstance.send).toHaveBeenCalledWith(data);
		});
	});

	describe("WHEN no method specified", () => {
		it("THEN defaults to get", () => {
			const xhrInstance = getFakeXhrInstance();

			xhrWrapper({
				xhrInstance
			});
			
			expect(xhrInstance.open.mock.calls[0][0]).toBe('get');
		});
	});

	describe("WHEN method is specified", () => {
		it("THEN uses it", () => {
			const xhrInstance = getFakeXhrInstance();

			xhrWrapper({
				xhrInstance,
				method: 'post'
			});
			
			expect(xhrInstance.open.mock.calls[0][0]).toBe('post');
		});
	});

	describe("WHEN url is specified", () => {
		it("THEN uses it", () => {
			const xhrInstance = getFakeXhrInstance();

			xhrWrapper({
				xhrInstance,
				url: 'https://google.com'
			});
			
			expect(xhrInstance.open.mock.calls[0][1]).toBe('https://google.com');
		});
	});

	describe("WHEN headers are specified", () => {
		it("THEN calls setRequestHeader for each header", () => {
			const xhrInstance = getFakeXhrInstance();

			xhrWrapper({
				xhrInstance,
				headers: {
					'x-api-key': '123',
					'content-type': 'text/html'
				}
			});
			
			expect(xhrInstance.setRequestHeader).toHaveBeenCalledWith('x-api-key', '123');
			expect(xhrInstance.setRequestHeader).toHaveBeenCalledWith('content-type', 'text/html');
		});
	});

	describe("WHEN the XMLHttpRequest reaches ready state", () => {

		it("THEN the return value resolves to have responseText under the 'data' prop", async () => {
			const xhrInstance = getFakeXhrInstance();
			const responseText = Symbol('mockResponse');
	
			const promise = xhrWrapper({
				xhrInstance
			});

			xhrInstance.mockReady({responseText});

			expect(await promise).toHaveProperty('data', responseText);
		});

		it("THEN the return value resolves to have status under the 'status' prop", async () => {
			const xhrInstance = getFakeXhrInstance();
	
			const promise = xhrWrapper({
				xhrInstance
			});

			xhrInstance.mockReady({status: 404});

			expect(await promise).toHaveProperty('status', 404);
		});

		it("THEN the return value resolves to have parsed responseHeaders under the 'headers' prop", async () => {
			const xhrInstance = getFakeXhrInstance();
			const responseHeaders = 'Content-Type: text/html\nX-Api-Key: 1'
	
			const promise = xhrWrapper({
				xhrInstance
			});

			xhrInstance.mockReady({responseHeaders});

			expect((await promise).headers).toStrictEqual({
				'content-type': 'text/html',
				'x-api-key': '1',
			});
		});

		describe("AND responseHeaders contains: 'content-type: application/json'", () => {
			it("THEN its returned promise resolves to have parsed responseText under the 'data' prop", async () => {
				const xhrInstance = getFakeXhrInstance();
				const responseText = '{"a": 1}';
				const responseHeaders = "content-type: appliCation/json";
		
				const promise = xhrWrapper({
					xhrInstance
				});
	
				xhrInstance.mockReady({
					responseText,
					responseHeaders
				});
	
				expect((await promise).data).toStrictEqual({a: 1});
			});	
		});

	});

});
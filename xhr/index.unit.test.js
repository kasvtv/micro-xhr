const xhr = require('.');

const getFakeXhrInstance = () => {
	const obj = {
		open: jest.fn(),
		setRequestHeader: jest.fn(),
		getAllResponseHeaders: jest.fn(() => obj.responseHeaders || ''),
		send: jest.fn(),
		mockReady(toAdd = {}) {
			for (const key in toAdd) {
				obj[key] = toAdd[key];
			}

			obj.onreadystatechange();
		},
	};

	return obj;
};

describe("GIVEN XMLHttpRequest isn't overriden", () => {
	it('THEN uses the regular XMLHttpRequest constructor', () => {
		const result = xhr({});

		expect(result.xhr).toBeInstanceOf(XMLHttpRequest);
	});
});

describe('GIVEN XMLHttpRequest is mocked', () => {

	describe('WHEN fired', () => {

		it('THEN uses the mocked XMLHttpRequest instance', () => {
			const xhrInstance = getFakeXhrInstance();

			const result = xhr({
				xhrInstance,
			});

			expect(result.xhr).toBe(xhrInstance);
		});

		it("THEN returns a promise with the XHR instance on the 'xhr' key", () => {
			const xhrInstance = getFakeXhrInstance();

			const result = xhr({
				xhrInstance,
			});

			expect(result).toBeInstanceOf(Promise);
			expect(result.xhr).toBe(xhrInstance);
		});

	});

	describe('WHEN fired with header content-type: application/json', () => {
		it('THEN calls send with given JSON stringified data', () => {
			const xhrInstance = getFakeXhrInstance();
			const data = { a: 1, b: 22, c: 333 };

			xhr({
				xhrInstance,
				data,
				headers: {
					'content-type': 'application/json',
				},
			});

			expect(xhrInstance.send).toHaveBeenCalledWith(JSON.stringify(data));
		});
	});

	describe('WHEN fired using a no data', () => {
		it('THEN calls send with given data', () => {
			const xhrInstance = getFakeXhrInstance();

			xhr({
				xhrInstance,
			});

			expect(xhrInstance.send).toHaveBeenCalledWith(undefined);
		});
	});

	describe('WHEN no method specified', () => {
		it('THEN defaults to get', () => {
			const xhrInstance = getFakeXhrInstance();

			xhr({
				xhrInstance,
			});

			expect(xhrInstance.open.mock.calls[0][0]).toBe('get');
		});
	});

	describe('WHEN method is specified', () => {
		it('THEN uses it', () => {
			const xhrInstance = getFakeXhrInstance();

			xhr({
				xhrInstance,
				method: 'post',
			});

			expect(xhrInstance.open.mock.calls[0][0]).toBe('post');
		});
	});

	describe('WHEN url is specified', () => {
		it('THEN uses it', () => {
			const xhrInstance = getFakeXhrInstance();

			xhr({
				xhrInstance,
				url: 'https://google.com',
			});

			expect(xhrInstance.open.mock.calls[0][1]).toBe('https://google.com');
		});
	});

	describe('WHEN headers are specified', () => {
		it('THEN calls setRequestHeader for each header', () => {
			const xhrInstance = getFakeXhrInstance();

			xhr({
				xhrInstance,
				headers: {
					'x-api-key': '123',
					'content-type': 'text/html',
				},
			});

			expect(xhrInstance.setRequestHeader).toHaveBeenCalledWith('x-api-key', '123');
			expect(xhrInstance.setRequestHeader).toHaveBeenCalledWith('content-type', 'text/html');
		});
	});

	describe('WHEN the XMLHttpRequest reaches ready state', () => {

		it("THEN the return value resolves to have responseText under the 'data' prop", async () => {
			const xhrInstance = getFakeXhrInstance();
			const responseText = Symbol('mockResponse');

			const promise = xhr({
				xhrInstance,
			});

			xhrInstance.mockReady({ responseText });

			expect(await promise).toHaveProperty('data', responseText);
		});

		it("THEN the return value resolves to have status under the 'status' prop", async () => {
			const xhrInstance = getFakeXhrInstance();

			const promise = xhr({
				xhrInstance,
			});

			xhrInstance.mockReady({ status: 404 });

			expect(await promise).toHaveProperty('status', 404);
		});

		it("THEN the return value resolves to have parsed responseHeaders under the 'headers' prop", async () => {
			const xhrInstance = getFakeXhrInstance();
			const responseHeaders = 'Content-Type: text/html\nX-Api-Key: 1';

			const promise = xhr({
				xhrInstance,
			});

			xhrInstance.mockReady({ responseHeaders });

			expect((await promise).headers).toStrictEqual({
				'content-type': 'text/html',
				'x-api-key': '1',
			});
		});

		describe("AND responseHeaders contains: 'content-type: application/json'", () => {
			it("THEN its returned promise resolves to have parsed responseText under the 'data' prop", async () => {
				const xhrInstance = getFakeXhrInstance();
				const responseText = '{"a": 1}';
				const responseHeaders = 'content-type: appliCation/json';

				const promise = xhr({
					xhrInstance,
				});

				xhrInstance.mockReady({
					responseText,
					responseHeaders,
				});

				expect((await promise).data).toStrictEqual({ a: 1 });
			});
		});

		describe("AND responseHeaders contains: 'content-type: application/json' AND invalid JSON", () => {
			it("THEN its returned promise resolves to have parsed responseText under the 'data' prop", async () => {
				const xhrInstance = getFakeXhrInstance();
				const responseText = '{}}';
				const responseHeaders = 'content-type: appliCation/json';

				const promise = xhr({
					xhrInstance,
				});

				xhrInstance.mockReady({
					responseText,
					responseHeaders,
				});

				try {
					await promise;
				} catch (rejection) {
					expect(rejection.error).toBeInstanceOf(SyntaxError);
				}
			});
		});

	});

});
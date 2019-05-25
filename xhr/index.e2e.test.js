const xhrWrapper = require('.');

test('E2E HTTP request to httpstat.us', async () => {
	expect(
		await xhrWrapper({url: `http://httpstat.us/418`})
	).toMatchObject({
		status: 418,
		data: "418 I'm a teapot",
		headers: {
			'content-type': 'text/plain; charset=utf-8'
		}
	});
});

test('E2E HTTP request to jsonplaceholder.typicode.com', async () => {
	expect(
		await xhrWrapper({url: `http://jsonplaceholder.typicode.com/todos/1`})
	).toMatchObject({
		status: 200,
		data: {
			"id": 1,
		},
		headers: {
			'content-type': 'application/json; charset=utf-8',
		}
	});
});
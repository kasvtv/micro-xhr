const xhr = require('.');

test('E2E HTTP request to httpstat.us', async () => {
	expect(
		await xhr({
			url: 'http://httpstat.us/418',
		})
	).toMatchObject({
		status: 418,
		data: "418 I'm a teapot",
		headers: {
			'content-type': 'text/plain; charset=utf-8',
		},
	});
});

test('E2E HTTP request to jsonplaceholder.typicode.com', async () => {
	expect(
		await xhr({
			url: 'http://jsonplaceholder.typicode.com/posts/1',
			method: 'put',
			data: { someKey: 'someValue' },
		})
	).toMatchObject({
		status: 200,
		data: { id: 1, someKey: 'someValue' },
		headers: { 'content-type': 'application/json; charset=utf-8' },
	});
});
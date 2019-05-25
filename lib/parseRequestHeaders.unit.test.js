const parseRequestHeaders = require('./parseRequestHeaders');

describe('GIVEN an empty object', () => {
	it('THEN defaults content-type to application/json', () => {
		expect(parseRequestHeaders({}))
			.toHaveProperty('content-type', 'application/json');
	});
});

describe('GIVEN an object with content-type set', () => {

	describe('WHEN content-type is written lowercase', () => {
		it('THEN uses it', () => {

			expect(parseRequestHeaders({
				'content-type': 'text/html'
			})).toHaveProperty(
				'content-type', 'text/html'
			);

		});
	});

	describe('WHEN Content-Type is written mixed case', () => {
		it('THEN uses it', () => {

			expect(parseRequestHeaders({
				'Content-Type': 'text/html'
			})).toHaveProperty(
				'content-type', 'text/html'
			);

		});
	});

});

describe('GIVEN an object with multiple keys set', () => {

	describe('WHEN it contains keys that only differ in their casing', () => {
		it('THEN takes the latest key', () => {

			expect(parseRequestHeaders({
				'X-Auth-Token': '1',
				'x-auth-token': '2',
			})).toHaveProperty(
				'x-auth-token', '2'
			);

			expect(parseRequestHeaders({
				'x-auth-token': '1',
				'X-Auth-Token': '2',
			})).toHaveProperty(
				'x-auth-token', '2'
			);

		})
	});

	describe('WHEN it contains a multitude of different keys with arbitrary casing', () => {
		it('THEN returns all of them in lowercase', () => {

			expect(parseRequestHeaders({
				'X-Auth-Token': '1',
				'content-type': 'text/html',
				'X-REQUESTED-BY': 'Me!'
			})).toMatchObject({
				'x-auth-token': '1',
				'content-type': 'text/html',
				'x-requested-by': 'Me!',
			});

		})
	});

});
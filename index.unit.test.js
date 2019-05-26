jest.mock('./xhr', () => x => Promise.resolve(x));

const xhrRequest = require('.'); //?

describe('GIVEN status is between 200 and 299', () => {
	it('THEN resolves to the underlying result', async () => {

		expect(await xhrRequest({ status: 200 })).toStrictEqual({ status: 200 });
		expect(await xhrRequest({ status: 299 })).toStrictEqual({ status: 299 });

	});
});

describe('GIVEN status is outside of 200 until 299', () => {
	it('THEN rejects to the underlying result', async () => {

		try {
			await xhrRequest({ status: 199 });
		} catch (caught) {
			expect(caught).toStrictEqual({ status: 199 });
		}

		try {
			await xhrRequest({ status: 300 });
		} catch (caught) {
			expect(caught).toStrictEqual({ status: 300 });
		}

	});
});
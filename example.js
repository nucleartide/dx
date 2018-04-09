const { dx } = require('.');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
	let [res, err] = dx(() => JSON.parse('fail'));
	if (err !== null) {
		console.error(err.stack);
	}

	const sleepThenFail = async (seconds) => {
		await sleep(seconds * 1000);
		throw new Error('fail');
	};

	[res, err] = await dx(sleepThenFail, 1);
	if (err !== null) {
		console.error(err.stack);
	}
})();

const { dx } = require('.')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function sleepThenFail(ms) {
  await sleep(ms)
  throw new Error('fail')
}

;(async function main() {
	let [res, err] = dx(JSON.parse)('fail')
	if (err) {
		console.error(err.stack)
	}

	[res, err] = await dx(sleepThenFail)(1000)
	if (err) {
		console.error(err.stack)
	}
})()

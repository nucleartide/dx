const { dx } = require('.')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

async function sleepThenFail(ms) {
  await sleep(ms)
  throw new Error('fail')
}

class Dog {
  constructor() {
    this.species = 'shiba inu'
  }

  async eatFood() {
    if (!this || !this.species) throw new Error('Forgot to bind method.')
    await sleepThenFail(1000)
  }
}

;(async function main() {
  const [res, err] = dx(JSON.parse)('fail')
  if (err) {
    console.error(err.stack)
  }

  const [res2, err2] = await dx(sleepThenFail)(1000)
  if (err2) {
    console.error(err2.stack)
  }

  const d = new Dog
  const [res3, err3] = await dx(d.eatFood, d)()
  if (err3) {
    console.error(err3.stack)
  }
})()

# dx

JavaScript without `try...catch`.

<br>

## Motivation

JavaScript expects you to handle errors with `try...catch`, but the syntax is somewhat inconvenient:

#### 1. You have to declare result variables _separately_ from your function calls.

```js
const userInput = 'fail'

let json
try {
  json = JSON.parse(userInput)
} catch (err) {
  console.error(err.stack)
}

// Do something with `json`...
```

Since we declare `json` separately, we can't declare `json` as a `const` binding.

#### 2. `try...catch` promotes catch-all error handling.

```js
try {
  // A bunch of stuff happens...
  // ...
  // ...
} catch (err) {
  console.log('welp')
  console.error(err.stack)
}
```

You might want to handle errors in a more fine-grained way. But then you run into the verbosity of problem 1.

<br>

## Enter `dx`

`dx` is a micro utility (it's just a few lines) that addresses the two pain points above.

```js
import { dx } from '@nucleartide/dx'

const [res, err] = dx(JSON.parse)('invalid json')
if (err) {
  console.error(err.stack)
}
```

It allows you to place your declaration and function call on the same line. And it promotes a granular, _per-function_ error handling style.

It also works with async functions:

```js
import { dx } from '@nucleartide/dx'

function asyncHello(name) {
  return Promise.reject(`hello ${name}`)
}

;(async () => {
  const [res, err] = await dx(asyncHello)('jesse')
  if (err) {
    console.error(err.stack)
  }
})
```

<br>

## Convinced?

```bash
npm install @nucleartide/dx
```

<br>

## License

MIT

---

> Jason Tu · GitHub [@nucleartide](https://github.com/nucleartide) · Twitter [@nucleartide](https://twitter.com/nucleartide)

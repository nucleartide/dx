/*::
type Args     = Array<any>;
type Callback = (...Args) => any;
*/

exports.dx = (cb /*: Callback */, ...args /*: Args */) => {
	try {
		const res = cb(...args);
		if (res && typeof res.then === 'function') {
			res
			.then(res  => ([res, null]))
			.catch(err => ([null, err]))
			;
		}
		return [res, null];
	} catch (err) {
		return [null, err];
	}
};

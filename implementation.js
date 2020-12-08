import isIterable from 'is-iterable';

class AggregateError extends Error {
	constructor(errors, message = '') {
		super(message);
		if (!Array.isArray(errors) && !isIterable(errors)) {
			throw new TypeError(`${errors} is not an iterable`);
		}
		this.errors = [...errors];
	}
}

export default AggregateError;

/* Original test suite: https://github.com/es-shims/AggregateError/blob/main/test/tests.js */

import assert from 'assert';
import AggregateError, { preferNative } from '../index';

before(function () {
	window.fixture.load('/test/fixtures/index.html');
});

after(function () {
	window.fixture.cleanup();
});

it('should test constructor', function () {
	assert.equal(typeof AggregateError, 'function', 'is a function');
	assert.equal(AggregateError.length, 2, 'AggregateError has a length of 2');
	assert.equal(
		AggregateError.name,
		'AggregateError',
		'AggregateError has name "AggregateError"'
	);
	assert.equal(
		AggregateError.prototype.message,
		'',
		'"message" is an empty string on the prototype'
	);
});

it('should handle non-iterable errors', function () {
	/* eslint-disable no-undefined */
	[
		undefined,
		null,
		true,
		false,
		42,
		NaN,
		0,
		-0,
		Infinity,
		function () {},
		{}
	].forEach((nonIterable) => {
		assert.throws(
			() => {
				return new AggregateError(nonIterable);
			},
			TypeError,
			`${nonIterable} is not an iterable`
		);
	});
});

it('should test instance', function () {
	const one = new TypeError('one!');
	const two = new EvalError('two!');
	const errors = [one, two];
	const message = 'i am an aggregate error';
	const error = new AggregateError(errors, message);
	const isIE9 = document.all && document.addEventListener && !window.atob;

	if (!isIE9) {
		assert.equal(
			error instanceof AggregateError,
			true,
			'error is an instanceof AggregateError'
		);
	}

	assert.equal(error instanceof Error, true, 'error is an instanceof Error');
	assert.equal(error.message, message, 'error.message is expected');

	assert.notEqual(
		error.errors,
		errors,
		'error.errors is !== provided errors'
	);
	assert.deepEqual(
		error.errors,
		errors,
		'error.errors is deeply equal to provided errors'
	);
});

it('should use native implementation if it’s available', function () {
	assert.equal(
		preferNative.name,
		'AggregateError',
		'AggregateError has name "AggregateError"'
	);
});

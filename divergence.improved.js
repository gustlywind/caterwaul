// Divergence Improved | Spencer Tipping
// Licensed under the terms of the MIT source code license

(function (global_eval) {
  var dprime = typeof d === 'undefined' ? function () {return apply.apply (this, arguments)} : d;
  d = dprime;

// Wrappers.
// Specifies function transforms for all of the basic datatypes. Analogous to Divergence's .fn() method, d() returns a function for each of them. The conversions are roughly the same as before,
// though with more versatility:

//   Strings.   These are evaluated as function body expressions, just like they are in the first version of Divergence. However, further parameters can be passed to preserve closure state or to
//              rename variables. For example, you can now specify things like this: 'x + $0', with the hash {x: 5}; this creates a local let-binding.
//   Numbers.   These are mapped as before; 0 to arguments[0], 1 to arguments[1], etc.
//   Arrays.    A componentwise homomorphic container for other types. d() is invoked on each element, and the resulting function returns an array of each result.
//   Hashes.    A value-wise homomorphic container for other types. d() is called on each value.
//   Booleans.  Maps to d(0) if true, false if false. This serves as an 'and' map, basically.
//   RegExps.   Maps to the .exec() method. This has the advantage that a match returns an array, whereas a failed match returns null.
//   Functions. Normally are returned identically. However, further options may be provided to decompile and transform the function; alter its binding, or preload arguments.

// New bindings that weren't possible before are these:

//   Undefined. Returns a function which always returns undefined.
//   Null.      Returns a function which always returns null.



// Standard methods.



}) (function () {return eval(arguments[0])});

// Generated by SDoc 
// First-class destructuring binds | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// Lots of languages support destructuring binds of some sort, and many have pattern matching. Caterwaul wouldn't be awesome if it didn't have these things, so I'm taking it one step further by
// adding first-class destructuring binds and pattern matching. The difference here is that most languages have a hard time letting you specify an arbitrary language for unpacking. Caterwaul, on
// the other hand, supports this by bridging the barrier between syntax and runtime code. (For this reason it is quite slow and ends up being memoized.)

// This isn't quite as trivial as it sounds. The hardest problem is knowing ahead-of-time which variables end up getting bound. For example:

// | value /match[ {foo: bar} > bar
//               | {bif: baz} > baz + 1]

// This fails because the value being bound isn't obvious. That is, 'bar' in the first expression and 'baz' in the second might refer to closure variables, not to the destructuring-bind value;
// and until the resolution is done at runtime it isn't clear what these variables should mean. We also don't have the luxury of compiling arbitrary code at runtime since the scope is presumably
// inaccessible (and it would be hideously slow). So the notation must have two properties:

// | 1. Newly-bound variables must be statically enumerable from a pattern (so that we don't dynamically compile the expansion).
//   2. Variables must derive their values in a pure way (so that the destructuring function can be dynamically compiled and memoized).

//   Syntax.
//   Matching is done sequentially; if the first case matches, then take it; otherwise proceed to the second and so forth. It's similar to a Lisp (cond ...) form this way. So there is clearly a
//   sequence component, and that probably makes sense to denote using commas.

//   The more difficult aspect is the infix binding operator. This should be very low precedence, something like =, but work even with rvalue (unassignable) left operands.

//   | value /match[qd[{foo: bar}]  = 5,
//                  qd[[1, 2, bar]] = 10]

//   This is nice. qd[] is a new macro for 'quote destructure', which at compile-time gives you some information. First, it tells you what the wildcards are. These are all guaranteed to be bound
//   if the form matches.
// Generated by SDoc 

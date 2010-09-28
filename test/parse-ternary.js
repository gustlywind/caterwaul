// Ternary operator tests.

var p = function (s, i) {return eq(caterwaul.parse(s).inspect(), i)},
    s = function (s, i) {return eq(caterwaul.parse(s).serialize(), i)};

p('3?4:5', '(? (3) (4) (5))');
p('3+4?5:6', '(? (+ (3) (4)) (5) (6))');
p('(3)?4:5', '(? (( (3)) (4) (5))');
p('3?(4):5', '(? (3) (( (4)) (5))');

p('var x = cond() === false ? y === true : y === false', '(var (= (x) (? (=== (() (cond) (()) (false)) (=== (y) (true)) (=== (y) (false)))))');

s('var x = foo() ? (foo + bar)() : (t + u)()', 'var x=foo()?(foo+bar)():(t+u)()');

// Generated by SDoc 
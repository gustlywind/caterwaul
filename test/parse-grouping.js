// Grouping construct parsing.

var p = function (s, i) {return eq(caterwaul.parse(s).inspect(), i)},
    s = function (s, i) {return eq(caterwaul.parse(s).serialize(), i)};

p('(3)[4]', '([] (( (3)) ([ (4)))');
p('([3])', '(( ([ (3)))');
p('([{3}])', '(( ([ ({ (3))))');

// Generated by SDoc 
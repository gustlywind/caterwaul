// Divergence Improved | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Divergence Improved implements a very small Lisp in JavaScript syntax. The syntax ends up looking much more like McCarthy's M-expressions than traditional S-expressions, due to the ease of
// embedding those in a JS-compatible grammar. Also, JavaScript convention makes square-bracket calls such as qs[foo] relatively uncommon, so I'm using that as the macro syntax (though of course
// you can define macros with other forms as well).

// By default, the only thing Divergence does is provide a quotation operator. For example:

// | divergence(function () {
//     return qs[x + 1];
//   });

// This function returns a syntax tree representing the expression 'x + 1'. The standard library provides additional constructs to enable macros and easy macro definitions.

(function () {

// Global management.
// Divergence creates a global symbol, divergence. Like jQuery, there's a mechanism to get the original one back if you don't want to replace it. You can call divergence.deglobalize() to return
// divergence and restore the global that was there when Divergence was loaded.

  var _divergence = this.divergence,                                                    fn = function () {return eval('(function($0, $1, $2, $3, $4){return ' + arguments[0] + '})')},
       divergence = fn('divergence.init.apply(this, arguments)'),                   gensym = (function (n) {return function () {return 'gensym' + (++n).toString(36)}}) (0),
               qw = fn('$0.split(/\\s+/)'),                                         intern = (function (st, n) {return function (x) {return st[x] || (st[x] = ++n)}}) ({}, 0),
              own = Object.prototype.hasOwnProperty,                                   has = fn('own.call($0, $1)'),

              map = function (f, xs) {for (var i = 0, ys = [], l = xs.length; i < l; ++i) ys.push(f(xs[i])); return ys},
             hash = function (f) {return (function (s) {for (var i = 0, xs = qw(s), o = {}, l = xs.length; i < l; ++i) o[xs[i]] = true; return o})},

                                                                                  q_insert = fn('(this.left = $0).right = this, (this.right = $1).left = this'),
                                                                                  q_remove = fn('this.left.right = this.right, this.right.left = this.left, this'),
                                                                                  q_create = fn('this.left = $0, this.right = $1, this'),

     reduce_order = map(hash, ['[] . ()', 'new', 'l++ r++ l-- r-- typeof ~ ! u+ u-', '* / %', '+ -', '<< >> >>>', '< > <= >= instanceof in', '== != === !==', '&', '^', '|', '&&', '||', '?',
                               '= += -= *= /= %= &= |= ^= <<= >>= >>>=', ',']),

            right = hash('= += -= *= /= %= &= ^= |= <<= >>= >>>= ~ ! new typeof u+ u- l++ r++ l-- r-- ?'),
           prefix = hash('if function catch for switch with while do'),

// Old Rebase code that I'm keeping for reference. This will be gone in production:

// |                  unary: set(qw('u++ u-- ++ -- u+ u- u! u~ new typeof var case try finally throw return case else delete void import export ( [ { ?:')),
//                syntactic: set(qw('case var if while for do switch return throw delete export import try catch finally void with else function new typeof in instanceof')),
//                statement: set(qw('case var if while for do switch return throw delete export import try catch finally void with else')),
//                connected: set(qw('else catch finally')),                                                                       digit: set('0123456789.'.split('')),
//                    ident: set('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$_'.split ('')),                  punct: set('+-*/%&|^!~=<>?:;.,'.split ('')),
//                    right: set(qw('= += -= *= /= %= &= ^= |= <<= >>= >>>= u~ u! new typeof u+ u- u++ u-- ++ -- ?')),          openers: {'(':')', '[':']', '{':'}', '?':':'},
//      implicit_assignment: set(qw('++ -- u++ u--')),                                                                       sandwiches: set(qw('$ $$ $$$ _ __ ___ _$ _$$ __$')),
//                  literal: set(qw('= ++ -- u++ u-- (! [! . ?: , ? u! ( { [ === !== == != ; : && ||')),                   sandwich_ops: set(qw('+ - * / % ^ | & << >> >>> < >')),
//            prefix_binary: set(qw('if function catch for switch with while')),                                                closers: {')':'(', ']':'[', '}':'{', ':':'?:'},
//             translations: {'u+':'+', 'u-':'-', 'u~':'~', 'u!':'!', 'u--':'--', 'u++':'++'},                                 arity_of: '$0.unary[$1] ? 1 : $1 == "?" ? 3 : 2'.fn(r),
//            lvalue_assign: set(qw('+= -= *= /= %= ^= |= &= <<= >>= >>>=')),                                            should_convert: '! ($0.literal[$1] || $0.syntactic[$1])'.fn(r),
//                no_spaces: set(qw('.')),

// Lexing.
// The lexer is for the most part straightforward. The only tricky bit is regular expression parsing, which requires the lexer to contextualize operators and operands. I've implemented this logic
// with an re flag that indicates whether the last token processed was an operator (if so, then we're expecting an operand and the next / delineates a regular expression).

// We mark the position before a token and then just increment the position. The token, then, can be retrieved by taking a substring from the mark to the position. This eliminates the need for
// intermediate concatenations. In a couple of cases I've gone ahead and done them anyway -- these are for operators, where we grab the longest contiguous substring that is defined. I'm not to
// worried about the O(n^2) complexity due to concatenation; they're bounded by four characters.

// OK, so why use charAt() instead of regular expressions? It's a matter of asymptotic performance. V8 implements great regular expressions (O(1) in the match length for the (.*)$ pattern), but
// the substring() method is O(n) in the number of characters returned. Firefox implements O(1) substring() but O(n) regular expression matching. Since there are O(n) tokens per document of n
// characters, any O(n) step makes lexing quadratic. So I have to use the only reliably constant-time method provided by strings, charAt() (or in this case, charCodeAt()).

// Of course, building strings via concatenation is also O(n^2), so I also avoid that for any strings that could be long. This is achieved by using a mark to indicate where the substring begins,
// and advancing i independently. The span between mark and i is the substring that will be selected, and since each substring both requires O(n) time and consumes n characters, the lexer as a
// whole is O(n). (Though perhaps with a large constant.)

//   Precomputed table values.
//   The lexer uses several character lookups, which I've optimized by using integer->boolean arrays. The idea is that instead of using string membership checking or a hash lookup, we use the
//   character codes and index into a numerical array. This is guaranteed to be O(1) for any sensible implementation, and is probably the fastest JS way we can do this. For space efficiency, only
//   the low 256 characters are indexed. High characters will trigger sparse arrays, which may degrade performance.

          lex_table = function (s) {for (var i = 0, xs = []; i < 256; ++i) xs.push(false); for (var i = 0, l = s.length; i < l; ++i) xs[s.charCodeAt(i)] = true; return xs},
             lex_op = hash('. new ++ -- typeof ~ ! * / % + - << >> >>> < > <= >= instanceof in == != === !== & ^ | && || ? = += -= *= /= %= &= |= ^= <<= >>= >>>= : ,'),
            lex_exp = lex_table('eE+-'),                    lex_digit = lex_table('0123456789.'),  lex_ident = lex_table('$_abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'),
          lex_space = lex_table(' \n\r\t'),               lex_bracket = lex_table('()[]{}'),      lex_opener = lex_table('([{'),          lex_punct = lex_table('+-*/%&|^!~=<>?:;.,'),
            lex_eol = lex_table('\n\r'),            lex_regexp_suffix = lex_table('gims'),         lex_quote = lex_table('\'"'),          lex_slash = '/'.charCodeAt(0),
           lex_star = '*'.charCodeAt(0),                     lex_back = '\\'.charCodeAt(0),

//   Variable names.
//   s, obviously, is the string being lexed. mark indicates the position of the stream, while i is used for lookahead. The difference is later read into a token and pushed onto the result. c is
//   an array of character codes in s, such that cs[i] === s.charCodeAt(i). c is a temporary value used to store the current character code. re is true iff a slash would begin a regular
//   expression, otherwise false. esc is a flag indicating whether the next character in a string or regular expression literal is escaped. exp indicates whether we've seen the exponent marker in
//   a number. close is used for parsing single and double quoted strings; it contains the character code of the closing quotation mark. t is the token to be appended to ts, which is the
//   resulting token array. If t === false, then nothing is appended to the resulting array.

                lex = divergence.lex = function (s) {
                  var s = s.toString(), mark = 0, cs = [], c = 0, re = true, esc = false, exp = false, close = 0, t = '', ts = [];
                  for (var i = 0, l = s.length; i < l || (i = 0); ++i) cs.push(s.charCodeAt(i));
                  while (i < l) {
                    while (lex_space[c = cs[i]] && i < l) ++i;
                    esc = exp = false;
       if                                              (lex_bracket[c])                                                                           re = lex_opener[c],            t = ! ++i;
  else if       (c === lex_slash && cs[i + 1] === lex_star && (i += 2)) {while                 (cs[++i] !== lex_slash || cs[i - 1] !== lex_star);                                t = ! ++i}
  else if                  (c === lex_slash && cs[i + 1] === lex_slash) {while                                              (! lex_eol[cs[++i]]);                                t = false}
  else if               (c === lex_slash && re && ! (re = ! (t = '/'))) {while                              ((c = cs[++i]) !== lex_slash || esc)  esc = ! esc && c === lex_back;
                                                                         while                                      (lex_regexp_suffix[cs[++i]]);                                t = true}
  else if (lex_quote[c] && (close = c) && ! (re = ! (t = s.charAt(i)))) {while                                  ((c = cs[++i]) !== close || esc)  esc = ! esc && c === lex_back; t = true}
  else if          (lex_punct[c] && (t = re ? 'u' : '') && (re = true))  while                      (lex_punct[c = cs[i]] && has(lex_op, t + c))  t += c, ++i;
  else if                              (lex_digit[c] && ! (re = false)) {while (lex_digit[c = cs[++i]] && ! (exp && (exp |= lex_exp[c] && ++i))); t = true}
  else                                                                  {while                                          (lex_ident[c = cs[++i]]); re = has(precedence, t = true)}
                    t !== false && ts.push(t === true ? s.substring(mark, i) : t);
                  }
                  return ts};

// Parsing.
// (in a bit)


  return divergence}) ();

// Generated by SDoc 
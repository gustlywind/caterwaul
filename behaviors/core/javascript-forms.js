// Javascript macro forms | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Introduction.
// This module creates macro forms optimized for hand-coded Javascript. They won't work well at all for Coffeescript or other variants that don't support the side-effect comma operator.

  caterwaul.configuration('core.js', function () {

// Modifier forms.
// These are designed to be fairly unusual in normal Javascript code (since we don't want collisions), but easy to type. Multiple precedence levels are provided to make it easier to avoid
// having to use grouping operators.

    this.modifier_form('it in _expression', 'it[_expression]', '_expression |it', '_expression -it', '_expression /it', '_expression.it').
         parameterized_modifier_form('it[_modifiers][_expression]', 'it[_modifiers] in _expression', 'it._modifiers[_expression]', 'it._modifiers in _expression',
                                     '_expression, it[_modifiers]', '_expression |it[_modifiers]', '_expression /it[_modifiers]', '_expression -it[_modifiers', '_expression -it- _modifiers',
                                     '_expression, it._modifiers',  '_expression |it._modifiers',  '_expression /it._modifiers',  '_expression -it._modifiers', '_expression <it> _modifiers');

// Javascript-specific shorthands.
// Javascript has some syntactic weaknesses that it's worth correcting. These don't relate to any structured macros, but are hacks designed to make JS easier to use.

//   Javascript intrinsic verbs.
//   These are things that you can do in statement mode but not expression mode.

    this.macro('wobbly[_x]', '(function () {throw _x}).call(this)');

//   String interpolation.
//   Javascript normally doesn't have this, but it's straightforward enough to add. This macro implements Ruby-style interpolation; that is, "foo#{bar}" becomes "foo" + bar. A caveat (though not
//   bad one in my experience) is that single and double-quoted strings are treated identically. This is because Spidermonkey rewrites all strings to double-quoted form.

//   This version of string interpolation is considerably more sophisticated than the one implemented in prior versions of caterwaul. It still isn't possible to reuse the same quotation marks
//   used on the string itself, but you can now include balanced braces in the interpolated text. For example, this is now valid:

//   | 'foo #{{bar: "bif"}.bar}'

//   There are some caveats; if you have unbalanced braces (even in substrings), it will get confused and misread the boundary of your text. So stuff like this won't work properly:

//   | 'foo #{"{" + bar}'          // won't find the ending properly and will try to compile the closing brace

    this.macro('_string', function (match) {
      var s = match._string.data, q = s.charAt(0);
      if (q !== '\'' && q !== '"' || ! /#\{[^\}]+\}/.test(s)) return false;             // DeMorgan's applied to (! ((q === ' || q === ") && /.../test(s)))

      for (var pieces = [], i = 1, l = s.length - 1, brace_depth = 0, got_hash = false, start = 1, c; i < l; ++i)
        if (brace_depth) if ((c = s.charAt(i)) === '}')  --brace_depth || pieces.push(s.substring(start, i)) && (start = i + 1), got_hash = false;
                         else                            brace_depth += c === '{';
        else             if ((c = s.charAt(i)) === '#')  got_hash = true;
                         else if (c === '{' && got_hash) pieces.push(s.substring(start, i - 1)), start = i + 1, ++brace_depth;
                         else                            got_hash = false;

      pieces.push(s.substring(start, l));

      for (var escaped = new RegExp('\\\\' + q, 'g'), i = 0, l = pieces.length; i < l; ++i) if (i & 1) pieces[i] = this.parse(pieces[i].replace(escaped, q)).as('(');
                                                                                            else       pieces[i] = new this.syntax(q + pieces[i] + q);
      return new this.syntax('+', pieces).unflatten().as('(')});

//   Destructuring function creation.
//   This is a beautiful hack made possible by Internet Explorer. We can intercept cases of assigning into a function and rewrite them to create a function body. For example, f(x) = y becomes the
//   regular assignment f = function (x) {return y}. Because this macro is repeatedly applied we get currying for free.

    this.macro('_left(_args) = _right', '_left = (function (_args) {return _right})')});
// Generated by SDoc 

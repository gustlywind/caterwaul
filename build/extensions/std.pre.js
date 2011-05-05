 (function($) {$.anonymizer=function( ) {for(var translation_table= { } ,i=0,l=arguments.length;
i<l;
 ++i)translation_table[arguments[i] ] =$.gensym() ;
return function(node) {return node.replace(translation_table) } } } ) (caterwaul) ;
 (function($) {var loop_anon=$.anonymizer( 'i' , 'l' , 'xs' , 'result' ) ;
$.word_macros=function(language) {return[language.modifier( 'qs' ,function(match) {return new $.ref(match._expression) } ) ,language.modifier( 'qse' ,function(match) {return new $.ref(this.expand(match._expression) ) } ) ,language.parameterized_modifier( 'given' , 'from' , 'fn' , '(function (_parameters) {return _expression})' ) ,language.parameterized_modifier( 'bgiven' , 'bfrom' , 'fb' , '(function (t, f) {return (function () {return f.apply(t, arguments)})})(this, (function (_parameters) {return _expression}))' ) ,language.parameterized_modifier( 'effect' , 'se' , '(function (it) {return (_parameters), it}).call(this, (_expression))' ) ,language.parameterized_modifier( 'then' , 're' , 'returning' , '(function (it) {return (_parameters)}).call(this, (_expression))' ) ,language.parameterized_modifier( 'where' , 'bind' , '(function () {var _parameters; return (_expression)}).call(this)' ) ,language.parameterized_modifier( 'when' , '((_parameters) && (_expression))' ) ,language.parameterized_modifier( 'unless' , '(! (_parameters) && (_expression))' ) ,language.parameterized_modifier( 'otherwise' , '((_expression) || (_parameters))' ) ,language.parameterized_modifier( 'when_defined' , '((_parameters) != null && (_expression))' ) ,language.parameterized_modifier( 'unless_defined' , '((_parameters) == null && (_expression))' ) ,language.parameterized_modifier( 'over' ,loop_anon( '(function () {for (var xs = (_parameters), result = [], i = 0, l = xs.length, it; i < l; ++i)' + 'it = xs[i], result.push(_expression); return result}).call(this)' ) ) ,language.parameterized_modifier( 'over_keys' ,loop_anon( '(function () {var x = (_parameters), result = []; ' + 'for (var it in x) Object.prototype.hasOwnProperty.call(x, it) && result.push(_expression); return result}).call(this)' ) ) ,language.parameterized_modifier( 'over_values' ,loop_anon( '(function () {var x = (_parameters), result = [], it; ' + 'for (var k in x) Object.prototype.hasOwnProperty.call(x, k) && (it = x[k], result.push(_expression));' + 'return result}).call(this)' ) ) ,language.parameterized_modifier( 'until' ,loop_anon( '(function () {var result = []; while (! (_parameters)) result.push(_expression); return result}).call(this)' ) ) ] } } ) (caterwaul) ;
 (function($) {$.js=function( ) {var macro=function(name,expander) {return function(template) {return $.macro($.parse(template) .replace( {_modifiers:$.parse(name) } ) ,expander) } } ;
var macros=function(name,expander) {return function(template) {return result.modifier($.parse(template) .replace( {_modifiers:$.parse(name) } ) ,expander) } } ;
var result= {modifier:this.right_variadic(function(name,expander) {return $.map(macro(name,expander) , [ '_expression /_modifiers' , '_expression -_modifiers' , '_expression |_modifiers' , '_expression._modifiers' , '_modifiers[_expression]' , '_modifiers in _expression' ] ) } ) ,parameterized_modifier:this.right_variadic(function(name,expander) {return[$.map(macros(name,expander) , [ '_modifiers[_parameters]' , '_modifiers._parameters' ] ) ,$.map(macro(name,expander) , [ '_expression <_modifiers> _parameters' , '_expression -_modifiers- _parameters' ] ) ] } ) ,macros: [this.macro( 'wobbly[_x]' , '(function () {throw _x}).call(this)' ) ,function(node) {var s=node.data,q=s.charAt(0) ,syntax=$.syntax;
if(q!== '\'' &&q!== '"' || ! /#\{[^\}]+\}/ .test(s) )return false;
for(var pieces= [ ] ,i=1,l=s.length-1,brace_depth=0,got_hash=false,start=1,c;
i<l;
 ++i)if(brace_depth)if( (c=s.charAt(i) ) === '}' ) --brace_depth||pieces.push(s.substring(start,i) ) && (start=i+1) ,got_hash=false;
else brace_depth+=c=== '{' ;
else if( (c=s.charAt(i) ) === '#' )got_hash=true;
else if(c=== '{' &&got_hash)pieces.push(s.substring(start,i-1) ) ,start=i+1, ++brace_depth;
else got_hash=false;
pieces.push(s.substring(start,l) ) ;
for(var escaped=new RegExp( '\\\\' +q, 'g' ) ,i=0,l=pieces.length;
i<l;
 ++i)pieces[i] =i&1?$.parse(pieces[i] .replace(escaped,q) ) .as( '(' ) :new syntax(q+pieces[i] +q) ;
return new syntax( '+' ,pieces) .unflatten() .as( '(' ) } ,this.macro( '_left(_args) = _right' , '_left = (function (_args) {return _right})' ) ,this.macro( '_left(_var = arguments) = _right' , '_left = (function () {var _var = arguments; return _right})' ) ] } ;
return result} } ) (caterwaul) ;
caterwaul.js_base=function( ) {var js=this.js() ;
return this.clone() .macros(this.word_macros(js) ,js.macros) } ;

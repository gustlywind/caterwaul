caterwaul.module( 'waul' , (function (qs,qs1,qs2,qs3,qs4,qs5,qs6,qs7) {var result= ( function ($) { (function () {var main =function () { ; return( (function (xs1) {var x1, x01, xi1, xl1, xr1;for (var xi1 = 0, xl1 = xs1.length; xi1 < xl1; ++xi1) x1 = xs1[xi1] , (evaluate_extension(x1)) ; return xs1}) .call(this, (function (xs1) {var x1, x01, xi1, xl1, xr1;for (var xr1 = new xs1.constructor() , xi1 = 0, xl1 = xs1.length; xi1 < xl1; ++xi1) x1 = xs1[xi1] , xr1.push( (extension_tree(x1))) ; return xr1}) .call(this, options.extensions)) , main_action())} , main_action =function () { ; return options.replicate ? replicate(): options.input_files.length ? (function (xs1) {var x1, x01, xi1, xl1, xr1;for (var xi1 = 0, xl1 = xs1.length; xi1 < xl1; ++xi1) x1 = xs1[xi1] , (waul(x1)) ; return xs1}) .call(this, options.input_files): waul_repl()} , fs = require( 'fs') , options = (function (it) {return process.argv[2] === '-x' || process.argv[2] === '--execute' ? it.input_files = [process.argv[3]
                                           ]: (function (xs) {var x, x0, xi, xl, xr;for (var xi = 0, xl = xs.length; xi < xl; ++xi) x = xs[xi] , (x === '--extension' || x === '-e' ? ( it.extensions) .push( xs[ ++xi]): x === '--output' || x === '-o' ? it.output_pattern = xs[ ++xi]: x === '--no-table' || x === '-T' ? it.expression_ref_table = false: x === '--replicate' || x === '-r' ? it.replicate = true: x === '--stdin' ? it.simple_repl = true: x === '--configure' || x === '-c' ? it.configuration = xs[ ++xi]: ( it.input_files) .push( x)) ; return xs}) .call(this, process.argv.slice(2)) , it}) .call(this, ( (function (it) {return it.input_files = [] , it}) .call(this, ( {extensions: [] , input_files: [] , output_pattern: '$1$2.js' , configuration: '' , use_std: true, expression_ref_table: true, simple_repl: false})))) , waul_input =function (filename) { ; return(function (it) {return/\.sdoc$/i .test(filename) ? (function (it) {return it.join( '\n')}) .call(this, ( (function (xs) {var x, x0, xi, xl, xr;for (var xr = new xs.constructor() , xi = 0, xl = xs.length; xi < xl; ++xi) x = xs[xi] , ( /^\s*[A-Z|]/ .test(x)) || xr.push(x) ; return xr}) .call(this, it.split( /(?:\n\s*)+\n/)))): it}) .call(this, ( fs.readFileSync(filename, 'utf8')))} , extension_tree =function (filename) { ; return new $.opaque_tree(waul_input(filename))} , evaluate_extension =function (e) { ; return $.compile( (qs) .replace( {_e: e}) , {caterwaul: $, require: require})} , replicate =function () { ; return process.stdout.write( '#!/usr/bin/env node\n' + '// Waul precompiler (or derivative), copyright 2012 Spencer Tipping\n' + '// Licensed under the terms of the MIT source code license\n' + '// http://github.com/spencertipping/caterwaul\n\n' + $.replicator())} , immediate_pattern =qs1, module_pattern =qs2, module_pattern_explicit =qs3, module_pattern_identity =qs4, module_template =qs5, offline_pattern =qs6, offline_template =qs7, output_for =function (filename) { ; return filename.replace( /^((?:.*\/)?)((?:(?!\.waul(?:\.sdoc)?)[^\/])+)(\.waul(?:\.sdoc)?)?/ , options.output_pattern)} , waul_output =function (input_file, t) { ; return fs.writeFileSync(output_for(input_file) , t.toString() , 'utf8')} , waul =function (input_file) { ; return waul_process( input_file, $.parse(waul_input(input_file)) .as( ';'))} , waul_process =function (file, tree) { ; return(function (it) {return it ? waul_run(it): (function (it) {return it ? waul_transform(file, it, module_template): (function (it) {return it ? waul_identity(file, it): (function (it) {return it ? waul_transform(file, it, offline_template): (function () {throw new Error( ( 'waul: unrecognized toplevel construct in ' + (file) + ''))}) .call(this)}) .call(this, ( ( offline_pattern) .match( tree)))}) .call(this, ( ( module_pattern_identity) .match( tree)))}) .call(this, ( ( module_pattern) .match( tree) || ( module_pattern_explicit) .match( tree)))}) .call(this, ( ( immediate_pattern) .match( tree)))} , introduce =function () { ; return process.stderr.write( 'Waul precompiler or derivative (repl mode), copyright 2012 Spencer Tipping\n' + 'Licensed under the terms of the MIT source code license\n' + 'http://github.com/spencertipping/caterwaul\n')} , waul_node_repl =function () { ; return(function () {var evaluator =function (s, _1, _2, cc) { ; return(function () {try {return cc(null, instance(s, {$: $, caterwaul: $, require: require}))} catch (e) {return cc(e, undefined)}}) .call(this)} , instance = $(options.configuration) ; return( introduce() , require( 'repl') .start( 'waul> ' , undefined, evaluator))}) .call(this)} , waul_simple_repl =function () { ; return(function () {var instance = $(options.configuration) ; return( ( ( introduce() , process.stdin.on( 'data' , (function (s) {return(function () {try {return(function (it) {return process.stderr.write( ( '' + (it) + '\n') , 'utf8')}) .call(this, ( ( require( 'util')) .inspect( instance(s, {$: $, caterwaul: $, require: require}))))} catch (e) {return process.stderr.write( ( 'Error: ' + (e) + ''))}}) .call(this)}))) , ( process.stdin) .setEncoding( 'utf8')) , process.stdin.resume())}) .call(this)} , waul_repl =function () { ; return options.simple_repl ? waul_simple_repl(): waul_node_repl()} , waul_identity =function (file, m) { ; return waul_output( file, m._)} , waul_transform =function (file, m, t) { ; return(function () {var transformed_function = (function (it) {return it.replace($.gensym_rename_table(it))}) .call(this, ($.late_bound_tree( $(m._transform.as_escaped_string()) (m._function) , null, options))) ; return waul_output( file, t.replace( {_name: m._name, _compiled: transformed_function}) .guarded())}) .call(this)} , waul_run =function (m) { ; return(function (it) {return it()}) .call(this, ($.compile( $(m._transform.as_escaped_string()) (m._function) , {require: require, caterwaul: $})))} ; return( process) .nextTick( main)}) .call(this)}) ;result.caterwaul_expression_ref_table = {qs: ( "new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"\")) ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \"_e\")))) ,new caterwaul.syntax( \"\"))") ,qs1: ( "new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"caterwaul\") ,new caterwaul.syntax( \"_transform\")) ,new caterwaul.syntax( \"_function\")) ,new caterwaul.syntax( \"\")) ,new caterwaul.syntax( \"\"))") ,qs2: ( "new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"caterwaul\") ,new caterwaul.syntax( \"module\")) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_name\") ,new caterwaul.syntax( \"_transform\") .prefix( \" \")) ,new caterwaul.syntax( \"_function\") .prefix( \" \"))) ,new caterwaul.syntax( \"\"))") ,qs3: ( "new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"caterwaul\") ,new caterwaul.syntax( \"module\")) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_name\") ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"caterwaul\") .prefix( \" \") ,new caterwaul.syntax( \"_transform\")) ,new caterwaul.syntax( \"_function\")))) ,new caterwaul.syntax( \"\"))") ,qs4: ( "new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"caterwaul\") ,new caterwaul.syntax( \"module\")) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_name\") ,new caterwaul.syntax( \"function\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_formal\")) .prefix( \" \") ,new caterwaul.syntax( \"{\" ,new caterwaul.syntax( \"_body\")) .prefix( \" \")) .prefix( \" \"))) ,new caterwaul.syntax( \"\"))") ,qs5: ( "new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"caterwaul\") ,new caterwaul.syntax( \"module\")) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_name\") ,new caterwaul.syntax( \"_compiled\") .prefix( \" \"))) ,new caterwaul.syntax( \"\"))") ,qs6: ( "new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \".\" ,new caterwaul.syntax( \"caterwaul\") ,new caterwaul.syntax( \"offline\")) ,new caterwaul.syntax( \",\" ,new caterwaul.syntax( \"_transform\") ,new caterwaul.syntax( \"_function\") .prefix( \" \"))) ,new caterwaul.syntax( \"\"))") ,qs7: ( "new caterwaul.syntax( \";\" ,new caterwaul.syntax( \"()\" ,new caterwaul.syntax( \"(\" ,new caterwaul.syntax( \"_compiled\")) ,new caterwaul.syntax( \"\")) ,new caterwaul.syntax( \"\"))")} ;return(result)}) .call(this,new caterwaul.syntax( "()" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "function" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "")) ,new caterwaul.syntax( "{" ,new caterwaul.syntax( "_e")))) ,new caterwaul.syntax( "")) ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "caterwaul") ,new caterwaul.syntax( "_transform")) ,new caterwaul.syntax( "_function")) ,new caterwaul.syntax( "")) ,new caterwaul.syntax( "")) ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "caterwaul") ,new caterwaul.syntax( "module")) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_name") , (new caterwaul.syntax( "_transform")) .prefix( " ")) , (new caterwaul.syntax( "_function")) .prefix( " "))) ,new caterwaul.syntax( "")) ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "caterwaul") ,new caterwaul.syntax( "module")) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_name") ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "()" , (new caterwaul.syntax( "caterwaul")) .prefix( " ") ,new caterwaul.syntax( "_transform")) ,new caterwaul.syntax( "_function")))) ,new caterwaul.syntax( "")) ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "caterwaul") ,new caterwaul.syntax( "module")) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_name") , (new caterwaul.syntax( "function" , (new caterwaul.syntax( "(" ,new caterwaul.syntax( "_formal"))) .prefix( " ") , (new caterwaul.syntax( "{" ,new caterwaul.syntax( "_body"))) .prefix( " "))) .prefix( " "))) ,new caterwaul.syntax( "")) ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "caterwaul") ,new caterwaul.syntax( "module")) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_name") , (new caterwaul.syntax( "_compiled")) .prefix( " "))) ,new caterwaul.syntax( "")) ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "." ,new caterwaul.syntax( "caterwaul") ,new caterwaul.syntax( "offline")) ,new caterwaul.syntax( "," ,new caterwaul.syntax( "_transform") , (new caterwaul.syntax( "_function")) .prefix( " "))) ,new caterwaul.syntax( "")) ,new caterwaul.syntax( ";" ,new caterwaul.syntax( "()" ,new caterwaul.syntax( "(" ,new caterwaul.syntax( "_compiled")) ,new caterwaul.syntax( "")) ,new caterwaul.syntax( "")))) ;
statement = function (s) {var cons= {} ;
var s1=s;
if(s1&& (s1=block(s1) ) )cons=s1.cons;
if(s1)s=s1;
else{var s2=s;
if(s2&& (s2=with_semi(s2) ) )cons=s2.cons;
if(s2)s=s2;
else{var s3=s;
if(s3&&s3.s.substr(s3.i,1) === ";" )s3= {s:s3.s,i:s3.i+1} ;
else s3=null;
if(s3)s=s3;
else{if(s&& (s=statement_(s) ) )cons=s.cons} } } ;
if(s) {s.cons=cons;
return s} };
block = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,2) === "\\{" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=statements(s) ) )cons=s.cons;
if(s&&s.s.substr(s.i,2) === "\\}" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s) {s.cons=cons;
return s} };
with_semi = function (s) {var cons= {} ;
if(s&& (s=statement_(s) ) )cons=s.cons;
if(s&&s.s.substr(s.i,1) === ";" )s= {s:s.s,i:s.i+1} ;
else s=null;
if(s) {s.cons=cons;
return s} };
statement_ = function (s) {var cons= {} ;
var s1=s;
if(s1&& (s1=if_(s1) ) )cons=s1.cons;
if(s1)s=s1;
else{var s2=s;
if(s2&& (s2=for_iterator(s2) ) )cons=s2.cons;
if(s2)s=s2;
else{var s3=s;
if(s3&& (s3=for_in(s3) ) )cons=s3.cons;
if(s3)s=s3;
else{var s4=s;
if(s4&& (s4=while_(s4) ) )cons=s4.cons;
if(s4)s=s4;
else{var s5=s;
if(s5&& (s5=do_(s5) ) )cons=s5.cons;
if(s5)s=s5;
else{var s6=s;
if(s6&& (s6=switch_(s6) ) )cons=s6.cons;
if(s6)s=s6;
else{var s7=s;
if(s7&& (s7=throw_(s7) ) )cons=s7.cons;
if(s7)s=s7;
else{var s8=s;
if(s8&& (s8=try_(s8) ) )cons=s8.cons;
if(s8)s=s8;
else{if(s&& (s=expression(s) ) )cons=s.cons} } } } } } } } ;
if(s) {s.cons=cons;
return s} };
if_ = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,2) === "if" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=ws(s) ) )cons.pre=s.cons;
if(s&&s.s.substr(s.i,2) === "\\(" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=expression(s) ) )cons.cond=s.cons;
if(s&&s.s.substr(s.i,2) === "\\)" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=statement(s) ) )cons.lhs=s.cons;
var s1=s;
if(s1&&s1.s.substr(s1.i,4) === "else" )s1= {s:s1.s,i:s1.i+4} ;
else s1=null;
if(s1&& (s1=statement(s1) ) )cons.rhs=s1.cons;
if(s1)s=s1,s.cons.optional_term=true;
if(s) {s.cons=cons;
return s} };
for_iterator = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,3) === "for" )s= {s:s.s,i:s.i+3} ;
else s=null;
if(s&& (s=ws(s) ) )cons.pre=s.cons;
if(s&&s.s.substr(s.i,2) === "\\(" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=statement(s) ) )cons.init=s.cons;
if(s&& (s=expression(s) ) )cons.cond=s.cons;
if(s&& (s=ws(s) ) )cons.post_cond=s.cons;
if(s&&s.s.substr(s.i,1) === ";" )s= {s:s.s,i:s.i+1} ;
else s=null;
if(s&& (s=expression(s) ) )cons.inc=s.cons;
if(s&&s.s.substr(s.i,2) === "\\)" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=statement(s) ) )cons.lhs=s.cons;
if(s) {s.cons=cons;
return s} };
for_in = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,3) === "for" )s= {s:s.s,i:s.i+3} ;
else s=null;
if(s&& (s=ws(s) ) )cons.pre=s.cons;
if(s&&s.s.substr(s.i,2) === "\\(" )s= {s:s.s,i:s.i+2} ;
else s=null;
var s1=s;
if(s1&&s1.s.substr(s1.i,3) === "var" )s1= {s:s1.s,i:s1.i+3} ;
else s1=null;
if(s1)s=s1,s.cons.optional_term=true;
if(s&& (s=identifier(s) ) )cons.variable=s.cons;
if(s&& (s=ws(s) ) )cons.post_variable=s.cons;
if(s&&s.s.substr(s.i,2) === "in" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=expression(s) ) )cons.cond=s.cons;
if(s&&s.s.substr(s.i,2) === "\\)" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=statement(s) ) )cons.lhs=s.cons;
if(s) {s.cons=cons;
return s} };
while_ = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,5) === "while" )s= {s:s.s,i:s.i+5} ;
else s=null;
if(s&& (s=ws(s) ) )cons.pre=s.cons;
if(s&&s.s.substr(s.i,2) === "\\(" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=expression(s) ) )cons.cond=s.cons;
if(s&&s.s.substr(s.i,2) === "\\)" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=statement(s) ) )cons.lhs=s.cons;
if(s) {s.cons=cons;
return s} };
do_ = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,2) === "do" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=statement(s) ) )cons.lhs=s.cons;
if(s&&s.s.substr(s.i,5) === "while" )s= {s:s.s,i:s.i+5} ;
else s=null;
if(s&& (s=ws(s) ) )cons.pre=s.cons;
if(s&&s.s.substr(s.i,2) === "\\(" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=expression(s) ) )cons.cond=s.cons;
if(s&&s.s.substr(s.i,2) === "\\)" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s) {s.cons=cons;
return s} };
switch_ = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,6) === "switch" )s= {s:s.s,i:s.i+6} ;
else s=null;
if(s&& (s=ws(s) ) )cons.pre=s.cons;
if(s&&s.s.substr(s.i,2) === "\\(" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=expression(s) ) )cons.cond=s.cons;
if(s&&s.s.substr(s.i,2) === "\\)" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=ws(s) ) )cons.post=s.cons;
if(s&&s.s.substr(s.i,2) === "\\{" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=cases(s) ) )cons.cases=s.cons;
if(s&&s.s.substr(s.i,2) === "\\}" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s) {s.cons=cons;
return s} };
cases = function (s) {var cons= {} ;
var s1=s;
if(s1&& (s1=case_(s1) ) )cons.lhs=s1.cons;
if(s1&& (s1=cases(s1) ) )cons.rhs=s1.cons;
if(s1)s=s1;
else{var s2=s;
if(s2&& (s2=default_(s2) ) )cons.lhs=s2.cons;
if(s2&& (s2=cases(s2) ) )cons.rhs=s2.cons;
if(s2)s=s2;
else{if(s&& (s=statements(s) ) )cons.rhs=s.cons} } ;
if(s) {s.cons=cons;
return s} };
case_ = function (s) {var cons= {} ;
if(s&& (s=ws(s) ) )cons.pre=s.cons;
if(s&&s.s.substr(s.i,4) === "case" )s= {s:s.s,i:s.i+4} ;
else s=null;
if(s&& (s=expression(s) ) )cons.cond=s.cons;
if(s&& /[:]/ .test(s.s.charAt(s.i) ) )s= {s:s.s,i:s.i+1} ;
else s=null;
if(s) {s.cons=cons;
return s} };
default_ = function (s) {var cons= {} ;
if(s&& (s=ws(s) ) )cons.pre=s.cons;
if(s&&s.s.substr(s.i,7) === "default" )s= {s:s.s,i:s.i+7} ;
else s=null;
if(s&& (s=ws(s) ) )cons.post=s.cons;
if(s&& /[:]/ .test(s.s.charAt(s.i) ) )s= {s:s.s,i:s.i+1} ;
else s=null;
if(s) {s.cons=cons;
return s} };
throw_ = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,5) === "throw" )s= {s:s.s,i:s.i+5} ;
else s=null;
if(s&& (s=expression(s) ) )cons.lhs=s.cons;
if(s) {s.cons=cons;
return s} };
try_ = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,3) === "try" )s= {s:s.s,i:s.i+3} ;
else s=null;
if(s&& (s=statements(s) ) )cons.lhs=s.cons;
if(s&& (s=catch_or_finally(s) ) )cons.rhs=s.cons;
if(s) {s.cons=cons;
return s} };
catch_or_finally = function (s) {var cons= {} ;
var s1=s;
if(s1&& (s1=catch_(s1) ) )cons=s1.cons;
if(s1)s=s1;
else{if(s&& (s=finally_(s) ) )cons=s.cons} ;
if(s) {s.cons=cons;
return s} };
catch_ = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,5) === "catch" )s= {s:s.s,i:s.i+5} ;
else s=null;
if(s&& (s=ws(s) ) )cons.pre=s.cons;
if(s&&s.s.substr(s.i,2) === "\\(" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=expression(s) ) )cons.cond=s.cons;
if(s&&s.s.substr(s.i,2) === "\\)" )s= {s:s.s,i:s.i+2} ;
else s=null;
var s1=s;
if(s1&& (s1=finally_(s1) ) )cons.rhs=s1.cons;
if(s1)s=s1,s.cons.optional_term=true;
if(s) {s.cons=cons;
return s} };
finally_ = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,7) === "finally" )s= {s:s.s,i:s.i+7} ;
else s=null;
if(s&& (s=statements(s) ) )cons.lhs=s.cons;
if(s) {s.cons=cons;
return s} };
expression = function (s) {var cons= {} ;
var s1=s;
if(s1&& (s1=literal(s1) ) )cons=s1.cons;
if(s1)s=s1;
else{var s2=s;
if(s2&& (s2=identifier(s2) ) )cons.s=s2.cons;
if(s2)s=s2;
else{var s3=s;
if(s3&& (s3=group(s3) ) )cons=s3.cons;
if(s3)s=s3;
else{var s4=s;
if(s4&& (s4=unary(s4) ) )cons=s4.cons;
if(s4)s=s4;
else{if(s&& (s=binary(s) ) )cons=s.cons} } } } ;
if(s) {s.cons=cons;
return s} };
literal = function (s) {var cons= {} ;
var s1=s;
if(s1&& (s1=dstring(s1) ) )cons.v=s1.cons;
if(s1)s=s1;
else{var s2=s;
if(s2&& (s2=sstring(s2) ) )cons.v=s2.cons;
if(s2)s=s2;
else{var s3=s;
if(s3&& (s3=number(s3) ) )cons.v=s3.cons;
if(s3)s=s3;
else{var s4=s;
if(s4&& (s4=regexp(s4) ) )cons.v=s4.cons;
if(s4)s=s4;
else{var s5=s;
if(s5&& (s5=array(s5) ) )cons=s5.cons;
if(s5)s=s5;
else{if(s&& (s=object(s) ) )cons=s.cons} } } } } ;
if(s) {s.cons=cons;
return s} };
dstring = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,1) === "\"" )s= {s:s.s,i:s.i+1} ;
else s=null;
var last,s1=s;
while(s) {last=s;
var s2=s;
if(s2&& /[^\\"]/ .test(s2.s.charAt(s2.i) ) )s2= {s:s2.s,i:s2.i+1} ;
else s2=null;
if(s2)s=s2;
else{if(s&&s.s.substr(s.i,2) === "\\\\" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& /./ .test(s.s.charAt(s.i) ) )s= {s:s.s,i:s.i+1} ;
else s=null} } ;
s=last;
if(s)cons.repetition=s.s.substring(s1.i,s.i) ;
if(s&&s.s.substr(s.i,1) === "\"" )s= {s:s.s,i:s.i+1} ;
else s=null;
if(s) {s.cons=cons;
return s} };
sstring = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,1) === "'" )s= {s:s.s,i:s.i+1} ;
else s=null;
var last,s1=s;
while(s) {last=s;
var s2=s;
if(s2&& /[^\\']/ .test(s2.s.charAt(s2.i) ) )s2= {s:s2.s,i:s2.i+1} ;
else s2=null;
if(s2)s=s2;
else{if(s&&s.s.substr(s.i,2) === "\\\\" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& /./ .test(s.s.charAt(s.i) ) )s= {s:s.s,i:s.i+1} ;
else s=null} } ;
s=last;
if(s)cons.repetition=s.s.substring(s1.i,s.i) ;
if(s&&s.s.substr(s.i,1) === "\"" )s= {s:s.s,i:s.i+1} ;
else s=null;
if(s) {s.cons=cons;
return s} };
number = function (s) {var cons= {} ;
var s1=s;
var s_13_m7s6lvmqHajPdLccB5YpUu1=s1;
if(s_13_m7s6lvmqHajPdLccB5YpUu1&&s_13_m7s6lvmqHajPdLccB5YpUu1.s.substr(s_13_m7s6lvmqHajPdLccB5YpUu1.i,1) === "-" )s_13_m7s6lvmqHajPdLccB5YpUu1= {s:s_13_m7s6lvmqHajPdLccB5YpUu1.s,i:s_13_m7s6lvmqHajPdLccB5YpUu1.i+1} ;
else s_13_m7s6lvmqHajPdLccB5YpUu1=null;
if(s_13_m7s6lvmqHajPdLccB5YpUu1)s1=s_13_m7s6lvmqHajPdLccB5YpUu1,s1.cons.optional_term=true;
if(s1&&s1.s.substr(s1.i,2) === "0x" )s1= {s:s1.s,i:s1.i+2} ;
else s1=null;
var last,s2=s1;
while(s1) {last=s1;
if(s1&& /[0-9a-fA-F]/ .test(s1.s.charAt(s1.i) ) )s1= {s:s1.s,i:s1.i+1} ;
else s1=null} ;
s1=last;
if(s1)cons.repetition=s1.s.substring(s2.i,s1.i) ;
if(s1)s=s1;
else{var s3=s;
var s_19_m7s6lvmqHajPdLccB5YpUu1=s3;
if(s_19_m7s6lvmqHajPdLccB5YpUu1&&s_19_m7s6lvmqHajPdLccB5YpUu1.s.substr(s_19_m7s6lvmqHajPdLccB5YpUu1.i,1) === "-" )s_19_m7s6lvmqHajPdLccB5YpUu1= {s:s_19_m7s6lvmqHajPdLccB5YpUu1.s,i:s_19_m7s6lvmqHajPdLccB5YpUu1.i+1} ;
else s_19_m7s6lvmqHajPdLccB5YpUu1=null;
if(s_19_m7s6lvmqHajPdLccB5YpUu1)s3=s_19_m7s6lvmqHajPdLccB5YpUu1,s3.cons.optional_term1=true;
if(s3&&s3.s.substr(s3.i,1) === "0" )s3= {s:s3.s,i:s3.i+1} ;
else s3=null;
var last1,s4=s3;
while(s3) {last1=s3;
if(s3&& /[0-7]/ .test(s3.s.charAt(s3.i) ) )s3= {s:s3.s,i:s3.i+1} ;
else s3=null} ;
s3=last1;
if(s3)cons.repetition1=s3.s.substring(s4.i,s3.i) ;
if(s3)s=s3;
else{var s5=s;
var s_1f_m7s6lvmqHajPdLccB5YpUu1=s5;
if(s_1f_m7s6lvmqHajPdLccB5YpUu1&&s_1f_m7s6lvmqHajPdLccB5YpUu1.s.substr(s_1f_m7s6lvmqHajPdLccB5YpUu1.i,1) === "-" )s_1f_m7s6lvmqHajPdLccB5YpUu1= {s:s_1f_m7s6lvmqHajPdLccB5YpUu1.s,i:s_1f_m7s6lvmqHajPdLccB5YpUu1.i+1} ;
else s_1f_m7s6lvmqHajPdLccB5YpUu1=null;
if(s_1f_m7s6lvmqHajPdLccB5YpUu1)s5=s_1f_m7s6lvmqHajPdLccB5YpUu1,s5.cons.optional_term2=true;
if(s5&& /[0-9]/ .test(s5.s.charAt(s5.i) ) )s5= {s:s5.s,i:s5.i+1} ;
else s5=null;
var last2,s6=s5;
while(s5) {last2=s5;
if(s5&& /[0-9]/ .test(s5.s.charAt(s5.i) ) )s5= {s:s5.s,i:s5.i+1} ;
else s5=null} ;
s5=last2;
if(s5)cons.repetition2=s5.s.substring(s6.i,s5.i) ;
var s_1f_m7s6lvmqHajPdLccB5YpUu2=s5;
if(s_1f_m7s6lvmqHajPdLccB5YpUu2&&s_1f_m7s6lvmqHajPdLccB5YpUu2.s.substr(s_1f_m7s6lvmqHajPdLccB5YpUu2.i,2) === "\\." )s_1f_m7s6lvmqHajPdLccB5YpUu2= {s:s_1f_m7s6lvmqHajPdLccB5YpUu2.s,i:s_1f_m7s6lvmqHajPdLccB5YpUu2.i+2} ;
else s_1f_m7s6lvmqHajPdLccB5YpUu2=null;
var last3,s7=s_1f_m7s6lvmqHajPdLccB5YpUu2;
while(s_1f_m7s6lvmqHajPdLccB5YpUu2) {last3=s_1f_m7s6lvmqHajPdLccB5YpUu2;
if(s_1f_m7s6lvmqHajPdLccB5YpUu2&& /[0-9]/ .test(s_1f_m7s6lvmqHajPdLccB5YpUu2.s.charAt(s_1f_m7s6lvmqHajPdLccB5YpUu2.i) ) )s_1f_m7s6lvmqHajPdLccB5YpUu2= {s:s_1f_m7s6lvmqHajPdLccB5YpUu2.s,i:s_1f_m7s6lvmqHajPdLccB5YpUu2.i+1} ;
else s_1f_m7s6lvmqHajPdLccB5YpUu2=null} ;
s_1f_m7s6lvmqHajPdLccB5YpUu2=last3;
if(s_1f_m7s6lvmqHajPdLccB5YpUu2)cons.repetition3=s_1f_m7s6lvmqHajPdLccB5YpUu2.s.substring(s7.i,s_1f_m7s6lvmqHajPdLccB5YpUu2.i) ;
var s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1=s_1f_m7s6lvmqHajPdLccB5YpUu2;
if(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1&& /[eE]/ .test(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.s.charAt(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.i) ) )s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1= {s:s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.s,i:s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.i+1} ;
else s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1=null;
var s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu_1q_m7s6lvmqHajPdLccB5YpUu1=s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1;
if(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu_1q_m7s6lvmqHajPdLccB5YpUu1&& /[-+]/ .test(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu_1q_m7s6lvmqHajPdLccB5YpUu1.s.charAt(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu_1q_m7s6lvmqHajPdLccB5YpUu1.i) ) )s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu_1q_m7s6lvmqHajPdLccB5YpUu1= {s:s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu_1q_m7s6lvmqHajPdLccB5YpUu1.s,i:s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu_1q_m7s6lvmqHajPdLccB5YpUu1.i+1} ;
else s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu_1q_m7s6lvmqHajPdLccB5YpUu1=null;
if(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu_1q_m7s6lvmqHajPdLccB5YpUu1)s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1=s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu_1q_m7s6lvmqHajPdLccB5YpUu1,s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.cons.optional_term3=true;
if(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1&& /[0-9]/ .test(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.s.charAt(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.i) ) )s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1= {s:s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.s,i:s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.i+1} ;
else s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1=null;
var last4,s8=s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1;
while(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1) {last4=s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1;
if(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1&& /[0-9]/ .test(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.s.charAt(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.i) ) )s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1= {s:s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.s,i:s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.i+1} ;
else s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1=null} ;
s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1=last4;
if(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1)cons.repetition4=s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.s.substring(s8.i,s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1.i) ;
if(s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1)s_1f_m7s6lvmqHajPdLccB5YpUu2=s_1f_m7s6lvmqHajPdLccB5YpUu_1l_m7s6lvmqHajPdLccB5YpUu1,s_1f_m7s6lvmqHajPdLccB5YpUu2.cons.optional_term4=true;
if(s_1f_m7s6lvmqHajPdLccB5YpUu2)s5=s_1f_m7s6lvmqHajPdLccB5YpUu2,s5.cons.optional_term5=true;
if(s5)s=s5;
else{var s9=s;
if(s9&&s9.s.substr(s9.i,1) === "-" )s9= {s:s9.s,i:s9.i+1} ;
else s9=null;
if(s9)s=s9,s.cons.optional_term6=true;
var last5,sa=s;
while(s) {last5=s;
if(s&& /[0-9]/ .test(s.s.charAt(s.i) ) )s= {s:s.s,i:s.i+1} ;
else s=null} ;
s=last5;
if(s)cons.repetition5=s.s.substring(sa.i,s.i) ;
if(s&&s.s.substr(s.i,2) === "\\." )s= {s:s.s,i:s.i+2} ;
else s=null;
var last6,sb=s;
while(s) {last6=s;
if(s&& /[0-9]/ .test(s.s.charAt(s.i) ) )s= {s:s.s,i:s.i+1} ;
else s=null} ;
s=last6;
if(s)cons.repetition6=s.s.substring(sb.i,s.i) ;
var sc=s;
if(sc&& /[eE]/ .test(sc.s.charAt(sc.i) ) )sc= {s:sc.s,i:sc.i+1} ;
else sc=null;
var s_25_m7s6lvmqHajPdLccB5YpUu1=sc;
if(s_25_m7s6lvmqHajPdLccB5YpUu1&& /[-+]/ .test(s_25_m7s6lvmqHajPdLccB5YpUu1.s.charAt(s_25_m7s6lvmqHajPdLccB5YpUu1.i) ) )s_25_m7s6lvmqHajPdLccB5YpUu1= {s:s_25_m7s6lvmqHajPdLccB5YpUu1.s,i:s_25_m7s6lvmqHajPdLccB5YpUu1.i+1} ;
else s_25_m7s6lvmqHajPdLccB5YpUu1=null;
if(s_25_m7s6lvmqHajPdLccB5YpUu1)sc=s_25_m7s6lvmqHajPdLccB5YpUu1,sc.cons.optional_term7=true;
if(sc&& /[0-9]/ .test(sc.s.charAt(sc.i) ) )sc= {s:sc.s,i:sc.i+1} ;
else sc=null;
var last7,sd=sc;
while(sc) {last7=sc;
if(sc&& /[0-9]/ .test(sc.s.charAt(sc.i) ) )sc= {s:sc.s,i:sc.i+1} ;
else sc=null} ;
sc=last7;
if(sc)cons.repetition7=sc.s.substring(sd.i,sc.i) ;
if(sc)s=sc,s.cons.optional_term8=true} } } ;
if(s) {s.cons=cons;
return s} };
regexp = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,1) === "/" )s= {s:s.s,i:s.i+1} ;
else s=null;
var last,s1=s;
while(s) {last=s;
var s2=s;
if(s2&& /[^\\\/]/ .test(s2.s.charAt(s2.i) ) )s2= {s:s2.s,i:s2.i+1} ;
else s2=null;
if(s2)s=s2;
else{if(s&&s.s.substr(s.i,2) === "\\\\" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& /./ .test(s.s.charAt(s.i) ) )s= {s:s.s,i:s.i+1} ;
else s=null} } ;
s=last;
if(s)cons.repetition=s.s.substring(s1.i,s.i) ;
if(s&&s.s.substr(s.i,1) === "/" )s= {s:s.s,i:s.i+1} ;
else s=null;
if(s) {s.cons=cons;
return s} };
identifier = function (s) {var cons= {} ;
if(s&& /[A-Za-z$_]/ .test(s.s.charAt(s.i) ) )s= {s:s.s,i:s.i+1} ;
else s=null;
var last,s1=s;
while(s) {last=s;
if(s&& /[A-Za-z0-9$_]/ .test(s.s.charAt(s.i) ) )s= {s:s.s,i:s.i+1} ;
else s=null} ;
s=last;
if(s)cons.repetition=s.s.substring(s1.i,s.i) ;
if(s) {s.cons=cons;
return s} };
group = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,2) === "\\(" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=expression(s) ) )cons.x=s.cons;
if(s&&s.s.substr(s.i,2) === "\\)" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s) {s.cons=cons;
return s} };
array = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,2) === "\\[" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=expression_list(s) ) )cons.xs=s.cons;
if(s&&s.s.substr(s.i,2) === "\\]" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s) {s.cons=cons;
return s} };
object = function (s) {var cons= {} ;
if(s&&s.s.substr(s.i,2) === "\\{" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s&& (s=expression_list(s) ) )cons.xs=s.cons;
if(s&&s.s.substr(s.i,2) === "\\}" )s= {s:s.s,i:s.i+2} ;
else s=null;
if(s) {s.cons=cons;
return s} }
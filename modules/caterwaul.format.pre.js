function (gensym_2_gmjj28af_aev317){caterwaul.tconfiguration('std','format',function (){var n_spaces=fn[n][n?' #{n_spaces(n - 1)}':''];
this.field('format',function (tree,indentation){var spaces=n_spaces(indentation<<1),c=this,op=tree.data,map=caterwaul.util.map,serialize=fn[n][fn[x][x?x.constructor===String?x:c.format(x,(indentation||0)+(n||0)):'']];
return op==='()'||op==='[]'?map(serialize(),[tree[0],op.charAt(0),tree[1],op.charAt(1)]).join(''):tree.is_invisible()?map(serialize(),tree).join(' '):op==='?'?'#{serialize()(tree[0])}\n#{spaces}  ? #{serialize(1)(tree[1])}\n#{spaces}  : #{serialize(1)(tree[2])}':op==='('||op==='['?'#{op}#{serialize()(tree[0])}#{op === "(" ? ")" : "]"}':op==='{'?'{\n#{spaces}  #{serialize(1)(tree[0])}\n#{spaces}}':op===';'?'#{serialize()(tree[0])};\n#{spaces}#{serialize()(tree[1])}':op==='.'?'#{serialize()(tree[0])}.#{serialize()(tree[1])}':op===','?map(serialize(),tree).join(', '):op==='for'?'for #{c.format(tree[0]).replace(/\n/g, " ")} #{serialize()(tree[1])}':tree.is_binary_operator()?tree.length?map(serialize(),tree).join(' #{op} '):op:tree.is_prefix_unary_operator()?'#{op.replace(/^u/, "")} #{serialize()(tree[0])}':tree.is_postfix_unary_operator()?'#{serialize()(tree[0])}#{op.replace(/^u/, "")}':tree.is_blockless_keyword()?'#{op} #{serialize()(tree[0])}':tree.has_grouped_block()?tree[1]&&tree[1].data!=='{'&&tree[2]&&tree.accepts(tree[2])?'#{op} #{serialize()(tree[0])} #{serialize()(tree[1])};\n#{spaces}#{serialize()(tree[2])}':'#{op} #{map(serialize(), tree).join(" ")}':op})});
}
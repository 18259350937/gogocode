module.exports = function (ast) {
    const template = ast
        .find('<template></template>')
    const script = ast.find('<script></script>')

    let scrollBarRefNameList = []
    template
        .find(`<el-scrollbar ref="$_$1"></el-scrollbar>`)
        .each(item => {
            scrollBarRefNameList.push(item.match[1][0].value)
        })
    scrollBarRefNameList.forEach(refName => {
        script.replace(`$_$1.${refName}.wrap`, `$_$1.${refName}.wrap$`)
        script.replace(`$_$1['${refName}'].wrap`, `$_$1['${refName}'].wrap$`)
    })

    return ast
}
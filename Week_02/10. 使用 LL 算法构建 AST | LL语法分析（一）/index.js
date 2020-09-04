const regexp = /([0-9\.]+)|([ \t]+)|([\r\n]+)|(\*)|(\/)|(\+)|(\-)/g
const dictionary = [
  'Number',
  'Whitespace',
  'LineTerminator',
  '*',
  '/',
  '+',
  '-',
]

function* tokenize(source) {
  let result = null
  let lastIndex = 0
  do {
    lastIndex = regexp.lastIndex
    result = regexp.exec(source)

    if (!result) break

    // 包含不认识的字符
    if (regexp.lastIndex - lastIndex > result[0].length) break

    // 保存token
    let token = {
      type: null,
      value: null,
    }

    for (let i = 0; i < result.length; i++) {
      if (result[i]) token.type = dictionary[i - 1]
    }

    token.value = result[0]
    yield token
  } while (true)
  yield { type: 'EOF' }
}

let source = []
for (const token of tokenize('10 * 25 / 2')) {
  if (token.type !== 'Whitespace' && token.type !== 'LineTerminator')
    source.push(token)
}

function Expression() {}

function AdditiveExpression() {}

function MultiplicativeExpression(source) {
  if (source[0].type === 'Number') {
    const node = {
      type: 'MultiplicativeExpression',
      children: [source[0]],
    }
    source[0] = node
    return MultiplicativeExpression(source)
  }

  if (
    source[0].type === 'MultiplicativeExpression' &&
    source[1] &&
    source[1].type === '*'
  ) {
    const node = {
      type: 'MultiplicativeExpression',
      operator: '*',
      children: [],
    }

    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if (
    source[0].type === 'MultiplicativeExpression' &&
    source[1] &&
    source[1].type === '/'
  ) {
    const node = {
      type: 'MultiplicativeExpression',
      operator: '/',
      children: [],
    }

    node.children.push(source.shift())
    node.children.push(source.shift())
    node.children.push(source.shift())
    source.unshift(node)
    return MultiplicativeExpression(source)
  }

  if (source[0].type === 'MultiplicativeExpression') {
    return source[0]
  }

  return MultiplicativeExpression(source)
}

console.log(MultiplicativeExpression(source))

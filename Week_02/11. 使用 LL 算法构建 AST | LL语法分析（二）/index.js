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
for (const token of tokenize('1 + 2 * 5 + 3')) {
  if (token.type !== 'Whitespace' && token.type !== 'LineTerminator')
    source.push(token)
}

function Expression(source) {
  if (
    source[0].type === 'AdditiveExpression' &&
    source[1] &&
    source[1].type == 'EOF'
  ) {
    const node = {
      type: 'Expression',
      children: [source.shift(), source.shift()],
    }
    source.unshift(node)
    return node
  }
  AdditiveExpression(source)
  return Expression(source)
}

function AdditiveExpression() {
  if (source[0].type === 'MultiplicativeExpression') {
    const node = {
      type: 'AdditiveExpression',
      children: [source[0]],
    }
    source[0] = node
    return AdditiveExpression(source)
  }

  if (
    source[0].type === 'AdditiveExpression' &&
    source[1] &&
    source[1].type === '+'
  ) {
    const node = {
      type: 'AdditiveExpression',
      operator: '+',
      children: [],
    }

    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }

  if (
    source[0].type === 'AdditiveExpression' &&
    source[1] &&
    source[1].type === '-'
  ) {
    const node = {
      type: 'AdditiveExpression',
      operator: '-',
      children: [],
    }

    node.children.push(source.shift())
    node.children.push(source.shift())
    MultiplicativeExpression(source)
    node.children.push(source.shift())
    source.unshift(node)
    return AdditiveExpression(source)
  }

  if (source[0].type === 'AdditiveExpression') {
    return source[0]
  }
  MultiplicativeExpression(source)
  return AdditiveExpression(source)
}

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

console.log(Expression(source))

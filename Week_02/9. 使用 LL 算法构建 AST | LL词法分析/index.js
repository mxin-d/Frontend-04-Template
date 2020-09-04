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
  while (true) {
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
  }
}

for (const token of tokenize('1024 + 10 * 25')) {
  console.log(token)
}

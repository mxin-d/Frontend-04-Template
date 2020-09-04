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

const tokenize = source => {
  let result = null
  while (true) {
    result = regexp.exec(source)

    if (!result) break

    for (let i = 0; i < result.length; i++) {
      if (result[i]) console.log(dictionary[i - 1])
    }

    console.log(result)
  }
}

tokenize("1024 + 10 * 25")

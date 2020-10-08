// EOF: End Of File
const EOF = Symbol('EOF');
let stack = [{ type: 'document', children: [] }];
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

function emit(token) {
  let top = stack[stack.length - 1];

  if (token.type === 'startTag') {
    let element = {
      type: 'element',
      children: [],
      attributes: [],
    };

    element.tagName = token.tagName;

    for (const p in token) {
      if (p !== 'type' && p !== 'tagName') {
        element.attributes.push({
          name: p,
          value: token[p],
        });
      }
    }

    top.children.push(element);
    element.parent = top;

    if (!token.isSelfClosing) {
      stack.push(element);
    }
    currentTextNode = null;
  } else if (token.type === 'endTag') {
    if (top.tagName !== token.tagName) {
      throw new Error("Tag start end doesn't match");
    } else {
      stack.pop();
    }
    currentTextNode = null;
  } else if (token.type === 'text') {
    if (currentTextNode == null) {
      currentTextNode = {
        type: 'text',
        content: '',
      };
      top.children.push(currentTextNode);
    }
    currentTextNode.content += token.content;
  }
}

function parseHtml(html) {
  let state = data;

  for (let c of html) {
    state = state(c);
  }

  // 状态机终止
  state = state(EOF);
  return stack[0];
}

function data(c) {
  if (c === '<') {
    return tagOpen;
  } else if (c === EOF) {
    emit({ type: 'EOF' });
    return;
  } else {
    emit({ type: 'text', content: c });
    return data;
  }
}

/**
 * 标签开始
 * 注：是哪种标签还未知
 * @param {*} c
 */
function tagOpen(c) {
  // 结束标签
  if (c === '/') {
    return endTagOpen;
  }
  // 开始标签或自封闭标签
  else if (c.match(/^[a-zA-z]$/)) {
    currentToken = {
      type: 'startTag',
      tagName: '',
    };
    return tagName(c);
  } else {
    return;
  }
}

/**
 * 结束标签
 * @param {*} c
 */
function endTagOpen(c) {
  if (c.match(/^[a-zA-z]$/)) {
    currentToken = {
      type: 'endTag',
      tagName: '',
    };
    return tagName(c);
  } else if (c === '>') {
  } else if (c === EOF) {
  } else {
  }
}

/**
 * 标签内容解析
 * @param {*} c
 */
function tagName(c) {
  // 遇到空格是属性
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  }
  // 自封闭标签
  else if (c === '/') {
    return selfClosingStartTag;
  }
  // 还在当前标签内
  else if (c.match(/^[a-zA-z]$/)) {
    currentToken.tagName += c;
    return tagName;
  }
  // 结束，回到data解析下一个标签
  else if (c === '>') {
    emit(currentToken);
    return data;
  } else {
    return tagName;
  }
}

/**
 * 自闭和标签
 * @param {*} c
 */
function selfClosingStartTag(c) {
  if (c === '>') {
    currentToken.isSelfClosing = true;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
  }
}

/**
 * 属性解析
 * @param {*} c
 */
function beforeAttributeName(c) {
  // 遇到属性
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  }
  // 结束，回到data解析下一个标签
  else if (c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c);
  } else if (c === '=') {
  } else {
    currentAttribute = {
      name: '',
      value: '',
    };
    return attributeName(c);
  }
}

function attributeName(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return afterAttributeName(c);
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '\u0000') {
  } else if (c === "'" || c === '"' || c === '<') {
  } else {
    currentAttribute.name += c;
    return attributeName;
  }
}

function beforeAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
    return beforeAttributeValue;
  } else if (c === '"') {
    return doubleQuotedAttributeValue;
  } else if (c === "'") {
    return singleQuotedAttributeValue;
  } else if (c === '>') {
  } else {
    return UnquotedAttributeValue(c);
  }
}

/**
 * 处理双引号
 * @param {*} c
 */
function doubleQuotedAttributeValue(c) {
  // 遇到结尾引号
  if (c === '"') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return doubleQuotedAttributeValue;
  }
}

/**
 * 处理单引号
 * @param {*} c
 */
function singleQuotedAttributeValue(c) {
  // 遇到结尾引号
  if (c === "'") {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return afterQuotedAttributeValue;
  } else if (c === '\u0000') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return singleQuotedAttributeValue;
  }
}

/**
 * 无特殊符号，寻找空白符结束
 * @param {*} c
 */
function UnquotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return beforeAttributeName;
  } else if (c === '/') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    return selfClosingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === '\u0000') {
  } else if (c === '>') {
  } else if (c === "'" || c === '"' || c === '<' || c === '=' || c === '`') {
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return UnquotedAttributeValue;
  }
}

/**
 * 处理完引号之后
 * @param {*} c
 */
function afterQuotedAttributeValue(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
    currentAttribute.value += c;
    return afterQuotedAttributeValue;
  }
}

/**
 * 属性结束
 * @param {*} c
 */
function afterAttributeName(c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return afterAttributeName;
  } else if (c === '/') {
    return selfClosingStartTag;
  } else if (c === '=') {
    return beforeAttributeValue;
  } else if (c === '>') {
    currentToken[currentAttribute.name] = currentAttribute.value;
    emit(currentToken);
    return data;
  } else if (c === EOF) {
  } else {
    currentToken[currentAttribute.name] = currentAttribute.value;
    currentAttribute = {
      name: '',
      value: '',
    };
    return attributeName(c);
  }
}

module.exports = parseHtml;

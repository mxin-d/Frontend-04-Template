export function createElement(type, attributes, ...children) {
  let element;
  if (typeof type === 'string') {
    // string类型默认为html标签
    element = new ElementWrapper(type);
  } else {
    // 组件实例
    element = new type();
  }
  // 处理attributes
  for (const name in attributes) {
    element.setAttribute(name, attributes[name]);
  }
  // 处理子元素
  for (const child of children) {
    // 判断元素类型
    if (typeof child === 'string') {
      child = new TextWrapper(child);
    }
    element.appendChild(child);
  }
  return element;
}

export class Component {
  constructor() {}
  setAttribute(name, value) {
    this.root.setAttribute(name, value);
  }
  appendChild(child) {
    child.mountTo(this.root);
  }
  mountTo(parent) {
    parent.appendChild(this.root);
  }
}

class ElementWrapper extends Component {
  constructor(type) {
    this.root = document.createElement(type);
  }
}

class TextWrapper extends Component {
  constructor(content) {
    this.root = document.createTextNode(content);
  }
}

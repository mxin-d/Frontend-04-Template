function match(selector, element) {
  const arr = selector
    .split(' ')
    .filter(selector => selector !== '')
    .reverse();

  let currentElement = element;
  for (const currentSelector of arr) {
    currentSelector.match(
      /^([\w_]+)?((?:.[\w_]+)|(?:#[\w_]+))?((?:.[\w_]+)|(?:#[\w_]+))?$/
    );
    const parts = [RegExp.$1, RegExp.$2, RegExp.$3];
    if (!matchSelector(parts, currentElement)) {
      return false;
    }

    currentElement = currentElement.parentElement;
  }

  return true;
}

function matchSelector(parts, element) {
  if (!parts || !element) {
    return false;
  }

  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('.')) {
      const className = part.replace('.', '');
      if (
        !(
          element.getAttribute('class') !== null &&
          element.getAttribute('class').trim().split(' ').includes(className)
        )
      )
        return false;
    } else if (part.startsWith('#')) {
      const id = part.replace('#', '');
      if (
        !(
          element.getAttribute('id') !== null &&
          element.getAttribute('id').trim() == id
        )
      )
        return false;
    } else {
      if (element.tagName !== part.toUpperCase()) return false;
    }
  }
  return true;
}

const result = match('div#id.mxin', document.getElementById('id'));
console.log(result);

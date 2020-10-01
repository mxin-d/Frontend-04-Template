function match(string) {
  let foundA = false;
  let foundB = false;
  let foundC = false;
  let foundD = false;
  let foundE = false;

  for (const str of string) {
    if (str == 'a') foundA = true;
    else if (foundA && str == 'b') foundB = true;
    else if (foundB && str == 'c') foundC = true;
    else if (foundC && str == 'd') foundD = true;
    else if (foundD && str == 'e') foundE = true;
    else if (foundE && str == 'f') return true;
    else {
      foundA = false;
      foundB = false;
      foundC = false;
      foundD = false;
      foundE = false;
    }
  }
  return false;
}

console.log(match("I'm abcdef human"));

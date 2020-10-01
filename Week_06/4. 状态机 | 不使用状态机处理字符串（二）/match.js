function match(string) {
  let foundA = false;

  for (const str of string) {
    if (str == 'a') foundA = true;
    else if (foundA && str == 'b') return true;
    else foundA = false;
  }
  return false;
}

console.log(match("I'm a good boy"));
console.log(match("I'm aboy"));

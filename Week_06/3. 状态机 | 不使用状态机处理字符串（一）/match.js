function match(string) {
  for (const str of string) {
    if (str === 'a') return true;
  }
  return false;
}

match("I'm a Human");

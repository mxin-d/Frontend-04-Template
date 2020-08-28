const GREEN = '\033[42;30m 绿灯 \033[0m' // 10s
const YELLOW = '\033[41;30m 黄灯 \033[0m' // 2s
const RED = '\033[43;30m 红灯 \033[0m' // 5s

const start = type => {
  let i = 0
  const timer = setInterval(() => {
    ++i
    console.log(type, i)
    if (type === GREEN && i === 10) {
      clear(YELLOW, timer)
    }
    if (type === YELLOW && i === 2) {
      clear(RED, timer)
    }
    if (type === RED && i === 5) {
      clear(GREEN, timer)
    }
  }, 1000)
}

const clear = (type, timer) => {
  clearInterval(timer)
  return start(type)
}

start(GREEN)

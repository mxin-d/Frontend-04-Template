// 初始化棋盘
let pattern = Array(9).fill(0)

// 初始化棋子形状 棋子规则：1为○，2为×
let shape = 1

// 获胜者提示文字
let winnerText = null

// 游戏结束标识
let isFinish = false

/**
 * 初始化
 */
const init = () => {
  render()
}

/**
 * 棋盘及棋子渲染
 */
const render = () => {
  const board = document.getElementById('board')
  board.innerHTML = ''

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board.appendChild(getSquare(i, j))
    }
    board.appendChild(document.createElement('br'))
  }
}

/**
 * 获取小方块
 * 棋子规则：1为○，2为×
 * @param {*} col 列
 * @param {*} row 行
 */
const getSquare = (row, col) => {
  const square = document.createElement('div')

  // 添加属性
  square.classList.add('square')

  // 棋子显示规则
  square.innerText =
    pattern[row * 3 + col] == 1 ? '○' : pattern[row * 3 + col] == 2 ? '×' : ''

  // 绑定落子事件
  square.addEventListener('click', () => userMove(row, col))

  return square
}

/**
 * 计算即将获胜者
 * @param {*} pattern
 * @param {*} shape
 */
const calculateWillWin = (pattern, shape) => {
  const length = 3
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      // 如果不为空直接跳过
      if (pattern[i * 3 + j] !== 0) continue

      // 克隆临时棋盘 模拟落子
      let tempPattern = clone(pattern)
      tempPattern[i * 3 + j] = shape
      if (calculateWinner(tempPattern, shape)) return [i, j]
    }
  }
  return null
}

/**
 * 最优选择
 * @param {*} pattern
 * @param {*} shape
 */
const bestChoice = (pattern, shape) => {
  let point = calculateWillWin(pattern, shape)
  if (point) {
    return {
      point: point,
      result: 1,
    }
  }

  let result = -1
  const length = 3
  outer: for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      // 如果不为空直接跳过
      if (pattern[i * 3 + j] !== 0) continue

      // 克隆临时棋盘 模拟落子
      const tempPattern = clone(pattern)
      tempPattern[i * 3 + j] = shape

      const opp = bestChoice(tempPattern, 3 - shape)
      if (-opp.result >= result) {
        point = [i, j]
        result = -opp.result
      }
      if (result === 1) break outer
    }
  }

  return {
    point: point,
    result: point ? result : 0,
  }
}

/**
 * 计算获胜者
 * @param {*} pattern
 * @param {*} shape
 */
const calculateWinner = (pattern, shape) => {
  const length = 3
  // 判断横向胜利
  for (let i = 0; i < length; i++) {
    let win = true
    for (let j = 0; j < length; j++) {
      if (pattern[i * 3 + j] !== shape) win = false
    }
    if (win) return true
  }

  // 判断纵向胜利
  for (let i = 0; i < length; i++) {
    let win = true
    for (let j = 0; j < length; j++) {
      if (pattern[j * 3 + i] !== shape) win = false
    }
    if (win) return true
  }

  // 判断斜向胜利
  {
    let win = true
    for (let i = 0; i < length; i++) {
      if (pattern[i * 3 + 2 - i] !== shape) win = false
    }
    if (win) return true
  }
  {
    let win = true
    for (let i = 0; i < length; i++) {
      if (pattern[i * 3 + i] !== shape) win = false
    }
    if (win) return true
  }
}

/**
 * 游戏获胜及后续处理
 * @param {*} pattern
 * @param {*} shape
 */
const getResult = () => {
  if (calculateWinner(pattern, shape)) {
    isFinish = true
    winnerText = `${shape === 1 ? `○` : `×`} is winner!`
    document.getElementById('winner__text').innerText = winnerText
  }

  shape = 3 - shape

  render()
}

/**
 * 玩家落子
 * @param {*} col 列
 * @param {*} row 行
 */
const userMove = (row, col) => {
  if (!pattern[row * 3 + col] && !isFinish) {
    pattern[row * 3 + col] = shape
    getResult()
    computerMove()
  }
}

/**
 * 电脑落子
 */
const computerMove = () => {
  const choice = bestChoice(pattern, shape)
  if (choice.point) pattern[choice.point[0] * 3 + choice.point[1]] = shape
  getResult()
}

/**
 * 重新开始
 */
const replay = () => {
  // 重置棋盘数据
  pattern = new Array(9).fill(0)
  // 清空获胜者信息
  document.getElementById('winner__text').innerText = null
  // 重置结束标识
  isFinish = false

  render()
}

/**
 * 数组克隆
 * @param {*} pattern
 */
const clone = pattern => {
  return Object.create(pattern)
}

init()

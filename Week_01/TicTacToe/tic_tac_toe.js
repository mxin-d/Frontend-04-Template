// 初始化棋盘
const pattern = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
]

// 初始化棋子形状
let shape = 1

/**
 * 初始化
 */
const init = () => {
  render()
}

/**
 * 棋盘及棋子渲染
 * 棋子规则：1为○，2为×
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
 * @param {*} col 列
 * @param {*} row 行
 */
const getSquare = (row, col) => {
  const square = document.createElement('div')

  // 添加属性
  square.classList.add('square')

  // 棋子显示规则
  square.innerText =
    pattern[row][col] == 1 ? '○' : pattern[row][col] == 2 ? '×' : ''

  // 绑定落子事件
  square.addEventListener('click', () => move(row, col))

  return square
}

/**
 * 计算获胜者
 * @param {*} squares
 */
const calculateWinner = () => {
  
}

/**
 * 落子
 * @param {*} col 列
 * @param {*} row 行
 */
const move = (row, col) => {
  if (!pattern[row][col]) {
    pattern[row][col] = shape
    console.log(calculateWinner())
    shape = 3 - shape
    render()
  }
}

init()

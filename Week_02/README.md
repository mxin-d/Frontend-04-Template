# Week_02 总结

### 1. 寻路 | 实现一个地图编辑器
* 运用一维数组技巧绘制地图，起到二维数据做的用
* 运用鼠标事件 `mousemove` 和 `mousedown` 与地图交互并改变样式
* 运用本地存储 `localStorage` 保存地图数据

### 2. 寻路 | 广度优先搜索
* 数据结构
    - 队列 `queue` ，先进先出，用于广度优先
        1. `push` 队尾入队，`shift` 队首出队
        2. `unshift` 队首入队， `pop` 队尾出队
    - 栈 `stack` , 先进后出，用于深度优先
        1. `push` 栈尾入栈，`pop`栈尾出栈
        2. `unshift` 栈首入栈，`shift` 栈首出栈（由于JavaScript数据实现的方式，不推荐此种方式）
* 广度优先
    - 采用队列数据结构，`push` 队尾入队，`shift` 队首出队
    - 初始化start点，将周围点（目前是上下左右方向）加入队列，然后把队列中的点周围的点也加入队列
    - 走过的点出队，直到找到目标为止

### 3. 寻路 | 通过异步编程可视化寻路算法
* 使用 Promise 封装 sleep 方法进行异步延时
* 将走过的点标记颜色，观察广度优先算法寻路的过程

### 4. 寻路 | 处理路径问题
* 增加斜向坐标，上下左右 左上 左下 右上 右下
* 利用一维数组特性使用 Object.create 拷贝 map 到 table 中用来存放路径前置坐标，操作table 不影响 map
* 将走过点的前置节点pre记录到table中，例如在找a节点上下左右 左上 左下 右上 右下节点时，记录a节点坐标即可
* 从目标点位置寻找到起始点的路径，利用保存在table中的pre节点坐标
* 利用前置节点的方式绘制出路径

### 5. 寻路 | 启发式搜索（一）
* 用土鳖数组实现一个排序类Sorted，用于返回最小数组
* take 方法中如果当前 data 为空时，返回 undefined ，而不是 null ，因为 null 也有可能参与比较
* 对比方法中，循环内部操作不直接使用splice方法因为时间复杂度为O(n)，所以直接对比，取到最小值后跟数组最后一位换位置，然后直接pop掉

### 6. 寻路 | 启发式搜索（二）
* 替换之前的queue，改用Sorted
* 将出队和入队的方法分别换成类中的 take 和 give

### 7. 使用 LL 算法构建 AST | 四则运算
* `AST` 抽象语法树概念，编程语言分词，将词根据规则构建语法树
* Left left 算法 
* Left Right 算法
* 四则运算规则
    - TokenNumber
        - 1 2 3 4 5 6 7 8 9 0 的组合，允许插入小数点
    - Operator
        - \+ \- \* \/ 之一
    - Whitespace
        - \<SP>
    - LineTerminator
        - \<LF>\<CR>
```
<Expression>::=
    <AdditiveExpression><EOF>

<AdditiveExpression>::=
    <MultiplicativeExpression>
    |<AdditiveExpression><+><MultiplicativeExpression>
    |<AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression>::=
    <Number>
    |<MultiplicativeExpression><*><Number>
    |<MultiplicativeExpression></><Number>
```

### 8. 使用 LL 算法构建 AST | 正则表达式
* 利用正则表达式（）特性捕获多种或的条件，将符合条件的内容匹配出来
* exec 使用：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec

### 9. 使用 LL 算法构建 AST | LL词法分析
* 使用JavaScript新特性 function* 及 yield
* 生成器函数：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*

### 10. 使用 LL 算法构建 AST | LL语法分析（一）
* 对应乘法、除法的规则补全 \* 和 \/ `MultiplicativeExpression` 逻辑

### 11. 使用 LL 算法构建 AST | LL语法分析（二）
* 补全加减法 `AdditiveExpression` 逻辑
* 补全最终 `Expression` 逻辑







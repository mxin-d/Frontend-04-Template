# Week_03 总结

### 1. 字符串分析算法 | 总论
* 字典树
    - 大量高重复字符串的存储于分析（例如1亿个字符中某些关键词出现的频率）
* KMP
    - 在长字符串里找模式（一个长字符串中有无某一个段字符串，包含关系，部分匹配）
* Wildcard
    - 带通配符的字符串模式
* 正则
    - 字符串通用模式匹配
* 状态机
    - 通用的字符串分析
* LL LR
    - 字符串多层级结构分析

### 2. 字符串分析算法 | 字典树
* 创建对象树形结构，每次插入时会检查已有字段，相同的字段会使用相同路径并且重复插入的内容次数++

### 3. 字符串分析算法 | KMP字符串模式匹配算法
* 利用table记录匹配次数
* 将需要对比的字符串和样本参照table中的数据进行比对，最终可以得出与indexOf相同的结果

## 4. 字符串分析算法 | Wildcard
* 判断星号数量，分段处理
* 处理首个\*前内容
* 首个\*号到最后一个\*之间内容
* 最后一个\*后面内容

### 5. proxy与双向绑定 | proxy的基本用法
* 了解 `proxy` 的基本使用，”强大且危险“，可预测性低
* 使用 `set` 设置拦截操作， 配合 `Reflect` 使用

### 6. proxy与双向绑定 | 模仿reactive实现原理（一）
* 了解 `proxy` 的 `get` 与 `set` 用法，包装简易版 reactive
* 使用 `Reflect` 对应的 `get` 与 `set` 辅助完成

### 7. proxy与双向绑定 | 模仿reactive实现原理（二）
* `set` 时执行回调函数，显示变化后的数据

### 8. proxy与双向绑定 | 模仿reactive实现原理（三）
* 将 `get` 过的对象 `target` 及其内部的 `property` 保存到 `usedReactivities` 中
* 根据 `usedReactivities` 中的内容在 `effect` 中处理 `callback` 与 `property` 的对应关系， `set` 时调用对应 `callback`

### 9. proxy与双向绑定 | 优化reactive
* 支持级联操作，需要在 `get` 到的内容进行类型校验，如 `object` ，如果属性为对象，多次调用 `reactive`
* 将 `proxy` 缓存到 `reactivities` 中，每次调用 `reactive` 时在 `reactivities` 查找，如果已存在直接返回，没有的话先存入 `reactivities`

### 10. proxy与双向绑定 | reactivity响应式对象
* 数据双向绑定，初始化响应式数据
* 替换 `Map` 使用 `WeakMap`
* 回收 `usedReactivities`

### 11. 使用Range实现DOM精确操作 | 基本拖拽
* 事件绑定及解绑
* 处理鼠标位置坐标

### 12. 使用Range实现DOM精确操作 | 正常流里的拖拽
* 保存所有 `range`
* 寻找最近的 `range` 并 `insertNode`
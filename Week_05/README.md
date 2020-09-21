# Week_05 总结

### 1. JS表达式 | 运算符和表达式
* Grammer
    - Grammer Trees vs Priority
    - Left hand side & Right hand side
* Runtime
    - Type Convertion
    - Renfrence

> 语法结构能表达的规则要多于运算符，不同的使用场景会有不同的优先级
* Expressions 优先级
    * Member
        - a.b
        - a[b]
        - foo\`string`
        - super.b
        - super['b']
        - new.target
        - new Foo()
    * New
        - new Foo
    > 例子
    > new a()()
    > new new a()

    * Call
        - foo()
        - super()
        - foo()['b']
        - foo().b
        - foo()`abc`
    > 例子
    > new a()['b'] 优先级会降级

    * Left Handside & Right Handside
    > 如果不能放左边的默认就是右边
    > a.b = c
    > a + b = c

    * Update
        - a ++
        - a --
        - ++ a
        - -- a
    > 不合法例子
    > ++ a ++
    > ++ (a ++)
    > Uncaught SyntaxError: Invalid left-hand side expression in prefix operation

    * Unary 单目运算符
        - delete a.b
        - void foo()
        - typeof a
        - \+ a
        - \- a 
        - ~ a
            - 按位取反，强制转换数值类型
        - ! a
            - 强制转换布尔类型
        - await a

    * Exponential 指数
        - \** 
            - 从后到前运算
    > 例子
    > 3 \** 2 \** 3
    > 3 \** (2 \** 3)

    * Multiplicative 乘法 强制转换数值类型
        - \* 
        - \/ 
        - \%

    * Additive
        - \+ 
        - \-

    * Shift 移位
        - \<< 
        - \>> 
        - \>>>

    * Relationship 关系
        - \< 
        - \> 
        - \<= 
        - \>= 
        - instanceof
        - in
    
    * Equality
        - \==
        - \!=
        - \===
        - \!==
    
    * Bitwise 按位
        - \&
        - \^
        - \|
    
    * Logical 逻辑
        - \&&
        - \||

    * Conditional 条件
        - \?:

* Renference 
    - Object
    - key
    - delete
    - assign

### 2. JS表达式 | 类型转换
* Type Convertion
    - a \+ b
    - "false" == false
    - a[o] = 1

* Unboxing 拆箱转换
    - ToPrimitive
    - toString() vs valueOf
    - Symbol.toPrimitive

```javascript
    var o = {
        toString(){ return '2' },
        valueOf(){ return 1 },
        [Symbol.toPrimitive](){ return 3 }
    }
```
* Boxing
> 不带`new`时直接返回的是值，带`new`返回对象，装箱

|类型|对象|值|
|----|----|----|
|Number|new Number(1)|1|
|String|new String("a")|"a"|
|Boolean|new Boolean(true)|true|
|Symbol|new Object(Symbol("a"))|Symbol("a")|

### 3. JS语句 | 运行时相关概念
* Grammer
    - 简单语句
    - 组合语句
    - 声明
* Runtime
    - Completion Record 语句执行结果记录
        - \[[type]]: normal, break, continue, return, throw
        - \[[value]]: 基本类型
        - \[[target]]: label
    - Lexical Environment 词法环境（作用域相关）

### 4. JS语句 | 简单语句和复合语句
* 简单语句
    - ExpressionStatement
    - EmptyStatement
    - DebuggerStatement
    - ThrowStatement
    - ContinueStatement
    - BreakStatement
    - ReturnStatement
* 复合语句
    - BlockStatement
    ```javascript
     // [[type]]: normal
     // [[value]]: --
     // [[target]]: --
    {
        //...
    }
    ```
    - IfStatement
    - SwitchStatement
    - IterationStatement
        - while
        - do while
        - for
        - for in
        - for of
        - for await of
        - 注意
            - var
            - const \/ let
            - in
    - WithStatement
    - LabelledStatement
    - TryStatement

### 5. 语句 | 声明
* 声明
    - FunctionDeclaration
    - GeneratorDeclaration
    - AsyncFunctionDeclaration
    - AsyncGeneratorDeclaration
    - VariableStatement
    - ClassDeclaration
    - LexicalDeclaration
> 预处理机制，`var` 变量提升
> 作用域，`var` 函数级作用域，`let/const` 块级作用域

### 6. JS结构化 | 宏任务和微任务
* JS执行粒度（运行时）
    * 宏任务
    * 微任务 (Promise)
    * 函数调用 (Execution Context 执行上下文)
    * 语句/声明 (Completion Record)
    * 表达式 (Reference)
    * 直接量/变量/this...

* 事件循环 (Event Loop)
    - `wait` -> `get code` -> `execute`  循环
    - 例如浏览器等待一些事件，获取代码，执行然后循环此操作
    - 例如node 等待 IO 

### 7. JS结构化 | JS函数调用
* ECMAScript Code Execution Context
    - code evaluation state
    - Function
    - Script and Module
    - Realm
    - LexicalEnvironment
    - VariableEnvironment

* Generator Execution Context
    - code evaluation state
    - Function
    - Script and Module
    - Realm
    - LexicalEnvironment
    - VariableEnvironment
    - Generator

* Environment Records
    - Declarative Environment Records
        - Function Environment Records
        - Module Environment Records
    - Global Environment Records
    - Object Environment Records

* Clourse
    - 代码部分 Code
    - 环境部分 Environment
        - 有一个 `Object` 和变量的序列组成
    > 在 `JavaScript` 每一个函数都会生成一个闭包
    > 每一个函数都会带一个它定义时所在的 `Environment Records`，将其保存在自己的函数对象上，成为一个属性

* Realm (领域，ES2018之后纳入规范)
    - 在一个 `JavaScript` 引擎实例里，所有的内置对象都会放进 `Realm` 
    - 在不同的 `Realm` 实例之间，完全互相独立，`instanceof` 可能会失效
    > 不同的 `iframe` 中创建对象，原型是不一样的，原型需要一个东西去记录
    > 在JS中，函数表达式和对象直接量均会创建对象
    > 使用\.做隐式转换也会创建对象
    > 这些对象也是有原型的，如果没有 `Realm` ，就不知道他们的原型是什么
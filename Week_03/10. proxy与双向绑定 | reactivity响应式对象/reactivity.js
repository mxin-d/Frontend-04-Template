const reactiveMap = new WeakMap()
const targetMap = new WeakMap()
const effectStack = []

/**
 * 副作用函数
 * @param {*} fn
 */
function effect(fn) {
  try {
    // 将需要执行的回调函数入栈
    effectStack.push(fn)

    // 执行该回调，进入proxy的get拦截
    return fn()
  } finally {
    // 依赖收集完毕及所有get流程走完，当前回调函数出栈
    effectStack.pop()
  }
}

/**
 * 依赖收集
 * @param {*} target
 * @param {*} key
 */
function track(target, key) {
  // 初始化依赖Map
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  // 第二层依赖使用Set存放key对应的effect
  let dep = depsMap.get(key)
  if (!dep) {
    targetMap.get(target).set(key, (dep = new Set()))
  }

  // 取当前栈中的effect存入第二层依赖中
  const activeEffect = effectStack[effectStack.length - 1]
  activeEffect && dep.add(activeEffect)
}

/**
 * 触发响应，执行effect
 * @param {*} target
 * @param {*} key
 */
function trigger(target, key) {
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const effects = depsMap.get(key)
    effects && effects.forEach(run => run())
  }
}

/**
 * 定义响应式对象，返回proxy代理对象
 * @param {*} object
 */
function reactive(object) {
  if (reactiveMap.has(object)) return reactiveMap.get(object)

  const proxy = new Proxy(object, handlers)

  reactiveMap.set(object, proxy)
  return proxy
}

/**
 * 处理器对象，定义捕获器
 */
const handlers = {
  set(target, key) {
    Reflect.set(...arguments)
    trigger(target, key)
  },
  get(target, key) {
    track(target, key)
    return typeof target[key] === 'object'
      ? reactive(target[key])
      : Reflect.get(...arguments)
  },
}

/**
 * 计算属性
 * @param {*} fn 
 */
function computed(fn) {
  return {
    get value() {
      return effect(fn)
    },
  }
}

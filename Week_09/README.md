# Week_09 总结

为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？
- 对于 `inline` 水平的元素，其本身就是 `line box`, 就是一行流，因此，不存在所谓的 `first-line` 的说法。因此，`first-line` 伪类/伪元素要想起作用，必须应用在 `block` 水平的元素上，例如 `display` 为如下值的些元素 `block`, `inline-block`, `table-cell` 或 `table-caption` .

- 再由于 `first-line` 伪类/伪元素是处理文字字符的，因此，只有部分的CSS声明可以使用，类似 `float`，`position:absolute` 这些破坏性属性显然是不支持的。

### 参考资料
- first-line伪类实现兼容IE6/IE7的单标签多背景效果：https://www.zhangxinxu.com/wordpress/2013/07/first-line%e4%bc%aa%e7%b1%bb-%e5%85%bc%e5%ae%b9-ie6-ie7-%e5%a4%9a%e8%83%8c%e6%99%af-multiple-backgrounds/
- 深入CSS ::first-letter伪元素及其实例等：https://www.zhangxinxu.com/wordpress/2016/09/css-first-letter-pseudo-element/
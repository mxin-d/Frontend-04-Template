# Week_06 总结

结合课程内容及重学前端浏览器部分知识总结并整理的博客文章：https://juejin.im/post/6874114366023663623

**IOS-OSI 七层网络模型**
- HTTP -- require('http')
    - 应用层
    - 表示层
    - 会话层
- TCP -- require('net')
    - 传输层
- Internent 
    - 网络层
- 4G/5G/WI-FI
    - 数据链路层
    - 物理层

**TCP和IP**
- TCP
    - 流
    - 端口

- IP
    - 包
    - IP地址
    - libnet/libpcap

- HTTP
    - Request
    - Response


**手动实现HTTP**
- 第一步 HTTP 请求总结
    - 设计一个 `HTTP` 请求类
    - `Content-Type` 是一个必要字段，要有默认值
    - `body` 是KV格式
    - 不同的 `Content-Type` 会影响 `body` 的格式

- 第二步 send 函数总结
    - 在 `Request` 的构造器中收集必要的信息
    - 设计一个 `send` 函数，把请求真实发送到服务器
    - `send` 函数应该是异步的，所以返回 `Promise`

- 第三步 发送请求
    - 设计支持已有的 `connection` 或者新创建 `connection`
    - 收到数据传给 `parser`
    - 根据 `parser` 的状态 `resolve` `Promise`

- 第四步 ResponseParser 总结
    - `Response` 必须分段构造，使用 `ResponseParser` **装配**
    - `ResponseParser` 分段处理 `ResponseText`，使用状态机分析文本结构

- 第五步 BodyParser 总结
    - `Response` 的 `body` 可能根据 `Content-Type` 有不同的结构，因此采用子 `Parser` 的结构来处理
    - 以 `TrunkedBodyParser` 为例，使用状态机处理 `body` 的格式
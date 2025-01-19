一个 monorepo 项目deomo，做了一个简单的插件，用来解决SDK 子项目通过 alias 被其他项目引入（从源码引入而不是从dist）时无法模块化（alias本身很冗长）的问题。
更换 monorepo 源码引用的方式，同时更换 SDK 子项目的构建工具。

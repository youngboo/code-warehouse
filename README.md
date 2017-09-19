# 打造自己的库

造轮子一直都是前端开发中绕不过去的槛，作为初学者倒是不用想太多，自己私底下一定要造，你造轮子写的每一行代码都会化成你的底蕴。

值得模仿的库很多，经典的比如 jQuery、 Lodash ，大型一点比如 vuejs 、react ，我们可以在模仿这些库中学到很多代码技巧，但是更重要的是摸清这些库的设计思想。始终要提现自己的是，语言和代码只是工具，体系和思想才是灵魂，什么时候你使用语言就像拿起锤子钉钉子一样自然，什么时候你就能造出自己的摩天大厦。

好吧，万丈高楼平地起，我们先从简单的开始，给我们的项目取名 **adam** ，你们的项目名你们自己决定。

这里是[基础代码](http://git.imweb.io/imweb-teacher/adam)，里面有十个函数了，完善这十个函数，**重点是，要有测试用例**。

这个项目**完全自由**，目录结构自己决定，甚至测试框架都可以自己定。

给了十个函数，但不限定十个，你们自己使用频率非常高的函数可以加进来。

**注意**：

* `npm run test` 可以跑测试
* code coverage 90% 以上
* `npm run coverage` 跑测试并告知 coverage 的结果

**加分项**：

1. 使用 ES6 ，并且编译出一份 ES5 的文件
2. 遵从 ESLint 或者 standardjs 等代码规范
3. 函数多多益善
4. [发布到 npm](https://github.com/muwenzi/Program-Blog/issues/12) ，发布后把链接贴到你的总结里
5. 测试文件统一归到 `test` 目录下
6. code coverage 不小于 95%
7. 使用 git hook 来自动跑用例和代码覆盖率
   * [自定义 Git - Git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
   * [husky](https://github.com/typicode/husky)
class Base{
  /**
   * 获取指定的 querystring 中指定 name 的 value
   * @param {String} name
   * @param {String} querystring
   * @return {String|undefined}
   *
   * query('hello', '?hello=js') 结果是 js
   *
   */
  query (name, querystring) {
    let result = undefined
    if((typeof querystring === 'string' && typeof name === 'string')) {
      let reg = new RegExp('\\?' + name + '=')
      if(querystring.match(reg)){
        result = querystring.replace(reg,'')
      }
    }
    return result
  }
  /**
   * 序列化对象，就是把对象转成 url 字符串
   * @param {Obj} data
   * @return {String}
   *
   * serialize({hello: 'js', hi: 'test'}) 结果是 ''
   */
  serialize (data) {
    let str = ''
    if (!(data instanceof Object && Object.keys(data).length > 0)) {
      return null
    } else {
      let length = Object.keys(data).length
      Object.keys(data).map((key,index) => {
        if(index === length-1){
          str = str + key + '=' + data[key]
        }else {
          str = str + key + '=' + data[key] + '&'
        }

      })
      return str
    }

  }

  /**
   * 根据选择器查找 DOM
   * 就是模拟 $() ，当然，这里返回元素的 DOM 对象即可
   * @param {String} selector
   * @return {DOM|Null}
   */
  $ (selector) {
    return (typeof selector === 'string') ? document.querySelector(selector) : null
  }


  /**
   * 删除 DOM 节点
   * @param {DOM} node
   * @return {DOM}
   */

  removeNode (node) {
    return (node instanceof HTMLElement) ? node.parentNode.removeChild(node) : null
  }

  /**
   * 在 target 节点之后插入 node 节点
   * 类似 $().insertAfter()
   * @param {DOM} node
   * @param {DOM} target
   */
  insertAfter (node, target) {
    if (!(node instanceof HTMLElement && target instanceof HTMLElement)) {
      return null
    }
    let parent = target.parentNode
    if(parent.lastChild === target) {
      parent.appendChild(node)
    }else {
      parent.insertBefore(node ,target.nextSibling)
    }
  }

  /**
   * 添加类名
   * @param {DOM} node
   * @param {String|Array} className
   */
  addClass (node, className) {
    if (!(node instanceof HTMLElement && (typeof className  === 'string' || Array.isArray(className)))) {
      return null
    }
    if (typeof className  === 'string') {
      node.classList.add(className)
    }
    if (Array.isArray(className)){
      className.map((item) => {
        node.classList.add(item)
      })
    }
  }


  /**
   * 移除类名
   * @param {DOM} node
   * @param {String|Array} className
   */
  removeClass (node, className) {
    if (!(node instanceof HTMLElement && (typeof className  === 'string' || Array.isArray(className)))) {
      return null
    }

    let classArr = node.classList
    if (classArr && classArr.length > 0) {
      let list = Array.from(node.classList)
      if (typeof className === 'string') {
        let index = list.indexOf(className)
        if(index >= 0) {
          node.classList.remove(className)
        }
      }
      if (Array.isArray(className) && className.length > 0) {
        className.map((item) => {
          let index = list.indexOf(item)
          if(index >= 0) {
            node.classList.remove(item)
          }
        })
      }
    }


  }

  /**
   * 获取绝对路径
   * @param {String} url
   * @return {String}
   *
   * getAbsoluteUrl('/jerojiang') => 'http://imweb.io/jerojiang'
   * 在当前页面获取绝对路径，这里要创建 A 元素，测试用例看你们的了
   */
  getAbsoluteUrl (url) {
    if(!(typeof url === 'string' && url.match(/^\/\w+/))) {
      return null
    }
    return location.host + url
  }

  /**
   * 防抖动
   * 防抖动函数了啦，有做个这个习题，不清楚回去复习
   */
  debounce (callback, time) {
    time = time || 300
    let timerID
    return () => {
      if (timerID) {
        timerID = clearTimeout(timerID)
      }
      timerID = setTimeout(()=> {
        callback()
      },time)
    }

  }

  /**
   *  根据索引移出数组的某一项
   * @param {Number} index
   * @param {Array} arr
   * @return {Array}
   *
   * removeItemByIndex(1, [1,2,3]) => [1, 3]
   */
  removeItemByIndex (index, arr) {
    if(!(Array.isArray(arr) && Number.isInteger(index) && index >= 0 && index <= arr.length)) {
      return null
    }
    arr.splice(index, 1)
    return arr
  }

  /**
   * 休眠指定时间
   * @param time
   * @returns {Promise}
   */
  sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }
}
module.exports = Base

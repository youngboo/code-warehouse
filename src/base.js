const MAX_SAFE_INTEGER = 9007199254740991
const MAX_ARRAY_LENGTH = 4294967295
class Base {
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
    let result
    if ((this.isString(querystring) && this.isString(name))) {
      let reg = new RegExp('\\?' + name + '=')
      if (querystring.match(reg)) {
        result = querystring.replace(reg, '')
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
      Object.keys(data).map((key, index) => {
        if (index === length - 1) {
          str = str + key + '=' + data[key]
        } else {
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
    return this.isString(selector) ? document.querySelector(selector) : null
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
    if (parent.lastChild === target) {
      parent.appendChild(node)
    } else {
      parent.insertBefore(node, target.nextSibling)
    }
  }

  /**
   * 添加类名
   * @param {DOM} node
   * @param {String|Array} className
   */
  addClass (node, className) {
    if (!(node instanceof HTMLElement && (this.isString(className) || Array.isArray(className)))) {
      return null
    }
    if (typeof className === 'string') {
      node.classList.add(className)
    }
    if (Array.isArray(className)) {
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
    if (!(node instanceof HTMLElement && (this.isString(className) || Array.isArray(className)))) {
      return null
    }

    let classArr = node.classList
    if (classArr && classArr.length > 0) {
      let list = Array.from(node.classList)
      if (this.isString(className)) {
        let index = list.indexOf(className)
        if (index >= 0) {
          node.classList.remove(className)
        }
      }
      if (Array.isArray(className) && className.length > 0) {
        className.map((item) => {
          let index = list.indexOf(item)
          if (index >= 0) {
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
    if (!(this.isString(url) && url.match(/^\/\w+/))) {
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
      timerID = setTimeout(() => {
        callback()
      }, time)
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
    if (!(Array.isArray(arr) && Number.isInteger(index) && index >= 0 && index < arr.length)) {
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

  /**
   * 判断是否是字符串
   * @param str
   * @returns {boolean}
   */
  isString (str) {
    if ((typeof str).toLowerCase() === 'string' || str instanceof String) {
      return true
    } else {
      return false
    }
  }

  /**
   * 判断是否是原型
   * @param value
   * @returns {boolean}
   */
  isPrototype (value) {
    const ctor = value && value.constructor
    const proto = (typeof ctor === 'function' && ctor.prototype) || Object.prototype

    return value === proto
  }

  /**
   * 判断是否是对象
   * @param value
   * @returns {boolean}
   */
  isObject (value) {
    const type = typeof value
    return value != null && (type === 'object' || type === 'function')
  }
  /**
   * 判断数组，对象是否是空
   * @param value
   * @returns {boolean}
   */
  isEmpty (value) {
    if (value === null) {
      return true
    }
    if (Array.isArray(value) || this.isString(value)) {
      return !value.length
    }
    if (this.isPrototype(value)) {
      return !Object.keys(value).length
    }
    for (const key in value) {
      if (Object.hasOwnProperty.call(value, key)) {
        return false
      }
    }
    return true
  }

  /**
   * 执行指定次数
   * @param n
   * @param iteratee
   * @returns {Array}
   */
  times (n, iteratee) {
    if (n < 1 || n > MAX_SAFE_INTEGER) {
      return []
    }
    let index = -1
    const length = Math.min(n, MAX_ARRAY_LENGTH)
    const result = new Array(length)
    while (++index < length) {
      result[index] = iteratee(index)
    }
    index = MAX_ARRAY_LENGTH
    n -= MAX_ARRAY_LENGTH
    while (++index < n) {
      iteratee(index)
    }
    return result
  }

  /**
   * 二分法查找值
   * @param {Any} key
   * @param {Array} array
   * @return {Number}
   */
  binaryFind (array, key) {
    let left = 0
    let right = array.length - 1

    while (left <= right) {
      let mid = Math.floor((left + right) / 2)
      if (array[mid] === key) {
        return mid
      } else if (array[mid] < key) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    return -1
  }

  /**
   * 快排
   * @param array
   * @param left
   * @param right
   */
  quickSort (array, left, right) {
    if (left >= right) {
      return
    }
    let i = left
    let j = right
    let key = array[left]
    while (i < j) {
      while (i < j && array[j] > key) {
        j--
      }
      array[i] = array[j]
      // 从后往前找到第一个比key小的数与array[i]交换；
      while (i < j && array[i] < key) {
        i++
      }
      array[j] = array[i]
      // 从前往后找到第一个比key大的数与array[j]交换；
    }
    array[i] = key
    // 一趟快排之后已经将key的位置找到。
    this.quickSort(array, left, i - 1)
    // 对key左边的进行排序
    this.quickSort(array, i + 1, right)
    // 对key右边的进行排序
  }
}
module.exports = Base

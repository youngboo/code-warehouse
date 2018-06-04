function Base(){
/**
 * 获取指定的 querystring 中指定 name 的 value
 * @param {String} name
 * @param {String} querystring
 * @return {String|undefined}
 *
 * query('hello', '?hello=js') 结果是 js
 *
 */
 this.query =function(name, querystring) {
  if (!(typeof querystring === 'string' && typeof name === 'string')) {
    return undefined
  } else {
    let reg = new RegExp('(?=^\?' + name + '\=)')
    let result = querystring.match(reg)
    return result !== null ? result : undefined
  }


}
/**
 * 序列化对象，就是把对象转成 url 字符串
 * @param {Obj} data
 * @return {String}
 *
 * serialize({hello: 'js', hi: 'test'}) 结果是 ''
 */
 this.serialize=function (data) {
  let strs = ''
  if(data instanceof Object) {
    Object.keys(data).map((key) => {
      str = str + key + ':"' + data[key] + '",'
    })
  }else{

  }
  return strs
}

/**
 * 根据选择器查找 DOM
 * 就是模拟 $() ，当然，这里返回元素的 DOM 对象即可
 * @param {String} selector
 * @return {DOM|Null}
 */
 this.$ =function (selector) {
  return (selector instanceof String) ? document.querySelector(selector) : null
}


/**
 * 删除 DOM 节点
 * @param {DOM} node
 * @return {DOM}
 */

 this.removeNode = function (node) {
  return (node instanceof HTMLElement) ? node.parentNode.removeChild(node) : null
}

/**
 * 在 target 节点之后插入 node 节点
 * 类似 $().insertAfter()
 * @param {DOM} node
 * @param {DOM} target
 */
 this.insertAfter=function (node, target) {
  if(!(node instanceof HTMLElement) || !(target instanceof HTMLElement)){
    return
  }
  node.parentNode.insertChildAfter(target, node)
}

/**
 * 添加类名
 * @param {DOM} node
 * @param {String|Array} className
 */
 this.addClass =function(node, className) {

}


/**
 * 移除类名
 * @param {DOM} node
 * @param {String|Array} className
 */
 this.removeClass=function (node, className) {
  if(node instanceof HTMLElement) {

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
 this.getAbsoluteUrl =function (url) {
  if(!(url instanceof String)) {
    return null
  }
  return location.host + '/'+ url
}

/**
 * 防抖动
 * 防抖动函数了啦，有做个这个习题，不清楚回去复习
 */
 this.debounce =function(callback, time) {
  time = time || 300
  let timerID
  return function () {
    if (timerID) {
      timerID = clearTimeout(timerID)
    }
    timerID = setTimeout(()=> {
      callback.call()
    },time)
  }

}

/**
 *  根据所以移出数组的某一项
 * @param {Number} index
 * @param {Array} arr
 * @return {Array}
 *
 * removeItemByIndex(1, [1,2,3]) => [1, 3]
 */
 this.removeItemByIndex =function (index, arr) {
  if(!Array.isArray(arr)) {
    return arr
  }
  if(!Number.isInteger(index)) {
    return null
  }
  if(index < 0 || index > arr.length) {
    return null
  }
  arr.splice(index, 1)
  return arr
}
}
module.exports = Base

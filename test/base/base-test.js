var base = require('../../src/index')
/**
 * 测试获取指定的 querystring 中指定 name 的 value
 */
describe('test query', () => {
  test('query undefined', () => {
    expect(base.query({a:1},'aaa')).toBeUndefined()
    expect(base.query('a',{0:'aaa'})).toBeUndefined()
    expect(base.query('a','aaa')).toBeUndefined()
    expect(base.query('query','?query!=test')).toBeUndefined()
  })
  test('query normal', () => {
    expect(base.query('a','?a=test')).toBe('test')
    expect(base.query('query','?query=test')).toEqual('test')
  })
})

/**
 * 测试序列化对象
 */
describe('test serialize', () => {
  test('serialize undefined', () => {
    expect(base.serialize('joi')).toBeNull()
    expect(base.serialize(1)).toBeNull()
    expect(base.serialize({})).toBeNull()
    expect(base.serialize(null)).toBeNull()
    expect(base.serialize(undefined)).toBeNull()
    expect(base.serialize('')).toBeNull()

  })
  test('serialize normal', () => {
    //var a = base.serialize({a:1,b:'jone'})
    expect(base.serialize({a:1})).toBe('a=1')
    expect(base.serialize({a:1,b:2})).toBe('a=1&b=2')
    expect(base.serialize([1])).toBe('0=1')
  })
})

/**
 * 测试dom查找器
 */
describe('test query dom', () => {
  test('query $() null', () => {
    expect(base.$(123)).toBeNull()
    expect(base.$([])).toBeNull()
    expect(base.$({})).toBeNull()
  })
  test('query $()', () => {
    document.body.innerHTML = '<div id="a">test</div>'
    let div = base.$('#a')
    let notNode = base.$('aaa')
    expect(div.nodeName.toLowerCase()).toBe('div')
    expect(div.innerHTML).toBe('test')
    expect(notNode).toBe(null)
  })
})

/**
 * 测试删除dom节点
 */
describe('test removeNode', () => {
  test('removeNode null', () => {

    let notNode = document.querySelector('abc')
    expect(base.removeNode(notNode)).toBeNull()
    expect(base.removeNode('abec')).toBeNull()
    expect(base.removeNode([])).toBeNull()
    expect(base.removeNode({})).toBeNull()

  })
  test('removeNode normal', () => {
    document.body.innerHTML = '<div id="a"><p class="p"></p></div>'
    let div = document.querySelector('#a')
    let p = document.querySelector('.p')
    base.removeNode(p)
    expect(div.childList).toBeUndefined()
    expect(document.querySelector('.p')).toBeNull()
  })
})

/**
 * 测试在 target 节点之后插入 node 节点
 */
describe('test insertAfter', () => {
  test('insertAfter null', () => {
    document.body.innerHTML = '<div id="a"><p class="p"></p></div>'
    let notNode = document.querySelector('abc')
    let p = document.querySelector('.p')
    expect(base.insertAfter(notNode, p)).toBeNull()
    expect(base.insertAfter('abec')).toBeNull()
    expect(base.insertAfter([])).toBeNull()
    expect(base.insertAfter({})).toBeNull()

  })
  test('insertAfter normal', () => {
    document.body.innerHTML = '<div id="a"><p class="p"></p></div>'
    let div = document.querySelector('#a')
    let p = document.querySelector('.p')
    let node = document.createElement('span')
    base.insertAfter(node, p)
    //expect(div.childElementCount).toBe(2)
    expect(p.nextSibling.nodeName.toLowerCase()).toBe('span')
  })
  test('insertAfter second', () => {
    document.body.innerHTML = '<div id="a"><p class="p"></p><p class="c"></p></div>'
    let div = document.querySelector('#a')
    let p = document.querySelector('.p')
    let node = document.createElement('span')
    base.insertAfter(node, p)
    expect(div.childElementCount).toBe(3)
    expect(p.nextSibling.nodeName.toLowerCase()).toBe('span')
  })
})

/**
 * 测试添加类名
 */
describe('test addClass', () => {
  test('addClass null', () => {
    document.body.innerHTML = '<div id="a"><p class="p"></p></div>'
    let notNode = document.querySelector('abc')
    expect(base.addClass(notNode, 'aaa')).toBeNull()
    expect(base.addClass('abec', 'aaa')).toBeNull()
    expect(base.addClass([], 'aaa')).toBeNull()
    expect(base.addClass({}, 'aaa')).toBeNull()

  })
  test('addClass normal', () => {
    document.body.innerHTML = '<div id="a"><p class="p"></p></div>'
    let p = document.querySelector('.p')
    base.addClass(p, 'abc')
    expect(p.classList.length).toBe(2)
  })
  test('addClass array', () => {
    document.body.innerHTML = '<div id="a"><p class="p"></p></div>'
    let p = document.querySelector('.p')
    let classArr = ['abc','ac','bc']
    base.addClass(p, classArr)
    expect(p.classList.length).toBe(classArr.length + 1)
  })
})
/**
 * 测试删除类名
 */
describe('test removeClass', () => {
  test('removeClass null', () => {
    document.body.innerHTML = '<div id="a"><p class="p"></p></div>'
    let notNode = document.querySelector('abc')
    let p = document.querySelector('.p')
    expect(base.removeClass(notNode, 'aaa')).toBeNull()
    expect(base.removeClass('abec', 'aaa')).toBeNull()
    expect(base.removeClass('abec', {})).toBeNull()
    expect(base.removeClass([], 'aaa')).toBeNull()
    expect(base.removeClass({}, 'aaa')).toBeNull()
    base.removeClass(p, 'aaa')
    base.removeClass(p, ['aaa'])
    expect(p.classList.length).toBe(1)

  })
  test('removeClass classList=0', () => {
    document.body.innerHTML = '<div id="a"><p class="p"></p></div>'
    let d = document.querySelector('#a')

    base.removeClass(d, 'aaa')
    base.removeClass(d, ['aaa'])
    expect(d.classList.length).toBe(0)

  })
  test('removeClass string', () => {
    document.body.innerHTML = '<div id="a"><p class="p"></p></div>'
    let p = document.querySelector('.p')
    base.removeClass(p, 'p')
    expect(p.classList.length).toBe(0)
  })
  test('removeClass arr', () => {
    document.body.innerHTML = '<div id="a"><p class="p a b"></p></div>'
    let p = document.querySelector('.p')
    base.removeClass(p, ['a','b'])
    expect(p.classList[0]).toBe('p')
    expect(p.classList.length).toBe(1)
  })
})

/**
 * 测试获取绝对路径
 */
describe('test getAbsoluteUrl', () => {
  test('getAbsoluteUrl null', () => {
    expect(base.getAbsoluteUrl(1)).toBeNull()
    expect(base.getAbsoluteUrl([])).toBeNull()
    expect(base.getAbsoluteUrl({})).toBeNull()
    expect(base.getAbsoluteUrl('aaa')).toBeNull()

  })
  test('getAbsoluteUrl string', () => {
    expect(base.getAbsoluteUrl('/a')).toEqual('/a')
  })
})

/**
 * 测试防抖动
 */
describe('test debounce', () => {
  test('debounce click', (done) => {
    document.body.innerHTML = '<button id="btn">点击</button>'
    let btn = document.querySelector('#btn')
    let count = 0
    let debounce = base.debounce(() => {
      count ++
      done()
      expect(count).toBe(1)
    }, 500)
    btn.addEventListener('click',debounce)
    for(var i=1; i < 10; i++) {
      btn.click()
    }
    expect(count).toBe(0)
  })

  test('debounce other', (done) => {
    document.body.innerHTML = '<button id="btn">点击</button>'
    let btn = document.querySelector('#btn')
    let count = 0
    let start = new Date().getTime()
    let end
    let debounce = base.debounce(() => {
      count ++
      done()
      end = new Date().getTime()
      expect(count).toBe(1)
      expect(end-start).toBeGreaterThanOrEqual(300)
      expect(end-start).toBeLessThan(350)
    })
    btn.addEventListener('click',debounce)
    for(var i=1; i < 10; i++) {
      btn.click()
    }
    expect(count).toBe(0)
  })
})

/**
 * 测试根据索引移出数组的某一项
 */
describe('test removeItemByIndex', () => {
  test('remove null', () => {
    expect(base.removeItemByIndex(1, [])).toBeNull()
    expect(base.removeItemByIndex([], {})).toBeNull()
    expect(base.removeItemByIndex({1:0}, {})).toBeNull()
    expect(base.removeItemByIndex(-1, {})).toBeNull()
  })
  test('remove other', () => {
    let arr = [1,2,3]
    expect(base.removeItemByIndex(4, arr)).toBeNull()
    expect(base.removeItemByIndex(3, arr)).toBeNull()
    expect(base.removeItemByIndex(2, arr)).toEqual([1,2])
    arr = [1,2,3]
    expect(base.removeItemByIndex(1, arr)).toEqual([1,3])
    arr = [1,2,3]
    expect(base.removeItemByIndex(0, arr)).toEqual([2,3])
    expect(base.removeItemByIndex(-1, arr)).toBeNull()
  })
  test('remove normal', () => {
    let arr = [1,2,3]
    base.removeItemByIndex(1, arr)
    expect(arr[0]).toBe(1)
    expect(arr.length).toBe(2)
  })
})

/**
 * 测试sleep
 */
describe('test sleep', () => {
  test('sleep null', () => {
    expect(base.removeItemByIndex(1, [])).toBeNull()
    expect(base.removeItemByIndex(1, {})).toBeNull()
    expect(base.removeItemByIndex({1:0}, {})).toBeNull()
    expect(base.removeItemByIndex(-1, {})).toBeNull()
  })
  test('sleep 400', (done) => {
    let start = new Date().getTime()
    let end
      base.sleep(400)
      .then(() => {
        end = new Date().getTime()
        done()
        expect(end-start).toBeGreaterThanOrEqual(400)
        expect(end-start).toBeLessThan(450)
      })

  })
  test('remove normal', () => {
    let arr = [1,2,3]
    base.removeItemByIndex(1, arr)
    expect(arr[0]).toBe(1)
    expect(arr.length).toBe(2)
  })
})

/**
 * 测试 isString
 */
describe('test isString', () => {
  test('not string', () => {
    expect(base.isString(1)).toBe(false)
    expect(base.isString({a:1})).toBe(false)
    expect(base.isString([1,3,4])).toBe(false)
    expect(base.isString(/^\w$/)).toBe(false)
  })
  test('is string', () => {
    expect(base.isString('adv')).toBe(true)
    expect(base.isString(new String('aaa'))).toBe(true)
    expect(base.isString(1+'adv')).toBe(true)
    expect(base.isString('a'.concat('abn'))).toBe(true)
  })
})

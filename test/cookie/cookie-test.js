const MyCookie = require('../../src/cookie')
const Cookie = new MyCookie()
/**
 * 测试getCookie
 */
describe('test getCookie', () => {
  test('getCookie null', () => {
    expect(Cookie.getCookie(1)).toBe('')
    expect(Cookie.getCookie([])).toBe('')
    expect(Cookie.getCookie({})).toBe('')
    expect(Cookie.getCookie('aaa')).toBe('')
  })
  test('getCookie string', () => {
    document.cookie = 'user=123'
    expect(Cookie.getCookie('user')).toEqual('123')
  })
})
/**
 * 测试setCookie
 */
describe('test setCookie', () => {
  test('setCookie null', () => {
    expect(Cookie.setCookie([])).toBeNull()
    expect(Cookie.setCookie({})).toBeNull()
  })
  test('setCookie string', () => {
    Cookie.setCookie('user','123')
    expect(document.cookie).toEqual('user=123')
  })
})
/**
 * 测试removeCookie
 */
describe('test removeCookie', () => {
  test('removeCookie null', () => {
    expect(Cookie.removeCookie([])).toBeNull()
    expect(Cookie.removeCookie({})).toBeNull()
  })
  test('removeCookie string', () => {
    document.cookie = 'user=123'
    Cookie.removeCookie('user')
    expect(document.cookie).toBe('')
  })
})

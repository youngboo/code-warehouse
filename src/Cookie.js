const cookies = document.cookie.split(';')
class Cookie {
  static get (key) {
    let result = undefined
    let reg = new RegExp('^'+key+'=')
    let item = Cookie.find(key)
    if(item) {
      result = item.replace(reg,'')
    }
    return result
  }
  static find (key) {
    let result = undefined
    let reg = new RegExp('^'+key+'=')
    cookies.map((item) => {
      if(item.match(reg)) {
        result = item
      }
    })
    return result
  }
  static set (key, value) {
    key = encodeURIComponent(key)
    value = encodeURIComponent(value)
    document.cookie = `${key}=${value};path=/;domain=ke.baidu.com`
  }
  static remove (key) {
    let cookie = Cookie.find(key)
    if(cookie) {

    }
  }
}
export default Cookie

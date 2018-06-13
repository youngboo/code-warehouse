const base = require('../index')
class Cookie {

   getCookie (cname) {
     if (typeof document === 'undefined') {
       return ''
     }
     if(!base.isString(cname) || !document.cookie || base.isEmpty(document.cookie)){
       return ''
     }
    let name = cname + '='
    let decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === '') {
        c = c.substring(1)
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length)
      }

    }
    return ''
  }
  setCookie (name,value) {
     if(!base.isString(name) || !base.isEmpty(value)){
       return null
     }
     document.cookie = decodeURIComponent(name) + '=' + decodeURIComponent(value)
  }
  removeCookie (name) {
     if(!base.isString(name)) {
       return null
     }
    document.cookie = decodeURIComponent(name) + '=' + this.getCookie(name)+';'+'expires='+new Date(0)+';'
  }
}
module.exports = Cookie

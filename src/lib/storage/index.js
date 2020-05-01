/**
 * 存储模块。集中处理本地缓存内容
 * API：
 *  Local相关:永久存储数据相关操作
 *  session相关：临时存储数据相关操作
 *
 */

import Util from '../common/index.js'
import baseConfig from '../baseConfig/index.js'

function getDomainFromUrl () {
  var host = window.location.hostname
  var level = baseConfig.base.cookieLevel || 2
  if (Util.paramType(level) !== 'Number' || level < 2) {
    level = 2
  }
  var ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
  if (ip.test(host) === true || host === 'localhost') return ''
  var regex = /([^]*).*/
  var match = host.match(regex)
  var urlDomain = []
  if (typeof match !== 'undefined' && match !== null) host = match[1]
  if (typeof host !== 'undefined' && host !== null) {
    var strAry = host.split('.')
    if (strAry.length > 1) {
      if (strAry.length < level) {
        level = strAry.length
      }
      for (var i = strAry.length - 1; i >= 0; i--) {
        if (urlDomain.length === level) {
          break
        }
        urlDomain.push(strAry[i])
      }
      // host = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
    } else {
      return ''
    }
  }
  return '.' + urlDomain.reverse().join('.')
}

var Local = ''
var Session = ''
try {
  Local = typeof window.localStorage === 'object' ? window.localStorage : ''
  Session = typeof window.sessionStorage === 'object' ? window.sessionStorage : ''
} catch (e) {}

function Storage () {
  this.localName = 'FZ_STROAGE'
  this.sessionName = 'FZ_SESSION'
  this.localObj = this.getLocal()
  this.sessionObj = this.getSession()
}

Storage.prototype.setLocal = function (key, value) {
  this.localObj = this.getLocal()
  this.localObj[key] = value
  try {
    if (!Local) {
      if (key !== 'POSTDATA') {
        this.setCookie(this.localName, encodeURIComponent(Util.encode(JSON.stringify(this.localObj))))
      }
    } else {
      Local.setItem(this.localName, Util.encode(JSON.stringify(this.localObj)))
      Session.setItem(this.localName, Util.encode(JSON.stringify(this.localObj)))
      this.removeCookie(this.localName)
    }
  } catch (e) {}
}

Storage.prototype.getLocal = function (key) {
  try {
    var localData = {}
    if (!Local) {
      localData = this.getCookie(this.localName)
      if (localData) {
        localData = decodeURIComponent(localData)
      } else {
        localData = Util.encode('{}')
      }
    } else {
      localData = Local.getItem(this.localName)
      if (!localData) {
        var sessionLocal = Session.getItem(this.localName)
        if (sessionLocal) {
          localData = Session.getItem(this.localName)
          Local.setItem(this.localName, localData)
        } else {
          localData = Util.encode('{}')
        }
      }
      this.removeCookie(this.localName)
    }
    this.localObj = JSON.parse(Util.decode(localData))
    if (!key) {
      return this.localObj
    }
    return this.localObj[key]
  } catch (e) {
    if (!key) {
      return {}
    } else {
      return ''
    }
  }
}

Storage.prototype.removeLocal = function (key) {
  this.localObj = this.getLocal()
  if (Util.objHasKay(this.localObj, key)) {
    delete this.localObj[key]
  }

  if (Util.isEmptyObject(this.localObj)) {
    try {
      if (!Local) {
        this.removeCookie(this.localName)
      } else {
        Local.removeItem(this.localName)
        Session.removeItem(this.localName)
        this.removeCookie(this.localName)
      }
    } catch (e) {}
  } else {
    if (!Local) {
      if (key !== 'POSTDATA' && key !== 'ARK_ID') {
        this.setCookie(this.localName, Util.encode(JSON.stringify(this.localObj)))
      }
    } else {
      Local.setItem(this.localName, Util.encode(JSON.stringify(this.localObj)))
      Session.setItem(this.localName, Util.encode(JSON.stringify(this.localObj)))
      this.removeCookie(this.localName)
    }
  }
}

Storage.prototype.setSession = function (key, value) {
  this.sessionObj = this.getSession()
  this.sessionObj[key] = value
  try {
    if (!Session) {
      if (key !== 'POSTDATA') {
        this.setCookie(this.sessionName, Util.encode(JSON.stringify(this.sessionObj)), 'session')
      }
    } else {
      Session.setItem(this.sessionName, Util.encode(JSON.stringify(this.sessionObj)))
      this.removeCookie(this.sessionName)
    }
  } catch (e) {}
}

Storage.prototype.getSession = function (key) {
  try {
    var sessionData = {}
    if (!Session) {
      sessionData = this.getCookie(this.sessionName) || Util.encode('{}')
    } else {
      sessionData = Session.getItem(this.sessionName) || Util.encode('{}')
      this.removeCookie(this.sessionName)
    }
    this.sessionObj = JSON.parse(Util.decode(sessionData))
    if (!key) {
      return this.sessionObj
    }
    return this.sessionObj[key]
  } catch (e) {
    return {}
  }
}

Storage.prototype.removeSession = function (key) {
  this.sessionObj = this.getSession()
  if (Util.objHasKay(this.sessionObj, key)) {
    delete this.sessionObj[key]
  }

  if (Util.isEmptyObject(this.sessionObj)) {
    try {
      if (!Local) {
        this.removeCookie(this.sessionName)
      } else {
        Session.removeItem(this.sessionName)
        this.removeCookie(this.sessionName)
      }
    } catch (e) {}
  } else {
    if (!Session) {
      if (key !== 'POSTDATA' && key !== 'ARK_ID') {
        this.setCookie(this.sessionName, Util.encode(JSON.stringify(this.sessionObj)), 'session')
      }
    } else {
      Session.setItem(this.sessionName, Util.encode(JSON.stringify(this.sessionObj)))
      this.removeCookie(this.sessionName)
    }
  }
}
Storage.prototype.setCookie = function (name, value, type) {
  var urlDomain = getDomainFromUrl(window.location.href)
  var path = '; path=/'
  var domain = !urlDomain ? '' : ('; domain=' + urlDomain)
  var time = ''
  if (type !== 'session') {
    var date = new Date()
    date.setTime(date.getTime() + 1 * 365 * 24 * 60 * 60 * 1000)
    time = '; expires=' + date.toGMTString()
  }
  document.cookie = name + '=' + value + time + path + domain
}
Storage.prototype.getCookie = function (name) {
  var text = document.cookie
  if (typeof text !== 'string') {
    return ''
  }
  var nameEQ = name + '='
  var ca = text.split(/[;&]/)
  var i; var c
  for (i = 0; i < ca.length; i++) {
    c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1, c.length)
    }
    if (c.indexOf(nameEQ) === 0) {
      return c.substring(nameEQ.length, c.length)
    }
  }
}
Storage.prototype.removeCookie = function (name) {
  var urlDomain = getDomainFromUrl(window.location.href)
  var path = '; path=/'
  var domain = urlDomain ? '' : ('; domain=.' + urlDomain)
  var date = new Date()
  date.setTime(date.getTime() - 1000)
  var time = date.toGMTString()
  document.cookie = name + '=; expires=' + time + path + domain
}

export default new Storage()

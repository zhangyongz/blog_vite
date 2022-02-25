function _classCallCheck (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function')
  }
}

function _defineProperties (target, props) {
  for (let i = 0; i < props.length; i++) {
    const descriptor = props[i]
    descriptor.enumerable = descriptor.enumerable || false
    descriptor.configurable = true
    if ('value' in descriptor) descriptor.writable = true
    Object.defineProperty(target, descriptor.key, descriptor)
  }
}

function _createClass (Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps)
  if (staticProps) _defineProperties(Constructor, staticProps)
  return Constructor
}

// export const baseUrl = 'http://192.168.50.90:3001/v1'
const baseUrl = 'http://log.zhangayong.com/v1'

const toString = Object.prototype.toString
function isDate (val) {
  return toString.call(val) === '[object Date]'
}
function isPlainObject (val) {
  return toString.call(val) === '[object Object]'
}

function encode (val) {
  return encodeURIComponent(val).replace(/%40/g, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']')
}

function buildURL (url, params) {
  if (!params) {
    return url
  }

  const parts = []
  Object.keys(params).forEach(function (key) {
    const val = params[key]

    if (val == null) {
      return
    }

    let values = []

    if (Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]
    }

    values.forEach(function (val) {
      if (isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }

      parts.push(''.concat(encode(key), '=').concat(encode(val)))
    })
  })
  const serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')

    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}

const Log = /* #__PURE__ */(function () {
  function Log (token) {
    const img = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false

    _classCallCheck(this, Log)

    this.token = token
    this.img = img
  }

  _createClass(Log, [{
    key: 'track',
    value: function track (event_name, params, callback) {
      const url = buildURL(baseUrl + '/track', {
        event_name: event_name,
        params: params,
        token: this.token
      })
      this.request(url, callback)
    }
  }, {
    key: 'request',
    value: function request (url, callback) {
      if (this.img) {
        const img = document.createElement('img')
        img.src = url
        document.body.appendChild(img)
      } else {
        try {
          const req = new XMLHttpRequest()
          req.open('GET', url, true) // send the mp_optout cookie
          // withCredentials cannot be modified until after calling .open on Android and Mobile Safari

          req.withCredentials = true

          req.onreadystatechange = function () {
            if (req.readyState === 4) {
              // XMLHttpRequest.DONE == 4, except in safari 4
              if (req.status === 200) {
                if (callback) {
                  callback(req.responseText)
                }
              } else {
                const error = 'Bad HTTP status: ' + req.status + ' ' + req.statusText
                console.error(error)

                if (callback) {
                  callback({
                    status: req.status,
                    error: error
                  })
                }
              }
            }
          }

          req.send(null) // 发送异步请求
        } catch (e) {
          console.error(e)
        }
      }
    }
  }])

  return Log
}())

export default Log
// # sourceMappingURL=log.es5.js.map

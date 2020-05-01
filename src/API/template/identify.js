import { checkPrivate, resetCode } from '../../lib/fillField/index.js'
import { successLog } from '../../lib/printLog/index.js'
import baseConfig from '../../lib/baseConfig/index.js'
import Storage from '../../lib/storage/index.js'
import Util from '../../lib/common/index.js'

function identify (distinctId, isLogin, callback) {
  baseConfig.status.FnName = '$identify'
  resetCode()
  var status = checkPrivate(distinctId, '$alias', true)
  if (!status) {
    return
  }
  if (isLogin === true) {
    Storage.setLocal('ARK_TRACK_LOGIN', true)
  }

  Storage.setLocal('ARK_TRACKID', distinctId)

  baseConfig.status.successCode = '20002'
  baseConfig.status.value = distinctId
  successLog()
  if (Util.paramType(callback) === 'Function') {
    callback.call(callback)
  }
}
export { identify }

/**
 * string
 */

import { _addUnit } from "./common"

export default function install() {

  /**
   * 日期字符串转成日期显示
   */
  String.prototype._toDate = function() {
    return this.replace('T', ' ').split(' ')[0] ?? ''
  }

  // 添加单位
  String.prototype._addUnit = _addUnit

  // 添加属性
  String.prototype.getStringFnProperty = function() {
    return `_${this}StringFn`
  }

  // 添加属性
  String.prototype.stringFnPropertyToRaw = function() {
    const reg = new RegExp('_(.+)StringFn')
    const result = this.match(reg)
    return result?.[1] ?? ''
  }

}
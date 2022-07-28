/**
 * by 丁浩 on 2019-07-13.
 */

import { isArray } from '@/utils'

export default function setRule(name, rules) {
  const items = []
  for (const rule of rules) {
    const item = {}
    for (const key in rule) {
      switch (key) {
        case 'required':
          item.required = true
          item.message = rule.message || `请输入${name}`
          break
        case 'selected':
          item.required = true
          item.message = rule.message || `请选择${name}`
          item.trigger = 'change'
          break
        case 'length':
          item.type = 'string'
          if (isArray(rule.length)) {
            item.min = rule.length[0]
            item.max = rule.length[1]
            item.message = rule.message || `${name}应介于${item.min}-${item.max}个字符之间`
          } else {
            const { min, max } = rule.length
            if (min && max) {
              item.min = min
              item.max = max
              item.message = rule.message || `${name}应介于${min}-${max}个字符之间`
            } else if (min) {
              item.min = min
              item.message = rule.message || `${name}应多于${min}个字符`
            } else if (max) {
              item.max = max
              item.message = rule.message || `${name}应少于${max}个字符`
            }
          }
          break
        case 'maxLength':
          item.type = 'string'
          item.max = rule.maxLength
          item.message = rule.message || `${name}应少于${item.max}个字符`
          break
        case 'minLength':
          item.type = 'string'
          item.min = rule.minLength
          item.message = rule.message || `${name}应多于${item.min}个字符`
          break
        case 'fixedLength':
          item.type = 'string'
          item.min = rule.fixedLength
          item.max = rule.fixedLength
          item.message = rule.message || `${name}应为${item.min}个字符`
          break
        case 'float': // 浮点数，可为负数
          item.pattern = /^([+-]?\d+)(\.\d+)?$/
          item.message = rule.message || `${name}应为数值`
          break
        case 'integer': // 整数，可为负数
          item.pattern = /^[+-]?\d+$/
          item.message = rule.message || `${name}应为整数`
          break
        case 'number': // 数字，不带符号，不带小数
          item.pattern = /^\d+$/
          item.message = rule.message || `${name}应为数字`
          break
        case 'range':
          item.type = 'number'
          item.transform = value => +value
          if (isArray(rule.range)) {
            item.min = rule.range[0]
            item.max = rule.range[1]
            item.message = rule.message || `${name}应介于${item.min}-${item.max}之间`
          } else {
            const { min, max } = rule.range
            if (min && max) {
              item.min = min
              item.max = max
              item.message = rule.message || `${name}应介于${min}-${max}之间`
            } else if (min) {
              item.min = min
              item.message = rule.message || `${name}应大于${min}`
            } else if (max) {
              item.max = max
              item.message = rule.message || `${name}应小于${max}`
            }
          }
          break
        case 'max':
          item.type = 'number'
          item.transform = value => +value
          item.max = rule.max
          item.message = rule.message || `${name}应小于${item.max}`
          break
        case 'min':
          item.type = 'number'
          item.transform = value => +value
          item.min = rule.min
          item.message = rule.message || `${name}应大于${item.min}`
          break
        case 'date':
          item.validator = (rule, value, callback) => {
            const errMsg = rule.message || `请填写正确格式的${name}`
            if (/^\d{4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}$/.test(value) === false) callback(errMsg)
            const d = value.split(/[\.\/-]/)
            const iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            if (d[0] % 4 === 0 && d[0] % 100 !== 0 || d[0] % 400 === 0) iaMonthDays[1] = 29
            if (d[1] < 1 || d[1] > 12) callback(errMsg)
            if (d[2] < 1 || d[2] > iaMonthDays[d[1] - 1]) callback(errMsg)
            callback()
          }
          break
        case 'datetime':
          item.validator = (rule, value, callback) => {
            const errMsg = rule.message || `请填写正确格式的${name}`
            if (/^\d{4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}$/.test(value) === false) callback(errMsg)
            const d = value.split(/[\.\/-]/)
            const iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            if (d[0] % 4 === 0 && d[0] % 100 !== 0 || d[0] % 400 === 0) iaMonthDays[1] = 29
            if (d[1] < 1 || d[1] > 12) callback(errMsg)
            if (d[2] < 1 || d[2] > iaMonthDays[d[1] - 1]) callback(errMsg)
            callback()
          }
          break
        case 'compare':
          // const f=rule.compare.target
          console.log(rule.compare.target)
          item.validator = (rule, value, callback) => {
            // f()
            callback()
            // if (this.optional(element)) return true;
            // var value2 = $("[name='" + params[0] + "']").val();
            // if (!value2) return true;
            // var op = params[1];
            // var type = params[2];
            // switch (type) {
            //   case "Integer": case "Float": case "Double": case "Currency": return compareNum(parseFloat(value), parseFloat(value2), op);
            //   case "String": return compareNum(value, value2, op);
            //   case "Date": return compareDate(value, value2, op);
            //   default: return true;
            // }
          }
          break
        case 'idCardNo':
          item.validator = (rule, value, callback) => {
            if (isIdCardNo(value)) {
              callback()
            } else {
              callback('请填写正确的身份证号')
            }
          }
          break
        default:
          item[key] = rule[key]
          break
      }
      item.trigger = item.trigger || 'blur'
    }
    items.push(item)
  }
  return items
}

function isIdCardNo(no) {
  const factorArr = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]
  const parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
  const varArray = []
  let lngProduct = 0
  let intCheckDigit
  const intStrLen = no.length
  const idNumber = no
  if (intStrLen !== 15 && intStrLen !== 18) return false
  for (let i = 0; i < intStrLen; i++) {
    varArray[i] = idNumber.charAt(i)
    if ((varArray[i] < '0' || varArray[i] > '9') && i !== 17) {
      return false
    } else if (i < 17) {
      varArray[i] = varArray[i] * factorArr[i]
    }
  }
  if (intStrLen === 18) {
    const date8 = idNumber.substring(6, 14)
    if (isDate8(date8) === false) return false
    for (let i = 0; i < 17; i++) {
      lngProduct = lngProduct + varArray[i]
    }
    intCheckDigit = parityBit[lngProduct % 11]
    if (varArray[17] !== intCheckDigit) return false
  } else {
    const date6 = idNumber.substring(6, 12)
    if (isDate6(date6) === false) return false
  }
  return true
}

function isDate6(sDate) {
  if (!/^[0-9]{6}$/.test(sDate)) return false
  const year = '19' + sDate.substring(0, 2) // 15位均认为年份前两位为19
  const month = sDate.substring(2, 4)
  const day = sDate.substring(4, 6)
  const iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) iaMonthDays[1] = 29
  if (month < 1 || month > 12) return false
  if (day < 1 || day > iaMonthDays[month - 1]) return false
  return true
}

function isDate8(sDate) {
  if (!/^[0-9]{8}$/.test(sDate)) return false
  const year = sDate.substring(0, 4)
  const month = sDate.substring(4, 6)
  const day = sDate.substring(6, 8)
  const iaMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) iaMonthDays[1] = 29
  if (month < 1 || month > 12) return false
  if (day < 1 || day > iaMonthDays[month - 1]) return false
  return true
}
//
// function compareNum(value1, value2, op) {
//   switch (op) {
//     case '==':
//       return value1 === value2
//     case '>':
//       return value1 > value2
//     case '>=':
//       return value1 >= value2
//     case '<':
//       return value1 < value2
//     case '<=':
//       return value1 <= value2
//     case '!=':
//       return value1 !== value2
//     default:
//       return true
//   }
// }

// function compareDatetime(value1, value2, op) {
//   const arrD1 = value1.split(' ')
//   const arrD2 = value2.split(' ')
//   const arrDate1 = arrD1[0].split(/[\.\/-]/)
//   const arrDate2 = arrD2[0].split(/[\.\/-]/)
//   const arrTime1 = arrD1[1].split(':')
//   const arrTime2 = arrD2[1].split(':')
//   const d1 = new Date(arrDate1[0], arrDate1[1], arrDate1[2], arrTime1[0], arrTime1[1], arrTime1[2], arrTime1[2])
//   const d2 = new Date(arrDate2[0], arrDate2[1], arrDate2[2], arrTime2[0], arrTime2[1], arrTime2[2], arrTime2[2])
//   return compareNum(Date.parse(d1), Date.parse(d2), op)
// }
//
// function compareDate(value1, value2, op) {
//   const arrD1 = value1.split(' ')
//   const arrD2 = value2.split(' ')
//   const arrDate1 = arrD1[0].split(/[\.\/-]/)
//   const arrDate2 = arrD2[0].split(/[\.\/-]/)
//   const d1 = new Date(arrDate1[0], arrDate1[1], arrDate1[2])
//   const d2 = new Date(arrDate2[0], arrDate2[1], arrDate2[2])
//   return compareNum(Date.parse(d1), Date.parse(d2), op)
// }

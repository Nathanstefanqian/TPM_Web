import _ from 'lodash'

const base = {
  /**
      * 主键
      */
  id: null,

  /**
   * 报修单id
   */
  repairApplyId: null,

  /**
   * 设备制造编号
   */
  serialNumber: null,

  /**
   * 设备名称
   */
  deviceName: null,

  /**
   * 设备型号
   */
  deviceModel: null,

  /**
   * 控制器
   */
  controller: null,

  /**
   * 报警号
   */
  alarmNumber: null,

  /**
   * 报警信息
   */
  alarmMessage: null,

  /**
   * 报警信息说明
   */
  descriptionOfAlarm: null,

  /**
   * 维修方法
   */
  repairMethod: null,

  /**
   * 维修记录
   */
  repairRecord: null,

  /**
   * 故障判定
   */
  faultJudge: null,

  /**
   * 故障标签（模糊搜索用）
   */
  keyword: null,

  /**
   * 创建时间
   */
  createTime: null,
}

const queryEmpty = {
  deviceModel: null,
  alarmNumber: null,
}

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = { repairApplyId: null, serialNumber: null, deviceName: null, deviceModel: null, controller: null, alarmNumber: null, alarmMessage: null, descriptionOfAlarm: null, repairMethod: null, repairRecord: null, faultJudge: null, keyword: null, }

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = {
  id: null,
  repairApplyId: null, serialNumber: null, deviceName: null, deviceModel: null, controller: null, alarmNumber: null, alarmMessage: null, descriptionOfAlarm: null, repairMethod: null, repairRecord: null, faultJudge: null, keyword: null,
}

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


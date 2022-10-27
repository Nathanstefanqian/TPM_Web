import _ from 'lodash'

const base = {
  /**
      *
      */
  id: null,

  /**
   * 报修单id
   */
  repairApplyId: null,

  /**
   * 维修人员工号id
   */
  opPersonId: null,

  /**
   * 维修人员姓名
   */
  opPersonName: null,

  /**
   * 开始时间
   */
  startTime: null,

  /**
   * 结束时间
   */
  endTime: null,

  /**
   * 人为故障/正常磨损/其他原因
   */
  problem: null,

  /**
   * 维修记录
   */
  opLog: null,

  /**
   * 现象
   */
  phenomenon: null,

  /**
   * 其它原因描述
   */
  reason: null,

  /**
   * 本次维修处理方法
   */
  processMethod: null,

  /**
   * [RepairResultType]本次维修结果。0：维修未成功，1：维修成功，2：缺少配件无法维修，3，申请委外维修
   */
  result: null,

  /**
    * 使用的配件情况
    */
  partList: null,

  /**
   * 缺少的配件情况
   */
  LackPartsList: null,
  /**
   * 创建时间
   */
  createTime: null,

  /**
   * 更新时间
   */
  updateTime: null
}

const queryEmpty = {
  id: null,
  repairApplyId: null,
  opPersonId: null,
  opPersonName: null,
  startTime: null,
  endTime: null,
  problem: null,
  opLog: null
}

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = {
  id: null,
  repairApplyId: null,
  opPersonId: null,
  opPersonName: null,
  startTime: null,
  endTime: null,
  problem: null,
  opLog: null,
  phenomenon: null,
  reason: null,
  processMethod: null,
  result: null,
  partList: null,
  LackPartsList: null
}

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = {
  id: null,
  repairApplyId: null,
  opPersonId: null,
  opPersonName: null,
  startTime: null,
  endTime: null,
  problem: null,
  opLog: null,
  phenomenon: null,
  reason: null,
  processMethod: null,
  result: null
}

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


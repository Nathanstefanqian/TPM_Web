import _ from 'lodash'

const base = {
  id: null,
  repairApplyId: null,
  opPersonId: null,
  opPersonName: null,
  startTime: null,
  endTime: null,
  problem: null,
  opLog: null
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
  opLog: null
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
  opLog: null
}

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


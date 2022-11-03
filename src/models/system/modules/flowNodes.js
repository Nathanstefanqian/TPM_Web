import _ from 'lodash'

const base = {
  id: null,
  name: null,
  flowId: null,
  checkType: null,
  checkId: null,
  checkOrder: null,
  canAssign: null
}

const queryEmpty = { name: null }

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = { flowId: null, name: null, checkId: null, checkType: null }

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = { id: null, name: null, flowId: null, checkId: null, checkType: null, checkOrder: null, canAssign: null }

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


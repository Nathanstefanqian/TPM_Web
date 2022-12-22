import _ from 'lodash'

const base = {
  id: null,
  maintainId: null,
  content: null,
  result: null,
  needInput: null,
  inputData: null,
  isBind: null,
  sort: null,
  isDigit: null,
  checkPerson: null,
  checkPersonId: null,
  memo: null,
  createTime: null
}

const queryEmpty = {
  maintainId: null
  // deviceNo: null,
}
const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = {
  id: null,
  maintainId: null,
  content: null,
  result: null,
  needInput: null,
  inputData: null,
  isBind: null
}

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = {
  id: null,
  maintainId: null,
  content: null,
  needInput: null,
  isBind: null,
}

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


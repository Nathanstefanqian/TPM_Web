import _ from 'lodash'

const base = {
  id: null,
  name: null,
  companyId: null,
  beginTime: null,
  endTime: null,
  creatorId: null,
  createTime: null,
  remark: null,
  companyName: null,
  creatorName: null,
  creatorUserName: null,
  taskBuoys: [],
  buoys: []
}

const queryEmpty = { companyId: null, name: null, beginTime: { begin: null, end: null }, endTime: { begin: null, end: null }}

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = { name: null, companyId: null, beginTime: null, endTime: null, remark: null, taskBuoys: [] }

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = { id: null, name: null, companyId: null, beginTime: null, endTime: null, remark: null, taskBuoys: [] }

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


import _ from 'lodash'

const base = {
  id: null,
  companyId: null,
  code: null,
  beginTime: null,
  state: null,
  stateText: null,
  stateTime: null,
  count: null,
  remark: null,
  company: { name: null }
}

const queryEmpty = { 'company.name': null, id: null, code: null, state: null }

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = { id: null, companyId: null, code: null, remark: null }

const update = _.omit(base, { originalId: null })

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = _.assign(createReal, { originalId: null })

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


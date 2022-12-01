import _ from 'lodash'

const base = {
  id: null,
  parent_id: null,
  ancestors: null,
  dept_code: null,
  name: null,
  type: null,
  sort: null,
  person_code: null,
  phone: null,
  social_unified_credit_code: null,
  status: null,
  des: null,
  create_by: null,
  create_time: null,
  update_by: null,
  update_time: null
}

const queryEmpty = { name: null, state: null }

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = { parent_id: null, dept_code: null, name: null, type: null, state: null, person_code: null, phone: null, social_unified_credit_code: null, des: null }

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = { id: null, parent_id: null, dept_code: null, name: null, type: null, state: null, person_code: null, phone: null, social_unified_credit_code: null, des: null }

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


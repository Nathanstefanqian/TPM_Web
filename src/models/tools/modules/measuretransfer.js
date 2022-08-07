import _ from 'lodash'

const base = {
  id: null,
  applyDeptId: null,
  applyDeptName: null,
  productCode: null,
  measureId: null,
  factory: null,
  processDept: null,
  checkDate: null,
  checkContent: null,
  applyPersonId: null,
  applyPersonName: null,
  checkPersonId: null,
  checkPersonName: null,
  reason: null,
  status: null
}

const queryEmpty = { userName: null, 'role.type': null, 'user.name': null, 'company.name': null, state: null }

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = { roleId: null, userName: null, name: null, password: null, state: null, remark: null }

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = { id: null, roleId: null, userName: null, name: null, state: null, remark: null }

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


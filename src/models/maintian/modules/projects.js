import _ from 'lodash'

const base = {
  id: null,
  transferNo: null,
  deptId: null,
  deptName: null,
  maintainType: null,
  deviceType: null,
  deviceName: null,
  productCode: null,
  productTime: null,
  zhixi: null,
  factory: null,
  processDeptId: null,
  processDeptName: null,
  maintainPersonId: null,
  maintainPersonName: null,
  maintainTime: null,
  planTime: null,
  status: null
}

const queryEmpty = {
  deptId: null,
  productCode: null,
  // deviceNo: null,
  maintainType: null, // 日 月 周
  factory: null,
  processDept: null
}
const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = { companyId: null, type: null, name: null, remark: null, accesses: null }

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = { id: null, companyId: null, type: null, name: null, remark: null, accesses: null }

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


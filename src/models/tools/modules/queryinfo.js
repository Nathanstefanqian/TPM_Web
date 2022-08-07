import _ from 'lodash'

const base = {
  id: null,
  measureCode: null,
  name: null,
  productCode: null,
  brand: null,
  productDate: null,
  checkDate: null,
  factory: null,
  processDept: null,
  responsePsersonName: null,
  status: null,
  responseDeptName: null,
  precisionOrg: null,
  precisionNow: null
}

const queryEmpty = {
  responseDeptId: null,
  productCode: null,
  eDeviceNo: null,
  // eZhixi: null,
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


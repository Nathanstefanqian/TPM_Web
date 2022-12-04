import _ from 'lodash'

const base = {
  id: null,
  transferNo: null,
  applyDeptId: null,
  applyDeptName: null,
  productCode: null,
  deviceNo: null,
  opInfo: null,
  zhixiId: null,
  factoryId: null,
  zhixi: null,
  factory: null,
  processDeptId: null,
  processDeptName: null,
  opDescription: null,
  applyPersonId: null,
  applyPersonName: null,
  applyTime: null,
  checkStatus: null,
  checkStatusName: null

}

const queryEmpty = {
  applyDeptId: null,
  productCode: null,
  deviceNo: null,
  transferNo: null,
  factory: null,
  processDeptId: null
}

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = {
  id: null,
  transferNo: null,
  applyDeptId: null,
  applyDeptName: null,
  productCode: null,
  deviceNo: null,
  opInfo: null,
  zhixiId: null,
  factoryId: null,
  zhixi: null,
  factory: null,
  processDeptId: null,
  processDeptName: null,
  opDescription: null,
  applyPersonId: null,
  applyPersonName: null,
  applyTime: null,
  checkStatus: null,
  flowId: null,
  checkStatusName: null
}

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = {
  id: null,
  transferNo: null,
  applyDeptId: null,
  applyDeptName: null,
  productCode: null,
  deviceNo: null,
  opInfo: null,
  zhixiId: null,
  factoryId: null,
  zhixi: null,
  factory: null,
  processDeptId: null,
  processDeptName: null,
  opDescription: null,
  applyPersonId: null,
  applyPersonName: null,
  applyTime: null,
  checkStatus: null
}

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


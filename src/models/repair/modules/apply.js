import _ from 'lodash'

const base = {
  id: null,
  repairNum: null,
  applyPersonId: null,
  applyPersonName: null,
  section: null,
  deptId: null,
  deptName: null,
  productCode: null,
  productDate: null,
  deviceNum: null,
  deviceType: null,
  propertyCode: null,
  level: null,
  category: null,
  content: null,
  repairTime: null,
  status: '1',
  outsource: '0',
  checkType: null,
  checkNowId: null,
  checkNowName: null,
  checkNextType: null,
  checkNextId: null,
  checkNextName: null,
  repairPersonId: null,
  repairPersonName: null,
  repairOpStatus: null,
  repairCheckPersonId: null,
  flowId: null,
  myRoleId: null,
  myUserId: null,
  checkStatusName: null
}

const queryEmpty = {
  repairNum: null, // 报修单号
  productCode: null, // 制造编号
  deviceNo: null,
  transferNo: null,
  factory: null,
  processDept: null,
  outsource: '0', // 是否委外 0否1 是
  applyPersonId: null,
  applyPersonName: null,
  deptId: null,
  myRoleId: null,
  myUserId: null,
  repairPersonId: null
}

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = {
  id: null,
  repairNum: null,
  applyPersonId: null,
  applyPersonName: null,
  section: null,
  deptId: null,
  deptName: null,
  productCode: null,
  productDate: null,
  deviceNum: null,
  deviceType: null,
  propertyCode: null,
  level: null,
  category: null,
  content: null,
  repairTime: null,
  status: '1',
  outsource: '0',
  flowId: null
}

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = {
  id: null,
  repairNum: null,
  applyPersonId: null,
  applyPersonName: null,
  section: null,
  deptId: null,
  deptName: null,
  productCode: null,
  productDate: null,
  deviceNum: null,
  deviceType: null,
  propertyCode: null,
  level: null,
  category: null,
  content: null,
  repairTime: null,
  status: '0',
  outsource: '0',
  checkType: null,
  checkNowId: null,
  checkNowName: null,
  checkNextType: null,
  checkNextId: null,
  checkNextName: null,
  repairPersonId: null,
  repairPersonName: null,
  repairOpStatus: null,
  repairCheckPersonId: null,
  flowId: null
}

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


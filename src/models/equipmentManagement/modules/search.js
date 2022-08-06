import _ from 'lodash'

const base = {
  id: null,
  eType: null,
  eDeviceNo: null,
  eName: null,
  eDeptId: null,
  craftsId: null,
  dailyEnergy: null,
  status: null,
  deptParentId: null,
  remark: null,
  speed: null,
  eBrand: null,
  eMachineType: null,
  edition: null,
  eNetworkAddress: null,
  ftpName: null,
  ftpPwd: null,
  isAutomation: null,
  isUse: null,
  eZhixi: null,
  eAcceptanceDate: null,
  eSection: null,
  eDeviceCode: null,
  eFactory: null,
  eDistrict: null,
  eMaintianPersonId: null,
  eResponsiblePersonId: null,
  eResponsibleDept: null,
  eProcessDept: null,
  eProductDept: null,
  eProductCode: null,
  eProductDate: null,
  eEnterDate: null,
  eCheckDate: null,
  ePower: null,
  eRepairDept: null,
  eRepairManagerId: null,
  eStorageArea: null,
  eStoragePosition: null,
  eAssetNumber: null,
  eCompany: null,
  eIsonline: null,
  eIsdigit: null,
  ePrecision: null,
  eSize: null,
  eXStroke: null,
  eYStroke: null,
  eZStroke: null,
  eUStroke: null,
  eVStroke: null,
  eRotateSpeed: null,
  ePushSpeed: null,
  eWeight: null,
  eVoltage: null,
  eAirPressure: null,
  eKnifeCapacity: null,
  eController: null,
  eVersion: null,
  eIceMachineBrand: null,
  eIceMachineModel: null,
  eIceMachineNumber: null,
  eIceMachinePower: null,
  createBy: null,
  createTime: null,
  updateTime: null,
  updateBy: null

}

const queryEmpty = {
  eDeptId: null,
  eProductCode: null,
  eDeviceNo: null,
  eZhixi: null,
  eFactory: null,
  eProcessDept: null
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


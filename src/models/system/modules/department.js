import _ from 'lodash'

const base = {
  id: null,
  parentId: null,
  ancestors: null,
  deptCode: null,
  name: null,
  type: null,
  sort: null,
  personCode: null,
  phone: null,
  socialUnifiedCreditCode: null,
  status: null,
  des: null,
  createBy: null,
  createTime: null,
  updateBy: null,
  updateTime: null,
  parentName: null,
  personName: null
}

const queryEmpty = { name: null, status: null, type: null, parentId: null, personCode: null}

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

const create = _.cloneDeep(base)

// create提交数据，属性值务必准确，多余属性不会提交
const createReal = { parentId: null, deptCode: null, name: null, type: null, status: null, personCode: null, phone: null, socialUnifiedCreditCode: null, des: null }

const update = _.cloneDeep(base)

// update提交数据，属性值务必准确，多余属性不会提交
const updateReal = { id: null, parentId: null, deptCode: null, name: null, type: null, status: null, personCode: null, phone: null, socialUnifiedCreditCode: null, des: null }

const detail = _.cloneDeep(base)

export default { queryEmpty, query, queryReal, create, createReal, update, updateReal, detail }


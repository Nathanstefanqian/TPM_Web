import _ from 'lodash'

// const base = {
//   companyName: null,
//   imei: null,
//   buoyCode: null,
//   lon: null,
//   lat: null,
//   lonGcj: null,
//   latGcj: null,
//   depth: null,
//   directionAng: null,
//   velocity: null,
//   gpsStatus: null,
//   gpsStatusText: null,
//   time: null
// }

const queryEmpty = {
  companyId: null,
  taskId: null,
  imei: [],
  gpsStatus: null,
  time: { begin: null, end: null }
}

const query = _.cloneDeep(queryEmpty)

// 查询提交数据，查询前进行同步
const queryReal = _.cloneDeep(queryEmpty)

export default { queryEmpty, query, queryReal }


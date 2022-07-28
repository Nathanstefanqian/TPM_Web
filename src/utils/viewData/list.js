import _ from 'lodash'

const data = {
  curModels: null,
  curApi: null,
  curPermission: null,
  datas: null,
  query: null,
  queryReal: null,
  page: { total: 0, current: 1, size: 20 },
  sort: null,
  loading: { table: true, deletes: false, export: false },
  sortOrders: ['ascending', 'descending'],
  exportFileName: ''
}

export default function getDefaultListViewData() {
  return _.cloneDeep(data)
}


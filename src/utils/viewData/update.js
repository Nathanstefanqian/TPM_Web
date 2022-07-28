import _ from 'lodash'

const data = {
  curModels: null,
  curApi: null,
  curPermission: null,
  dialogClass: 'update',
  dialogTitle: null,
  visible: false,
  loading: false,
  rules: null,
  model: null,
  rowData: null,
  labelWidth: '120px'
}

export default function getDefaultUpdateViewData() {
  return _.cloneDeep(data)
}

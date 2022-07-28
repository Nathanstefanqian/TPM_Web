import _ from 'lodash'

const data = {
  curModels: null,
  curApi: null,
  curPermission: null,
  dialogClass: 'create',
  dialogTitle: null,
  visible: false,
  loading: false,
  rules: null,
  model: null,
  labelWidth: '120px'
}

export default function getDefaultCreateViewData() {
  return _.cloneDeep(data)
}

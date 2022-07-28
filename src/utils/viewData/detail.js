import _ from 'lodash'

const data = {
  curModels: null,
  curApi: null,
  curPermission: null,
  dialogClass: 'detail',
  dialogTitle: null,
  visible: false,
  loading: false,
  model: null,
  labelWidth: '120px'
}

export default function getDefaultDetailViewData() {
  return _.cloneDeep(data)
}

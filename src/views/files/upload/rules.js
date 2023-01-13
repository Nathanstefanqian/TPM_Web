import setRule from '@/utils/validate'

export default {
  deptId: setRule('单位名称', [{ required: true }]),
  deviceName: setRule('机台名称', [{ required: true }])
}

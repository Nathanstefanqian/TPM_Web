import setRule from '@/utils/validate'

export default {
  name: setRule('企业名称', [{ required: true }, { length: [0, 50] }]),
  remark: setRule('备注', [{ length: [0, 200] }])
}

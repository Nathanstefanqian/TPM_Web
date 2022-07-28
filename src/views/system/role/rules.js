import setRule from '@/utils/validate'

export default {
  type: setRule('角色类型', [{ selected: true }]),
  companyId: setRule('所属企业', [{ selected: true }]),
  name: setRule('角色名称', [{ required: true }, { length: [0, 50] }]),
  remark: setRule('备注', [{ length: [0, 200] }])
}

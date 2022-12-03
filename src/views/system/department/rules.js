import setRule from '@/utils/validate'

export default {
  name: setRule('部门名称', [{ required: true }, { length: [0, 10] }]),
  deptCode: setRule('部门代码', [{ required: true }]),
  parentId: setRule('所属部门', [{ selected: true }]),
  socialUnifiedCreditCode: setRule('社会统一信用代码', [{ required: true }]),
  status: setRule('状态', [{ selected: true }]),
  type: setRule('类型', [{ selected: true }]),
  personCode: setRule('负责人', [{ required: true }]),
  phone: setRule('联系电话', [{ required: true }]),
  des: setRule('描述', [{ length: [0, 200] }])
}

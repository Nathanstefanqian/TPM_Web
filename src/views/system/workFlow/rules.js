import setRule from '@/utils/validate'

export default {
  name: setRule('流程名称', [{ required: true }, { length: [0, 50] }]),
  type: setRule('流程类型', [{ selected: true }]),
  checkType: setRule('审批类型', [{ selected: true }]),
  checkId: setRule('处理人', [{ selected: true }])
}

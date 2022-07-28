import setRule from '@/utils/validate'

export default {
  companyId: setRule('所属企业', [{ selected: true }]),
  name: setRule('任务名称', [{ required: true }, { length: [0, 30] }]),
  beginTime: setRule('任务开始时间', [{ required: true }, { datetime: true }]),
  // endTime: setRule('任务结束时间', [{ required: true }, { datetime: true }, { compare: { target: this, type: 'datetime', option: '>=' } }]),
  endTime: setRule('任务结束时间', [{ required: true }, { datetime: true }]),
  remark: setRule('备注', [{ length: [0, 200] }])
}


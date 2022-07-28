import setRule from '@/utils/validate'

export default {
  companyId: setRule('所属企业', [{ selected: true }]),
  id: setRule('浮标IMEI', [{ required: true }, { fixedLength: 15 }]),
  code: setRule('浮标编号', [{ required: true }, { length: [0, 20] }]),
  remark: setRule('备注', [{ length: [0, 200] }])
}

import setRule from '@/utils/validate'

export default {
  name: setRule('流程名称', [{ required: true }, { length: [0, 50] }])
}

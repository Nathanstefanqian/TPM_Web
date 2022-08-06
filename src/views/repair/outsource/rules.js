import setRule from '@/utils/validate'

export default {
  roleType: setRule('角色类型', [{ selected: true }]),
  companyId: setRule('所属企业', [{ selected: true }]),
  userName: setRule('用户名', [{ required: true }, { length: [0, 10] }]),
  name: setRule('姓名', [{ length: [0, 10] }]),
  password: setRule('初始密码', [{ required: true }, { length: [0, 20] }]),
  roleId: setRule('用户角色', [{ selected: true }]),
  state: setRule('用户状态', [{ selected: true }]),
  remark: setRule('备注', [{ length: [0, 200] }])
}

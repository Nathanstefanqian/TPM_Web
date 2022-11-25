import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/eqRepairApply/listSign',
    method: 'post',
    data: {
      page: { current: page.current, size: page.size },
      sort: sort === null ? null : { property: sort.prop, direction: sort.order },
      query: { ...query }
    }
  })
}

// 根据id获取数据
export function get(id) {
  return request({
    url: `/eqRepairApply/${id}/detail`,
    method: 'get'
  })
}

// 根据repairApplyid获取数据
export function getFlowData(id) {
  return request({
    url: `/eqRepairApply/${id}/getFlowData`,
    method: 'get'
  })
}

// 根据repairApplyid获取日志数据
export function getCheckLog(id) {
  return request({
    url: `/eqRepairApply/${id}/getCheckLog`,
    method: 'get'
  })
}

// 根据当前用户所有权限对应的功能列表
export function getFunctionsFromAccess(roleType) {
  return request({
    url: '/eqRepairApply/functionsFromAccess?roleType=' + roleType,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getSelectlist(type, companyId) {
  return request({
    url: '/eqRepairApply/selectlist?type=' + (type || '') + '&companyId=' + (companyId || ''),
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/eqRepairApply/create',
    method: 'post',
    data
  })
}

// 添加数据
export function changeCheckPerson(data) {
  return request({
    url: '/eqRepairApply/changeCheckPerson',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/eqRepairApply/sign',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/eqRepairApply/delete',
    method: 'delete',
    data: data
  })
}

// 获取角色类型
export function getRoleTypes() {
  return request({
    url: `/eqRepairApply/roleTypes`,
    method: 'get'
  })
}

// 查看是否有附件
export function hasFile(id) {
  return request({
    url: `/eqRepairApplyFile/${id}/hasFile`,
    method: 'get'
  })
}

// 获取附件数据
export function getEqRepairApplyFile(id) {
  return request({
    url: `/eqRepairApplyFile/${id}/getEqRepairApplyFile`,
    method: 'get'
  })
}

// //保存签核记录
// export function updateSign() {
//   return request({
//     url: `/eqRepairApply/updateSign`,
//     method: 'put'
//   })
// }

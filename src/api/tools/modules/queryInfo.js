import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/eqMeasure/list',
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
    url: `/eqMeasure/${id}/detail`,
    method: 'get'
  })
}

// 根据当前用户所有权限对应的功能列表
export function getFunctionsFromAccess(roleType) {
  return request({
    url: '/eqMeasure/functionsFromAccess?roleType=' + roleType,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getSelectlist(type, companyId) {
  return request({
    url: '/eqMeasure/selectlist?type=' + (type || '') + '&companyId=' + (companyId || ''),
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/eqMeasure/create',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/eqMeasure/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/eqMeasure/delete',
    method: 'delete',
    data: data
  })
}

// 获取角色类型
export function getRoleTypes() {
  return request({
    url: `/eqMeasure/roleTypes`,
    method: 'get'
  })
}

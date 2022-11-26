import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/system/user/list',
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
    url: `/system/user/${id}/detail`,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getSelectlist() {
  return request({
    url: '/system/user/selectlist',
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/system/user/create',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/system/user/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/system/user/delete',
    method: 'delete',
    data: data
  })
}

// 密码重置
export function resetPassword(data) {
  return request({
    url: '/system/user/resetPassword',
    method: 'patch',
    data: data
  })
}

// 获取委外人员信息
export function getOutsourceUser() {
  return request({
    url: '/system/user/getOutsourceUser',
    method: 'get'
  })
}

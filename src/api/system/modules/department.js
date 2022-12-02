import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/sysDept/list',
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
    url: `/sysDept/${id}/detail`,
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/sysDept/create',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/sysDept/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/sysDept/delete',
    method: 'delete',
    data: data
  })
}

// // 获得下拉列表的数据
// export function getSelectParentlist() {
//   return request({
//     url: '/sysDept/selectlist',
//     method: 'get'
//   })
// }

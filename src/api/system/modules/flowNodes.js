import request from '@/utils/request'

// 获取列表数据（查询、翻页）
// export function getList(query, page, sort) {
//   return request({
//     url: '/workflowNodes/list',
//     method: 'post',
//     data: {
//       page: { current: page.current, size: page.size },
//       sort: sort === null ? null : { property: sort.prop, direction: sort.order },
//       query: { ...query }
//     }
//   })
// }

export function getList(id) {
  return request({
    url: `/workflow/${id}/detail`,
    method: 'get'
  })
}

// 根据id获取数据
export function get(id) {
  return request({
    url: `/workflowNodes/${id}/detail`,
    method: 'get'
  })
}

// 与上一个节点交换sort
export function moveupSort(id) {
  return request({
    url: `/workflowNodes/swap/${id}`,
    method: 'post',
    id
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/workflowNodes/update',
    method: 'put',
    data
  })
}
// 获取具体流程
// export function getFlows(id) {
//   return request({
//     url: `/workflowNodes/${id}/getFlows`,
//     method: 'get'
//   })
// }

// // 获得下拉列表的数据
// export function getSelectlist() {
//   return request({
//     url: '/workflow/selectlist',
//     method: 'get'
//   })
// }
//
// 添加数据
export function create(data) {
  return request({
    url: '/workflowNodes/create',
    method: 'post',
    data
  })
}
//
// // 更新数据
// export function update(data) {
//   return request({
//     url: '/workflow/update',
//     method: 'put',
//     data
//   })
// }
//
// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/workflowNodes/delete',
    method: 'delete',
    data: data
  })
}

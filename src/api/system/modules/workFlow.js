import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/workflow/list',
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
    url: `/workflow/${id}/detail`,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getSelectlist(typeId) {
  return request({
    url: `/workflow/${typeId}/selectlist`,
    method: 'get',
    typeId: typeId
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/workflow/create',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/workflow/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/workflow/delete',
    method: 'delete',
    data: data
  })
}

// 根据流程id获取流程节点
export function getFlows(id) {
  return request({
    url: `/workflowNodes/${id}/getFlows`,
    method: 'get'
  })
}

// 获取工作流类型
export function getFlowTypes(id) {
  return request({
    url: `workflow/getTypes`,
    method: 'get'
  })
}

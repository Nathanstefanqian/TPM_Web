import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/processDept/list',
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
    url: `/processDept/${id}/detail`,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getSelectlist() {
  return request({
    url: '/processDept/selectlist',
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/processDept/create',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/processDept/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/processDept/delete',
    method: 'delete',
    data: data
  })
}

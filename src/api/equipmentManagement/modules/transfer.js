import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/eqTransfer/list',
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
    url: `/eqTransfer/${id}/detail`,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getSelectlist() {
  return request({
    url: '/eqTransfer/selectlist',
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/eqTransfer/create',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/eqTransfer/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/eqTransfer/delete',
    method: 'delete',
    data: data
  })
}
// 获取结点信息
export function getFlowData(id) {
  return request({
    url: `/eqTransfer/${id}/getFlowData`,
    method: 'get',
    data: id
  })
}
// 获取日志信息
export function getCheckLog(eqTransferId) {
  return request({
    url: `/eqTransferCheckLog/list`,
    method: 'post',
    data: {
      eqTransferId
      // eqTransferId: { eqTransferId }
    }
  })
}

// 更新数据(签核)
export function updateSign(eqTransferId, result) {
  return request({
    url: '/eqTransfer/sign',
    method: 'put',
    data:{ eqTransferId, result}
  })
}
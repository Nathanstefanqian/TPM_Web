import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/eqRepairOpLog/listSign',
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
    url: `/eqRepairOpLog/${id}/detail`,
    method: 'get'
  })
}
// 根据repairApplyid获取数据
export function getFlowData(id) {
  return request({
    url: `/eqRepairOpLog/${id}/getFlowData`,
    method: 'get'
  })
}
// 根据repairApplyid获取日志数据
export function getCheckLog(id) {
  return request({
    url: `/eqRepairOpLog/${id}/getCheckLog`,
    method: 'get'
  })
}

// 获得下拉列表的数据
export function getSelectlist(type, companyId) {
  return request({
    url: '/eqRepairOpLog/selectlist?type=' + (type || '') + '&companyId=' + (companyId || ''),
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/eqRepairOpLog/create',
    method: 'post',
    data
  })
}
// 添加数据
export function finishOp(data) {
  return request({
    url: '/eqRepairOpLog/finishOp',
    method: 'post',
    data
  })
}
// 更新数据
export function update(data) {
  return request({
    url: '/eqRepairOpLog/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/eqRepairOpLog/delete',
    method: 'delete',
    data: data
  })
}

// 根据repairApplyid获取日志数据
export function getOpLog(id) {
  return request({
    url: `/eqRepairOpLog/${id}/getOpLog`,
    method: 'get'
  })
}
// 获取配件信息
export function getPart(data) {
  return request({
    url: '/part/list',
    method: 'post',
    data
  })
}

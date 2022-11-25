import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/eqRepairOutsource/list',
    method: 'get',
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
    url: `/eqRepairOutsource/${id}/detail`,
    method: 'get'
  })
}

// 添加
export function create(data) {
  return request({
    url: '/eqRepairOutsource/create',
    method: 'post',
    data
  })
}

// 申请
export function applyOutSource(data) {
  return request({
    url: '/eqRepairOutsource/apply',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/eqRepairOutsource/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/eqRepairOutsource/delete',
    method: 'delete'
  })
}

// 获取列表数据（查询、翻页）
export function getinfo() {
  return request({
    url: '/eqRepairOutsource/list',
    method: 'get'
  })
}

// 获取工作流结点
export function getFlowData(id) {
  return request({
    url: `/eqRepairOutsource/${id}/getFlowData`,
    method: 'get'
  })
}

// 委外申请签核
export function sign(data) {
  return request({
    url: '/eqRepairOutsource/sign',
    method: 'put',
    data
  })
}

// 根据申请id获取签核记录
export function getOpLog(id) {
  return request({
    url: `/eqRepairOpLog/${id}/getOpLog`,
    method: 'get'
  })
}

// 条件查询
export function query(data) {
  return request({
    url: '/eqRepairOutsource/query',
    method: 'post',
    data
  })
}

// 完成维修
export function finishOp(id) {
  return request({
    url: `/eqRepairOutsource/${id}/finishOp`,
    method: 'post'
  })
}

// 获取委外维修记录
export function getOutsourceOpLog(id) {
  return request({
    url: `/eqRepairOutsourceOpLog/${id}/getOutsourceOpLog`,
    method: 'get'
  })
}

// 委外维修记录保存
export function createOutsourceOpLog(data) {
  return request({
    url: '/eqRepairOutsourceOpLog/create',
    method: 'post',
    data
  })
}

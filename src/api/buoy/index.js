import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/buoy/list',
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
    url: `/buoy/${id}/detail`,
    method: 'get'
  })
}

// 根据企业id获得下拉列表的数据
export function getSelectlistByCompanyId(companyId) {
  if (!companyId) companyId = ''
  return request({
    url: '/buoy/selectlistByCompanyId?companyId=' + companyId,
    method: 'get'
  })
}

// 根据任务id获得下拉列表的数据
export function getSelectlistByTaskId(taskId) {
  if (!taskId) taskId = ''
  return request({
    url: '/buoy/selectlistByTaskId?taskId=' + taskId,
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/buoy/create',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/buoy/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/buoy/delete',
    method: 'delete',
    data: data
  })
}

// 开灯
export function ledOn(imei) {
  return request({
    url: `/buoy/${imei}/ledon`,
    method: 'patch'
  })
}

// 关灯
export function ledOff(imei) {
  return request({
    url: `/buoy/${imei}/ledoff`,
    method: 'patch'
  })
}

// 重启
export function reboot(imei) {
  return request({
    url: `/buoy/${imei}/reboot`,
    method: 'patch'
  })
}

// 调整上报时间间隔
export function setReportInterval(imei, interval) {
  return request({
    url: `/buoy/${imei}/reportInterval/${interval}`,
    method: 'patch'
  })
}

// 调整灯闪烁时间间隔
export function setLedFlashInterval(imei, interval) {
  return request({
    url: `/buoy/${imei}/ledFlashInterval/${interval}`,
    method: 'patch'
  })
}

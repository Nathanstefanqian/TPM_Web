import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/buoyData/history',
    method: 'post',
    data: {
      page: { current: page.current, size: page.size },
      sort: sort === null ? null : { property: sort.prop, direction: sort.order },
      query: { ...query }
    }
  })
}

// 导出列表数据
export function exportCsv(query, page, sort) {
  return request({
    url: '/buoyData/history/export',
    method: 'post',
    data: {
      page: { current: 0, size: 100000 },
      sort: sort === null ? null : { property: sort.prop, direction: sort.order },
      query: { ...query }
    }
  })
}

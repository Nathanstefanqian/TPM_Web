import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
  return request({
    url: '/deviceFaultsStore/list',
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
    url: `/deviceFaultsStore/${id}/detail`,
    method: 'get'
  })
}

// 模糊搜索
export function fuzzyQuery(data) {
  return request({
    url: '/deviceFaultsStore/fuzzyQuery',
    method: 'post',
    data
  })
}

// 读取Excel表格数据并导入知识库
export function insertExcel(data) {
  return request({
    url: '/deviceFaultsStore/insert',
    method: 'post',
    data
  })
}

// Excel模板下载
export function downloadExcel() {
  return request({
    url: '/deviceFaultsStore/download',
    method: 'get'
  })
}

// 根据当前用户所有权限对应的功能列表
export function getFunctionsFromAccess(roleType) {
  return request({
    url: '/deviceFaultsStore/functionsFromAccess?roleType=' + roleType,
    method: 'get'
  })
}

// 添加数据
export function create(data) {
  return request({
    url: '/deviceFaultsStore/create',
    method: 'post',
    data
  })
}

// 更新数据
export function update(data) {
  return request({
    url: '/deviceFaultsStore/update',
    method: 'put',
    data
  })
}

// 删除、批量删除数据
export function del(data) {
  return request({
    url: '/deviceFaultsStore/delete',
    method: 'delete',
    data: data
  })
}

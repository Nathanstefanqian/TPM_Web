import request from '@/utils/request'

// 获取列表数据（查询、翻页）
export function getList(query, page, sort) {
    return request({
        url: '/eqRepairOutsource/list',
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
        method: 'delete',
        data: data
    })
}

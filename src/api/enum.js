import request from '@/utils/request'

// 获取所有枚举类型的枚举值和名称
export function getAll() {
  return request({
    url: '/enum/all',
    method: 'get'
  })
}

// 根据枚举类型名称获取所有枚举值和名称
export function get(enumName) {
  return request({
    url: `/enum/${enumName}`,
    method: 'get'
  })
}

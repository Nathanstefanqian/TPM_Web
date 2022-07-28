import request from '@/utils/request'

export function getCaptcha(captchaToken) {
  return request({
    url: '/account/captcha/' + captchaToken,
    method: 'get'
  })
}

export function login(data) {
  return request({
    url: '/account/login',
    method: 'post',
    data
  })
}

export function getAccess() {
  return request({
    url: '/account/access',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/account/logout',
    method: 'post'
  })
}

export function changePassword(data) {
  return request({
    url: '/account/changePassword',
    method: 'patch',
    data
  })
}

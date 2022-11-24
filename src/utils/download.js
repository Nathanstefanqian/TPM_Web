import request from '@/utils/request'

export default function download(url, filename = '未命名') {
  return request({
    url: url,
    method: 'GET',
    responseType: 'blob'
  }).then(res => {
    const reader = new FileReader()
    reader.readAsDataURL(res)
    reader.onload = (e) => {
      const a = document.createElement('a')
      a.download = filename
      a.href = e.target.result
      a.click()
    }
  })
}

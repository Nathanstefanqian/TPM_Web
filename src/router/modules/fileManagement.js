import Layout from '@/layout'

export default {
  path: '/files',
  component: Layout,
  redirect: 'noRedirect',
  name: 'files',
  access: 'file',
  meta: {
    title: '设备文件管理',
    icon: 'data'
  },
  children: [
    {
      path: 'upload',
      component: () => import('@/views/files/upload/index'),
      name: 'upload',
      access: 'upload',
      meta: { title: '文件表单上传' }
    },
    {
      path: 'list',
      component: () => import('@/views/files/list/index'),
      name: 'list',
      access: 'list',
      meta: { title: '设备表单查询下载' }
    }
  ]
}

import Layout from '@/layout'

export default {
  path: '/maintain',
  component: Layout,
  redirect: 'noRedirect',
  name: 'maintain',
  access: 'maintain',
  meta: {
    title: '设备保养管理',
    icon: 'task'
  },
  children: [
    {
      path: 'projects',
      component: () => import('@/views/maintain/projects/index'),
      name: 'projects',
      access: 'projects',
      meta: { title: '点检项目维护' }
    },
    {
      path: 'operate',
      component: () => import('@/views/maintain/operate/index'),
      name: 'operate',
      access: 'operate',
      meta: { title: '点检保养' }
    },
    {
      path: 'search',
      component: () => import('@/views/maintain/search/index'),
      name: 'search',
      access: 'search',
      meta: { title: '点检保养数据查询' }
    }
  ]
}

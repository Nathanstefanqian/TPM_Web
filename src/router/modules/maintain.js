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
      path: 'plan',
      component: () => import('@/views/maintain/plan/index'),
      name: 'plan',
      access: 'plan',
      meta: { title: '点检计划' }
    },
    {
      path: 'operate',
      component: () => import('@/views/maintain/operate/index'),
      name: 'operate',
      access: 'operate',
      meta: { title: '异常管理' }
    },
    {
      path: 'search',
      component: () => import('@/views/maintain/search/index'),
      name: 'search',
      access: 'search',
      meta: { title: '保养数据查询' }
    }
  ]
}

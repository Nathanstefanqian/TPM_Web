import Layout from '@/layout'

export default {
  path: '/company',
  component: Layout,
  access: 'company',
  children: [
    {
      path: 'index',
      component: () => import('@/views/company/index'),
      name: 'Company',
      meta: { title: '企业管理', icon: 'building' }
    }
  ]
}

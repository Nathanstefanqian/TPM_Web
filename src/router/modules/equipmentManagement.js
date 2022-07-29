import Layout from '@/layout'

export default {
  path: '/equipmentManagement',
  component: Layout,
  redirect: 'noRedirect',
  name: 'equipmentManagement',
  access: 'equipmentManagement',
  meta: {
    title: '设备管理',
    icon: 'data'
  },
  children: [
    {
      path: 'search',
      component: () => import('@/views/equipmentManagement/search/index'),
      name: 'search',
      access: 'search',
      meta: { title: '设备信息维护' }
    },
    {
      path: 'transfer',
      component: () => import('@/views/equipmentManagement/transfer/index'),
      name: 'transfer',
      access: 'transfer',
      meta: { title: '报废/转移' }
    }
  ]
}

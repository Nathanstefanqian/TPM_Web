import Layout from '@/layout'

export default {
  path: '/repair',
  component: Layout,
  redirect: 'noRedirect',
  name: 'repair',
  access: 'repair',
  meta: {
    title: '设备报修管理',
    icon: 'buoy'
  },
  children: [
    {
      path: 'apply',
      component: () => import('@/views/repair/apply/index'),
      name: 'apply',
      access: 'apply',
      meta: { title: '设备报修' }
    },
    {
      path: 'outsource',
      component: () => import('@/views/repair/outsource/index'),
      name: 'outsource',
      access: 'outsource',
      meta: { title: '维修/委外' }
    }
  ]
}

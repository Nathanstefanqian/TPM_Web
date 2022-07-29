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
      path: 'operate',
      component: () => import('@/views/repair/operate/index'),
      name: 'operate',
      access: 'operate',
      meta: { title: '维修/委外' }
    }
  ]
}

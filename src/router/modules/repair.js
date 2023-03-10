import Layout from '@/layout'

export default {
  path: '/repair',
  component: Layout,
  redirect: 'noRedirect',
  name: 'repair',
  access: 'repair',
  meta: {
    title: '报修管理',
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
      path: 'applySign',
      component: () => import('@/views/repair/applySign/index'),
      name: 'applySign',
      access: 'applySign',
      meta: { title: '设备报修签核' }
    },
    {
      path: 'outsource',
      component: () => import('@/views/repair/outsource/index'),
      name: 'outsource',
      access: 'outsource',
      meta: { title: '委外报修' }
    },
    {
      path: 'outsourceSign',
      component: () => import('@/views/repair/outsourceSign/index'),
      name: 'outsourceSign',
      access: 'outsourceSign',
      meta: { title: '委外签核' }
    }
  ]
}

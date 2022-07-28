import Layout from '@/layout'

export default {
  path: '/buoy',
  component: Layout,
  access: 'buoy',
  children: [
    {
      path: 'index',
      component: () => import('@/views/buoy/index'),
      name: 'Buoy',
      meta: { title: '浮标管理', icon: 'buoy' }
    }
  ]
}

import Layout from '@/layout'

export default {
  path: '/realtimeData',
  component: Layout,
  access: 'realtimeData',
  children: [
    {
      path: 'index',
      component: () => import('@/views/realtimeData/index'),
      name: 'RealtimeData',
      meta: { title: '实时数据', icon: 'data' }
    }
  ]
}

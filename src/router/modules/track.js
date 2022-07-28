import Layout from '@/layout'

export default {
  path: '/track',
  component: Layout,
  access: 'track',
  children: [
    {
      path: 'index',
      component: () => import('@/views/track/index'),
      name: 'Track',
      meta: { title: '轨迹回放', icon: 'route' }
    }
  ]
}

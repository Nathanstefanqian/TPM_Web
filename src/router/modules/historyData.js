import Layout from '@/layout'

export default {
  path: '/historyData',
  component: Layout,
  access: 'historyData',
  children: [
    {
      path: 'index',
      component: () => import('@/views/historyData/index'),
      name: 'HistoryData',
      meta: { title: '历史数据', icon: 'historyData' }
    }
  ]
}

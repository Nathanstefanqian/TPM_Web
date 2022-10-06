import Layout from '@/layout'

export default {
  path: '/repairOp',
  component: Layout,
  redirect: 'noRedirect',
  name: 'repairOp',
  access: 'repairOp',
  meta: {
    title: '维修作业管理',
    icon: 'buoy'
  },
  children: [
    {
      path: 'applyList',
      component: () => import('@/views/repairOp/applyList/index'),
      name: 'applyList',
      access: 'applyList',
      meta: { title: '报修列表' }
    },
    {
      path: 'applyOp',
      component: () => import('@/views/repairOp/applyOp/index'),
      name: 'applyOp',
      access: 'applyOp',
      meta: { title: '报修单维修签核' }
    }
  ]
}

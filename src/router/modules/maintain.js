import Layout from '@/layout'

export default {
  path: '/maintain',
  component: Layout,
  redirect: 'noRedirect',
  name: 'maintain',
  access: 'maintain',
  meta: {
    title: '点检保养管理',
    icon: 'task'
  },
  children: [
    {
      path: 'checkOperate',
      component: () => import('@/views/maintain/checkOperate/index'),
      name: 'checkOperate',
      access: 'checkOperate',
      meta: { title: '点检操作' }
    },
    {
      path: 'maintainOperate',
      component: () => import('@/views/maintain/maintainOperate/index'),
      name: 'maintainOperate',
      access: 'maintainOperate',
      meta: { title: '保养操作' }
    },
    {
      path: 'exception',
      component: () => import('@/views/maintain/exception/index'),
      name: 'exception',
      access: 'exception',
      meta: { title: '异常管理' }
    },
    {
      path: 'exceptionSign',
      component: () => import('@/views/maintain/exceptionSign/index'),
      name: 'exceptionSign',
      access: 'exceptionSign',
      meta: { title: '异常签核' }
    },
    {
      path: 'plan',
      component: () => import('@/views/maintain/plan/index'),
      name: 'plan',
      access: 'plan',
      meta: { title: '点检项目计划' }
    },
    {
      path: 'search',
      component: () => import('@/views/maintain/search/index'),
      name: 'search',
      access: 'search',
      meta: { title: '保养数据查询' }
    }
  ]
}

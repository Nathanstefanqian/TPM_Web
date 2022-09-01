import Layout from '@/layout'

export default {
  path: '/tools',
  component: Layout,
  redirect: 'noRedirect',
  name: 'tools',
  access: 'tools',
  meta: {
    title: '量治具管理',
    icon: 'historyData'
  },
  children: [
    {
      path: 'queryinfo',
      component: () => import('@/views/tools/queryinfo/index'),
      name: 'queryinfo',
      access: 'queryinfo',
      meta: { title: '基础信息查询' }
    },
    {
      path: 'oplist',
      component: () => import('@/views/tools/oplist/index'),
      name: 'oplist',
      access: 'oplist',
      meta: { title: '定期校验跟踪' }
    },
    {
      path: 'opapply',
      component: () => import('@/views/tools/opapply/index'),
      name: 'opapply',
      access: 'opapply',
      meta: { title: '定期校验申请' }
    },
    {
      path: 'opapplySign',
      component: () => import('@/views/tools/opapplySign/index'),
      name: 'opapplySign',
      access: 'opapplySign',
      meta: { title: '定期校验签核' }
    },
    {
      path: 'measuretransfer',
      component: () => import('@/views/tools/measuretransfer/index'),
      name: 'measuretransfer',
      access: 'measuretransfer',
      meta: { title: '量具设备报废移转申请' }
    },
    {
      path: 'measuretransferSign',
      component: () => import('@/views/tools/measuretransferSign/index'),
      name: 'measuretransferSign',
      access: 'measuretransferSign',
      meta: { title: '量具设备报废移转签核' }
    },
    {
      path: 'fixturetransfer',
      component: () => import('@/views/tools/fixturetransfer/index'),
      name: 'fixturetransfer',
      access: 'fixturetransfer',
      meta: { title: '辅助治具报废移转申请' }
    },
    {
      path: 'fixturetransferSign',
      component: () => import('@/views/tools/fixturetransferSign/index'),
      name: 'fixturetransferSign',
      access: 'fixturetransferSign',
      meta: { title: '辅助治具报废移转签核' }
    }
  ]
}

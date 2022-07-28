/**
 * 系统管理路由
 * access项要跟数据库里function的name一致
 */

import Layout from '@/layout'

export default {
  path: '/system',
  component: Layout,
  redirect: 'noRedirect',
  name: 'System',
  access: 'system',
  meta: {
    title: '系统管理',
    icon: 'system'
  },
  children: [
    {
      path: 'role',
      component: () => import('@/views/system/role/index'),
      name: 'Role',
      access: 'role',
      meta: { title: '角色权限管理' }
    },
    {
      path: 'user',
      component: () => import('@/views/system/user/index'),
      name: 'User',
      access: 'user',
      meta: { title: '用户管理' }
    }
  ]
}

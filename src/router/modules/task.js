import Layout from '@/layout'

export default {
  path: '/task',
  component: Layout,
  access: 'task',
  children: [
    {
      path: 'index',
      component: () => import('@/views/task/index'),
      name: 'Task',
      meta: { title: '任务管理', icon: 'task' }
    }
  ]
}

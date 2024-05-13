import { createRouter, createWebHistory } from 'vue-router'
import LoginViewVue from '../views/LoginView.vue'
import DashboardViewVue from '@/views/DashboardView.vue'
import { useAuthStore } from '@/stores/auth'
import { useLoadStore } from '@/stores/load'
import { PermissionsValueEnum } from '@/client/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardViewVue
    },
    {
      path: '/login',
      name: 'login',
      component: LoginViewVue
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UsersView.vue'),
      meta: { permission: PermissionsValueEnum.ManageUsers }
    },
    {
      path: '/users/create',
      name: 'create-user',
      component: () => import('@/views/CreateUserView.vue'),
      meta: { permission: PermissionsValueEnum.ManageUsers }
    },
    {
      path: '/users/update/:id',
      name: 'update-user',
      component: () => import('@/views/UpdateUsersView.vue'),
      meta: { permission: PermissionsValueEnum.ManageUsers }
    },
    {
      path: '/campaigns',
      name: 'campaigns',
      component: () => import('@/views/CampaignsView.vue')
    },
    {
      path: '/campaigns/create',
      name: 'create-campaign',
      component: () => import('@/views/CreateCampaignView.vue')
    },
    {
      path: '/campaigns/update/:id',
      name: 'update-campaign',
      component: () => import('@/views/UpdateCampaignView.vue')
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('@/views/ReportsView.vue')
    },
    {
      path: '/leads',
      name: 'leads',
      component: () => import('@/views/LeadsView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const loadStore = useLoadStore()
  loadStore.setLoading(true)
  if (to.name !== 'login' && auth.isSessionVerified && !auth.isAuthenticated) {
    next({ name: 'login' })
  } else {
    const requiredPermission = to.meta?.permission as PermissionsValueEnum
    if (!requiredPermission) next()
    else if (requiredPermission && !auth.hasPermission(requiredPermission))
      next({ name: 'dashboard' })
    else next()
  }
})

router.afterEach(() => {
  const loadStore = useLoadStore()
  loadStore.setLoading(false)
})

export default router

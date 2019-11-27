
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/registrar', component: () => import('pages/Registrar.vue') }
    ]
  },
  {
    path: '/sistema',
    component: () => import('layouts/LayoutDashboard.vue'),
    children: [
      { path: '', component: () => import('pages/sistema/Dashboard.vue') },
      { path: '/sistema/registro', component: () => import('pages/sistema/Registro.vue') },
      { path: '/sistema/lanc', component: () => import('pages/sistema/Lanc.vue') },
      { path: '/sistema/sair', component: () => import('pages/sistema/Sair.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes

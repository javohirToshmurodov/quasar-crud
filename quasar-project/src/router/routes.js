
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: "home", component: () => import('pages/IndexPage.vue') },
      { path: 'addProductForm', name: "addProductForm", component: () => import('pages/AddProduct.vue') },
      {
        path: '/:id', name: "EditDialog", component: () => import('pages/EditDialog.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue";
import AdminView from "../views/AdminView.vue";
import UserView from "../views/UserView.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/home',
      name: 'Admin',
      component: () => import("../layouts/AdminLayout.vue"),
      children: [
        {
          path: "/home",
          name: "admin",
          component: () => import('../views/AdminView.vue')
        },
        {
          path: '/home/lib',
          name: 'lib',
          component: () => import('../views/LIBView.vue')
        },
        {
          path: '/home/reports/SAOB',
          name: 'SAOB',
          component: () => import('../views/SAOBView.vue')
        }
      ],
      meta: { requiresAuth: true }
    },
    {
      path: "/user",
      component: () => import("../layouts/UserLayout.vue"),
      children: [
        {
          path: "/user",
          name: "home",
          component: UserView,
        }
      ],
      meta: { requiresAuth: true }
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('role') !== null;

  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});



// 
export default router



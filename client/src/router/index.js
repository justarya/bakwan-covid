import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import axios from '@/config/axios';

axios.defaults.headers.common.token = localStorage.getItem('token');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    props: true,
    component: () => import(/* webpackChunkName: "home" */ '@/pages/Home'),
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    props: true,
    component: () => import(/* webpackChunkName: "detail" */ '@/pages/Detail'),
  },
  {
    path: '/login',
    name: 'Login',
    props: true,
    meta: {
      requiresLogout: true,
    },
    component: () => import(/* webpackChunkName: "login" */ '@/pages/Login'),
  },
  {
    path: '/member',
    name: 'MemberArea',
    meta: {
      requiresAuth: true,
    },
    component: () => import(/* webpackChunkName: "member" */ '@/pages/MemberArea'),
    children: [
      {
        path: 'hospital/create',
        name: 'HospitalCreate',
        props: true,
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "member" */ '@/pages/MemberArea/hospital/Create'),
      },
      {
        path: 'info/:id',
        name: 'HospitalInfo',
        props: true,
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "member" */ '@/pages/MemberArea/hospital/Info'),
      },
      {
        path: 'supply/:id',
        name: 'HospitalSupply',
        props: true,
        meta: {
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "member" */ '@/pages/MemberArea/hospital/Supply'),
      },
      {
        path: '/admin/user/create',
        name: 'AdminCreateUser',
        props: true,
        meta: {
          isAdmin: true,
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "member" */ '@/pages/MemberArea/Admin/CreateUser'),
      },
      {
        path: '/admin/user/product',
        name: 'AdminProduct',
        props: true,
        meta: {
          isAdmin: true,
          requiresAuth: true,
        },
        component: () => import(/* webpackChunkName: "member" */ '@/pages/MemberArea/Admin/Product'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const adminValidation = (user) => {
    if (to.matched.some((record) => record.meta.isAdmin)) {
      if (user.role === 1) {
        next();
      } else {
        next({ name: 'MemberArea' });
      }
    } else {
      next();
    }
  };
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null) {
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath },
      });
    } else if (!store.state.isLogin) {
      store.dispatch('checkLogin')
        .then(() => {
          adminValidation(store.state.user);
        })
        .catch(() => {
          next({
            name: 'Login',
            params: { nextUrl: to.fullPath },
          });
        });
    } else {
      adminValidation(store.state.user);
    }
  } else if (to.matched.some((record) => record.meta.requiresLogout)) {
    if (localStorage.getItem('token') === null) {
      next();
    } else if (!store.state.isLogin) {
      store.dispatch('checkLogin')
        .then(() => {
          next({
            name: 'MemberArea',
            params: { nextUrl: to.fullPath },
          });
        })
        .catch(() => {
          next();
        });
    } else {
      next({
        name: 'MemberArea',
        params: { nextUrl: to.fullPath },
      });
    }
  } else next();
});

export default router;

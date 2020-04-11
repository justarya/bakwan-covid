import Vue from 'vue';
import VueRouter from 'vue-router';

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
    component: () => import(/* webpackChunkName: "login" */ '@/pages/Login'),
  },
  {
    path: '/hospital',
    name: 'Hospital',
    component: () => import(/* webpackChunkName: "hospital" */ '@/pages/Hospital'),
    children: [
      {
        path: 'info/:id',
        name: 'HospitalInfo',
        props: true,
        component: () => import(/* webpackChunkName: "hospital" */ '@/pages/Hospital/Info'),
      },
      {
        path: 'supply/:id',
        name: 'HospitalSupply',
        props: true,
        component: () => import(/* webpackChunkName: "hospital" */ '@/pages/Hospital/Supply'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

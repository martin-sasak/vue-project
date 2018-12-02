import Vue from 'vue';
import Router from 'vue-router';
import ConsignmentCreate from './views/ConsignmentCreate.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'create',
      component: ConsignmentCreate,
    },
    {
      path: '/consignments',
      name: 'consignments',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Consignments.vue'),
    },
  ],
});

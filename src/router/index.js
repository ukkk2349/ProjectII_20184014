//import Vue from 'vue'
import { createWebHistory, createRouter } from "vue-router";
//import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'

//Vue.use(Router)

// export default new Router({
//   mode: 'history',
//    routes: [
   const routes = [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
   ];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
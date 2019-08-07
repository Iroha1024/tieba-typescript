import Vue from 'vue'
import Router from 'vue-router'
import store from './store/'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: () => import('./views/login.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('./views/register.vue')
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('./views/home.vue')
        },
        {
            path: '/follow',
            name: 'follow',
            component: () => import('./views/follow.vue'),
            children: [
                {
                    path: 'ba',
                    name: 'ba',
                    component: () => import('./components/follow/followBa.vue')
                },
                {
                    path: 'user',
                    name: 'user',
                    component: () => import('./components/follow/followUser.vue')
                },
            ]
        },
    ]
})

router.beforeEach((to, from, next) => {
    let id = store.getters.getLocalUser.id;
    if (id || to.path === '/register') {
        next();
    } else {
        if (to.path == '/') { 
            next();
        } else {
            next('/');
        }
    }
})

export default router;
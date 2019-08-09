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
                    name: 'follow_ba',
                    component: () => import('./components/follow/followBa.vue')
                },
                {
                    path: 'user',
                    name: 'follow_user',
                    component: () => import('./components/follow/followUser.vue')
                },
            ]
        },
        {
            path: '/ba/:url',
            name: 'ba',
            component: () => import('./views/ba.vue'),
            props: true
        },
        {
            path: '/error/:type',
            name: 'error',
            component: () => import('./views/error.vue'),
            props: true
        },
    ]
})

router.beforeEach((to, from, next) => {
    let id = store.getters.getLocalUser.id;
    //若是前往注册页面，放行
    if (to.path === '/register') {
        next();
    }
    //登录成功后
    if (id) {
        //页面不匹配，跳转至error页面
        if (to.matched.length === 0) {
            next('/error/default');
        } else {
            //放行
            next();
        }
    } else {
        //未登录，则跳转至登录页面
        if (to.path == '/') { 
            next();
        } else {
            next('/');
        }
    }
})

export default router;
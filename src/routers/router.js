import Router from 'vue-router';
import Dashboard from '@/views/Dashboard.vue';
import Categories from '@/views/Categories.vue';
import Register from '@/views/authentication/Register.vue';
import Home from '@/views/Home.vue';
import Login from '@/views/authentication/Login.vue';
import resetPassword from '@/views/authentication/resetPassword.vue';
import Products from '@/views/Product.vue';
import { isLogin } from '@/services/auth_services';
import resetPasswordRequest from '@/views/authentication/resetPasswordRequest.vue'
import page404 from '@/views/page404.vue';
import store from '@/store';
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            beforeEnter: (to, from, next) => {
                if (!isLogin()) {
                    next('/login');
                } else {
                    next('/home');
                }
            }
        },
        {

            path: '/home',
            component: Home,
            children: [
                {
                    path: "",
                    component: Dashboard,
                    name: 'welcome'
                },
                {
                    path: '/categories',
                    component: Categories,
                    name: 'categories',
                    beforeEnter: (to, from, next) => {
                        if (store.state.user.role == 'adminstrator') {
                            next();
                        } else {
                            next('/products');
                        }
                    }
                },
                {
                    path: '/products',
                    component: Products,
                    name: 'product',
                }
            ],
            beforeEnter: (to, from, next) => {
                if (!isLogin()) {
                    next('/login');
                } else {
                    next()
                }
            }

        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            beforeEnter: (to, from, next) => {
                if (isLogin()) {
                    next('/home');
                } else {
                    next()
                }
            }
        },
        {
            path: '/reset-password/:email',
            name: 'reset-password',
            component: resetPassword,
            beforeEnter: (to, form, next) => {
                if (!isLogin()) {
                    next()
                } else {
                    next('/home')
                }
            }
        },
        {
            path: '/reset-password-request',
            name: 'reset-password-request',
            component: resetPasswordRequest,
            beforeEnter: (to, form, next) => {
                if (!isLogin()) {
                    next()
                } else {
                    next('/home')
                }
            }
        },
        {
            path: '*',
            name: "404",
            component: page404,
        }
    ],
    linkActiveClass: 'active'
})

export default router;
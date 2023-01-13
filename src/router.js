import { createWebHistory, createRouter } from 'vue-router';
 
import Home from "./views/Home.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
	},
    {
		path: '/login',
		name: 'login',
        component: () => import(/* webpackChunkName: "about" */ '../src/views/Login.vue')
	},
    {
		path: '/empleados',
		name: 'empleados',
        component: () => import(/* webpackChunkName: "about" */ '../src/views/Empleados.vue')
	},
    {
		path: '/premios',
		name: 'premios',
        component: () => import(/* webpackChunkName: "about" */ '../src/views/Premios.vue')
	},
    {
		path: '/catalogo',
		name: 'catalogo',
        component: () => import(/* webpackChunkName: "about" */ '../src/views/Catalogo.vue')
	},
	{
		path: '/login-2',
		name: 'login-2',
        component: () => import(/* webpackChunkName: "about" */ '../src/views/Login-2.vue')
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
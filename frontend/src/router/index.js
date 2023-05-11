import {createRouter, createWebHistory} from 'vue-router'
import BookingView from "@/views/BookingView";
import ClientsView from "@/views/ClientsView";
import EmployeesView from "@/views/EmployeesView";
import ProfessionsView from "@/views/ProfessionsView";
import TestFormView from "@/views/TestFormView";
import ServicesView from "@/views/ServicesView"
import ColorThemeView from "@/views/ColorThemeView"
import EmployeesTimetable from "@/views/employee/EmployeesTimetable"

const routes = [
    {
        path: '/',
        name: 'home',
        component: BookingView
    },
    {
        path: '/employees/timetable',
        name: 'employees-timetable',
        component: EmployeesTimetable
    },
    {
        path: '/clients',
        name: 'clients',
        component: ClientsView
    },
    {
        path: '/employees',
        name: 'employees',
        component: EmployeesView
    },
    {
        path: '/professions',
        name: 'professions',
        component: ProfessionsView
    },
    {
        path: '/services',
        name: 'services',
        component: ServicesView
    },
    {
        path: '/testform',
        name: 'testform',
        component: TestFormView
    },
    {
        path: '/colortheme',
        name: 'colortheme',
        component: ColorThemeView
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

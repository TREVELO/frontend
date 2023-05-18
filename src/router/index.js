import Vue from 'vue'
import VueRouter from 'vue-router'
import AppHome from '../views/AppHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'AppHomeVue',
    component: AppHome
  },
  {
    path: '/board',
    name: "board",
    component: () => import("@/views/AppBoard"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "BoardList",
        component: () => import("@/components/AppBoard/BoardList")
      },
      {
        path: "write",
        name: "BoardWrite",
        component: () => import("@/components/AppBoard/BoardWrite")
      },
      {
        path: "View",
        name: "BoardView",
        component: () => import("@/components/AppBoard/BoardView")
      },
      {
        path: "Modify",
        name: "BoardModify",
        component: () => import("@/components/AppBoard/BoardModify")
      }
    ]
  }, {
    path: "/map",
    name: "map",
    component: () => import("@/views/AppMap"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

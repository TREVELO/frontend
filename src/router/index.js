import Vue from "vue";
import VueRouter from "vue-router";
import AppHome from "../views/AppHome.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "",
        name: "AppHomeVue",
        component: AppHome,
    },
    {
        path: "/board",
        name: "board",
        component: () => import("@/views/AppBoard"),
        redirect: "/board/list",
        children: [
            {
                path: "list",
                name: "BoardList",
                component: () => import("@/components/AppBoard/BoardList"),
            },
            {
                path: "write",
                name: "BoardWrite",
                component: () => import("@/components/AppBoard/BoardWrite"),
            },
            {
                path: "View",
                name: "BoardView",
                component: () => import("@/components/AppBoard/BoardView"),
            },
            {
                path: "Modify",
                name: "BoardModify",
                component: () => import("@/components/AppBoard/BoardModify"),
            },
        ],
    },
    {
        path: "/map",
        name: "map",
        component: () => import("@/views/AppMap"),
        redirect: "/map/Map",
        children: [
            {
                path: "Map",
                name: "MapMap",
                component: () => import("@/components/AppMap/MapMap"),
            },
        ],
    },
    {
        path: "/mypage",
        name: "mypage",
        component: () => import("@/views/AppMypage"),
        redirect: "/mypage/view",
        children: [
            {
                path: "View",
                name: "MypageView",
                component: () => import("@/components/AppMypage/MypageView"),
            },
            {
                path: "Modify",
                name: "MypageModify",
                component: () => import("@/components/AppMypage/MypageModify"),
            },
        ],
    },
    {
        path: "/favorite",
        name: "favorite",
        component: () => import("@/views/AppFavorite"),
        redirect: "/favorite/list",
        children: [
            {
                path: "list",
                name: "FavoriteList",
                component: () => import("@/components/AppFavorite/FavoriteList"),
            },
        ],
    },
    {
        path: "/room",
        name: "room",
        component: () => import("@/views/AppRoomList"),
        redirect: "/room/list",
        children: [
            {
                path: "list",
                name: "roomList",
                component: () => import("@/components/AppRoom/RoomList"),
            },
            {
                path: "view",
                name: "roomView",
                component: () => import("@/components/AppRoom/RoomView"),
            },
            {
                path: "write",
                name: "roomWrite",
                component: () => import("@/components/AppRoom/RoomWrite"),
            },
            {
                path: "modify",
                name: "roomModify",
                component: () => import("@/components/AppRoom/RoomModify"),
            },
            {
                path: "/room/view/:roomId",
                name: "roomView",
                component: () => import("@/components/AppRoom/RoomView"),
            },
        ],
    },
    {
        path: "/reservation",
        name: "reservation",
        component: () => import("@/views/AppReservation"),
        redirect: "/reservation/list",
        children: [
            {
                path: "list",
                name: "ReservationList",
                component: () => import("@/components/AppReservation/ReservationList"),
            },
        ],
    },
    {
        path: "/plan",
        name: "plan",
        component: () => import("@/views/AppPlan"),
        redirect: "/plan/list",
        children: [
            {
                path: "list",
                name: "PlanList",
                component: () => import("@/components/AppPlan/PlanList"),
            },
            {
                path: "write",
                name: "PlanWrite",
                component: () => import("@/components/AppPlan/PlanWrite")
            }
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;

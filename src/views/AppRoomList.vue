<template>
    <div class="home">
        <div id="header">
            <main-header />
            <sub-header />
            <b>Room창</b>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import MainHeader from "@/components/Main-Header.vue";
import SubHeader from "@/components/Sub-Header.vue";

export default {
    name: "AppRoomList",
    components: {
        "main-header": MainHeader,
        "sub-header": SubHeader,
    },
};
</script>

<style scoped></style>

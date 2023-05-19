<template>
    <div>
        <main-header />
        <sub-header />
        <b>Mypage창</b>
        <router-view></router-view>
    </div>
</template>

<script>
import MainHeader from "@/components/Main-Header.vue"
import SubHeader from "@/components/Sub-Header.vue";

export default {

    name: "AppMypage",
    components: {
        'main-header': MainHeader,
        'sub-header': SubHeader,
    }
}
</script>

<style></style>
<template>
    <div class="home">
        <div id="header">
            <main-header />
            <sub-header></sub-header>
        </div>
        <b>Map창</b>
        <router-view></router-view>
    </div>
</template>

<script>
import MainHeader from "@/components/Main-Header.vue"
import SubHeader from "@/components/Sub-Header.vue";

export default {
    name: "AppMap",
    components: {
        'main-header': MainHeader,
        'sub-header': SubHeader,
    }
}
</script>

<style></style>
<template>
    <div class="home">
        <div id="header">
            <main-header />
            <sub-header />
            <b>AppPlan창</b>
            <router-view></router-view>
            <FooterVue></FooterVue>
        </div>
    </div>
</template>

<script>
import MainHeader from "@/components/Main-Header.vue"
import SubHeader from "@/components/Sub-Header.vue";
import FooterVue from "@/components/FooterVue.vue";

export default {
    name: 'AppPlan',
    components: {
        'main-header': MainHeader,
        'sub-header': SubHeader,
        FooterVue,
    }
}
</script>

<style></style>
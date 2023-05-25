<template>
  <div>
    <main-header />
    <sub-header />
    <router-view></router-view>
    <FooterVue></FooterVue>
  </div>
</template>

<script>
import MainHeader from "@/components/Main-Header.vue";
import SubHeader from "@/components/Sub-Header.vue";
import FooterVue from "@/components/FooterVue.vue";

export default {
  name: "AppMypage",
  components: {
    "main-header": MainHeader,
    "sub-header": SubHeader,
    FooterVue,
  },
};
</script>

<style></style>

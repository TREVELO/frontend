<template>
  <div class="home">
    <div id="header">
      <main-header @mark="fetchData()" />
      <sub-header></sub-header>
    </div>
    <router-view ref="MapMap"></router-view>
    <FooterVue></FooterVue>
  </div>
</template>

<script>
import MainHeader from "@/components/Main-Header.vue";
import SubHeader from "@/components/Sub-Header.vue";
import FooterVue from "@/components/FooterVue.vue";

export default {
  name: "AppMap",
  components: {
    "main-header": MainHeader,
    "sub-header": SubHeader,
    FooterVue,
  },
  methods: {
    fetchData() {
      this.$nextTick(() => {
        this.$refs.MapMap.fetchData();
      });
    },
  },
};
</script>

<style></style>

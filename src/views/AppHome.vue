<template>
  <div class="home">
    <div id="header">
      <main-header />
      <sub-header></sub-header>
    </div>
    <b>Home창</b>
  </div>
</template>

<script>
import MainHeader from "@/components/Main-Header.vue"
import SubHeader from "@/components/Sub-Header.vue";

export default {
  name: 'AppHome',
  components: {
    'main-header': MainHeader,
    'sub-header': SubHeader,
  }
}
</script>

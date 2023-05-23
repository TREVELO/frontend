
<template>
  <div id="app">

    <router-view />

  </div>
</template>

<script>


export default {
  name: 'app',
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

* {
  font-family: 'Noto Sans KR', sans-serif;
}

@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&display=swap');
</style>

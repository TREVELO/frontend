<template>
  <div id="Header"
    style="background-image: url('https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=1600');">
    <div id="topHeader">
      <button id="btn-header"><span style="font-family: 'Karla', sans-serif;">회원가입</span></button>
      <button id="btn-header"><span style="font-family: 'Karla', sans-serif;">로그인</span></button>
    </div>
    <!-- <img src="../assets/Image Pasted at 2023-5-15 16-35.png" alt=""> -->
    <div id="searchBox">
      <label>
        <input type="text" id="searchWord" placeholder="검색어를 입력해주세요." required
          style="font-family: 'Open Sans', sans-serif; padding-left: 1.5em;">
        <button type="submit" id="btn-search"><font-awesome-icon :icon="['fas', 'magnifying-glass']"
            style="height: 30px; vertical-align: middle;" /></button>
      </label>
    </div>
  </div>
</template>

<script>

// @ is an alias to /src
export default {

}
</script>

<style scoped>
#Header {
  background-image: -moz-radial-gradient();
  height: 350px;
}

span {
  color: white;
}

span:hover {
  font-weight: bolder;
}

#topHeader {
  vertical-align: middle;
  float: right;
  width: 100%;
  height: 100px;
}

a {
  float: right;
  margin-right: 75px;
  text-decoration: none;
  padding-top: 30px;
}

label {
  margin-top: 30px;
  position: relative;
}

#btn-search {
  position: absolute;
  right: 0px;
  width: 55px;
  height: 55px;
  border-radius: 24px;
  background-color: transparent;
  border: none;
}

#searchWord {
  width: 750px;
  height: 55px;
  border-radius: 24px;
  font-size: large;
}

#btn-header {
  text-align: center;
  padding: auto;
  float: right;
  margin-right: 60px;
  margin-left: 30px;
  margin-top: 30px;
  margin-bottom: 30px;
  position: relative;
  border-radius: 24px;
  opacity: 50%;
  border: none;
  background-color: transparent;
}

::placeholder {
  color: black;
  font-family: 'Open Sans', sans-serif;
}

@import url('https://fonts.googleapis.com/css2?family=Karla&family=Open+Sans&display=swap');
</style>

<template>
    <div>
        <ul style="list-style: none; text-align: center; margin-top: 30px;">
            <li><button class="btn-btn"><router-link :to="{ name: 'AppHomeVue' }">
                        <font-awesome-icon icon="fa-solid fa-house" style="color: #0a0a0a;" /><b style="color: #0a0a0a;">
                            홈</b>
                    </router-link></button>
            </li>
            <li><button><router-link :to="{ name: 'board' }"><b style="color: #0a0a0a;"><font-awesome-icon
                                icon="fa-solid fa-chess-board" style="color: #0a0a0a;" />
                            게시판</b></router-link></button></li>
            <li><button class="btn-btn"><b>공지사항</b></button></li>
            <li><button class="btn-btn"><b>숙소</b></button></li>
            <li><button class="btn-btn"><b>숙소</b></button></li>
            <li><button class="btn-btn"><b>게시판</b></button></li>
            <li><button class="btn-btn"><b>게시판</b></button></li>
        </ul>
    </div>
</template>

<script>

export default {

}
</script>

<style scoped>
li {
    margin-left: 15px;
    margin-right: 15px;
    display: inline-block;
}

button {
    font-size: large;
    border: none;
    font-family: 'Open Sans', sans-serif;
    background-color: transparent;
}

@import url('https://fonts.googleapis.com/css2?family=Karla&family=Open+Sans&display=swap');
</style>
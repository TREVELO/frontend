<template>
    <div>
        <ul style="list-style: none; text-align: center; margin-top: 30px">
            <li>
                <button class="btn-btn">
                    <router-link :to="{ name: 'AppHomeVue' }">
                        <font-awesome-icon icon="fa-solid fa-house" style="color: #0a0a0a" /><b
                            style="color: #0a0a0a"
                        >
                            홈</b
                        >
                    </router-link>
                </button>
            </li>
            <li>
                <button>
                    <router-link :to="{ name: 'board' }"
                        ><b style="color: #0a0a0a"
                            ><font-awesome-icon
                                icon="fa-solid fa-chess-board"
                                style="color: #0a0a0a"
                            />
                            게시판</b
                        ></router-link
                    >
                </button>
            </li>
            <li>
                <button>
                    <router-link :to="{ name: 'map' }"
                        ><b style="color: #0a0a0a"
                            ><font-awesome-icon
                                icon="fa-solid fa-plane"
                                style="color: #0a0a0a"
                            />관광지</b
                        ></router-link
                    >
                </button>
            </li>
            <li>
                <button class="btn-btn">
                    <router-link :to="{ name: 'room' }"
                        ><b style="color: #0a0a0a"
                            ><font-awesome-icon
                                icon="fa-solid fa-hotel"
                                style="color: #0a0a0a"
                            />숙소</b
                        ></router-link
                    >
                </button>
            </li>
            <li>
                <button>
                    <router-link :to="{ name: 'favorite' }"
                        ><b style="color: #0a0a0a"
                            ><font-awesome-icon
                                icon="fa-solid fa-chess-board"
                                style="color: #0a0a0a"
                            />
                            나의 관광지</b
                        ></router-link
                    >
                </button>
            </li>
            <li>
                <button>
                    <router-link :to="{ name: 'board' }"
                        ><b style="color: #0a0a0a"
                            ><font-awesome-icon
                                icon="fa-solid fa-chess-board"
                                style="color: #0a0a0a"
                            />
                            게시판</b
                        ></router-link
                    >
                </button>
            </li>
            <li>
                <button>
                    <router-link :to="{ name: 'map' }"
                        ><b style="color: #0a0a0a"
                            ><font-awesome-icon
                                icon="fa-solid fa-train-subway"
                                style="color: #0a0a0a"
                            />관광지</b
                        ></router-link
                    >
                </button>
            </li>

            <li>
                <button>
                    <router-link :to="{ name: 'reservation' }">
                        <b>나의 예약내역</b>
                    </router-link>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
export default {};
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
    background-color: transparent;
}
</style>

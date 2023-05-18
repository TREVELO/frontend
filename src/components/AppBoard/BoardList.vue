<template>
    <div>
        <b>BoardList화면</b>
        <b-container class="bv-example-row mt-3">
            <b-row>
                <b-col>
                    <b-alert show>
                        <h3>글목록</h3>
                    </b-alert>
                </b-col>
            </b-row>
            <b-row class="mb-1">
                <b-col class="text-right">
                    <b-button variant="outline-primary" @click="moveWrite()" v-if="userId">글쓰기</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-table striped hover :items="articles" :fields="fields" @row-clicked="viewArticle">
                        <template #cell(subject)="data">
                            <router-link :to="{ name: 'BoardList', params: { articleno: data.item.boardId } }">
                                {{ data.item.title }}
                            </router-link>
                        </template>
                    </b-table>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>
<!-- @row-clicked="viewArticle" -->
<script>
import axiosInstance from "@/api/axiosInstance";
import memberStore from "@/store/modules/memberStore";

export default {
    name: "BoardList",
    data() {
        return {
            articles: [],
            fields: [
                { key: "boardId", label: "글번호" },
                { key: "memberId", label: "글쓴이" },
                { key: "title", label: "제목" },
                { key: "hit", label: "조회수" },
                { key: "createdat", label: "작성날짜" }
            ],
            userinfo: [],
        }
    },
    created() {
        this.userinfo = sessionStorage.getItem("userinfo");
        console.log("userinfo")
        console.log(this.userinfo.name);
        this.userId = memberStore.state.userinfo
        console.log("created 실행")
        axiosInstance.get('http://localhost/api/v1/board/list')
            .then((res) => {
                console.log("리스트")
                this.articles = res.data
                for (let index = 0; index < this.articles.length; index++) {
                    // console.log(this.articles[index].createdat.substring(0, 10))
                    if (this.articles[index].updatedat !== null) {
                        this.articles[index].createdat = this.articles[index].updatedat;
                    }
                    let a = this.articles[index].createdat.substring(0, 10);
                    let b = this.articles[index].createdat.substring(11, this.articles[index].length);
                    // console.log(a);
                    // console.log(b);
                    this.articles[index].createdat = a + " " + b;
                }
            })
            .catch((err) =>
                console.log(err));

        // this.$store.dispatch('memberStore/decodeToken')
        //     .then(decodedToken => {
        //         this.userId = decodedToken.loginId;
        //         console.log(this.userId);
        //     }).catch(error => {
        //         console.log(error);
        //     })

    },
    methods: {
        moveWrite() {
            this.$router.push({ path: "write" })
        },
        viewArticle(article) {
            this.$router.push({
                name: "BoardView",
                params: { articleno: article.boardId },
            });
        },
    }
}
</script>

<style></style>
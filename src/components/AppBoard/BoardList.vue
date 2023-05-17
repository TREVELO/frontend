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
                    <b-button variant="outline-primary" @click="moveWrite()">글쓰기</b-button>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-table striped hover :items="articles" :fields="fields">
                        <template #cell(subject)="data">
                            <router-link :to="{ name: 'boardview', params: { articleno: data.item.boardId } }">
                                {{ data.item.subject }}
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
import axios from "axios";

export default {
    name: "BoardList",
    data() {
        return {
            articles: [],
            fields: [
                // { key: "boardId", label: "글번호" },
                { key: "title", label: "제목" },
                { key: "memberId", label: "멤버번호" },
                { key: "hit", label: "조회수" },
                { key: "createdat", label: "작성날짜" }
            ]
        }
    },
    created() {
        axios.get('http://localhost/api/v1/board/list')
            .then((res) => {
                // console.log(res.data);
                this.articles = res.data
                for (let index = 0; index < this.articles.length; index++) {
                    // console.log(this.articles[index].createdat.substring(0, 10))
                    let a = this.articles[index].createdat.substring(0, 10);
                    let b = this.articles[index].createdat.substring(11, this.articles[index].length);
                    // console.log(a);
                    // console.log(b);
                    this.articles[index].createdat = a + " " + b;
                }
            })
            .catch((err) =>
                console.log(err));
    },
    methods: {
        moveWrite() {
            this.$router.push({ path: "write" })
        }
    }
}
</script>

<style></style>
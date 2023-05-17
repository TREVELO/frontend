<template>
    <div>
        <b>BoardModify화면</b>
        <b-container class="bv-example-row mt-3">
            <b-row>
                <b-col>
                    <b-alert show>
                        <h3>글수정</h3>
                    </b-alert>
                </b-col>
            </b-row>
            <b-row class="mb-1">
                <b-col style="text-align: left">
                    <b-form @submit="onSubmit" @reset="onReset">
                        <b-form-group id="userid-group" label="작성자:" label-for="userid">
                            <b-form-input id="userid" v-model="article.memberId" type="text" required
                                placeholder="작성자 입력..."></b-form-input>
                        </b-form-group>

                        <b-form-group id="subject-group" label="제목:" label-for="subject">
                            <b-form-input id="subject" v-model="article.title" type="text" required
                                placeholder="제목 입력..."></b-form-input>
                        </b-form-group>

                        <b-form-group id="content-group" label="내용:" label-for="content">
                            <b-form-textarea id="content" v-model="article.content" placeholder="내용 입력..." rows="10"
                                max-rows="15"></b-form-textarea>
                        </b-form-group>

                        <b-button variant="primary" class="m-1" @click="onSubmit">글수정</b-button>
                        <b-button variant="danger" class="m-1" @click="onReset">초기화</b-button>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: 'BoardModify',
    components: {},
    data() {
        return {
            article: [],
            originalArticle : []
        };
    },
    created() {
        let param = this.$route.params.articleno;
        console.log(param)
        axios.get('http://localhost/api/v1/board/view/' + param)
            .then(({ data }) => {
                // console.log(data)
                if (data.updatedat !== null) {
                    data.createdat = data.updatedat;
                }
                let a = data.createdat.substring(0, 10);
                let b = data.createdat.substring(11, data.createdat.length);
                // console.log(a);
                // console.log(b);
                data.createdat = a + " " + b;
                this.article = data;
                this.originalArticle = data;
                // console.log(this.article);
                // console.log(this.originalArticle);
            })
     },
    methods: {
        onSubmit(article) {
            console.log(this.article)
            axios.put('http://localhost/api/v1/board/modify', { BoardDto: article })
                .then(() => {
                    console.log("글 수정 완료")
                    this.moveList()
                })
                .catch((err) => {
                console.log(err)
            })
        },
        onReset() {
            console.log(this.originalArticle.title);
            this.article.title = "";
            this.article.content = "";
            // this.article.title = this.originalArticle.title;
            // this.article.content = this.originalArticle.content;
        },
        moveList() {
            this.$router.push({ name: "BoardList" });
        }
    },
};
</script>

<style scoped></style>
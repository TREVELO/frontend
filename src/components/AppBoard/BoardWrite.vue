<template>
    <div>
        <b>BoardWrite화면</b>
        <b-container class="bv-example-row mt-3">
            <b-row>
                <b-col>
                    <b-alert show>
                        <h3>글작성</h3>
                    </b-alert>
                </b-col>
            </b-row>
        </b-container>
        <b-row class="mb-1">
            <b-col style="text-align: left">
                <b-form @submit="onSubmit">
                    <b-form-group id="title-group" label="제목:" label-for="title">
                        <b-form-input id="title" v-model="article.title" type="text" required
                            placeholder="제목 입력..."></b-form-input>
                    </b-form-group>

                    <b-form-group id="content-group" label="내용:" label-for="content">
                        <b-form-textarea id="content" v-model="article.content" placeholder="내용 입력..." rows="10"
                            max-rows="15" required></b-form-textarea>
                    </b-form-group>

                    <b-button type="submit" variant="primary" class="m-1">글작성</b-button>
                    <!-- <b-button type="submit" variant="primary" class="m-1">글수정</b-button> -->
                    <b-button @click="onReset" variant="danger" class="m-1">초기화</b-button>
                </b-form>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";

export default {
    name: "BoardWrite",
    data: function () {
        return {
            article: {
                title: "",
                content: "",
                boardTag: "",
            },
        };
    },
    methods: {
        onSubmit(event) {
            event.preventDefault();

            axiosInstance
                .post("http://localhost/api/v1/board/write", this.article)
                .then((res) => {
                    console.log(res.data);
                    this.moveList();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        onReset() {
            (this.article.title = ""), (this.article.content = "");
            // window.location.reload(true);
        },
        moveList() {
            this.$router.push({ name: "BoardList" });
        },
    },
};
</script>

<style></style>

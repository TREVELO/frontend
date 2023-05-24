<template>
  <div>
    <b>BoardView화면</b>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show>
            <h3>글보기</h3>
          </b-alert>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col class="text-left">
          <b-button variant="outline-primary" @click="moveList">목록</b-button>
        </b-col>
        <b-col class="text-right">
          <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2"
            v-if="article.memberId === userinfo.id">글수정</b-button>
          <b-button variant="outline-danger" size="sm" @click="deleteArticle" class="mr-2"
            v-if="article.memberId === userinfo.id">글삭제</b-button>
        </b-col>
      </b-row>
      <!-- <b-row class="mb-1"> -->
      <!-- <b-col>
          <b-card
            :header-html="`<h3>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            ${article.title} [${article.hit}]</h3><div><h6>${article.content}</div><div>${article.createdat}</h6></div>`"
            class="mb-2" border-variant="dark" no-body>
            <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
          </b-card>
        </b-col> -->
      <div style="margin-top: 30px; padding-bottom: 15px;">
        <div style="display: flex; justify-content: space-between;">
          <p style="text-align: left; font-size: 35px;">{{ article.title }}</p>
          <p style="text-align: right; vertical-align: middle;" v-if="!article.updatedat">{{ article.createdat }}</p>
          <p style="text-align: right; vertical-align: middle;" v-else>{{ article.updatedat }}</p>
        </div>
      </div>

      <div style="margin-top: 30px; border-bottom: solid 0.5px gray; padding-bottom: 15px;">
        <p style="text-align: left; font-size: 20px;">{{ article.content }}</p>
      </div>

      <div style="margin-top: 30px; text-align: left; margin-bottom: 100px;">
        총 {{ comments.length }}의 댓글이 있습니다.
        <div style="margin-top: 20px;">
          <textarea style="width: 100%; height: 120px; border-radius: 8px;" v-model="newComment.content"
            placeholder="댓글을 작성하세요"></textarea>
          <div style="text-align: right;">
            <button class="btn btn-outline-dark" @click="registerComment">댓글 등록</button>
          </div>
        </div>
      </div>
      <div v-for="(comment) in comments" :key="comment.id"
        style="margin-top: 30px; height: auto; border-bottom: 1px solid;">
        <div style="text-align: left;">
          {{ comment.content }}
        </div>
        <div style="text-align: right;">
          <button class="btn btn-outline-info" v-if="comment.memberId === userinfo.id">수정</button>
          <button class="btn btn-outline-danger" @click="deleteComment(comment)"
            v-if="comment.memberId === userinfo.id">삭제</button>
          <div class="comment-date" v-if="comment.updatedat === null" style="margin-bottom: 30px;">{{ comment.createdat }}
          </div>
          <div class="comment-date" v-else>수정됨 {{ comment.updatedat }}</div>
        </div>
      </div>



      <!-- </b-row> -->
    </b-container>
  </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";
// import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "BoardDetail",
  data() {
    return {
      article: {},
      userinfo: [],
      comments: [],
      newComment: {

      },
    };
  },
  computed: {
    ...mapGetters("memberStore", ["getUserinfo"])
  },
  created() {
    this.userinfo = this.$store.getters["memberStore/getUserinfo"];
    this.boardView();
    this.commentList();
  },
  methods: {
    // ...mapActions("memberStore", ["decodeToken", "fetchUserinfo"]),
    moveModifyArticle() {
      console.log(this.article.boardId);
      this.$router.replace({
        name: "BoardModify",
        params: { articleno: this.article.boardId },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    deleteArticle() {
      if (confirm("정말로 삭제?")) {
        console.log('글 삭제')
        let param = this.$route.params.articleno;
        axiosInstance.delete('http://localhost/api/v1/board/delete/' + param)
          .then(() => {
            console.log('글삭제 완료')
            this.moveList()
          })
          .catch((err) => {
            console.log(err)
          });
      }
    },
    moveList() {
      this.$router.push({ name: "BoardList" });
    },
    async registerComment() {
      this.newComment.boardId = this.article.boardId;

      try {
        await axiosInstance.post('http://localhost/api/v1/comment/write', this.newComment);
        console.log("댓글 작성 성공");

        await this.commentList();

        this.newComment.content = "";
      } catch (err) {
        console.log(err)
      }

    },
    boardView() {
      let param = this.$route.params.articleno;
      axiosInstance.get('http://localhost/api/v1/board/view/' + param)
        .then(({ data }) => {
          console.log(data)
          if (data.updatedat !== null) {
            let a = data.updatedat.substring(0, 10);
            let b = data.updatedat.substring(11, data.updatedat.length);
            data.updatedat = a + " " + b;
          } else {
            let a = data.createdat.substring(0, 10);
            let b = data.createdat.substring(11, data.createdat.length);
            data.createdat = a + " " + b;
          }
          this.article = data;
        })
    },
    async commentList() {
      let param = this.$route.params.articleno;
      axiosInstance.get('http://localhost/api/v1/comment/getlist/' + param)
        .then((res) => {
          this.comments = res.data;

          for (let index = 0; index < this.comments.length; index++) {
            if (this.comments[index].updatedat !== null) {
              let a = this.comments[index].updatedat.substring(0, 10);
              let b = this.comments[index].updatedat.substring(11, this.comments[index].updatedat.length);
              this.comments[index].updatedat = a + " " + b;
            } else {
              let a = this.comments[index].createdat.substring(0, 10);
              let b = this.comments[index].createdat.substring(11, this.comments[index].createdat.length);
              this.comments[index].createdat = a + " " + b;
            }
          }

        })
        .catch((err) => {
          console.log(err)
        })
    },
    async deleteComment(data) {

      if (confirm("댓글 삭제??")) {
        try {
          await axiosInstance.delete('http://localhost/api/v1/comment/delete/' + data.commentId);

          await this.commentList();
        } catch (error) {
          console.log(error)
        }
      }
    }
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style scoped></style>
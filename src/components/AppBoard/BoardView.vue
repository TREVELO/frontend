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

      <div style="margin-top: 30px; text-align: left;">
        총 {{ comments.length }}의 댓글이 있습니다.
        <div style="margin-top: 20px;">
          <textarea style="width: 100%; height: 120px; border-radius: 8px;" v-model="newComment"
            placeholder="댓글을 작성하세요"></textarea>
          <div style="text-align: right;">
            <button class="btn btn-outline-dark">댓글 작성</button>
          </div>
        </div>

      </div>
      <div v-for="(comment, index) in comments" :key="comment.id">
        <p>{{ index + 1 }}번째 댓글: {{ comment.content }}</p>

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
      newComment: "",
    };
  },
  computed: {
    ...mapGetters("memberStore", ["getUserinfo"])
  },
  created() {
    this.userinfo = this.$store.getters["memberStore/getUserinfo"];
    console.log(this.userinfo)
    let param = this.$route.params.articleno;
    console.log(param)
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


    // this.$store.dispatch('memberStore/fetchUserinfo')
    //   .then(() => {
    //     // 사용자 정보를 가져왔을 때 필요한 작업 수행
    //     this.userinfo = this.$store.getters["memberStore/getUserinfo"];
    //     console.log(this.userinfo);
    //   })
    //   .catch(error => {
    //     // 오류 처리
    //     console.error(error)
    //   });

    axiosInstance.get('http://localhost/api/v1/comment/getlist/' + param)
      .then((res) => {
        this.comments = res.data;
        console.log(this.comments);
      })
      .catch((err) => {
        console.log(err)
      })

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
  },
  // filters: {
  //   dateFormat(regtime) {
  //     return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
  //   },
  // },
};
</script>

<style scoped></style>
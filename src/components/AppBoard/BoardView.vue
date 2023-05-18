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
          <b-button variant="outline-info" size="sm" @click="moveModifyArticle" class="mr-2">글수정</b-button>
          <b-button variant=" outline-danger" size="sm" @click="deleteArticle">글삭제</b-button>
        </b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col>
          <b-card
            :header-html="`<h3>${article.boardId}.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                ${article.title} [${article.hit}]</h3><div><h6>${article.content}</div><div>${article.createdat}</h6></div>`"
            class="mb-2" border-variant="dark" no-body>
            <!-- <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body> -->
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";
// import { mapActions } from "vuex";
import { mapGetters } from "vuex";
import memberStore from "@/store/modules/memberStore";

export default {
  ...mapGetters("memberStore", ['getUserinfo']),
  name: "BoardDetail",
  data() {
    return {
      article: {},
      userinfo: [],
    };
  },
  computed: {
  },
  created() {
    let param = this.$route.params.articleno;
    console.log(param)
    axiosInstance.get('http://localhost/api/v1/board/view/' + param)
      .then(({ data }) => {
        console.log(data)
        if (data.updatedat !== null) {
          data.createdat = data.updatedat;
        }
        let a = data.createdat.substring(0, 10);
        let b = data.createdat.substring(11, data.createdat.length);
        // console.log(a);
        // console.log(b);
        data.createdat = a + " " + b;
        this.article = data;
      })
    this.userinfo = memberStore.state.userinfo
    console.log(this.userinfo)
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
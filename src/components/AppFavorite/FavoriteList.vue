<template>
  <div>
    <b-container class="bv-example-row mt-3">
      <b-row>
        <b-col>
          <b-alert show>
            <h3>관심 관광지 목록</h3>
          </b-alert>
        </b-col>
      </b-row>
      <b-row class="mb-1"> </b-row>
      <b-row>
        <b-col>
          <div class="table-container">
            <b-table hover :items="favoriteList" :fields="fields">
              <template #cell(first_image)="data">
                <div class="cell-container">
                  <div class="vertical-center">
                    <div v-html="data.value"></div>
                  </div>
                </div>
              </template>
              <template #cell(actions)="data">
                <b-button variant="danger" @click="deleteItem(data.item)">
                  삭제
                </b-button>
              </template>
            </b-table>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";

export default {
  name: "FavoriteList",
  data() {
    return {
      favoriteList: [],
      fields: [
        {
          key: "first_image",
          label: "사진",
          formatter: (value) => {
            return `<img src="${value}" alt="사진" width="130" height="100">`;
          },
        },
        { key: "title", label: "관광지명" },
        { key: "addr", label: "주소" },
        { key: "actions", label: "" },
      ],
    };
  },
  created() {
    this.fetchFavoriteList();
  },
  methods: {
    fetchFavoriteList() {
      axiosInstance
        .get("http://localhost/api/v1/attraction/favorite")
        .then((res) => {
          this.favoriteList = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteItem(item) {
      console.log("FavoriteList 삭제");
      if (confirm("삭제하시겠습니까??")) {
        axiosInstance
          .post(
            `http://localhost/api/v1/attraction/favorite/delete/${item.contentId}`
          )
          .then(() => {
            this.favoriteList = this.favoriteList.filter(
              (favItem) => favItem.contentId !== item.contentId
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style scoped>
.cell-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.vertical-center {
  display: flex;
  align-items: center;
}

.table-container {
  height: 700px;
  /* Set a fixed height for the container */
  overflow-y: auto;
  /* Add vertical scroll if content exceeds the container height */
}
</style>

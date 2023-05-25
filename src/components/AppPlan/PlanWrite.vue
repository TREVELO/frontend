<template>
  <div>
    planWrite화면
    <div>
      <b-calendar v-model="form.planStart">시작일</b-calendar>
      <b-calendar v-model="form.planEnd">도착일</b-calendar>
    </div>
    <div>시작일 : {{ form.planStart }}</div>
    <div>도착일 : {{ form.planEnd }}</div>
    <div>총 여행일 : {{ allday }}</div>
    <div><input type="text" v-model="form.planName"></div>
    <div><button type="button" class="btn btn-outline-dark" @click="register">테이블링</button></div>

    <div v-if="allday > 0" style="display: flex; margin-top: 50px;">
      <table>
        <thead>
          <th>일차</th>
          <th>들릴 곳</th>
          <!-- <th>숙소</th> -->
        </thead>
        <tbody>
          <tr v-for="(index) in allday" :key="index">
            <th>Day_{{ index }}</th>
            <th>
              <div class="drop-area" @dragover.prevent @drop="handleDrop(index - 1)">
                <div v-if="form.path[index - 1].attraction" style="text-align: left;">
                  <div v-for="(attraction, key) in form.path[index - 1].attraction" :key="key"
                    style="display: inline-block;">
                    <img :src="attraction.first_image" alt=""
                      style="width: 130px; height: 100px; margin-left: 10px; margin-right: 10px;">
                  </div>
                </div>
                Drop Image Here
              </div>
            </th>
            <!-- <th>
              <input type="text" v-model="form.path[index - 1].room" />
            </th> -->
          </tr>
        </tbody>
      </table>

      <div class="table-container">
        <b-table :items="myfavorite" :fields="myfavoriteFields">
          <template #cell(first_image)="data">
            <div class="cell-container">
              <div class="vertical-center">
                <div draggable="true" @dragstart="handelDragStart(data.item)" @dragend="handleDragEnd">
                  <img :src="data.item.first_image" alt="사진" width="130" height="100">
                </div>
              </div>
            </div>
          </template>
        </b-table>
      </div>
    </div>

    <b-button variant="dark" @click="registerform">등록버튼</b-button>






  </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance"
export default {
  data() {
    return {
      form: {
        planStart: '',
        planEnd: '',
        planName: '',
        path: [],
      },
      myfavorite: [],
      myfavoriteFields: [
        {
          key: 'first_image',
          label: '사진',
          formatter: (value) => {
            return `<img src="${value}" alt="사진" width="130" height="100">`;
          },
        },
        { key: 'title', label: '관광지명' }
      ],
      allday: "",
      draggingItem: null,
    }
  },
  created() {
    this.getFavoriteList();
  },
  methods: {
    register() {
      this.day();
      console.log(this.form)
    },
    getFavoriteList() {
      axiosInstance.get('http://localhost/api/v1/attraction/favorite')
        .then((res) => {
          this.myfavorite = res.data;
        })
        .catch((err) => {
          console.log(err)
        })
    },
    async day() {
      const start = new Date(this.form.planStart);
      const end = new Date(this.form.planEnd);
      if (start > end) {
        alert("도착 날짜가 시작 날짜보다 빠를 수 없습니다.")
        return;
      }
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      this.allday = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

      for (let index = 1; index <= this.allday; index++) {
        this.form.path.push({
          attraction: [],
          // room: ""
        })
      }

      console.log("Number of days", this.allday);
    },
    handelDragStart(item) {
      this.draggingItem = item;
      console.log(this.draggingItem)
    },
    handleDrop(day) {
      if (this.draggingItem) {
        const attraction = this.draggingItem;
        this.form.path[day].attraction.push(attraction);
        this.$set(this.form, 'path', [...this.form.path]); // Update the form.path array
        console.log(day)
      }
    },
    handleDragEnd() {
      this.draggingItem = null;
    },
    registerform() {

      if (!this.form.planName) {
        alert("여행 이름을 입력해주세요.")
        return;
      }

      this.form.path = JSON.stringify(this.form.path)
      axiosInstance.post('http://localhost/api/v1/plan/write', this.form)
        .then(() => {
          console.log("성공")
          this.$router.push({ name: "plan" });
        })
        .catch((err) => {
          console.log("실패", err);
        })
    }
  },
}
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
  height: 500px;
  width: 500px;
  /* Set a fixed height for the container */
  overflow-y: auto;
  /* Add vertical scroll if content exceeds the container height */
}
</style>
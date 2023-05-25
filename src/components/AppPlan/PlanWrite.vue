<template>
  <div>
    <div style="margin-top: 60px;">
      <b-calendar v-model="form.planStart" style="margin-right: 60px;">
        <div>출발 날짜 : {{ form.planStart }}</div>
      </b-calendar>
      <b-calendar v-model="form.planEnd" style="margin-left: 60px;">
        <div>도착 날짜 : {{ form.planEnd }}</div>
      </b-calendar>
    </div>
    <div><button type="button" class="btn btn-outline-dark" @click="day" v-if="isTable === false">계획 짜기</button>
    </div>

    <div style="width: 25%; vertical-align: middle; margin: 0 auto;" v-if="isTable === true">
      <b-input placeholder="여행 제목을 입력해주세요." style="margin-top: 20px; margin-bottom: 20px;" v-model="form.planName">

      </b-input>
    </div>

    <b-container v-if="allday > 0" style="display: flex; justify-content: center; align-items: center; margin-top: 50px;">
      <table style="width: auto; margin-right: 10px;">
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
                <div v-if="form.path[index - 1].attraction" style="text-align: left; margin-bottom: 10px;">
                  <div v-for="(attraction, key) in form.path[index - 1].attraction" :key="key"
                    style="display: inline-block; height: 150px; width: 200px; margin: 10px;">
                    <div class="card" style="display: flex; flex-direction: column;">
                      <img :src="attraction.first_image" alt="" style="width: 100%; height: 130px;">
                      <button class="btn btn-outline-danger" style="height: auto;"
                        @click="deleteRegister(index - 1, key)">Delete</button>
                    </div>
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
    </b-container>

    <button style="margin-top: 30px;" type="button" class="btn btn-outline-dark" @click="registerform"
      v-if="isTable === true">등록하기</button>






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
      isTable: false,
    }
  },
  created() {
    this.getFavoriteList();
  },
  methods: {
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
      if (start >= end || this.form.planStart === undefined || this.form.planEnd === undefined) {
        alert("도착 날짜가 시작 날짜보다 빠를 수 없습니다.")
        this.form.planEnd = null;
        return;
      }
      this.isTable = true;
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

      if (this.draggingItem && this.form.path[day].attraction.includes(this.draggingItem)) {
        alert("중복된 관광지입니다.")
        return;
      }

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
    },
    deleteRegister(index, key) {
      console.log(index);
      console.log(key)
      console.log(this.form.path[index].attraction[key])

      this.form.path[index].attraction.splice(key, 1);
    }
  },
}
</script>

<style scoped>
.table-container {
  height: 500px;
  /* Set a fixed height and width for the container */
  overflow-y: auto;
  /* Add vertical scroll if content exceeds the container height */
  position: absolute;
  right: 0;
  /* Position the container to the right side of the screen */
}
</style>
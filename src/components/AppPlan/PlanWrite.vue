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

    <div v-if="allday > 0">
      <table>
        <thead>
          <th>일차</th>
          <th>들릴 곳</th>
          <th>숙소</th>
        </thead>
        <tbody>
          <tr v-for="(index) in allday" :key="index">
            <th>Day_{{ index }}</th>
            <th><input type="text" v-model="form.path[index - 1].attraction"></th>
            <th><input type="text" v-model="form.path[index - 1].room"></th>
          </tr>
        </tbody>
      </table>
    </div>

    <div>
      <b-table :items="myfavorite"></b-table>
    </div>

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
      allday: "",
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
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      this.allday = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1;

      for (let index = 1; index <= this.allday; index++) {
        this.form.path.push({
          attraction: [],
          room: ""
        })
      }

      console.log("Number of days", this.allday);
    }
  },
}
</script>

<style></style>
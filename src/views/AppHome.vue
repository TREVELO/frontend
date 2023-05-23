<template>
  <div class="home">
    <div id="header">
      <main-header />
      <sub-header></sub-header>
    </div>
    <b>Home창</b>
    <div>
      <button class="btn btn-outline-secondary" v-if="isPositionAccesable === false" @click="getCurrentPosition()">
        현재 위치 기반 추천 장소 찾기
      </button>
      <div v-else>
        <div style="margin-top: 50px;"><b style="color: blue; font-size: 30px; vertical-align: middle;">추천 관광지</b><button
            class="btn btn-info" style="margin-left: 10px; border: none;"
            @click="makeRandom(nearAttractions, showAttractions)">새로
            고침</button>
        </div>
        <div style="margin-top: 50px;">
          <div class="card" style="width: 20rem; height: 25rem; display: inline-block; vertical-align: middle;"
            v-for="(show, index) in showAttractions" :key="show.contentId">
            <img :src="show.first_image" class="" alt="" style="margin-top: 30px; width: 200px; height: 200px;">
            <div class="card-body" style="height: ;">
              <p class="card-text"><b>{{ show.title }}</b></p>
              <p class="card-text"><b>{{ show.addr }}</b></p>
              <button class="btn btn-outline-dark" @click="showDetail(showAttractions, index)">상세 보기</button>
            </div>
          </div>
        </div>
        <!--  -->
        <div style="margin-top: 50px;"><b style="color: blue; font-size: 30px; vertical-align: middle;">추천 쇼핑</b><button
            class="btn btn-info" style="margin-left: 10px; border: none;"
            @click="makeRandom(nearShopping, showShopping)">새로
            고침</button>
        </div>
        <div style="margin-top: 50px;">
          <div class="card" style="width: 20rem; height: 25rem; display: inline-block; vertical-align: middle;"
            v-for="(show, index) in showShopping" :key="show.contentId">
            <img :src="show.first_image" class="" alt="" style="margin-top: 30px; width: 200px; height: 200px;">
            <div class="card-body" style="height: ;">
              <p class="card-text"><b>{{ show.title }}</b></p>
              <p class="card-text"><b>{{ show.addr }}</b></p>
              <button class="btn btn-outline-dark" @click="showDetail(showShopping, index)">상세 보기</button>
            </div>
          </div>
        </div>
        <!--  -->
        <div style="margin-top: 50px;"><b style="color: blue; font-size: 30px; vertical-align: middle;">추천 음식점</b><button
            class="btn btn-info" style="margin-left: 10px; border: none; vertical-align: middle;"
            @click="makeRandom(nearRestaurant, showRestaurant)">새로
            고침</button>
        </div>
        <div style="margin-top: 50px;">
          <div class="card" style="width: 20rem; height: 25rem; display: inline-block; vertical-align: middle;"
            v-for="(show, index) in showRestaurant" :key="show.contentId">
            <img @click="isModal = true" :src="show.first_image" class="" alt=""
              style="margin-top: 30px; width: 200px; height: 200px;">
            <div class="card-body" style="height: ;">
              <p class="card-text"><b>{{ show.title }}</b></p>
              <p class="card-text"><b>{{ show.addr }}</b></p>
              <button class="btn btn-outline-dark" @click="showDetail(showRestaurant, index)">상세 보기</button>
            </div>
          </div>
        </div>
        <attraction-modal v-if="isModal" @close="isModal = false" :attraction="attractionInfo"></attraction-modal>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from "@/api/axiosInstance";
import MainHeader from "@/components/Main-Header.vue";
import SubHeader from "@/components/Sub-Header.vue";
import AttractionModal from "@/components/AttractionModal.vue";

export default {
  name: 'AppHome',
  components: {
    'main-header': MainHeader,
    'sub-header': SubHeader,
    AttractionModal,
  },
  data() {
    return {
      position: {},
      isPositionAccesable: false,
      nearAttractions: [],
      nearShopping: [],
      nearRestaurant: [],
      attractions: [],
      distances: [],
      showAttractions: [],
      showShopping: [],
      showRestaurant: [],
      isModal: false,
      attractionInfo: {},
    }
  },
  mounted() {
    this.getCurrentPosition();
  },
  methods: {
    getCurrentPosition() {
      if (!navigator.geolocation) {
        alert("위치 정보 기능 사용 불가")
      } else {
        navigator.geolocation.getCurrentPosition(this.getPositionValue, this.gelocationError)
      }
    },
    getPositionValue(val) {
      this.position.latitude = val.coords.latitude;
      this.position.longitude = val.coords.longitude;
      this.isPositionAccesable = true
      console.log("현재 latitude 좌표")
      console.log(this.position.latitude)
      console.log("현재 longitude 좌표")
      console.log(this.position.longitude)

      axiosInstance.post("http://localhost/api/v1/attraction/search?title=&sidoCode=&gugunCode=&contentType=")
        .then((res) => {
          this.attractions = res.data;
          console.log(this.attractions)

          for (let index = 0; index < this.attractions.length; index++) {
            let nowAttraction = this.attractions[index];

            if (nowAttraction.first_image !== "") {
              if (nowAttraction.contentType == 12) {
                if (this.getDistance(this.position.latitude, this.position.longitude, nowAttraction.latitude, nowAttraction.longitude) < 20) {
                  this.nearAttractions.push(nowAttraction);
                }
              } else if (nowAttraction.contentType == 38) {
                if (this.getDistance(this.position.latitude, this.position.longitude, nowAttraction.latitude, nowAttraction.longitude) < 20) {
                  this.nearShopping.push(nowAttraction);
                }
              } else if (nowAttraction.contentType == 39) {
                if (this.getDistance(this.position.latitude, this.position.longitude, nowAttraction.latitude, nowAttraction.longitude) < 20) {
                  this.nearRestaurant.push(nowAttraction);
                }
              }
            }
          }

          this.makeRandom(this.nearAttractions, this.showAttractions);
          this.makeRandom(this.nearShopping, this.showShopping);
          this.makeRandom(this.nearRestaurant, this.showRestaurant)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    gelocationError() {
      alert("위치 정보 권한을 허용해 주십시오.")
    },
    getDistance(lat1, lon1, lat2, lon2) {
      var lat1p = parseFloat(lat1);
      var lon1p = parseFloat(lon1);
      var lat2p = parseFloat(lat2);
      var lon2p = parseFloat(lon2);

      var R = 6371;

      var dLat = (lat2p - lat1p) * Math.PI / 180;
      var dLon = (lon2p - lon1p) * Math.PI / 180;

      var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;

      return d;

    },
    makeRandom(originalArray, showArray) {
      var array = [];
      var num = originalArray.length;

      while (array.length < 5) {
        var k = Math.floor(Math.random() * num);

        if (!array.includes(k)) {
          array.push(k);
        }
      }

      showArray.splice(0, showArray.length);

      for (var i = 0; i < 5; i++) {
        showArray.push(originalArray[array[i]]);
      }
      console.log(showArray)
    },
    showDetail(array, index) {
      console.log("showDetail")
      this.isModal = true;
      this.attractionInfo = array[index];
    }
  }
}
</script>

<style scoped></style>

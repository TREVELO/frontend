<template>
    <div>

        <b-container>
            <div style="margin-bottom: 50px; margin-top: 80px;">
                <div style="display: flex; justify-content: flex-end;">
                    <button class="btn btn-outline-danger" @click="deletePlan">Delete</button>
                </div>
                <div style="text-align: left; font-size: 45px; width: auto;">
                    {{ plan.planName }}
                </div>
                <div style="text-align: right; width: auto;">
                    {{ plan.planStart }} ~ {{ plan.planEnd }}
                </div>
            </div>

            <div style="margin-bottom: 50px;">
                <b-form-checkbox value="true" unchecked-value="false" v-for="(index, i) in day" :key="i"
                    style="display: inline; margin: 10px;" v-model="check[index - 1]">
                    {{ index }}일차
                </b-form-checkbox>
            </div>

            <div id="map" style="margin: 0 auto;"></div>

            <div>
                {{ plan.path }}
            </div>


        </b-container>

    </div>
</template>

<script>
import axiosInstance from '@/api/axiosInstance';
export default {
    data() {
        return {
            plan: {},
            markerPositions: [],
            marker: [],
            day: '',
            dayPlans: [],
            check: [],
        }
    },
    mounted() {
        if (window.kakao && window.kakao.maps) {
            this.initMap();
        } else {
            const script = document.createElement("script");
            /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);
            script.src =
                "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=68a4947f8091662e797250d4aa2d4a54";
            document.head.appendChild(script);
        }
    },
    created() {
        this.getPlan();

    },
    methods: {
        initMap() {
            const container = document.getElementById("map");
            const options = {
                center: new kakao.maps.LatLng(35.19733010328186, 126.80823232697378),
                level: 5,
            };

            //지도 객체를 등록합니다.
            //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
            this.map = new kakao.maps.Map(container, options);
        },
        getPlan() {
            let param = this.$route.params.planId;
            console.log(param);

            axiosInstance.get('http://localhost/api/v1/plan/view/' + param)
                .then((res) => {
                    this.plan = res.data;
                    this.plan.path = JSON.parse(this.plan.path)
                    this.day = this.plan.path.length;

                    for (var index = 0; index < this.plan.path.length; index++) {
                        this.dayPlans.push(this.plan.path[index])
                        this.check.push("true")
                    }

                    console.log(this.plan)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
        deletePlan() {
            console.log(this.plan.planId);

            if (confirm("진짜로 삭제??")) {
                axiosInstance.delete('http://localhost/api/v1/plan/delete/' + this.plan.planId)
                    .then(() => {
                        console.log("삭제는 성공")
                        this.$router.push({ name: 'plan' })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        },
        displayMarker(markerPositions) {
            // console.log(this.attractions)
            console.log("처음 markerpositions")
            console.log(this.markerPositions)
            if (this.markers.length > 0) {
                this.markers.forEach((marker) => marker.setMap(null));
            }

            // console.log(kakao);
            const positions = markerPositions.map(
                (position) => new kakao.maps.LatLng(...position)
            );

            // console.log("positions")
            // console.log(positions)

            if (positions.length > 0) {
                this.markers = positions.map(
                    (position) =>
                        new kakao.maps.Marker({
                            map: this.map,
                            position,
                        })
                );

                const bounds = positions.reduce(
                    (bounds, latlng) => bounds.extend(latlng),
                    new kakao.maps.LatLngBounds()
                );

                this.map.setBounds(bounds);
            }
        },
    }
}
</script>

<style scoped>
#map {
    width: 1000px;
    height: 600px;
}
</style>
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
                    style="display: inline; margin: 10px;" v-model="check[index - 1]" @change="updateMarker">
                    {{ index }}일차
                </b-form-checkbox>
            </div>

            <div id="map" style="margin: 0 auto;"></div>
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
            markers: [],
            day: '',
            dayPlans: [],
            check: [],
            allMarkers :[],
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

        this.getPlan();

        for (var index = 0; index < this.plan.length; index++) {

            for (var index2 = 0; index2 < this.plan[index].length; index2++) {

                this.markerPositions.push([this.plan[index].attraction[index2].latitude, this.plan[index].attraction[index2].longitude]);

            }
            this.allPositions.push(this.markerPositions[index]);
        }

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
                        this.check.push("false")
                    }
                    
                    console.log(this.plan)

                    for (var index1 = 0; index1 < this.plan.path.length; index1++){
                        console.log("index1 = " + index1)
                        let now = [];
                        for (var index2 = 0; index2 < this.plan.path[index1].attraction.length; index2++){
                            now.push([this.plan.path[index1].attraction[index2].latitude, this.plan.path[index1].attraction[index2].longitude, index1])
                            console.log("index2 = " + index2)
                        }

                        this.markerPositions.push(now)
                        
                    }
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
        async displayMarker(markerPositions) {
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
            console.log(markerPositions)
            console.log("positions" + positions)

            var imageSrc = []; // 마커이미지의 주소입니다

            for (var index = 1; index <= markerPositions.length; index++){
                imageSrc.push(`https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=${index}|ff776b`)
            }

            var imageSize = new kakao.maps.Size(32, 35), // 마커이미지의 크기입니다
                imageOption = { offset: new kakao.maps.Point(27, 69) };
            
            if (positions.length > 0) {
                // this.markers = positions.map(
                //     (position) =>
                //         new kakao.maps.Marker({
                //             map: this.map,
                //             position,
                //         })
                // );

                for (let i = 0; i < positions.length; i++){
                        this.markers[i] = new kakao.maps.Marker({
                            map: this.map,
                            position: positions[i],
                            image: new kakao.maps.MarkerImage(imageSrc[markerPositions[i][2]], imageSize, imageOption)
                        })
                }

                const bounds = positions.reduce(
                    (bounds, latlng) => bounds.extend(latlng),
                    new kakao.maps.LatLngBounds()
                );

                this.map.setBounds(bounds);
            }
        },
        updateMarker() {
            console.log("마커 띄우기")
            console.log(this.check.length)

            let now = [];

            for (var index = 0; index < this.check.length; index++){
                if (this.check[index] == "true") {

                    for (var index2 = 0; index2 < this.markerPositions[index].length; index2++){
                        now.push(this.markerPositions[index][index2])
                    }
                    
                }
            }

            this.displayMarker(now)
        }
    },
}
</script>

<style scoped>
#map {
    width: 1000px;
    height: 600px;
}
</style>
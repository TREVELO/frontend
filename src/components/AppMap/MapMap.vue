<template>
    <div>
        <b>kakao Map화면</b>
        <div id="map" style="margin: 0 auto;"></div>
        <div class="button-group">
            <attraction-modal v-if="isModal" @close="isModal = false" :attraction="attractionInfo"></attraction-modal>
            <button @click="displayMarker(markerPositions)">marker set 1</button>
            <!-- <button @click="displayMarker([])">Erase Marker</button> -->
            <button>Go Search</button>
            <button>My Favorite</button>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/api/axiosInstance';
import AttractionModal from '../AttractionModal.vue';

export default {
    components: { AttractionModal },
    name: "MapMap",
    data() {
        return {
            markerPositions: [],
            markers: [],
            isModal: false,
            attractions: [],
            attractionInfo: {},
        };
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
        this.fetchData();
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

                this.markers.customData = {
                    contentId: "contenteId 정보 저장"
                }

                this.markers.forEach((marker, index) => {
                    kakao.maps.event.addListener(marker, "click", () => {
                        console.log(index)
                        this.markerClicked(index);
                    })
                })

                const bounds = positions.reduce(
                    (bounds, latlng) => bounds.extend(latlng),
                    new kakao.maps.LatLngBounds()
                );

                this.map.setBounds(bounds);
            }
        },
        markerClicked(index) {
            console.log("==========markerClicked")
            const contentId = this.markerPositions[index][2]

            axiosInstance.post(`http://localhost/api/v1/attraction/favorite/view/${contentId}`)
                .then((res) => {
                    this.attractionInfo = res.data;
                    console.log(this.attractionInfo);
                    console.log("attractionInfo Modal Start")
                    this.isModal = true;
                })
                .catch((err) => {
                    console.log(err)
                })
            // const clickedMarker = this.markers[index];
            // const contentId = clickedMarker.customData.contentId;

            // console.log('마커 클릭 - contentId:', contentId);
        },
        fetchData() {
            let subject = this.$route.params.subject;
            let sentence = this.$route.params.sentence;

            console.log(subject);
            console.log(sentence);

            if (subject != undefined && sentence != undefined) {
                axiosInstance.post(`http://localhost/api/v1/attraction/search?title=${sentence}&sidoCode=&gugunCode=&contentType=${subject}`)
                    .then((res) => {
                        console.log(res.data)

                        this.attractions.splice(0, this.attractions.length);
                        this.markerPositions.splice(0, this.markerPositions.length)

                        for (let index = 0; index < res.data.length; index++) {
                            this.attractions.push(res.data[index])
                        }

                        for (let index = 0; index < this.attractions.length; index++) {
                            this.markerPositions.push([this.attractions[index].latitude, this.attractions[index].longitude, this.attractions[index].contentId])
                        }

                        console.log("markerPositions 갯수")
                        console.log(this.markerPositions)
                        if (this.markerPositions.length > 0) {
                            this.displayMarker(this.markerPositions);
                        }
                        // this.markerPositions.push([this.attractions[0].latitude, this.attractions[0].longitude])
                        // console.log(this.markerPositions.length)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
        }
    },
    created() {

        // console.log(this.attractions.length)
        // for (let index = 0; index < attractions.length; index++) {
        //     const element = array[index];

        // }
        // this.markerPositions
    }
};
</script>

<style scoped>
#map {
    width: 1400px;
    height: 800px;
}

.button-group {
    margin: 10px 0px;
}

button {
    margin: 0 3px;
}
</style>

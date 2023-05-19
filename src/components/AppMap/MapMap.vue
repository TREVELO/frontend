<template>
    <div>
        <b>kakao Map화면</b>
        <div id="map" style="margin: 0 auto;"></div>
        <div class="button-group">
            <button @click="displayMarker(markerPositions)">marker set 1</button>
            <button @click="displayMarker([])">Erase Marker</button>
            <button>Go Search</button>
            <button>My Favorite</button>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/api/axiosInstance';

export default {
    name: "KakaoMap",
    data() {
        return {
            markerPositions: [],
            markers: [],
            infowindow: null,
            attractions: [],
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



        axiosInstance.post("http://localhost/api/v1/attraction/search?title=&sidoCode=3&gugunCode=2&contentType=14")
            .then((res) => {
                // console.log(res.data.length)
                for (let index = 0; index < res.data.length; index++) {
                    this.attractions.push(res.data[index])
                }

                for (let index = 0; index < this.attractions.length; index++) {
                    this.markerPositions.push([this.attractions[index].latitude, this.attractions[index].longitude])
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
            // console.log(this.markerPositions)
            if (this.markers.length > 0) {
                this.markers.forEach((marker) => marker.setMap(null));
            }

            console.log(kakao);
            const positions = markerPositions.map(
                (position) => new kakao.maps.LatLng(...position)
            );

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
        displayInfoWindow() {
            if (this.infowindow.getMap()) {
                //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
                this.map.setCenter(this.infowindow.getPosition());
                return;
            }

            var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
                iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
                iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

            this.infowindow = new kakao.maps.InfoWindow({
                map: this.map, // 인포윈도우가 표시될 지도
                position: iwPosition,
                content: iwContent,
                removable: iwRemoveable,
            });

            this.map.setCenter(iwPosition);
        },
        viewAttraction() {

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
    width: 1200px;
    height: 600px;
}

.button-group {
    margin: 10px 0px;
}

button {
    margin: 0 3px;
}
</style>

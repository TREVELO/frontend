<template>
    <div class="home">
        <div id="header">
            <main-header />
            <sub-header></sub-header>
        </div>
        <b>Map창</b>
        <MapMap>

        </MapMap>
    </div>
</template>

<script>
import MainHeader from "@/components/Main-Header.vue"
import SubHeader from "@/components/Sub-Header.vue";
import MapMap from "@/components/AppMap/MapMap.vue";

export default {
    name: "AppMap",
    components: {
        'main-header': MainHeader,
        'sub-header': SubHeader,
        'MapMap': MapMap,
    }
}
</script>

<style></style>
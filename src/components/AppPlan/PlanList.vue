<template>
    <div>
        PlanList화면

    </div>
</template>

<script>
import axiosInstance from '@/api/axiosInstance'
export default {
    data() {
        return {
            myfavorite: [],
        }
    },
    created() {
        this.getfavoritelist();
    },
    methods: {
        getfavoritelist() {
            console.log("getfavoritelist")
            axiosInstance.get('http://localhost/api/v1/attraction/favorite')
                .then((res) => {
                    this.myfavorite = res.data;
                    console.log(this.myfavorite)
                })
                .catch((err) => {
                    console.log(err)
                })
        },
    }

}
</script>

<style></style>
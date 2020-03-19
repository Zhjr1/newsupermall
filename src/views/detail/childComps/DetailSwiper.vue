<template>
    <swiper class="dtswiper">
        <swiper-item v-for="(item, index) in topImg" :key="index">
            <img :src="item" alt="">
        </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from "components/common/swiper"
export default {
    props: {
        topImg: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components:{
        Swiper,
        SwiperItem
    }
}
</script>

<style>
    .dtswiper {
        height: 300px;
        overflow: hidden;
    }
</style>
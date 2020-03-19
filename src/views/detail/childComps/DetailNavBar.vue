<template>
  <div>
      <nav-bar>
          <div slot="left" class="dt-img" @click="backClick">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="detail-title">
              <div v-for="(item,index) in titles" :key="index"
              class="detail-title-item"
              :class="{dtactive: index === detailIndex}"
              @click="detailClick(index)">{{item}}</div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    components:{
        NavBar
    },
    data(){
        return {
            titles: ['商品','参数','评论','推荐'],
            detailIndex: 0
        }
    },
    methods:{
        detailClick(index) {
            this.detailIndex = index;
            this.$emit('detailClick',index)
        },
        backClick(){
            this.$router.back()
        }
    }
}
</script>

<style scoped>
    .detail-title {
        display: flex;
        /* justify-content: space-around; */
        font-size: 13px;
    }
    .detail-title-item {
        flex: 1;
    }
    .dtactive {
        color: var(--color-high-text);
    }
    .dt-img img {
        margin-top: 12px;
    }
</style>
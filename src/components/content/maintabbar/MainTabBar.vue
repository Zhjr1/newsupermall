<template>
      <tab-bar class="tab-bars">
      <!-- 如果path的值是变量则需要改为动态 :path="" -->
      <tab-bar-item path="/home" activeColor="deepPink">
        <img slot="item-icon" src="@/assets/img/tabbar/home.png" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/home_active.png" alt="">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="deepPink">
        <img slot="item-icon" src="@/assets/img/tabbar/category.png" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/category_active.png" alt="">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="deepPink">
        <img slot="item-icon" src="@/assets/img/tabbar/cart.png" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/cart_active.png" alt="">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="deepPink"> 
        <img slot="item-icon" src="@/assets/img/tabbar/profile.png" alt="">
        <img slot="item-icon-active" src="@/assets/img/tabbar/profile_active.png" alt="">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar'
import TabBarItem from '@/components/common/tabbar/TabBarItem'
export default {
    components:{
        TabBar,
        TabBarItem
    }
}
</script>

<style scoped>
  /* .tab-bars {
    z-index: 9;
  } */
</style>
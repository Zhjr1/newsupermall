<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="cart-navbar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!-- 商品 -->
    <cart-lists></cart-lists>
    <!-- 底部结算 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartLists from './children/CartLists'
import CartBottomBar from './children/CartBottomBar'

import {mapGetters} from 'vuex'

export default {
  name:"Cart",
  components: {
    NavBar,
    CartLists,
    CartBottomBar
  },
  computed: {
    // ...mapGetters(['cartLength','cartList'])
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
  position: relative;
}
.cart-navbar {
  background-color: var(--color-tint);
  /* font-size: 14px; */
  color: #fff;
  font-weight: 500;
}
</style>
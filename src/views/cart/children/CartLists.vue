<template>
    <div class="cart-list">
        <scroll class="cart-scroll" ref="scroll">
          <cart-list-item v-for="(item, index) in list" 
          :key="index" 
          :product="item"></cart-list-item>
        </scroll>
    </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'
export default {
  name: "CartLists",
  data() {
    return {
      
    }
  },
  computed: {
    ...mapGetters({
      list: 'cartList'
    })
  },
  components:{
    Scroll,
    CartListItem
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  mounted() {
    // this.$refs.scroll.refresh();
  }
}
</script>

<style scoped>
.cart-list {
    height: calc(100% - 44px - 49px - 50px);
    position: relative;
}

.cart-scroll {
    overflow: hidden;
    /* position: absolute;
    top: 44px;
    bottom: 99px;
    left: 0;
    right: 0;
    background-color: #ffffff; */
    height: 100%;
}
/* .scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 99px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
} */
/* .shop-item {
  font-size: 0;
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #cccccc;
} */
/* .shop-item:last-child {
  border-bottom: 0;
}
.item-selector {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12%;
}
.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.item-img {
  padding: 5px;
}
.item-img img {
  display: block;
  width: 80px;
  height: 100px;
  border-radius: 5px;
  object-fit: cover;
}
.item-info {
  font-size: 17px;
  position: relative;
  overflow: hidden;
  width: 88%;
  padding: 5px 10px;
  color: #333333;
}
.item-info .item-desc {
  font-size: 14px;
  margin-top: 15px;
  color: #666666;
}
.info-bottom {
  position: absolute;
  right: 10px;
  bottom: 10px;
  left: 10px;
  margin-top: 10px;
}
.info-bottom .item-price {
  color: #ff4500;
}
.cart-bottom-bar {
  font-size: 15px;
  position: fixed;
  right: 0;
  bottom: 50px;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px;
  border-top: 1px solid #cccccc;
}
.cart-bottom-price {
  margin-left: 50px;
}
.cart-bottom-price span {
  color: red;
}
.cart-bottom-btn button {
  line-height: 50px;
  position: absolute;
  right: 0;
  bottom: 0;
  display: block;
  height: 50px;
  padding: 0 15px;
  color: white;
  border: 0;
  outline: none;
  background: linear-gradient(to right, #ff6034, #ee0a24);
}
.cart-bottom-btn button:active {
  opacity: 0.8;
} */
</style>
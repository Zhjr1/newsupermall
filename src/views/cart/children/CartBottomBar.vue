<template>
  <div class="bottom-bar">
      <div class="check-all">
        <check-button class="check-bt"></check-button>
        <span>全选</span>
      </div>
      <div>
          合计: {{totalPrice}}
      </div>
      <div class="calculate">
          去结算({{checkLength}})
      </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    naem:"CartBottomBar",
    components:{
        CheckButton
    },
    computed:{
        totalPrice() {
            return '¥' + this.$store.state.cartList.filter(item => {
                return item.checked
            }).reduce((preValue, item) => {
                return preValue + item.price * item.count
            },0)
        },
        checkLength() {
            return this.$store.state.cartList.filter(item => item.checked).length
        }
    }
}
</script>

<style scoped>
    .bottom-bar {
        height: 50px;
        position: fixed;
        left: 0;
        right: 0;
        bottom: 49px;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #fff;
        /* position: relative; */
    }
    .check-all {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .check-bt {
        /* width: 22px;
        height: 22px; */
        margin:0 3px;
    }
</style>
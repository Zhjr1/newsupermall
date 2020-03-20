<template>
  <div class="toast" v-show="show">
      <div>{{msg}}</div>
  </div>
</template>

<script>
export default {
    name: "Toast",
    props: {
        msg: {
            type: String,
            default: ''
        },
        show: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        padding: 8px 10px;
        background-color: rgba(0,0,0,.6);
        transform: translate(-50%, -50%);
        color: #fff;
        border-radius: 10%;
    }
</style>
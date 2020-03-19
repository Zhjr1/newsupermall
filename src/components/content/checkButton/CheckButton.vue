<template>
  <div class="check-button" :class="{checks:isChecked}">
      <img src="~assets/img/common/favor.png" alt="">
  </div>
</template>

<script>
export default {
    name:"CheckButton",
    props: {
        isChecked: {
            type:Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    .check-button {
        border-radius: 50%;
        border: 2px solid #aaa;
    }
    .check-button img {
        width: 20px;
        height: 20px;
        display: block;
    }
    .checks {
        border-color: orangered;
    }
</style>
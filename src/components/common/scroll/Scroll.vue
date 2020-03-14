<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
    <!-- 1.在普通的dom结构中，在元素上添加ref属性，this.$refs.ref获取的是具有这个ref属性的dom节点
    2.在vue组件中,this.$refs.ref获取的是组件的实例，组件中的data可以直接this.$refs.ref.key获取数据 -->
</template>

<script>
import BScroll from 'better-scroll'

export default {
    props:{
        probeType:{
            type: Number,
            dafault: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data(){
        return {
            scroll: null
        }
    },
    mounted() {
        //1.创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            probeType: this.probeType,
            pullUpLoad: this.pullUpLoad
        })

        //2.监听滚动的位置
        this.scroll.on('scroll',(position) => {
            // console.log(position);
            this.$emit('scroll', position)
        })

        //3.监听上拉事件
        this.scroll.on('pullingUp',() => {
            // console.log('加载更多');
            this.$emit('pullingUp')
        })
    },
    methods:{
        scrollTo(x,y,time=300){
            this.scroll.scrollTo(x,y,time)
        },
        finishPullUp() {
            this.scroll.finishPullUp()
        }
    }
}
</script>

<style scoped>

</style>
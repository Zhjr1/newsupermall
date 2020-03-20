<template>
    <div id="detail">
        <detail-nav-bar class="dt-navbar" @detailClick="detailClick"
        ref="dtnav"></detail-nav-bar>
        <scroll :probe-type="3" class="dt-content" ref="scroll"
        @scroll="detailScroll">
            <detail-swiper :top-img="topImg"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detail-info="detailInfo"
            @imgLoad="imgLoad"></detail-goods-info>
            <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
            <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
            <goods-list ref="recommend" :goods="recommends"></goods-list>
        </scroll> 
        <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
        <back-top @click.native="dtbackClick" v-show="isShowBackTop"></back-top>
        <toast :msg="msg" :show="show"></toast>
    </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'
import Toast from 'components/common/toast/Toast'

import {debounce} from 'common/utils';
// import {itemListenerMixin} from '@/common/mixin';

import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
export default {
    name:'Detail',
    data(){
        return {
            iid: null,
            topImg: [],
            goods: {},
            shop: {},
            detailInfo: {},
            paramInfo: {},
            commentInfo: {},
            recommends:[],
            itemImgListener: null,
            themeTopYs: [],
            getThemeTopY: null,
            currentIndex: 0,
            isShowBackTop: false,
            msg: '',
            show: false
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        BackTop,
        Toast
    },
    // mixins: [itemListenerMixin], //代码与home重复，使用混入mixins
    created(){
        //保存传入的iid
        this.iid = this.$route.params.iid

        //2根据iid请求详情数据
        getDetail(this.iid).then(res => {
            // console.log(res);
            // 1获取顶部图片
            const data = res.result
            this.topImg = data.itemInfo.topImages
            
            //2获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

            //3店铺信息
            this.shop = new Shop(data.shopInfo)

            //4获取商品详情信息
            this.detailInfo = data.detailInfo

            //5获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

            //6取出评价信息
            if(data.rate.cRate !== 0) {
                this.commentInfo = data.rate.list[0]
            }

            this.getThemeTopY = debounce(() =>{
                this.themeTopYs = [];
                this.themeTopYs.push(0);
                this.themeTopYs.push(this.$refs.params.$el.offsetTop);
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
                // console.log(this.themeTopYs);
                this.themeTopYs.push(Number.MAX_VALUE)
            },100)
        })

        //请求推荐数据
        getRecommend().then(res => {
            this.recommends = res.data.list
        })

    },
    mounted(){
        // 处理重新计算滚动高度以及防抖
         const refresh = debounce(this.$refs.scroll.refresh,100)

         this.itemImgListener = () => {
           refresh()
         }
         this.$bus.$on('itemImgLoad',this.itemImgListener);
        //  console.log('混入')
    },
    destroyed(){
        this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods: {
        imgLoad() {
            this.$refs.scroll.refresh();

            this.getThemeTopY();
        },
        detailClick(index) {
            // console.log(index);
            this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        },
        detailScroll(position) {
            //区y值
            const positionY = -position.y
            //对比
            let length = this.themeTopYs.length
            for(let i = 0; i < length-1; i++) {
                if(this.currentIndex !== i && (positionY >=this.themeTopYs[i] && positionY < this.themeTopYs[i+1])) {
                    this.currentIndex = i
                    this.$refs.dtnav.detailIndex = this.currentIndex
                }
            }

            this.isShowBackTop = (-position.y) > 1000
        },
        dtbackClick(){
            this.$refs.scroll.scrollTo(0, 0, 500)
        },
        addToCart() {
            //1.获取购买商品信息
            const product = {}
            product.image = this.topImg[0];
            product.title = this.goods.title;
            product.desc = this.goods.desc;
            product.price = this.goods.realPrice;
            product.iid = this.iid;
            
            //2将商品添加到vuex管理,返回promise好做后续处理
            this.$store.dispatch('addCart',product).then(res => {
                this.msg = res;
                this.show = true;

                setTimeout(() => {
                    this.show = false
                    this.msg = ''
                },1500) 
            })
            // this.addCart(product).then(res=> {}) 想引入getters一样引入actions
        }
    }
}
</script>

<style scoped>
    #detail {
        position: relative;
        background-color: #fff;
        z-index: 9;
        height: 100vh;
    }
    .dt-navbar {
        position: relative;
        background-color: #fff;
        z-index: 9;
    }
    .dt-content {
        height: calc(100% - 44px);
    }
</style>
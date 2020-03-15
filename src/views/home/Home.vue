<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick" ref="tabControl1"
      class="home-tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="home-content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImgLoad="swiperImgLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar';
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from "@/network/home";
import {debounce} from 'common/utils';

export default {
  name:"Home",
  data(){
    return {
      banners:[],
      recommends:[],
      // goods储存'流行','新款','精选'数据，page请求页数，list对应页数数据
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  //记录home位置better-scroll版本1.13.2有效
  activated(){
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.saveY = this.$refs.scroll.getScrollY()
  },
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created(){
    //1.请求多个数据(轮播图...)
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
    
  },
  mounted(){
    //处理重新计算滚动高度以及防抖
     const refresh = debounce(this.$refs.scroll.refresh,200)
     this.$bus.$on('itemImgLoad',()=>{
       refresh()
     })
  },
  methods:{
    // 事件监听
    tabClick(index){
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    //回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    //是否显示回到顶部按钮
    contentScroll(position){
      // console.log(position);
      // 1判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      // 2决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    //是否下拉加载更多
    loadMore(){
      // console.log('加载更多');
      this.getHomeGoods(this.currentType)
    },
    // 监听轮播图图片是否加载,然后计算tabControl的offsetTop
    swiperImgLoad(){
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    // 网络请求
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    })
    },
    getHomeGoods(type){
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res =>{
      console.log(res);
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1

      //完成上拉加载更多
      this.$refs.scroll.finishPullUp()
    })
    }
  }
}
</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    /* 100vh 100个视口 vh就是当前屏幕可见高度的1% */
    height: 100vh;
    position: relative;
  }

  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* 用原生滚动需要下方样式 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .home-content {
    /* height: calc(100%); */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .home-tab-control {
    position: relative;
    z-index: 9;
  }
</style>
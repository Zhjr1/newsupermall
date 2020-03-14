<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content" 
    ref="scroll" 
    :probe-type="3" 
    @scroll="contentScroll"
    :pull-up-load="true"
    @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" class="home-tab-control"
      @tabClick="tabClick"></tab-control>
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
      isShowBackTop: false
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
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
    //请求多个数据(轮播图...)
    this.getHomeMultidata()
    //请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
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
    },
    //回到顶部
    backClick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    //是否显示回到顶部按钮
    contentScroll(position){
      // console.log(position);
      this.isShowBackTop = -position.y > 1000
    },
    //是否下拉加载更多
    loadMore(){
      // console.log('加载更多');
      this.getHomeGoods(this.currentType)
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

      this.$refs.scroll.finishPullUp()
    })
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
    /* 100vh 100个视口 vh就是当前屏幕可见高度的1% */
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .home-tab-control {
    /* 设定了position:sticky的元素表现为relative还是fixed是根据元素是否达到设定了的阈值决定的 */
    /* position: sticky元素的任意父节点的 overflow 属性必须是 visible */
    position: sticky;
    top: 44px;
    z-index: 9;
  }
  .content {
    /* height: calc(100%); */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>
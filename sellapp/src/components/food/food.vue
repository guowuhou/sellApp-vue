<template>
    <div v-show="showFlag" ref="foodObj" class="foodDetail">
       <div class="food-detailContent">
           <div class="image-header">
                <img class="headerImage" :src="food.image">
                <div @click="hideDetailInfo" class="backList">
                    <span class="icon-arrow_lift"></span>
                </div>
           </div>
           <div class="contentDetailInfo">
               <h1 class="detailTitle">{{food.name}}</h1>
               <div class="foodDetailInfo">
                   <span class="sell-count">月售{{food.sellCount}}份</span>
                   <span class="foodRating">好评率{{food.rating}}%</span>
               </div>
               <div class="selectprice">
                   <span class="nowselectPrice">¥{{food.price}}</span>
                   <span class="oldselectPrice" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
               </div>
               <div class="cartcontrol-wrappwe">
                   <cartcontrol :food="food"></cartcontrol>
               </div>
               <div class="buyBusiness" @click.stop.prevent="addFrist" v-show="!food.count || food.count===0">加入购物车</div>
           </div>
           <split></split>
           <div class="foodInfo" v-show="food.info">
               <h1 class="foodTitle">商品信息</h1>
               <p class="foodText">{{food.info}}</p>
           </div>
           <split></split>
           <div class="foodRating">
               <h1 class="ratingTitle">商品评价</h1>
               <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
               <div class="rating-wrapper">
                   <ul v-show="food.ratings && food.ratings.length">
                      <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                          <div class="userComment">
                              <span class="userName">{{rating.username}}</span>
                              <img class="userAvatar" width="12" height="12" :src="rating.avatar">
                          </div>
                          <div class="ratingTime">{{rating.rateTime|formatDate}}</div>
                          <p class="ratingText">
                              <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                          </p>
                      </li>
                   </ul>
                   <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
               </div>
           </div>
       </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import Vue from 'vue';
  import cartcontrol from '../cartcontrol/cartcontrol';
  import split from '../splites/splites';
  import {formatDate} from '../../common/js/date.js';
  import ratingselect from '../ratingselect/ratingselect';

  const POSITIVE=0 ;
  const NEGATIVE=1;
  const ALL=2;
  //vue2过滤器的使用
  Vue.filter("formatDate",(value)=>{
      let date=new Date(value);
      return formatDate(date,'yyyy-MM-dd hh:mm');
  });
   export default{
       props:{
           food:{
               type:Object
           }
       },
       data(){
           return{
               showFlag:false,
               selectType: ALL,
               onlyContent: true,
               desc:{
                 all:"全部",
                 positive:"推荐",
                 negative:"吐槽"
               }
           }
       },
       //事件发射与接收eventHub已经在main文件中定义，商品评价需要创造的钩子函数，子组件向父组件传递数据，监听select-type
       created(){
          this.$root.eventHub.$on('select-type',this.handleSelecType);
          this.$root.eventHub.$on('only-content',this.handleOnlyConntent)
       },
       //事件发射与接收eventHub已经在main文件中定义，用于商品评价，子组件向父组件传递数据，解除监听select-type
       beforeDestroy(){
         this.$root.eventHub.$off('select-type',this.handleSelecType);
         this.$root.eventHub.$on('only-content',this.handleOnlyConntent)
       },
       methods:{
           show(){
               this.showFlag=true;
               this.selectType=ALL;
               this.onlyContent=true;
               this.$nextTick(()=>{
                   if(!this.scroll){
                        this.scroll=new BScroll(this.$refs.foodObj,{click:true});
                   }else{
                       this.scroll.refresh();
                   }
               })
               
           },
           hideDetailInfo(){
               this.showFlag=false;
           },
           addFrist(event){
               if(!event._constructed){
                   return;
               }
               Vue.set(this.food,'count',1)
           },
           //商品评价需要创造的钩子函数，接受子组件的数据给父组件从新赋值
           handleSelecType(type){
               this.selectType=type;
           },
           handleOnlyConntent(oContent){
               this.onlyConten=oContent;
           },
           needShow(type,text){
                 if(this.onlyContent && !text){
                     return false;
                 }
                 if(this.selectType===ALL){
                     return true;
                 }else{
                     return type===this.selectType;
                 }
             }
       },
    components:{
        cartcontrol,
        split,
        ratingselect
    }   
       
   }
</script>
 
<style>
@import "../../common/sell-icon/style.css";

   .foodDetail{
       position: fixed;
       left: 0px;
       top: 0px;
       bottom: 48px;
       z-index: 30;
       width: 100%;
       background: #fff  
   }
   .image-header{
       position:relative;
       width: 100%;
       height: 0;
       padding-top: 100%;
   }
   .headerImage{
       position: absolute;
       top:0px;
       left: 0px;
       width: 100%;
       height: 100%
   }
   .backList{
       position: absolute;
       top: 10px;
       left: 0px
   }
   .contentDetailInfo{
       padding: 18px;
       position: relative;
   }
   .detailTitle{
       line-height: 14px;
       margin-bottom: 8px;
       font-size: 14px;
       font-weight: 700;
       color: rgb(7,17,27)
   }
   .foodDetailInfo{
       margin-bottom: 18px;
       line-height: 18px;
       height: 10px;
       font-size: 0
   }
   .sell-count{
       font-size: 10px;
       color: rgb(147,153,159);
       margin-right: 12px;
   }
   .foodRating{
       font-size: 10px;
       color: rgb(147,153,159);
   }
   .selectprice{
       font-weight: 700;
       line-height: 24px
   }
   .nowselectPrice{
       margin-right: 8px;
       font-size: 14px;
       color: rgb(240,20,20)
   }
   .oldselectPrice{
       text-decoration: line-through;
       font-size: 10px;
       color: rgb(147,153,159)
   }
   .icon-arrow_lift{
       display: block;
       padding: 12px;
       font-size: 20px;
       color: #fff
   }
   .cartcontrol-wrappwe{
       position: absolute;
       right: 12px;
       bottom: 12px;
   }
   .buyBusiness{
       position: absolute;
       right: 18px;
       bottom: 18px;
       z-index: 10;
       height: 24px;
       line-height: 24px;
       padding: 0 12px;
       box-sizing: border-box;
       border-radius: 12px;
       font-size: 10px;
       color: #fff;
       background: rgb(0,160,220)
   }
   .foodInfo{
       padding: 18px;
   }
   .foodTitle{
       line-height: 14px;
       margin-bottom: 6px;
       font-size: 14px;
       color: rgb(7,17,27)
   }
   .foodText{
       line-height: 24px;
       padding: 0 8px;
       font-size: 12px;
       color: rgb(77,85,93)
   }
   .foodRating{
       padding-top: 18px;
   }
   .ratingTitle{
       line-height: 14px;
       margin-left: 18px;
       font-size: 14px;
       color: rgba(7,17,27)
   }
   .icon-thumb_up,.icon-thumb_down{
       line-height: 16px;
       margin-right: 4px;
       font-size: 12px;
   }
   .icon-thumb_up{
       color: rgb(0,160,220)
   }
   .icon-thumb_down{
       color: rgb(147,153,159)
   }
   .rating-wrapper{
       padding: 0 18px;

   }
   .rating-item{
       position: relative;
       padding: 16px 0;
       border-bottom:1px solid rgba(7,17,27,0.1)
   }
   .userComment{
       position: absolute;
       right: 0;
       top: 16px;
       font-size: 0;
       line-height: 12px;
   }
   .userName{
       display: inline-block;
       color: rgb(147,153,159);
       vertical-align: top;
       margin-right: 6px;
       font-size: 10px;
   }

   .userAvatar{
       border-radius: 50%;
   }
   .ratingTime{
       margin-bottom: 6px;
       line-height: 12px;
       font-size: 10px;
       color: rgb(147,153,159)

   }
   .no-rating{
       padding: 16px 0;
       font-size: 12px;
       color: rgb(147,153,159)
   }
   .ratingText{
       line-height: 16px;
       font-size: 12px;
       color: rgb(7,17,27)
   }
</style> 
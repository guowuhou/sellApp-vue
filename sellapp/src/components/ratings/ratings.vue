<template>
    <div class="ratings" ref="ratingObj">
        <div class="ratings-content" >
            <div class="overview">
                <div class="overview-left">
                    <h1 class="commentScore">{{seller.score}}</h1>
                    <div class="commentTitle">综合评分</div>
                    <div class="commentRank">高于周边商家{{seller.rankRate}}%</div>
                </div>
                <div class="overview-right">
                    <div class="score-wrapper">
                        <span class="starTitle">服务态度</span>
                        <star :size="36" :score="seller.serviceScore"></star>
                        <span class="customerScore">{{seller.serviceScore}}</span>
                    </div>
                    <div class="score-wrapper">
                        <span class="starTitle">商品评分</span>
                        <star :size="36" :score="seller.foodScore"></star>
                        <span class="customerScore">{{seller.foodScore}}</span>
                    </div>
                    <div class="delivery-wrapper">
                        <span class="arriveTitle">送达时间</span>
                        <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
                    </div>
                </div>
            </div>
            <split></split>
            <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="ratings"></ratingselect>
            <div class="ratings-wrapper">
                <ul>
                    <li  v-show="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating-items">
                        <div class="ratingAvatars">
                            <img width="28px" height="28px" :src="rating.avatar">
                        </div>
                        <div class="ratingContents">
                            <h1 class="contenterName">{{rating.username}}</h1>
                            <div class="star-wrappers">
                                <star :size="24" :score="rating.score"></star>
                                <span class="deliveryTimes" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
                            </div>
                            <p class="ratingTexts">{{rating.text}}</p>
                            <div class="recommends" v-show="rating.recommend.length">
                                <span class="icon-thumb_up"></span>
                                <span class="recommendItem" v-for="item in rating.recommend">{{item}}</span>
                            </div>
                            <div class="recommendTime">{{rating.rateTime|formatDate}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
 import BScroll from 'better-scroll';
 import star from '../star/star';
 import split from '../splites/splites';
 import Vue from 'vue';
 import {formatDate} from '../../common/js/date.js';
 import ratingselect from '../ratingselect/ratingselect';
   
   const ALL=2;
   const ERR_OK=0;
   //vue2过滤器的使用
  Vue.filter("formatDate",(value)=>{
      let date=new Date(value);
      return formatDate(date,'yyyy-MM-dd hh:mm');
  });

    export default{
         data(){
           return{
               ratings:[],
               selectType: ALL,
               onlyContent: true,
               desc:{
                 all:"全部",
                 positive:"推荐",
                 negative:"吐槽"
               }
            }
          },
         created(){
               this.$http.get('/api/ratings').then((response)=>{
                  response=response.body;
                  if(response.errno===ERR_OK){
                      this.ratings=response.data;
                       this.$nextTick(()=>{
                        if(!this.scroll){
                            this.scroll=new BScroll(this.$refs.ratingObj,{click:true});
                        }else{
                            this.scroll.refresh();
                        }
                     })
                  }
             });
          //事件发射与接收eventHub已经在main文件中定义，商品评价需要创造的钩子函数，子组件向父组件传递数据，监听select-type  
          this.$root.eventHub.$on('select-type',this.handleSelecType);
          this.$root.eventHub.$on('only-content',this.handleOnlyConntent)
         } ,
         props:{
             seller:{
                 type:Object
             }
         },
         
       //事件发射与接收eventHub已经在main文件中定义，用于商品评价，子组件向父组件传递数据，解除监听select-type
         beforeDestroy(){
           this.$root.eventHub.$off('select-type',this.handleSelecType);
           this.$root.eventHub.$on('only-content',this.handleOnlyConntent)
         },
         methods:{
           show(){
               this.selectType=ALL;
               this.onlyContent=true;
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
             star,
             ratingselect,
             split
         }
     };
</script>
 
<style>
@import "../../common/sell-icon/style.css";
   .ratings{
       position: absolute;
       top:174px;
       bottom:0;
       left:0;
       width: 100%;
       overflow: hidden;
   }
   .overview{
       display: flex;
       padding:18px 0;
   }
   .overview-left{
       flex: 0 0 137px;
       width:137px;
       border-right: 1px solid rgba(7,17,27,0.2);
       padding-bottom: 6px 0px;
       text-align: center;
   }
   .overview-right{
       flex: 1;
       padding: 6px 0 6px 12px;

   }
   @media screen and (max-width:320px){
        .overview-right{
            flex:0 0 180px;
            width: 180px;
       };
    }
   .commentScore{
       line-height: 28px;
       font-size: 24px;
       color: rgb(255,153,0);
       margin-bottom:8px;
   }
   .commentTitle{
       margin-bottom: 8px;
       line-height: 12px;
       font-size: 12px;
       color: rgb(7,17,27)
   }
   .commentRank{
       line-height: 10px;
       font-size: 10px;
       color: rgb(147,153,159);
   }
   .score-wrapper{
       
       margin-bottom: 8px;
       font-size: 0
   }
   .starTitle{
       display: inline-block;
       line-height: 18px;
       vertical-align: top;
       font-size: 12px;
       color: rgb(7,17,27)
   }
   .score-wrapper>.star{
       display: inline-block;
       margin: 0 12px;
   }
   .customerScore{
       display: inline-block;
       line-height: 18px;
       vertical-align: top;
       font-size: 12px;
       color: rgb(147,153,159)
   }
   .delivery-wrapper{
       font-size: 0;
   }
   .arriveTitle{
       line-height: 18px;
       font-size: 12px;
       color: rgb(7,17,27)
   }
   .deliveryTime{
       font-size: 12px;
       color: rgb(147,153,159);
       margin-left: 12px
   }
   .ratings-wrapper{
       padding: 0 18px;
   }
   .rating-items{
       display: flex;
       padding: 18px 0;
       border: 1px solid rgb(7,17,27,0.2);
   }
   .ratingAvatars{
       margin-right: 12px;
       width: 28px;
       flex: 0 0 28px;
   }
   .ratingAvatars>img{
       border-radius: 50%;
   }
   .ratingContents{
       position: relative;
       flex: 1
   }
   .contenterName{
       line-height: 12px;
       font-size: 10px;
       color: rgb(7,17,27);
       margin-bottom: 4px;
   }
   .star-wrappers{
       margin-bottom: 6px;
       font-size: 0;
       /*margin-left: -15px*/
   }
   .star-wrappers>.star{
      vertical-align: top;
      margin-right: 16px;
      display: inline-block
   }
   .deliveryTimes{
       color: rgb(147,153,159);
       line-height: 12px;
       font-size: 10px
   }
   .ratingTexts{
       margin-bottom: 8px;
       line-height: 18px;
       font-size: 12px;
       color: rgb(7,17,27)
   }
   .recommends{
       line-height: 16px;  
       font-size: 0px 
   }
   .recommends>.icon-thumb_up,.recommendItem{
       display: inline-block;
       margin: 0 8px 4px 0;
       font-size: 9px
   }
   .recommendItem{
       padding: 0 6px;
       border: 1px solid rgba(7,17,27,0.2);
       border-radius: 1px;
       color: rgb(147,153,159);
       background: #fff
   }
   .ratingContents>.recommendTime{
       position: absolute;
       line-height: 12px;
       top: 0;
       right: 10px;
       font-size: 10px;
       color: rgb(147,153,159)
   }
</style> 
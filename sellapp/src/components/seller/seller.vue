<template>
    <div class="prdSeller" ref="sellerObj">
       <div class="seller.content">
           <div class="prdOverView">
               <h1 class="prdTitles">{{seller.name}}</h1>
               <div class="prdDescribe">
                   <star :size="36" :score="seller.score"></star>
                   <span class="ratingsText">({{seller.ratingCount}})</span>
                   <span class="ratingsText">月售{{seller.sellCount}}单</span>
               </div>
               <ul class="prdRemark">
                   <li class="prdBlock">
                       <h2>起送价</h2>
                       <div class="proContent">
                           <span class="prdStress">{{seller.minPrice}}</span>元
                       </div>
                   </li>
                   <li class="prdBlock">
                       <h2>商家配送</h2>
                       <div class="proContent">
                           <span class="prdStress">{{seller.deliveryPrice}}</span>元
                       </div>
                   </li>
                   <li class="prdBlock">
                       <h2>平均配送时间</h2>
                       <div class="proContent">
                           <span class="prdStress">{{seller.deliveryTime}}</span>分钟
                       </div>
                   </li>
               </ul>
               <div class="favorite" @click="toggleFavorite">
                   <span class="icon-favorite"  :class="{'prdactive':favorite}"></span>
                   <span class="icon-text">{{favoriteText}}</span>
               </div>
           </div>
           <split></split>
           <div class="bulletin">
               <h1 class="activeTitle">公告与活动</h1>
               <div class="active-wrapper">
                   <p class="activeContent">{{seller.bulletin}}</p>
               </div>
                <ul v-if="seller.supports" class="prdSupports">
                    <li class="prdsupport-item" v-for="(item,index) in seller.supports">
                        <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                        <span class="texts">{{seller.supports[index].description}}</span>
                    </li>
               </ul>
           </div>
           <split></split>
           <div class="pics">
               <h1 class="picsTitle">商家实景</h1>
               <div class="pic-wrapper" ref="scrollUl">
                   <ul class="pic-list" ref="ulTotalPic">
                       <li class="pic-item" v-for="pic in seller.pics">
                           <img :src="pic" width="120px" height="90px">
                       </li>
                   </ul>
               </div>
           </div>
           <split></split>
           <div class="information">
               <h1 class="sellersTitle">商家信息</h1>
               <ul>
                   <li class="infor-item" v-for="info in seller.infos">{{info}}</li>
               </ul>
           </div>
       </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import star from '../star/star';
  import split from '../splites/splites';
  import {saveToLocal,loadFromLocal} from '../../common/js/store.js';
     export default{
         props:{
             seller:{
                 type:Object
             }
         },
         data(){
            return {
                favorite:(()=>{
                    return loadFromLocal(this.seller.id,'favorite',false)
                })()
            }
         },
        computed:{
            favoriteText(){
                return this.favorite?'已收藏':'收藏'
            }
        },
        created(){
             this.classMap=['decrease','discount','special','invoice','guarantee'];
         },
        watch:{
             'seller'(){
                 this._initScroll();
                 this._initPics();
             }
        } ,
        mounted: function () {
            this._initScroll();
            this._initPics();
        },
        methods:{
             _initScroll(){
                 if(!this.scroll){
                    this.scroll=new BScroll(this.$refs.sellerObj,{click:true,});
                }else{
                     this.scroll.refresh();
                 }
             },
             _initPics(){
              if(this.seller.pics){
                let picWidth=120;
                let margin=6;
                let ulWidth=(picWidth+margin)*this.seller.pics.length-margin;
                this.$refs.ulTotalPic.style.width=ulWidth+'px';
                this.$nextTick(()=>{
                    if(!this.picScroll){
                       this.picScroll=new BScroll(this.$refs.scrollUl,{scrollX:true,eventPassthrough:'vertical'});
                    }else{
                        this.picScroll.refresh();
                    }
                })
                }
             },
             toggleFavorite(event){
                if(!event._constructed){
                    return;
                }
                this.favorite=!this.favorite;
                saveToLocal(this.seller.id,'favorite',this.favorite)
             }
        },
       components:{
             star,
             split
        }
     };
</script>
 
<style>
@import "../../common/sell-icon/style.css";
  .prdSeller{
      position: absolute;
      top: 174px;
      bottom: 0;
      left: 0px;
      width: 100%;
      overflow: hidden
  }
  .prdOverView{
      position: relative;
      padding: 18px;
  }
  .prdTitles{
      margin-bottom: 8px;
      color: rgb(7,17,27);
      font-size: 14px;
      line-height: 14px;
  }
  .prdDescribe{
      padding-bottom: 18px;
      font-size: 0px;
      border-bottom: 1px solid rgba(7,17,27,0.1)
  }
  .prdDescribe>.star{
      display: inline-block;
      margin-right: 8px;
      vertical-align: top;
      margin-left: -6px;
  }
  .ratingsText{
      display: inline-block;
      line-height: 18px;
      margin-right: 12px;
      vertical-align: top;
      font-size: 10px;
      color: rgb(77,85,93)
  }
  .prdRemark{
      display: flex;
      padding-top: 18px;
  }
  .prdBlock{
      flex: 1;
      text-align: center;
      border-right: 1px solid rgba(7,17,27,0.1)
  }
  .prdBlock:last-child{
      border: none
  }
  .prdBlock>h2{
      margin-bottom: 4px;
      line-height: 10px;
      font-size: 10px;
      color: rgb(147,153,159)
  }
  .proContent{
      line-height: 24px;
      color: rgb(7,17,27);
      font-size: 10px;
  }
  .prdStress{
      font-size: 24px;
  }
  .bulletin{
      padding: 18px 18px 0 18px;
  }
  .activeTitle{
      margin-bottom: 8px;
      line-height: 14px;
      color: rgb(7,17,27);
      font-size: 14px
  }
  .ctive-wrapper{
      padding: 0 12px 16px 12px;
      border-bottom: rgba(7,17,27,0.1);
  }
  .activeContent{
      line-height: 24px;
      font-size: 12px;
      color: rgb(240,20,20)
  }
  .prdsupport-item{
      border-bottom: 1px solid rgba(7,17,27,0.1);
      padding: 16px 12px;
      font-size: 0;

  }
  .prdsupport-item>.icon{
        display: inline-block;
        vertical-align: top;
        width: 16px;
        height:16px;
        margin-right: 6px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
    }
    .prdsupport-item>.decrease{
        background-image: url("decrease_4@2x.png");
    }
    .prdsupport-item>.discount{
        background-image: url("discount_4@2x.png");
    }
    .prdsupport-item>.guarantee{
        background-image: url("guarantee_4@2x.png");
    }
    .prdsupport-item>.invoice{
        background-image: url("invoice_4@2x.png");
    }
    .prdsupport-item> .special{
        background-image: url("special_4@2x.png");
    }
    .prdsupport-item>.texts{
        font-size: 12px;
        color: rgb(7,17,27);
        line-height: 16px;
    }
    .prdsupport-item:last-child{
        border:none;
    }
    .pics{
        padding: 18px;
    }
    .picsTitle{
        margin-bottom: 12px;
        line-height: 14px;
        color: rgb(7,17,27);
        font-size: 14px;
    }
    .pic-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap
    }
    .pic-list{
        font-size: 0;
    }
    .pic-item{
        display: inline-block;
        margin-right: 6px;
        width: 120px;
        height: 90px;
    }
    .pic-item:last-child{
        margin: 0px;
    }
    .information{
        padding: 18px 18px 0 18px;
    }
    .sellersTitle{
        padding-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        border-bottom:1px solid rgba(7,17,27,0.1);
        color: rgb(7,17,27)
    }
    .infor-item{
        padding: 16px 12px;
        line-height: 16px;
        border-bottom:1px solid rgba(7,17,27,0.1);
        color: rgb(7,17,27);
        font-size: 12px;
    }
    .infor-item:last-child{
        border: none;
    }
    .favorite{
        position: absolute;
        right: 11px;
        text-align: center;
        width: 50px;
        top:18px;
    }
    .icon-favorite{
        display: block;
        color:#d4d6d9;
        margin-bottom: 4px;
        font-size: 24px;
        line-height: 24px;
    }
    .prdactive{
        color: rgb(240,20,20)
    }
    .icon-text{
        line-height: 10px;
        font-size: 14px;
        color: rgb(77,85,93)
    }
    </style> 
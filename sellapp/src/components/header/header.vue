<template>
    <div class="header">
        <div class="content-wrapper">
            <div class="avatar">
                <img class="titleImage" width="64px" :src="seller.avatar">
            </div>
            <div class="content">
                <div class="title">
                   <span class="brand"></span>  
                   <span class="name">{{seller.name}}</span> 
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="support-count" v-if="seller.supports" @click="showDetail">
                <span class="count">{{seller.supports.length}}个</span>
                <span class="keyboard_arrow_right">></span>
            </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
            <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
            <span class="prdDescript">></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <div v-show="detailShow" class="detail">
            <div class="detail-wrapper clearfix">
                <div class="detail-main">
                    <h1 class="name">{{seller.name}}</h1>
                    <div class="star-wrapper">
                      <star :size="48" :score="seller.score"></star>
                    </div>
                    <div class="title">
                         <div class="line"></div>
                         <div class="textInfo">优惠信息</div>
                         <div class="line"></div>
                    </div>
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="(item,index) in seller.supports">
                            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                            <span class="text">{{seller.supports[index].description}}</span>
                        </li>
                    </ul>
                    <div class="title">
                         <div class="line"></div>
                         <div class="textInfo">商家公告</div>
                         <div class="line"></div>
                    </div>
                    <div class="bulletin">
                         <p class="contents">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div class="detail-close" @click="hideDetail">
                <span>x</span>
            </div>
        </div>
    </div>
</template>

<script>
     import star from "../../components/star/star"
     export default{
         props:{
             seller:{
                 type:Object
             }
         },
         data(){
             return{
                 detailShow:false,
             }
         },
         methods:{
            showDetail(){
                this.detailShow=true;
            },
            hideDetail(){
                this.detailShow=false;
            }
         },
         created(){
             this.classMap=['decrease','discount','special','invoice','guarantee']
         },
         components:{
             star
         }
     }
     
</script>
 
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
    .header{
        position: relative;
        overflow: hidden;
        color: #fff;
        background: rgba(7,17,27,0.5);
    }
    .content-wrapper{
       position: relative;
       padding: 24px 12px 18px 24px;
       font-size: 0px;
    }
    .avatar{
        display: inline-block;
        vertical-align: top;
    }
    .titleImage{
            border-radius:2px;
    }
    .content{
        display: inline-block;
        font-size: 14px;
        margin-left: 16px;
    }
    .content>.title{
       margin: 2px 0 8px 0;
    }
    .brand{
       display: inline-block; 
       vertical-align: top;
       width: 30px;
       height:18px;
       background-image: url("brand@2x.png");
       background-size: 30px 18px;
       background-repeat: no-repeat;
    } 
    .name{
        margin-left: 6px;
        font-size: 16px;
        line-height: 18px;
        font-weight: bold;
    }
    .description{
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
        
    }
    @media(-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3){
        .name{
              background-image: url("brand@3x.png");
            };
    }
    .support>.icon{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height:12px;
        margin-right: 4px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
    }
    .support>.decrease{
        background-image: url("decrease_1@2x.png");
    }
    .support>.discount{
        background-image: url("discount_1@2x.png");
    }
    .support>.guarantee{
        background-image: url("guarantee_1@2x.png");
    }
    .support>.invoice{
        background-image: url("invoice_1@2x.png");
    }
   .support> .special{
        background-image: url("special_1@2x.png");
    }
    .support>.text{
        font-size: 12px;
        line-height: 12px;
    }
    .support-count{
        position: absolute;
        right: 12px;
        bottom: 12px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0,0,0,0.2);
        text-align: center;
    }
    .count{
        vertical-align: top;
        font-size: 10px;
    }
    .keyboard_arrow_right{
        margin-left: 6px;
        font-size: 6px;
    }
    .prdDescript{
       position: absolute;
       right: 12px;
       font-size: 10px; 
    }
    .bulletin-wrapper{
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgba(7,17,27,0.2);
    }
    .bulletin-title{
        display: inline-block;
        vertical-align: top;
        margin-top: 8px;
        width: 22px;
        height: 12px;
        background-image: url("bulletin@2x.png");
        background-repeat: no-repeat;
        background-size: 22px 12px;
    }
    .bulletin-text{
        font-size: 10px;
        margin: 0 4px;
        vertical-align: top;
    }
    .background{
        position: absolute;
        top:0px;
        left: 0px;
        width: 100%;
        height: 100px;
        z-index: -1;
        filter: blur(10px); 
    }
    .detail{
        position: fixed;
        z-index: 100;
        width: 100%;
        top: 0px;
        left: 0px;
        height: 100%;
        overflow: auto;
        -webkit-backdrop-filter: blur(10px);
        /*transition: all 0.5s;*/
        background: rgba(7,17,27,0.8);
    }
    .clearfix{
        display: inline-block;
    }
    .clearfix::after{
        display: block;
        content: ".";
        height: 0px;
        line-height: 0px;
        clear: both;
        visibility: hidden;
    }
    .detail-wrapper{
        width: 100%;
        min-height: 100%;
    }
    .detail-main{
        margin-top: 64px;
        padding-bottom: 64px;
    }
    .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
    }
    .name{
        line-height: 16px;
        font-size: 16px;
        text-align: center;
        font-weight: 700px;
    }
    .star-wrapper{
        margin-top: 18px;
        padding: 2px 0px;
        text-align: center;
    }
    .detail-main>.title{
       width: 80%;
       margin: 28px auto 24px auto;
       display: flex;
    }
    .line{
        flex: 1;
        position: relative;
        top:-6px;
        border-bottom: 1px solid rgba(255,255,255,0.2)
    }
    .textInfo{
        padding: 0 12px;
        font-weight: 700px;
        font-size: 14px;
    }
    .supports{
        width: 80%;
        margin: 0px auto;
    }
    .supports :last-child{
        margin-bottom: 0px;
    }
    .support-item{
        padding: 0px 12px;
        margin-bottom: 12px;
        font-size: 0px;
    }
    .support-item>.icon{
        display: inline-block;
        width: 16px;
        height: 16px;
        vertical-align: top;
        margin-right: 6px;
        background-size: 16px 16px;
        background-repeat: no-repeat;
    }
    .support-item>.decrease{
        background-image: url("decrease_2@2x.png");
    }
    .support-item>.discount{
        background-image: url("discount_2@2x.png");
    }
    .support-item>.guarantee{
        background-image: url("guarantee_2@2x.png");
    }
    .support-item>.invoice{
        background-image: url("invoice_2@2x.png");
    }
    .support-item>.special{
        background-image: url("special_2@2x.png");
    }
    .support-item>.text{
        font-size: 12px;
        line-height: 16px;
        /*font-weight: 700px;*/
    }
    .bulletin{
       width: 80%;
       margin: 0 auto;
    }
    .contents{
        padding: 0px 12px;
        line-height: 24px;
        font-size: 12px;
    }
</style> 
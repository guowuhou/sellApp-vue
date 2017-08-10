<template>
  <div>  
    <div class="shopcart">
        <div class="prdcontent" @click="toggleList">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <span class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></span>
                    </div>
                     <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="prdprice" :class="{'pricehighlight':totalPrice>0}">¥{{totalPrice}}元</div>
                <div class="describe">另需配送费元¥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right" @click.stop.prevent="paygoods">
                <div class="prdpay" :class='payClass'> 
                    {{payDesc}}
                </div>
            </div>
        </div>
        <!--<transition name="foldflag">-->
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h1 class="title2">购物车</h1>
                <span class="empty2" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul>
                    <li class="cartfood" v-for="food in selectFoods">
                        <span class="name2">{{food.name}}</span>
                        <div class="price2">
                            <span>¥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper2">
                            <cartcontrol :food="food"></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--</transition>-->
    </div>
    <div class="list-mask" @click="listhide" v-show="listShow"></div> 
  </div>  
</template>

<script>
import BScroll from 'better-scroll';
import cartcontrol from '../cartcontrol/cartcontrol';
     export default{
         props:{
             selectFoods:{
                 type:Array,
                 default(){
                     return [
                         {price:25,
                          count:2
                        }
                     ];
                 }
             },
             deliveryPrice:{
                 type:Number,
                 default:0,
             },
             minPrice:{
                 type:Number,
                 default:0,
             }
         },
         data(){
             return{
                 fold:true
             };
         },
         computed:{
             totalPrice(){
                 let total=0;
                 this.selectFoods.forEach((food)=>{
                     total+=food.price * food.count;
                 });
                 return total
             },
             totalCount(){
                 let count=0;
                 this.selectFoods.forEach((food)=>{
                     count+=food.count;
                 });
                 return count;
             },
             payDesc(){
                 if(this.totalPrice===0){
                     return `¥${this.minPrice}元起送`;
                 }else if(this.totalPrice<this.minPrice){
                     let diff=this.minPrice-this.totalPrice;
                     return `还差¥${diff}元起送`
                 }else{
                     return '去结算'
                 }
             },
             payClass(){
                 if(this.totalPrice<this.minPrice){
                     return 'not-enough';
                 }else{
                     return 'enough';
                 }
             },
             listShow(){
                 if(!this.totalCount>0){
                     this.fold=true;
                     return false;
                 }
                 let show=!this.fold;
                 if(show){
                     this.$nextTick(()=>{
                         if(!this.scroll){
                              this.scroll=new BScroll(this.$refs.listContent,{
                             click:true});
                         }else{
                             this.scroll.refresh();
                         }
                     })
                 }
                 return show;
             }
         },
         methods:{
             toggleList(){
                 if(!this.totalCount){
                     return;
                 }
                 this.fold=!this.fold;
             },
             empty(){
                 this.selectFoods.forEach((food)=>{
                     food.count=0;
                 })
             },
             listhide(){
                 this.fold=true;
             },
             paygoods(){
                 if(this.totalPrice<this.minPrice){
                     return;
                 }
                 window.alert( `支付${this.totalPrice}元`);
             }
         },
         components:{
             cartcontrol
         }
     };
</script>
 
<style>
  @import "../../common/sell-icon/style.css";
    .shopcart{
        position:fixed;
        left: 0px;
        bottom: 0px;
        z-index: 50;
        width: 100%;
        height: 48px;
        background: #000;
    }
    .prdcontent{
        display: flex;
        background: #141d27;
        font-size: 0px;
    }
    .content-left{
        flex: 1;
    }
    .content-right{
        flex: 0 0 105px;
        width: 105px

    }
    .logo-wrapper{
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0px 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;
    }
    .logo{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background:#2b343c;
        text-align: center
    }
    .prdprice{
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin-top: 12px;
        box-sizing: border-box;
        padding-right: 12px;
        border-right: 1px solid rgba(255,255,255,0.1);
        font-size: 16px;
        font-weight: 700px;
        color: rgba(255,255,255,0.4)
    }
    .describe{
        display: inline-block;
        vertical-align: top;
        line-height: 24px;
        margin: 12px 0 0 12px;
        font-size: 10px;
        color: rgba(255,255,255,0.4);
    }
    .icon-shopping_cart{
        font-size: 24px;
        color: #80858a;
        line-height: 44px;
    }
    .prdpay{
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        color: rgba(255,255,255,0.4);
        font-weight: 700px;
        background: #2b333b;
    }
    .num{
        position: absolute;
        top:0px;
        right: 0px;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 6px;
        font-weight: 700px;
        font-size: 9px;
        color:#fff ;
        background: rgb(240,20,20);
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.4)
    }
    .highlight{
        background: rgb(0,160,220);
        color: #fff;
    }
    .pricehighlight{
        color: #fff;
    }
    .not-enough{
        background: #2b233b;
    }
    .enough{
        background: #00b43c;
        color: #fff;
    }
    .shopcart-list{
        position: absolute;
        bottom:48px;
        max-height: 247px;
        z-index: -1;
        left:0;
        width: 100%;
    }
    .list-header{
        height: 40px;
        line-height: 40px;
        padding: 0 12px;
        background: #f3f5f7;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .title2{
        float: left;
        font-size: 14px;
        color: rgb(7,17,27);
        padding-left: 8px;
    }
    .empty2{
        float: right;
        font-size: 14px;
        color: rgb(0,160,220);
        padding-right: 8px;
    }
    .list-content{
        padding: 0 18px;
        max-height: 217px;
        background: #fff;
        overflow: hidden;
    }
    .cartfood{
        position: relative;
        padding: 12px 0px;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(7,17,27,0.1);
    }
    .name2{
        line-height: 24px;
        font-size: 14px;
        color: rgb(7,17,27)
    }
    .price2{
        position: absolute;
        right: 90px;
        bottom: 12px;
        line-height: 24px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(240,20,20);
        -webkit-backdrop-filter: blur(10px)
    }
    .cartcontrol-wrapper2{
        position: absolute;
        right: 0;
        bottom: 6px;
    }
    .list-mask{
        position: fixed;
        left: 0px;
        bottom: 0px;
        z-index: 40;
        width: 100%;
        height: 100%;
        opacity: 1;
        background: rgba(7,17,27,0.8);
    }
    .foldflag-enter-active,.foldflag-leave-active {
            /*transition: all 5s;*/
            /*transform: translate3d(0,0,0)*/
    };
    .foldflag-enter,.foldflag-leave-active{
        /*transform: translate3d(0,0,0);*/
        /*opacity: 1;*/
        /*transform: translate3d(0,-100%,0)*/
    }
</style> 
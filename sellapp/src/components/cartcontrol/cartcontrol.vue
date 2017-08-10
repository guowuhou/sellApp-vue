<template>
    <div class="cartcontrol">
       <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart" transition="move">
           <span class="inner icon-remove_circle_outline"></span>
       </div>
       <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
       <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script>
   import Vue from 'vue';
     export default{
         props:{
             food:{
                 type:Object
             }
         },
         created(){
            //  console.log(this.food)
         },
         methods:{
             addCart(event){
                 if(!event._constructed){
                     return;
                 }
                 if(!this.food.count){
                     Vue.set(this.food,'count',1);
                 }else{
                     this.food.count++;
                 }
             },
             decreaseCart(eve){
                 if(!eve._constructed){
                     return;
                 }
                 if(this.food.count>=1){
                     this.food.count--;
                 }
             }
         }
     };
</script>
 
<style>
@import "../../common/sell-icon/style.css";
    .cartcontrol{
        font-size: 0px;

    }
    .cart-decrease{
        display: inline-block;
        padding: 6px;
        transition: all 0.4s linear;

    }
    .move-transition{
        opacity: 1;
        transform: translate3d(0,0,0)
    }
    .move-enter-active,.move-leave-active{
        opacity: 0;
        transform: translate3d(24,0,0);

    }
    .inner{
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        color: rgb(0,160,220);
        transition: all 0.4s linear;
        /*transform: rotate(0)*/
    }
    .cart-count{
        display: inline-block;
        vertical-align: top;
        width: 12px;
        padding-top: 6px;
        line-height: 24px;
        text-align: center;
        font-size: 10px;
        color: rgb(147,153,159)

    }
    .cart-add{
        display: inline-block;
        font-size: 24px;
        line-height: 24px;
        padding: 6px;
        color: rgb(0,160,220)
    }
</style> 
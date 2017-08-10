<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
                    <span class="text1 border-1px" >
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>     
        </div>
        <div class="foods-wrapper" ref="foodsWrapper"> 
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title1">{{item.name}}</h1>
                    <ul>
                        <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
                            <div class="icon">
                                <img height="57px" width="57px" :src="food.icon">
                            </div>
                            <div class="content1">
                                <h2 class="name1">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                   <span class="count1">月售{{food.sellCount}}份</span>
                                   <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="now">¥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :selectFoods='selectFoods' :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
        <food :food="selectedFood" ref="food"></food> 
    </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart';
import cartcontrol from '../cartcontrol/cartcontrol';
import food from '../food/food'
const ERR_OK=0;
     export default{
         props:{
             seller:{
                 type:Object
             }
         },
         data(){
             return{
                 goods:[],
                 listHeight:[],
                 scrollY:0,
                 selectedFood:{}
             };
         },
         computed:{
             currentIndex(){
                 for(let i=0;i<this.listHeight.length;i++){
                     let height1=this.listHeight[i];
                     let height2=this.listHeight[i+1];
                     if(!height2 || (this.scrollY>=height1 && this.scrollY<height2)){
                          return i;
                     }
                 }
                 return 0;
             },
             selectFoods(){
                 let foods=[];
                 this.goods.forEach((good)=>{
                     good.foods.forEach((food)=>{
                         if(food.count>0){
                             foods.push(food);
                         }
                     });
                 });
                 return foods
             }
         },
         created(){
             this.classMap=['decrease','discount','special','invoice','guarantee'];
             this.$http.get('/api/goods').then((response)=>{
                  response=response.body;
                  if(response.errno===ERR_OK){
                      this.goods=response.data;
                      this.$nextTick(() => {//要对原生dom操作时要加上此方法
                           this._initcScroll();
                           this._calculateHeight();
                      });
                  }
             })
         },
         methods:{
             selectMenu(index,event){
                 if(!event._constructed){//用于去掉当页面为pc端时点击菜单而造成的二次点击事件
                     return;
                 }
                 let foodList =this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                 let el=foodList[index];
                 this.foodsScroll.scrollToElement(el,300);
             },
             selectFood(food,event){
                if(!event._constructed){//用于去掉当页面为pc端时点击菜单而造成的二次点击事件
                     return;
                 }
                 this.selectedFood=food;
                 this.$refs.food.show();
             },
             _initcScroll(){
                 this.menuScroll=new BScroll(this.$refs.menuWrapper,{click:true});
                //  console.log(this.menuScroll)
                 this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{click:true,probeType:3});

                 this.foodsScroll.on('scroll',(pos)=>{
                       this.scrollY=Math.abs(Math.round(pos.y));
                 })
            },
            _calculateHeight(){
                 let foodList=this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                 let height = 0;
                 this.listHeight.push(height);
                 for(let i=0;i<foodList.length;i++) {
                     let item =foodList[i];
                     height+=item.clientHeight;
                     this.listHeight.push(height);
                 }  
         }
         },
         components:{
             shopcart,
             cartcontrol,
             food
         }
     };
</script>
 
<style lang="stylus" rel="stylesheet/stylus">
    .goods{
        position: absolute;
        width: 100%;
        top: 174px;
        bottom: 46px;
        display: flex;
        overflow: hidden
    }
    .goods>.menu-wrapper{
       flex: 0 0 80px;
       width: 80px;
       background: #f3f5f7;
    }
    .goods>.foods-wrapper{
       flex: 1;
    }
    .menu-item{
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 12px;
    }
   .decrease{
        background-image: url("decrease_3@2x.png");
    }
    .discount{
        background-image: url("discount_3@2x.png");
    }
    .special{
        background-image: url("special_3@2x.png");
    }
    .invoice{
        background-image: url("invoice_3@2x.png");
    }
    .guarantee{
        background-image: url("guarantee_3@2x.png");
    }
    .text1>.icon{
        display: inline-block;
        width: 12px;
        height: 12px;
        vertical-align: top;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
    }
    .text1{
        font-size: 12px;
        display: table-cell;
        width: 56px;
        border: 1px;
        vertical-align: middle;
    }
    .title1{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147,153,159);
        background: #f3f5f7;
    }
    .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 12px;
        border: 1px solid rgba(7,17,27,0.1);
    }
     .food-item :last-child{
        margin-bottom: 0px;
        border: 0px;
    }
    .food-item>.icon{
        flex: 0 0 57px;
        margin-right: 10px;

    }
    .food-item>.content1{
        flex: 1;
    }
    .content1>.desc, .extra{
        line-height: 10px;
        font-size: 10px;
        color:rgb(147,153,159)
    }
     .content1>.name1{
         margin: 2px 0px 8px 0px;
         height: 14px;
         line-height: 14px;
         font-size: 14px;
         color: rgb(7,17,27)
     }
    .desc{
        line-height: 12px;
        margin-bottom: 8px;
    }
    .extra>.count1{
        margin-right: 12px;
    }
    .price{
        font-weight: 700px;
        line-height: 24px;
    }
    .price>.now{
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240,20,20);
        float: left;
    }
    .price>.old{
        text-decoration: line-through;
        font-size: 10px;
        color:rgb(147,137,159);
    }
    .current{
        position:relative;
        font-weight: 700px;
        background: #fff;
        z-index: 10;
        margin-top: -1px;
    }
    .current>.text1{
        border:0px 0px 0px 0px;
    }
    .cartcontrol-wrapper{
        float: right;
        right: 0px;
        /*bottom: 12px;*/
    }
</style> 
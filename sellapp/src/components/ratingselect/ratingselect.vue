<template>
    <div class="ratingSelects">
       <div class="ratingTypes">
           <span  @click="selected(2,$event)" class="foodBlock positive" :class="{'active1':selectType===2}">{{desc.all}}<span class="selectedCount">{{ratings.length}}</span></span>
           <span  @click="selected(0,$event)" class="foodBlock positive" :class="{'active2':selectType===0}">{{desc.positive}}<span class="selectedCount">{{positives.length}}</span></span>
           <span  @click="selected(1,$event)" class="foodBlock negative" :class="{'active3':selectType===1}">{{desc.negative}}<span class="selectedCount">{{negatives.length}}</span></span>
       </div>
       <div class="switches" @click="toggleContent" :class="{'on':onlyContent}">
           <span class="icon-check_circle"></span>
           <span class="contentTexts">只看有内容的评价</span>
       </div>
    </div>
</template>

<script>
const POSITIVE=0 ;
const NEGATIVE=1;
const ALL=2;

     export default{
         //用法参照http://blog.csdn.net/take_dream_as_horse/article/details/70786555
         //商品评价 需要定义一个stype，用于操作并解放selectType
         data(){
             return {
                 sType:this.selectType,
                 oContent:this.onlyContent
             }
         },
         props:{
             ratings:{
                 type:Array,
                 default(){
                     return [];
                 }
             },
             //此为父组件向子组件传递过来的数据
             selectType:{
                 type:Number,
                 default:ALL
             },
            //此为父组件向子组件传递过来的数据
             onlyContent:{
                 type:Boolean,
                 default:true
             },
             desc:{
                 type:Object,
                 default(){
                     return {
                         all:"全部",
                         positive:"满意",
                         negative:"不满意"
                     }
                 }
             }
         },
         computed:{
             positives(){
                 return this.ratings.filter((rating)=>{
                      return rating.rateType===POSITIVE;
                 })
             },
             negatives(){
                 return this.ratings.filter((rate)=>{
                     return rate.rateType===NEGATIVE;
                 })
             },
         },
         methods:{
             selected(type,event){
             if(!event._constructed){
                  return;
              };
              //重新赋值
              this.sType=type;
              //事件发射与接收eventHub已经在main文件中定义，$emit为子组件向父组件传递数据
              this.$root.eventHub.$emit('select-type',type);
             },
             toggleContent(event){
               if(!event._constructed){
                  return;
                };
                //重新赋值
                this.oContent=!this.oContent;
               //事件发射与接收eventHub已经在main文件中定义，$emit为子组件向父组件传递数据
                this.$root.eventHub.$emit('only-content',this.oContent);
             }
         }
     };
</script>
 
<style>
@import "../../common/sell-icon/style.css";
  .ratingSelects{
    padding-top: 9px;
  }
  .ratingTypes{
      padding: 18px 0;
      margin: 0 18px;
      border-top:1px solid rgba(7,17,27,0.1);
      border-bottom:1px solid rgba(7,17,27,0.1)
  }
  .foodBlock{
      display: inline-block;
      padding: 8px 12px;
      border-radius: 1px;
      margin-right: 8px;
      color: rgb(77,85,93);
      font-size: 12px;
  }
  .positive{
      background: rgba(0,160,220,0.2)
  }
  .negative{
      background: rgba(77,85,93,0.2)
  }
  .selectedCount{
      font-size: 8px;
      margin-left: 2px;
      line-height: 16px
  }
  .active1,.active2{
      color: #fff;
      background: rgb(0,160,220)
  }
  .active3{
      color: #fff;
      background: rgb(77,85,93)
  }
  .switches{
      padding: 12px 18px;
      line-height: 24px;
      border-bottom: 1px solid rgba(7,17,27,0.1);
      color: rgb(147,153,159);
      margin: 0 18px;
      font-size: 0;
  }
  .icon-check_circle{
      font-size: 24px;
      margin-right: 4px;
      display: inline-block;
      vertical-align: top;
  }
  .contentTexts{
      font-size: 12px;
  }
  /*.on{
      background: green
  }*/
</style> 
<template>
  <div class="app-container">
    <dateRange/> 
    <orderTotal ref="orderTotal"/>
   

    <el-row :gutter="24" class="el-row">
      <el-col :span="12" class="el-card" align="center">
        <div class="grid-content bg-purple">
          <orderArea ref="orderArea"/>
        </div>
      </el-col>
      <el-col :span="12" class="el-card">
         <div class="grid-content bg-purple">
             <categoryPie  ref="categoryPie" />
          </div>
      </el-col>
    </el-row>
 
    <el-row :gutter="24" class="el-row">
      <el-col :span="12" class="el-card" align="center">
        <div class="grid-content bg-purple">
 
         <el-row :gutter="2" class="el-row">

          <el-radio-group v-model="radio1">
 
          <el-radio-button label="订单数"></el-radio-button>
          <el-radio-button label="GMV"></el-radio-button>
          </el-radio-group>
         </el-row>
         <el-row :gutter="20" class="el-row">
             <spuTopNBar v-if="radio1=='订单数'"  ref="spuTopNBar"/>
             <spuGMVTopN v-if="radio1=='GMV'"   ref="spuGMVTopN"/>
           </el-row>
          </div>
      </el-col>
 
      <el-col :span="12" class="el-card">
         <div class="grid-content bg-purple">
          <el-row :gutter="2" class="el-row">

          <el-radio-group v-model="radio2">
 
          <el-radio-button label="订单数"></el-radio-button>
          <el-radio-button label="复购率"></el-radio-button>
          </el-radio-group>
         </el-row>
         <el-row :gutter="20" class="el-row">
             <tmTopNBar v-if="radio2=='订单数'"  ref="tmTopNBar"/>
             <tmRepeatBar v-if="radio2=='复购率'"   ref="tmRepeatBar"/>
           </el-row>
 
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import dateRange from '@/views/statistics/echarts/dateRange'
import orderArea from '@/views/statistics/echarts/order/area'
import categoryPie from '@/views/statistics/echarts/order/categoryPie'
import orderTotal from '@/views/statistics/echarts/order/orderTotal'
import spuTopNBar from '@/views/statistics/echarts/order/spuTopN'
import spuGMVTopN  from '@/views/statistics/echarts/order/spuGMVTopN'
import tmTopNBar from '@/views/statistics/echarts/order/tmTopN'
import tmRepeatBar from '@/views/statistics/echarts/order/tmRepeat'
 

export default {
  // 注册组件
  components: {
   dateRange, orderArea, categoryPie, orderTotal, spuTopNBar,spuGMVTopN,tmTopNBar  ,tmRepeatBar
  },
  data () {
      return {
        radio1:"订单数",
        radio2:"订单数",
        recentDays:7,
        dateRange:"近7日",
        curDate: new Date().toISOString().substring(0, 10) 
      }
  },
  methods:{
      refresh(){
         this.$refs.orderArea.init()
         this.$refs.categoryPie.init()
         this.$refs.orderTotal.init()
         if(this.radio1='订单数'){
             this.$refs.spuTopNBar.init()
         }else{
             this.$refs.spuGMVTopN.init()
         }
         if(this.radio2='订单数'){
             this.$refs.tmTopNBar.init()
         }else{
             this.$refs.tmRepeatBar.init()
         }
        
 
         
      }


  }
}
</script>


<template>
  <div>

   <el-row :gutter="24" class="el-row">  
      <el-col :span="8" class="el-card">
        <div class="grid-content bg-purple"  >
          <div style="font-size:18px;color:grey ">{{dateRange}}订单数  </div>
          <br>
          <div style="font-size:40px;text-align:center" > {{orderCount}}<span style="font-size:20px">笔</span></div> 
        </div>
      </el-col>
      <el-col :span="8" class="el-card">
        <div class="grid-content bg-purple">
          <div style="font-size:18px;color:grey "> {{dateRange}}GMV  </div>
          <br>
          <div style="font-size:40px;text-align:center" >  {{orderAmount}}<span style="font-size:20px">元</span></div> 
        </div>
        
      </el-col>
      <el-col :span="8" class="el-card">
        <div class="grid-content bg-purple">
          <div style="font-size:18px;color:grey ">{{dateRange}}下单人数  </div>
          <br>
          <div style="font-size:40px;text-align:center" >{{orderUser}}<span style="font-size:20px">人</span></div> 
        </div>
      </el-col>
 
       
   </el-row>
   

  </div>
</template>


<script>
import api from '@/api/statistics/api'
export default {
  data() {
    return {
       recentDays:this.$parent.recentDays,
       dateRange: this.$parent.dateRange,
       orderCount:0,
       orderAmount:0.00,
       orderUser:0 
 
    }
  },
 
   mounted() {
   
    this.init()
  } ,
   methods: {
      getParent(){
       this.recentDays=this.$parent.recentDays,
       this.dateRange=this.$parent.dateRange ,
       this.curDate=this.$parent.curDate 
    },

    // 加载banner列表数据
    init() {
      this. getParent()
      api.getOrderTotalData(this.recentDays,this.curDate).then(response => {
       if(response.orderCount){
            this.orderCount = response.orderCount
            this.orderAmount = response.orderAmount
            this.orderUser = response.orderUser
         }
      }).catch( response => {
          console.log('失败'+response)
          // Vue.$message.error('服务器错误，请稍后再试')
          //reject(response)
        })
    } 

 
}
}
</script>


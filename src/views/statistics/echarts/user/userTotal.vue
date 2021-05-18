<template>
  <div>

   <el-row :gutter="1" class="el-row">  
      <el-col :span="4" class="el-card">
        <div class="grid-content bg-purple"  >
          <div style="font-size:18px;color:grey ">累计注册用户数  </div>
          <br>
          <div style="font-size:40px;text-align:center" > {{userTotal}}<span style="font-size:20px">人</span></div> 
        </div>
      </el-col>
      <el-col :span="4" class="el-card">
        <div class="grid-content bg-purple">
          <div style="font-size:18px;color:grey ">累计消费用户数  </div>
          <br>
          <div style="font-size:40px;text-align:center" >  {{orderUserTotal}}<span style="font-size:20px">人</span></div> 
        </div>
        
      </el-col>
      <el-col :span="4" class="el-card">
        <div class="grid-content bg-purple">
          <div style="font-size:18px;color:grey ">{{dateRange}}新增注册用户数  </div>
          <br>
          <div style="font-size:40px;text-align:center" >{{newUserCount}}<span style="font-size:20px">人</span></div> 
        </div>
      </el-col>
       <el-col :span="4" class="el-card">
        <div class="grid-content bg-purple">
          <div style="font-size:18px;color:grey ">{{dateRange}}新增消费用户数  </div>
          <br>
          <div style="font-size:40px;text-align:center" > {{newOrderUserCount}}<span style="font-size:20px">人</span></div> 
        </div>
      </el-col>
       <el-col :span="4" class="el-card">
        <div class="grid-content bg-purple">
          <div style="font-size:18px;color:grey ">{{dateRange}}客单价  </div>
          <br>
          <div style="font-size:40px;text-align:center" > {{pct }}<span style="font-size:20px">元</span></div> 
        </div>
      </el-col>
       <el-col :span="4" class="el-card">
        <div class="grid-content bg-purple">
          <div style="font-size:18px;color:grey ">{{dateRange}}用户流失数  </div>
          <br>
          <div style="font-size:40px;text-align:center" > {{userChurn}}<span style="font-size:20px">人</span></div> 
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
       curDate:this.$parent.curDate,
       userTotal:123123,
       orderUserTotal:4343,
       newUserCount:4341,
       newOrderUserCount:1234,
       pct :991.00
    }
  },
 
   mounted() {
    this.init()
  } ,
   methods: {

     getParent(){
        this.curDate=this.$parent.curDate,
       this.recentDays=this.$parent.recentDays,
       this.dateRange=this.$parent.dateRange 
    },
    init() {
      
       this.getParent() 
      api.getUserTotalData(this.recentDays, this.curDate).then(response => {
      // console.log(" res:"+response)
        this.userTotal = response.userTotal
        this.orderUserTotal = response.orderUserTotal
        this.newUserCount = response.newUserCount
        this.newOrderUserCount = response.newOrderUserCount
        this.pct = response.pct
        this.userChurn=response.userChurn
 
      }).catch( response => {
          console.log('失败'+response)
          // Vue.$message.error('服务器错误，请稍后再试')
          //reject(response)
        })
    } 

 
}
}
</script>


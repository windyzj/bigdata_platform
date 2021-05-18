<template>
  <div>

   <el-row :gutter="24" class="el-row">  
      <el-col :span="8" class="el-card">
        <div class="grid-content bg-purple"  >
          <div style="font-size:18px;color:grey ">{{dateRange}}PV总数  </div>
          <br>
          <div style="font-size:40px;text-align:center" > {{pvCount}}<span style="font-size:20px">次</span></div> 
        </div>
      </el-col>
      <el-col :span="8" class="el-card">
        <div class="grid-content bg-purple">
          <div style="font-size:18px;color:grey ">{{dateRange}} UV总数  </div>
          <br>
          <div style="font-size:40px;text-align:center" >  {{uvCount}}<span style="font-size:20px">人</span></div> 
        </div>
        
      </el-col>
      <el-col :span="8" class="el-card">
        <div class="grid-content bg-purple">
          <div style="font-size:18px;color:grey ">{{dateRange}}新增用户数 </div>
          <br>
          <div style="font-size:40px;text-align:center" >{{newCount}}<span style="font-size:20px">人</span></div> 
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
       curDate: this.$parent.curDate,
       pvCount:0,
       uvCount:0,
       newCount:0 
 
    }
  },
 
   mounted() {
    this.init()
  } ,
   methods: {
      getParent(){
       this.recentDays=this.$parent.recentDays,
       this.dateRange=this.$parent.dateRange ,
      this.curDate= this.$parent.curDate 
    },

    // 加载banner列表数据
    init() {
 
      this.getParent()
      api.getVisitTotalData(this.recentDays,this.curDate).then(response => {
       if(response.pvCount){
 
            this.pvCount = response.pvCount
            this.uvCount = response.uvCount
            this.newCount = response.newCount
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


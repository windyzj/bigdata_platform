<template>
  <div class="app-container">
    <dateRange/> 
    <userTotal ref="userTotal"/>
   

    <el-row :gutter="24" class="el-row">
      <el-col :span="12" class="el-card" align="center">
        <div class="grid-content bg-purple">
          <userPaidPie ref="userPaidPie"/>
        </div>
      </el-col>
      <el-col :span="12" class="el-card">
         <div class="grid-content bg-purple">
 
             <userAction  ref="userAction" />
 
 
          </div>
      </el-col>

       <el-col :span="24" class="el-card">
         <div class="grid-content bg-purple">
             <userRetention  ref="userRetention" />
          </div>
      </el-col>
    </el-row>
 

  </div>
</template>

<script>
import dateRange from '@/views/statistics/echarts/dateRange'
import userPaidPie from '@/views/statistics/echarts/user/userPaid'
import userAction from '@/views/statistics/echarts/user/userAction'
import userTotal from '@/views/statistics/echarts/user/userTotal'
import userRetention from '@/views/statistics/echarts/user/userRetention'
 

export default {
  // 注册组件
  components: {
    dateRange,userPaidPie, userAction, userTotal ,userRetention
  },
  data () {
      return {
        curDate: new Date().toISOString().substring(0, 10) ,
        recentDays:7,
        dateRange:"近7日"
      }
  },
  methods:{
    refresh(){
         this.$refs.userTotal.init()
         this.$refs.userPaidPie.init()
         this.$refs.userAction.init()
         this.$refs.userRetention.init()
    }
  }
}
</script>


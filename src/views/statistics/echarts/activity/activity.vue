<template>
  <div class="app-container">
    <datePicker/> 
    <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card" align="center">
        <div class="grid-content bg-purple">
          <activityTable ref="activityTable"/>
        </div>
      </el-col>
    </el-row>
 
    <el-row :gutter="24" class="el-row">
 
      <el-col :span="24" class="el-card" align="center">
         <div class="grid-content bg-purple">
               <couponTable ref="couponTable"/>
          </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import activityTable from '@/views/statistics/echarts/activity/activityTable'
import couponTable from '@/views/statistics/echarts/activity/couponTable'
import datePicker from '@/views/statistics/echarts/datePicker'
 
 

export default {
  // 注册组件
  components: {
   activityTable,couponTable ,datePicker
  },
  data () {
      return {
        curDate: new Date().toISOString().substring(0, 10) 
      }
  },
  methods:{
      refresh(){
        // this.$refs.activityTable.init()
        // this.$refs.couponTable.init()
      }


  }
}
</script>


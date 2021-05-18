<template>
  <div class="app-container">
    <dateRange/> 
    <visitTotal ref="visitTotal"/>

    <el-row :gutter="24" class="el-row">
      <el-col :span="12" class="el-card">
        <div class="grid-content bg-purple">
          <pvLine ref="pvLine"/>
        </div>
      </el-col>
      <el-col :span="12" class="el-card">
        <div class="grid-content bg-purple">
          <uvLine  ref="uvLine"/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="el-row">
      <el-col :span="12" class="el-card" align="center">
        <div class="grid-content bg-purple">
          <nvTable  ref="nvTable"/>
        </div>
      </el-col>
      <el-col :span="12" class="el-card">
         <div class="grid-content bg-purple">
         <el-row :gutter="2" class="el-row">

          <el-radio-group v-model="radio1">
          <!-- <el-radio-button label="访客数"></el-radio-button> -->
          <el-radio-button label="访问量"></el-radio-button>
          <el-radio-button label="跳出率"></el-radio-button>
          </el-radio-group>
         </el-row>
         <el-row :gutter="20" class="el-row">
             <channelPvBar v-if="radio1=='访问量'"  ref="channelPvBar"/>
             <channelBounceBar v-if="radio1=='跳出率'"   ref="channelBounceBar"/>
           </el-row>
          </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card" align="center">
        <div class="grid-content bg-purple">
          <pagePath  ref="pagePath"/>
        </div>
      </el-col>
 
    </el-row>

  </div>
</template>

<script>
import dateRange from '@/views/statistics/echarts/dateRange'
import visitTotal from '@/views/statistics/echarts/visit/visitTotal'
import pvLine from '@/views/statistics/echarts/visit/pv'
import uvLine from '@/views/statistics/echarts/visit/uv'
import nvTable from '@/views/statistics/echarts/visit/nv'
import channelPvBar from '@/views/statistics/echarts/visit/channelPv'
import channelBounceBar from '@/views/statistics/echarts/visit/channelBounce'
import pagePath from '@/views/statistics/echarts/visit/pagePath'
//import channelBounceBar from '@/views/statistics/echarts/visit/channelBounce'
 

export default {
  // 注册组件
  components: {
    pvLine, uvLine, nvTable, channelPvBar,channelBounceBar,   visitTotal,dateRange,pagePath
  },
  data () {
      return {
        curDate: new Date().toISOString().substring(0, 10) ,
        radio1:"访问量",
        recentDays:7,
        dateRange:"近7日"
      }
  },
  methods:{
    refresh(){
         this.$refs.pvLine.init()
         this.$refs.uvLine.init()
         this.$refs.nvTable.init()
         if(this.radio1=="访问量"){
            this.$refs.channelPvBar.init()
         }else{
           this.$refs.channelBounceBar.init()
         }
          this.$refs.pagePath.init()
         this.$refs.visitTotal.init()
    }
  }
}
</script>


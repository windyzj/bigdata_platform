<template>
  <div>

    <el-table   border
      :data="tableData"
      style="width: 80%;font-size: 16px"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"  >
      <el-table-column
        prop="field"
        :label="dateRange"
        width="300">
      </el-table-column> 
      <el-table-column
        prop="old"
        label="老访客"
        width="230">
      </el-table-column>
      <el-table-column
        prop="new"
        label="新访客"   >
      </el-table-column>
    </el-table>

  </div>
</template>


<script>
import api from '@/api/statistics/api'
export default {
  data() {
    return {
      recentDays:this.$parent.$parent.$parent.recentDays,
      dateRange: this.$parent.$parent.$parent.dateRange,
      tableData: [{
        field: '浏览量',
        old: 310,
        new: 32
      }, {
        field: '访客数',
        old: 33,
        new: 32
      }, {
        field: '跳出率（%）',
        old: 20.7,
        new: 30.1
      }, {
        field: '平均访问时长',
        old: 341,
        new: 433
      }, {
        field: '平均访问页面数',
        old: 123,
        new: 433
      }]
    }
  },
 
   mounted() {
    this.init()
  } ,
   methods: {

     getParent(){
       this.recentDays=this.$parent.$parent.$parent.recentDays,
       this.dateRange=this.$parent.$parent.$parent.dateRange,
       this.curDate=this.$parent.$parent.$parent.curDate 
    },
 
    init() {
      this.getParent()
      api.getNewVisitStats(this.recentDays,this.curDate).then(response => {
       console.log("nv:res"+response)
        this.tableData = response
 
      }).catch( response => {
          console.log('失败'+response)
          // Vue.$message.error('服务器错误，请稍后再试')
          //reject(response)
        })
    } 

 
}
}
</script>


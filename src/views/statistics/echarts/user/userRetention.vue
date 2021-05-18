<template>
  <div>
        <el-row :gutter="24" class="el-row">
         <span style="font-size:20px; font-weight: bold"> 留存率</span>
        </el-row>
    <el-row :gutter="24" class="el-row">
    <el-table   border
      :data="tableData"
      style="width: 100%;font-size: 15px"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"  
      :cell-style="getCellClass">
      <el-table-column
        prop="create_date"
        label="用户新增时间"
        width="300">
      </el-table-column> 
      <el-table-column
        prop="new_user_count"
        label="新增用户"
        width="230"  >
      </el-table-column>
      <el-table-column
        prop="retention_rate_d1"
        label="1天后"  :formatter="formatRate1" >
      </el-table-column>
      <el-table-column
        prop="retention_rate_d2"
        label="2天后"    :formatter="formatRate2">
      </el-table-column>
      <el-table-column
        prop="retention_rate_d3"
        label="3天后"    :formatter="formatRate3">
      </el-table-column>
      <el-table-column
        prop="retention_rate_d4"
        label="4天后"   :formatter="formatRate4" >
      </el-table-column>
      <el-table-column
        prop="retention_rate_d5"
        label="5天后"    :formatter="formatRate5">
      </el-table-column>
     <el-table-column
        prop="retention_rate_d6"
        label="6天后"    :formatter="formatRate6">
      </el-table-column>
      <el-table-column
        prop="retention_rate_d7"
        label="7天后"   :formatter="formatRate7" >
      </el-table-column>
    </el-table>
    </el-row>
  </div>
</template>


<script>
import api from '@/api/statistics/api'
export default {
  data() {
    return {
      curDate:this.$parent.$parent.$parent.curDate,
      recentDays:this.$parent.$parent.$parent.recentDays,
      dateRange: this.$parent.$parent.$parent.dateRange,
      tableData: [{
        create_date: '2021-03-06',
        new_user_count: 310,
        retention_rate_d1: 10.1,
        retention_rate_d2: 10.1,
        retention_rate_d3: 10.5,
        retention_rate_d4: 4.1,
        retention_rate_d5: 14.0,
        retention_rate_d6: 3.1,
        retention_rate_d7: 6.1
      } ]
    }
  },
 
   mounted() {
    this.init()
  } ,
   methods: {

     getCellClass({row, column, rowIndex, columnIndex}){
       
       
        if(rowIndex>=0&&rowIndex<=6&&columnIndex>=2&&columnIndex <=8-rowIndex ){
          return  {background:'#66B3FF',color:'#ffffff'} 
        }
     },

     getParent(){
       this.recentDays=this.$parent.$parent.$parent.recentDays,
       this.dateRange=this.$parent.$parent.$parent.dateRange,
       this.curDate=this.$parent.$parent.$parent.curDate 
    },
 
    init() {
      this.getParent()
      api.getUserRetention( this.curDate).then(response => {
       console.log("retention:"+response)
        this.tableData = response
 
      }).catch( response => {
          console.log('失败'+response)
          // Vue.$message.error('服务器错误，请稍后再试')
          //reject(response)
        })
    } ,
     formatRate1(row,col,value,rowindex){ 
           return parseFloat(value).toFixed(2) +"%"
     } ,
      formatRate2(row,col,value,rowindex){ 
           if(rowindex<6){
              return parseFloat(value).toFixed(2) +"%"
           }else{
             return ''
           }  
     } ,
      formatRate3(row,col,value,rowindex){ 
           if(rowindex<5){
              return parseFloat(value).toFixed(2) +"%"
           }else{
             return ''
           }  
     } ,
      formatRate4(row,col,value,rowindex){ 
           if(rowindex<4){
              return parseFloat(value).toFixed(2) +"%"
           }else{
             return ''
           }  
     } ,
     formatRate5(row,col,value,rowindex){ 
           if(rowindex<3){
              return parseFloat(value).toFixed(2) +"%"
           }else{
             return ''
           }  
     } ,
     formatRate6(row,col,value,rowindex){ 
           if(rowindex<2){
              return parseFloat(value).toFixed(2) +"%"
           }else{
             return ''
           }  
     } ,
      formatRate7(row,col,value,rowindex){ 
           if(rowindex<1){
              return parseFloat(value).toFixed(2) +"%"
           }else{
             return ''
           }  
     } ,

 
}
}
</script>


<template>
  <div>
        <el-row :gutter="24" class="el-row">
 
        
        <el-form :inline="true"   class="demo-form-inline">
          <el-form-item label="活动名称">
            <el-input v-model="name" placeholder="活动名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="init">查询</el-button>
          </el-form-item>
       </el-form>
            
        </el-row>
 
    <el-table  
        height="250"
      :data="tableData"
      style="width: 100%;font-size: 15px"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"  
      >
      <el-table-column
        prop="activity_id"
        label="活动ID"
        width="100">
      </el-table-column> 
      <el-table-column
        prop="activity_name"
        label="活动名称"
        width="230">
      </el-table-column>
      <el-table-column
        prop="order_count"
        label="参与活动订单数"   >
      </el-table-column>
      <el-table-column
        prop="order_final_amount"
        label="参与活动订单金额(减免后)"   :formatter="formatAmount" >
      </el-table-column>
      <el-table-column
        prop="reduce_amount"
        label="优惠金额" width="130"   :formatter="formatAmount">
      </el-table-column>
      <el-table-column
        prop="reduce_rate"
        label="补贴率(%)"  width="130"  :formatter="formatRate">
      </el-table-column>
     <el-table-column
        prop="rule_comment"
        label="订单规则占比"   >
      </el-table-column>
      <el-table-column
        prop="spu_comment"
        label="商品占比"   >
        </el-table-column>
       <el-table-column
        prop="tm_comment"
        label="品牌占比"   >
      </el-table-column>
    </el-table>
 
     <el-pagination
      :page-size="pageSize"
      :pager-count="7"
      @current-change="handleCurrentChange"
      :current-page.sync="curPageNo"
      layout="total,prev, pager, next"
      :total="total"  >
    </el-pagination>
 
  </div>
</template>


<script>
import api from '@/api/statistics/api'
export default {
  data() {
    return {
      curDate:this.$parent.$parent.$parent.curDate,
      tableData: [{
      } ],
      name:"",
      total:0,
      pageSize:20,
      curPageNo:1
 
    }
  },
 
 
   methods: {
     getParent(){
       this.curDate=this.$parent.$parent.$parent.curDate 
    },
 
    init() {
      this.getParent()
      this.curPageNo=1
      this.refreshTable()
    } ,
     refreshTable(){
        console.log(`刷新当前页: ${this.curPageNo}`);
        console.log(`刷新当前日期: ${this.curDate}`);
        console.log(`刷新当前关键词: ${this.name}`);
        api.getActivity( this.name,this.curDate,this.curPageNo,this.pageSize).then(response => {
        console.log("retention:"+response)
        this.tableData = response.detail
        this.total=response.total
        }).catch( response => {
          console.log('失败'+response)
          // Vue.$message.error('服务器错误，请稍后再试')
          //reject(response)
        })
 
      },

       handleCurrentChange(val) {
         this.refreshTable()
      },
       formatRate(row,col,value,index){
            return parseFloat(value).toFixed(2) +"%"
 
      },
      formatAmount(row,col,value,index){
            return parseFloat(value).toFixed(2)  
 
      }

 
}
}
</script>


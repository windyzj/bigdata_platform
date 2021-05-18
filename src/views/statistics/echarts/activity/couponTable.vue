<template>
  <div>
        <el-row :gutter="24" class="el-row">
        <span style="font-size:26px; font-weight: bold"> </span>
        
        <el-form :inline="true"   class="demo-form-inline">
          <el-form-item label="优惠券名称">
            <el-input v-model="name" placeholder="优惠券名称"></el-input>
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
        prop="coupon_id"
        label="优惠券ID"
        width="120">
      </el-table-column> 
      <el-table-column
        prop="coupon_name"
        label="优惠券名称"
        width="230">
      </el-table-column>
      <el-table-column
        prop="rule_name"
        label="优惠规则"   width="160" >
      </el-table-column>
      <el-table-column
        prop="get_count"
        label="领取次数"   width="160" >
      </el-table-column>
      <el-table-column
        prop="order_count"
        label="使用(下单)次数" width="230"  >
      </el-table-column>
      <el-table-column
        prop="expire_count"
        label="过期次数"  width="130" >
      </el-table-column>
     <el-table-column
        prop="order_final_amount"
        label="使用优惠券订单金额(减免后)" width="260"   :formatter="formatAmount" >
      </el-table-column>
      <el-table-column
        prop="reduce_amount"
        label="优惠金额"   width="160"  :formatter="formatAmount">
        </el-table-column>
       <el-table-column
        prop="reduce_rate"
        label="补贴率(%)"  width="120" :formatter="formatRate" >
      </el-table-column>
       <el-table-column
        prop="spu_comment"
        label="商品占比"  width="320"  >
      </el-table-column>
        <el-table-column
        prop="tm_comment"
        label="品牌占比"  width="320"  >
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
        api.getCoupon( this.name,this.curDate,this.curPageNo,this.pageSize).then(response => {
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


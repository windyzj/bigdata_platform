<template  >
  <div>

  <el-table
          height="250"
      :data="tableData"
      style="width: 100%;font-size: 15px"
      :header-cell-style="{background:'#eef1f6',color:'#606266'}"  
      >
 
    <el-table-column
      prop="sku_name"
      label="商品名称"
        >
     <template slot-scope="scope">
       <div v-html="scope.row.sku_name"></div>
      </template>
    </el-table-column>
    <el-table-column
      prop="user_age"
      label="年龄"
      width="80">
    </el-table-column>
    <el-table-column
      prop="user_gender"
      label="性别" width="60" >
    </el-table-column>
        <el-table-column
      prop="order_price"
      label="价格" width="150" >
    </el-table-column>
        <el-table-column
      prop="sku_num"
      label="购买个数" width="100" >
    </el-table-column>
     <el-table-column
      prop="total_amount"
      label="下单金额" width="150" >
      </el-table-column>
     <el-table-column
      prop="create_time"
      label="下单时间"   >
    </el-table-column>

  </el-table>
   <el-pagination
      :page-size="pageSize"
      :pager-count="7"
      @current-change="handleCurrentChange"
      :current-page.sync="curPageNo"
      layout="total,prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import api from "@/api/statistics/api";
export default {

  data() {
    return {
      itemName:"",
      date:"",
      pageSize:20,
      curPageNo:1,
      total:0,
      tableData: []
    }
  },
  methods:{
      init(){
          this.curPageNo=1
          this.date= this.$parent.$parent.$parent.date
          this.itemName= this.$parent.$parent.$parent.itemName
          this.refreshTable()
      },

      refreshTable(){
        console.log(`刷新当前页: ${this.curPageNo}`);
        console.log(`刷新当前日期: ${this.date}`);
        console.log(`刷新当前商品关键词: ${this.itemName}`);
        api.getDetailStatsByItem(this.date,this.itemName,this.curPageNo,this.pageSize)
        .then((response) => {
          this.tableData = response.detail
          this.total=response.total
 
        })
        .catch((response) => {
          console.log("失败" + response) 
        }) 

      },

       handleCurrentChange(val) {
         this.refreshTable()
      }
  }
}
</script>

<style>
  em {
      font-style: normal;
     color: red;
  }
</style>
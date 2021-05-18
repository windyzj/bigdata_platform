<template>
  <div>
    <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card">
        <div class="grid-content bg-purple">
 
            <el-col :span="6">
        <el-form :inline="true" class="demo-form-inline "    > 
           <el-form-item label=" 当前日期" >
              <el-date-picker
                v-model="curDate"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                @change="dateChange()"
              >
              </el-date-picker>
            </el-form-item>
           </el-form>
            </el-col>
        </div>
  
           
 
      </el-col>
    </el-row>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dateRange: "近7日",
      recentDays: 7,
      curDate: new Date().toISOString().substring(0, 10) 
    };
  },

  mounted() {
    this.setParent();
  },
  methods: {
    // 加载banner列表数据
    setParent() {
      this.$parent.curDate = this.curDate;
      this.$parent.recentDays = this.recentDays;
      this.$parent.dateRange = this.dateRange;
    },
   dateChange(){
      this.setParent();
      this.$parent.refresh();
   },


    radioChange() {
     // debugger
      if (this.dateRange == "近30日") {
        this.recentDays = 30;
      } else if (this.dateRange == "近7日") {
        this.recentDays = 7;
      } else if (this.dateRange == "昨日") {
        this.recentDays = 1;
      }
      this.setParent();
      this.$parent.refresh();
    } 
  } 
};
</script>

<style>
 
</style>
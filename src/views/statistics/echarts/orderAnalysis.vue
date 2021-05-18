<template>
  <div class="app-container">
    <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card">
 
        <div class="grid-content bg-purple">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="当前日期">
              <el-date-picker
                v-model="date"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
            <el-form-item label="商品关键词">
              <el-input placeholder="请输入内容" v-model="itemName">
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
              </el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item> -->
          </el-form>
        </div>
     </el-col>  
    </el-row>

    <el-row :gutter="24" class="el-row">
      <el-col :span="12" class="el-card" align="center">
        <div class="grid-content bg-purple">
         <userGender ref="userGender"/>
        </div>
      </el-col>
      <el-col :span="12" class="el-card">
        <div class="grid-content bg-purple">
           <userAge  ref="userAge" />  
        </div>
      </el-col>
    </el-row>
        <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card" align="center">
        <div class="grid-content bg-purple">
         <detail ref="detail"/>
        </div>
      </el-col>
       
    </el-row>

  </div>
</template>

<script>
   import userAge from '@/views/statistics/echarts/orderAnalysis/userAge'
  import userGender from '@/views/statistics/echarts/orderAnalysis/userGender'
  import detail from '@/views/statistics/echarts/orderAnalysis/detail'
 

export default {
  // 注册组件
  components: {
     userGender ,detail , userAge 
  },
  data() {
    return {
      itemName: "",
      date: new Date().toISOString().substring(0, 10),
    };
  },
  methods: {
    search() {
           this.$refs.userAge.init()
          this.$refs.userGender.init()
          this.$refs.detail.init()
    },
  },
};
</script>


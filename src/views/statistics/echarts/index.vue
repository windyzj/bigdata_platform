<template>
  <div class="app-container">

    <el-row :gutter="24" class="el-row">
      <el-col :span="12" class="el-card">
        <div class="grid-content bg-purple">
          <lineComponent/>
        </div>
      </el-col>
      <el-col :span="12" class="el-card">
        <div class="grid-content bg-purple">
          <line2Component/>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="el-row">
      <el-col :span="12" class="el-card">
        <div class="grid-content bg-purple">
          <pieComponent/>
        </div>
      </el-col>
      <el-col :span="12" class="el-card">
        <div class="grid-content bg-purple">
          <tableComponent/>
      </div>
      </el-col>
    </el-row>

    <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card">
        <div class="grid-content bg-purple">
          <tabComponent/>
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import lineComponent from '@/views/statistics/echarts/view/line'
import line2Component from '@/views/statistics/echarts/view/line2'
import pieComponent from '@/views/statistics/echarts/view/pie'
import tableComponent from '@/views/statistics/echarts/view/table'
import tabComponent from '@/views/statistics/echarts/view/tab'

export default {
  // 注册组件
  components: {
    lineComponent, line2Component, pieComponent, tableComponent, tabComponent
  }
}
</script>


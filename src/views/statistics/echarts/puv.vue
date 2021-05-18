<template>
  <div class="app-container">

    <el-row :gutter="24" class="el-row">
      <el-col :span="6" class="el-card">
        <div class="grid-content bg-purple">
          当前在线 {{ second }} 秒之后更新数据
          <div label-width="80px" size="mini" style="margin-top: 60px;text-align:center;">
            <div class="trend-overview-date">2020/09/10 09:07:39</div>
            <div class="trend-overview-number">10</div>
            <div class="trend-overview-date">在线访客数</div>
          </div>
        </div>
      </el-col>
      <el-col :span="18" class="el-card">
        <div class="grid-content bg-purple">
          <div id="chart" ref="chart" class="chart" style="width:100%;height:280px;" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import echarts from 'echarts'
import puvApi from '@/api/statistics/puv'

export default {
  data() {
    return {
      second: 10,
      xData: ['09:00', '09:01', '09:02', '09:03', '09:04', '09:05', '09:06', '09:07', '09:08', '09:09', '09:10', '09:11', '09:12', '09:13', '09:14', '09:15', '09:16', '09:17', '09:18', '09:19', '09:20', '09:21', '09:22', '09:23', '09:24', '09:25', '09:26', '09:27', '09:28', '09:29', '09:30'], // x轴数据
      pvYdata: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210, 230, 210], // y轴数据
      uvYdata: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 330, 310, 330, 310] // y轴数据
    }
  },

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    console.log('list created......')
    this.init()
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    setInterval(() => {
      --this.second
      if (this.second < 1) {
        this.init()
        this.second = 10
      }
    }, 1000)
  },

  methods: {

    // 加载数据
    init() {
      puvApi.getPuvData().then(response => {
        this.xData = response.data.pvXdata
        this.pvYdata = response.data.pvYdata
        this.uvYdata = response.data.uvYdata

        this.setChartData()
      })
    },

    setChartData() {
      var option = {
        title: {
          text: '最近30分钟访问情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['PV', 'UV']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'PV',
            type: 'line',
            smooth: true ,
            stack: '总量1',
            data: this.pvYdata
          },
          {
            name: 'UV',
            type: 'line',
            smooth: true ,
            stack: '总量2',
            data: this.uvYdata
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
<style>
  .trend-overview-date {
    height: 30px;
    line-height:30px;
    font-size: 14px;
    color: #5d5d61;
    font-family: Arial;
  }
  .trend-overview-number {
    height: 40px;
    margin: 10px 0;
    font-size: 42px;
    font-weight: 700;
    color: #323437;
  }
</style>

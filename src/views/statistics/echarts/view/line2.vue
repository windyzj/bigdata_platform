<template>
  <div>
    <div id="chart2" style="width:100%;height:280px;" />
  </div>
</template>

<script>
import echarts from 'echarts'

export default {

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    console.log('list created......')
    // this.init()
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init()
  },

  methods: {

    // 加载banner列表数据
    init() {
      this.setChartData()
    },

    setChartData() {
      const option = {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['邮件营销', '联盟广告']
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量1',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量2',
            data: [220, 32, 191, 234, 290, 330, 310]
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart2'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>


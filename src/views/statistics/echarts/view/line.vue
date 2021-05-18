<template>
  <div>
    <div id="chart1" style="width:100%;height:280px;" />
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
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
        }]
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart1'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>


<template>
  <div>
    <div id="chart3" style="width:100%;height:280px;" />
  </div>
</template>

<script>
import echarts from 'echarts'

export default {

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    console.log('list created......')
    // this.init()fborder
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
      var option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 10,
          data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 335, name: '直接访问' },
              { value: 310, name: '邮件营销' },
              { value: 234, name: '联盟广告' },
              { value: 135, name: '视频广告' },
              { value: 1548, name: '搜索引擎' }
            ]
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart3'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>


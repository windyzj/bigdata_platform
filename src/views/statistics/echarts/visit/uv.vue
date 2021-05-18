<template>
  <div>
    <div id="chartUV" style="width:100%;height:280px;" />
  </div>
</template>

<script>
import echarts from 'echarts'
import api from '@/api/statistics/api'
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

  data () {
    return {
      recentDays:this.$parent.$parent.$parent.recentDays,
      dateRange: this.$parent.$parent.$parent.dateRange,
      curDate :this.$parent.$parent.$parent.curDate ,
      xData:[],
      yData:[]
    }
  },

  methods: {
     getParent(){
       this.recentDays=this.$parent.$parent.$parent.recentDays,
       this.dateRange=this.$parent.$parent.$parent.dateRange ,
       this.curDate = this.$parent.$parent.$parent.curDate 
    },
    init() {
      this.getParent()
      api.getUvData(this.recentDays,this.curDate).then(response => {
 
   
        this.xData = response.xData
        this.yData = response.yData
        console.log("uv xdata:"+this.xData)
        console.log("uv yData:"+this.yData)

        this.setChartData()
      }).catch( response => {
          console.log('失败'+response)
          // Vue.$message.error('服务器错误，请稍后再试')
          //reject(response)
        })
    },

    setChartData() {
      const option = {
        title: {
          text: 'UV',
          subtext:this.dateRange
        },
        xAxis: {
           type: 'category',
          data: this.xData
        },
        yAxis: {
              type: 'value'
        },
        series: [{
          data: this.yData,
          type: 'line'
        }]
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chartUV'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>


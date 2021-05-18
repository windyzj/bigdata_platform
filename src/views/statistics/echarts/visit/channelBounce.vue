<template>
 
 
      <div id="chart4" style="width:100%;height:340px;" />
 
 
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
      recentDays:this.$parent.$parent.$parent.$parent.recentDays,
      dateRange: this.$parent.$parent.$parent.$parent.dateRange,
      curDate: this.$parent.$parent.$parent.$parent.curDate,
      xData:['渠道1',   '渠道2' ,'渠道3' ],
      newYData:[],
      oldYData:[]
    }
  },

  methods: {

     getParent(){
       this.recentDays=this.$parent.$parent.$parent.$parent.recentDays,
       this.dateRange=this.$parent.$parent.$parent.$parent.dateRange ,
       this.curDate= this.$parent.$parent.$parent.$parent.curDate 
    },

    init() {
      this.getParent()
      api.getChannelBounceData(this.recentDays,this.curDate).then(response => {
 
          this.xData = response.xData
          this.newYData = response.yData.new
          this.oldYData = response.yData.old
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
        text: '各个渠道跳出率（%）' ,
          subtext:this.dateRange
    } ,
     tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
     legend: {
        data: ['老访客', '新访客']
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
       
        type: 'category',
        data: this.xData
    },
    series: [{
            name: '老访客',
            type: 'bar',
            data: this.oldYData
        },
        {
            name: '新访客',
            type: 'bar',
            data: this.newYData
        }]
 
};
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart4'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>


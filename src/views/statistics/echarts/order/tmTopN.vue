<template>
 
 
      <div id="tmChart" style="width:100%;height:340px;" />
 
 
</template>


<script>
import echarts from 'echarts'
import api from '@/api/statistics/api'
export default {
 

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init()
  },

  data () {
    return {
      recentDays:this.$parent.$parent.$parent.$parent.recentDays,
      dateRange: this.$parent.$parent.$parent.$parent.dateRange,
      curDate: this.$parent.$parent.$parent.$parent.curDate,
      showNum:7,
      xData:[55,44,21],
      yData:['品牌1','品牌2' ,'品牌3' ],
      max:1000,
      min:1
    }
  },

  methods: {
    getParent(){
       this.recentDays=this.$parent.$parent.$parent.$parent.recentDays,
       this.dateRange=this.$parent.$parent.$parent.$parent.dateRange,
       this.curDate=this.$parent.$parent.$parent.$parent.curDate 
    },
    initData(xData ){
        if( xData&&xData.length>0){
           this.min= xData[0]  
           this.max= xData[xData.length-1] 
        }
    },
    // 加载banner列表数据
    init() {
      this.getParent()
      api.getTmTopNData(this.recentDays,this.showNum,this.curDate).then(response => {
 
          this.xData = response.xData
          this.yData = response.yData
          this.initData(this.xData ) 
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
        text: '热门品牌排行', 
        subtext:this.dateRange
    } ,
    yAxis: {
        type: 'category',
        data: this.yData
    },
    xAxis: {
        type: 'value'
    },
    series: [{
        data: this.xData,
        type: 'bar'
    }], 
      visualMap: {
        orient: 'horizontal',
        left: 'center',
        min: this.min,
        max: this.max,
        text: [this.max, this.min],
        // Map the score column to color
        dimension: 0,
        inRange: {
            color: ['#94AAD6', '#103667']
        }
    }
 
};
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('tmChart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>


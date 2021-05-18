<template>
 
 
      <div id="userPaidChart" style="width:100%;height:500px;" />
 
 
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
      xData:['非消费用户', '消费用户'  ],
      yData:[
                {value: 40, name: '非消费用户'},
                {value: 33, name: '消费用户'} 
            ]
    }
  },

  methods: {

    // 加载banner列表数据
     getParent(){
        this.curDate=this.$parent.$parent.$parent.curDate,
       this.recentDays=this.$parent.$parent.$parent.recentDays,
       this.dateRange=this.$parent.$parent.$parent.dateRange 
    },
    init() {
      this.getParent()
      api.getUserPaidData(this.recentDays,this.curDate).then(response => {
       console.log(response.xData) 
       console.log(response.yData) 
          this.xData = response.xData
          this.yData = response.yData
 
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
        text: '消费用户占比',
        subtext:this.dateRange,
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        left: 'center',
        top: 'bottom',
        data: this.xData
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
            name: '消费用户占比',
            type: 'pie',
            radius: [10, 140],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
                borderRadius: 5
            },
            emphasis: {
                label: {
                    show: false
                }
            },
            data: this.yData
        } 
       
    ]
};
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('userPaidChart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>


<template>
 
 
      <div id="userConversionChart" style="width:100%;height:500px;" />
 
 
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
      curDate:this.$parent.$parent.$parent.curDate,
      xData:['首页', '商品详情','加购物车' ,'订单','支付' ],
      yData:[
                {value: 200, name: '首页'},
                {value: 470, name: '商品详情'},
                {value: 60, name: '加购物车'},
                {value: 43, name: '订单'},
                {value: 33, name: '支付'} 
 
            ]
    }
  },

  methods: {
     getParent(){
        this.curDate=this.$parent.$parent.$parent.curDate,
       this.recentDays=this.$parent.$parent.$parent.recentDays,
       this.dateRange=this.$parent.$parent.$parent.dateRange 
    },
    init() {
      this.getParent()
      api.getUserActionConvertData(this.recentDays,this.curDate).then(response => {
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
        text: '漏斗图',
        subtext: this.dateRange
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    legend: {
        data: this.xData
    },

    series: [
        {
            name:'漏斗图',
            type:'funnel',
            left: '10%',
            top: 60,
            //x2: 80,
            bottom: 60,
            width: '80%',
            // height: {totalHeight} - y - y2,
            min: 0,
            max: 100,
            minSize: '0%',
            maxSize: '100%',
            sort: 'descending',
            gap: 2,
            label: {
                show: true,
                position: 'inside'
            },
            labelLine: {
                length: 10,
                lineStyle: {
                    width: 1,
                    type: 'solid'
                }
            },
            itemStyle: {
                borderColor: '#fff',
                borderWidth: 1
            },
            emphasis: {
                label: {
                    fontSize: 20
                }
            },
            data: this.yData
        }
    ]
};
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('userConversionChart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>


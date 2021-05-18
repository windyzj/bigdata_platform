<template>
  <div>
    <div id="pagePathChart" style="width:100%;height:280px;" />
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
      curDate:this.$parent.$parent.$parent.curDate,
      recentDays:this.$parent.$parent.$parent.recentDays,
      dateRange: this.$parent.$parent.$parent.dateRange,
      nodeData:[{ name: 'a' }, 
         { name: 'b' },
         { name: 'a1' },
         { name: 'a2' }, 
         { name: 'b1' }, 
         { name: 'c' }],
      linksData:[{
            source: 'a',
            target: 'a1',
            value: 5
        }, {
            source: 'a',
            target: 'a2',
            value: 3
        }, {
            source: 'b',
            target: 'b1',
            value: 8
        }, {
            source: 'a',
            target: 'b1',
            value: 3
        }, {
            source: 'b1',
            target: 'a1',
            value: 1
        }, {
            source: 'b1',
            target: 'c',
            value: 2
        }]
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
      api.getPagePathData(this.recentDays,this.curDate).then(response => {
 
        this.nodeData = response.nodeData
        this.linksData = response.linksData
 
        this.setChartData()
      }).catch( response => {
          console.log('失败'+response)
         this.setChartData()
        })
    },

    setChartData() {
      const option = {
       title: {
        text: '页面流向图',
        subtext:this.dateRange 
      },
       series: {
        type: 'sankey',
        layout: 'none',
        emphasis: {
            focus: 'adjacency'
        },
        data: this.nodeData,
        links: this.linksData
    }
};
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('pagePathChart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>


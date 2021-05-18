<template>
  <div id="categoryChart" style="width: 100%; height: 500px" />
</template>


<script>
import echarts from "echarts";
import api from "@/api/statistics/api";
export default {
  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init();
  },

  data() {
    return {
      recentDays: this.$parent.$parent.$parent.recentDays, 
      dateRange: this.$parent.$parent.$parent.dateRange,
      curDate: this.$parent.$parent.$parent.curDate,
      showNum: 7,
      cData: [
        { value: 1048, name: "品类1" },
        { value: 735, name: "品类2" },
        { value: 580, name: "品类3" },
        { value: 484, name: "品类4" },
        { value: 300, name: "其他" },
      ],
    };
  },

  methods: {
     getParent(){
       this.recentDays=this.$parent.$parent.$parent.recentDays,
       this.dateRange=this.$parent.$parent.$parent.dateRange ,
       this.curDate=this.$parent.$parent.$parent.curDate 
    },
    init() {
      this.getParent()
      console.log("categoryPie:"+this.recentDays)
      api.getOrderCategoryData(this.recentDays, this.showNum,this.curDate)
        .then((response) => {
          console.log("category:res:"+response)
          this.cData = response 
          
          this.setChartData() 
        })
        .catch((response) => {
          console.log("失败" + response) 
          // Vue.$message.error('服务器错误，请稍后再试')
          //reject(response)
        }) 
    },
    
    setChartData () {
      const option = {
       title: {
        text: '品类下单分布', 
        subtext:this.dateRange
       } ,
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.cData,
          },
        ],
      };
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("categoryChart"));

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    } 
  } 
};
</script>


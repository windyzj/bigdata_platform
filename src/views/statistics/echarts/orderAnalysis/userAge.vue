<template>
  <div id="ageChart" style="width: 100%; height: 300px" />
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
      itemName: '',
      date:"",
      cData: [
        { value: 1048, name: "20岁以下" },
        { value: 735, name: "20岁至29岁" } ,
        { value: 34, name: "30岁以上" }  
      ],
    };
  },

  methods: {
     getParent(){
       this.date=this.$parent.$parent.$parent.date 
       this.itemName=this.$parent.$parent.$parent.itemName 
    },
    init() {
      this.getParent()
      this.setChartData() 
 
      api.getAgeStatsByItem(this.date,this.itemName)
        .then((response) => {
          console.log(response)
          this.cData = response 
          this.setChartData() 
        })
        .catch((response) => {
          console.log("失败" + response) 
        }) 
    },
    
    setChartData () {
      const option = {
       title: {
        text: '年龄分布', 
        subtext:'' ,
          left: 'center' 
       } ,
 
        tooltip: {
          trigger: "item",
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        }, 
        series: [
          {
            name: "年龄分布",
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
      var myChart = echarts.init(document.getElementById("ageChart"));

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    } 
  } 
};
</script>


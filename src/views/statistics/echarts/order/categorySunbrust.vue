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
      recentDays: 7,
      cData: [
        {
          name: "一级品类1",
          children: [
            {
              name: "二级品类1",
              value: 400,
              children: [
                {
                  name: "三级品类1",
                  value: 100 
                },
                {
                  name: "三级品类2",
                  value: 100 
                },
                {
                  name: "三级品类3",
                  value: 200 
                } 
              ] 
            },
            {
              name: "二级品类2",
              value: 200 ,
              children: [
                {
                  name: "三级品类4",
                  value: 150 
                },
                {
                  name: "三级品类5",
                  value: 50 
                } 
              ],
            },
          ],
        },
        {
          name: "一级品类2",
          children: [
            {
              name: "二级品类5",
              children: [
                {
                  name: "三级品类6",
                  value: 100  
                },
                {
                  name: "三级品类7",
                  value: 300 
                },
              ],
            },
          ],
        },
      ],
    };
  },

  methods: {
    // 加载banner列表数据
    init() {
      this.setChartData();
      // api.getSpuTopNData(this.recentDays)
      //   .then((response) => {
      //     this.xData = response.xData;
      //     this.yData = response.yData;

      //     this.setChartData();
      //   })
      //   .catch((response) => {
      //     console.log("失败" + response);
      //     // Vue.$message.error('服务器错误，请稍后再试')
      //     //reject(response)
      //   });
    },

    setChartData() {
      const option = {
        title: {
          text: "品类下单数分布",
          subtext: "昨日",
          left: "left",
        },
         tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
              var value = (params.value + "").split(".");
              value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
              return  params.name + ": " + value;
            },
          },
        series: {
          type: "sunburst",
          // emphasis: {
          //     focus: 'ancestor'
          // },
          data: this.cData,
          radius: [0, "90%"],
          label: {
            rotate: "radial",
          },
        },
        visualMap: {
          left: "right",
          min: 1,
          max: 1000,
          inRange: {
            color: [
               "#A9A9A9",
              "#6495ED",
              "#4169E1",
              "#483D8B",
              "#191970",
            ],
          },
          text: ["High", "Low"], // 文本，默认为数值文本
          calculable: true,
        },
      };
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("categoryChart"));

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
  },
};
</script>


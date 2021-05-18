<template>
  <div id="mapChart" style="width: 100%; height: 500px" />
</template>


<script>
import echarts from "echarts";
import api from "@/api/statistics/api";
import axios from "axios";
export default {
  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init();
  },

  data() {
    return {
      mapJson: {},
      recentDays: this.$parent.$parent.$parent.recentDays,
      dateRange: this.$parent.$parent.$parent.dateRange,
       curDate: this.$parent.$parent.$parent.curDate,
      areaData: [
                { name: "北京", value: 5000 },
                { name: "山西", value: 34443 } 
              ],
        min:0,
        max:0
    };
  },

  methods: {
    // 加载banner列表数据
    getParent(){
      this.curDate=this.$parent.$parent.$parent.curDate,
       this.recentDays=this.$parent.$parent.$parent.recentDays,
       this.dateRange=this.$parent.$parent.$parent.dateRange 
    },

   initData(areaData ){
        if( areaData&&areaData.length>0){
           this.min= areaData[0]['value']  
           this.max= areaData[areaData.length-1]['value']
           console.log("min:"+this.min)
           console.log("max:"+this.max)
        }
    },

    init() {
        this.getParent()
        console.log("super days:"+ this.recentDays);
        api.getOrderAreaData(this.recentDays,this.curDate).then(response => {

           this.areaData = response 
           this.initData(this.areaData )
           console.log("area:"+response)
          this.setChartData();
      
        }).catch( response => {
            console.log('失败'+response)
            // Vue.$message.error('服务器错误，请稍后再试')
            //reject(response)
          })
   

    },
    setChartData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("mapChart"));

      myChart.showLoading();

      axios.get("/static/china.json").then((response) => {
        this.mapJson = response.data;

        myChart.hideLoading();

        echarts.registerMap("CHN", this.mapJson);
        const option = {
          title: {
            text: "全国下单数分布",
            subtext: this.dateRange,
            left: "left",
          },
          tooltip: {
            trigger: "item",
            showDelay: 0,
            transitionDuration: 0.2,
            formatter: function (params) {
              var value = (params.value + "").split(".");
              value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, "$1,");
              return params.seriesName + "<br/>" + params.name + ": " + value;
            },
          },
          visualMap: {
            left: "right",
            min: this.min,
            max: this.max,
            inRange: {
              color: ["#FACE9C", "#B6292B"],
            },
            text: ["High", "Low"], // 文本，默认为数值文本
            calculable: true,
          },
          toolbox: {
            show: true,
            //orient: 'vertical',
            left: "right",
            top: "top",
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          series: [
            {
              name: "下单数",
              type: "map",
              roam: true,
              map: "CHN",
              emphasis: {
                label: {
                  show: true,
                },
              },
              data: this.areaData,
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      });
    } 
  } 
};
</script>


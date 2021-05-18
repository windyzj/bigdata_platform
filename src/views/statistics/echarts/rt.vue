<template>
  <div class="app-container">
      <el-row :gutter="24" class="el-row">
      <el-col :span="24" class="el-card">
        <div class="grid-content bg-purple">
          <div label-width="30px" size="mini" style=" text-align:left;">
            <div class="trend-overview-date">当前日期</div>
            <el-date-picker
               v-model="today"
               type="date"
               value-format="yyyy-MM-dd"
               placeholder="选择日期">
           </el-date-picker>

          </div>
        </div>
      </el-col>
 
    </el-row>

    <el-row :gutter="24" class="el-row">
      <el-col :span="6" class="el-card">
        <div class="grid-content bg-purple">
          当前在线 {{ second }} 秒之后更新数据
          <div label-width="80px" size="mini" style="margin-top: 60px;text-align:center;">
             <div class="trend-overview-date">今日访客总数</div>
            <div class="trend-overview-number">{{dauTotal}}</div>

          </div>
        </div>
      </el-col>
      <el-col :span="18" class="el-card">
        <div class="grid-content bg-purple">
          <div id="chart" ref="chart" class="chart" style="width:100%;height:280px;" />
        </div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import echarts from 'echarts'
import api from '@/api/statistics/api'

export default {
  data() {
    return {
      today:new Date().toISOString().substring(0,10),
      second: 5,
      dauTotal: 1666,
      hr: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'  ], // x轴数据
      dauTd: [0, 0, 0, 0, 0, 230, 210, 120, 132, 101, 134, 90, 778, 210, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101 ], // y轴数据
      dauYd: [0, 0, 0, 0, 0, 0, 13, 444, 3, 111, 43, 90, 99, 99, 99, 55, 43, 25, 600, 230, 210, 120, 132, 101 ] // y轴数据
    }
  },

  // 生命周期函数：内存准备完毕，页面尚未渲染
  created() {
    console.log('list created......')
    
  },

  // 生命周期函数：内存准备完毕，页面渲染成功
  mounted() {
    this.init()
    setInterval(() => {
      --this.second
      if (this.second < 1) {
        this.init()
        this.second = 5
      }
    }, 1000)
  },

  methods: {

    getHourListData(hourCountJson){
       
 
      let countArr=[]
         
      for (var hrTime of this.hr) {
      
          let ct=  hourCountJson[hrTime]
          if(ct&&ct>0){
            countArr.push(ct)
          }else{
            countArr.push(0)
          }
      }
      return countArr
       
    },

    // 加载数据
    init() {
   
  
     
      api.getDauRealtimeData(this.today).then(response => {
 
          this.dauTotal=response.dauTotal
          this.dauYd =this.getHourListData( response.dauYd)
          this.dauTd =this.getHourListData( response.dauTd)
        
        this.setChartData()
      }).catch( response => {
         this.setChartData()
      })
    },

    setChartData() {
      var option = {
        title: {
          text: '最近当日日活访问情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['今日', '昨日']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: this.hr
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '今日',
            type: 'line',
            smooth: true ,
            stack: '今日日活',
            data: this.dauTd
          },
          {
            name: '昨日',
            type: 'line',
            smooth: true ,
            stack: '昨日日活',
            data: this.dauYd
          }
        ]
      }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('chart'))

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }
  }
}
</script>
<style>
  .trend-overview-date {
    height: 30px;
    line-height:30px;
    font-size: 14px;
    color: #5d5d61;
    font-family: Arial;
  }
  .trend-overview-number {
    height: 40px;
    margin: 10px 0;
    font-size: 42px;
    font-weight: 700;
    color: #323437;
  }
</style>

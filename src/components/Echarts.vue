<template>
  <div id="myEcharts"></div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import 'echarts/lib/chart/bar';

  @Component
  export default class Echarts extends Vue {
    @Prop({required: true}) readonly totalList!: RResult;

    mounted() {
      const ele = document.getElementById('myEcharts');
      const chart: any = this.$echarts.init(ele);
      chart.setOption(this.options, true, false);
    }

    @Watch('totalList')
    onTotalListChanged() {
      if (this.totalList.length === 0) {
        return;
      }
      this.renderEchart();
      const ele = document.getElementById('myEcharts');
      const chart: any = this.$echarts.init(ele);
      chart.setOption(this.options, true, false);
    }

    created() {
      // 这就是 result 数据, 打出来一直是支出的
      const now = new Date();
      const month = (now.getMonth() + 1).toString();
      if ('13578'.indexOf(month) >= 0 || month === '10' || month === '12') {
        console.log('3月');
        this.monthValue.push('29', '30', '31');
        this.allNumber = '0000000000000000000000000000000';
        for (let i = 0; i < this.allNumber.length; i++) {
          this.privateTotalMonthItemsOut.push(0);
        }
      } else if ('469'.indexOf(month) >= 0 || month === '11') {
        this.monthValue.push('29', '30');
        this.allNumber = '000000000000000000000000000000';
        for (let i = 0; i < this.allNumber.length; i++) {
          this.privateTotalMonthItemsOut.push(0);
        }
      } else {
        for (let i = 0; i < this.allNumber.length; i++) {
          this.privateTotalMonthItemsOut.push(0);
        }
      }
      if (this.totalList.length === 0) {
        return;
      }
      this.renderEchart();
    }

    renderEchart() {
      const now = new Date();
      const month = (now.getMonth() + 1).toString();
      if (this.totalList[0].items[0].type === '-') {
        for (let i = 0; i < this.privateTotalMonthItemsOut.length; i++) {
          if (this.privateTotalMonthItemsOut[i] !== 0) {
            this.privateTotalMonthItemsOut[i] = 0;
          }
        }
        for (let i = 0; i < this.totalList.length; i++) {
          const title = this.totalList[i].title;
          let outMonth = title.split('-')[1];
          outMonth = outMonth.indexOf('0') === 0 ? outMonth.slice(-1) : outMonth;
          if (outMonth === month) {
            let outDay = title.split('-')[2];
            outDay = outDay.indexOf('0') === 0 ? outDay.slice(-1) : outDay;
            this.privateTotalMonthItemsOut[(parseInt(outDay) - 1)] = this.totalList[i].total;
          }
        }
      } else if (this.totalList[0].items[0].type === '+') {
        for (let i = 0; i < this.privateTotalMonthItemsOut.length; i++) {
          if (this.privateTotalMonthItemsOut[i] !== 0) {
            this.privateTotalMonthItemsOut[i] = 0;
          }
        }
        for (let i = 0; i < this.totalList.length; i++) {
          const title = this.totalList[i].title;
          let outMonth = title.split('-')[1];
          outMonth = outMonth.indexOf('0') === 0 ? outMonth.slice(-1) : outMonth;
          if (outMonth === month) {
            let outDay = title.split('-')[2];
            outDay = outDay.indexOf('0') === 0 ? outDay.slice(-1) : outDay;
            this.privateTotalMonthItemsOut[(parseInt(outDay) - 1)] = this.totalList[i].total;
          }
        }
      }
    }

    allNumber = '0000000000000000000000000000';
    privateCurrent: number[] = [];
    privateTotalMonthItemsOut: number[] = [];
    monthValue: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28'];
    $echarts: any;
    options = {
      xAxis: {
        boundaryGap: false,
        splitLine: {
          show: false
        },
        type: 'category',
        data: this.monthValue
      },
      yAxis: {
        show: false,
        type: 'value'
      },
      series: [
        {
          data: this.privateTotalMonthItemsOut,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'top',
              }
            }
          },
          areaStyle: {
            shadowColor: 'rgb(30,29,43)',
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0, color: 'rgba(96,102,120,1)' // 0% 处的颜色
              }, {
                offset: 1, color: 'rgba(96,102,120,0.1)' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },
          name: '月份',
          type: 'line',
          stack: '总量',
          // 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
          color: '#212943',
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: function (params: any) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return '';
                }
              },
            }
          },
        }]
    };
  }
</script>

<style lang="scss" scoped>
</style>
<!-- Template Tag can not be merged... -->

<script lang="ts">
import { Component, Prop, Watch, mixins } from 'nuxt-property-decorator'
// import Chart from 'chart.js'
import VueChart from 'vue-chartjs'
// 棒グラフの場合は、Barを使う
// eslint-disable-next-line
const Bar = VueChart.Line

@Component
// mixinsもBarに変更
export default class ChartLine extends mixins(Bar) {
  @Prop() data!: any

  @Prop() option!: any

  @Watch('data', { deep: true })
  watchTmp() {
    this.main()
  }

  mounted() {
    this.main()
  }

  main() {
    const chartData: any = this.data

    let chartOption = this.option
    if (!chartOption) {
      chartOption = {
        // アスペクト比を固定しないように変更
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          /*
        xAxes: [
          {
            type: 'time',
            time: {
              // Luxon format string
              tooltipFormat: 'DD T',
            },
            title: {
              display: true,
              text: 'Date',
            },
          },
        ],
        */
          xAxes: [
            {
              // ここで軸を時間を設定する
              type: 'time',
              time: {
                unit: 'year',
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback(value: number) {
                  if (value % 1 === 0) {
                    return value
                  }
                },
              },
            },
          ],
        },
      }
    }
    // const

    this.renderChart(chartData, chartOption)
  }
}
</script>

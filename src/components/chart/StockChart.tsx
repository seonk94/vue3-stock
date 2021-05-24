import Stock from '@/model/Stock';
import { computed, defineComponent, onMounted, watch } from '@vue/runtime-core';
import Chart from 'chart.js/auto';
import { Chart as ChartType } from 'chart.js';
import { ref } from 'vue';

const StockChart = defineComponent({
  props: {
    stocks: {
      type: Array as () => Array<Stock>,
      required: true,
    },
  },
  setup(props) {
    const chartCanvas = ref();
    const chart = ref<ChartType>();
    const dataSet = computed(() => props.stocks.map((stock) => stock.chartData));

    watch(
      () => props.stocks,
      () => {
        if (chart.value) {
          chart.value.update();
        }
      }
    );

    onMounted(() => {
      chart.value = new Chart(chartCanvas.value, {
        type: 'bar',
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ],
          datasets: dataSet.value,
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Chart.js Bar Chart - Stacked',
            },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true,
            },
          },
        },
      }) as ChartType;
    });
    return () => (
      <div class="canvas-container">
        <canvas
          id="line"
          style={{
            maxHeight: '320px !important',
          }}
          ref={chartCanvas}
        />
      </div>
    );
  },
});
export default StockChart;
